# RateBoard

Multi-currency converter. Type one amount, every currency converts at the same time. Built-in calculator keypad.

**Live:** https://aayaan911.github.io/rateboard/
**Previous version:** https://aayaan911.github.io/rateboard/v1.html

Built by Ayaan Shohan.

## Features

| Feature | Detail |
|---|---|
| Simultaneous conversion | Every row updates as you type |
| Currencies | 166 fiat currencies. Crypto and metals are filtered out |
| Default rows | USD, AED, IDR, BDT, PKR, PHP |
| Calculator | Plus, minus, times, divide and percent on the amount before converting |
| Base switch | Tap any row to make it the base |
| Reorder | Drag the grip on any row. Order is saved |
| Symbols | The currency sign sits inside every field |
| History | Clock icon. Last 12 conversions with amount, time and the rate date used. Tap one to load it back |
| Rate table | One row per currency, both directions, small rates scaled per 100 or 1,000 to stay readable |
| Whole numbers | Amounts of 10 and above show without decimals. Below 10 keeps 2 decimals so small values are not lost |
| Offline | A full rate table is bundled in the file, plus a service worker cache. Works with no signal |
| Install | Add to Home Screen on Android and iOS. Runs full screen |
| Haptics | Key presses, drag ticks and copy confirmations vibrate on mobile |
| Copy | Long press any row to copy its value |

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire app: markup, CSS, JS, PWA manifest, bundled rate table |
| `sw.js` | Service worker, offline cache |
| `v1.html` | Archived first version |

No build step, no dependencies, no framework.

## Rate data

Three sources are tried in order:

1. `https://open.er-api.com/v6/latest/USD`
2. `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
3. `https://latest.currency-api.pages.dev/v1/currencies/usd.json`

All free, no API key. Whatever comes back is filtered through a fiat allowlist built from the bundled table, so crypto tickers and metals from the mirror endpoints never reach the interface, and the full currency list survives even when an endpoint returns fewer entries.

Rates are mid-market and refresh once every 24 hours. The header shows the date they are from. Banks and remittance operators apply their own spread, so treat these as reference rates rather than the amount that lands in your account.

## Updating

1. Edit `index.html`.
2. Bump `CACHE` in `sw.js`, for example `rateboard-v8` to `rateboard-v9`. Skip this and returning visitors keep the old cached copy.
3. Commit and push to `main`. GitHub Pages redeploys in about 60 seconds.
