# Advocado

## Changelog

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

---

## Build

Check current version at chrome://extensions/

Update "version" in `package.json` and run `npm run build`.

Upload `dist/extension_XXXX.zip` to chrome web store at https://chrome.google.com/webstore/devconsole/
