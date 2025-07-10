IPv4 Network Game
Overview
This is a React-based educational game that tests players' knowledge of IPv4 networking concepts. Players must identify special IP address types and calculate subnet properties within time constraints. The game features a modern UI built with React, TypeScript, and Tailwind CSS, with a Node.js/Express backend providing API endpoints.

System Architecture
Frontend Architecture
Framework: React 18 with TypeScript
Build Tool: Vite for fast development and optimized builds
State Management: Zustand for game state management
UI Components: Shadcn/ui components with Radix UI primitives
Styling: Tailwind CSS with custom game-specific design system
Routing: Wouter for lightweight client-side routing
Data Fetching: TanStack Query for server state management
Backend Architecture
Runtime: Node.js with Express.js framework
Language: TypeScript with ES modules
Database: PostgreSQL with Drizzle ORM
Database Provider: Neon Database (serverless PostgreSQL)
Session Management: In-memory storage with planned PostgreSQL integration
Key Components
Game Logic
IP Address Generation: Random IPv4 address generation (0.0.0.0 - 255.255.255.255)
Address Classification: Detection of private, reserved, multicast, and experimental IP ranges
Subnet Calculations: Network address, broadcast address, and usable host range calculations
Timer System: 2-minute countdown per round with visual feedback
Lives System: 5-heart life system with loss conditions
UI Components
Game Header: Real-time display of hearts, timer, round counter, and high score
Subnet Counter: Animated counter cycling through subnet masks (/1 to /32)
Special Address Detection: Keyboard-driven interface for special address identification
Calculation Form: Input validation for subnet property calculations
Game Over Modal: End-game statistics and restart functionality
Data Layer
Game State: Centralized Zustand store managing all game mechanics
Local Storage: High score persistence across sessions
Database Schema: User management system ready for future authentication
Data Flow
Game Initialization: Load high score from local storage, generate random IPv4
Subnet Selection: Rapid counter animation, player presses Enter to select
Address Classification: System checks if IP is special (private/reserved/multicast/experimental)
Special Address Flow: Player presses 'r', 'm', or 'e' keys for classification
Calculation Flow: Player fills form with network properties for non-special addresses
Validation: System validates inputs and updates hearts/score accordingly
Round Progression: Generate new IP and repeat cycle
External Dependencies
Frontend Dependencies
React Ecosystem: React 18, React DOM, React Router (Wouter)
UI Framework: Radix UI primitives, Shadcn/ui components
State Management: Zustand, TanStack Query
Styling: Tailwind CSS, Class Variance Authority
Forms: React Hook Form, Hookform Resolvers
Utilities: Clsx, Date-fns, Lucide React icons
Backend Dependencies
Server Framework: Express.js with TypeScript
Database: Drizzle ORM, Neon Database serverless driver
Session Management: Connect-pg-simple (planned)
Development: TSX for TypeScript execution, ESBuild for production builds
Development Tools
Build Tools: Vite, ESBuild, PostCSS
TypeScript: Full type safety across frontend and backend
Database Migrations: Drizzle Kit for schema management
Development Server: Vite dev server with HMR
Deployment Strategy
Development Environment
Frontend: Vite dev server with hot module replacement
Backend: TSX for TypeScript execution with auto-restart
Database: Neon Database with environment variable configuration
Production Build
Frontend: Static build optimized with Vite, served from Express
Backend: ESBuild compilation to single JavaScript bundle
Database: Drizzle migrations applied via db:push command
Environment Configuration
DATABASE_URL: PostgreSQL connection string for Neon Database
NODE_ENV: Environment detection for development/production features
REPL_ID: Replit-specific configuration for development banners
Changelog
July 08, 2025. Initial setup
User Preferences
Preferred communication style: Simple, everyday language.
