# Expenxo

Expenxo is a personal expense management application. It provides user authentication, expense and category management, dashboard summaries, transaction lists, and spending analytics.

## Features

- User registration, login, logout, and session authentication
- Create, view, and delete expenses
- Create, edit, and delete spending categories
- Dashboard with expense totals and recent transactions
- Transaction filtering and analytics
- PostgreSQL data storage
- Redis caching and connection support

## Tech Stack

- Frontend: React, React Router, TypeScript, Tailwind CSS, Axios
- Backend: Bun, Express, TypeScript
- Database: PostgreSQL with Drizzle ORM
- Cache: Redis
- Authentication: JWT stored in an HTTP cookie
- Validation: Zod

## Project Structure

```text
Expenxo/
├── client/                 React frontend
│   └── src/
│       ├── pages/          Application pages
│       ├── components/     Reusable components
│       └── api.ts          Frontend API client
└── server/                 Express backend
    └── src/
        ├── controllers/    Request handlers
        ├── routes/         API routes
        ├── services/       Application logic
        ├── repositories/   Database operations
        ├── middleware/     Authentication and rate limiting
        ├── db/             Database connection and schema
        └── config/         Redis configuration
```

## Prerequisites

Install the following tools:

- Bun
- PostgreSQL
- Redis

## Setup

### 1. Install dependencies

Install the frontend dependencies:

```bash
cd client
bun install
```

Install the backend dependencies:

```bash
cd ../server
bun install
```

### 2. Configure the backend

From the `server` directory, create a local environment file:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/expenxo
PORT=5000
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

`DATABASE_URL` must point to an existing PostgreSQL database. `JWT_SECRET` should be changed to a strong, private value in every environment.

### 3. Configure the frontend

From the `client` directory, create a local environment file:

```bash
cp .env.example .env
```

The default frontend configuration is:

```env
BACKEND_URL=http://localhost:5000
```

## Database Setup

This project uses Drizzle ORM. Generate and apply migrations from the `server` directory:

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

## Running the Application

Start Redis and PostgreSQL locally, then run the backend:

```bash
cd server
bun run src/index.ts
```

The API will be available at `http://localhost:5000`.

In a second terminal, start the frontend:

```bash
cd client
bun run dev
```

Open `http://localhost:3000` in a browser.

## Health Check

Check whether the API is running:

```bash
curl http://localhost:5000/health
```

## API Routes

All application routes use the `/api/v1` prefix.

### Authentication

| Method | Route              | Description                              |
| ------ | ------------------ | ---------------------------------------- |
| POST   | `/api/v1/register` | Register a user                          |
| POST   | `/api/v1/login`    | Log in and set the authentication cookie |
| POST   | `/api/v1/logout`   | Log out                                  |
| GET    | `/api/v1/me`       | Get the current user                     |

### Categories

| Method | Route              | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/api/v1/category` | List categories   |
| POST   | `/api/v1/category` | Create a category |
| PUT    | `/api/v1/category` | Update a category |
| DELETE | `/api/v1/category` | Delete a category |

### Expenses

| Method | Route             | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/api/v1/expense` | List expenses     |
| POST   | `/api/v1/expense` | Create an expense |
| DELETE | `/api/v1/expense` | Delete an expense |
