# AutoVerse – Car Museum Experience

A mobile-first React Native (Expo) application paired with a lightweight Node.js API for showcasing car history, culture, news, and personal garage tracking. The project mirrors the provided concept designs with a dark, modern UI, quick navigation, and curated data experiences.

## Features
- **Dashboard** with hero news, featured models, quick links, and latest articles.
- **Encyclopedia** search covering timelines, restoration projects, brands, and models.
- **News hub** with category filters and rich article cards.
- **My Garage** vehicle tracker with call-to-action for additions.
- **Dealership map** powered by `react-native-maps` with quick access overlay.
- **Settings** screen segmented by account, preferences, and support rows.
- **Node API** surfaces the same curated content for use by external clients.

## Tech Stack
- Mobile: Expo (React Native + TypeScript), React Navigation, React Native Maps.
- API: Node.js (Express + TypeScript), Vitest + Supertest for tests.
- Tooling: npm workspaces, shared TypeScript models, GitHub Actions CI, Vercel serverless configuration.

## Repository Structure
```
apps/
  mobile/   # Expo project (screens, navigation, theming, assets)
  server/   # Express API + vitest tests and Vercel handler
packages/
  shared/   # Shared TypeScript domain models
```

## Development
```bash
# install workspace dependencies
npm install

# run the Expo app (starts Metro bundler)
npm run dev:mobile

# start the Node API with hot reload
npm run dev:api
```

Expo will display a QR code for Expo Go or simulator usage. The API defaults to `http://localhost:4000` with a `/health` check for diagnostics.

## Testing & Quality
```bash
# type check both projects
npm run typecheck

# run API unit/integration tests
npm run test:api
```

CI (`.github/workflows/ci.yml`) mirrors the local flow on every push and pull request.

## API Reference (apps/server)
- `GET /health` – health check.
- `GET /api/news?category=Industry` – list articles (with optional category filter).
- `GET /api/models` – featured and encyclopedia model collections.
- `GET /api/brands` – automotive brand badges.
- `GET /api/projects` – restoration projects and timeline cards.
- `GET /api/garage` – saved vehicles.
- `GET /api/dealerships` – curated dealerships with coordinates.
- `GET /api/summary` – snapshot of the entire dataset.

## Deployment Notes
- Vercel configuration (`vercel.json`) distills the Express app into a serverless handler (`apps/server/api/index.ts`).
- Expo/React Native builds can ship via EAS or Expo Go.

## Next Steps
- Replace static datasets with a CMS or external data source.
- Add authentication for personalized garage data.
- Expand automated tests (component snapshots, E2E flows).
