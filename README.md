# CivicSignal frontend

React + Vite + Tailwind + Leaflet. Turns scattered citizen complaints into consolidated,
prioritised civic issues. Built by team ByteStorm.

## Run it

```bash
npm install
cp .env.example .env     # then fill in values (optional, see below)
npm run dev
```

With no Supabase keys the app runs in **demo mode**: it shows clearly labelled, read-only
sample issues so you can preview the UI. Reporting and admin actions are disabled in demo
mode because they need the real backend. Nothing is faked.

Set `VITE_MAP_CENTER` (for example `12.97,77.59`) and `VITE_MAP_ZOOM` in `.env` to start
on your city.

## Structure

```
src/
  app/          router and providers (React Query, auth)
  config/       env, constants: categories, statuses, priority levels, score model
  services/     the only layer that talks to a backend
    supabase/   real implementation (issues, reports, auth, mappers)
    demo/       read-only sample data, used when Supabase is not configured
    index.js    picks the implementation
  hooks/        data hooks built on services (useIssues, useAuth, ...)
  lib/          pure helpers (format, geo, filtering, stats)
  components/   ui primitives and layout shell
  features/     one folder per product area: report, map, issues, dashboard, admin
  pages/        thin route components that compose features
docs/DATA_CONTRACT.md   what the backend must provide
```

Rules that keep it scalable:
- Components never import Supabase. They use hooks, hooks use `services`.
- Database column names are mapped once, in `services/supabase/mappers.js`.
- Categories, statuses and score weights live only in `config/constants.js`.
- A new product area is a new folder in `features/` plus a route in `app/router.jsx`.

## Pages
`/` home · `/map` issue map and list · `/report` report form · `/issues/:id` detail with
score breakdown and history · `/dashboard` public stats · `/admin` (login at `/admin/login`).
