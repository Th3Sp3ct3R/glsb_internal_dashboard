# VANTA LABS | Internal Operations Dashboard

A minimalist, VANTA black-themed internal operations dashboard for managing Instagram automation infrastructure.

## Design Philosophy

**VANTA Black Aesthetic**
- Pure black background (#000000) representing "the absence of light"
- Luminous white text with subtle glow effects
- Sharp, geometric design with minimal rounded corners
- Status indicators that pulse and glow
- Generous spacing for premium feel

## Tech Stack

- **React 18** with TypeScript
- **TanStack Query v5** for data fetching and caching
- **Wouter** for client-side routing
- **Tailwind CSS** for styling
- **Radix UI** for accessible component primitives
- **Lucide React** for icons
- **Vite** for build tooling

## Features

### Dashboard (/)
- Overview statistics for devices and accounts
- Device fleet grid with status indicators
- Quick navigation to detailed views

### Devices (/devices)
- Full device fleet management
- Filter by status (all/running/stopped)
- Device cards with account assignments
- Sync and bulk operations

### Device Detail (/devices/:id)
- Complete device information
- Start/Stop controls
- Attached accounts management
- Device statistics

### Accounts (/accounts)
- Sortable data table of all accounts
- Filter by login status
- Account statistics (followers, posts, etc.)
- Profile pictures and metadata

### Account Detail (/accounts/:id)
- Large profile card with avatar
- Complete statistics breakdown
- Device assignment information
- Activity history (placeholder)

## API Integration

The dashboard integrates with these backend endpoints:

- `GET /api/devices` - List all devices
- `GET /api/accounts` - List all accounts
- `GET /api/devices/:id` - Single device details
- `GET /api/accounts/:id` - Single account details
- `POST /api/devices/:id/start` - Start a device
- `POST /api/devices/:id/stop` - Stop a device
- `POST /api/geelark/sync-devices` - Sync devices from GeeLark

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API running on `http://localhost:3000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dashboard will be available at `http://localhost:5173`

### Development

The Vite dev server proxies `/api` requests to `http://localhost:3000`. Update `vite.config.ts` if your backend runs on a different port.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Layout.tsx
│   ├── Navigation.tsx
│   ├── StatCard.tsx
│   └── StatusBadge.tsx
├── lib/             # Utilities and API client
│   ├── api.ts       # API functions
│   └── utils.ts     # Helper functions
├── pages/           # Route pages
│   ├── Dashboard.tsx
│   ├── Devices.tsx
│   ├── DeviceDetail.tsx
│   ├── Accounts.tsx
│   └── AccountDetail.tsx
├── types/           # TypeScript type definitions
│   └── index.ts
├── App.tsx          # Main app with routing
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Styling Guidelines

### Colors

- Background: `#000000` (pure black)
- Text: `#FFFFFF` with glow effects
- Borders: `rgba(255, 255, 255, 0.1)`
- Status Green: `#00FF00` with glow
- Status Red: `#FF0000` with glow
- Inactive Gray: `#666666`

### Typography

- Font: Inter (with system font fallback)
- Monospace: JetBrains Mono
- Headings: 600 weight, subtle glow
- Body: 400 weight, 14-16px

### Components

All components follow the VANTA aesthetic:
- Black backgrounds with white borders at 10% opacity
- Hover states add glowing shadows
- Status indicators pulse when active
- Sharp edges (0-2px border radius max)

## No Authentication

This is an internal tool with direct access. No login or authentication flow is implemented.

## License

Internal use only - VANTA LABS
