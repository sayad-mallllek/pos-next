# POS Backend System

A Point of Sale (POS) backend system built with modern web technologies including Next.js 14 App Router, Prisma ORM, NextAuth.js for authentication, and ShadCN UI components.

## Features

- ✅ **Authentication System**
  - User registration (signup) with validation
  - Secure login with credentials
  - Password hashing using bcryptjs
  - Session management with NextAuth.js
  - Protected routes and server-side authentication

- ✅ **Database Management**
  - Prisma ORM with SQLite (easily switchable to PostgreSQL/MySQL)
  - Type-safe database queries
  - Automatic migrations
  - User model with authentication fields

- ✅ **Form Validation**
  - Runtime validation with Zod
  - Client-side and server-side validation
  - User-friendly error messages

- ✅ **Modern UI**
  - ShadCN UI components with Tailwind CSS
  - Responsive design
  - Clean and accessible interface
  - Dark mode support ready

- ✅ **Type Safety**
  - Full TypeScript support
  - Type-safe API routes
  - End-to-end type safety with Prisma

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Authentication**: NextAuth.js v4
- **Database**: Prisma ORM with SQLite
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Validation**: Zod
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sayad-mallllek/pos-next.git
cd pos-next
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```

4. Initialize the database:
```bash
npx prisma migrate dev --name init
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
pos-next/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth API routes
│   │   └── signup/              # Signup API endpoint
│   ├── dashboard/               # Protected dashboard page
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   └── ui/                      # ShadCN UI components
├── lib/
│   ├── auth.ts                  # NextAuth configuration
│   ├── prisma.ts                # Prisma client
│   └── utils.ts                 # Utility functions
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
└── types/
    └── next-auth.d.ts           # NextAuth type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Routes

### Authentication

- `POST /api/auth/signin` - Login with credentials
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

### User Management

- `POST /api/signup` - Create new user account

## Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Security

- Passwords are hashed using bcryptjs with a salt round of 10
- Environment variables are used for sensitive configuration
- CSRF protection enabled through NextAuth
- Session-based authentication with JWT tokens

## Switching to PostgreSQL/MySQL

To use PostgreSQL or MySQL instead of SQLite:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql" // or "mysql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env` with your database URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/posdb"
```

3. Run migrations:
```bash
npx prisma migrate dev
```

## Future Enhancements

- [ ] Product management
- [ ] Inventory tracking
- [ ] Sales transactions
- [ ] Receipt generation
- [ ] Reporting and analytics
- [ ] Multi-user roles and permissions
- [ ] Email verification
- [ ] Password reset functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.