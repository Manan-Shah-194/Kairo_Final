import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIVentRoomProps {
  isPro?: boolean;
}

export default function AIVentRoom({ isPro = false }: AIVentRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Aura, your AI therapist. I'm here to listen. Feel free to share what's on your mind.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const initSession = async () => {
      if (user) {
        try {
          const response = await api.chat.createSession(user.id);
          setSessionId(response.sessionId);
        } catch (error: any) {
          console.error('Failed to create chat session:', error);
          toast({
            title: 'Connection Error',
            description: 'Unable to connect to AI chat service.',
            variant: 'destructive',
          });
        }
      }
    };

    initSession();
  }, [user, toast]);

  const handleSend = async () => {
    if (!input.trim() || !user || !sessionId) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.chat.sendMessage(sessionId, user.id, input);

      const aiResponse: Message = {
        id: Date.now() + 1,
        text: response.response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error: any) {
      toast({
        title: 'Message Failed',
        description: error.message || 'Unable to send message. Please try again.',
        variant: 'destructive',
      });
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 flex flex-col h-[600px]" data-testid="card-ai-chat">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <MessageCircle className="w-6 h-6 text-primary" data-testid="icon-message" />
          </div>
          <div>
            <h2 className="text-2xl font-bold" data-testid="text-chat-title">
              {isPro ? 'AI Consoling Agent' : 'AI Vent Room'}
            </h2>
            <p className="text-muted-foreground text-sm" data-testid="text-chat-subtitle">
              {isPro ? 'Unlimited conversations with your AI companion' : 'A safe space to express yourself'}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isPro 
            ? 'Your AI companion is here to listen without judgment, 24/7. Share your thoughts, feelings, and concerns in a completely private and supportive environment. The AI responds with empathy and understanding, helping you process emotions and gain perspective. This is a safe space to express yourself freely, anytime you need support.'
            : 'Sometimes you just need to vent. This AI-powered space provides a judgment-free zone where you can express your thoughts and feelings freely. Share what\'s on your mind, and receive empathetic, supportive responses. This is your personal emotional outlet, available whenever you need it.'
          }
        </p>
      </div>

      <ScrollArea className="flex-1 pr-4 mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              data-testid={`message-${message.id}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex justify-start"
            >
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted">
                <p className="text-sm text-muted-foreground">Aura is typing...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          placeholder="Type your message..."
          disabled={isLoading}
          data-testid="input-message"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          size="icon"
          data-testid="button-send"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
