# Zen

> High-speed wholesale trade terminal, docket billing, customer khata ledger, and cloud synchronization for wholesale commission agencies.

Zen is a lightweight, zero-dependency, offline-first Point of Sale (POS) and financial ledger system engineered specifically for agricultural commission shops, wholesale grain/vegetable markets (Mandis), and trade platforms.

---

## Key Features

1. **High-Speed Docket Billing**
   * Rapid produce selection by category (Vegetables, Fruits, Grains).
   * Instant weight x rate line calculations with custom produce entry.
   * Dual payment types: Direct Cash and Daily Credit (Khata).
   * Exact round-off adjustment and thermal slip generation.
   * Direct WhatsApp receipt sharing with smart routing (PC WhatsApp Web and Mobile WhatsApp App).

2. **Customer Khata & Debt Aging Engine**
   * Dynamic balance breakdown: Past Overdue, Today's Credit, Today's Repaid, and Net Payable.
   * Automatic aging distribution (0-7 days, 8-15 days, 16-30 days, 30+ days overdue).
   * Detailed party transaction ledgers with PDF/Excel export.

3. **Daybook (Roznamcha) & Cash Drawer Reconciliation**
   * Live daily journal tracking every sale bill and repayment receipt.
   * Cash inflow audit separating spot cash from khata credit recovery.
   * Historical closed financial year audit books with read-only seals.

4. **Produce Catalog & Inventory Valuation**
   * Real-time stock counts with low-stock alerts.
   * Stock inward recording and wastage/spoilage loss accounting.
   * Physical inventory audit reconciliation and valuation analytics.

5. **Recycle Bin & Voided Records Vault**
   * Deleted transactions are safely quarantined rather than permanently purged.
   * 1-click restoration returning stock, customer balances, and daybook entries.
   * Real-time Google Sheets status synchronization (`VOID` vs `ACTIVE`).

6. **Google Sheets Cloud Sync & Annual Rollover**
   * Client-side direct connection via Google Apps Script Web App.
   * Auto-initializes 5 core sheets: `Sales`, `Customers`, `Payments`, `Rates`, `Settings`.
   * Live capacity monitoring (50,000 row safe ceiling).
   * 1-Click Annual Rollover (Salana Khata Bandi) automatically migrating closing dues to new fiscal sheets.

7. **Security & Session Controls**
   * Owner PIN protection for database resets, deletions, and cloud configuration.
   * Dual Cashier and Owner session modes.

8. **In-App Operating Manual & Help Center (`guide.html`)**
   * Real-time searchable procedural manual accessible directly inside the web terminal.
   * Step-by-step operating instructions for cashiers, accountants, and owners with zero internet requirement.

---

## Technology Stack

* **Frontend:** Semantic HTML5, Vanilla Modern CSS (Design tokens, dark mode, glassmorphism), Vanilla ES6+ JavaScript.
* **Storage:** LocalStorage (Offline-first resilient) + Google Sheets Cloud Database.
* **Backend:** Google Apps Script Web App (`google_sheets_sync.js`).
* **Dependencies:** Zero external npm libraries or heavy frameworks. Pure native browser execution.

---

## Deployment & Hosting

Zen is completely static and can be deployed in seconds to:
* **Vercel:** Connect GitHub repository, select root directory `./`, click Deploy.
* **GitHub Pages:** Enable GitHub Pages in repository settings pointing to root.
* **Local Network (APMC Yard / Shop):** Run via local server (XAMPP / Apache) accessible by any device on the shop Wi-Fi or mobile hotspot.

---

## Setup Instructions

1. Clone or download the repository:
   ```bash
   git clone https://github.com/Jivank11/zen.git
   ```
2. Open `index.html` in any modern web browser or host on Vercel.
3. For cloud synchronization:
   * Create a new Google Sheet named `Mandi_Ledger_2026_27`.
   * Open Extensions -> Apps Script, paste the contents of `google_sheets_sync.js`.
   * Deploy as Web App (Execute as: `Me`, Who has access: `Anyone`).
   * Paste the Web App URL into Zen Settings -> Google Sheets & Cloud tab.
