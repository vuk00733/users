# MDS FE Users

This repository powers the front-end React SPA and the backend JSON server.

## Structure

- `frontend/` — Vite + React + MUI client that lists users, provides filters, and can delete entries.
- `backend/` — json-server mock API with generated countries, roles, and users.

## Getting started

1. Run the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The API listens on `http://localhost:1008`.

2. Run the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The client runs on `http://localhost:5173` and talks to the backend above.

3. Visit `http://localhost:5173` after both servers are running.

## Useful commands

- `npm run dev` inside each directory starts the dev server with HMR.
- `npm run build` inside the frontend directory creates a production build.

## Notes

- Filters sync with query parameters such as `search`, `countryId`, `roleName`, `page`, `limit`, `sort`, and `order`.
- Deleting a user calls the DELETE endpoint and refreshes the table automatically via the frontend hook.
