# Codex POC

This repository provides the initial structure for a full-stack application.

## Repository Structure

- `apps/api/` – backend service (Node.js/NestJS)
- `apps/web/` – frontend application (future)
- `docker/` – Docker configuration and Compose files (future)

## Installation

Ensure you have Node.js LTS installed. Install dependencies using npm or pnpm in the relevant app directory:

```bash
cd apps/api
npm install
# or
pnpm install
```

## Next Steps

- Set up the backend with NestJS and Prisma in `apps/api`.
- Add Docker and Docker Compose configuration in `docker/`.
- Implement the frontend in `apps/web/`.

## Environment Setup

Copy env template:

```bash
cp apps/api/.env.example apps/api/.env.local
```

Edit secrets before running in shared env.

API uses typed loader in `apps/api/src/config/env.ts` to validate env vars.


## Code Quality

Run lint: (cd apps/api && npm run lint)

Fix lint issues: (cd apps/api && npm run lint:fix)

Check formatting: (cd apps/api && npm run format:check)

Apply formatting: (cd apps/api && npm run format)

