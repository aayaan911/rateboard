# RateBoard

Multi-currency converter. Type once, every currency converts at the same time. Built-in calculator keypad.

**Live:** _(GitHub Pages URL goes here after deploy)_

## Features

| Feature | Detail |
|---|---|
| Simultaneous conversion | All rows update as you type |
| Currencies | 160+ from a single free API, no key needed |
| Calculator | + - x / % on the amount before converting |
| Base switch | Tap any row to make it the base |
| Add / remove | Gear icon toggles edit mode, then + Add currency |
| Rate table | Bank icon shows both directions for every pair |
| Offline | Rates and layout cached, works with no signal |
| Install | Add to Home Screen on Android and iOS, runs full screen |

## Files

| File | Purpose |
|---|---|
| `index.html` | Entire app: markup, CSS, JS, PWA manifest |
| `sw.js` | Service worker, offline cache |

No build step, no dependencies, no framework.

## Data source

Rates come from `https://open.er-api.com/v6/latest/USD` (exchangerate-api.com open endpoint).

- Free, no API key, no rate limit for normal use
- Mid-market rates, refreshed once every 24 hours
- Banks and remittance operators apply their own spread, usually 1% to 3%, so treat these as reference rates and not the cash-out amount

To switch to intraday rates later, replace `API` at the top of the script block. Any endpoint returning `{ rates: { CODE: number } }` based on USD will work unchanged.

## Deploy

1. Push this folder to a GitHub repo.
2. Repo Settings, Pages, Source = `main` branch, `/root`.
3. Wait ~60 seconds, open `https://<username>.github.io/<repo>/`.
4. On the phone: open that URL in Chrome or Safari, menu, Add to Home Screen.

## Updating

Edit `index.html`, commit, push. GitHub Pages redeploys automatically. Bump `CACHE` in `sw.js` (`rateboard-v1` to `rateboard-v2`) whenever you change `index.html`, otherwise returning users keep the old cached copy.
