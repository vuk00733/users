# Frontend README

## Overview

This is a React + MUI SPA that connects to the backend users API.  
It shows the users table, allows filtering by search/country/role, and lets you delete entries.

## What the app does

- Displays a paginated, sortable user list sourced from the backend API.
- Provides filter controls for search text, country, and role with their state synced to the URL.
- Supports deleting users through a confirmation dialog and auto-refreshes the table afterward.

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the dev server**
   ```bash
   npm run dev
   ```
   The app runs on `http://localhost:5173` by default.

3. **Connect to backend**
   - The frontend expects the backend JSON server at `http://localhost:3000`.
   - Ensure the backend is running before you interact with the users table.

## Useful scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR. |
| `npm run build` | Build a production bundle into `dist/`. |
| `npm run preview` | Serve the production build locally. |

## Notes

- The filters automatically sync with query params (`page`, `limit`, `countryId`, `roleName`, `search`, `sort`, `order`).
- Deleting a user triggers a refresh via the hook so the table stays in sync.
