# Mental Health & Wellness Platform

## Overview
A personal companion application for emotional wellness and mental health support. Built as a frontend-only Single Page Application (SPA) with React and TypeScript.

**Current State**: Fresh GitHub clone - fully configured and running in Replit environment
**Last Updated**: October 29, 2025 (Fresh Import)

## Project Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: TanStack Query + React Context
- **Routing**: Wouter (client-side routing)
- **Build Tool**: Vite 5

### Project Structure
```
.
├── client/               # React frontend (SPA)
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── contexts/    # React contexts (PlanContext)
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utilities
│   │   └── pages/       # Route pages (not-found)
│   └── index.html       # Entry HTML
├── shared/              # Shared types (legacy, not used)
│   └── schema.ts        # Database schema definitions
└── attached_assets/     # Static assets and images
```

**Note**: This is a frontend-only application. There is no backend server or database integration. All data is managed client-side using React state and context.

**Legacy Backend Code**: The `src/` directory contains legacy Express/MongoDB backend code that is not currently active or used. The project uses Drizzle ORM with PostgreSQL schema definitions in `shared/schema.ts` for potential future backend integration, but no database is currently provisioned or required for the frontend-only functionality.

## Configuration

### Development
- **Dev Server Port**: 5000
- **Host**: 0.0.0.0 (configured for Replit proxy)
- **HMR Port**: 443 (for Replit's HTTPS proxy)
- **Build Output**: dist/public/

### Key Files
- `vite.config.ts`: Vite configuration with Replit-specific plugins
- `package.json`: Dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.ts`: Tailwind CSS configuration

## Setup and Running

### Initial Setup
1. Dependencies installed via `npm install` (478 packages)
2. Workflow "Dev Server" configured to run `npm run dev` on port 5000
3. Deployment configured for Replit Autoscale with build and preview commands
4. Assets organized in `attached_assets/` directory for proper Vite import resolution

### Available Scripts
- `npm run dev`: Start Vite development server
- `npm run build`: Build for production
- `npm start`: Preview production build
- `npm run check`: Type check with TypeScript

### Data Management
This is a frontend-only SPA with no backend. All application state is managed client-side using:
- React Context (PlanContext for plan selection)
- Local component state
- TanStack Query for data fetching patterns

## Deployment
Configured for Replit Autoscale deployment:
- **Build**: `npm run build` (outputs to dist/public/)
- **Run**: `npm start` (Vite preview server)
- **Target**: Autoscale (frontend-only SPA)

## Features
Based on the components structure, the app includes:
- Landing page with journey start
- Authentication system
- Dual plan options (Free/Pro)
- **Psychological Assessments** - Scientifically validated tests
  - PANAS Scale (20 items) - Positive and Negative Affect measurement (free for all)
  - EIS-HPD (34 items) - Emotional Intelligence Scale with 10-factor breakdown (Pro only)
  - Interactive results with gauges, charts, and radar visualizations
  - Freemium gating: EIS-HPD results require Pro upgrade
- Mood tracking
- Journal entries
- Calendar view
- Crisis support
- AI-powered vent room
- Healing circles
- Therapist matching and booking
- Daily tips
- Profile dashboard

## Recent Changes
**October 29, 2025**

### Fresh GitHub Clone - Replit Environment Setup (Latest)
- Imported project as fresh clone from GitHub repository
- Installed all npm dependencies (478 packages via `npm install`)
- Created missing frontend files:
  - `client/src/main.tsx` - React application entry point
  - `client/src/index.css` - Tailwind CSS global styles with theme variables
  - `client/src/lib/queryClient.ts` - TanStack Query client configuration
  - `client/src/lib/utils.ts` - Utility functions (cn helper for class merging)
  - `client/src/pages/not-found.tsx` - 404 error page component
- Fixed asset organization:
  - Copied `Screenshot_2025-10-28_at_12.16.32_PM-removebg-preview_1761714308881.jpeg` to `attached_assets/` as PNG
  - Ensured all logo and image assets are properly accessible via `@assets` alias
- Created `.gitignore` file with Node.js best practices
- Configured "Dev Server" workflow to run `npm run dev` on port 5000 with webview output
- Configured deployment for Replit Autoscale:
  - Build command: `npm run build`
  - Run command: `npm start`
  - Target: autoscale (stateless frontend SPA)
- Verified Vite dev server starts successfully on port 5000
- Verified frontend loads correctly with landing page displaying Kairo branding
- Application fully functional and running in Replit environment
- **Note**: Legacy backend code in `src/` directory is not active (MongoDB/Express dependencies not installed)

### Fresh GitHub Clone Import - Replit Setup
- Imported project as fresh clone from GitHub to Replit environment
- Installed all npm dependencies (478 packages via npm install)
- Created `.gitignore` file with Node.js best practices (node_modules, dist, env files, IDE files, etc.)
- Fixed asset organization issues:
  - Moved `Logo_Kairo_Final-removebg-preview_1761680007331.png` from root to `attached_assets/`
  - Moved `Friendly_counselor_on_laptop_c61e16f3.png` from root to `attached_assets/`
  - Renamed `Screenshot_2025-10-28_at_12.16.32_PM-removebg-preview_1761714308881.jpeg` to `.png` extension to match imports
  - All image assets now properly organized in `attached_assets/` directory
- Configured "Dev Server" workflow to run `npm run dev` on port 5000 with webview output
- Configured deployment for Replit Autoscale:
  - Build: `npm run build`
  - Run: `npm start`
  - Target: autoscale (stateless frontend SPA)
- Verified dev server starts successfully on port 5000 with proper Replit proxy configuration
- Verified application loads correctly with landing page displaying Kairo branding
- Application fully functional and running in Replit environment
- Import completed successfully

### UI/UX Enhancements
- **Landing Page - About Kairo Section:**
  - Redesigned About Kairo section to match "What Makes Kairo Different" styling for uniform UI
  - Centered layout with Heart icon badge and gradient background (from-primary/5 to-primary/10)
  - Consistent visual design language across all information sections
  - Improved visual hierarchy and readability while maintaining content structure
- **Notifications Card:**
  - Removed Calendar button from Reminders & Notifications section
  - Streamlined interface for cleaner user experience
- **Mood Tracker Complete Redesign:**
  - Implemented dynamic background gradients that change based on selected mood (green for great, yellow for okay, red for awful, etc.)
  - Enhanced mood selection interface with gradient buttons and smooth animations
  - Added mood analytics section with two interactive visualizations:
    * Area chart showing mood trends over time using Recharts
    * Pie chart displaying mood distribution across different emotional states
  - Redesigned mood history from simple list to colorful gradient cards
  - Mood-responsive UI colors throughout the component for better emotional feedback
  - Maintained three-step mood logging flow (mood → context → location) with improved visuals

### Fresh GitHub Import Setup
- Imported project from GitHub as fresh clone to Replit environment
- Installed all npm dependencies (478 packages)
- Created `.gitignore` with Node.js best practices (node_modules, dist, env files, etc.)
- Organized project assets by creating `attached_assets/` directory and moving all images and generated_images
- Configured "Dev Server" workflow to run `npm run dev` on port 5000 with webview output
- Configured deployment for Replit Autoscale (build: npm run build, run: npm start)
- Verified dev server starts successfully on port 5000
- Verified frontend is fully accessible and functional
- Application running successfully in Replit environment

**October 28, 2025**

### Therapist Matching Questionnaire (Latest)
- Created comprehensive multi-step therapist matching questionnaire (`/therapist-matching`)
  - **Step 1: The Basics** - Session type and availability preferences
  - **Step 2: What's on your mind?** - Therapy concerns and prior experience (12 concern areas)
  - **Step 3: Your Therapy Style** - Therapist approach and focus preferences
  - **Step 4: Therapist Preferences** - Gender preference (100% optional)
- Features:
  - Beautiful animated multi-step form with progress tracking
  - Validation requiring completion of each step before proceeding
  - Back/Next navigation with smooth scrolling
  - Mobile-responsive design matching existing branding
  - "Show My Matches" submission redirects to therapist directory
  - Seamless integration with existing header/footer
- Updated Pro Plan Dashboard:
  - "Start Matching Process" button now navigates to dedicated questionnaire page
  - Removed inline matching component for cleaner UX
  - Therapists tab properly handles URL parameters

### Assessment System Improvements
- **Modified Free & Pro Dashboards:**
  - Removed embedded EQ assessment from home pages
  - Added prominent assessment cards encouraging users to take tests
  - Cards feature gradient backgrounds, brain icons, and clear CTAs
  - Clicking cards navigates to dedicated `/assessments` page
- **Assessments Page Redesign:**
  - Users can now take PANAS and EIS tests independently
  - Each test has its own submit button
  - Results display immediately below the respective test
  - Smooth scroll to results after submission
  - No longer requires completing both tests simultaneously

### Psychological Assessments Feature
- Implemented comprehensive Psychological Assessments feature
  - Created Assessments.tsx component with PANAS and EIS-HPD questionnaires
  - Implemented scoring algorithms for both tests with proper normative data
  - Built interactive results visualizations (gauges, progress bars, radar charts, factor tables)
  - Enforced freemium boundary: PANAS results free, EIS-HPD results Pro-only with upgrade CTA
  - Added Assessments navigation link to both Free and Pro dashboards
  - Configured /assessments route in App.tsx

### Initial Setup
- Updated branding with transparent Kairo logo across landing and auth pages
- Fixed login page back button positioning for professional appearance
- GitHub import completed and configured for Replit
- Created missing `shared/schema.ts` for database types
- Configured Vite to allow all hosts (required for Replit proxy)
- Set up PostgreSQL database and pushed schema
- Configured workflow to run development server on port 5000
- Set up deployment configuration for production
