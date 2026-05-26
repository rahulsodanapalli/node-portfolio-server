# Sodanapalli Rahul Portfolio - Backend API Server

This repository contains the backend REST API service powering the Sodanapalli Rahul Personal Portfolio Platform. The service is written in modern **TypeScript** utilizing **Node.js**, **Express.js**, and **MongoDB** (with **Mongoose**).

The architecture is refactored to conform to high-quality, production-grade industry structures commonly found on GitHub. It prioritizes separation of concerns, reliable boot cycles, strict runtime validation schemas, secure configuration flows, and graceful lifecycle shutdowns.

---

## 🛠️ Architecture Design Breakdown

The codebase is organized logically into isolated layers:

```text
server/
├── .env.example            # Template configuration showing required environment variables
├── package.json            # Script definitions and package dependencies
├── tsconfig.json           # TypeScript configuration
└── src/
    ├── app.ts              # Core Express application configuration & middleware mountings
    ├── index.ts            # Main application bootloader & database lifecycle handlers
    ├── config/             # Environment validators, database and seeding settings
    │   ├── db.ts           # MongoDB connection initiator
    │   ├── env.ts          # Zod schema environment validator
    │   └── seeder.ts       # Database static baseline data injector
    ├── controllers/        # Express handlers responding to endpoints
    ├── middleware/         # Security gates, authenticators, and error handlers
    ├── models/             # Mongoose schemas representing database collections
    ├── routes/             # REST endpoints route declarations
    │   └── index.ts        # Centralized api routing aggregator
    ├── utils/              # Node helpers (JWT generation, Nodemailer transport)
    └── validators/         # Strict Zod validation schemas
        └── index.ts        # central schema validator index
```

### 1. App vs. Server Separation
- **`src/app.ts`**: Builds and configures the Express application instance, loading security headers, CORS settings, cookie parsers, logging middleware, and global error handlers.
- **`src/index.ts`**: The application bootloader that triggers database links, seeds data, starts the server listener, and listens for terminal execution interrupt signals (`SIGINT`/`SIGTERM`) to perform clean teardowns.

### 2. Environment Protection
- Hardcoded secrets are prohibited. Real secrets reside exclusively in a `.env` file that is kept out of Git.
- A **`.env.example`** template is provided for quick environment configurations in new development workspaces.

### 3. Graceful Lifecycle Teardown
- Minimizes socket drop errors by closing the HTTP listener to block incoming packets while finishing pending requests.
- Closes Mongoose database connection layers cleanly before exiting the Node runtime.

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **MongoDB**: A running MongoDB cluster/instance (local or MongoDB Atlas)

### 🔧 Installation & Setup

1. **Clone and navigate to the server folder**:
   ```bash
   cd server
   ```

2. **Install dependency tree**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file and update the values with your local credentials:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` and fill out your `MONGO_URI`, `JWT_SECRET`, and administrative credentials.*

---

## ⚙️ Available Scripts

Execute the following commands in the workspace root directory:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the server in development mode using `ts-node-dev` with live-reloads on modifications. |
| `npm run build` | Compiles the TypeScript source code under `src/` to production JavaScript inside `dist/`. |
| `npm run start` | Runs the compiled production JavaScript build located in the `dist/` directory. |

---

## 🛡️ API Validation & Security

- **Strict Schema Checks**: Requests modifying resources are validated against rigorous **Zod** schema structures in real-time.
- **HTTP Session Protection**: Authenticated tokens are issued via strong `HttpOnly`, `SameSite=none`, and `Secure` cookie paths to mitigate CSRF and XSS threats.
- **Robust Error Boundary**: Any system exceptions are caught by a global error middleware, returning standard, secure JSON responses without exposing raw stack traces in production environment setups.
