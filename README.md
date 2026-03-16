# Frontend

## What this folder is for
The `frontend` folder contains the Next.js web interface for EasyChip. It is the part of the project a new user sees first: the landing page, the product story, and the browser-based playground that talks to the backend APIs.

## End-to-end flow
1. The browser loads the Next.js application.
2. The landing pages explain what the product does and why it matters.
3. The demo or playground pages collect a hardware prompt from the user.
4. Client-side code calls the backend API.
5. The response is rendered back into UI elements such as generated code, metrics, and status views.

## Root files
- `.env.local` stores local frontend environment settings.
- `.eslintrc.json` configures linting rules for the web app.
- `.gitignore` controls which generated frontend files are not tracked.
- `next-env.d.ts` provides Next.js TypeScript declarations.
- `next.config.mjs` contains Next.js runtime and build configuration.
- `package-lock.json` locks dependency versions.
- `package.json` defines scripts and frontend dependencies.
- `postcss.config.mjs` configures the CSS processing pipeline.
- `tailwind.config.ts` configures Tailwind styling.
- `tsconfig.json` defines TypeScript compiler behavior.
- `vercel.json` contains deployment-specific settings for Vercel.

## Folder contents
### `app/`
This is the route layer of the Next.js application.

- `layout.tsx` defines the global page shell.
- `page.tsx` is the primary landing page.
- `globals.css` defines shared styling.
- `icon.svg` provides the site icon across metadata surfaces.
- `fonts/` holds font assets.
- `demo/` contains the interactive demo route.
- `playground/` contains the playground-oriented route.

### `components/`
This folder holds reusable UI building blocks.

- `demo/` contains demo-specific components.
- `landing/` contains sections for the marketing page.
- `layout/` contains shared structural components such as navigation and footer.
- `playground/` contains playground-related UI components.

### `lib/`
This folder contains shared frontend logic.

- `api.ts` wraps calls to backend endpoints.
- `types.ts` defines shared request and response shapes.

### `.next/`
Generated build artifacts produced by Next.js.

### `.vercel/`
Vercel-local metadata for deployment tooling.

### `node_modules/`
Installed npm packages.

## How this folder connects to the rest of the codebase
- It calls `backend/api/` to run generation and simulation.
- It exposes the results from `sim/`, `formal/`, and the generation pipeline in a user-friendly way.
