# Expenxo Server

Express API server for the Expenxo expense management application.

## Setup

Install dependencies:

```bash
bun install
```

Create the environment file:

```bash
cp .env.example .env
```

Configure PostgreSQL, Redis, the server port, and JWT secret in `.env`.

## Run

```bash
bun run src/index.ts
```

The API runs at `http://localhost:5000` by default.

## Database

Generate and apply database migrations:

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```
