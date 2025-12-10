# 📘 LaBase Server - Backend Documentation

## ✨ Description

Backend for LaBase, a workspace management system that includes reservations, user administration, employees, products, and an AI assistant chatbot. Built with Node.js, Express, and TypeScript following Clean Architecture with Vertical Slices to ensure scalability and maintainability.

The system includes integration with WhatsApp Business using whatsapp-web.js and Google Gemini to provide automated assistance to users.

## 🛠 Technologies Used

### Backend Core

- **Node.js** (v18+) - JavaScript runtime
- **Express** - Web framework for Node.js
- **TypeScript** - Static typing for JavaScript
- **Prisma ORM** - Object-relational mapping with PostgreSQL
- **Zod** - Schema validation and types

### Database and Cache

- **PostgreSQL** - Main database
- **Redis** - Cache and temporary sessions

### Authentication and Security

- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt** - Password hashing

### External Services

- **AWS S3** - File storage
- **Nodemailer** - Email sending
- **WhatsApp Web.js** - WhatsApp Business integration
- **Google Gemini API** - Generative AI for chatbot

### Utilities

- **Socket.IO** - Real-time communication
- **Swagger** - Interactive API documentation
- **Multer** - File uploads
- **EJS** - Email templates
- **Morgan** - HTTP logger
- **Day.js & date-fns** - Date handling
- **Nanoid & UUID** - Unique identifier generation

## ⚙️ System Requirements

- **Node.js** v18 or higher (recommended v20+)
- **PostgreSQL** 16+ (local or Docker)
- **Redis** (local or Docker)
- **Docker** (optional, for containerized development)
- **Chromium/Chrome** (required by whatsapp-web.js)

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone <REPOSITORY_URL>
cd labase-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root with the following variables:

### 4. Configure Database

#### Option A: With Docker (Recommended)

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Restart database (only in local)
npx prisma migrate reset --force

# Create first migration
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio
npm run prisma:studio
```

#### Option B: Local Installation

```bash
# Install PostgreSQL and Redis locally
# Then run:
# Restart database (only in local)
npx prisma migrate reset --force

# Create first migration
npx prisma migrate dev --name init
```

### 5. Run the seed (only for development)

```bash
npm run seed:dev
```

### 6. Run the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm run build
npm start
```

## 🐳 Using Docker

### Docker Compose (Development)

```bash
# Start only services (DB + Redis)
docker-compose up -d

# Run the app locally
npm run dev
```

### Docker Variables

The `docker-compose.yml` file includes:

- **PostgreSQL 16** on port 5432
- **Redis** on port 6379
- Persistent volumes for data

## 📊 Database Migrations

### Available Prisma Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Create and apply new migration
npm run prisma:migrate

# Open Prisma Studio (graphical interface)
npm run prisma:studio

# Complete database reset
npx prisma migrate reset

# Apply migrations in production
npx prisma migrate deploy
```

### Migration Workflow

1. **Modify** the `prisma/schema.prisma` file
2. **Create migration**:
   ```bash
   npx prisma migrate dev --name migration_name
   ```
3. **Apply in production**:
   ```bash
   npx prisma migrate deploy
   ```

### Migration Structure

```
prisma/
├── migrations/
│   ├── 20250824204101_init/
│   │   └── migration.sql
│   └── migration_lock.toml
└── schema.prisma
```

## 🏗️ Project Structure

```
src/
├── config/              # Global configurations
│   ├── env/            # Environment variables
│   ├── prisma_client/  # Prisma client
│   ├── redis/          # Redis configuration
│   └── socket/         # Socket.IO configuration
├── constants/          # Global constants
├── infrastructure/     # External services (AWS, JWT)
├── middlewares/        # Express middlewares
├── modules/           # Business modules (See architecture.md)
├── shared/            # Shared code
├── utils/             # General utilities
├── docs/              # Swagger documentation
├── index.ts           # entry point
└── routes.ts          # Main route configuration
```

## 🤖 WhatsApp Bot

### Features

- **Client**: whatsapp-web.js with local authentication
- **AI**: Google Gemini with personalized context
- **Functionalities**:
  - Intelligent automatic responses
  - Space inquiry management
  - Reservation assistance
  - General business information

### Configuration

1. Ensure `API_KEY_GEMINI` is configured
2. When starting the application, a QR code will be displayed in console
3. Scan the QR with WhatsApp on your mobile device
4. The bot will be active and respond automatically

## 📱 API Documentation

Interactive API documentation is available at:

```
http://localhost:3001/api-docs
```

### Main Endpoints

- **Auth**: `/api/v1/auth/*` - Authentication and registration
- **Spaces**: `/api/v1/spaces/*` - Space management
- **Reservations**: `/api/v1/reservations/*` - Reservation system
- **Users**: `/api/v1/users/*` - User management
- **Products**: `/api/v1/products/*` - Product management
- **Chatbot**: `/api/v1/chatbot/*` - Bot interaction

## 🚀 Available Scripts

```bash
# Development
npm run dev              # Server with hot reload

# Production
npm run build           # Compile TypeScript
npm start              # Run compiled version

# Database
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run migrations
npm run prisma:studio   # Open Prisma Studio
```

## 🔧 Development Configuration

### VSCode (Recommended)

Install extensions:

- **Prisma** - Prisma schema support
- **TypeScript Importer** - Auto-imports
- **REST Client** - Test endpoints

### Development Variables

For local development, use the following configurations in `.env`:

```env
ENVIRONMENT=development
NODE_ENV=development
DATABASE_URL=postgresql://root:root@localhost:5432/labase-service
REDIS_URL=redis://localhost:6379
APP_URL=http://localhost:3001
```

## 📋 Project Architecture

For detailed information about architecture, modules, and patterns used, consult:

📖 **[Architecture.md](./architecture.md)** - Complete project architecture guide

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-functionality`
3. Commit changes: `git commit -m 'Add new functionality'`
4. Push to branch: `git push origin feature/new-functionality`
5. Create Pull Request

## 📝 Logs and Debugging

### Development Logs

- Logs appear in console with HTTP request details
- Use Morgan for automatic request logging

### Debugging

```bash
# Debug mode with more information
DEBUG=* npm run dev
```

## ⚠️ Important Notes

- **WhatsApp Web**: Requires keeping the session active, don't close the application abruptly
- **Files**: Images are stored in AWS S3, configure credentials correctly
- **Redis**: Required for session and cache functionality
- **Migrations**: Always backup before running migrations in production

---

For more detailed information about architecture and how to create new modules, see [architecture.md](./architecture.md).
