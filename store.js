/**
 * MANDI — CORE DATA STORE & SHARED LOGIC
 * Manages LocalStorage, Business Rules, Overdue Calculations, i18n, and Global Modals
 */

const STORAGE_KEY = 'MANDI_POS_DATA_V3';
const THEME_KEY = 'MANDI_THEME_PREF';
const LANG_KEY = 'MANDI_LANG_PREF';

// Bilingual translations dictionary (Zero emojis)
const I18N_DICT = {
  en: {
    app_name: 'Zen',
    nav_billing: 'Billing',
    nav_dashboard: 'Dashboard',
    dashboard_title: 'Executive Business Dashboard',
    nav_customers: 'Customers',
    nav_daybook: 'Daybook',
    nav_inventory: 'Inventory',
    nav_rates: 'Rates',
    nav_settings: 'Settings',
    nav_guide: 'Guide',
    nav_more: 'More',

    // Mobile Navigation & More Sheet
    mob_nav_billing: 'Billing',
    mob_nav_stock: 'Stock',
    mob_nav_khata: 'Khata',
    mob_nav_daybook: 'Daybook',
    mob_nav_more: 'More',
    mob_sheet_title: 'More Options',
    mob_sheet_subtitle: 'Executive tools, rates & management',
    mob_desc_dashboard: 'Sales summary, profit margins & metrics',
    mob_desc_rates: 'Produce catalog & market price lists',
    mob_desc_settings: 'Shop firm details, SOPs & backups',
    mob_desc_guide: 'Step-by-step operating manual & help',
    mob_util_theme: 'Theme',
    mob_util_lock: 'Lock Terminal',

    btn_create: '+ Create',
    menu_new_bill: 'New Bill',
    menu_receive_payment: 'Receive Payment',
    menu_new_customer: 'New Customer',
    menu_new_item: 'New Produce Item',
    menu_new_location: 'New Location',
    label_location: 'Location',
    label_date: 'Date',

    // Billing
    buyer_walkin: 'Walk-in Cash Buyer',
    type_cash: 'Direct Cash',
    type_khata: 'Daily Credit (Khata)',
    search_produce: 'Search produce by name...',
    all_items: 'All Items',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    grains: 'Grains',
    btn_custom_produce: '+ Custom Produce',
    docket_title: 'Active Bill',
    th_produce: 'Produce',
    th_weight: 'Weight',
    th_rate: 'Rate',
    th_total: 'Total',
    tally_gross: 'Gross Total:',
    tally_roundoff: 'Round-Off:',
    tally_final: 'Final Payable:',
    btn_complete_bill: 'Complete & Print Bill',
    btn_clear: 'Clear',
    docket_empty: 'Select produce items from catalog to add to bill',

    // Balances
    past_overdue: 'Past Overdue',
    today_credit: "Today's Credit",
    today_repaid: "Today's Repaid",
    today_overdue: "Today's Overdue",
    total_due: 'Total Balance',

    // Daybook
    th_bill_no: 'Bill #',
    th_time: 'Time',
    th_buyer: 'Buyer / Party',
    th_items: 'Produce Items',
    th_amount: 'Amount',
    th_status: 'Status',
    th_actions: 'Actions',
    btn_export_csv: 'Export CSV',

    // Modals & General
    btn_cancel: 'Cancel',
    btn_save: 'Save',
    btn_close: 'Close',
    btn_print: 'Print Receipt',

    // Recycle Bin
    recycle_bin_title: 'Recycle Bin & Voided Records',
    recycle_bin_subtitle: 'Safely recover deleted daybook transactions or purge them permanently',
    btn_restore: 'Restore',
    btn_empty_trash: 'Empty Recycle Bin',
    empty_recycle_bin_msg: 'Recycle bin is empty. No deleted transactions in vault.'
  },
  hi: {
    app_name: 'ज़ेन',
    nav_billing: 'बिलिंग',
    nav_dashboard: 'डैशबोर्ड',
    dashboard_title: 'व्यापार एवं वित्तीय डैशबोर्ड',
    nav_customers: 'ग्राहक खाता',
    nav_daybook: 'रोजनामचा',
    nav_inventory: 'इन्वेंट्री / स्टॉक',
    nav_rates: 'मंडी भाव',
    nav_settings: 'सेटिंग्स',
    nav_guide: 'गाइड',
    nav_more: 'अन्य',

    // Mobile Navigation & More Sheet
    mob_nav_billing: 'बिलिंग',
    mob_nav_stock: 'स्टॉक',
    mob_nav_khata: 'खाता',
    mob_nav_daybook: 'रोजनामचा',
    mob_nav_more: 'अन्य',
    mob_sheet_title: 'अन्य विकल्प',
    mob_sheet_subtitle: 'डैशबोर्ड, मंडी भाव व सेटिंग्स',
    mob_desc_dashboard: 'बिक्री, मुनाफा व व्यापार रिपोर्ट',
    mob_desc_rates: 'जिंसों की दर सूची व भाव',
    mob_desc_settings: 'दुकान प्रोफ़ाइल, SOP व बैकअप',
    mob_desc_guide: 'मंडी कार्यप्रणाली एवं सहायता निर्देशिका',
    mob_util_theme: 'थीम',
    mob_util_lock: 'टर्मिनल लॉक',

    btn_create: '+ नया जोड़ें',
    menu_new_bill: 'नया बिल',
    menu_receive_payment: 'रुपये जमा करें (वसूली)',
    menu_new_customer: 'नया ग्राहक',
    menu_new_item: 'नई जिंस',
    menu_new_location: 'नया शेड / काउंटर',
    label_location: 'स्थान',
    label_date: 'तारीख',

    // Billing
    buyer_walkin: 'नकद फुटकर ग्राहक',
    type_cash: 'नकद भुगतान',
    type_khata: 'दैनिक उधार (खाता)',
    search_produce: 'जिंस का नाम खोजें...',
    all_items: 'सभी',
    vegetables: 'सब्जियां',
    fruits: 'फल',
    grains: 'अनाज',
    btn_custom_produce: '+ अन्य जिंस जोड़ें',
    docket_title: 'चालू बिल',
    th_produce: 'जिंस',
    th_weight: 'वजन',
    th_rate: 'भाव',
    th_total: 'रकम',
    tally_gross: 'कुल योग:',
    tally_roundoff: 'राउंड-ऑफ:',
    tally_final: 'अंतिम देय बिल:',
    btn_complete_bill: 'बिल बनाएं व पर्ची निकालें',
    btn_clear: 'खाली करें',
    docket_empty: 'बिल में जोड़ने के लिए बाईं तरफ से जिंस चुनें',

    // Balances
    past_overdue: 'पुराना बाकी',
    today_credit: 'आज का माल लिया',
    today_repaid: 'आज जमा किया',
    today_overdue: 'आज का बाकी',
    total_due: 'कुल बाकी रकम',

    // Daybook
    th_bill_no: 'बिल #',
    th_time: 'समय',
    th_buyer: 'खरीदार / पार्टी',
    th_items: 'जिंस व वजन',
    th_amount: 'अंतिम रकम',
    th_status: 'भुगतान स्थिति',
    th_actions: 'कार्रवाई',
    btn_export_csv: 'CSV निकालें',

    // Modals & General
    btn_cancel: 'रद्द करें',
    btn_save: 'सुरक्षित करें',
    btn_close: 'बंद करें',
    btn_print: 'पर्ची प्रिंट करें',

    // Recycle Bin
    recycle_bin_title: 'रीसायकल बिन (हटाई गई पर्चियां)',
    recycle_bin_subtitle: 'रोजनामचा से हटाई गई पर्चियों को वापस लाएं या हमेशा के लिए हटाएं',
    btn_restore: 'पुनर्स्थापित करें',
    btn_empty_trash: 'रीसायकल बिन खाली करें',
    empty_recycle_bin_msg: 'रीसायकल बिन खाली है। कोई हटाई गई पर्ची नहीं है।'
  }
};

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getRelativeDate(offsetDays, baseDateStr = null) {
  let d;
  if (baseDateStr) {
    const parts = baseDateStr.split('-');
    d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  } else {
    d = new Date();
  }
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildRichTestDataset() {
  const today = getTodayDateString();
  const d_1 = getRelativeDate(-1);
  const d_3 = getRelativeDate(-3);
  const d_5 = getRelativeDate(-5);
  const d_10 = getRelativeDate(-10);
  const d_18 = getRelativeDate(-18);
  const d_25 = getRelativeDate(-25);
  const d_35 = getRelativeDate(-35);

  return {
    locations: [
      { id: 'loc-1', name: 'Main Mandi Yard', code: 'MAIN' },
      { id: 'loc-2', name: 'Wholesale Shed B', code: 'SHED-B' },
      { id: 'loc-3', name: 'Fruit Auction Platform', code: 'FRUIT' }
    ],
    shopProfile: {
      name: 'Mandi Commission Agency',
      subtitle: 'Wholesale Fruits & Vegetables',
      address: 'Main Mandi Yard, Gate No. 2',
      phone: '9845012345',
      commissionRate: 5.0
    },
    items: [
      { id: 'itm-1', name: 'Red Tomato (Hybrid)', category: 'Vegetables', unit: 'kg', defaultRate: 35.00, costPrice: 25.00, currentStock: 450, minAlertStock: 50 },
      { id: 'itm-2', name: 'Nashik Red Onion', category: 'Vegetables', unit: 'kg', defaultRate: 28.50, costPrice: 21.00, currentStock: 800, minAlertStock: 100 },
      { id: 'itm-3', name: 'Agra Potato (Jyoti)', category: 'Vegetables', unit: 'kg', defaultRate: 22.00, costPrice: 16.00, currentStock: 1200, minAlertStock: 150 },
      { id: 'itm-4', name: 'Green Chilli (Spicy)', category: 'Vegetables', unit: 'kg', defaultRate: 65.00, costPrice: 48.00, currentStock: 90, minAlertStock: 20 },
      { id: 'itm-5', name: 'Fresh Coriander (Kothmir)', category: 'Vegetables', unit: 'kg', defaultRate: 45.00, costPrice: 30.00, currentStock: 60, minAlertStock: 15 },
      { id: 'itm-6', name: 'Ginger Desi Fresh', category: 'Vegetables', unit: 'kg', defaultRate: 110.00, costPrice: 85.00, currentStock: 75, minAlertStock: 20 },
      { id: 'itm-7', name: 'Garlic Desi (Special)', category: 'Vegetables', unit: 'kg', defaultRate: 180.00, costPrice: 140.00, currentStock: 120, minAlertStock: 25 },
      { id: 'itm-8', name: 'Shimla Apple (Royal)', category: 'Fruits', unit: 'box', defaultRate: 1400.00, costPrice: 1100.00, currentStock: 35, minAlertStock: 10 },
      { id: 'itm-9', name: 'Nagpur Oranges (Sweet)', category: 'Fruits', unit: 'crate', defaultRate: 850.00, costPrice: 650.00, currentStock: 40, minAlertStock: 10 },
      { id: 'itm-10', name: 'Robusta Bananas', category: 'Fruits', unit: 'dozen', defaultRate: 35.00, costPrice: 24.00, currentStock: 150, minAlertStock: 30 },
      { id: 'itm-11', name: 'Alphonso Mango', category: 'Fruits', unit: 'crate', defaultRate: 1650.00, costPrice: 1300.00, currentStock: 20, minAlertStock: 5 },
      { id: 'itm-12', name: 'Seedless Green Grapes', category: 'Fruits', unit: 'kg', defaultRate: 85.00, costPrice: 62.00, currentStock: 110, minAlertStock: 25 },
      { id: 'itm-13', name: 'Fresh Cauliflower', category: 'Vegetables', unit: 'kg', defaultRate: 30.00, costPrice: 20.00, currentStock: 180, minAlertStock: 40 },
      { id: 'itm-14', name: 'Green Cabbage', category: 'Vegetables', unit: 'kg', defaultRate: 20.00, costPrice: 13.00, currentStock: 220, minAlertStock: 40 },
      { id: 'itm-15', name: 'Bhindi (Lady Finger)', category: 'Vegetables', unit: 'kg', defaultRate: 48.00, costPrice: 34.00, currentStock: 95, minAlertStock: 20 },
      { id: 'itm-16', name: 'Palak (Spinach)', category: 'Vegetables', unit: 'kg', defaultRate: 25.00, costPrice: 16.00, currentStock: 80, minAlertStock: 25 },
      { id: 'itm-17', name: 'Green Peas (Desi)', category: 'Vegetables', unit: 'kg', defaultRate: 70.00, costPrice: 52.00, currentStock: 140, minAlertStock: 30 },
      { id: 'itm-18', name: 'Red Gajar (Carrot)', category: 'Vegetables', unit: 'kg', defaultRate: 32.00, costPrice: 22.00, currentStock: 260, minAlertStock: 50 },
      { id: 'itm-19', name: 'Sharbati Wheat (Grade A)', category: 'Grains', unit: 'bag', defaultRate: 2450.00, costPrice: 2150.00, currentStock: 50, minAlertStock: 10 },
      { id: 'itm-20', name: 'Basmati Rice (Tibar)', category: 'Grains', unit: 'bag', defaultRate: 3100.00, costPrice: 2750.00, currentStock: 35, minAlertStock: 10 }
    ],
    customers: [
      { id: 'cust-1', name: 'Ramesh Sabzi Bhandar', phone: '9822011223', locationId: 'loc-1', openingPastDue: 3500.00 },
      { id: 'cust-2', name: 'Suresh Hotel Supplies', phone: '9811223344', locationId: 'loc-1', openingPastDue: 0.00 },
      { id: 'cust-3', name: 'Gupta Traders', phone: '9655443322', locationId: 'loc-2', openingPastDue: 5400.00 },
      { id: 'cust-4', name: 'Verma Cold Storage', phone: '9833441122', locationId: 'loc-1', openingPastDue: 0.00 },
      { id: 'cust-5', name: 'Pooja Fresh Veggies', phone: '9744556677', locationId: 'loc-2', openingPastDue: 0.00 },
      { id: 'cust-6', name: 'Kishan Daily Cart', phone: '9733445566', locationId: 'loc-2', openingPastDue: 850.00 },
      { id: 'cust-7', name: 'Balaji Fruit Corner', phone: '9877889900', locationId: 'loc-3', openingPastDue: 0.00 },
      { id: 'cust-8', name: 'Anand Green Mart', phone: '9866778899', locationId: 'loc-1', openingPastDue: 1200.00 },
      { id: 'cust-9', name: 'Chaudhary Brothers', phone: '9899001122', locationId: 'loc-2', openingPastDue: 0.00 },
      { id: 'cust-10', name: 'Sharma Retail Mart', phone: '9811002233', locationId: 'loc-3', openingPastDue: 0.00 }
    ],
    sales: [
      // 35 days ago (Gupta old debt)
      {
        id: 'sale-101', billNo: 'BILL-1001', date: d_35, time: '07:15 AM', locationId: 'loc-2', saleType: 'CREDIT',
        customerId: 'cust-3', customerName: 'Gupta Traders',
        items: [
          { itemId: 'itm-3', itemName: 'Agra Potato (Jyoti)', weight: 100, unit: 'kg', rate: 22, lineTotal: 2200 },
          { itemId: 'itm-2', itemName: 'Nashik Red Onion', weight: 80, unit: 'kg', rate: 28, lineTotal: 2240 }
        ],
        grossSubtotal: 4440.00, roundOff: 0.00, finalAmount: 4440.00, paidToday: 0.00, notes: 'Old lot delivery'
      },
      // 18 days ago (Verma medium risk 8-30 bracket)
      {
        id: 'sale-102', billNo: 'BILL-1002', date: d_18, time: '08:30 AM', locationId: 'loc-1', saleType: 'CREDIT',
        customerId: 'cust-4', customerName: 'Verma Cold Storage',
        items: [
          { itemId: 'itm-8', itemName: 'Shimla Apple (Royal)', weight: 2, unit: 'box', rate: 1400, lineTotal: 2800 },
          { itemId: 'itm-6', itemName: 'Ginger Desi Fresh', weight: 5, unit: 'kg', rate: 110, lineTotal: 550 }
        ],
        grossSubtotal: 3350.00, roundOff: -150.00, finalAmount: 3200.00, paidToday: 0.00, notes: 'Cold storage dispatch'
      },
      // 10 days ago (Anand Green Mart)
      {
        id: 'sale-103', billNo: 'BILL-1003', date: d_10, time: '06:45 AM', locationId: 'loc-1', saleType: 'CREDIT',
        customerId: 'cust-8', customerName: 'Anand Green Mart',
        items: [
          { itemId: 'itm-1', itemName: 'Red Tomato (Hybrid)', weight: 80, unit: 'kg', rate: 35, lineTotal: 2800 },
          { itemId: 'itm-4', itemName: 'Green Chilli (Spicy)', weight: 10, unit: 'kg', rate: 65, lineTotal: 650 }
        ],
        grossSubtotal: 3450.00, roundOff: 0.00, finalAmount: 3450.00, paidToday: 0.00, notes: 'Wholesale lot'
      },
      // 5 days ago (Ramesh fresh debt, 0-7 bracket)
      {
        id: 'sale-104', billNo: 'BILL-1004', date: d_5, time: '07:00 AM', locationId: 'loc-1', saleType: 'CREDIT',
        customerId: 'cust-1', customerName: 'Ramesh Sabzi Bhandar',
        items: [
          { itemId: 'itm-1', itemName: 'Red Tomato (Hybrid)', weight: 60, unit: 'kg', rate: 35, lineTotal: 2100 },
          { itemId: 'itm-2', itemName: 'Nashik Red Onion', weight: 50, unit: 'kg', rate: 28, lineTotal: 1400 }
        ],
        grossSubtotal: 3500.00, roundOff: 0.00, finalAmount: 3500.00, paidToday: 0.00, notes: 'Morning stock'
      },
      // 5 days ago (Walk-in spot cash)
      {
        id: 'sale-105', billNo: 'BILL-1005', date: d_5, time: '09:10 AM', locationId: 'loc-1', saleType: 'DIRECT',
        customerId: null, customerName: 'Walk-in Cash Buyer',
        items: [
          { itemId: 'itm-13', itemName: 'Fresh Cauliflower', weight: 40, unit: 'kg', rate: 30, lineTotal: 1200 },
          { itemId: 'itm-14', itemName: 'Green Cabbage', weight: 30, unit: 'kg', rate: 20, lineTotal: 600 }
        ],
        grossSubtotal: 1800.00, roundOff: 0.00, finalAmount: 1800.00, paidToday: 1800.00, notes: 'Cash sale'
      },
      // 3 days ago (Balaji Fruit Platform)
      {
        id: 'sale-106', billNo: 'BILL-1006', date: d_3, time: '06:30 AM', locationId: 'loc-3', saleType: 'CREDIT',
        customerId: 'cust-7', customerName: 'Balaji Fruit Corner',
        items: [
          { itemId: 'itm-8', itemName: 'Shimla Apple (Royal)', weight: 3, unit: 'box', rate: 1400, lineTotal: 4200 },
          { itemId: 'itm-10', itemName: 'Robusta Bananas', weight: 20, unit: 'dozen', rate: 35, lineTotal: 700 }
        ],
        grossSubtotal: 4900.00, roundOff: 0.00, finalAmount: 4900.00, paidToday: 0.00, notes: 'Morning auction'
      },
      // 3 days ago (Suresh Hotel purchase - offset against advance!)
      {
        id: 'sale-107', billNo: 'BILL-1007', date: d_3, time: '08:00 AM', locationId: 'loc-1', saleType: 'CREDIT',
        customerId: 'cust-2', customerName: 'Suresh Hotel Supplies',
        items: [
          { itemId: 'itm-1', itemName: 'Red Tomato (Hybrid)', weight: 40, unit: 'kg', rate: 35, lineTotal: 1400 },
          { itemId: 'itm-3', itemName: 'Agra Potato (Jyoti)', weight: 50, unit: 'kg', rate: 22, lineTotal: 1100 }
        ],
        grossSubtotal: 2500.00, roundOff: 0.00, finalAmount: 2500.00, paidToday: 0.00, notes: 'Hotel daily purchase'
      },
      // Yesterday (Chaudhary Brothers, Shed B)
      {
        id: 'sale-108', billNo: 'BILL-1008', date: d_1, time: '07:20 AM', locationId: 'loc-2', saleType: 'CREDIT',
        customerId: 'cust-9', customerName: 'Chaudhary Brothers',
        items: [
          { itemId: 'itm-15', itemName: 'Bhindi (Lady Finger)', weight: 50, unit: 'kg', rate: 48, lineTotal: 2400 },
          { itemId: 'itm-17', itemName: 'Green Peas (Desi)', weight: 30, unit: 'kg', rate: 70, lineTotal: 2100 }
        ],
        grossSubtotal: 4500.00, roundOff: 0.00, finalAmount: 4500.00, paidToday: 0.00, notes: 'Evening delivery'
      },
      // Yesterday (Pooja Fresh Veggies - Shed B)
      {
        id: 'sale-109', billNo: 'BILL-1009', date: d_1, time: '08:45 AM', locationId: 'loc-2', saleType: 'CREDIT',
        customerId: 'cust-5', customerName: 'Pooja Fresh Veggies',
        items: [
          { itemId: 'itm-16', itemName: 'Palak (Spinach)', weight: 40, unit: 'kg', rate: 25, lineTotal: 1000 },
          { itemId: 'itm-18', itemName: 'Red Gajar (Carrot)', weight: 25, unit: 'kg', rate: 32, lineTotal: 800 }
        ],
        grossSubtotal: 1800.00, roundOff: 0.00, finalAmount: 1800.00, paidToday: 0.00, notes: 'Retail supply'
      },
      // Yesterday (Sharma Retail Mart - Fruit Platform)
      {
        id: 'sale-110', billNo: 'BILL-1010', date: d_1, time: '09:30 AM', locationId: 'loc-3', saleType: 'DIRECT',
        customerId: 'cust-10', customerName: 'Sharma Retail Mart',
        items: [
          { itemId: 'itm-9', itemName: 'Nagpur Oranges (Sweet)', weight: 2, unit: 'crate', rate: 850, lineTotal: 1700 },
          { itemId: 'itm-12', itemName: 'Seedless Green Grapes', weight: 15, unit: 'kg', rate: 85, lineTotal: 1275 }
        ],
        grossSubtotal: 2975.00, roundOff: -25.00, finalAmount: 2950.00, paidToday: 2950.00, notes: 'Cash paid at counter'
      },
      // Today (Ramesh Sabzi Bhandar morning bill)
      {
        id: 'sale-111', billNo: 'BILL-1011', date: today, time: '06:15 AM', locationId: 'loc-1', saleType: 'CREDIT',
        customerId: 'cust-1', customerName: 'Ramesh Sabzi Bhandar',
        items: [
          { itemId: 'itm-1', itemName: 'Red Tomato (Hybrid)', weight: 70, unit: 'kg', rate: 35, lineTotal: 2450 },
          { itemId: 'itm-7', itemName: 'Garlic Desi (Special)', weight: 8, unit: 'kg', rate: 180, lineTotal: 1440 }
        ],
        grossSubtotal: 3890.00, roundOff: -40.00, finalAmount: 3850.00, paidToday: 0.00, notes: 'Morning lot 3 crates'
      },
      // Today (Spot Cash retail buyer)
      {
        id: 'sale-112', billNo: 'BILL-1012', date: today, time: '07:45 AM', locationId: 'loc-1', saleType: 'DIRECT',
        customerId: null, customerName: 'Walk-in Cash Buyer',
        items: [
          { itemId: 'itm-2', itemName: 'Nashik Red Onion', weight: 25, unit: 'kg', rate: 28, lineTotal: 700 },
          { itemId: 'itm-3', itemName: 'Agra Potato (Jyoti)', weight: 30, unit: 'kg', rate: 22, lineTotal: 660 }
        ],
        grossSubtotal: 1360.00, roundOff: 0.00, finalAmount: 1360.00, paidToday: 1360.00, notes: 'Cash counter'
      },
      // Today (Kishan Daily Cart)
      {
        id: 'sale-113', billNo: 'BILL-1013', date: today, time: '08:10 AM', locationId: 'loc-2', saleType: 'CREDIT',
        customerId: 'cust-6', customerName: 'Kishan Daily Cart',
        items: [
          { itemId: 'itm-4', itemName: 'Green Chilli (Spicy)', weight: 6, unit: 'kg', rate: 65, lineTotal: 390 },
          { itemId: 'itm-5', itemName: 'Fresh Coriander (Kothmir)', weight: 8, unit: 'kg', rate: 45, lineTotal: 360 }
        ],
        grossSubtotal: 750.00, roundOff: 0.00, finalAmount: 750.00, paidToday: 0.00, notes: 'Daily cart stock'
      },
      // Today (Grain sale - Sharbati Wheat)
      {
        id: 'sale-114', billNo: 'BILL-1014', date: today, time: '09:00 AM', locationId: 'loc-1', saleType: 'CREDIT',
        customerId: 'cust-8', customerName: 'Anand Green Mart',
        items: [
          { itemId: 'itm-19', itemName: 'Sharbati Wheat (Grade A)', weight: 2, unit: 'bag', rate: 2450, lineTotal: 4900 }
        ],
        grossSubtotal: 4900.00, roundOff: 0.00, finalAmount: 4900.00, paidToday: 0.00, notes: '2 bags wheat'
      },
      // Today (Fruit Auction platform walk-in)
      {
        id: 'sale-115', billNo: 'BILL-1015', date: today, time: '09:40 AM', locationId: 'loc-3', saleType: 'DIRECT',
        customerId: null, customerName: 'Walk-in Cash Buyer',
        items: [
          { itemId: 'itm-11', itemName: 'Alphonso Mango', weight: 1, unit: 'crate', rate: 1650, lineTotal: 1650 }
        ],
        grossSubtotal: 1650.00, roundOff: 0.00, finalAmount: 1650.00, paidToday: 1650.00, notes: 'Spot mango crate'
      }
    ],
    payments: [
      // Suresh deposited ₹5,000 on d_5 via UPI, yielding ₹2,500 advance credit after his ₹2,500 purchase!
      {
        id: 'pay-201', receiptNo: 'REC-2001', date: d_5, time: '04:00 PM', locationId: 'loc-1',
        customerId: 'cust-2', customerName: 'Suresh Hotel Supplies',
        amount: 5000.00, paymentMode: 'UPI', notes: 'Hotel monthly advance deposit'
      },
      // Pooja deposited ₹3,000 on d_3 via UPI, yielding ₹1,200 advance credit after ₹1,800 purchase!
      {
        id: 'pay-202', receiptNo: 'REC-2002', date: d_3, time: '02:30 PM', locationId: 'loc-2',
        customerId: 'cust-5', customerName: 'Pooja Fresh Veggies',
        amount: 3000.00, paymentMode: 'UPI', notes: 'Advance credit transfer'
      },
      // Ramesh paid ₹2,000 on d_3 via Cash
      {
        id: 'pay-203', receiptNo: 'REC-2003', date: d_3, time: '08:00 PM', locationId: 'loc-1',
        customerId: 'cust-1', customerName: 'Ramesh Sabzi Bhandar',
        amount: 2000.00, paymentMode: 'CASH', notes: 'Evening market recovery'
      },
      // Anand paid ₹2,000 on getRelativeDate(-2) via Bank Transfer
      {
        id: 'pay-204', receiptNo: 'REC-2004', date: getRelativeDate(-2), time: '01:15 PM', locationId: 'loc-1',
        customerId: 'cust-8', customerName: 'Anand Green Mart',
        amount: 2000.00, paymentMode: 'BANK', notes: 'RTGS clearance'
      },
      // Balaji paid ₹2,500 on d_1 via UPI
      {
        id: 'pay-205', receiptNo: 'REC-2005', date: d_1, time: '07:30 PM', locationId: 'loc-3',
        customerId: 'cust-7', customerName: 'Balaji Fruit Corner',
        amount: 2500.00, paymentMode: 'UPI', notes: 'Fruit settlement part payment'
      },
      // Chaudhary paid ₹2,000 on d_1 via Cash
      {
        id: 'pay-206', receiptNo: 'REC-2006', date: d_1, time: '09:00 PM', locationId: 'loc-2',
        customerId: 'cust-9', customerName: 'Chaudhary Brothers',
        amount: 2000.00, paymentMode: 'CASH', notes: 'Counter cash'
      },
      // Ramesh paid ₹1,500 today via Cash
      {
        id: 'pay-207', receiptNo: 'REC-2007', date: today, time: '08:30 AM', locationId: 'loc-1',
        customerId: 'cust-1', customerName: 'Ramesh Sabzi Bhandar',
        amount: 1500.00, paymentMode: 'CASH', notes: 'Morning cash deposit'
      },
      // Kishan paid ₹500 today via UPI
      {
        id: 'pay-208', receiptNo: 'REC-2008', date: today, time: '09:15 AM', locationId: 'loc-2',
        customerId: 'cust-6', customerName: 'Kishan Daily Cart',
        amount: 500.00, paymentMode: 'UPI', notes: 'GPay payment'
      },
      // Sharma paid full cash for his transaction
      {
        id: 'pay-209', receiptNo: 'REC-2009', date: today, time: '09:45 AM', locationId: 'loc-3',
        customerId: 'cust-10', customerName: 'Sharma Retail Mart',
        amount: 1000.00, paymentMode: 'CASH', notes: 'Pre-season deposit'
      }
    ],
    cloudConfig: {
      scriptUrl: '',
      activeYear: '2026_27',
      autoSync: true,
      lastSync: null,
      activeSpreadsheetName: 'Mandi_Ledger_2026_27',
      activeSpreadsheetUrl: '',
      stats: {
        salesRowsUsed: 0,
        salesRowsLimit: 50000,
        rowsRemaining: 50000,
        percentUsed: 0,
        isWarning: false
      }
    },
    archivedYears: [
      {
        yearId: '2025_26',
        yearLabel: 'FY 2025-26',
        closedDate: '2026-03-31',
        spreadsheetName: '[ARCHIVED] Mandi_Ledger_2025_26',
        spreadsheetUrl: '',
        salesCount: 2,
        salesTurnover: 6000.00,
        paymentsCount: 1,
        paymentsCollected: 2000.00,
        carriedDues: 4000.00,
        sales: [
          {
            id: 'sale-arch-1', billNo: 'BILL-FY25-890', date: '2026-03-25', time: '08:15 AM', locationId: 'loc-1',
            saleType: 'CREDIT', customerId: 'cust-1', customerName: 'Ramesh Sabzi Bhandar',
            items: [{ itemId: 'itm-1', itemName: 'Red Tomato (Hybrid)', weight: 100, unit: 'kg', rate: 30, lineTotal: 3000 }],
            grossSubtotal: 3000.00, roundOff: 0.00, finalAmount: 3000.00, paidToday: 0.00, notes: 'Closing season dispatch'
          },
          {
            id: 'sale-arch-2', billNo: 'BILL-FY25-891', date: '2026-03-28', time: '09:00 AM', locationId: 'loc-2',
            saleType: 'CREDIT', customerId: 'cust-3', customerName: 'Gupta Traders',
            items: [{ itemId: 'itm-3', itemName: 'Agra Potato (Jyoti)', weight: 150, unit: 'kg', rate: 20, lineTotal: 3000 }],
            grossSubtotal: 3000.00, roundOff: 0.00, finalAmount: 3000.00, paidToday: 0.00, notes: 'Potato lot'
          }
        ],
        payments: [
          {
            id: 'pay-arch-1', receiptNo: 'REC-FY25-450', date: '2026-03-29', time: '06:30 PM', locationId: 'loc-1',
            customerId: 'cust-1', customerName: 'Ramesh Sabzi Bhandar', amount: 2000.00, paymentMode: 'CASH', notes: 'Part settlement'
          }
        ]
      }
    ],
    inventoryInward: [
      {
        id: 'inw-1', date: today, time: '05:30 AM', locationId: 'loc-1',
        itemId: 'itm-1', itemName: 'Red Tomato (Hybrid)', quantity: 300, unit: 'kg',
        costPrice: 25.00, totalCost: 7500.00, supplier: 'Nashik Farmer Lot #12', notes: 'Fresh morning crates'
      },
      {
        id: 'inw-2', date: today, time: '05:45 AM', locationId: 'loc-1',
        itemId: 'itm-2', itemName: 'Nashik Red Onion', quantity: 500, unit: 'kg',
        costPrice: 21.00, totalCost: 10500.00, supplier: 'Lasalgaon Mandi Truck', notes: 'Grade A dry onion'
      },
      {
        id: 'inw-3', date: today, time: '06:00 AM', locationId: 'loc-3',
        itemId: 'itm-8', itemName: 'Shimla Apple (Royal)', quantity: 25, unit: 'box',
        costPrice: 1100.00, totalCost: 27500.00, supplier: 'Himachal Apple Growers', notes: 'Royal Delicious 20kg boxes'
      },
      {
        id: 'inw-4', date: d_1, time: '05:15 AM', locationId: 'loc-1',
        itemId: 'itm-3', itemName: 'Agra Potato (Jyoti)', quantity: 800, unit: 'kg',
        costPrice: 16.00, totalCost: 12800.00, supplier: 'Agra Cold Truck', notes: 'Sugar free Jyoti'
      }
    ],
    inventoryWastage: [
      {
        id: 'wst-1', date: today, time: '11:00 AM', locationId: 'loc-1',
        itemId: 'itm-1', itemName: 'Red Tomato (Hybrid)', quantity: 12, unit: 'kg',
        costPrice: 25.00, estimatedLoss: 300.00, reason: 'Overripe / Crushed during auction handling', notes: 'Discarded to compost'
      },
      {
        id: 'wst-2', date: d_1, time: '12:30 PM', locationId: 'loc-1',
        itemId: 'itm-5', itemName: 'Fresh Coriander (Kothmir)', quantity: 4, unit: 'kg',
        costPrice: 30.00, estimatedLoss: 120.00, reason: 'Heat wilt / unsold excess', notes: 'Unfit for retail'
      }
    ],
    syncQueue: [],
    recycleBin: [],
    security: {
      ownerPin: '1234',
      requirePinForSettings: false,
      requirePinForReset: true,
      requirePinForDelete: true
    }
  };
}

const DEFAULT_DATA = buildRichTestDataset();

function formatCurrency(amount) {
  const num = Number(amount) || 0;
  if (num < 0) {
    return '-₹' + Math.abs(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Global Core Data Store
class CoreStore {
  constructor() {
    this.data = this.load();
    this.currentLocationId = localStorage.getItem('MANDI_ACTIVE_LOC') || this.data.locations[0]?.id || 'loc-1';
    this.currentDate = localStorage.getItem('MANDI_ACTIVE_DATE') || getTodayDateString();
    this.lang = localStorage.getItem(LANG_KEY) || 'en';
    this.theme = localStorage.getItem(THEME_KEY) || 'dark';
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (!parsed.shopProfile) {
          parsed.shopProfile = {
            name: 'Mandi Commission Agency',
            subtitle: 'Wholesale Fruits & Vegetables',
            address: 'Main Mandi Yard, Gate No. 2',
            phone: '9845012345',
            commissionRate: 5.0
          };
        }
        if (parsed.shopProfile.commissionRate === undefined) {
          parsed.shopProfile.commissionRate = 5.0;
        }
        if (!Array.isArray(parsed.sales)) parsed.sales = [];
        if (!Array.isArray(parsed.payments)) parsed.payments = [];
        if (!Array.isArray(parsed.customers)) parsed.customers = [];
        if (!Array.isArray(parsed.items)) parsed.items = [];
        if (!Array.isArray(parsed.locations)) parsed.locations = DEFAULT_DATA.locations;
        if (!parsed.cloudConfig) {
          parsed.cloudConfig = JSON.parse(JSON.stringify(DEFAULT_DATA.cloudConfig));
        }
        if (!Array.isArray(parsed.archivedYears)) {
          parsed.archivedYears = DEFAULT_DATA.archivedYears ? JSON.parse(JSON.stringify(DEFAULT_DATA.archivedYears)) : [];
        }
        if (!Array.isArray(parsed.syncQueue)) {
          parsed.syncQueue = [];
        }
        if (!Array.isArray(parsed.inventoryInward)) {
          parsed.inventoryInward = DEFAULT_DATA.inventoryInward ? JSON.parse(JSON.stringify(DEFAULT_DATA.inventoryInward)) : [];
        }
        if (!Array.isArray(parsed.inventoryWastage)) {
          parsed.inventoryWastage = DEFAULT_DATA.inventoryWastage ? JSON.parse(JSON.stringify(DEFAULT_DATA.inventoryWastage)) : [];
        }
        if (!Array.isArray(parsed.recycleBin)) {
          parsed.recycleBin = [];
        }
        (parsed.items || []).forEach(item => {
          if (item.costPrice === undefined) {
            item.costPrice = Number((Number(item.defaultRate || 0) * 0.75).toFixed(2));
          }
          if (item.currentStock === undefined) {
            item.currentStock = 100;
          }
          if (item.minAlertStock === undefined) {
            item.minAlertStock = 20;
          }
        });
        if (!parsed.security) {
          parsed.security = {
            ownerPin: '1234',
            requirePinForSettings: false,
            requirePinForReset: true,
            requirePinForDelete: true
          };
        }

        // Auto-seed rich test dataset if existing storage only had the tiny 3-item stub
        if (parsed.sales.length <= 3 && !localStorage.getItem('MANDI_DATA_CUSTOMIZED')) {
          const rich = buildRichTestDataset();
          this.save(rich);
          return rich;
        }

        return parsed;
      }
    } catch (e) {
      console.error('Failed to load localStorage:', e);
    }
    const fresh = buildRichTestDataset();
    this.save(fresh);
    return fresh;
  }

  getNextBillNumber() {
    let maxSeq = 1000;
    (this.data.sales || []).forEach(s => {
      if (s.billNo) {
        const match = s.billNo.match(/(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num) && num > maxSeq) {
            maxSeq = num;
          }
        }
      }
    });
    return 'BILL-' + (maxSeq + 1);
  }

  save(data = this.data) {
    try {
      const toSave = data || this.data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      this.data = toSave;
    } catch (e) {
      console.error('Failed to write localStorage:', e);
      alert('Local storage quota exceeded or unavailable!');
    }
  }

  reset() {
    this.save(buildRichTestDataset());
    this.currentLocationId = this.data.locations[0]?.id || 'loc-1';
    this.currentDate = getTodayDateString();
    localStorage.setItem('MANDI_ACTIVE_LOC', this.currentLocationId);
    localStorage.setItem('MANDI_ACTIVE_DATE', this.currentDate);
  }

  resetToCleanSlate() {
    const clean = {
      locations: this.data.locations && this.data.locations.length ? this.data.locations : [
        { id: 'loc-1', name: 'Main Mandi Yard', code: 'MAIN' },
        { id: 'loc-2', name: 'Wholesale Shed B', code: 'SHED-B' }
      ],
      shopProfile: this.data.shopProfile || {
        name: 'Mandi Commission Agency',
        subtitle: 'Wholesale Fruits & Vegetables',
        address: 'Main Mandi Yard, Gate No. 2',
        phone: '9845012345',
        commissionRate: 5.0
      },
      items: this.data.items && this.data.items.length ? this.data.items : [
        { id: 'itm-1', name: 'Red Tomato (Hybrid)', category: 'Vegetables', unit: 'kg', defaultRate: 35.00 },
        { id: 'itm-2', name: 'Nashik Red Onion', category: 'Vegetables', unit: 'kg', defaultRate: 28.50 },
        { id: 'itm-3', name: 'Agra Potato (Jyoti)', category: 'Vegetables', unit: 'kg', defaultRate: 22.00 }
      ],
      customers: [
        { id: 'cust-1', name: 'Ramesh Sabzi Bhandar', phone: '9822011223', locationId: 'loc-1', openingPastDue: 0.00 }
      ],
      sales: [],
      payments: [],
      recycleBin: [],
      cloudConfig: getCloudConfig()
    };
    this.save(clean);
    this.currentLocationId = this.data.locations[0]?.id || 'loc-1';
    this.currentDate = getTodayDateString();
    localStorage.setItem('MANDI_ACTIVE_LOC', this.currentLocationId);
    localStorage.setItem('MANDI_ACTIVE_DATE', this.currentDate);
  }

  getArchivedYears() {
    return this.data.archivedYears || [];
  }

  getArchivedYear(yearId) {
    return (this.data.archivedYears || []).find(y => y.yearId === yearId) || null;
  }

  getOwnerPin() {
    return this.data.security?.ownerPin || '1234';
  }

  setOwnerPin(newPin) {
    if (!this.data.security) {
      this.data.security = { requirePinForSettings: false, requirePinForReset: true, requirePinForDelete: true };
    }
    this.data.security.ownerPin = String(newPin).trim();
    this.save(this.data);
    dispatchMandiEvent('security-updated', { ownerPin: this.data.security.ownerPin });
    return true;
  }

  isOwnerUnlocked() {
    return sessionStorage.getItem('MANDI_OWNER_UNLOCKED') === 'true';
  }

  unlockOwner(pin) {
    if (String(pin).trim() === this.getOwnerPin()) {
      sessionStorage.setItem('MANDI_OWNER_UNLOCKED', 'true');
      dispatchMandiEvent('owner-lock-changed', { unlocked: true });
      return true;
    }
    return false;
  }

  lockOwner() {
    sessionStorage.removeItem('MANDI_OWNER_UNLOCKED');
    dispatchMandiEvent('owner-lock-changed', { unlocked: false });
  }

  getSyncQueue() {
    return this.data.syncQueue || [];
  }

  getRecycleBin() {
    return this.data.recycleBin || [];
  }

  moveToRecycleBin(id, isSale, reason = 'Deleted by Owner PIN') {
    if (!Array.isArray(this.data.recycleBin)) {
      this.data.recycleBin = [];
    }

    let foundRecord = null;
    if (isSale) {
      const idx = (this.data.sales || []).findIndex(s => s.id === id);
      if (idx !== -1) {
        foundRecord = this.data.sales[idx];
        this.data.sales.splice(idx, 1);
        if (Array.isArray(foundRecord.items)) {
          foundRecord.items.forEach(it => {
            const item = (this.data.items || []).find(x => x.id === it.itemId);
            if (item) {
              item.currentStock = (Number(item.currentStock) || 0) + (Number(it.weight) || 0);
            }
          });
        }
      }
    } else {
      const idx = (this.data.payments || []).findIndex(p => p.id === id);
      if (idx !== -1) {
        foundRecord = this.data.payments[idx];
        this.data.payments.splice(idx, 1);
      }
    }

    if (!foundRecord) return false;

    const recycledItem = {
      ...foundRecord,
      isSale: !!isSale,
      deletedAt: new Date().toISOString(),
      deletedDate: this.currentDate,
      deleteReason: reason
    };

    this.data.recycleBin.unshift(recycledItem);
    this.save(this.data);

    dispatchMandiEvent(isSale ? 'sale-deleted' : 'payment-deleted', { id, recycled: true });
    dispatchMandiEvent('recycle-bin-updated', { count: this.data.recycleBin.length });
    dispatchMandiEvent('inventory-updated', {});

    // Cloud sync status update
    syncTransactionStatusToCloudAsync({
      refNo: recycledItem.billNo || recycledItem.id,
      type: isSale ? 'BILL' : 'PAYMENT',
      status: 'VOID - Deleted by Owner (' + this.currentDate + ')',
      customerId: recycledItem.customerId,
      amount: isSale ? recycledItem.finalAmount : recycledItem.amount,
      isCredit: isSale ? (recycledItem.saleType === 'CREDIT') : false
    });

    return true;
  }

  restoreFromRecycleBin(id) {
    if (!Array.isArray(this.data.recycleBin)) return false;
    const idx = this.data.recycleBin.findIndex(r => r.id === id);
    if (idx === -1) return false;

    const item = this.data.recycleBin[idx];
    this.data.recycleBin.splice(idx, 1);

    const { deleteReason, deletedAt, deletedDate, isSale, ...cleanRecord } = item;

    if (isSale) {
      if (Array.isArray(cleanRecord.items)) {
        cleanRecord.items.forEach(it => {
          const prod = (this.data.items || []).find(x => x.id === it.itemId);
          if (prod) {
            prod.currentStock = Math.max(0, (Number(prod.currentStock) || 0) - (Number(it.weight) || 0));
          }
        });
      }
      this.data.sales.push(cleanRecord);
      this.data.sales.sort((a, b) => {
        const da = (a.date || '') + ' ' + (a.time || '');
        const db = (b.date || '') + ' ' + (b.time || '');
        return db.localeCompare(da);
      });
      this.save(this.data);
      dispatchMandiEvent('sale-created', { id });
    } else {
      this.data.payments.push(cleanRecord);
      this.data.payments.sort((a, b) => {
        const da = (a.date || '') + ' ' + (a.time || '');
        const db = (b.date || '') + ' ' + (b.time || '');
        return db.localeCompare(da);
      });
      this.save(this.data);
      dispatchMandiEvent('payment-created', { id });
    }

    dispatchMandiEvent('recycle-bin-updated', { count: this.data.recycleBin.length });
    dispatchMandiEvent('inventory-updated', {});

    // Cloud sync status back to ACTIVE
    syncTransactionStatusToCloudAsync({
      refNo: cleanRecord.billNo || cleanRecord.id,
      type: isSale ? 'BILL' : 'PAYMENT',
      status: 'ACTIVE',
      customerId: cleanRecord.customerId,
      amount: isSale ? cleanRecord.finalAmount : cleanRecord.amount,
      isCredit: isSale ? (cleanRecord.saleType === 'CREDIT') : false
    });

    return true;
  }

  permanentlyDeleteFromRecycleBin(id) {
    if (!Array.isArray(this.data.recycleBin)) return false;
    this.data.recycleBin = this.data.recycleBin.filter(r => r.id !== id);
    this.save(this.data);
    dispatchMandiEvent('recycle-bin-updated', { count: this.data.recycleBin.length });
    return true;
  }

  emptyRecycleBin() {
    this.data.recycleBin = [];
    this.save(this.data);
    dispatchMandiEvent('recycle-bin-updated', { count: 0 });
    return true;
  }

  setLocation(locId) {
    this.currentLocationId = locId;
    localStorage.setItem('MANDI_ACTIVE_LOC', locId);
  }

  setDate(dateStr) {
    this.currentDate = dateStr;
    localStorage.setItem('MANDI_ACTIVE_DATE', dateStr);
  }

  setLang(l) {
    this.lang = l;
    localStorage.setItem(LANG_KEY, l);
  }

  setTheme(t) {
    this.theme = t;
    localStorage.setItem(THEME_KEY, t);
    document.documentElement.setAttribute('data-theme', t);
  }

  getCustomerBalanceBreakdown(customerId, asOfDate = this.currentDate) {
    const customer = this.data.customers.find(c => c.id === customerId);
    if (!customer) {
      return { pastOverdue: 0, todaysCredit: 0, todaysRepaid: 0, todaysOverdue: 0, totalOverdue: 0, advanceCredit: 0 };
    }

    const openingPastDue = Number(customer.openingPastDue) || 0;

    const pastCreditSales = this.data.sales
      .filter(s => s.customerId === customerId && s.saleType === 'CREDIT' && s.date < asOfDate)
      .reduce((sum, s) => sum + (Number(s.finalAmount) || 0), 0);

    const pastRepayments = this.data.payments
      .filter(p => p.customerId === customerId && p.date < asOfDate)
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    // Net past balance: positive = debt; negative = advance deposit (Jama)
    const netPastBalance = (openingPastDue + pastCreditSales) - pastRepayments;

    const todaysCredit = this.data.sales
      .filter(s => s.customerId === customerId && s.saleType === 'CREDIT' && s.date === asOfDate)
      .reduce((sum, s) => sum + (Number(s.finalAmount) || 0), 0);

    const todaysRepaid = this.data.payments
      .filter(p => p.customerId === customerId && p.date === asOfDate)
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    let netPastOverdue = Math.max(0, netPastBalance);
    let pastAdvance = netPastBalance < 0 ? Math.abs(netPastBalance) : 0;

    // Past advance credit offsets today's credit purchases first
    let effectiveTodaysCredit = todaysCredit;
    if (pastAdvance > 0) {
      if (pastAdvance >= effectiveTodaysCredit) {
        pastAdvance -= effectiveTodaysCredit;
        effectiveTodaysCredit = 0;
      } else {
        effectiveTodaysCredit -= pastAdvance;
        pastAdvance = 0;
      }
    }

    // Apply today's repayments: first to past debt, remainder to today's purchase
    let remainingPayment = todaysRepaid;
    if (remainingPayment >= netPastOverdue) {
      remainingPayment -= netPastOverdue;
      netPastOverdue = 0;
    } else {
      netPastOverdue -= remainingPayment;
      remainingPayment = 0;
    }

    const todaysOverdue = Math.max(0, effectiveTodaysCredit - remainingPayment);
    const surplusPayment = remainingPayment > effectiveTodaysCredit ? (remainingPayment - effectiveTodaysCredit) : 0;

    const totalOverdue = netPastOverdue + todaysOverdue;
    const advanceCredit = pastAdvance + surplusPayment;

    return {
      pastOverdue: netPastOverdue,
      todaysCredit,
      todaysRepaid,
      todaysOverdue,
      totalOverdue,
      advanceCredit
    };
  }

  getLocationStats(locationId = this.currentLocationId, dateStr = this.currentDate) {
    const locSales = this.data.sales.filter(s => s.locationId === locationId && s.date === dateStr);
    const totalSales = locSales.reduce((sum, s) => sum + s.finalAmount, 0);
    const directCashSales = locSales.filter(s => s.saleType === 'DIRECT').reduce((sum, s) => sum + s.finalAmount, 0);
    const salesCount = locSales.length;

    const relevantCustomers = this.data.customers.filter(c => c.locationId === locationId);
    let totalPastOverdue = 0;
    let totalTodaysOverdue = 0;
    let grandTotalOverdue = 0;
    let debtorsCount = 0;

    relevantCustomers.forEach(cust => {
      const breakdown = this.getCustomerBalanceBreakdown(cust.id, dateStr);
      totalPastOverdue += breakdown.pastOverdue;
      totalTodaysOverdue += breakdown.todaysOverdue;
      grandTotalOverdue += breakdown.totalOverdue;
      if (breakdown.totalOverdue > 0) debtorsCount++;
    });

    return {
      totalSales,
      directCashSales,
      salesCount,
      totalTodaysOverdue,
      totalPastOverdue,
      grandTotalOverdue,
      debtorsCount
    };
  }

  getCustomerPeriodBreakdown(customerId, period = '1D', asOfDate = this.currentDate) {
    const customer = this.data.customers.find(c => c.id === customerId);
    if (!customer) {
      return { openingDue: 0, periodCredit: 0, periodRepaid: 0, netChange: 0, currentBalance: 0, startDate: asOfDate, endDate: asOfDate, period };
    }

    let startDate = asOfDate;
    if (period === '1W') {
      startDate = getRelativeDate(-6, asOfDate);
    } else if (period === '1M') {
      startDate = getRelativeDate(-29, asOfDate);
    } else if (period === '6M') {
      startDate = getRelativeDate(-179, asOfDate);
    } else if (period === 'ALL') {
      startDate = '1970-01-01';
    }

    if (period === '1D') {
      const daily = this.getCustomerBalanceBreakdown(customerId, asOfDate);
      return {
        period: '1D',
        startDate: asOfDate,
        endDate: asOfDate,
        openingDue: daily.pastOverdue,
        periodCredit: daily.todaysCredit,
        periodRepaid: daily.todaysRepaid,
        periodOverdue: daily.todaysOverdue,
        currentBalance: daily.totalOverdue > 0 ? daily.totalOverdue : (daily.advanceCredit > 0 ? -daily.advanceCredit : 0),
        advanceCredit: daily.advanceCredit,
        netChange: daily.todaysCredit - daily.todaysRepaid
      };
    }

    const openingPastDue = Number(customer.openingPastDue) || 0;
    const priorCredit = this.data.sales
      .filter(s => s.customerId === customerId && s.saleType === 'CREDIT' && s.date < startDate)
      .reduce((sum, s) => sum + (Number(s.finalAmount) || 0), 0);
    const priorRepaid = this.data.payments
      .filter(p => p.customerId === customerId && p.date < startDate)
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const openingDue = (openingPastDue + priorCredit) - priorRepaid;

    const periodCredit = this.data.sales
      .filter(s => s.customerId === customerId && s.saleType === 'CREDIT' && s.date >= startDate && s.date <= asOfDate)
      .reduce((sum, s) => sum + (Number(s.finalAmount) || 0), 0);

    const periodRepaid = this.data.payments
      .filter(p => p.customerId === customerId && p.date >= startDate && p.date <= asOfDate)
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const currentDaily = this.getCustomerBalanceBreakdown(customerId, asOfDate);
    const currentBalance = currentDaily.totalOverdue > 0 ? currentDaily.totalOverdue : (currentDaily.advanceCredit > 0 ? -currentDaily.advanceCredit : 0);

    return {
      period,
      startDate,
      endDate: asOfDate,
      openingDue,
      periodCredit,
      periodRepaid,
      netChange: periodCredit - periodRepaid,
      currentBalance,
      advanceCredit: currentDaily.advanceCredit
    };
  }

  getDebtAgingStats(locationId = this.currentLocationId, asOfDate = this.currentDate) {
    const matchLoc = (itemLocId) => locationId === 'ALL' || !itemLocId || itemLocId === locationId;
    const relevantCustomers = this.data.customers.filter(c => locationId === 'ALL' || !c.locationId || c.locationId === locationId || this.data.sales.some(s => s.customerId === c.id && matchLoc(s.locationId)));
    const d7 = getRelativeDate(-7, asOfDate);
    const d30 = getRelativeDate(-30, asOfDate);

    let total0to7 = 0;
    let total8to30 = 0;
    let total31Plus = 0;
    let count0to7 = 0;
    let count8to30 = 0;
    let count31Plus = 0;

    relevantCustomers.forEach(cust => {
      const bal = this.getCustomerBalanceBreakdown(cust.id, asOfDate);
      let remainingOwed = bal.totalOverdue;
      if (remainingOwed <= 0) return;

      // Find credit sales sorted newest to oldest
      const creditSales = this.data.sales
        .filter(s => s.customerId === cust.id && s.saleType === 'CREDIT' && s.date <= asOfDate && matchLoc(s.locationId))
        .sort((a, b) => b.date.localeCompare(a.date));

      let cust0to7 = 0;
      let cust8to30 = 0;

      for (const s of creditSales) {
        if (remainingOwed <= 0) break;
        const amt = Math.min(remainingOwed, s.finalAmount);
        if (s.date >= d7) {
          cust0to7 += amt;
        } else if (s.date >= d30) {
          cust8to30 += amt;
        }
        remainingOwed -= amt;
      }

      const cust31Plus = remainingOwed; // Remaining is older than 30 days or opening dues

      total0to7 += cust0to7;
      total8to30 += cust8to30;
      total31Plus += cust31Plus;

      if (cust0to7 > 0) count0to7++;
      if (cust8to30 > 0) count8to30++;
      if (cust31Plus > 0) count31Plus++;
    });

    const grandTotal = total0to7 + total8to30 + total31Plus;

    return {
      grandTotal,
      bracket0to7: { amount: total0to7, count: count0to7, percent: grandTotal > 0 ? (total0to7 / grandTotal) * 100 : 0 },
      bracket8to30: { amount: total8to30, count: count8to30, percent: grandTotal > 0 ? (total8to30 / grandTotal) * 100 : 0 },
      bracket31Plus: { amount: total31Plus, count: count31Plus, percent: grandTotal > 0 ? (total31Plus / grandTotal) * 100 : 0 }
    };
  }

  getDashboardAnalytics(period = '30D', locationId = this.currentLocationId, asOfDate = this.currentDate) {
    let startDate = asOfDate;
    if (period === '1D') startDate = asOfDate;
    else if (period === '7D') startDate = getRelativeDate(-6, asOfDate);
    else if (period === '30D') startDate = getRelativeDate(-29, asOfDate);
    else if (period === '6M') startDate = getRelativeDate(-179, asOfDate);
    else if (period === 'ALL') startDate = '1970-01-01';

    const matchLoc = (itemLocId) => locationId === 'ALL' || !itemLocId || itemLocId === locationId;

    const periodSales = this.data.sales.filter(s => matchLoc(s.locationId) && s.date >= startDate && s.date <= asOfDate);
    const periodPayments = this.data.payments.filter(p => matchLoc(p.locationId) && p.date >= startDate && p.date <= asOfDate);

    const grossTurnover = periodSales.reduce((sum, s) => sum + (s.finalAmount || 0), 0);
    const spotCashSales = periodSales.filter(s => s.saleType === 'DIRECT').reduce((sum, s) => sum + (s.finalAmount || 0), 0);
    const creditSales = periodSales.filter(s => s.saleType === 'CREDIT').reduce((sum, s) => sum + (s.finalAmount || 0), 0);
    const repaymentsCollected = periodPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const cashRepayments = periodPayments.filter(p => !p.paymentMode || p.paymentMode === 'CASH').reduce((sum, p) => sum + (p.amount || 0), 0);
    const onlineRepayments = periodPayments.filter(p => p.paymentMode && p.paymentMode !== 'CASH').reduce((sum, p) => sum + (p.amount || 0), 0);
    const totalCashCollected = spotCashSales + repaymentsCollected;

    const commissionRate = Number(this.data.shopProfile?.commissionRate) || 5.0;
    const estimatedCommission = (grossTurnover * commissionRate) / 100;

    const relevantCustomers = this.data.customers.filter(c => locationId === 'ALL' || !c.locationId || c.locationId === locationId || this.data.sales.some(s => s.customerId === c.id && matchLoc(s.locationId)));
    let grandTotalOverdue = 0;
    let debtorsCount = 0;
    let grandTotalAdvance = 0;
    let advanceCount = 0;

    relevantCustomers.forEach(c => {
      const b = this.getCustomerBalanceBreakdown(c.id, asOfDate);
      grandTotalOverdue += (b.totalOverdue || 0);
      if (b.totalOverdue > 0) debtorsCount++;
      if (b.advanceCredit > 0) {
        grandTotalAdvance += b.advanceCredit;
        advanceCount++;
      }
    });

    // Top Produce
    const produceMap = {};
    periodSales.forEach(s => {
      (s.items || []).forEach(i => {
        if (!produceMap[i.itemName]) {
          produceMap[i.itemName] = { name: i.itemName, unit: i.unit || 'kg', weight: 0, revenue: 0 };
        }
        produceMap[i.itemName].weight += (Number(i.weight) || 0);
        produceMap[i.itemName].revenue += (Number(i.lineTotal) || 0);
      });
    });
    const topProduce = Object.values(produceMap).sort((a, b) => b.revenue - a.revenue).slice(0, 8);

    // Top Debtors
    const topDebtors = relevantCustomers.map(c => {
      const b = this.getCustomerBalanceBreakdown(c.id, asOfDate);
      const lastPayment = this.data.payments.filter(p => p.customerId === c.id).sort((a, b) => b.date.localeCompare(a.date))[0];
      return {
        id: c.id,
        name: c.name,
        phone: c.phone,
        locationId: c.locationId,
        totalOverdue: b.totalOverdue,
        lastPaymentDate: lastPayment ? lastPayment.date : 'None'
      };
    }).filter(c => c.totalOverdue > 0).sort((a, b) => b.totalOverdue - a.totalOverdue).slice(0, 10);

    // Top Buyers by volume
    const buyerMap = {};
    periodSales.forEach(s => {
      const name = s.customerName || 'Walk-in Cash Buyer';
      const isWalkIn = !s.customerId;
      const key = s.customerId || name;
      if (!buyerMap[key]) {
        buyerMap[key] = {
          id: s.customerId || null,
          name,
          totalSpent: 0,
          billsCount: 0,
          isWalkIn,
          totalOverdue: 0,
          advanceCredit: 0
        };
        if (s.customerId) {
          const bal = this.getCustomerBalanceBreakdown(s.customerId, asOfDate);
          buyerMap[key].totalOverdue = bal.totalOverdue;
          buyerMap[key].advanceCredit = bal.advanceCredit;
        }
      }
      buyerMap[key].totalSpent += (s.finalAmount || 0);
      buyerMap[key].billsCount++;
    });
    const topBuyers = Object.values(buyerMap).sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 8);

    const aging = this.getDebtAgingStats(locationId, asOfDate);

    // -------------------------------------------------------------
    // PROFIT, COGS & INVENTORY ANALYTICS
    // -------------------------------------------------------------
    let totalCostOfGoodsSold = 0;
    const produceProfitMap = {};

    periodSales.forEach(s => {
      (s.items || []).forEach(i => {
        const weight = Number(i.weight) || 0;
        const rev = Number(i.lineTotal) || 0;

        let unitCost = i.costPrice !== undefined ? Number(i.costPrice) : 0;
        if (!unitCost && i.itemId) {
          const m = this.data.items.find(x => x.id === i.itemId);
          if (m) unitCost = Number(m.costPrice) || 0;
        }
        if (!unitCost) unitCost = (Number(i.rate) || 0) * 0.75;

        const lineCost = weight * unitCost;
        totalCostOfGoodsSold += lineCost;

        const key = i.itemName;
        if (!produceProfitMap[key]) {
          produceProfitMap[key] = {
            name: i.itemName,
            unit: i.unit || 'kg',
            weight: 0,
            revenue: 0,
            cost: 0,
            profit: 0,
            marginPct: 0
          };
        }
        produceProfitMap[key].weight += weight;
        produceProfitMap[key].revenue += rev;
        produceProfitMap[key].cost += lineCost;
        produceProfitMap[key].profit += (rev - lineCost);
      });
    });

    const grossProfit = Math.max(0, grossTurnover - totalCostOfGoodsSold);
    const profitMargin = grossTurnover > 0 ? (grossProfit / grossTurnover) * 100 : 0;

    const periodWastage = (this.data.inventoryWastage || []).filter(w => matchLoc(w.locationId) && w.date >= startDate && w.date <= asOfDate);
    const totalWastageLoss = periodWastage.reduce((sum, w) => sum + (Number(w.estimatedLoss) || 0), 0);
    const netProfit = grossProfit - totalWastageLoss;

    const topProduceProfit = Object.values(produceProfitMap).map(p => {
      p.marginPct = p.revenue > 0 ? (p.profit / p.revenue) * 100 : 0;
      return p;
    }).sort((a, b) => b.profit - a.profit).slice(0, 8);

    const relevantItems = (this.data.items || []);
    const totalStockValue = relevantItems.reduce((sum, itm) => sum + ((Number(itm.currentStock) || 0) * (Number(itm.costPrice) || 0)), 0);
    const lowStockCount = relevantItems.filter(itm => (Number(itm.currentStock) || 0) <= (Number(itm.minAlertStock) || 20) && (Number(itm.currentStock) || 0) > 0).length;
    const outOfStockCount = relevantItems.filter(itm => (Number(itm.currentStock) || 0) <= 0).length;

    return {
      period,
      startDate,
      endDate: asOfDate,
      grossTurnover,
      spotCashSales,
      creditSales,
      repaymentsCollected,
      cashRepayments,
      onlineRepayments,
      totalCashCollected,
      commissionRate,
      estimatedCommission,
      grandTotalOverdue,
      debtorsCount,
      grandTotalAdvance,
      advanceCount,
      totalCustomersCount: relevantCustomers.length,
      salesCount: periodSales.length,
      topProduce,
      topProduceProfit,
      topDebtors,
      topBuyers,
      aging,
      totalCostOfGoodsSold,
      grossProfit,
      profitMargin,
      totalWastageLoss,
      netProfit,
      totalStockValue,
      lowStockCount,
      outOfStockCount,
      periodWastage
    };
  }

  // -------------------------------------------------------------
  // INVENTORY & STOCK OPERATIONS
  // -------------------------------------------------------------
  recordInwardStock(data) {
    const item = this.data.items.find(i => i.id === data.itemId);
    if (!item) return { success: false, message: 'Produce item not found' };

    const qty = Number(data.quantity) || 0;
    if (qty <= 0) return { success: false, message: 'Quantity must be greater than zero' };

    const costPrice = Number(data.costPrice) || 0;
    if (costPrice < 0) return { success: false, message: 'Cost price cannot be negative' };

    const totalCost = qty * costPrice;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord = {
      id: 'inw-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      date: data.date || this.currentDate,
      time: data.time || timeStr,
      locationId: data.locationId || this.currentLocationId,
      itemId: item.id,
      itemName: item.name,
      quantity: qty,
      unit: item.unit || 'kg',
      costPrice,
      totalCost,
      supplier: (data.supplier || '').trim(),
      notes: (data.notes || '').trim()
    };

    if (!Array.isArray(this.data.inventoryInward)) this.data.inventoryInward = [];
    this.data.inventoryInward.unshift(newRecord);

    // Increment current stock
    item.currentStock = (Number(item.currentStock) || 0) + qty;

    // Update active cost price if specified (default: true)
    if (data.updateMasterCost !== false && costPrice > 0) {
      item.costPrice = costPrice;
    }

    this.save(this.data);
    dispatchMandiEvent('inventory-updated', { type: 'INWARD', record: newRecord });
    return { success: true, record: newRecord };
  }

  recordWastage(data) {
    const item = this.data.items.find(i => i.id === data.itemId);
    if (!item) return { success: false, message: 'Produce item not found' };

    const qty = Number(data.quantity) || 0;
    if (qty <= 0) return { success: false, message: 'Quantity must be greater than zero' };

    const costPrice = data.costPrice !== undefined ? Number(data.costPrice) : (Number(item.costPrice) || 0);
    const estimatedLoss = qty * costPrice;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord = {
      id: 'wst-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      date: data.date || this.currentDate,
      time: data.time || timeStr,
      locationId: data.locationId || this.currentLocationId,
      itemId: item.id,
      itemName: item.name,
      quantity: qty,
      unit: item.unit || 'kg',
      costPrice,
      estimatedLoss,
      reason: (data.reason || 'Spoiled / Rotten').trim(),
      notes: (data.notes || '').trim()
    };

    if (!Array.isArray(this.data.inventoryWastage)) this.data.inventoryWastage = [];
    this.data.inventoryWastage.unshift(newRecord);

    // Deduct stock
    item.currentStock = Math.max(0, (Number(item.currentStock) || 0) - qty);

    this.save(this.data);
    dispatchMandiEvent('inventory-updated', { type: 'WASTAGE', record: newRecord });
    return { success: true, record: newRecord };
  }

  adjustStock(itemId, newStock, reason = 'Physical stock count reconciliation') {
    const item = this.data.items.find(i => i.id === itemId);
    if (!item) return { success: false, message: 'Produce item not found' };

    const oldStock = Number(item.currentStock) || 0;
    const count = Math.max(0, Number(newStock) || 0);
    item.currentStock = count;

    this.save(this.data);
    dispatchMandiEvent('inventory-updated', { type: 'ADJUST', itemId, oldStock, newStock: count, reason });
    return { success: true, oldStock, newStock: count };
  }

  deleteInwardStock(id) {
    if (!Array.isArray(this.data.inventoryInward)) return false;
    const idx = this.data.inventoryInward.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.data.inventoryInward.splice(idx, 1);
      this.save(this.data);
      dispatchMandiEvent('inventory-updated', { type: 'INWARD_DELETED', id });
      return true;
    }
    return false;
  }

  deleteWastage(id) {
    if (!Array.isArray(this.data.inventoryWastage)) return false;
    const idx = this.data.inventoryWastage.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.data.inventoryWastage.splice(idx, 1);
      this.save(this.data);
      dispatchMandiEvent('inventory-updated', { type: 'WASTAGE_DELETED', id });
      return true;
    }
    return false;
  }

  getInventoryStats(locationId = this.currentLocationId, date = this.currentDate) {
    const items = this.data.items || [];
    let totalStockValue = 0;
    let totalSalesValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    items.forEach(itm => {
      const stock = Number(itm.currentStock) || 0;
      const cost = Number(itm.costPrice) || 0;
      const rate = Number(itm.defaultRate) || 0;
      const minAlert = Number(itm.minAlertStock) || 20;

      totalStockValue += (stock * cost);
      totalSalesValue += (stock * rate);

      if (stock <= 0) outOfStockCount++;
      else if (stock <= minAlert) lowStockCount++;
    });

    const projectedProfit = Math.max(0, totalSalesValue - totalStockValue);

    const matchLoc = (locId) => locationId === 'ALL' || !locId || locId === locationId;
    const todayInward = (this.data.inventoryInward || []).filter(r => matchLoc(r.locationId) && r.date === date);
    const todayWastage = (this.data.inventoryWastage || []).filter(r => matchLoc(r.locationId) && r.date === date);

    const todayInwardQty = todayInward.reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);
    const todayInwardCost = todayInward.reduce((sum, r) => sum + (Number(r.totalCost) || 0), 0);

    const todayWastageQty = todayWastage.reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);
    const todayWastageLoss = todayWastage.reduce((sum, r) => sum + (Number(r.estimatedLoss) || 0), 0);

    return {
      totalItems: items.length,
      totalStockValue,
      totalSalesValue,
      projectedProfit,
      lowStockCount,
      outOfStockCount,
      todayInwardQty,
      todayInwardCost,
      todayWastageQty,
      todayWastageLoss
    };
  }

  saveCustomer(custData) {
    if (!custData || !custData.name) return null;
    if (!Array.isArray(this.data.customers)) {
      this.data.customers = [];
    }

    let customer = null;
    const existingIndex = custData.id ? this.data.customers.findIndex(c => c.id === custData.id) : -1;
    if (existingIndex !== -1) {
      customer = {
        ...this.data.customers[existingIndex],
        ...custData,
        name: custData.name.trim(),
        phone: (custData.phone || '').trim(),
        locationId: custData.locationId || this.currentLocationId,
        openingPastDue: Number(custData.openingPastDue || 0)
      };
      this.data.customers[existingIndex] = customer;
    } else {
      customer = {
        id: custData.id || ('cust-' + Date.now()),
        name: custData.name.trim(),
        phone: (custData.phone || '').trim(),
        locationId: custData.locationId || this.currentLocationId,
        openingPastDue: Number(custData.openingPastDue || 0)
      };
      this.data.customers.push(customer);
    }

    this.save();

    if (this.data.cloudConfig && this.data.cloudConfig.scriptUrl && this.data.cloudConfig.autoSync) {
      this.syncCustomerToCloud(customer);
    }

    return customer;
  }

  async syncCustomerToCloud(customer) {
    if (!this.data.cloudConfig || !this.data.cloudConfig.scriptUrl) return;
    try {
      const payload = {
        action: 'SYNC_CUSTOMER',
        customer: {
          id: customer.id,
          name: customer.name,
          phone: customer.phone || '',
          locationId: customer.locationId || 'loc-1',
          openingPastDue: Number(customer.openingPastDue || 0)
        }
      };
      await fetch(this.data.cloudConfig.scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Customer cloud sync queued:', err);
    }
  }

  async syncMasterDataToCloud() {
    const cfg = this.data.cloudConfig || getCloudConfig();
    const url = cfg ? cfg.scriptUrl : '';
    if (!url) {
      return { success: false, message: 'Google Sheets URL not configured' };
    }

    const customersWithBalances = this.data.customers.map(c => {
      const custSales = (this.data.sales || []).filter(s => s.customerId === c.id && s.saleType === 'CREDIT' && s.status !== 'VOID');
      const totalBills = custSales.reduce((sum, s) => sum + Number(s.finalAmount || 0), 0);

      const custPayments = (this.data.payments || []).filter(p => p.customerId === c.id && p.status !== 'VOID');
      const totalPaid = custPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

      const openDue = Number(c.openingPastDue || 0);
      const curBal = openDue + totalBills - totalPaid;

      return {
        id: c.id,
        name: c.name,
        phone: c.phone || '',
        locationId: c.locationId || 'loc-1',
        openingPastDue: openDue,
        totalBills: totalBills,
        totalPaid: totalPaid,
        currentBalance: curBal
      };
    });

    const payload = {
      action: 'BULK_SYNC_ALL',
      customers: customersWithBalances,
      items: this.data.items,
      shopProfile: this.data.shopProfile,
      locations: this.data.locations
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data && data.status === 'success') {
        cfg.lastSync = new Date().toISOString();
        if (data.stats) cfg.stats = data.stats;
        saveCloudConfig(cfg);
        updateSyncPillUI();
      }
      return { success: data && data.status === 'success', data };
    } catch (err) {
      console.warn('Master data cloud sync error:', err);
      return { success: false, message: err.message };
    }
  }
}

const store = new CoreStore();

// =============================================================================
// SHARED UI: HEADER, NAVIGATION, MODALS & THEME/I18N
// =============================================================================
function initSharedUI(activeNavId) {
  // 1. Set theme
  document.documentElement.setAttribute('data-theme', store.theme);

  // 2. Insert or bind Header
  renderSharedHeader(activeNavId);

  // 3. Insert or bind Mobile Bottom Nav
  renderMobileBottomNav(activeNavId);

  // 4. Inject Unified Global Modals (Repayment, Customer, Item, Location, Print)
  injectGlobalModals(activeNavId);

  // 5. Apply Language Translations
  applyI18n();
}

function renderSharedHeader(activeNavId) {
  const header = document.getElementById('sharedHeader');
  if (!header) return;

  const locOptions = store.data.locations
    .map(l => `<option value="${l.id}" ${l.id === store.currentLocationId ? 'selected' : ''}>${l.name}</option>`)
    .join('');

  header.innerHTML = `
    <div class="header-left">
      <a href="index.html" class="brand-link">
        <span class="brand-text">Zen</span>
      </a>

      <div class="header-context">
        <div class="context-group">
          <label class="context-label" data-i18n="label_location">Location</label>
          <select id="sharedLocSelect" class="header-select">
            ${locOptions}
          </select>
        </div>

        <div class="context-group">
          <label class="context-label" data-i18n="label_date">Date</label>
          <input type="date" id="sharedDateSelect" value="${store.currentDate}" class="header-date">
        </div>
      </div>
    </div>

    <!-- Desktop Navigation Links -->
    <nav class="desktop-nav">
      <a href="index.html" class="nav-item ${activeNavId === 'billing' ? 'active' : ''}" data-i18n="nav_billing">Billing</a>
      <a href="dashboard.html" class="nav-item ${activeNavId === 'dashboard' ? 'active' : ''}" data-i18n="nav_dashboard">Dashboard</a>
      <a href="inventory.html" class="nav-item ${activeNavId === 'inventory' ? 'active' : ''}" data-i18n="nav_inventory">Inventory</a>
      <a href="customers.html" class="nav-item ${activeNavId === 'customers' ? 'active' : ''}" data-i18n="nav_customers">Customers</a>
      <a href="daybook.html" class="nav-item ${activeNavId === 'daybook' ? 'active' : ''}" data-i18n="nav_daybook">Daybook</a>
      <a href="items.html" class="nav-item ${activeNavId === 'rates' ? 'active' : ''}" data-i18n="nav_rates">Rates</a>
      <a href="settings.html" class="nav-item ${activeNavId === 'settings' ? 'active' : ''}" data-i18n="nav_settings">Settings</a>
      <a href="guide.html" class="nav-item ${activeNavId === 'guide' ? 'active' : ''}" data-i18n="nav_guide">Guide</a>
    </nav>

    <!-- Header Actions -->
    <div class="header-right">
      <!-- Unified + Create Menu -->
      <div class="create-dropdown-wrap">
        <button id="createMenuBtn" class="btn-create" data-i18n="btn_create">+ Create</button>
        <div id="createDropdown" class="create-dropdown hidden">
          <a href="index.html" class="dropdown-item" data-i18n="menu_new_bill">New Bill</a>
          <button type="button" class="dropdown-item" onclick="openGlobalRepaymentModal()" data-i18n="menu_receive_payment">Receive Payment</button>
          <a href="inventory.html?action=inward" class="dropdown-item">+ Inward Stock (Aamad)</a>
          <a href="inventory.html?action=wastage" class="dropdown-item">+ Log Wastage (Kharab)</a>
          <button type="button" class="dropdown-item" onclick="openGlobalCustomerModal()" data-i18n="menu_new_customer">New Customer</button>
          <button type="button" class="dropdown-item" onclick="openGlobalItemModal()" data-i18n="menu_new_item">New Produce Item</button>
          <button type="button" class="dropdown-item" onclick="openGlobalLocationModal()" data-i18n="menu_new_location">New Location</button>
        </div>
      </div>

      <!-- Cloud Sync Status Pill -->
      <button id="sharedSyncPill" class="sync-pill sync-pill-local" onclick="handleSyncPillClick()" title="Cloud Sync Status">
        <span class="sync-pill-dot"></span>Sync
      </button>

      <!-- Owner Security Lock Button -->
      <button id="sharedLockBtn" class="btn-lock" onclick="toggleOwnerLock()" title="Owner Security Lock">
        Lock
      </button>

      <!-- Language Toggle -->
      <button id="sharedLangToggle" class="btn-icon" title="Toggle Language">
        ${store.lang === 'en' ? 'हिन्दी' : 'English'}
      </button>

      <!-- Theme Toggle -->
      <button id="sharedThemeToggle" class="btn-icon" title="Toggle Theme">
        <span class="theme-sun">Light</span>
        <span class="theme-moon">Dark</span>
      </button>
    </div>
  `;

  // Bind Header Listeners
  document.getElementById('sharedLocSelect')?.addEventListener('change', (e) => {
    store.setLocation(e.target.value);
    window.location.reload();
  });

  document.getElementById('sharedDateSelect')?.addEventListener('change', (e) => {
    store.setDate(e.target.value);
    window.location.reload();
  });

  document.getElementById('createMenuBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('createDropdown')?.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    document.getElementById('createDropdown')?.classList.add('hidden');
  });

  document.getElementById('sharedLangToggle')?.addEventListener('click', () => {
    store.setLang(store.lang === 'en' ? 'hi' : 'en');
    window.location.reload();
  });

  document.getElementById('sharedThemeToggle')?.addEventListener('click', () => {
    store.setTheme(store.theme === 'dark' ? 'light' : 'dark');
  });

  updateSyncPillUI();
  updateLockBtnUI();
}

function renderMobileBottomNav(activeNavId) {
  const bottomNav = document.getElementById('sharedMobileNav');
  if (!bottomNav) return;

  const isMoreActive = ['dashboard', 'settings', 'rates', 'guide'].includes(activeNavId);

  bottomNav.innerHTML = `
    <a href="index.html" class="mobile-nav-tab ${activeNavId === 'billing' ? 'active' : ''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2V4a2 2 0 0 0-2-2z"/>
        <path d="M8 7h8"/>
        <path d="M8 11h8"/>
        <path d="M8 15h5"/>
      </svg>
      <span class="tab-label" data-i18n="mob_nav_billing">Billing</span>
    </a>
    <a href="inventory.html" class="mobile-nav-tab ${activeNavId === 'inventory' ? 'active' : ''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
      <span class="tab-label" data-i18n="mob_nav_stock">Stock</span>
    </a>
    <a href="customers.html" class="mobile-nav-tab ${activeNavId === 'customers' ? 'active' : ''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      <span class="tab-label" data-i18n="mob_nav_khata">Khata</span>
    </a>
    <a href="daybook.html" class="mobile-nav-tab ${activeNavId === 'daybook' ? 'active' : ''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        <line x1="8" y1="7" x2="16" y2="7"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
      <span class="tab-label" data-i18n="mob_nav_daybook">Daybook</span>
    </a>
    <button type="button" class="mobile-nav-tab ${isMoreActive ? 'active' : ''}" onclick="toggleMobileMoreSheet(event)" id="btnMobileMoreNav" aria-label="More navigation options">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      </svg>
      <span class="tab-label" data-i18n="mob_nav_more">More</span>
    </button>
  `;
}

function applyI18n() {
  const dict = I18N_DICT[store.lang] || I18N_DICT.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
}

// =============================================================================
// GLOBAL MODALS INJECTION & LOGIC
// =============================================================================
function injectGlobalModals(activeNavId) {
  const container = document.createElement('div');
  container.id = 'globalModalsContainer';
  container.innerHTML = `
    <!-- Modal 1: Repayment -->
    <div id="globalRepayModal" class="modal-backdrop hidden">
      <div class="modal-box modal-md">
        <div class="modal-header">
          <h3 class="modal-title" data-i18n="menu_receive_payment">Receive Payment</h3>
          <button class="modal-close" onclick="closeModal('globalRepayModal')">&times;</button>
        </div>
        <form id="globalRepayForm">
          <div class="form-group">
            <label class="form-label" data-i18n="th_buyer">Customer / Party *</label>
            <select id="modalRepayCustSelect" class="form-select" required></select>
          </div>
          <div id="modalRepayDuesBox" class="modal-dues-box hidden">
            <div><span class="sub-label" data-i18n="past_overdue">Past Overdue</span>: <strong id="mRepayPast" class="text-danger font-mono">₹0</strong></div>
            <div><span class="sub-label" data-i18n="today_overdue">Today's Due</span>: <strong id="mRepayToday" class="text-warning font-mono">₹0</strong></div>
            <div><span class="sub-label" data-i18n="total_due">Total Balance</span>: <strong id="mRepayTotal" class="font-mono">₹0</strong></div>
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label" data-i18n="label_date">Date</label>
              <input type="date" id="modalRepayDate" class="form-input" value="${store.currentDate}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Amount (₹) *</label>
              <input type="number" id="modalRepayAmount" class="form-input font-mono" step="1" min="1" required placeholder="0.00">
            </div>
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Payment Mode</label>
              <select id="modalRepayMode" class="form-select">
                <option value="CASH">Cash</option>
                <option value="UPI">UPI / GPay / PhonePe</option>
                <option value="BANK">Bank Transfer</option>
                <option value="CHEQUE">Cheque</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Note / Receipt Ref</label>
              <input type="text" id="modalRepayNote" class="form-input" placeholder="e.g. Night settlement">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-ghost" onclick="closeModal('globalRepayModal')" data-i18n="btn_cancel">Cancel</button>
            <button type="submit" class="btn-primary" data-i18n="btn_save">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal 2: Customer -->
    <div id="globalCustomerModal" class="modal-backdrop hidden">
      <div class="modal-box modal-sm">
        <div class="modal-header">
          <h3 class="modal-title" data-i18n="menu_new_customer">New Customer</h3>
          <button class="modal-close" onclick="closeModal('globalCustomerModal')">&times;</button>
        </div>
        <form id="globalCustomerForm">
          <div class="form-group">
            <label class="form-label">Customer Name *</label>
            <input type="text" id="modalCustName" class="form-input" placeholder="e.g. Ramesh Sabzi Bhandar" required>
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" id="modalCustPhone" class="form-input font-mono" placeholder="e.g. 9876543210">
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="label_location">Market Location</label>
            <select id="modalCustLoc" class="form-select"></select>
          </div>
          <div class="form-group">
            <label class="form-label">Opening Past Due (₹)</label>
            <input type="number" id="modalCustOpening" class="form-input font-mono" step="1" value="0">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-ghost" onclick="closeModal('globalCustomerModal')" data-i18n="btn_cancel">Cancel</button>
            <button type="submit" class="btn-primary" data-i18n="btn_save">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal 3: Item -->
    <div id="globalItemModal" class="modal-backdrop hidden">
      <div class="modal-box modal-sm">
        <div class="modal-header">
          <h3 class="modal-title" data-i18n="menu_new_item">New Produce Item</h3>
          <button class="modal-close" onclick="closeModal('globalItemModal')">&times;</button>
        </div>
        <form id="globalItemForm">
          <div class="form-group">
            <label class="form-label">Produce Name *</label>
            <input type="text" id="modalItemName" class="form-input" placeholder="e.g. Red Tomato" required>
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <input type="text" id="modalItemCat" class="form-input" list="categoryDatalist" placeholder="e.g. Vegetables, Fruits, Grains...">
            <datalist id="categoryDatalist"></datalist>
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Unit</label>
              <select id="modalItemUnit" class="form-select">
                <option value="kg">kg</option>
                <option value="crate">crate</option>
                <option value="bag">bag</option>
                <option value="box">box</option>
                <option value="quintal">quintal</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Rate (₹) *</label>
              <input type="number" id="modalItemRate" class="form-input font-mono" step="0.5" required placeholder="0.00">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-ghost" onclick="closeModal('globalItemModal')" data-i18n="btn_cancel">Cancel</button>
            <button type="submit" class="btn-primary" data-i18n="btn_save">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal 4: Location -->
    <div id="globalLocationModal" class="modal-backdrop hidden">
      <div class="modal-box modal-sm">
        <div class="modal-header">
          <h3 class="modal-title" data-i18n="menu_new_location">New Location</h3>
          <button class="modal-close" onclick="closeModal('globalLocationModal')">&times;</button>
        </div>
        <form id="globalLocationForm">
          <div class="form-group">
            <label class="form-label">Location / Shed Name *</label>
            <input type="text" id="modalLocName" class="form-input" placeholder="e.g. South Gate Stall" required>
          </div>
          <div class="form-group">
            <label class="form-label">Code</label>
            <input type="text" id="modalLocCode" class="form-input font-mono" placeholder="e.g. SOUTH">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-ghost" onclick="closeModal('globalLocationModal')" data-i18n="btn_cancel">Cancel</button>
            <button type="submit" class="btn-primary" data-i18n="btn_save">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal 5: Thermal Print Slip Preview -->
    <div id="globalPrintModal" class="modal-backdrop hidden">
      <div class="modal-box modal-sm printable-modal">
        <div class="modal-header no-print">
          <h3 class="modal-title" id="globalPrintModalTitle">Receipt Slip</h3>
          <button class="modal-close" onclick="closeModal('globalPrintModal')">&times;</button>
        </div>
        <div class="thermal-receipt" id="globalReceiptArea"></div>
        <div class="modal-footer no-print" style="display:flex; flex-direction:column; gap:0.6rem; align-items:stretch;">
          <div style="display:flex; gap:0.4rem; align-items:center;">
            <input type="tel" id="whatsappDirectPhone" class="form-input font-mono" placeholder="Customer WhatsApp No. (e.g. 9845012345)" style="flex:1; font-size:0.78rem; padding:0.35rem 0.5rem;">
            <button type="button" class="btn-whatsapp" id="btnShareWhatsAppReceipt" onclick="shareCurrentReceiptViaWhatsApp()" title="Share bill via WhatsApp" style="white-space:nowrap;">Share WhatsApp</button>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <button type="button" class="btn-ghost" onclick="closeModal('globalPrintModal')" data-i18n="btn_close">Close</button>
            <button type="button" class="btn-primary" onclick="printThermalReceipt()" data-i18n="btn_print">Print Receipt</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 6: Owner PIN Authorization Keypad -->
    <div id="globalPinModal" class="modal-backdrop hidden">
      <div class="modal-box modal-sm" style="max-width:340px; text-align:center;">
        <div class="modal-header">
          <h3 class="modal-title">Owner PIN Authorization</h3>
          <button class="modal-close" onclick="cancelPinModal()">&times;</button>
        </div>
        <div style="padding:1.25rem 1rem;">
          <span id="globalPinActionLabel" style="font-size:0.8rem; color:var(--text-muted); display:block; margin-bottom:0.5rem;">
            Owner Authorization Required
          </span>

          <!-- 4 PIN Dots -->
          <div class="pin-display-wrap">
            <div class="pin-dot" id="pinDot0"></div>
            <div class="pin-dot" id="pinDot1"></div>
            <div class="pin-dot" id="pinDot2"></div>
            <div class="pin-dot" id="pinDot3"></div>
          </div>

          <!-- Hidden input for physical keyboard entry -->
          <input type="password" id="globalPinHiddenInput" maxlength="4" pattern="[0-9]*" inputmode="numeric" style="position:absolute; opacity:0; pointer-events:none;">

          <div id="globalPinError" class="hidden text-danger" style="font-size:0.75rem; font-weight:600; margin-top:0.4rem;">
            Incorrect PIN. Default is 1234.
          </div>

          <!-- 3x4 Touch Numeric Keypad -->
          <div class="pin-keypad">
            <button type="button" class="pin-key" onclick="pressPinDigit('1')">1</button>
            <button type="button" class="pin-key" onclick="pressPinDigit('2')">2</button>
            <button type="button" class="pin-key" onclick="pressPinDigit('3')">3</button>
            <button type="button" class="pin-key" onclick="pressPinDigit('4')">4</button>
            <button type="button" class="pin-key" onclick="pressPinDigit('5')">5</button>
            <button type="button" class="pin-key" onclick="pressPinDigit('6')">6</button>
            <button type="button" class="pin-key" onclick="pressPinDigit('7')">7</button>
            <button type="button" class="pin-key" onclick="pressPinDigit('8')">8</button>
            <button type="button" class="pin-key" onclick="pressPinDigit('9')">9</button>
            <button type="button" class="pin-key action-key" onclick="clearPinDigits()">Clear</button>
            <button type="button" class="pin-key" onclick="pressPinDigit('0')">0</button>
            <button type="button" class="pin-key action-key" onclick="backspacePinDigit()">Del</button>
          </div>

          <div style="margin-top:1rem; font-size:0.72rem; color:var(--text-dim);">
            Default PIN: <code>1234</code> (Configurable in Settings)
          </div>
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button type="button" class="btn-ghost" onclick="cancelPinModal()">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Modal 7: Mobile More Slide-up Sheet -->
    <div id="globalMoreSheet" class="mobile-sheet-backdrop hidden" onclick="handleMoreSheetBackdropClick(event)">
      <div class="mobile-sheet-content" onclick="event.stopPropagation()">
        <div class="mobile-sheet-handle"></div>
        <div class="mobile-sheet-header">
          <div class="mobile-sheet-title-wrap">
            <h3 class="mobile-sheet-title" data-i18n="mob_sheet_title">More Options</h3>
            <span class="mobile-sheet-sub" data-i18n="mob_sheet_subtitle">Executive tools, rates & management</span>
          </div>
          <button type="button" class="modal-close" onclick="closeMobileMoreSheet()" aria-label="Close menu">&times;</button>
        </div>
        
        <div class="mobile-sheet-grid">
          <!-- 1. Executive Dashboard -->
          <a href="dashboard.html" class="mobile-sheet-item ${activeNavId === 'dashboard' ? 'active' : ''}">
            <div class="mobile-sheet-icon-wrap icon-dashboard">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div class="mobile-sheet-text">
              <span class="mobile-sheet-name" data-i18n="nav_dashboard">Dashboard</span>
              <span class="mobile-sheet-desc" data-i18n="mob_desc_dashboard">Sales summary, profit margins & metrics</span>
            </div>
            <svg class="mobile-sheet-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>

          <!-- 2. Mandi Rates & Items -->
          <a href="items.html" class="mobile-sheet-item ${activeNavId === 'rates' ? 'active' : ''}">
            <div class="mobile-sheet-icon-wrap icon-rates">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            </div>
            <div class="mobile-sheet-text">
              <span class="mobile-sheet-name" data-i18n="nav_rates">Mandi Rates</span>
              <span class="mobile-sheet-desc" data-i18n="mob_desc_rates">Produce catalog & market price lists</span>
            </div>
            <svg class="mobile-sheet-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>

          <!-- 3. Settings & Shop Profile -->
          <a href="settings.html" class="mobile-sheet-item ${activeNavId === 'settings' ? 'active' : ''}">
            <div class="mobile-sheet-icon-wrap icon-settings">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <div class="mobile-sheet-text">
              <span class="mobile-sheet-name" data-i18n="nav_settings">Settings & Stalls</span>
              <span class="mobile-sheet-desc" data-i18n="mob_desc_settings">Shop firm details, SOPs & backups</span>
            </div>
            <svg class="mobile-sheet-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>

          <!-- 4. User Guide & Help -->
          <a href="guide.html" class="mobile-sheet-item ${activeNavId === 'guide' ? 'active' : ''}">
            <div class="mobile-sheet-icon-wrap" style="background:rgba(59,130,246,0.12); color:#60a5fa;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                <circle cx="12" cy="8" r="1"/>
                <path d="M12 11v4"/>
              </svg>
            </div>
            <div class="mobile-sheet-text">
              <span class="mobile-sheet-name" data-i18n="nav_guide">User Guide & Help</span>
              <span class="mobile-sheet-desc" data-i18n="mob_desc_guide">Step-by-step operating instructions</span>
            </div>
            <svg class="mobile-sheet-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>

        <!-- Quick Utilities Row -->
        <div class="mobile-sheet-utilities">
          <button type="button" class="sheet-util-btn" onclick="store.setTheme(store.theme === 'dark' ? 'light' : 'dark');" title="Toggle Theme">
            <span class="theme-icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg></span>
            <span data-i18n="mob_util_theme">Theme</span>
          </button>

          <button type="button" class="sheet-util-btn" onclick="store.setLang(store.lang === 'en' ? 'hi' : 'en'); window.location.reload();" title="Toggle Language">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span id="sheetLangVal">${store.lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          <button type="button" class="sheet-util-btn" onclick="closeMobileMoreSheet(); toggleOwnerLock();" title="Lock Terminal">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span data-i18n="mob_util_lock">Lock</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);
  bindGlobalModalForms();
}

function toggleMobileMoreSheet(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const sheet = document.getElementById('globalMoreSheet');
  if (!sheet) return;
  const isHidden = sheet.classList.contains('hidden');
  if (isHidden) {
    sheet.classList.remove('hidden');
    const langEl = document.getElementById('sheetLangVal');
    if (langEl) langEl.textContent = (store.lang === 'en' ? 'हिन्दी' : 'English');
  } else {
    sheet.classList.add('hidden');
  }
}

function closeMobileMoreSheet() {
  const sheet = document.getElementById('globalMoreSheet');
  if (sheet) sheet.classList.add('hidden');
}

function handleMoreSheetBackdropClick(e) {
  if (e.target && e.target.id === 'globalMoreSheet') {
    closeMobileMoreSheet();
  }
}

function bindGlobalModalForms() {
  // Repay form
  document.getElementById('modalRepayCustSelect')?.addEventListener('change', (e) => {
    const custId = e.target.value;
    const box = document.getElementById('modalRepayDuesBox');
    if (!custId) {
      box?.classList.add('hidden');
      return;
    }
    const balance = store.getCustomerBalanceBreakdown(custId, store.currentDate);
    document.getElementById('mRepayPast').textContent = formatCurrency(balance.pastOverdue);
    document.getElementById('mRepayToday').textContent = formatCurrency(balance.todaysOverdue);
    const mTotalEl = document.getElementById('mRepayTotal');
    if (balance.advanceCredit > 0) {
      mTotalEl.textContent = `${formatCurrency(-balance.advanceCredit)} (Advance Deposit)`;
      mTotalEl.className = 'text-success font-mono font-bold';
    } else {
      mTotalEl.textContent = formatCurrency(balance.totalOverdue);
      mTotalEl.className = 'text-danger font-mono font-bold';
    }
    box?.classList.remove('hidden');
  });

  document.getElementById('globalRepayForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const custId = document.getElementById('modalRepayCustSelect').value;
    const date = document.getElementById('modalRepayDate').value || store.currentDate;
    const amount = parseFloat(document.getElementById('modalRepayAmount').value) || 0;
    const mode = document.getElementById('modalRepayMode').value;
    const notes = document.getElementById('modalRepayNote').value.trim();

    if (!custId || amount <= 0) return;
    const cust = store.data.customers.find(c => c.id === custId);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newPayment = {
      id: 'pay-' + Date.now(),
      receiptNo: 'REC-' + (store.data.payments.length + 2001),
      date,
      time: timeStr,
      locationId: store.currentLocationId,
      customerId: custId,
      customerName: cust ? cust.name : 'Customer',
      amount,
      paymentMode: mode,
      notes
    };

    store.data.payments.unshift(newPayment);
    store.save(store.data);

    if (typeof syncPaymentToCloudAsync === 'function') {
      syncPaymentToCloudAsync(newPayment);
    }
    closeModal('globalRepayModal');
    dispatchMandiEvent('payment-saved', newPayment);
  });

  // Customer Form
  document.getElementById('globalCustomerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('modalCustName').value.trim();
    const phone = document.getElementById('modalCustPhone').value.trim();
    const locId = document.getElementById('modalCustLoc').value || store.currentLocationId;
    const opening = parseFloat(document.getElementById('modalCustOpening').value) || 0;

    if (!name) return;
    const newCust = store.saveCustomer({
      name,
      phone,
      locationId: locId,
      openingPastDue: opening
    });

    closeModal('globalCustomerModal');
    dispatchMandiEvent('customer-saved', newCust);
  });

  // Item Form
  document.getElementById('globalItemForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('modalItemName').value.trim();
    const cat = document.getElementById('modalItemCat').value.trim() || 'Produce';
    const unit = document.getElementById('modalItemUnit').value;
    const rate = parseFloat(document.getElementById('modalItemRate').value) || 0;

    if (!name || rate <= 0) return;
    const newItem = {
      id: 'itm-' + Date.now(),
      name,
      category: cat,
      unit,
      defaultRate: rate
    };
    store.data.items.push(newItem);

    store.save(store.data);
    closeModal('globalItemModal');
    dispatchMandiEvent('item-saved', newItem);
  });

  // Location Form
  document.getElementById('globalLocationForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('modalLocName').value.trim();
    const code = (document.getElementById('modalLocCode').value.trim() || 'LOC').toUpperCase();

    if (!name) return;
    const newLoc = {
      id: 'loc-' + Date.now(),
      name,
      code
    };
    store.data.locations.push(newLoc);

    store.save(store.data);
    closeModal('globalLocationModal');
    dispatchMandiEvent('location-saved', newLoc);
  });

  // Owner PIN Hidden Keyboard Input
  document.getElementById('globalPinHiddenInput')?.addEventListener('input', (e) => {
    const val = e.target.value.replace(/\D/g, '');
    enteredPinDigits = val.slice(0, 4);
    updatePinDisplay();
    if (enteredPinDigits.length === 4) {
      verifyEnteredPin();
    }
  });

  document.getElementById('globalPinHiddenInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cancelPinModal();
    }
  });
}

function dispatchMandiEvent(eventName, detail) {
  window.dispatchEvent(new CustomEvent('mandi:' + eventName, { detail }));
  
  // Safely refresh on-page UI components without wiping the cashier's active bill docket
  let handled = false;
  if (typeof populateCustomerSelect === 'function') {
    populateCustomerSelect();
    handled = true;
    if (eventName === 'customer-saved' && detail?.id) {
      const select = document.getElementById('docketCustomerSelect');
      if (select) {
        select.value = detail.id;
        select.dispatchEvent(new Event('change'));
      }
    }
  }
  if (typeof renderCatalog === 'function') {
    renderCatalog();
    handled = true;
  }
  if (typeof populateCategoryFilter === 'function') {
    populateCategoryFilter();
    handled = true;
  }
  if (typeof renderCustomersPage === 'function') {
    renderCustomersPage();
    handled = true;
  }
  if (typeof renderDaybookPage === 'function') {
    renderDaybookPage();
    handled = true;
  }
  if (typeof renderDashboard === 'function') {
    renderDashboard();
    handled = true;
  }
  if (typeof renderItemsTable === 'function') {
    renderItemsTable();
    handled = true;
  }
  if (typeof renderRecycleBin === 'function') {
    renderRecycleBin();
    handled = true;
  }
  if (typeof renderLocationsList === 'function') {
    renderLocationsList();
    handled = true;
  }

  // Cross-tab / Global dropdown sync
  const headerLocSelect = document.getElementById('sharedLocSelect');
  if (headerLocSelect && store?.data?.locations) {
    const curVal = headerLocSelect.value;
    headerLocSelect.innerHTML = store.data.locations.map(l =>
      `<option value="${l.id}" ${l.id === store.currentLocationId ? 'selected' : ''}>${l.name}</option>`
    ).join('');
    if (curVal) headerLocSelect.value = curVal;
  }

  if (!handled) {
    window.location.reload();
  }
}

// Multi-Tab Real-Time Storage Synchronization
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY && e.newValue) {
    try {
      store.data = JSON.parse(e.newValue);
      dispatchMandiEvent('storage-sync', store.data);
    } catch (err) {}
  }
});

function openModal(modalId) {
  document.getElementById(modalId)?.classList.remove('hidden');
}

function closeModal(modalId) {
  document.getElementById(modalId)?.classList.add('hidden');
}

function openGlobalRepaymentModal(preSelectedCustId = null) {
  const select = document.getElementById('modalRepayCustSelect');
  if (!select) return;

  const allCustomers = store.data.customers || [];
  const sorted = [...allCustomers].sort((a, b) => a.name.localeCompare(b.name));

  select.innerHTML = `
    <option value="">-- Select Customer / Party --</option>
    ${sorted.map(c => {
      const loc = store.data.locations.find(l => l.id === c.locationId);
      const locTag = loc ? ` [${loc.code || loc.name}]` : '';
      return `
        <option value="${c.id}" ${c.id === preSelectedCustId ? 'selected' : ''}>
          ${c.name} ${c.phone ? `(${c.phone})` : ''}${locTag}
        </option>
      `;
    }).join('')}
  `;

  document.getElementById('modalRepayAmount').value = '';
  document.getElementById('modalRepayNote').value = '';
  document.getElementById('modalRepayDate').value = store.currentDate;
  document.getElementById('globalRepayModal')?.classList.remove('hidden');

  if (preSelectedCustId) {
    select.value = preSelectedCustId;
    select.dispatchEvent(new Event('change'));
  } else {
    document.getElementById('modalRepayDuesBox')?.classList.add('hidden');
  }
}

function openGlobalCustomerModal() {
  const locSelect = document.getElementById('modalCustLoc');
  locSelect.innerHTML = store.data.locations.map(l => `
    <option value="${l.id}" ${l.id === store.currentLocationId ? 'selected' : ''}>${l.name}</option>
  `).join('');

  document.getElementById('modalCustName').value = '';
  document.getElementById('modalCustPhone').value = '';
  document.getElementById('modalCustOpening').value = '0';
  document.getElementById('globalCustomerModal')?.classList.remove('hidden');
}

function openGlobalItemModal() {
  document.getElementById('modalItemName').value = '';
  document.getElementById('modalItemCat').value = '';
  document.getElementById('modalItemRate').value = '';
  const datalist = document.getElementById('categoryDatalist');
  if (datalist && store?.data?.items) {
    const cats = Array.from(new Set(store.data.items.map(i => (i.category || '').trim()).filter(Boolean))).sort();
    datalist.innerHTML = cats.map(c => `<option value="${c}">`).join('');
  }
  document.getElementById('globalItemModal')?.classList.remove('hidden');
}

function openGlobalLocationModal() {
  document.getElementById('modalLocName').value = '';
  document.getElementById('modalLocCode').value = '';
  document.getElementById('globalLocationModal')?.classList.remove('hidden');
}

function showReceiptSlip(recordId) {
  let sale = store.data.sales.find(s => s.id === recordId);
  let payment = !sale ? store.data.payments.find(p => p.id === recordId) : null;

  if (!sale && !payment && Array.isArray(store.data.archivedYears)) {
    for (const y of store.data.archivedYears) {
      if (y.sales) {
        sale = y.sales.find(s => s.id === recordId);
        if (sale) break;
      }
      if (y.payments) {
        payment = y.payments.find(p => p.id === recordId);
        if (payment) break;
      }
    }
  }

  if (!sale && !payment) return;

  window.currentActiveReceiptRecord = {
    type: payment ? 'PAYMENT' : 'SALE',
    record: payment || sale
  };

  const modalTitle = document.getElementById('globalPrintModalTitle');
  if (modalTitle) {
    modalTitle.textContent = payment ? 'Payment Receipt Slip' : 'Receipt Slip';
  }

  const area = document.getElementById('globalReceiptArea');
  if (!area) return;

  if (payment) {
    const loc = store.data.locations.find(l => l.id === payment.locationId);
    const shop = store.data.shopProfile || {
      name: 'MANDI',
      subtitle: 'Payment Receipt',
      address: loc ? loc.name : 'Wholesale Market Yard',
      phone: ''
    };

    let duesHtml = '';
    if (payment.customerId) {
      const dues = store.getCustomerBalanceBreakdown(payment.customerId, payment.date);
      let netDueRow = `
        <div style="display:flex; justify-content:space-between; font-weight:800; border-top:1px dashed #000; margin-top:2px;">
          <span>Net Outstanding Due:</span>
          <span>${formatCurrency(dues.totalOverdue)}</span>
        </div>
      `;
      if (dues.advanceCredit > 0) {
        netDueRow = `
          <div style="display:flex; justify-content:space-between; font-weight:800; border-top:1px dashed #000; margin-top:2px;">
            <span>Advance Deposit (Jama):</span>
            <span>${formatCurrency(dues.advanceCredit)}</span>
          </div>
        `;
      }
      duesHtml = `
        <div class="receipt-dues-box" style="margin-top:8px;">
          <div style="font-weight:700; margin-bottom:2px;">CUSTOMER ACCOUNT BALANCE</div>
          <div style="display:flex; justify-content:space-between;">
            <span>Total Outstanding Due:</span>
            <span>${formatCurrency(dues.totalOverdue)}</span>
          </div>
          ${netDueRow}
        </div>
      `;
    }

    area.innerHTML = `
      <div class="receipt-header">
        <div class="receipt-store">${shop.name || 'MANDI'}</div>
        <div style="font-size:0.75rem;">${shop.address || (loc ? loc.name : 'Wholesale Market Yard')}</div>
        ${shop.phone ? `<div style="font-size:0.7rem; color:#444;">Ph: ${shop.phone}</div>` : ''}
        <div style="font-size:0.68rem; color:#555; margin-top:2px;">Payment Receipt (भुगतान रसीद)</div>
      </div>

      <div class="receipt-meta">
        <div><strong>Receipt #:</strong> ${payment.receiptNo}</div>
        <div><strong>Date:</strong> ${payment.date} ${payment.time || ''}</div>
      </div>
      <div class="receipt-meta">
        <div><strong>Customer:</strong> ${payment.customerName}</div>
        <div><strong>Mode:</strong> ${payment.paymentMode || 'CASH'}</div>
      </div>

      <div class="receipt-totals" style="margin-top:8px;">
        <div class="receipt-line grand" style="font-size:1.05rem;">
          <span>AMOUNT RECEIVED:</span>
          <span>${formatCurrency(payment.amount)}</span>
        </div>
      </div>

      ${duesHtml}

      ${payment.notes ? `<div style="font-size:0.7rem; margin-top:4px;">Note: ${payment.notes}</div>` : ''}

      <div style="text-align:center; margin-top:10px; font-size:0.65rem; border-top:1px dashed #000; padding-top:4px;">
        Thank you for your timely settlement
      </div>
    `;

    document.getElementById('globalPrintModal')?.classList.remove('hidden');
    return;
  }

  const loc = store.data.locations.find(l => l.id === sale.locationId);

  let duesHtml = '';
  if (sale.saleType === 'CREDIT' && sale.customerId) {
    const dues = store.getCustomerBalanceBreakdown(sale.customerId, sale.date);
    let netDueRow = `
      <div style="display:flex; justify-content:space-between; font-weight:800; border-top:1px dashed #000; margin-top:2px;">
        <span>Net Outstanding Due:</span>
        <span>${formatCurrency(dues.totalOverdue)}</span>
      </div>
    `;
    if (dues.advanceCredit > 0) {
      netDueRow = `
        <div style="display:flex; justify-content:space-between; font-weight:800; border-top:1px dashed #000; margin-top:2px;">
          <span>Advance Deposit (Jama):</span>
          <span>${formatCurrency(dues.advanceCredit)}</span>
        </div>
      `;
    }
    duesHtml = `
      <div class="receipt-dues-box">
        <div style="font-weight:700; margin-bottom:2px;">CUSTOMER ACCOUNT LEDGER</div>
        <div style="display:flex; justify-content:space-between;">
          <span>Past Overdue:</span>
          <span>${formatCurrency(dues.pastOverdue)}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>Today's Total Due:</span>
          <span>${formatCurrency(dues.todaysOverdue)}</span>
        </div>
        ${netDueRow}
      </div>
    `;
  }

  const shop = store.data.shopProfile || {
    name: 'MANDI',
    subtitle: 'Produce Slip',
    address: loc ? loc.name : 'Wholesale Market Yard',
    phone: ''
  };

  area.innerHTML = `
    <div class="receipt-header">
      <div class="receipt-store">${shop.name || 'MANDI'}</div>
      <div style="font-size:0.75rem;">${shop.address || (loc ? loc.name : 'Wholesale Market Yard')}</div>
      ${shop.phone ? `<div style="font-size:0.7rem; color:#444;">Ph: ${shop.phone}</div>` : ''}
      <div style="font-size:0.68rem; color:#555; margin-top:2px;">${shop.subtitle || 'Produce Slip'}</div>
    </div>

    <div class="receipt-meta">
      <div><strong>Slip #:</strong> ${sale.billNo}</div>
      <div><strong>Date:</strong> ${sale.date} ${sale.time || ''}</div>
    </div>
    <div class="receipt-meta">
      <div><strong>Buyer:</strong> ${sale.customerName}</div>
      <div><strong>Type:</strong> ${sale.saleType === 'DIRECT' ? 'Direct Cash' : 'Daily Credit'}</div>
    </div>

    <table class="receipt-table">
      <thead>
        <tr>
          <th>Produce</th>
          <th style="text-align:right;">Weight</th>
          <th style="text-align:right;">Rate</th>
          <th style="text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${sale.items.map(i => `
          <tr>
            <td>${i.itemName}</td>
            <td style="text-align:right;">${i.weight} ${i.unit}</td>
            <td style="text-align:right;">₹${i.rate}</td>
            <td style="text-align:right;">₹${i.lineTotal.toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="receipt-totals">
      <div class="receipt-line">
        <span>Items Subtotal:</span>
        <span>${formatCurrency(sale.grossSubtotal)}</span>
      </div>
      ${sale.roundOff !== 0 ? `
        <div class="receipt-line">
          <span>Round-Off (${sale.roundOff > 0 ? '+' : ''}${sale.roundOff.toFixed(2)}):</span>
          <span>${formatCurrency(sale.roundOff)}</span>
        </div>
      ` : ''}
      <div class="receipt-line grand">
        <span>TOTAL PAYABLE:</span>
        <span>${formatCurrency(sale.finalAmount)}</span>
      </div>
      <div class="receipt-line" style="font-weight:700;">
        <span>${sale.saleType === 'DIRECT' ? 'Cash Received Today:' : 'Balance to Repay at Night:'}</span>
        <span>${formatCurrency(sale.finalAmount)}</span>
      </div>
    </div>

    ${duesHtml}

    ${sale.notes ? `<div style="font-size:0.7rem; margin-top:4px;">Note: ${sale.notes}</div>` : ''}

    <div style="text-align:center; margin-top:10px; font-size:0.65rem; border-top:1px dashed #000; padding-top:4px;">
      Thank you for your business
    </div>
  `;

  // Pre-fill whatsapp phone input if available
  const waPhoneInput = document.getElementById('whatsappDirectPhone');
  if (waPhoneInput) {
    let p = '';
    if (sale && sale.customerId) {
      const cust = store.data.customers.find(c => c.id === sale.customerId);
      if (cust && cust.phone) p = cust.phone;
    } else if (payment && payment.customerId) {
      const cust = store.data.customers.find(c => c.id === payment.customerId);
      if (cust && cust.phone) p = cust.phone;
    }
    waPhoneInput.value = p || '';
  }

  document.getElementById('globalPrintModal')?.classList.remove('hidden');
}

// =============================================================================
// THERMAL PRINTING & WHATSAPP BILL DISPATCH ENGINE
// =============================================================================

function printThermalReceipt() {
  document.body.classList.add('printing-thermal-receipt');
  setTimeout(() => {
    window.print();
  }, 40);
}

window.addEventListener('beforeprint', () => {
  const modal = document.getElementById('globalPrintModal');
  if (modal && !modal.classList.contains('hidden')) {
    document.body.classList.add('printing-thermal-receipt');
  }
});

window.addEventListener('afterprint', () => {
  document.body.classList.remove('printing-thermal-receipt');
});

function sanitizeWhatsAppPhone(phone) {
  if (!phone) return '';
  let clean = String(phone).replace(/[^0-9]/g, '');
  if (clean.length === 10) {
    clean = '91' + clean;
  } else if (clean.length === 11 && clean.startsWith('0')) {
    clean = '91' + clean.slice(1);
  } else if (clean.length === 12 && clean.startsWith('91')) {
    // Already in 91XXXXXXXXXX format
  }
  return clean;
}

function generateWhatsAppReceiptText(record, type = 'SALE') {
  const shop = store.data.shopProfile || {
    name: 'MANDI',
    subtitle: 'Produce Slip',
    address: 'Wholesale Market Yard',
    phone: ''
  };

  const lines = [];
  lines.push(`*${(shop.name || 'MANDI').toUpperCase()}*`);
  if (shop.address) lines.push(shop.address);
  if (shop.phone) lines.push(`Ph: ${shop.phone}`);
  lines.push('--------------------------------');

  if (type === 'PAYMENT') {
    lines.push(`*PAYMENT RECEIPT (Bhooktan)*`);
    lines.push(`*Receipt #:* ${record.receiptNo}`);
    lines.push(`*Date:* ${record.date} ${record.time || ''}`);
    lines.push(`*Customer:* ${record.customerName || 'Party'}`);
    lines.push(`*Payment Mode:* ${record.paymentMode || 'CASH'}`);
    lines.push('--------------------------------');
    lines.push(`*AMOUNT RECEIVED: Rs ${Number(record.amount || 0).toFixed(2)}*`);

    if (record.customerId) {
      const dues = store.getCustomerBalanceBreakdown(record.customerId, record.date);
      lines.push('--------------------------------');
      lines.push('*ACCOUNT BALANCE*');
      if (dues.advanceCredit > 0) {
        lines.push(`Advance Deposit (Jama): Rs ${Number(dues.advanceCredit).toFixed(2)}`);
      } else {
        lines.push(`Net Outstanding Due: Rs ${Number(dues.totalOverdue).toFixed(2)}`);
      }
    }

    if (record.notes) {
      lines.push(`Note: ${record.notes}`);
    }
    lines.push('--------------------------------');
    lines.push('Thank you for your timely settlement.');
  } else {
    // SALE BILL
    lines.push(`*Slip #:* ${record.billNo}`);
    lines.push(`*Date:* ${record.date} ${record.time || ''}`);
    lines.push(`*Buyer:* ${record.customerName || 'Walk-in Cash'}`);
    lines.push(`*Type:* ${record.saleType === 'DIRECT' ? 'Direct Cash' : 'Daily Credit (Khata)'}`);
    lines.push('--------------------------------');
    lines.push('*ITEMS:*');
    (record.items || []).forEach((item, idx) => {
      lines.push(`${idx + 1}. *${item.itemName}* - ${item.weight} ${item.unit} @ Rs ${item.rate} = Rs ${Number(item.lineTotal).toFixed(2)}`);
    });
    lines.push('--------------------------------');
    lines.push(`Subtotal: Rs ${Number(record.grossSubtotal || 0).toFixed(2)}`);
    if (record.roundOff && record.roundOff !== 0) {
      lines.push(`Round-off: Rs ${record.roundOff > 0 ? '+' : ''}${Number(record.roundOff).toFixed(2)}`);
    }
    lines.push(`*TOTAL PAYABLE: Rs ${Number(record.finalAmount || 0).toFixed(2)}*`);
    lines.push(`${record.saleType === 'DIRECT' ? 'Cash Received Today:' : 'Balance to Repay at Night:'} Rs ${Number(record.finalAmount || 0).toFixed(2)}`);

    if (record.saleType === 'CREDIT' && record.customerId) {
      const dues = store.getCustomerBalanceBreakdown(record.customerId, record.date);
      lines.push('--------------------------------');
      lines.push('*CUSTOMER KHATA BALANCE*');
      lines.push(`Past Overdue: Rs ${Number(dues.pastOverdue).toFixed(2)}`);
      lines.push(`Today Credit: Rs ${Number(dues.todaysOverdue).toFixed(2)}`);
      if (dues.advanceCredit > 0) {
        lines.push(`Advance Deposit (Jama): Rs ${Number(dues.advanceCredit).toFixed(2)}`);
      } else {
        lines.push(`*Net Outstanding: Rs ${Number(dues.totalOverdue).toFixed(2)}*`);
      }
    }

    if (record.notes) {
      lines.push(`Note: ${record.notes}`);
    }
    lines.push('--------------------------------');
    lines.push('Thank you for your business!');
  }

  return lines.join('\n');
}

function openWhatsAppChat(cleanPhone, text) {
  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const encodedText = encodeURIComponent(text);

  let targetUrl = '';
  if (cleanPhone) {
    targetUrl = isMobile
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`
      : `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
  } else {
    targetUrl = isMobile
      ? `https://api.whatsapp.com/send?text=${encodedText}`
      : `https://web.whatsapp.com/send?text=${encodedText}`;
  }

  // Attempt window.open first
  const win = window.open(targetUrl, '_blank');
  // Fallback if popup was blocked by browser
  if (!win || win.closed || typeof win.closed === 'undefined') {
    const link = document.createElement('a');
    link.href = targetUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

function shareCurrentReceiptViaWhatsApp() {
  if (!window.currentActiveReceiptRecord || !window.currentActiveReceiptRecord.record) {
    alert('No active receipt record found to share.');
    return;
  }
  const { record, type } = window.currentActiveReceiptRecord;
  const text = generateWhatsAppReceiptText(record, type);

  // 1. Check direct input field in modal
  const inputEl = document.getElementById('whatsappDirectPhone');
  let phone = inputEl ? inputEl.value.trim() : '';

  // 2. Fall back to record's customer phone
  if (!phone) {
    if (record.customerId) {
      const cust = (store.data.customers || []).find(c => c.id === record.customerId);
      if (cust && cust.phone) phone = cust.phone;
    } else if (record.customerPhone) {
      phone = record.customerPhone;
    }
  }

  // 3. If still empty, prompt as optional (can still be left blank to pick from contacts)
  let cleanPhone = sanitizeWhatsAppPhone(phone);
  if (!cleanPhone && (!inputEl || !inputEl.value.trim())) {
    const promptInput = prompt('Enter 10-digit customer mobile number for WhatsApp (leave blank to choose contact inside WhatsApp):', '');
    if (promptInput === null) return; // User cancelled
    if (promptInput.trim()) {
      cleanPhone = sanitizeWhatsAppPhone(promptInput.trim());
      if (inputEl) inputEl.value = promptInput.trim();
    }
  }

  openWhatsAppChat(cleanPhone, text);
}

function generateWhatsAppStatementText(custId, period = '1M') {
  const cust = (store.data.customers || []).find(c => c.id === custId);
  if (!cust) return '';

  const shop = store.data.shopProfile || {
    name: 'MANDI',
    subtitle: 'Khata Statement',
    address: 'Wholesale Market Yard',
    phone: ''
  };

  const p = store.getCustomerPeriodBreakdown(custId, period, store.currentDate);
  const loc = store.data.locations.find(l => l.id === cust.locationId);
  const locTag = loc ? ` [${loc.code || loc.name}]` : '';

  const lines = [];
  lines.push(`*${(shop.name || 'MANDI').toUpperCase()}*`);
  if (shop.address) lines.push(shop.address);
  if (shop.phone) lines.push(`Ph: ${shop.phone}`);
  lines.push('--------------------------------');
  lines.push(`*KHATA STATEMENT (Bahi Khata)*`);
  lines.push(`*Customer:* ${cust.name}${locTag}`);
  if (cust.phone) lines.push(`*Phone:* ${cust.phone}`);
  lines.push(`*Period:* ${p.startDate} to ${p.endDate}`);
  lines.push('--------------------------------');
  lines.push(`Opening Balance: Rs ${Number(p.openingDue).toFixed(2)}`);
  lines.push(`Period Purchases: Rs ${Number(p.periodCredit).toFixed(2)}`);
  lines.push(`Period Repaid: Rs ${Number(p.periodRepaid).toFixed(2)}`);
  lines.push('--------------------------------');
  if (p.currentBalance < 0) {
    lines.push(`*Advance Deposit (Jama): Rs ${Math.abs(Number(p.currentBalance)).toFixed(2)}*`);
  } else {
    lines.push(`*NET OUTSTANDING DUE: Rs ${Number(p.currentBalance).toFixed(2)}*`);
  }
  lines.push('--------------------------------');
  lines.push('Please review and settle your account. Thank you!');

  return lines.join('\n');
}

function shareCustomerStatementViaWhatsApp(custId, period = '1M') {
  const cust = (store.data.customers || []).find(c => c.id === custId);
  if (!cust) return;

  const text = generateWhatsAppStatementText(custId, period);
  let cleanPhone = sanitizeWhatsAppPhone(cust.phone);

  if (!cleanPhone) {
    const promptInput = prompt('Enter 10-digit customer mobile number for WhatsApp (leave blank to choose contact inside WhatsApp):', '');
    if (promptInput === null) return;
    if (promptInput.trim()) {
      cleanPhone = sanitizeWhatsAppPhone(promptInput.trim());
    }
  }

  openWhatsAppChat(cleanPhone, text);
}

// =============================================================================
// DYNAMIC DAILY SHOP CHECKLIST LOGIC
// =============================================================================
const DYNAMIC_CHECKLIST_KEY = 'MANDI_DYNAMIC_CHECKLIST';

const DEFAULT_SOP_CHECKLIST = [
  { id: 'chk-1', phase: 'Morning Opening', text: 'Verify correct date and active mandi shed are selected.', done: false },
  { id: 'chk-2', phase: 'Morning Opening', text: 'Review today auction rates and update price board in Rates tab.', done: false },
  { id: 'chk-3', phase: 'Daytime Rush', text: 'Direct Cash: Ring up produce, enter weight, and issue thermal receipt.', done: false },
  { id: 'chk-4', phase: 'Daytime Rush', text: 'Daily Credit (Khata): Select buyer, check past overdue warning, and bill crates.', done: false },
  { id: 'chk-5', phase: 'Daytime Rush', text: 'Use Round-Off input on bill docket for bargaining discount adjustments.', done: false },
  { id: 'chk-6', phase: 'Night Closing', text: 'Collect evening farmer/buyer payments via Receive Payment modal.', done: false },
  { id: 'chk-7', phase: 'Night Closing', text: 'Review customer statement balances and carryover dues in Customers ledger.', done: false },
  { id: 'chk-8', phase: 'Night Closing', text: 'Match drawer cash against Daybook cash inflow and export CSV.', done: false }
];

function getDynamicChecklist() {
  try {
    const raw = localStorage.getItem(DYNAMIC_CHECKLIST_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) return list;
    }
  } catch (e) {
    console.error('Error loading dynamic checklist:', e);
  }
  saveDynamicChecklist(DEFAULT_SOP_CHECKLIST);
  return JSON.parse(JSON.stringify(DEFAULT_SOP_CHECKLIST));
}

function saveDynamicChecklist(list) {
  try {
    localStorage.setItem(DYNAMIC_CHECKLIST_KEY, JSON.stringify(list));
    dispatchMandiEvent('checklist-updated', list);
  } catch (e) {
    console.error('Error saving checklist:', e);
  }
}

function addChecklistItem(text, phase = 'Morning Opening') {
  if (!text || !text.trim()) return;
  const list = getDynamicChecklist();
  const newItem = {
    id: 'chk-' + Date.now(),
    phase: phase.trim(),
    text: text.trim(),
    done: false
  };
  list.push(newItem);
  saveDynamicChecklist(list);
  return list;
}

function deleteChecklistItem(id) {
  let list = getDynamicChecklist();
  list = list.filter(item => item.id !== id);
  saveDynamicChecklist(list);
  return list;
}

function toggleChecklistItem(id, done) {
  const list = getDynamicChecklist();
  const item = list.find(i => i.id === id);
  if (item) {
    item.done = done;
    saveDynamicChecklist(list);
  }
  return list;
}

function resetDailyChecklist() {
  const list = getDynamicChecklist();
  list.forEach(item => item.done = false);
  saveDynamicChecklist(list);
  return list;
}

function restoreDefaultChecklist() {
  saveDynamicChecklist(DEFAULT_SOP_CHECKLIST);
  return JSON.parse(JSON.stringify(DEFAULT_SOP_CHECKLIST));
}

// =============================================================================
// EXCEL & CSV DATA PORTABILITY (EXPORT & IMPORT)
// =============================================================================
function triggerCsvDownload(filename, csvContent) {
  // UTF-8 BOM (\uFEFF) ensures Microsoft Excel on Windows & mobile opens Indian scripts & text correctly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportCustomersCsv() {
  let csv = "Customer ID,Party Name,Phone Number,Location Name,Opening Past Due,Current Net Due,Advance Jama Credit,Status\n";
  store.data.customers.forEach(c => {
    const loc = store.data.locations.find(l => l.id === c.locationId);
    const locName = loc ? loc.name : 'All';
    const bal = store.getCustomerBalanceBreakdown(c.id, store.currentDate);
    let status = 'CLEARED';
    if (bal.totalOverdue > 0) status = 'DEBTOR';
    else if (bal.advanceCredit > 0) status = 'ADVANCE (JAMA)';
    const cleanName = (c.name || '').replace(/"/g, '""');
    const cleanPhone = (c.phone || '').replace(/"/g, '""');
    csv += `"${c.id}","${cleanName}","${cleanPhone}","${locName}",${c.openingPastDue || 0},${bal.totalOverdue || 0},${bal.advanceCredit || 0},"${status}"\n`;
  });
  triggerCsvDownload(`Mandi_Customers_${store.currentDate}.csv`, csv);
}

function exportItemsCsv() {
  let csv = "Item ID,Produce Name,Category,Unit,Wholesale Rate (INR)\n";
  store.data.items.forEach(i => {
    const cleanName = (i.name || '').replace(/"/g, '""');
    const cleanCat = (i.category || 'General').replace(/"/g, '""');
    csv += `"${i.id}","${cleanName}","${cleanCat}","${i.unit || 'kg'}",${i.defaultRate || 0}\n`;
  });
  triggerCsvDownload(`Mandi_Produce_Rates_${store.currentDate}.csv`, csv);
}

function exportSalesCsv() {
  let csv = "Bill No,Date,Time,Location,Sale Type,Buyer Name,Produce Items,Gross Total,Round Off,Final Payable,Cash Received,Notes\n";
  store.data.sales.forEach(s => {
    const loc = store.data.locations.find(l => l.id === s.locationId);
    const locName = loc ? loc.name : 'Main Yard';
    const itemsSummary = (s.items || []).map(i => `${i.itemName} (${i.weight}${i.unit}@${i.rate})`).join('; ').replace(/"/g, '""');
    const buyerName = (s.customerName || 'Walk-in Cash Buyer').replace(/"/g, '""');
    const notes = (s.notes || '').replace(/"/g, '""');
    csv += `"${s.billNo}","${s.date}","${s.time || ''}","${locName}","${s.saleType}","${buyerName}","${itemsSummary}",${s.grossSubtotal || 0},${s.roundOff || 0},${s.finalAmount || 0},${s.paidToday || 0},"${notes}"\n`;
  });
  triggerCsvDownload(`Mandi_Sales_Register_${store.currentDate}.csv`, csv);
}

function exportPaymentsCsv() {
  let csv = "Receipt No,Date,Time,Location,Customer Name,Amount (INR),Payment Mode,Notes\n";
  (store.data.payments || []).forEach(p => {
    const loc = store.data.locations.find(l => l.id === p.locationId);
    const locName = loc ? loc.name : 'Main Yard';
    const cleanCust = (p.customerName || 'Customer').replace(/"/g, '""');
    const cleanNotes = (p.notes || '').replace(/"/g, '""');
    csv += `"${p.receiptNo || ''}","${p.date}","${p.time || ''}","${locName}","${cleanCust}",${p.amount || 0},"${p.paymentMode || 'CASH'}","${cleanNotes}"\n`;
  });
  triggerCsvDownload(`Mandi_Payment_Receipts_${store.currentDate}.csv`, csv);
}

function downloadCustomerTemplateCsv() {
  let csv = "Party Name,Phone Number,Opening Due (INR)\n";
  csv += '"Ramesh Sabzi Bhandar","9845012345",3500.00\n';
  csv += '"Suresh Fruit Stall","9811223344",1800.00\n';
  csv += '"Anand Hotel Supplies","9900887766",0.00\n';
  triggerCsvDownload('mandi_customer_import_template.csv', csv);
}

function downloadItemTemplateCsv() {
  let csv = "Produce Name,Category,Unit,Wholesale Rate (INR)\n";
  csv += '"Red Tomato (Hybrid)","Vegetables","kg",35.00\n';
  csv += '"Nashik Red Onion","Vegetables","kg",28.50\n';
  csv += '"Shimla Apple","Fruits","box",1200.00\n';
  csv += '"Wheat Sharbati","Grains","bag",2350.00\n';
  triggerCsvDownload('mandi_produce_rates_template.csv', csv);
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const parseLine = (line) => {
    const row = [];
    let insideQuote = false;
    let entry = '';
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (insideQuote && line[i + 1] === '"') {
          entry += '"';
          i++;
        } else {
          insideQuote = !insideQuote;
        }
      } else if (c === ',' && !insideQuote) {
        row.push(entry.trim());
        entry = '';
      } else {
        entry += c;
      }
    }
    row.push(entry.trim());
    return row;
  };

  const headers = parseLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] !== undefined ? values[idx] : '';
    });
    rows.push(obj);
  }
  return rows;
}

function importCustomersFromCsv(csvText) {
  const rows = parseCsv(csvText);
  if (rows.length === 0) return { success: false, message: 'No valid data rows found in CSV' };

  let added = 0;
  let updated = 0;

  rows.forEach(r => {
    const name = r.partyname || r.customername || r.name || r.party || r.customer;
    if (!name) return;

    const phone = r.phonenumber || r.phone || r.mobile || r.contact || '';
    const openingDueRaw = r.openingdueinr || r.openingdue || r.openingpastdue || r.due || r.balance || '0';
    const opening = parseFloat(openingDueRaw) || 0;

    const existing = store.data.customers.find(c => 
      (phone && c.phone && c.phone === phone) || 
      (c.name.trim().toLowerCase() === name.trim().toLowerCase())
    );

    if (existing) {
      if (opening > 0 && (!existing.openingPastDue || existing.openingPastDue === 0)) {
        existing.openingPastDue = opening;
        updated++;
      }
      if (phone && !existing.phone) existing.phone = phone;
    } else {
      store.data.customers.push({
        id: 'cust-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        name: name.trim(),
        phone: phone.trim(),
        locationId: store.currentLocationId,
        openingPastDue: opening
      });
      added++;
    }
  });

  store.save(store.data);
  dispatchMandiEvent('customer-saved', null);
  return { success: true, added, updated, total: rows.length };
}

function importItemsFromCsv(csvText) {
  const rows = parseCsv(csvText);
  if (rows.length === 0) return { success: false, message: 'No valid data rows found in CSV' };

  let added = 0;
  let updated = 0;

  rows.forEach(r => {
    const name = r.producename || r.itemname || r.name || r.item || r.produce;
    if (!name) return;

    const category = r.category || 'General';
    const unit = r.unit || 'kg';
    const rateRaw = r.wholesalerateinr || r.wholesalerate || r.defaultrate || r.rate || '0';
    const rate = parseFloat(rateRaw) || 0;

    const existing = store.data.items.find(i => i.name.trim().toLowerCase() === name.trim().toLowerCase());
    if (existing) {
      existing.defaultRate = rate;
      if (category) existing.category = category;
      if (unit) existing.unit = unit;
      updated++;
    } else {
      store.data.items.push({
        id: 'itm-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        name: name.trim(),
        category: category.trim(),
        unit: unit.trim(),
        defaultRate: rate
      });
      added++;
    }
  });

  store.save(store.data);
  dispatchMandiEvent('item-saved', null);
  return { success: true, added, updated, total: rows.length };
}

// ============================================================================
// GOOGLE SHEETS & CLOUD SYNC CONTROLLER (ONE SPREADSHEET PER YEAR)
// ============================================================================

function getCloudConfig() {
  if (!store.data.cloudConfig) {
    store.data.cloudConfig = {
      scriptUrl: '',
      activeYear: '2026_27',
      autoSync: true,
      lastSync: null,
      activeSpreadsheetName: 'Mandi_Ledger_2026_27',
      activeSpreadsheetUrl: '',
      stats: {
        salesRowsUsed: (store.data.sales || []).length,
        salesRowsLimit: 50000,
        rowsRemaining: Math.max(0, 50000 - (store.data.sales || []).length),
        percentUsed: Math.min(100, Math.round(((store.data.sales || []).length / 50000) * 100)),
        isWarning: (50000 - (store.data.sales || []).length) <= 5000
      }
    };
  }
  return store.data.cloudConfig;
}

function saveCloudConfig(cfg) {
  store.data.cloudConfig = cfg;
  store.save(store.data);
}

// Test connection to Google Apps Script Web App
async function testGoogleSheetsConnection(url) {
  const targetUrl = (url || getCloudConfig().scriptUrl || '').trim();
  if (!targetUrl) return { success: false, message: 'Please provide a valid Google Apps Script Web App URL.' };

  try {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'PING' })
    });
    const data = await res.json();
    if (data.status === 'success') {
      const cfg = getCloudConfig();
      cfg.scriptUrl = targetUrl;
      if (data.spreadsheetName) cfg.activeSpreadsheetName = data.spreadsheetName;
      if (data.stats) cfg.stats = data.stats;
      cfg.lastSync = new Date().toISOString();
      saveCloudConfig(cfg);
      return { success: true, data };
    }
    return { success: false, message: data.message || 'Invalid response from Google Sheets.' };
  } catch (err) {
    return { success: false, message: 'Could not connect to Google Apps Script: ' + err.message };
  }
}

// Fetch capacity statistics
async function fetchGoogleSheetsCapacity() {
  const cfg = getCloudConfig();
  const localSalesCount = (store.data.sales || []).length;
  const localRemaining = Math.max(0, 50000 - localSalesCount);

  if (!cfg.scriptUrl) {
    return {
      salesRowsUsed: localSalesCount,
      salesRowsLimit: 50000,
      rowsRemaining: localRemaining,
      percentUsed: Math.min(100, Math.round((localSalesCount / 50000) * 100)),
      isWarning: localRemaining <= 5000,
      isLocal: true
    };
  }

  try {
    const res = await fetch(cfg.scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'GET_CAPACITY' })
    });
    const data = await res.json();
    if (data.status === 'success' && data.stats) {
      cfg.stats = data.stats;
      saveCloudConfig(cfg);
      return data.stats;
    }
  } catch (e) {
    console.warn('Could not fetch cloud capacity, using local cache:', e);
  }
  return cfg.stats;
}

// Calculate annual rollover preview (customer balances & dues to migrate)
function getRolloverPreviewData() {
  const customers = store.data.customers || [];
  let totalParties = customers.length;
  let totalOutstandingDues = 0;
  let partiesWithDues = 0;

  const migratedList = customers.map(c => {
    const bal = store.getCustomerBalanceBreakdown(c.id);
    const netDue = Number(bal.totalOverdue) || 0;
    if (netDue > 0) {
      partiesWithDues++;
      totalOutstandingDues += netDue;
    }
    return {
      id: c.id,
      name: c.name,
      phone: c.phone || '',
      locationId: c.locationId || 'loc-1',
      openingPastDue: c.openingPastDue || 0,
      closingDue: netDue
    };
  });

  return {
    totalParties,
    partiesWithDues,
    totalOutstandingDues,
    migratedList
  };
}

// Execute Financial Year Rollover (Salana Khata Bandi)
async function executeAnnualRollover(targetYear) {
  const cfg = getCloudConfig();
  const preview = getRolloverPreviewData();
  const prevYearKey = cfg.activeYear || '2026_27';
  const currentSales = store.data.sales || [];
  const currentPayments = store.data.payments || [];

  const archiveRecord = {
    yearId: prevYearKey,
    yearLabel: `FY ${prevYearKey.replace('_', '-')}`,
    closedDate: getTodayDateString(),
    spreadsheetName: `[ARCHIVED] ${cfg.activeSpreadsheetName || 'Mandi_Ledger_' + prevYearKey}`,
    spreadsheetUrl: cfg.activeSpreadsheetUrl || '',
    salesCount: currentSales.length,
    salesTurnover: currentSales.reduce((sum, s) => sum + (Number(s.finalAmount) || 0), 0),
    paymentsCount: currentPayments.length,
    paymentsCollected: currentPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0),
    carriedDues: preview.totalOutstandingDues,
    sales: [...currentSales],
    payments: [...currentPayments]
  };

  if (!cfg.scriptUrl) {
    // Local-only rollover mode (offline)
    preview.migratedList.forEach(m => {
      const cust = store.data.customers.find(c => c.id === m.id);
      if (cust) {
        cust.openingPastDue = m.closingDue;
      }
    });

    if (!Array.isArray(store.data.archivedYears)) store.data.archivedYears = [];
    store.data.archivedYears = store.data.archivedYears.filter(y => y.yearId !== prevYearKey);
    store.data.archivedYears.unshift(archiveRecord);

    store.data.sales = [];
    store.data.payments = [];
    cfg.activeYear = targetYear;
    cfg.activeSpreadsheetName = `Mandi_Ledger_${targetYear}`;
    saveCloudConfig(cfg);
    store.save(store.data);
    dispatchMandiEvent('annual-rollover-completed', { targetYear, prevYearKey });

    return {
      success: true,
      isLocal: true,
      migratedCount: preview.totalParties,
      totalDues: preview.totalOutstandingDues,
      newSpreadsheetName: `Mandi_Ledger_${targetYear}`
    };
  }

  try {
    const res = await fetch(cfg.scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'ROLLOVER_FINANCIAL_YEAR',
        targetYear: targetYear,
        customersWithBalances: preview.migratedList,
        items: store.data.items,
        shopProfile: store.data.shopProfile,
        locations: store.data.locations
      })
    });
    const data = await res.json();
    if (data.status === 'success') {
      // Update local customers opening dues to match migrated closing dues
      preview.migratedList.forEach(m => {
        const cust = store.data.customers.find(c => c.id === m.id);
        if (cust) {
          cust.openingPastDue = m.closingDue;
        }
      });

      if (data.oldSpreadsheetName) archiveRecord.spreadsheetName = data.oldSpreadsheetName;
      if (data.oldSpreadsheetUrl) archiveRecord.spreadsheetUrl = data.oldSpreadsheetUrl;

      if (!Array.isArray(store.data.archivedYears)) store.data.archivedYears = [];
      store.data.archivedYears = store.data.archivedYears.filter(y => y.yearId !== prevYearKey);
      store.data.archivedYears.unshift(archiveRecord);

      store.data.sales = [];
      store.data.payments = [];
      cfg.activeYear = targetYear;
      if (data.newSpreadsheetName) cfg.activeSpreadsheetName = data.newSpreadsheetName;
      if (data.newSpreadsheetUrl) cfg.activeSpreadsheetUrl = data.newSpreadsheetUrl;
      cfg.lastSync = new Date().toISOString();
      saveCloudConfig(cfg);
      store.save(store.data);
      dispatchMandiEvent('annual-rollover-completed', { targetYear, prevYearKey });

      return {
        success: true,
        data: data,
        migratedCount: preview.totalParties,
        totalDues: preview.totalOutstandingDues,
        newSpreadsheetUrl: data.newSpreadsheetUrl,
        newSpreadsheetName: data.newSpreadsheetName
      };
    } else {
      return { success: false, message: data.message || 'Rollover failed on Google Sheets.' };
    }
  } catch (err) {
    return { success: false, message: 'Network error executing rollover: ' + err.message };
  }
}

function exportArchivedYearCsv(yearId) {
  const archive = (store.data.archivedYears || []).find(y => y.yearId === yearId);
  if (!archive) {
    alert('Archived financial year not found!');
    return;
  }
  let csv = "Record Type,Ref / Bill No,Date,Time,Location,Party Name,Produce Items / Details,Final Amount (INR),Payment Mode,Notes\n";
  (archive.sales || []).forEach(s => {
    const loc = store.data.locations.find(l => l.id === s.locationId);
    const locName = loc ? loc.name : 'Main Yard';
    const itemsSummary = (s.items || []).map(i => `${i.itemName} (${i.weight}${i.unit}@${i.rate})`).join('; ').replace(/"/g, '""');
    const buyerName = (s.customerName || 'Walk-in Cash Buyer').replace(/"/g, '""');
    const notes = (s.notes || '').replace(/"/g, '""');
    csv += `"BILL","${s.billNo}","${s.date}","${s.time || ''}","${locName}","${buyerName}","${itemsSummary}",${s.finalAmount || 0},"${s.saleType}","${notes}"\n`;
  });
  (archive.payments || []).forEach(p => {
    const loc = store.data.locations.find(l => l.id === p.locationId);
    const locName = loc ? loc.name : 'Main Yard';
    const cleanCust = (p.customerName || 'Customer').replace(/"/g, '""');
    const cleanNotes = (p.notes || '').replace(/"/g, '""');
    csv += `"PAYMENT","${p.receiptNo || ''}","${p.date}","${p.time || ''}","${locName}","${cleanCust}","Khata Repayment",${p.amount || 0},"${p.paymentMode || 'CASH'}","${cleanNotes}"\n`;
  });
  triggerCsvDownload(`Mandi_Archive_${archive.yearId}.csv`, csv);
}

function exportArchivedYearJson(yearId) {
  const archive = (store.data.archivedYears || []).find(y => y.yearId === yearId);
  if (!archive) return;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(archive, null, 2));
  const dl = document.createElement('a');
  dl.setAttribute("href", dataStr);
  dl.setAttribute("download", `mandi_archive_${archive.yearId}.json`);
  document.body.appendChild(dl);
  dl.click();
  dl.remove();
}

// =============================================================================
// OFFLINE SYNC QUEUE & BACKGROUND CLOUD RECONCILIATION
// =============================================================================
function queueSyncItem(type, data) {
  if (!Array.isArray(store.data.syncQueue)) store.data.syncQueue = [];
  const itemKey = data.id || data.refNo || (type + '-' + Date.now());
  const exists = store.data.syncQueue.some(q => q.type === type && (q.id === itemKey || (q.data && (q.data.id === itemKey || q.data.refNo === itemKey))));
  if (!exists) {
    store.data.syncQueue.push({
      type,
      id: itemKey,
      data,
      queuedAt: new Date().toISOString(),
      attempts: 0
    });
    store.save(store.data);
  }
  updateSyncPillUI();
  dispatchMandiEvent('sync-queue-updated', { count: store.data.syncQueue.length });
}

function syncBillToCloudAsync(bill) {
  const cfg = getCloudConfig();
  if (!cfg.scriptUrl || !cfg.autoSync) return;
  if (!navigator.onLine) {
    queueSyncItem('BILL', bill);
    return;
  }

  fetch(cfg.scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'SYNC_BILL', bill: bill })
  }).then(res => res.json()).then(resData => {
    if (resData && resData.status === 'success') {
      cfg.lastSync = new Date().toISOString();
      saveCloudConfig(cfg);
      // Remove from queue if it was queued
      if (Array.isArray(store.data.syncQueue)) {
        store.data.syncQueue = store.data.syncQueue.filter(q => !(q.type === 'BILL' && q.data.id === bill.id));
        store.save(store.data);
      }
      updateSyncPillUI();
    } else {
      queueSyncItem('BILL', bill);
    }
  }).catch(e => {
    console.warn('Background bill sync queued offline:', e);
    queueSyncItem('BILL', bill);
  });
}

function syncPaymentToCloudAsync(payment) {
  const cfg = getCloudConfig();
  if (!cfg.scriptUrl || !cfg.autoSync) return;
  if (!navigator.onLine) {
    queueSyncItem('PAYMENT', payment);
    return;
  }

  fetch(cfg.scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'SYNC_PAYMENT', payment: payment })
  }).then(res => res.json()).then(resData => {
    if (resData && resData.status === 'success') {
      cfg.lastSync = new Date().toISOString();
      saveCloudConfig(cfg);
      if (Array.isArray(store.data.syncQueue)) {
        store.data.syncQueue = store.data.syncQueue.filter(q => !(q.type === 'PAYMENT' && q.data.id === payment.id));
        store.save(store.data);
      }
      updateSyncPillUI();
    } else {
      queueSyncItem('PAYMENT', payment);
    }
  }).catch(e => {
    console.warn('Background payment sync queued offline:', e);
    queueSyncItem('PAYMENT', payment);
  });
}

function syncTransactionStatusToCloudAsync(payload) {
  const cfg = getCloudConfig();
  if (!cfg.scriptUrl || !cfg.autoSync) return;
  if (!navigator.onLine) {
    queueSyncItem('STATUS_UPDATE', payload);
    return;
  }

  fetch(cfg.scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'UPDATE_STATUS', ...payload })
  }).then(res => res.json()).then(resData => {
    if (resData && resData.status === 'success') {
      cfg.lastSync = new Date().toISOString();
      saveCloudConfig(cfg);
      if (Array.isArray(store.data.syncQueue)) {
        store.data.syncQueue = store.data.syncQueue.filter(q => !(q.type === 'STATUS_UPDATE' && (q.id === payload.refNo || (q.data && q.data.refNo === payload.refNo))));
        store.save(store.data);
      }
      updateSyncPillUI();
    } else {
      queueSyncItem('STATUS_UPDATE', payload);
    }
  }).catch(e => {
    console.warn('Background status sync queued offline:', e);
    queueSyncItem('STATUS_UPDATE', payload);
  });
}
window.syncTransactionStatusToCloudAsync = syncTransactionStatusToCloudAsync;

let isFlushingSync = false;
async function flushSyncQueue() {
  if (isFlushingSync) return;
  const cfg = getCloudConfig();
  const queue = store.data.syncQueue || [];

  if (!cfg.scriptUrl || queue.length === 0) {
    updateSyncPillUI();
    return;
  }
  if (!navigator.onLine) {
    updateSyncPillUI();
    return;
  }

  isFlushingSync = true;
  updateSyncPillUI('syncing');

  const remainingQueue = [];
  for (const item of queue) {
    try {
      let actionName = 'SYNC_BILL';
      let payload = {};
      if (item.type === 'BILL') {
        actionName = 'SYNC_BILL';
        payload = { action: 'SYNC_BILL', bill: item.data };
      } else if (item.type === 'PAYMENT') {
        actionName = 'SYNC_PAYMENT';
        payload = { action: 'SYNC_PAYMENT', payment: item.data };
      } else if (item.type === 'STATUS_UPDATE') {
        actionName = 'UPDATE_STATUS';
        payload = { action: 'UPDATE_STATUS', ...item.data };
      }

      const res = await fetch(cfg.scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data || data.status !== 'success') {
        item.attempts = (item.attempts || 0) + 1;
        remainingQueue.push(item);
      }
    } catch (err) {
      item.attempts = (item.attempts || 0) + 1;
      remainingQueue.push(item);
      // Connection lost mid-flush, break out cleanly
      break;
    }
  }

  store.data.syncQueue = remainingQueue;
  if (remainingQueue.length === 0) {
    cfg.lastSync = new Date().toISOString();
    saveCloudConfig(cfg);
  }
  store.save(store.data);
  isFlushingSync = false;
  updateSyncPillUI();
  dispatchMandiEvent('sync-queue-updated', { remaining: remainingQueue.length });
}
window.flushSyncQueue = flushSyncQueue;

function updateSyncPillUI(forcedState = null) {
  const pill = document.getElementById('sharedSyncPill');
  if (!pill) return;
  const cfg = getCloudConfig();
  const queueCount = (store.data.syncQueue || []).length;
  const isOnline = navigator.onLine;

  if (forcedState === 'syncing') {
    pill.className = 'sync-pill sync-pill-syncing';
    pill.innerHTML = `<span class="sync-pill-dot"></span><span class="sync-pill-text">Syncing (${queueCount})...</span><span class="sync-pill-mobile-text">${queueCount}</span>`;
    pill.title = 'Uploading queued records to Google Sheets...';
    return;
  }

  if (!cfg.scriptUrl) {
    pill.className = 'sync-pill sync-pill-local';
    pill.innerHTML = `<span class="sync-pill-dot"></span><span class="sync-pill-text">Offline Local</span><span class="sync-pill-mobile-text">Local</span>`;
    pill.title = 'Offline Local Storage (Google Sheets not connected)';
  } else if (!isOnline) {
    pill.className = 'sync-pill sync-pill-offline';
    pill.innerHTML = `<span class="sync-pill-dot"></span><span class="sync-pill-text">Offline (${queueCount})</span><span class="sync-pill-mobile-text">${queueCount}</span>`;
    pill.title = `No Internet. ${queueCount} record${queueCount === 1 ? '' : 's'} queued for cloud upload.`;
  } else if (queueCount > 0) {
    pill.className = 'sync-pill sync-pill-pending';
    pill.innerHTML = `<span class="sync-pill-dot"></span><span class="sync-pill-text">${queueCount} Queued</span><span class="sync-pill-mobile-text">${queueCount}</span>`;
    pill.title = `${queueCount} pending entries. Click to sync now.`;
  } else {
    pill.className = 'sync-pill sync-pill-synced';
    pill.innerHTML = `<span class="sync-pill-dot"></span><span class="sync-pill-text">Synced</span><span class="sync-pill-mobile-text">Sync</span>`;
    pill.title = `Cloud synchronized. Last sync: ${cfg.lastSync ? new Date(cfg.lastSync).toLocaleTimeString() : 'Recent'}`;
  }
}
window.updateSyncPillUI = updateSyncPillUI;

function handleSyncPillClick() {
  const cfg = getCloudConfig();
  const queueCount = (store.data.syncQueue || []).length;

  if (!cfg.scriptUrl) {
    alert('Google Sheets cloud sync is currently in local offline mode. To enable automatic cloud backups, enter your Web App URL in Settings -> Google Sheets tab.');
    return;
  }
  if (!navigator.onLine) {
    alert(`Device is currently offline. ${queueCount} transaction(s) safely preserved in device memory. They will upload automatically when internet reconnects.`);
    return;
  }
  if (queueCount > 0) {
    flushSyncQueue();
  } else {
    alert(`All transactions are in sync with Google Sheets.\nActive Sheet: ${cfg.activeSpreadsheetName || 'Mandi Ledger'}\nLast sync: ${cfg.lastSync ? new Date(cfg.lastSync).toLocaleString() : 'Recent'}`);
  }
}
window.handleSyncPillClick = handleSyncPillClick;

// Auto-flush listeners
window.addEventListener('online', () => {
  updateSyncPillUI();
  flushSyncQueue();
});
window.addEventListener('offline', () => {
  updateSyncPillUI();
});

// Auto-flush attempt on startup
if (navigator.onLine) {
  setTimeout(() => {
    if ((store.data.syncQueue || []).length > 0) {
      flushSyncQueue();
    }
  }, 1000);
}

// =============================================================================
// OWNER PIN & ROLE LOCK CONTROLLER
// =============================================================================
let currentPinCallback = null;
let currentPinCancelCallback = null;
let enteredPinDigits = '';

function promptOwnerPin(actionName, onSuccess, onCancel) {
  if (store.isOwnerUnlocked()) {
    if (onSuccess) onSuccess();
    return;
  }
  currentPinCallback = onSuccess;
  currentPinCancelCallback = onCancel;
  enteredPinDigits = '';
  updatePinDisplay();

  const titleEl = document.getElementById('globalPinActionLabel');
  if (titleEl) titleEl.textContent = actionName ? `Authorize: ${actionName}` : 'Owner Authorization Required';
  const errEl = document.getElementById('globalPinError');
  if (errEl) errEl.classList.add('hidden');

  openModal('globalPinModal');

  const hiddenInput = document.getElementById('globalPinHiddenInput');
  if (hiddenInput) {
    hiddenInput.value = '';
    hiddenInput.focus();
  }
}
window.promptOwnerPin = promptOwnerPin;

function pressPinDigit(digit) {
  if (enteredPinDigits.length < 4) {
    enteredPinDigits += digit;
    updatePinDisplay();
    document.getElementById('globalPinError')?.classList.add('hidden');
    if (enteredPinDigits.length === 4) {
      verifyEnteredPin();
    }
  }
}
window.pressPinDigit = pressPinDigit;

function clearPinDigits() {
  enteredPinDigits = '';
  updatePinDisplay();
  document.getElementById('globalPinError')?.classList.add('hidden');
}
window.clearPinDigits = clearPinDigits;

function backspacePinDigit() {
  if (enteredPinDigits.length > 0) {
    enteredPinDigits = enteredPinDigits.slice(0, -1);
    updatePinDisplay();
    document.getElementById('globalPinError')?.classList.add('hidden');
  }
}
window.backspacePinDigit = backspacePinDigit;

function updatePinDisplay() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById('pinDot' + i);
    if (dot) {
      if (i < enteredPinDigits.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    }
  }
}

function verifyEnteredPin() {
  const isMatch = store.unlockOwner(enteredPinDigits);
  if (isMatch) {
    closeModal('globalPinModal');
    updateLockBtnUI();
    const cb = currentPinCallback;
    currentPinCallback = null;
    currentPinCancelCallback = null;
    enteredPinDigits = '';
    if (cb) cb();
  } else {
    const errEl = document.getElementById('globalPinError');
    if (errEl) errEl.classList.remove('hidden');
    setTimeout(() => {
      enteredPinDigits = '';
      updatePinDisplay();
    }, 450);
  }
}

function cancelPinModal() {
  closeModal('globalPinModal');
  enteredPinDigits = '';
  updatePinDisplay();
  const cancelCb = currentPinCancelCallback;
  currentPinCallback = null;
  currentPinCancelCallback = null;
  if (cancelCb) cancelCb();
}
window.cancelPinModal = cancelPinModal;

function updateLockBtnUI() {
  const btn = document.getElementById('sharedLockBtn');
  if (!btn) return;
  const isUnlocked = store.isOwnerUnlocked();
  if (isUnlocked) {
    btn.className = 'btn-lock unlocked';
    btn.innerHTML = `<span class="lock-label-full">Owner (Unlocked)</span><span class="lock-label-short">Owner</span>`;
    btn.title = 'Owner mode active. Click to lock session.';
  } else {
    btn.className = 'btn-lock locked';
    btn.innerHTML = `<span class="lock-label-full">Lock (Cashier)</span><span class="lock-label-short">Lock</span>`;
    btn.title = 'Cashier mode active. Click to unlock Owner access.';
  }
}
window.updateLockBtnUI = updateLockBtnUI;

function toggleOwnerLock() {
  if (store.isOwnerUnlocked()) {
    store.lockOwner();
    updateLockBtnUI();
    alert('Locked to Cashier Mode. Owner operations now require 4-digit PIN.');
  } else {
    promptOwnerPin('Unlock Owner Mode', () => {
      updateLockBtnUI();
      alert('Owner Mode Unlocked for this session.');
    });
  }
}
window.toggleOwnerLock = toggleOwnerLock;

window.addEventListener('mandi:owner-lock-changed', updateLockBtnUI);



