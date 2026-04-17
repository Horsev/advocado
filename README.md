# Advocado

Chrome extension for team performance tracking. Shows sales/team metrics, progress bars, and celebration effects when performance exceeds thresholds (magic images at 105%/110%, particle salute at 120%).

## Development

```bash
npm install
npm run dev
```

## Build

1. Check current version at `chrome://extensions/`.
2. Bump `version` in `package.json` if needed, then run:
   ```bash
   npm run build
   ```
3. Upload `dist/extension_*.zip` to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/).

## Changelog

### [0.4.0] - 2026-03-18

- Add magic image celebrations at 105% and 110% team performance (GIF overlays)
- Introduce `magicImage.js` for once-per-day image reveal
- Keep particle salute at 120% (unchanged)

### [0.3.5] - 2026-03-13

- Add particle salute effect when team performance exceeds 120%
- Introduce `magicCanvas` (full-screen overlay) for visual celebration
- Run salute only once per day (tracked via `localStorage`)

### [0.3.4] - 2026-03-03

- Add team member Yuliia Buryak and corresponding image
- Update existing sales team member images

### [0.3.3] - 2026-01-12

- New sales team configurations and images
- Improved performance metrics in sales tracking
- Vite config updates (manifest plugin), refactor `App.vue`
- Dependency updates

### [0.3.1] - 2024-01-16

- Progress bar for sales team
