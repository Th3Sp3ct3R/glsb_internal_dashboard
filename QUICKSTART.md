# Quick Start Guide

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start the development server
npm run dev
```

The dashboard will open at `http://localhost:5173`

## Backend Configuration

The frontend expects your backend API to be running at `http://localhost:3000`

If your backend runs on a different port, update `vite.config.ts`:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:YOUR_PORT', // Change this
      changeOrigin: true,
    },
  },
}
```

## Expected API Responses

### GET /api/devices

```json
[
  {
    "id": "device-001",
    "device_name": "GeeLark Pro 1",
    "status": "running",
    "android_version": "11.0",
    "model": "Pixel 5",
    "proxy": "proxy.example.com:8080",
    "adb_enabled": true,
    "accounts": [...]
  }
]
```

### GET /api/accounts

```json
[
  {
    "id": "acc-001",
    "username": "fashionista_daily",
    "display_name": "Fashion Daily",
    "profile_picture_url": "https://...",
    "bio": "...",
    "external_url": "https://...",
    "followers_count": 125000,
    "following_count": 450,
    "posts_count": 1243,
    "is_logged_in": true,
    "device_id": "device-001",
    "model": "Fashion Influencer",
    "last_activity": "2024-01-27T10:30:00Z",
    "is_flagged": false
  }
]
```

## Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The built files will be in the `dist/` directory.

## Troubleshooting

### CORS Issues

If you encounter CORS errors, make sure your backend includes the appropriate CORS headers:

```js
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

### API Not Found

Verify the Vite proxy is configured correctly and your backend is running on the expected port.

### Styling Issues

Make sure Tailwind CSS is building correctly:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Features Overview

- **Dashboard** - Overview of all devices and accounts
- **Devices** - Manage device fleet, start/stop devices
- **Device Detail** - View individual device info and attached accounts
- **Accounts** - Browse and sort all Instagram accounts
- **Account Detail** - View individual account statistics

## Design System

All components follow the VANTA black aesthetic:
- Pure black backgrounds (#000000)
- White text with subtle glow effects
- Status indicators that pulse
- Minimal, geometric design
- Sharp edges (no rounded corners)

Modify colors in `tailwind.config.js` if needed.
