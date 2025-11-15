# POS Backend System

A Point of Sale (POS) backend system built with modern web technologies including Next.js 14 App Router, Prisma ORM, custom session-based authentication, and ShadCN UI components.

## Features

- ✅ **Authentication System**

  - User registration (signup) with validation
  - Secure login with credentials
  - Password hashing using bcryptjs
  - Session management with HTTP-only cookies
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
- **Authentication**: Custom session tokens stored in Prisma
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
pnpm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

4. Initialize the database:

```bash
pnpm prisma migrate dev --name init
```

5. Run the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
pos-next/
├── app/
│   ├── actions/
│   │   └── auth.ts              # Signup/login/logout server actions
│   ├── api/                     # Route handlers (optional/sample)
│   ├── dashboard/               # Protected dashboard page
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   ├── forms/                   # Auth forms and validation
│   └── ui/                      # ShadCN UI components
├── lib/
│   ├── prisma.ts                # Prisma client
│   ├── session.ts               # Session helpers
│   └── utils.ts                 # Utility functions
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
└── prisma/
  └── migrations/              # Database migrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Authentication Flow

Authentication is handled through server actions located in `app/actions/auth.ts`:

- `signup` - Validates form data, creates the user, stores hashed credentials, and starts a session.
- `login` - Verifies an existing user and issues a new session token.
- `logout` - Revokes the active session and clears the cookie.

## Database Schema

### Auth-Related Models

```prisma
enum AuthProvider {
  NORMAL
  GOOGLE
}

model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  auths    Auth[]
  sessions Session[]
}

model Auth {
  id                String       @id @default(cuid())
  userId            String
  provider          AuthProvider
  password          String?
  providerAccountId String?
  refresh_token     String?      @db.Text
  access_token      String?      @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?      @db.Text
  session_state     String?
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  deletedAt         DateTime?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, userId])
  @@index([userId])
}

model Session {
  id           String    @id @default(cuid())
  sessionToken String    @unique
  userId       String
  expires      DateTime
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  deletedAt    DateTime?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## Security

- Passwords are hashed using bcryptjs with a salt round of 10
- Environment variables are used for sensitive configuration
- Session tokens are stored server-side in Prisma and issued via HTTP-only cookies
- Redirect-based guard on protected pages to prevent unauthenticated access

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
