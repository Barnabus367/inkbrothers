# replit.md

## Overview

This is a full-stack web application for InkBrothers Studio Zürich, a modern tattoo studio website built with React, Express, and PostgreSQL. The application features a dark, urban aesthetic with street-style design elements and showcases the studio's portfolio, crew, and booking system. The backend uses Express.js with TypeScript and Drizzle ORM for database management, while the frontend is built with React, TypeScript, and Tailwind CSS with shadcn/ui components.

## System Architecture

### Frontend Architecture

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for the dark theme
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture

- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Uses connect-pg-simple for PostgreSQL session storage
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Development Server**: TSX for TypeScript execution in development

### Database Architecture

- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Current Schema**: Basic user management with username/password authentication

## Key Components

### Frontend Components

- **Navigation**: Sticky navigation with smooth scrolling and mobile responsiveness
- **Hero Section**: Full-screen hero with parallax effects and custom animations
- **Portfolio Section**: Image grid with hover effects and Instagram integration
- **Crew Section**: Team member showcase with profiles and quotes
- **Configurator Section**: Multi-step tattoo booking/consultation form
- **Contact Section**: Contact information and inquiry form
- **Experimental Lab**: Advanced interactive features including KI Vision (camera-based body scanning), Pain Simulator (personalized pain prediction), and Neural Designer (AI-powered tattoo design generation)

### UI Components

- Complete shadcn/ui component library including buttons, forms, dialogs, tooltips, etc.
- Custom styling with dark theme and red accent colors (ink-red: hsl(355, 59%, 40%))
- Responsive design with mobile-first approach

### Backend Structure

- **Routes**: Centralized route registration in `server/routes.ts`
- **Storage**: Abstracted storage interface with in-memory implementation
- **Error Handling**: Global error middleware for consistent API responses
- **Logging**: Custom request logging for API endpoints

## Data Flow

### Client-Server Communication

1. Frontend makes HTTP requests to `/api/*` endpoints
2. Express middleware handles CORS, parsing, and logging
3. Route handlers use the storage interface for data operations
4. Responses are formatted consistently with error handling

### Development Workflow

1. Vite serves the React frontend in development mode
2. Express server handles API requests and serves static files in production
3. Database migrations are managed through Drizzle Kit
4. Hot reloading enabled for both frontend and backend code

### Authentication Flow

- Basic user schema with username/password fields
- Session management ready for implementation
- Storage interface supports user CRUD operations

## External Dependencies

### Frontend Dependencies

- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **UI/Styling**: Tailwind CSS, Radix UI components, Lucide React icons
- **State Management**: TanStack React Query
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**: clsx, class-variance-authority, date-fns

### Backend Dependencies

- **Server**: Express.js, TypeScript execution (tsx)
- **Database**: Drizzle ORM, Neon serverless PostgreSQL driver
- **Session**: connect-pg-simple for PostgreSQL sessions
- **Build**: esbuild for production bundling

### Development Tools

- **Build Tools**: Vite, esbuild, TypeScript compiler
- **Code Quality**: TypeScript for type safety
- **Database Tools**: Drizzle Kit for schema management

## Deployment Strategy

### Production Build

1. Frontend: Vite builds React app to `dist/public`
2. Backend: esbuild bundles Express server to `dist/index.js`
3. Static files served by Express in production mode

### Environment Configuration

- **Development**: Uses tsx for TypeScript execution, Vite dev server
- **Production**: Node.js serves bundled application
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Replit Configuration

- **Modules**: Node.js 20, web server, PostgreSQL 16
- **Ports**: Internal port 5000, external port 80
- **Deployment**: Autoscale deployment target with build/start scripts

## Changelog

```
Changelog:
- June 14, 2025. Initial setup of full-stack application structure
- June 14, 2025. Complete implementation of InkBrothers Studio website with dark theme, animations, and all sections
- June 14, 2025. Replaced all placeholder images with authentic InkBrothers Studio tattoo portfolio
- June 14, 2025. Added revolutionary experimental features (AI Vision, Neural Pattern Matching, Quantum Design, etc.)
- June 14, 2025. Updated crew section to feature David Coello Misa as single master tattoo artist, removed Neural Interface Studio
- June 14, 2025. Debugged and enhanced experimental lab: removed Sonic component, improved KI Vision with camera integration, advanced Pain Simulator with personalization, sophisticated Neural Designer with comprehensive design generation
- June 14, 2025. Enhanced website with three major improvements: brightened hero image with white overlay, upgraded tattoo configurator with visual previews and studio-style language, added Zurich skyline to footer
- June 14, 2025. Replaced static smoke background with dynamic MP4 video loop in hero section for enhanced visual impact
- June 14, 2025. Implemented new hero background video (4343481-hd_1920_1080_24fps) with complete removal of smoke effects, positioned at z-index 0 with full-screen coverage and proper text layering
- June 14, 2025. Implemented transparent pill-shaped buttons with white outline: rounded-full border, transparent background, hover fills with white background and black text, includes animated arrow circle that scales on hover
- June 14, 2025. Reduced button sizes for better proportions: 48px height, px-4 padding, text-sm font size, 28px arrow circles with gap-2 spacing, stroke-width 1.5 for refined appearance
- June 14, 2025. Removed main headline "ZUGANG NUR FÜR ECHTE" and scroll indicator from hero section, simplified to show only video background, subtitle, and CTA button
- June 14, 2025. Updated CrewSection CTA button to match site-wide pill-shaped button style with consistent hover animations
- June 14, 2025. Implemented targeted animations in three key areas: tattoo gallery with scale(1.03) and red glow hover effects, crew section with optimized translateY(-4px) scale(1.02) and radial background glow, configurator style tiles with border hover animations and scale(1.01) effects - all using performant CSS transitions
- June 14, 2025. Added aggressive SVG tear/rip separators between sections: created jagged 25px height tear effect with drop-shadow, applied to portfolio→crew, crew→configurator transitions for brutal visual continuity matching tattoo studio aesthetic
- June 14, 2025. Removed aggressive SVG tear/rip separators between sections: completely removed .section-tear CSS class and all jagged transition effects for cleaner section transitions
- June 14, 2025. Implemented flowing professional section transitions: added gradient fade overlays at section ends, negative margins (-mt-8) for layer shifting, section-flow background gradients, and smooth fade-in animations for seamless visual continuity
- June 15, 2025. Enhanced Tattoo Configurator with AI-powered image generation: created robust Node.js/Express backend with HuggingFace Stable Diffusion integration, rate limiting (4 requests per 10 minutes), comprehensive error handling with fallback SVG icons, 40-second timeout protection, and frontend integration with visual preview panel in step 2
- June 15, 2025. Implemented comprehensive AI prompt generation: enhanced frontend to combine all user inputs (description, style, body part, size) into optimal English prompts, added real-time prompt preview, and integrated full configurator data flow for perfect tattoo generation requests
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
