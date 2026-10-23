# Mandi — Wholesale Produce POS & Credit Ledger System
## Feature Specification & Product Capabilities

**Mandi** is a high-speed, offline-first Point of Sale (POS) and credit accounting ledger built specifically for fruit and vegetable commission agents (*Adathiyas*), wholesale produce merchants, and mandi trading stalls.

Designed to operate seamlessly during high-velocity morning trading hours without internet dependencies, Mandi replaces paper diaries (*Bahi Khata*) and generic retail software with produce-specific workflows.

---

## 1. High-Speed Auction Billing & Thermal Printing

* **Rapid Produce Docket:** Ring up crates, sacks, and kilograms in seconds with keyboard-optimized and touch-ready inputs.
* **Produce-Specific Units:** Native support for standard mandi packing units:
  * Kilograms (`kg`)
  * Crates (`crate`)
  * Sacks / Bags (`bag`)
  * Boxes (`box`)
  * Quintals (`qtl`)
* **Live Mathematical Calculation:** Real-time calculation of gross subtotal, automatic weight-to-rate multiplication, and line item tallying.
* **On-the-Fly Round-Off:** Flexible bargaining adjustments and spot cash rounding directly on the bill docket with single-keystroke accuracy.
* **Standard 80mm Thermal Receipt Slip:** Instant generation of clean, formatted receipts for thermal printers, displaying firm header, item breakdown, payment status, and custom notes.

---

## 2. Dual Settlement Architecture: Spot Cash vs. Daily Credit (Khata)

* **Direct Cash Mode:** 1-click checkout for retail walk-in buyers and spot cash transactions without requiring party registration.
* **Daily Credit (Khata) Mode:** Link transactions directly to a registered buyer's ledger with automatic carry-forward balance calculation.
* **Instant Switching:** Toggle between Cash and Credit with a single click while building the bill.

---

## 3. Smart Khata Ledger & Real-Time Overdue Protection

* **Instant Party History on Billing Screen:** Selecting a credit buyer immediately surfaces their financial standing before confirming the bill:
  * Past overdue debt carry-over
  * Today's fresh credit purchases
  * Today's cash repayments
  * Net outstanding balance
* **Color-Coded Risk Indicators:**
  * **Green (Clear):** Zero pending debt.
  * **Amber (Low Balance):** Dues under ₹10,000.
  * **Red (High Exposure):** Overdue debt exceeding ₹10,000, alerting the cashier before extending further credit.
* **Dedicated Customer Dossier:** Individual party ledgers featuring complete contact info, transaction history, statement date-range filters, and 1-click printable statements.

---

## 4. Roznamcha / Daily Audit Register (Daybook)

* **Single-Screen Audit Trail:** Real-time log of every bill issued and every repayment received throughout the day.
* **Cash Drawer vs. Credit Reconciliation:** Clear separation between physical cash collected in the drawer and credit extended.
* **Filter by Location & Date:** Switch seamlessly between active dates and market stalls to audit individual counters.
* **Instant Cancellation with Ledger Rollback:** Cancel mistaken bills with automatic adjustment of customer credit balances.

---

## 5. Executive Business Dashboard & Analytics

* **KPI Summary Cards:**
  * **Gross Sales:** Total monetary turnover for the selected date.
  * **Cash In Hand:** Total physical cash collected (direct sales + credit collections).
  * **Credit Extended:** Total debt issued during the day.
  * **Recovery Rate:** Percentage of credit successfully collected.
* **Top Debtors & Exposure Watchlist:** Ranked table of highest outstanding credit parties to guide evening collection calls.
* **Category Breakdown:** Sales distribution across Vegetables, Fruits, and Grains.

---

## 6. Produce Price Board & Daily Rate Master

* **Daily Wholesale Price Board:** Rapid rate updating for morning auctions across all commodity lots.
* **Categorized Produce Catalog:** Organized by Vegetables, Fruits, and Grains with search and filter capabilities.
* **Custom Commodity Onboarding:** Add new seasonal commodities (e.g., Alfonso Mangoes, Kinnow, Garlic) on demand with default rates and packaging units.

---

## 7. 1-Click Excel & CSV Data Center

* **UTF-8 BOM Certified Exports:** Download spreadsheets that open cleanly in Microsoft Excel, Google Sheets, and mobile WPS Office without corrupted Hindi characters or broken rupee symbols.
* **Standard Export Registers:**
  * Customer Khata Ledger (`.csv`)
  * Produce Rates Master (`.csv`)
  * Sales & Bills Register (`.csv`)
* **Bulk Data Onboarding (Import):**
  * Bulk import customer contacts and opening debt diaries via CSV.
  * Bulk import produce price lists via CSV.
  * Ready-to-download sample spreadsheet templates.

---

## 8. Google Sheets Cloud Sync & One Spreadsheet Per Year Architecture

* **Zero-Cost Serverless Cloud Backup:** Connects to Google Sheets using Google Apps Script Web App without paid third-party database subscriptions.
* **One Spreadsheet Per Year Structure:** Maintains one master workbook per financial year (e.g., `Mandi_Ledger_2026_27`), keeping cloud performance fast and orderly.
* **Live Storage Capacity Meter:** Tracks active rows against the safe 50,000-row performance threshold with automatic alerts when under 5,000 rows remain.
* **1-Click Annual Rollover (*Salana Khata Bandi*):**
  * Creates a fresh Google Sheet file for the upcoming year in Google Drive.
  * Automatically migrates all customer records.
  * **Converts each customer's final closing debt into their new Opening Due**.
  * Copies over produce rates, stall counters, and firm profiles.
  * Archives the previous year's spreadsheet as read-only.

---

## 9. Daily Shop SOP & Dynamic Checklist

* **Interactive Daily Operational SOP:** Structured task checklist divided into operational phases:
  * **Morning Opening:** Verify date/stall, check market arrival rates.
  * **Daytime Rush:** Fast billing, round-off negotiation, thermal slips.
  * **Night Closing:** Evening collection rounds, drawer cash count, Khata review.
* **Custom Task Creator:** Add firm-specific routine reminders (e.g., *"Check potato truck unloading"*, *"Charge electronic weighing scale"*).
* **Live Completion Progress Bar:** Real-time percentage indicator tracking daily readiness.
* **1-Click Morning Reset:** Uncheck completed tasks to start each morning fresh.

---

## 10. Multi-Counter / Stall Operations & Full Portability

* **Multi-Location Counter Support:** Manage multiple sheds, platforms, or mobile auction carts under one shop profile.
* **PC-to-PC Database Cloning:** 1-click JSON database backup and restore to transfer data between office laptops and shop counter PCs.
* **Factory Reset:** Clean demo dataset reset option for testing and training new staff.

---

## 11. Resilience & Usability Standards

* **100% Offline-First:** Operates completely without internet; billing never stops if Wi-Fi or mobile data fails.
* **Bilingual Interface:** Instant 1-click toggle between **English** and **हिन्दी (Hindi)**.
* **High-Contrast Dark & Light Themes:** Dark theme for low-light morning auctions (4:00 AM) and crisp light theme for daytime office accounting.
* **Zero Emojis:** Strictly professional, corporate produce commerce interface.
* **Adaptive Mobile POS Experience:** Engineered for compact mobile devices (down to 320px width / iPhone SE) with responsive compact header badges (Sync dot indicator, short Lock badge, compact language and theme toggles) preventing horizontal overflow, responsive 2-column catalog grid, and live floating bill drawer bar.

---

## 12. Owner Security PIN & Role Lock

* **4-Digit Master PIN:** Configurable owner PIN (default `1234`) restricting destructive administrative actions while keeping high-velocity cashier auction billing frictionless.
* **Protected Operations:**
  * Clean slate factory reset and sample dataset load.
  * Annual financial rollover (*Salana Khata Bandi*).
  * Daybook transaction cancellations and bill deletions.
* **1-Click Header Lock Toggle:** Header lock button displaying current mode (`Cashier Mode` or `Owner Active`), enabling instant 1-click locking when stepping away from the counter.
* **Universal Touch Keypad & Physical Keyboard Modal:** Responsive on-screen 3x4 numeric keypad with live dot feedback and physical keyboard input for fast PIN verification.
* **Session Persistence:** Authorizes the owner across tabs for the current browser session (`sessionStorage`), auto-locking when the tab or browser is closed.

---

## 13. Mobile Offline Sync Queue & Auto-Flushing

* **Resilient LocalStorage Queue:** Background queue (`store.data.syncQueue`) preserving all bills and debt settlements created while offline or during temporary connectivity drops.
* **Real-Time Dynamic Header Pill:** Top navigation status indicator displaying:
  * `Synced`: Local database is in full parity with Google Sheets.
  * `Local`: Local storage active without cloud credentials configured.
  * `[N] Queued`: Unsynced records safely buffered in local memory.
  * `Syncing...`: Background cloud transmission in progress.
  * `Offline ([N])`: No network connectivity detected, auto-buffering all entries.
* **Auto-Flushing on Reconnection:** Listens to `window.addEventListener('online')` to automatically batch-post queued transactions to Google Sheets upon network recovery.
* **Manual Cloud Sync Controls:** 1-click "Flush Queue to Cloud" and "Test Cloud Connection" buttons in Settings.

---

## 14. 1-Click WhatsApp Bill & Statement Dispatch Engine

* **Zero-Cost Click-to-Chat Deep Links:** Built-in integration using official `https://wa.me/` protocol with zero API fees, zero third-party subscriptions, and zero backend required.
* **Direct Customer Routing:** Automatically extracts customer phone number and formats with standard national country code (`+91`), opening directly into that buyer's chat.
* **Walk-In Cash Support:** If billing a cash buyer without a saved phone number, prompts for a quick 10-digit number or opens WhatsApp's contact picker.
* **Formatted Monospace Receipts:** Formats itemized weights, rates, totals, round-off, cash received, and real-time customer Khata balance breakdown (past overdue, today's credit, net outstanding, or advance deposit).
* **Payment Receipt Slips:** Instant WhatsApp confirmation for cash repayments and bank transfers (*Bhooktan*), showing remaining debt balance.
* **1-Click Khata Statement Sharing:** Share full period statements directly from the Customer Ledger screen for evening debt collection rounds.
* **Universal Device Compatibility:** 1-tap app launch on Android and iOS smartphones, and automatic tab opening in WhatsApp Web or WhatsApp Desktop on PCs.

---

## 15. Inventory, Wastage & Profit Management Engine

* **Dedicated Inventory Module (`inventory.html`):** Comprehensive stock and commodity tracking interface with real-time stock levels, purchase cost rates, and margin visibility.
* **Mandi Stock Board (Stock Master):**
  * Live stock levels per commodity with visual badges (`Healthy`, `Low Stock Alert`, `Out of Stock`).
  * Dual-rate visibility: Purchase Rate (*Khareed Rate*) vs Selling Rate (*Bikri Rate*).
  * Unit gross margin calculation in rupees and percentage (`₹ / %`).
  * Total commodity inventory valuation (`currentStock * costPrice`).
  * Multi-category filtering (Vegetables, Fruits, Grains) and stock status filtering.
* **Inward Stock Register (*Maal Aamad*):**
  * Logs all incoming produce shipments, trucks, and farm arrivals.
  * Records supplier / commission agent, lot quantity, purchase cost rate, total lot cost, arrival date, stall location, and vehicle / challan notes.
  * Automatically increments commodity floor stock and optionally updates master purchase rate.
* **Wastage & Spoilage Register (*Kharab Maal*):**
  * Logs spoiled, rotten, or unsaleable produce write-offs.
  * Standardized loss reasons: *Spoiled / Rotten*, *Transport Bruised / Crushed*, *Moisture & Rain Damage*, *Weight Shrinkage / Dehydration*, *Overripe / Unsaleable*, *Handling Breakage*.
  * Calculates financial write-off loss based on purchase cost (`quantity * costPrice`).
  * Immediately deducts damaged stock from active inventory.
* **Physical Stock Count Reconciliation (Audit Modal):**
  * Allows shopkeeper to true-up system numbers with actual end-of-day physical scale tallies.
  * Computes discrepancy variance (+/-) and logs reconciliation reason.
* **Real-Time Billing Engine Depletion & Cost Locking:**
  * Bill generation automatically depletes `currentStock` in real time.
  * Captures and locks line-item `costPrice` at the moment of sale, ensuring profit accuracy even if wholesale purchase rates fluctuate later.
  * Produce tiles on billing docket display real-time stock badges and purchase rates.
* **Executive Profit & Valuation Analytics on Dashboard (`dashboard.html`):**
  * **Gross Profit:** Period sales turnover minus cost of goods sold (`grossTurnover - COGS`).
  * **Profit Margin (%):** Percentage margin earned across all produce categories.
  * **Net Profit:** Gross profit after deducting spoilage and wastage losses (`grossProfit - wastageLoss`).
  * **Current Stock Valuation:** Total capital tied up in active warehouse and stall inventory.
  * **Produce Profitability Leaderboard Table:** Ranked ranking of produce varieties by net profit, volume sold, revenue, cost, and margin percentage.
* **UTF-8 BOM CSV Exports:**
  * 1-click Excel-compatible CSV exports for Stock Master, Inward Arrivals Register, and Wastage & Spoilage Register.

