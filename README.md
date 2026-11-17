# Subscriptions

Installable web app for tracking subscriptions: cost, currency, billing cycle, monthly and yearly cost,
first payment, next payment and expiry dates, payment account, country, website, notes and reminders.

Version 2 adds a card grid, a catalog of common services, a detail page with total paid and payment
history, custom icons (emoji, colour or your own photo), a filter menu (this month, next month, inactive,
archive, categories, payment accounts), sorting, an Analytics tab with yearly spend per month, category
and account, and an Upcoming tab.

Version 3 adds a coloured spend panel (per month and per year) at the top, cancelled-subscription tracking
(Cancelled view, cancellation date, savings per month and year, saved so far, Mark as Cancelled / Reactivate),
and a Light / Dark / System appearance setting.

Version 4 adds website icons: per subscription (icon editor → Website) or for all at once (Settings → Icons).

All data is stored on the device only. The app makes no network requests other than loading its own files, except for
website icons: when you tap **Website** in the icon editor or **Get website icons** in Settings, the phone loads each
service's icon from that service's own website (no referrer is sent). Icons are copied onto the device where the site
allows it; otherwise they are loaded from the site and cached for offline use.

**Install on iPhone:** open the site in Safari, tap Share, then *Add to Home Screen*.

**Updating:** when files change, bump `VERSION` in `sw.js`.
