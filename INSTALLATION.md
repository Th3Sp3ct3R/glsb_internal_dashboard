# Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have:
- **Node.js** version 18 or higher
- **npm**, **yarn**, or **pnpm** package manager
- Your backend API running (default: `http://localhost:3000`)

Check your Node version:
```bash
node --version  # Should be v18.0.0 or higher
```

## Step 1: Install Dependencies

Navigate to the project directory and install all dependencies:

```bash
cd /Users/growthgod/Documents/Repos/Vanta_internal
npm install
```

This will install:
- React 18 and React DOM
- TanStack Query v5
- Wouter (routing)
- Tailwind CSS
- Radix UI components
- Lucide React icons
- TypeScript and build tools

**Expected installation time:** 1-2 minutes

## Step 2: Configure Backend API

The dashboard expects your backend API at `http://localhost:3000`

If your backend runs on a different port, edit `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:YOUR_PORT',  // ← Change this
      changeOrigin: true,
    },
  },
}
```

## Step 3: Start Development Server

```bash
npm run dev
```

The dashboard will start at: **http://localhost:5173**

You should see:
```
VITE v5.0.12  ready in 342 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

## Step 4: Verify Installation

Open your browser to `http://localhost:5173`

You should see:
1. ✅ Pure black background
2. ✅ White navigation bar with "VANTA LABS" logo
3. ✅ Navigation links: Dashboard, Devices, Accounts
4. ✅ Green "LIVE" indicator (pulsing)
5. ✅ Dashboard with stats cards

## Troubleshooting

### Issue: "Cannot find module" errors

**Solution:** Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tailwind styles not loading

**Solution:** Restart the dev server:
```bash
# Press Ctrl+C to stop
npm run dev
```

### Issue: API calls failing (CORS errors)

**Solution:** Ensure your backend has CORS enabled:

```javascript
// Express.js example
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Issue: Port 5173 already in use

**Solution:** Either:
1. Stop the other process using port 5173, or
2. Vite will automatically try 5174, 5175, etc.

### Issue: TypeScript errors in IDE

**Solution:** Ensure VS Code is using the workspace TypeScript:
1. Open any `.tsx` file
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Type "TypeScript: Select TypeScript Version"
4. Choose "Use Workspace Version"

## Production Build

To create a production build:

```bash
npm run build
```

Output will be in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Project Structure Verification

Verify all key files exist:

```bash
# Core files
ls -la src/App.tsx
ls -la src/main.tsx
ls -la src/index.css

# Pages
ls -la src/pages/Dashboard.tsx
ls -la src/pages/Devices.tsx
ls -la src/pages/DeviceDetail.tsx
ls -la src/pages/Accounts.tsx
ls -la src/pages/AccountDetail.tsx

# Components
ls -la src/components/Card.tsx
ls -la src/components/Button.tsx
ls -la src/components/StatusBadge.tsx

# Configuration
ls -la tailwind.config.js
ls -la vite.config.ts
ls -la tsconfig.json
```

All files should exist with no errors.

## Next Steps

1. **Start your backend API** on port 3000 (or configure the proxy)
2. **Run the dev server**: `npm run dev`
3. **Open the dashboard**: `http://localhost:5173`
4. **Navigate through pages**:
   - Dashboard → Overview
   - Devices → Device management
   - Accounts → Account table
5. **Test features**:
   - Click device cards to see details
   - Try start/stop buttons
   - Filter and sort accounts
   - Click sync button

## Development Workflow

### Making Changes

1. Edit any file in `src/`
2. Changes hot-reload automatically
3. Check browser for updates

### Adding New Features

- **New page**: Add to `src/pages/` and update routing in `App.tsx`
- **New component**: Add to `src/components/`
- **New API endpoint**: Add to `src/lib/api.ts`
- **New type**: Add to `src/types/index.ts`

### Code Quality

```bash
# Lint code
npm run lint

# Type check (automatically runs during build)
tsc --noEmit
```

## Support

If you encounter any issues:

1. Check this guide's Troubleshooting section
2. Review `README.md` for detailed documentation
3. Check `QUICKSTART.md` for quick reference
4. Review `PROJECT_OVERVIEW.md` for technical details

---

**You're all set! Happy coding with VANTA LABS** 🖤
