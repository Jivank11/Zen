# Mandi — Comprehensive User Guide
## Step-by-Step Operating Manual for Wholesale Produce Operations

This guide provides step-by-step instructions for operating **Mandi** during daily trading hours. Every section is written in clear, procedural language (*"click this, do this"*). Image placeholders are included throughout the guide where screenshots can be inserted.

---

## Table of Contents
1. [System Navigation & Top Bar Controls](#1-system-navigation--top-bar-controls)
2. [Produce Rates & Catalog Management](#2-produce-rates--catalog-management)
3. [Rapid Billing & Counter Sales](#3-rapid-billing--counter-sales)
4. [Customer Khata Ledger Management](#4-customer-khata-ledger-management)
5. [Receiving Payments & Debt Recoveries](#5-receiving-payments--debt-recoveries)
6. [Daybook (Roznamcha) Audit Register](#6-daybook-roznamcha-audit-register)
7. [Executive Business Dashboard](#7-executive-business-dashboard)
8. [Settings & Data Management](#8-settings--data-management)
   - [8.1 Shop Profile & Thermal Receipt Header](#81-shop-profile--thermal-receipt-header)
   - [8.2 Excel & CSV Data Sync](#82-excel--csv-data-sync)
   - [8.3 Google Sheets Cloud Sync & Annual Rollover](#83-google-sheets-cloud-sync--annual-rollover)
   - [8.4 Daily Shop SOP Checklist](#84-daily-shop-sop-checklist)
   - [8.5 System Backup & Cloning](#85-system-backup--cloning)
   - [8.6 Owner Security PIN & Counter Role Lock](#86-owner-security-pin--counter-role-lock)
   - [8.7 Mobile Offline Sync Queue & Auto-Flushing](#87-mobile-offline-sync-queue--auto-flushing)
9. [WhatsApp Bill & Statement Dispatch](#9-whatsapp-bill--statement-dispatch)

---

## 1. System Navigation & Top Bar Controls

The top header bar is present on all screens and controls global operations:

```
[Mandi]  LOCATION: [Main Mandi Yard v]  DATE: [2026-10-08]   Billing  Dashboard  Customers  Daybook  Rates  Settings   [Synced] [Lock]  [+ Create v]  [हिन्दी]  [Dark]
```

<!-- IMAGE PLACEHOLDER: header_navigation_bar.png -->

### Steps to Operate Top Header Controls:
1. **Switch Active Counter/Stall:** Click the **LOCATION** dropdown in the top-left to select your active selling platform (e.g., *Main Mandi Yard*, *Wholesale Shed B*).
2. **Change Operational Date:** Click the **DATE** picker to inspect past trading days or prepare bills for a specific date.
3. **Cloud Sync Status:** Observe the **Sync Pill** (`Synced`, `Local`, `[N] Queued`, `Offline`). Click the pill at any time to inspect queue details or trigger an immediate sync flush.
4. **Owner Lock / Cashier Toggle:** Click the **Lock Button** to toggle between **Cashier Mode** (default auction mode) and **Owner (Unlocked)**. When stepping away from the counter, 1-click lock immediately protects sensitive functions.
5. **Quick Action Menu:** Click the **+ Create** button in the top-right to quickly open shortcuts:
   * *New Bill*
   * *Receive Payment*
   * *New Customer*
   * *New Produce Item*
   * *New Location*
6. **Change Language:** Click **हिन्दी** to instantly switch the interface to Hindi, or click **English** to return to English.
7. **Switch Display Mode:** Click the **Theme** button to toggle between high-contrast **Dark Mode** (optimized for early morning auctions) and **Light Mode** (for daytime office work).

---

## 2. Produce Rates & Catalog Management

Before trading starts, set your daily wholesale auction prices in the **Rates** tab (`items.html`).

<!-- IMAGE PLACEHOLDER: rates_catalog_overview.png -->

### How to Update Daily Produce Prices:
1. Click **Rates** in the top navigation bar.
2. Locate the commodity you want to update (e.g., *Red Tomato*, *Nashik Onion*). Use the category tabs (*Vegetables*, *Fruits*, *Grains*) or the search bar to locate items quickly.
3. Click the **Edit Rate** button next to the item.
4. Type the new wholesale rate per kilogram, crate, or bag (e.g., `38.50`).
5. Click **Save Rate**. The new rate is now active on all new billing dockets immediately.

### How to Add a New Produce Commodity:
1. On the **Rates** screen (or via the **+ Create** button in the top header), click **+ Add Produce Item**.
2. Enter the **Produce Name** (e.g., *Nagpur Orange (Grade A)*).
3. Select the **Category** (*Vegetables*, *Fruits*, or *Grains*).
4. Select the standard **Unit** (`kg`, `crate`, `box`, `bag`, or `qtl`).
5. Enter the standard **Wholesale Rate** in rupees.
6. Click **Save Commodity**. The item will immediately appear on the billing screen.

---

## 3. Rapid Billing & Counter Sales

The **Billing** screen (`index.html`) is where produce is weighed and sold during auction hours.

<!-- IMAGE PLACEHOLDER: billing_screen_docket.png -->

### Step 3.1: Direct Cash Sale (Walk-in Buyer)
1. Click **Billing** in the top navigation.
2. Ensure the payment toggle is set to **Direct Cash** (active by default).
3. Click on a produce item from the catalog on the left (e.g., *Nashik Red Onion*).
4. The item appears in the **Active Bill Docket** on the right.
5. Type the weight or quantity (e.g., `45` kg). The line total calculates automatically.
6. Repeat for any additional produce items the buyer is taking.
7. If bargaining involves rounding down the amount, enter the adjustment in the **Round-Off** input (e.g., `-20.00`).
8. Click the large green button: **Complete & Print Bill**.
9. The 80mm thermal receipt preview appears:
   * **Print Thermal Slip:** Click **Print Receipt** to print directly to your 80mm thermal roll printer.
   * **Share on WhatsApp:** Click **Share WhatsApp** to instantly dispatch the itemized bill to the buyer's phone via WhatsApp.
10. Click **Close** (or press Escape) to return to the active docket for the next customer.

---

### Step 3.2: Daily Credit (Khata) Sale (Registered Buyer)
1. On the **Billing** screen, click the **Daily Credit (Khata)** toggle button.
2. A customer selection dropdown will appear on the docket.
3. Select the buyer's name (e.g., *Ramesh Sabzi Bhandar*).
4. **Inspect the Risk Banner:** An alert box immediately appears above the bill showing the buyer's financial standing:
   * **Past Overdue:** Carryover debt from previous days.
   * **Today's Credit:** Goods already taken today.
   * **Total Outstanding:** Net debt exposure.
5. Add the produce items, weights, and rates as usual.
6. Click **Complete & Print Bill**.
7. The bill is recorded under the customer's ledger, and their pending balance increases automatically without any paper bookkeeping required.

---

## 4. Customer Khata Ledger Management

The **Customers** screen (`customers.html`) provides a complete ledger (*Khata Dossier*) for all parties.

<!-- IMAGE PLACEHOLDER: customer_ledger_screen.png -->

### How to Add a New Customer / Buyer:
1. Click **Customers** in the navigation bar.
2. Click the **+ Add Customer** button at the top-right.
3. Enter the **Party Name** (e.g., *Kishan Daily Cart*).
4. Enter their **Phone Number** (e.g., `9845012345`).
5. Select their primary **Default Mandi Stall**.
6. Enter their **Opening Past Due (₹)** if they have an existing balance from your old paper diary. If they have zero debt, leave it as `0.00`.
7. Click **Save Customer**.

### How to View a Customer's Ledger Statement:
1. In the customer list, locate the party using the search bar or filter pills (*All*, *Clear*, *Overdue Dues*).
2. Click on the customer card to open their **Ledger Dossier**.
3. View their complete chronological ledger breakdown:
   * Starting Opening Due
   * Every bill purchased (with date, items, and amounts)
   * Every cash payment received
   * Running net balance
4. To print or export an official statement for the party, click **Print Statement**.

---

## 5. Receiving Payments & Debt Recoveries

When a credit buyer arrives in the afternoon or evening to settle their dues, record the recovery using the **Receive Payment** feature.

<!-- IMAGE PLACEHOLDER: receive_payment_modal.png -->

### Steps to Record a Payment:
1. Click **+ Create** in the top header and choose **Receive Payment** (or click the **Collect Payment** button on any customer ledger card).
2. The **Receive Payment** modal opens.
3. Select the **Customer / Party Name**.
4. The customer's current total pending debt is displayed automatically.
5. Enter the **Payment Amount Received (₹)** (e.g., `5000.00`).
6. Select the **Payment Mode**:
   * **Cash:** Adds to physical cash in register.
   * **UPI / Online:** Marks as bank transfer.
7. Optional: Enter a short memo in **Notes** (e.g., *"Evening collection via GPay"*).
8. Click **Save Payment Receipt**.
9. The customer's debt is reduced instantly, and a repayment entry is created in the Daybook.

---

## 6. Daybook (Roznamcha) Audit Register

The **Daybook** screen (`daybook.html`) serves as your daily financial audit log.

<!-- IMAGE PLACEHOLDER: daybook_audit_screen.png -->

### Steps to Audit Daily Operations:
1. Click **Daybook** in the top navigation.
2. Check the top summary metrics:
   * **Cash Collected in Register:** Physical cash from walk-in sales + cash debt collections.
   * **Credit Extended Today:** Goods given on Khata today.
   * **Total Bills Issued:** Count of transactions.
3. Scroll through the chronological transaction table.
4. **How to Cancel a Mistaken Bill:**
   * Locate the bill in the table.
   * Click the **Cancel** button on that row.
   * Confirm the prompt. The bill is voided, and if it was a credit bill, the customer's balance is automatically rolled back.
5. **How to Export Today's Audit:**
   * Click **Export CSV** at the top-right to download an Excel-compatible spreadsheet of the day's register.

---

## 7. Executive Business Dashboard

The **Dashboard** screen (`dashboard.html`) provides business analytics for owners and commission agents.

<!-- IMAGE PLACEHOLDER: business_dashboard_view.png -->

### How to Use the Dashboard:
1. Click **Dashboard** in the top navigation.
2. Review the four primary financial KPIs:
   * **Gross Sales:** Total monetary turnover for the selected date.
   * **Cash In Hand:** Real-time cash collection total.
   * **Credit Issued:** Debt exposure added today.
   * **Collection Rate:** Percentage of credit successfully collected.
3. Inspect the **Top Debtors Watchlist** to see the 5 customers with the highest outstanding debt. Use this list to prioritize evening recovery calls.
4. Review the **Commodity Sales Breakdown** to see which produce categories (Vegetables vs. Fruits vs. Grains) generated the highest volume.

---

## 8. Settings & Data Management

The **Settings** screen (`settings.html`) is organized into dedicated operational tabs:

<!-- IMAGE PLACEHOLDER: settings_tabs_overview.png -->

### 8.1 Shop Profile & Thermal Receipt Header
1. Click **Settings** → **Shop & Stalls** tab.
2. Enter your **Shop / Firm Name** (e.g., *Mandi Commission Agency*).
3. Enter your **Produce Tagline** (e.g., *Wholesale Fruits & Vegetables*).
4. Enter your **Mandi Yard Address** (e.g., *Main Mandi Yard, Gate No. 2*).
5. Enter your **Contact Phone Number** and standard **Commission Rate (%)**.
6. Notice the **Thermal Receipt Slip Preview** on the right side updating in real-time as you type.
7. Click **Save Shop Profile**.

---

### 8.2 Excel & CSV Data Sync
1. Click **Settings** → **Excel & CSV Data** tab.
2. **Exporting Data:**
   * Click **Export Excel** under *Customer Khata Ledger* to download all party balances.
   * Click **Export Excel** under *Produce Rates Master* to download your price catalog.
   * Click **Export Excel** under *Sales Register* to download complete billing logs.
   * *All files are UTF-8 BOM encoded, guaranteeing they open cleanly in Microsoft Excel without garbled text.*
3. **Importing Data from Spreadsheets:**
   * Click **Download Sample Template** to view the required column layout.
   * Click **Select Customer CSV File** to upload existing customer lists and opening debt balances in bulk.
   * Click **Select Produce CSV File** to upload produce items and wholesale prices in bulk.

---

### 8.3 Google Sheets Cloud Sync & Annual Rollover

Connect your database to Google Sheets for automated annual accounting (*Salana Khata Bandi*):

<!-- IMAGE PLACEHOLDER: google_sheets_sync_tab.png -->

#### Setting Up Google Sheets Connection:
1. Open Google Sheets ([sheets.new](https://sheets.new)) in your browser and name the sheet `Mandi_Ledger_2026_27`.
2. Click **Extensions → Apps Script**.
3. Copy the script from `google_sheets_sync.js` in your project folder and paste it into the editor.
4. Click **Deploy → New deployment → Web app**. Set *Execute as: Me* and *Who has access: Anyone*.
5. Copy the generated **Web App URL**.
6. Return to Mandi **Settings → Google Sheets & Cloud** tab.
7. Paste the Web App URL into the **Google Apps Script Web App URL** input.
8. Click **Save & Test Connection**. The status badge turns green (**Connected & Synced**).

#### Monitoring Sheet Capacity:
* Check the **Cloud Sheet Storage Capacity** bar.
* Safe operating threshold is **50,000 rows**.
* If remaining rows fall below **5,000**, an alert banner appears recommending an Annual Rollover.

#### Executing 1-Click Annual Rollover (*Salana Khata Bandi*):
1. Under **Annual Rollover & Customer Migration**, review the live statistics:
   * Total customers to migrate
   * Parties with pending dues
   * Total carried-forward debt
2. Enter the new year label (e.g., `2027_28`).
3. Click **Execute Annual Rollover & Carry Forward Dues**.
4. Confirm the prompt. The script automatically:
   * Creates a brand new Google Sheet in your Google Drive (`Mandi_Ledger_2027_28`).
   * Copies all customers, setting their **Closing Due as the new Opening Due**.
   * Copies your produce rates and stall settings.
   * Archives previous bills safely in the old sheet.
   * Reconnects your Mandi app to the fresh year.

---

### 8.4 Daily Shop SOP Checklist
1. Click **Settings** → **Daily SOP Checklist** tab.
2. Check off tasks as your shop progresses through the day (*Morning Opening*, *Daytime Rush*, *Night Closing*).
3. Add custom firm tasks (e.g., *"Check potato truck unloading"*) using the **+ Add Task** bar at the bottom.
4. Filter tasks using the phase pills (*Morning*, *Daytime*, *Night*, *Custom*).
5. At the start of a new morning, click **Reset for New Day** to clear all checkmarks for the new day's trade.

---

### 8.5 System Backup & Cloning
1. Click **Settings** → **Backup & Maintenance** tab.
2. **Download Full Database Image:** Click **Download Full System Image (.json)** to save an offline backup to a USB drive or laptop.
3. **Restore on Another PC:** Click **Restore System Image (.json)** and select your backup file to clone the system onto another computer.
4. **Factory Reset:** Use **Reset to Sample Demo Dataset** if you want to wipe test data and restore default sample data (requires Owner PIN).

---

### 8.6 Owner Security PIN & Counter Role Lock
1. **Default Cashier Mode:** During fast morning auctions, cashiers can issue bills, receive payments, and print thermal slips with zero friction.
2. **Protected Actions:** The 4-digit Owner PIN is required to perform destructive administrative actions:
   * Factory reset / database wipe
   * Annual financial rollover (*Salana Khata Bandi*)
   * Deleting transaction records from the Daybook
3. **Unlocking Owner Mode:**
   * Click the **Lock Button** in the top header.
   * Enter the 4-digit PIN (default is `1234`) using the on-screen numeric keypad or physical keyboard.
   * The button turns green and displays **Owner (Unlocked)**.
4. **Locking Again:** When leaving the cash counter, click the green **Owner (Unlocked)** button once to immediately lock back to Cashier Mode.
5. **Changing the Owner PIN:**
   * Go to **Settings** → **Backup & Maintenance** tab.
   * Locate the **Owner Security PIN & Lock** card.
   * Enter your current PIN, type a new 4-digit numeric PIN, confirm it, and click **Update Owner PIN**.

---

### 8.7 Mobile Offline Sync Queue & Auto-Flushing
1. **Offline Mode on Mobile Devices:** When running Mandi on mobile or tablet in the mandi yard with weak or no internet connectivity:
   * All sales bills and payments are immediately written to local storage.
   * A copy of each pending transaction is automatically placed into the **Offline Sync Queue** (`syncQueue`).
   * The top header displays an orange **Offline (N)** pill indicating how many records are buffered.
2. **Automatic Flushing:** As soon as internet connectivity returns, the application automatically posts all queued items to your Google Sheets workbook in the background. The pill switches to **Syncing...** and then **Synced**.
3. **Manual Queue Inspection & Flushing:**
   * Go to **Settings** → **Google Sheets & Cloud** tab.
   * In the **Offline Sync Queue** card, review the number of pending transactions.
   * Click **Flush Queue to Cloud** to force an immediate sync attempt.

---

## 9. WhatsApp Bill & Statement Dispatch

Mandi includes built-in WhatsApp sharing that works without third-party API costs or complex setups.

### 9.1 Sharing a Sales Bill via WhatsApp
1. Complete a sale on the **Billing** screen or click **Slip** on any transaction in the **Daybook** (`daybook.html`).
2. The Receipt Slip preview modal appears.
3. Click the green **Share WhatsApp** button.
4. **If billing a registered party:** WhatsApp opens automatically directly to that buyer's chat with the full formatted receipt pre-typed.
5. **If billing a walk-in cash buyer:** Enter the buyer's 10-digit mobile number when prompted, or leave blank to choose a contact directly inside WhatsApp.
6. Press **Send** in WhatsApp.

### 9.2 Sharing a Payment Collection Receipt
1. When collecting cash from a debtor, click **Receive Payment** (or **Settle** in the Khata screen).
2. Record the payment amount and click **Record Payment**.
3. In the payment receipt slip preview, click **Share WhatsApp**.
4. An itemized payment receipt is sent showing the exact amount collected and the customer's remaining Khata debt balance.

### 9.3 Sharing a Full Khata Statement
1. Go to **Customers** (`customers.html`) and click on any customer row.
2. The **Customer Ledger** modal appears.
3. Select your desired period filter (e.g., *7 Days*, *30 Days*, or *All Time*).
4. Click **Share WhatsApp** in the bottom-right of the modal.
5. A statement summary is sent to the buyer displaying Opening Due, Total Taken, Total Repaid, and Net Balance Due.

---

## 10. Inventory, Stock & Profit Management

Mandi features an integrated inventory system that tracks produce stock levels, incoming wholesale arrivals (*Maal Aamad*), spoilage losses (*Kharab Maal*), purchase cost rates (*Khareed Rate*), and net trading profit.

### 10.1 Mandi Stock Board (`inventory.html`)
1. Click **Inventory** in the top navigation bar (or **Stock** in the mobile bottom bar).
2. The **Mandi Stock Board** displays all produce commodities with:
   * **Current Floor Stock:** Available quantity in kg, boxes, crates, or bags.
   * **Stock Status Badge:** Green **Healthy**, Amber **Low Stock Alert**, or Red **Out of Stock**.
   * **Cost Rate (Khareed ₹):** Wholesale purchase rate.
   * **Selling Rate (Bikri ₹):** Default counter rate.
   * **Gross Margin:** Profit margin in ₹ per unit and percentage (`%`).
   * **Stock Valuation:** Total capital tied up in that commodity (`Stock * Cost Rate`).
3. Use the search input or dropdown filters to narrow down by category (Vegetables, Fruits, Grains) or stock alert level.

### 10.2 Recording Inward Stock Arrivals (*Maal Aamad*)
When fresh shipments arrive by truck or tempo from wholesale suppliers or farmers:
1. Click **+ Inward Stock** (or navigate to the **Inward Arrivals Register** tab and click **+ Record Inward Stock**).
2. Select the **Produce Commodity**. The unit and current cost price are pre-filled automatically.
3. Enter the **Received Quantity** (e.g., `250` kg).
4. Enter the **Purchase Rate** per unit (e.g., `₹24.00`). The modal dynamically calculates the **Total Lot Cost** (e.g., `₹6,000.00`).
5. Keep **Update master purchase cost price** checked if you want subsequent margin calculations to reflect this latest arrival rate.
6. Enter the **Supplier / Farmer Name** and any **Vehicle / Challan Notes** (e.g., `Truck MH-15-AB-4321, 10 crates`).
7. Click **Save Inward Stock**.
   * Commodity floor stock increments immediately.
   * The entry is logged in the permanent **Inward Arrivals Register** tab.

### 10.3 Logging Spoilage & Wastage (*Kharab Maal*)
Perishable produce that is bruised, rotten, dehydrated, or unsaleable should be written off to keep stock counts and profit numbers honest:
1. Click **+ Log Wastage** on the Inventory screen (or click the red **Spoil** button on any produce row).
2. Select the **Commodity** and enter the **Spoiled Quantity** to deduct.
3. The cost price and estimated financial loss are calculated automatically.
4. Select the **Write-Off Reason**:
   * *Spoiled / Rotten (सड़न / फफूंद)*
   * *Transport Bruised / Crushed (दबा हुआ माल)*
   * *Moisture & Rain Damage (बारिश व नमी से खराब)*
   * *Weight Shrinkage / Dehydration (सूखा व वजन घट)*
   * *Overripe / Unsaleable (अत्यधिक पका हुआ)*
   * *Handling Breakage (सफाई व छंटाई कचरा)*
5. Enter inspection notes and click **Confirm Stock Deduction**.
   * The damaged quantity is deducted from active inventory.
   * The financial write-off loss is recorded and deducted from business Net Profit.

### 10.4 Physical Stock Count Reconciliation (Scale Audit)
At the end of the day or weekly stock audit:
1. On the **Mandi Stock Board**, click the **Audit** button next to any commodity.
2. The modal displays the **System Recorded Stock** (e.g., `85 kg`).
3. Enter the actual weighed **Physical Counted Stock** from your scale (e.g., `81.5 kg`).
4. The system calculates the discrepancy variance (`-3.5 kg`).
5. Enter a reason (e.g., *End of day scale tally, moisture loss*) and click **Update Master Stock**.

### 10.5 Real-Time Billing & Profit Tracking
* **Automatic Stock Depletion:** Every time a sales bill is printed or settled, the sold weights are automatically deducted from `currentStock`.
* **Historical Cost Price Locking:** When a bill is finalized, the current wholesale cost price of each item is permanently locked into that bill's record. If purchase rates rise tomorrow, past bill profits remain 100% historically accurate.
* **Docket Stock Indicators:** On the **Billing** screen (`index.html`), produce tiles display current stock badges so cashiers immediately see which items are low or out of stock.

### 10.6 Reviewing Business Profit on the Dashboard (`dashboard.html`)
Navigate to the **Dashboard** to view executive profit analytics:
1. **Gross Profit (सकल मुनाफा):** Total sales turnover minus wholesale cost of goods sold (`Revenue - COGS`).
2. **Gross Margin (%):** Percentage margin earned on sales.
3. **Net Profit (शुद्ध लाभ):** Gross profit minus total spoilage losses (`Gross Profit - Spoilage Loss`).
4. **Stock Valuation (स्टॉक मूल्य):** Total financial value of all produce currently in stock.
5. **Produce Profitability Leaderboard:** Detailed table ranking produce items by Net Profit, Volume Sold, Revenue, Wholesale Cost, and Margin Percentage.


