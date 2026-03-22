# 🛋️ Furniture Empire v3.0 — HTML/CSS/JS Edition

> Production-ready luxury furniture storefront built entirely in vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — open `index.html` and go.

---

## What's Inside

```
furniture-empire-v3/
├── index.html              ← Complete storefront (SPA, 4 pages)
├── css/
│   ├── main.css            ← Full design system, themes, all components
│   └── responsive.css      ← Mobile & tablet breakpoints
├── js/
│   └── app.js              ← All storefront logic (cart, search, AR, theme)
└── admin/
    ├── index.html          ← Admin control panel
    ├── css/
    │   └── admin.css       ← Professional dark-theme dashboard styles
    └── js/
        └── admin.js        ← Full admin logic (auth, CRUD, audit, orders)
```

---

## Getting Started

**No installation required.** This is pure HTML/CSS/JS.

1. Unzip the archive.
2. Open `index.html` in any modern browser.
3. That's it.

For serving over a local network:
```bash
cd furniture-empire-v3
npx serve .
# or
python3 -m http.server 8080
```

---

## Accessing the Admin Panel

The admin panel is intentionally hidden and can be reached by **three different methods**, each more convenient depending on context:

| Method | How |
|--------|-----|
| **Three-dot button** | Scroll to the footer. Click the `···` next to the copyright text **3 times** within 2 seconds. |
| **Secret word** | On the storefront, type **`empire`** using your keyboard anywhere on the page. |
| **Keyboard shortcut** | Press **`Ctrl + Shift + A`** at any time. |

All three methods navigate to `admin/index.html`.

**Default credentials:**
- Username: `admin`
- Password: `empire2025`

Change credentials after first login via the **Settings** page inside the admin panel. Credentials are stored in `localStorage`.

---

## Admin Panel Capabilities

The admin panel is a full, professional control panel inspired by Shopify and Stripe's admin interfaces.

**Dashboard** — live stats for revenue, orders, products, and customers, with a recent products table and system status panel.

**Products** — full CRUD interface. Add, edit, or delete any product. Changes are saved to `localStorage` and immediately reflected in the storefront. Each product supports: name, category, style, price, sale price, badge (New/Hot/Sale), rating, description, and two product images.

**Orders** — view all orders with status management (pending → processing → shipped → delivered). Order data is sample-seeded and will be replaced by real API data when the backend is connected.

**Inventory** — visual stock level indicators for every product, with Low Stock and Critical warnings.

**Analytics** — traffic and conversion metrics with a 7-day visual bar chart.

**Promotions** — discount code management table with status tracking.

**Settings** — change admin username and password, store contact details, and WhatsApp number.

**Audit Log** — immutable timestamped log of every admin action (logins, logouts, product creates/updates/deletes, credential changes).

Sessions auto-expire after 30 minutes. All admin actions are logged.

---

## Storefront Features

**Light/Dark theme** — toggle with the moon/sun icon in the navbar. Preference is saved to `localStorage`. Both themes are fully designed — not an afterthought.

**RH-inspired navigation** — sticky navbar with logo left, category links centered, action icons right. Mega-menu dropdowns on hover, each with an editorial photograph, category heading, and organized subcategory links.

**Full-screen search** — opens on the search icon, shows trending search chips, and displays live product results with thumbnails as the user types.

**Category mosaic grid** — six room categories as full-bleed photographic tiles in an asymmetric mosaic layout.

**Product cards** — each carries two images that cross-fade on hover, with the Add to Cart button and wishlist interaction appearing only on hover. A quick-view button opens a modal with full product details.

**AR Room Planner** — drag-and-drop furniture placement on a perspective-rendered room canvas, with per-item scale and rotation sliders.

**Cart** — slide-in drawer with live item management, quantity display, and subtotal. Cart persists across page refreshes.

**Scroll animations** — IntersectionObserver triggers reveal animations as sections enter the viewport, with staggered delays for grids.

**Toast notifications** — non-blocking feedback for add-to-cart, wishlist, and newsletter actions.

---

## Design System

Typography uses **Cormorant Garamond** (Restoration Hardware-style serif display font) for all headings and **DM Sans** for body text, navigation, and UI elements.

The accent color is a warm terracotta (`#B85C2A` light / `#C4622D` dark). Both themes use CSS custom properties throughout, so every component inherits theme changes automatically via a single `data-theme` attribute on the `<html>` element.

---

## Customization

**Add or edit products** — use the admin panel, or directly edit the `DEFAULT_PRODUCTS` array in `js/app.js`.

**Change photography** — replace any Unsplash URL in `js/app.js` or `index.html` with your own CDN-hosted images.

**Connect a backend** — replace the `localStorage` read/write calls in `js/app.js` and `admin/js/admin.js` with `fetch()` calls to your REST API. The data shapes are already defined.

**Change admin password** — edit `DEFAULT_CREDENTIALS` in `admin/js/admin.js`, or change it at runtime via the admin Settings page.

---

Built for **Furniture Empire** · Tanzania 🇹🇿 · v3.0 — 2025
