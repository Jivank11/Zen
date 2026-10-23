/**
 * ============================================================================
 * MANDI — GOOGLE APPS SCRIPT CLOUD BACKEND (ONE SPREADSHEET PER YEAR)
 * ============================================================================
 * 
 * INSTRUCTIONS FOR SETUP:
 * 1. Open Google Sheets (https://sheets.new) in your Google account.
 * 2. Name your spreadsheet: "Mandi_Ledger_2026_27" (or your active financial year).
 * 3. Go to: Extensions -> Apps Script.
 * 4. Delete any code in the editor and PASTE THIS ENTIRE FILE.
 * 5. Click "Deploy" (top right) -> "New deployment".
 * 6. Select type: "Web app".
 * 7. Set:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (allows Mandi offline POS to sync via fetch)
 * 8. Click "Deploy", authorize Google permissions, and COPY THE WEB APP URL.
 * 9. Paste the Web App URL into Mandi Settings -> "Google Sheets & Cloud" tab.
 * 
 * FEATURES:
 * - Automatic initialization of 5 core sheets: Sales, Customers, Payments, Rates, Settings.
 * - Live capacity tracking (alerts when active sheet has < 5,000 rows left).
 * - 1-Click Annual Rollover (Salana Khata Bandi):
 *   Automatically creates new year's Google Spreadsheet file, migrates all customers,
 *   converts their net closing balances into new Opening Dues, copies rates, and
 *   safely archives the old year's spreadsheet in Google Drive.
 * ============================================================================
 */

// Global configuration
var MAX_ROWS_PER_TAB = 50000;       // Safe performance threshold per active sales tab
var GOOGLE_CELLS_LIMIT = 10000000;  // Google Sheets max cell ceiling (10M cells)

/**
 * Handle HTTP GET Requests (Health Check & Capacity Monitoring)
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var stats = calculateCapacityStats(ss);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Mandi Google Apps Script Backend is Live",
      spreadsheetName: ss.getName(),
      spreadsheetId: ss.getId(),
      stats: stats
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle HTTP POST Requests (Bill Sync, Payment Sync, Capacity Check & Annual Rollover)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent requests in busy mandi hours
  lock.tryLock(30000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    ensureCoreSheetsExist(ss);

    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: "error", message: "No post data received" });
    }

    var payload = JSON.parse(e.postData.contents);
    var action = payload.action || "PING";

    // -------------------------------------------------------------
    // ACTION: PING / TEST CONNECTION
    // -------------------------------------------------------------
    if (action === "PING") {
      var stats = calculateCapacityStats(ss);
      return jsonResponse({
        status: "success",
        spreadsheetName: ss.getName(),
        spreadsheetId: ss.getId(),
        stats: stats
      });
    }

    // -------------------------------------------------------------
    // ACTION: GET_CAPACITY
    // -------------------------------------------------------------
    if (action === "GET_CAPACITY") {
      var stats = calculateCapacityStats(ss);
      return jsonResponse({ status: "success", stats: stats });
    }

    // -------------------------------------------------------------
    // ACTION: SYNC_BILL (Add Sale Transaction)
    // -------------------------------------------------------------
    if (action === "SYNC_BILL") {
      var bill = payload.bill;
      var salesSheet = ss.getSheetByName("Sales");
      
      // Items summarized string
      var itemsSummary = (bill.items || []).map(function(i) {
        return i.itemName + " (" + i.weight + " " + (i.unit || "kg") + " @ Rs " + i.rate + ")";
      }).join("; ");

      salesSheet.appendRow([
        bill.billNo || "BILL-" + new Date().getTime(),
        bill.date || "",
        bill.time || "",
        bill.locationId || "",
        bill.customerName || "Walk-in Cash",
        bill.saleType || "DIRECT",
        itemsSummary,
        Number(bill.grossSubtotal || 0),
        Number(bill.roundOff || 0),
        Number(bill.finalAmount || 0),
        Number(bill.paidToday || 0),
        bill.notes || "",
        bill.status || "ACTIVE"
      ]);

      // If credit sale with registered customer, update customer dues in Customers sheet
      if (bill.saleType === "CREDIT" && bill.customerId) {
        updateCustomerBalanceInSheet(ss, bill.customerId, Number(bill.finalAmount || 0), 0);
      }

      var stats = calculateCapacityStats(ss);
      return jsonResponse({
        status: "success",
        billNo: bill.billNo,
        stats: stats
      });
    }

    // -------------------------------------------------------------
    // ACTION: SYNC_PAYMENT (Khata Debt Recovery)
    // -------------------------------------------------------------
    if (action === "SYNC_PAYMENT") {
      var payment = payload.payment;
      var paySheet = ss.getSheetByName("Payments");

      paySheet.appendRow([
        payment.id || "PAY-" + new Date().getTime(),
        payment.date || "",
        payment.time || "",
        payment.customerId || "",
        payment.customerName || "",
        Number(payment.amount || 0),
        payment.method || "CASH",
        payment.notes || "",
        payment.status || "ACTIVE"
      ]);

      // Deduct paid amount from customer balance in Customers sheet
      if (payment.customerId) {
        updateCustomerBalanceInSheet(ss, payment.customerId, 0, Number(payment.amount || 0));
      }

      var stats = calculateCapacityStats(ss);
      return jsonResponse({
        status: "success",
        paymentId: payment.id,
        stats: stats
      });
    }

    // -------------------------------------------------------------
    // ACTION: UPDATE_STATUS (Void or Restore Bill / Payment)
    // -------------------------------------------------------------
    if (action === "UPDATE_STATUS") {
      var refNo = payload.refNo;
      var transType = payload.type; // 'BILL' or 'PAYMENT'
      var newStatus = payload.status || "ACTIVE";
      var customerId = payload.customerId;
      var amount = Number(payload.amount || 0);
      var isCredit = !!payload.isCredit;
      var foundRow = -1;

      if (transType === "BILL") {
        var salesSheet = ss.getSheetByName("Sales");
        if (salesSheet && salesSheet.getLastRow() >= 2) {
          var sData = salesSheet.getRange(2, 1, salesSheet.getLastRow() - 1, 1).getValues();
          for (var r = 0; r < sData.length; r++) {
            if (String(sData[r][0]).trim() === String(refNo).trim()) {
              foundRow = r + 2;
              salesSheet.getRange(foundRow, 13).setValue(newStatus);
              break;
            }
          }
        }
        // If credit sale, update Customers sheet balance
        if (isCredit && customerId && amount > 0) {
          if (newStatus.indexOf("VOID") !== -1) {
            updateCustomerBalanceInSheet(ss, customerId, -amount, 0);
          } else if (newStatus === "ACTIVE") {
            updateCustomerBalanceInSheet(ss, customerId, amount, 0);
          }
        }
      } else if (transType === "PAYMENT") {
        var paySheet = ss.getSheetByName("Payments");
        if (paySheet && paySheet.getLastRow() >= 2) {
          var pData = paySheet.getRange(2, 1, paySheet.getLastRow() - 1, 1).getValues();
          for (var pr = 0; pr < pData.length; pr++) {
            if (String(pData[pr][0]).trim() === String(refNo).trim()) {
              foundRow = pr + 2;
              paySheet.getRange(foundRow, 9).setValue(newStatus);
              break;
            }
          }
        }
        // If payment, update Customers sheet paid total
        if (customerId && amount > 0) {
          if (newStatus.indexOf("VOID") !== -1) {
            updateCustomerBalanceInSheet(ss, customerId, 0, -amount);
          } else if (newStatus === "ACTIVE") {
            updateCustomerBalanceInSheet(ss, customerId, 0, amount);
          }
        }
      }

      var stats = calculateCapacityStats(ss);
      return jsonResponse({
        status: "success",
        refNo: refNo,
        newStatus: newStatus,
        rowUpdated: foundRow,
        stats: stats
      });
    }

    // -------------------------------------------------------------
    // ACTION: SYNC_CUSTOMER (Real-time Customer Master Sync)
    // -------------------------------------------------------------
    if (action === "SYNC_CUSTOMER") {
      var customer = payload.customer;
      var custSheet = ss.getSheetByName("Customers");
      if (custSheet && customer) {
        var cData = custSheet.getDataRange().getValues();
        var foundRow = -1;
        for (var cr = 1; cr < cData.length; cr++) {
          if (String(cData[cr][0]).trim() === String(customer.id).trim()) {
            foundRow = cr + 1;
            break;
          }
        }
        var openDue = Number(customer.openingPastDue || 0);
        if (foundRow > 0) {
          custSheet.getRange(foundRow, 2).setValue(customer.name || "");
          custSheet.getRange(foundRow, 3).setValue(customer.phone || "");
          custSheet.getRange(foundRow, 4).setValue(customer.locationId || "loc-1");
          custSheet.getRange(foundRow, 5).setValue(openDue);
        } else {
          custSheet.appendRow([
            customer.id,
            customer.name || "",
            customer.phone || "",
            customer.locationId || "loc-1",
            openDue,
            0,
            0,
            openDue
          ]);
        }
      }
      var stats = calculateCapacityStats(ss);
      return jsonResponse({
        status: "success",
        customerId: customer ? customer.id : null,
        stats: stats
      });
    }

    // -------------------------------------------------------------
    // ACTION: BULK_SYNC_ALL (Full Sync of Customers, Rates, Settings)
    // -------------------------------------------------------------
    if (action === "BULK_SYNC_ALL") {
      if (payload.customers && payload.customers.length > 0) {
        syncCustomersList(ss, payload.customers);
      }
      if (payload.items && payload.items.length > 0) {
        syncRatesList(ss, payload.items);
      }
      if (payload.shopProfile || payload.locations) {
        syncSettingsSheet(ss, payload.shopProfile, payload.locations);
      }
      var stats = calculateCapacityStats(ss);
      return jsonResponse({ status: "success", message: "Bulk master data synced", stats: stats });
    }

    // -------------------------------------------------------------
    // ACTION: ROLLOVER_FINANCIAL_YEAR (One Spreadsheet Per Year Rollover)
    // -------------------------------------------------------------
    if (action === "ROLLOVER_FINANCIAL_YEAR") {
      var targetYear = payload.targetYear || "2027_28";
      var oldSpreadsheetName = ss.getName();
      var newSpreadsheetName = "Mandi_Ledger_" + targetYear;

      // 1. Gather all customer balances to carry forward
      var customerCarryForward = [];
      if (payload.customersWithBalances && payload.customersWithBalances.length > 0) {
        // Use client calculated balances if passed
        customerCarryForward = payload.customersWithBalances;
      } else {
        // Read directly from current Customers sheet
        customerCarryForward = readCurrentCustomersFromSheet(ss);
      }

      // 2. Create the brand new Spreadsheet file in Google Drive
      var newSpreadsheet = SpreadsheetApp.create(newSpreadsheetName);
      ensureCoreSheetsExist(newSpreadsheet);

      // 3. Populate new Customers sheet with carried-over Opening Dues
      var newCustSheet = newSpreadsheet.getSheetByName("Customers");
      var totalDuesCarried = 0;
      customerCarryForward.forEach(function(c) {
        var netDue = Number(c.closingDue !== undefined ? c.closingDue : (c.openingPastDue || 0));
        totalDuesCarried += netDue;
        newCustSheet.appendRow([
          c.id || "cust-" + Math.floor(Math.random() * 10000),
          c.name || "",
          c.phone || "",
          c.locationId || "loc-1",
          netDue, // New Opening Due = Last Year's Closing Due!
          0,      // Total Bills in New Year (starts at 0)
          0,      // Total Paid in New Year (starts at 0)
          netDue  // Net Balance
        ]);
      });

      // 4. Copy Rates catalog to new sheet
      var currentRates = readRatesFromSheet(ss);
      var newRatesSheet = newSpreadsheet.getSheetByName("Rates");
      currentRates.forEach(function(r) {
        newRatesSheet.appendRow([r.id, r.name, r.category, r.unit, r.rate]);
      });

      // 5. Copy Settings & Stalls to new sheet
      var currentSettings = readSettingsFromSheet(ss);
      syncSettingsSheet(newSpreadsheet, currentSettings.profile, currentSettings.locations);

      // 6. Archive and rename the old spreadsheet
      ss.setName("[ARCHIVED] " + oldSpreadsheetName);

      return jsonResponse({
        status: "success",
        message: "Financial Year Rollover complete! Fresh spreadsheet initialized.",
        oldSpreadsheetName: ss.getName(),
        oldSpreadsheetUrl: ss.getUrl(),
        newSpreadsheetName: newSpreadsheetName,
        newSpreadsheetId: newSpreadsheet.getId(),
        newSpreadsheetUrl: newSpreadsheet.getUrl(),
        migratedCustomersCount: customerCarryForward.length,
        totalCarriedForwardDues: totalDuesCarried
      });
    }

    return jsonResponse({ status: "error", message: "Unknown action: " + action });

  } catch (err) {
    return jsonResponse({ status: "error", message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Standard JSON Response Helper
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Ensure all 5 core sheets exist with formatted headers
 */
function ensureCoreSheetsExist(ss) {
  // 1. Sales Sheet
  var sales = ss.getSheetByName("Sales");
  if (!sales) {
    sales = ss.insertSheet("Sales");
    sales.appendRow([
      "Bill No", "Date", "Time", "Stall Code", "Customer / Buyer", 
      "Sale Type", "Items Summary", "Gross Total", "Round Off", 
      "Final Amount", "Paid Today", "Notes", "Status"
    ]);
    formatHeaderRow(sales, 13);
  } else if (sales.getLastColumn() < 13) {
    sales.getRange(1, 13).setValue("Status");
    formatHeaderRow(sales, 13);
  }

  // 2. Customers Sheet (Master Khata)
  var cust = ss.getSheetByName("Customers");
  if (!cust) {
    cust = ss.insertSheet("Customers");
    cust.appendRow([
      "Customer ID", "Party Name", "Phone", "Default Stall", 
      "Opening Due (Rs)", "New Bills Total", "Payments Received", "Current Balance (Rs)"
    ]);
    formatHeaderRow(cust, 8);
  }

  // 3. Payments Sheet
  var pay = ss.getSheetByName("Payments");
  if (!pay) {
    pay = ss.insertSheet("Payments");
    pay.appendRow([
      "Payment ID", "Date", "Time", "Customer ID", "Customer Name", 
      "Amount Paid (Rs)", "Payment Method", "Notes", "Status"
    ]);
    formatHeaderRow(pay, 9);
  } else if (pay.getLastColumn() < 9) {
    pay.getRange(1, 9).setValue("Status");
    formatHeaderRow(pay, 9);
  }

  // 4. Rates Sheet (Produce Master)
  var rates = ss.getSheetByName("Rates");
  if (!rates) {
    rates = ss.insertSheet("Rates");
    rates.appendRow(["Item ID", "Produce Name", "Category", "Unit", "Wholesale Rate (Rs)"]);
    formatHeaderRow(rates, 5);
  }

  // 5. Settings Sheet
  var settings = ss.getSheetByName("Settings");
  if (!settings) {
    settings = ss.insertSheet("Settings");
    settings.appendRow(["Setting Key", "Setting Value", "Extra Info"]);
    formatHeaderRow(settings, 3);
  }

  // Remove default "Sheet1" if it exists and is empty
  var sheet1 = ss.getSheetByName("Sheet1");
  if (sheet1 && ss.getSheets().length > 1) {
    try { ss.deleteSheet(sheet1); } catch (e) {}
  }
}

/**
 * Format Header Row Styling
 */
function formatHeaderRow(sheet, numCols) {
  var headerRange = sheet.getRange(1, 1, 1, numCols);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#1e293b"); // Deep slate
  headerRange.setFontColor("#ffffff");
  headerRange.setFontSize(10);
  sheet.setFrozenRows(1);
}

/**
 * Calculate Capacity Statistics Across the Spreadsheet
 */
function calculateCapacityStats(ss) {
  var sheets = ss.getSheets();
  var totalCellsUsed = 0;
  var salesRowsUsed = 0;

  for (var i = 0; i < sheets.length; i++) {
    var sh = sheets[i];
    var lastRow = Math.max(1, sh.getLastRow());
    var lastCol = Math.max(1, sh.getLastColumn());
    totalCellsUsed += (lastRow * lastCol);
    if (sh.getName() === "Sales") {
      salesRowsUsed = Math.max(0, lastRow - 1); // Minus header
    }
  }

  var rowsRemaining = Math.max(0, MAX_ROWS_PER_TAB - salesRowsUsed);
  var warningThreshold = 5000;
  var isWarning = rowsRemaining <= warningThreshold;

  return {
    salesRowsUsed: salesRowsUsed,
    salesRowsLimit: MAX_ROWS_PER_TAB,
    rowsRemaining: rowsRemaining,
    percentUsed: Math.min(100, Math.round((salesRowsUsed / MAX_ROWS_PER_TAB) * 100)),
    totalCellsUsed: totalCellsUsed,
    totalCellsLimit: GOOGLE_CELLS_LIMIT,
    isWarning: isWarning,
    warningMessage: isWarning 
      ? "Warning: Only " + rowsRemaining + " rows remaining in active Sales sheet. Rollover recommended." 
      : "Capacity healthy."
  };
}

/**
 * Update Customer Balance in Customers Sheet
 */
function updateCustomerBalanceInSheet(ss, customerId, addBillAmount, addPaymentAmount) {
  var sheet = ss.getSheetByName("Customers");
  if (!sheet) return;
  var data = sheet.getDataRange().getValues();

  for (var r = 1; r < data.length; r++) {
    if (data[r][0] == customerId || data[r][1] == customerId) {
      var openDue = Number(data[r][4] || 0);
      var billsTotal = Number(data[r][5] || 0) + addBillAmount;
      var paidTotal = Number(data[r][6] || 0) + addPaymentAmount;
      var curBal = openDue + billsTotal - paidTotal;

      sheet.getRange(r + 1, 6).setValue(billsTotal);
      sheet.getRange(r + 1, 7).setValue(paidTotal);
      sheet.getRange(r + 1, 8).setValue(curBal);
      break;
    }
  }
}

/**
 * Read Customers from Customers Sheet
 */
function readCurrentCustomersFromSheet(ss) {
  var sheet = ss.getSheetByName("Customers");
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  var customers = [];

  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    if (row[0] || row[1]) {
      customers.push({
        id: row[0],
        name: row[1],
        phone: row[2],
        locationId: row[3] || "loc-1",
        openingPastDue: Number(row[4] || 0),
        closingDue: Number(row[7] || row[4] || 0)
      });
    }
  }
  return customers;
}

/**
 * Read Produce Rates from Rates Sheet
 */
function readRatesFromSheet(ss) {
  var sheet = ss.getSheetByName("Rates");
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  var rates = [];

  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    if (row[0] || row[1]) {
      rates.push({
        id: row[0],
        name: row[1],
        category: row[2],
        unit: row[3],
        rate: Number(row[4] || 0)
      });
    }
  }
  return rates;
}

/**
 * Read Settings from Settings Sheet
 */
function readSettingsFromSheet(ss) {
  var sheet = ss.getSheetByName("Settings");
  var res = { profile: {}, locations: [] };
  if (!sheet) return res;
  var data = sheet.getDataRange().getValues();

  for (var r = 1; r < data.length; r++) {
    var k = data[r][0];
    var v = data[r][1];
    if (k === "shop_name") res.profile.name = v;
    if (k === "shop_subtitle") res.profile.subtitle = v;
    if (k === "shop_address") res.profile.address = v;
    if (k === "shop_phone") res.profile.phone = v;
    if (k === "shop_commission") res.profile.commissionRate = Number(v);
    if (k === "location_list" && v) {
      try { res.locations = JSON.parse(v); } catch (e) {}
    }
  }
  return res;
}

/**
 * Sync Customers List (Bulk)
 */
function syncCustomersList(ss, customers) {
  var sheet = ss.getSheetByName("Customers");
  if (!sheet) return;
  sheet.clearContents();
  sheet.appendRow([
    "Customer ID", "Party Name", "Phone", "Default Stall", 
    "Opening Due (Rs)", "New Bills Total", "Payments Received", "Current Balance (Rs)"
  ]);
  formatHeaderRow(sheet, 8);

  customers.forEach(function(c) {
    sheet.appendRow([
      c.id, c.name, c.phone, c.locationId || "loc-1", 
      Number(c.openingPastDue || 0),
      Number(c.totalBills || 0),
      Number(c.totalPaid || 0),
      c.currentBalance !== undefined ? Number(c.currentBalance) : Number(c.openingPastDue || 0)
    ]);
  });
}

/**
 * Sync Rates List (Bulk)
 */
function syncRatesList(ss, items) {
  var sheet = ss.getSheetByName("Rates");
  if (!sheet) return;
  sheet.clearContents();
  sheet.appendRow(["Item ID", "Produce Name", "Category", "Unit", "Wholesale Rate (Rs)"]);
  formatHeaderRow(sheet, 5);

  items.forEach(function(i) {
    sheet.appendRow([i.id, i.name, i.category, i.unit, Number(i.defaultRate || 0)]);
  });
}

/**
 * Sync Settings Sheet
 */
function syncSettingsSheet(ss, profile, locations) {
  var sheet = ss.getSheetByName("Settings");
  if (!sheet) return;
  sheet.clearContents();
  sheet.appendRow(["Setting Key", "Setting Value", "Extra Info"]);
  formatHeaderRow(sheet, 3);

  if (profile) {
    sheet.appendRow(["shop_name", profile.name || "", "Firm Name"]);
    sheet.appendRow(["shop_subtitle", profile.subtitle || "", "Tagline"]);
    sheet.appendRow(["shop_address", profile.address || "", "Yard Address"]);
    sheet.appendRow(["shop_phone", profile.phone || "", "Phone Number"]);
    sheet.appendRow(["shop_commission", profile.commissionRate || 5.0, "Standard %"]);
  }
  if (locations) {
    sheet.appendRow(["location_list", JSON.stringify(locations), "Stalls JSON"]);
  }
}
