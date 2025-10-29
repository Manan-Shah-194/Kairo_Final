const API_BASE_URL = '/api';

interface ApiResponse<T = any> {
  message?: string;
  [key: string]: any;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new ApiError(response.status, error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  auth: {
    register: (data: { name: string; email: string; password: string }) =>
      fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    login: async (data: { email: string; password: string }) => {
      const response = await fetchApi<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    },

    logout: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    },

    getUser: () => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
      return !!localStorage.getItem('auth_token');
    },
  },

  chat: {
    createSession: (userId: string) =>
      fetchApi('/chat/session', {
        method: 'POST',
        body: JSON.stringify({ userId }),
      }),

    sendMessage: (sessionId: string, userId: string, message: string) =>
      fetchApi<{ response: string }>(`/chat/${sessionId}/message`, {
        method: 'POST',
        body: JSON.stringify({ userId, message }),
      }),
  },
};
