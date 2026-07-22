/* ==========================================================================
   Teacher Lu Platform — Finance module
   --------------------------------------------------------------------------
   Personal finance for private lessons.

   ARCHITECTURE
   ------------
   Store          localStorage wrapper
   U              date / money / string helpers
   Data           load + persist, student bridge
   BillingEngine  ← the billing engine: one independent `billing` object per
                    student, six plan types, schedule generation, discount,
                    late fee, interest and all derived money figures
   Rules          thin layer that asks the engine for status and totals
   Dashboard / Students / Income / Expenses / Reports / Export / App  — UI

   DESIGN NOTES
   ------------
   • The student list is READ from the Students module (sabatovicz_students).
     This file never writes to that key — Students stays untouched.
   • Every money figure is DERIVED. Nothing about status, balance or amount
     due is ever stored, so it can never go out of sync.
   • Old billing objects ({fee, dueDay, notes}) are migrated on load to the
     new shape, so existing data keeps working with no manual step.
   • All keys start with "sabatovicz_" so the Backup button in students.html
     picks them up automatically.
   ========================================================================== */

(function () {
  'use strict';

  /* ======================================================================
     1. CONSTANTS
     ====================================================================== */

  var KEYS = {
    students: 'sabatovicz_students',
    billing:  'sabatovicz_finance_billing',
    income:   'sabatovicz_finance_income',
    expenses: 'sabatovicz_finance_expenses'
  };

  var PAYMENT_METHODS = ['Pix', 'Cash', 'Bank transfer', 'Card', 'Other'];

  // Shown when a write fails (F-2) — same wording the old alert used.
  var MSG_SAVE_FAIL = 'Could not save — the browser storage may be full. Nothing was recorded.';

  var EXPENSE_CATEGORIES = [
    'Software', 'Marketing', 'Internet', 'Equipment',
    'Courses', 'Transport', 'Food', 'Other'
  ];

  var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                  'Thursday', 'Friday', 'Saturday'];

  /**
   * The six plan types. `fields` drives which inputs the billing modal shows,
   * so adding a new type later means adding one entry here plus a schedule
   * branch in BillingEngine.scheduleForMonth().
   */
  var BILLING_TYPES = [
    { id: 'monthly',    label: 'Monthly',        hint: 'Same amount every month, on a fixed day.',
      fields: ['amount', 'dueDay'] },
    { id: 'biweekly',   label: 'Every 2 weeks',  hint: 'A cycle of 14 days from a start date.',
      fields: ['amount', 'anchorDate'] },
    { id: 'weekly',     label: 'Weekly',         hint: 'Every week, on the same weekday.',
      fields: ['amount', 'weekday'] },
    { id: 'per_lesson', label: 'Per lesson',     hint: 'Pays for each lesson taken.',
      fields: ['amount', 'lessonSource', 'lessonsPerMonth'] },
    { id: 'package',    label: 'Lesson package', hint: 'Buys a block of lessons in advance.',
      fields: ['amount', 'lessonsTotal', 'lessonsUsed', 'anchorDate'] },
    { id: 'custom',     label: 'Custom',         hint: 'Your own arrangement — charge it by hand.',
      fields: ['amount', 'customDay'] }
  ];

  /* ======================================================================
     2. STORAGE LAYER
     ====================================================================== */

  var Store = {
    read: function (key, fallback) {
      try {
        var raw = localStorage.getItem(key);
        if (!raw) return fallback;
        var parsed = JSON.parse(raw);
        return parsed == null ? fallback : parsed;
      } catch (e) {
        console.warn('[finance] could not read ' + key, e);
        return fallback;
      }
    },
    write: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        // The caller decides how to surface this (F-2): it suppresses the
        // success toast and shows a failure message instead. No alert here,
        // so the user never sees a success and an error at the same time.
        console.error('[finance] could not save ' + key, e);
        return false;
      }
    }
  };

  /* ======================================================================
     3. UTILITIES
     ====================================================================== */

  var U = {
    uid: function () {
      return 'f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    },

    esc: function (t) {
      return String(t == null ? '' : t)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    money: function (n) {
      var v = Number(n) || 0;
      return 'R$ ' + v.toLocaleString('pt-BR', {
        minimumFractionDigits: 2, maximumFractionDigits: 2
      });
    },

    /** Round to 2 decimals, half-up, avoiding float drift. */
    round2: function (n) {
      return Math.round((Number(n) || 0) * 100 + Number.EPSILON) / 100;
    },

    dateBR: function (iso) {
      if (!iso) return '';
      var p = String(iso).split('-');
      return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : iso;
    },

    pad: function (n) { return (n < 10 ? '0' : '') + n; },

    today: function () {
      var d = new Date();
      return d.getFullYear() + '-' + U.pad(d.getMonth() + 1) + '-' + U.pad(d.getDate());
    },

    thisMonth: function () { return U.today().slice(0, 7); },

    /* --- date maths on "YYYY-MM-DD" strings (local, no timezone drift) --- */

    parse: function (iso) {
      var p = String(iso).split('-');
      return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    },

    toISO: function (d) {
      return d.getFullYear() + '-' + U.pad(d.getMonth() + 1) + '-' + U.pad(d.getDate());
    },

    addDays: function (iso, n) {
      var d = U.parse(iso);
      d.setDate(d.getDate() + n);
      return U.toISO(d);
    },

    /** Whole days between two ISO dates (b − a). */
    daysBetween: function (a, b) {
      return Math.round((U.parse(b) - U.parse(a)) / 86400000);
    },

    weekdayOf: function (iso) { return U.parse(iso).getDay(); },

    daysInMonth: function (ym) {
      var p = ym.split('-');
      return new Date(Number(p[0]), Number(p[1]), 0).getDate();
    },

    monthLabel: function (ym) {
      if (!ym) return '—';
      var p = ym.split('-');
      var full = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];
      return full[Number(p[1]) - 1] + ' ' + p[0];
    },

    monthOf: function (iso) { return String(iso).slice(0, 7); },

    compare: function (a, b, key, dir) {
      var x = a[key], y = b[key];
      if (typeof x === 'number' || typeof y === 'number') {
        x = Number(x) || 0; y = Number(y) || 0;
      } else {
        x = String(x == null ? '' : x).toLowerCase();
        y = String(y == null ? '' : y).toLowerCase();
      }
      if (x < y) return dir === 'asc' ? -1 : 1;
      if (x > y) return dir === 'asc' ? 1 : -1;
      return 0;
    },

    matches: function (haystack, needle) {
      if (!needle) return true;
      var norm = function (s) {
        return String(s == null ? '' : s)
          .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
      };
      return norm(haystack).indexOf(norm(needle)) !== -1;
    },

    $:  function (sel) { return document.querySelector(sel); },
    $$: function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  };

  /* ======================================================================
     4. APPLICATION STATE
     ====================================================================== */

  var state = {
    refMonth: U.thisMonth(),
    students: [],
    billing:  {},
    income:   [],
    expenses: [],
    sort: {
      students: { key: 'name', dir: 'asc'  },
      income:   { key: 'date', dir: 'desc' },
      expenses: { key: 'date', dir: 'desc' }
    },
    editing: { billing: null, income: null, expense: null },
    charts:  { income: null, category: null, profit: null }
  };

  /* ======================================================================
     5. BILLING ENGINE
     ----------------------------------------------------------------------
     Every student owns one independent `billing` object:

       {
         type            'monthly'|'biweekly'|'weekly'|'per_lesson'|
                         'package'|'custom'
         amount          value of one charge (or of the whole package)
         dueDay          1–31            — monthly
         customDay       1–31 or 0       — custom (0 = charge by hand)
         weekday         0–6             — weekly
         anchorDate      YYYY-MM-DD      — biweekly cycle start / package purchase
         lessonsPerMonth number          — per_lesson forecast
         lessonsTotal    number          — package size
         lessonsUsed     number          — package credits consumed
         discountType    'none'|'percent'|'fixed'
         discountValue   number
         lateFeeType     'none'|'percent'|'fixed'     (multa)
         lateFeeValue    number
         interestMonthly number          (juros % per month, pro rata die)
         graceDays       number
         notes           string
         active          boolean
       }

     Everything below is a pure function of that object — no side effects,
     no stored totals.
     ====================================================================== */

  var BillingEngine = {

    /* --------------------------------------------------------------------
       Lesson provider — dependency injection.

       The engine must not know that a Lesson Calendar exists. Whoever wires
       the app calls setLessonProvider() with a function:

           function (studentId, month) -> { dates: ['YYYY-MM-DD', ...] } | null

       Returning null means "no real data" and the engine falls back to the
       manual forecast. This keeps the engine pure, testable in isolation and
       free of any hard dependency on schedule.html.
       -------------------------------------------------------------------- */
    _lessonProvider: null,

    setLessonProvider: function (fn) {
      BillingEngine._lessonProvider = typeof fn === 'function' ? fn : null;
    },

    hasLessonProvider: function () {
      return !!BillingEngine._lessonProvider;
    },

    /** Ask the provider for real lessons; null when unavailable. */
    lessonsFor: function (studentId, month) {
      if (!BillingEngine._lessonProvider || !studentId) return null;
      try {
        var res = BillingEngine._lessonProvider(studentId, month);
        return (res && Array.isArray(res.dates)) ? res : null;
      } catch (e) {
        console.warn('[finance] lesson provider failed', e);
        return null;
      }
    },

    /** Default shape for a brand new plan. */
    blank: function () {
      return {
        type: 'monthly',
        amount: 0,
        dueDay: 5,
        customDay: 0,
        weekday: 5,
        anchorDate: U.today(),
        lessonSource: 'calendar',   // 'calendar' | 'estimate'
        lessonsPerMonth: 4,
        lessonsTotal: 8,
        lessonsUsed: 0,
        discountType: 'none',
        discountValue: 0,
        lateFeeType: 'none',
        lateFeeValue: 0,
        interestMonthly: 0,
        graceDays: 0,
        notes: '',
        active: true
      };
    },

    /**
     * Migration + defaults.
     * Version 1 stored {fee, dueDay, notes}. Anything with `fee` and no
     * `type` is an old record and becomes a monthly plan.
     */
    normalize: function (raw) {
      var b = BillingEngine.blank();
      if (!raw || typeof raw !== 'object') return b;

      if (raw.fee != null && raw.type == null) {      // ← v1 record
        b.type = 'monthly';
        b.amount = Number(raw.fee) || 0;
        b.dueDay = Number(raw.dueDay) || 5;
        b.notes = raw.notes || '';
        return b;
      }

      Object.keys(b).forEach(function (k) {
        if (raw[k] !== undefined && raw[k] !== null) b[k] = raw[k];
      });
      b.amount = Number(b.amount) || 0;
      b.active = b.active !== false;
      return b;
    },

    isConfigured: function (b) {
      return !!(b && b.active && Number(b.amount) > 0);
    },

    typeInfo: function (id) {
      for (var i = 0; i < BILLING_TYPES.length; i++) {
        if (BILLING_TYPES[i].id === id) return BILLING_TYPES[i];
      }
      return BILLING_TYPES[0];
    },

    /** Human sentence describing the plan — used in tables and tooltips. */
    describe: function (b) {
      if (!BillingEngine.isConfigured(b)) return 'No billing set';
      var v = U.money(BillingEngine.netAmount(b));
      switch (b.type) {
        case 'monthly':   return v + ' monthly, on day ' + b.dueDay;
        case 'biweekly':  return v + ' every 2 weeks';
        case 'weekly':    return v + ' every ' + WEEKDAYS[Number(b.weekday) || 0];
        case 'per_lesson':return v + ' per lesson';
        case 'package':   return v + ' for ' + b.lessonsTotal + ' lessons';
        case 'custom':    return Number(b.customDay)
                                 ? v + ' custom, on day ' + b.customDay
                                 : v + ' custom, charged by hand';
        default:          return v;
      }
    },

    /* ---------------- money -------------------------------------------- */

    /** One charge after discount. */
    netAmount: function (b) {
      var gross = Number(b.amount) || 0;
      var d = 0;
      if (b.discountType === 'percent') d = gross * (Number(b.discountValue) || 0) / 100;
      else if (b.discountType === 'fixed') d = Number(b.discountValue) || 0;
      return U.round2(Math.max(0, gross - d));
    },

    /**
     * Penalty for a charge that is late: one-off late fee (multa) plus
     * interest (juros) pro rata die. Returns 0 while inside the grace period.
     */
    penalty: function (b, dueISO, todayISO) {
      var grace = Number(b.graceDays) || 0;
      var overdueDays = U.daysBetween(U.addDays(dueISO, grace), todayISO);
      if (overdueDays <= 0) return { lateFee: 0, interest: 0, total: 0, days: 0 };

      var net = BillingEngine.netAmount(b);

      var lateFee = 0;
      if (b.lateFeeType === 'percent') lateFee = net * (Number(b.lateFeeValue) || 0) / 100;
      else if (b.lateFeeType === 'fixed') lateFee = Number(b.lateFeeValue) || 0;

      var monthlyRate = Number(b.interestMonthly) || 0;
      var interest = net * (monthlyRate / 100) * (overdueDays / 30);

      return {
        lateFee: U.round2(lateFee),
        interest: U.round2(interest),
        total: U.round2(lateFee + interest),
        days: overdueDays
      };
    },

    /** What a single charge is worth today, penalties included. */
    amountDue: function (b, dueISO, todayISO) {
      return U.round2(
        BillingEngine.netAmount(b) + BillingEngine.penalty(b, dueISO, todayISO).total
      );
    },

    /* ---------------- schedule ----------------------------------------- */

    /**
     * Every charge this plan generates inside a "YYYY-MM" month.
     * Returns [{ date, amount }] — the backbone of every other calculation.
     */
    scheduleForMonth: function (b, ym, studentId) {
      if (!BillingEngine.isConfigured(b)) return [];

      var net = BillingEngine.netAmount(b);
      var last = U.daysInMonth(ym);
      var out = [];
      var i, d;

      switch (b.type) {

        case 'monthly':
          // Day 31 in a 30-day month falls back to the last day.
          out.push({ date: ym + '-' + U.pad(Math.min(Number(b.dueDay) || 1, last)), amount: net });
          break;

        case 'custom':
          if (Number(b.customDay) > 0) {
            out.push({ date: ym + '-' + U.pad(Math.min(Number(b.customDay), last)), amount: net });
          }
          // customDay = 0 → charged by hand, no automatic schedule
          break;

        case 'weekly':
          for (i = 1; i <= last; i++) {
            d = ym + '-' + U.pad(i);
            if (U.weekdayOf(d) === (Number(b.weekday) || 0)) out.push({ date: d, amount: net });
          }
          break;

        case 'biweekly':
          // Walk the 14-day cycle from the anchor until we pass the month.
          var cursor = b.anchorDate || (ym + '-01');
          var guard = 0;
          while (U.monthOf(cursor) < ym && guard++ < 400) cursor = U.addDays(cursor, 14);
          while (U.monthOf(cursor) === ym && guard++ < 400) {
            out.push({ date: cursor, amount: net });
            cursor = U.addDays(cursor, 14);
          }
          break;

        case 'per_lesson':
          // Preferred path: one charge per lesson actually taken, on the day
          // it happened — real dates, real count.
          var real = (b.lessonSource !== 'estimate')
            ? BillingEngine.lessonsFor(studentId, ym)
            : null;

          if (real) {
            real.dates.forEach(function (date) {
              out.push({ date: date, amount: net, perLesson: true, fromCalendar: true });
            });
          } else {
            // Fallback: forecast only, as a single synthetic charge at the
            // end of the month. Used when there is no calendar data.
            var lessons = Number(b.lessonsPerMonth) || 0;
            if (lessons > 0) {
              out.push({
                date: ym + '-' + U.pad(last),
                amount: U.round2(net * lessons),
                perLesson: true,
                estimated: true,
                lessons: lessons
              });
            }
          }
          break;

        case 'package':
          // The package is charged once, in the month it was bought.
          if (U.monthOf(b.anchorDate || '') === ym) {
            out.push({ date: b.anchorDate, amount: net, package: true });
          }
          break;
      }

      return out;
    },

    /** The next charge date from a given day (looks up to 12 months ahead). */
    nextDueDate: function (b, fromISO, studentId) {
      if (!BillingEngine.isConfigured(b)) return null;
      var from = fromISO || U.today();
      var ym = U.monthOf(from);

      for (var step = 0; step < 12; step++) {
        var sched = BillingEngine.scheduleForMonth(b, ym, studentId);
        for (var i = 0; i < sched.length; i++) {
          if (sched[i].date >= from) return sched[i].date;
        }
        ym = BillingEngine.nextMonth(ym);
      }
      return null;
    },

    nextMonth: function (ym) {
      var p = ym.split('-');
      var y = Number(p[0]), m = Number(p[1]) + 1;
      if (m > 12) { m = 1; y++; }
      return y + '-' + U.pad(m);
    },

    /** Total this plan is expected to bring in a month (after discount). */
    expectedForMonth: function (b, ym, studentId) {
      return U.round2(
        BillingEngine.scheduleForMonth(b, ym, studentId)
          .reduce(function (s, c) { return s + c.amount; }, 0)
      );
    },

    /** True when this month's figures came from real calendar data. */
    isFromCalendar: function (b, ym, studentId) {
      if (!b || b.type !== 'per_lesson') return false;
      var sched = BillingEngine.scheduleForMonth(b, ym, studentId);
      return sched.length > 0 && !!sched[0].fromCalendar;
    },

    /** Package credits left, or null when the plan is not a package. */
    creditsLeft: function (b) {
      if (!b || b.type !== 'package') return null;
      var total = Number(b.lessonsTotal) || 0;
      var used = Number(b.lessonsUsed) || 0;
      return Math.max(0, total - used);
    }
  };

  /* ======================================================================
     6. DATA ACCESS
     ====================================================================== */

  var Data = {
    loadAll: function () {
      state.students = Store.read(KEYS.students, []) || [];
      state.income   = Store.read(KEYS.income, []) || [];
      state.expenses = Store.read(KEYS.expenses, []) || [];

      // Normalise every billing object on the way in (migrates v1 records).
      var raw = Store.read(KEYS.billing, {}) || {};
      var migrated = false;
      state.billing = {};
      Object.keys(raw).forEach(function (id) {
        if (raw[id] && raw[id].fee != null && raw[id].type == null) migrated = true;
        state.billing[id] = BillingEngine.normalize(raw[id]);
      });
      if (migrated) {
        Data.saveBilling();
        console.info('[finance] v1 billing records migrated to the billing engine.');
      }
    },

    saveBilling:  function () { return Store.write(KEYS.billing, state.billing); },
    saveIncome:   function () { return Store.write(KEYS.income, state.income); },
    saveExpenses: function () { return Store.write(KEYS.expenses, state.expenses); },

    billingOf: function (studentId) {
      return state.billing[studentId] || null;
    },

    studentById: function (id) {
      for (var i = 0; i < state.students.length; i++) {
        if (state.students[i].id === id) return state.students[i];
      }
      return null;
    },

    incomeOfMonth: function (ym) {
      return state.income.filter(function (r) { return U.monthOf(r.date) === ym; });
    },

    expensesOfMonth: function (ym) {
      return state.expenses.filter(function (r) { return U.monthOf(r.date) === ym; });
    },

    paidByStudent: function (studentId, ym) {
      return U.round2(Data.incomeOfMonth(ym)
        .filter(function (r) { return r.studentId === studentId; })
        .reduce(function (sum, r) { return sum + (Number(r.amount) || 0); }, 0));
    }
  };

  /* ======================================================================
     7. RULES — derived status and totals (asks the engine)
     ====================================================================== */

  var Rules = {
    /**
     * 'none' | 'paid' | 'pending' | 'overdue'
     * A student is overdue when a charge whose due date (plus grace) has
     * already passed is still not covered by the month's income.
     */
    statusOf: function (studentId, ym) {
      var b = Data.billingOf(studentId);
      if (!BillingEngine.isConfigured(b)) return 'none';

      var expected = BillingEngine.expectedForMonth(b, ym, studentId);
      if (expected <= 0) return 'none';

      var paid = Data.paidByStudent(studentId, ym);
      if (paid >= expected) return 'paid';

      // Is any charge already past its due date + grace?
      var today = U.today();
      var sched = BillingEngine.scheduleForMonth(b, ym, studentId);
      var covered = paid;
      for (var i = 0; i < sched.length; i++) {
        var chargePaid = Math.min(covered, sched[i].amount);
        covered -= chargePaid;
        var stillOwed = sched[i].amount - chargePaid > 0.005;
        if (stillOwed && U.addDays(sched[i].date, Number(b.graceDays) || 0) < today) {
          return 'overdue';
        }
      }
      return 'pending';
    },

    /** Amount still missing this month, penalties included. */
    outstanding: function (studentId, ym) {
      var b = Data.billingOf(studentId);
      if (!BillingEngine.isConfigured(b)) return 0;

      var today = U.today();
      var sched = BillingEngine.scheduleForMonth(b, ym, studentId);
      var credit = Data.paidByStudent(studentId, ym);
      var owed = 0;

      // Oldest charge first — payments cover them in order.
      sched.forEach(function (c) {
        var used = Math.min(credit, c.amount);
        credit -= used;
        var remaining = c.amount - used;
        if (remaining > 0.005) {
          owed += remaining + BillingEngine.penalty(b, c.date, today).total;
        }
      });

      return U.round2(Math.max(0, owed));
    },

    /** Penalty breakdown for the tooltip / dashboard hint. */
    penaltyOf: function (studentId, ym) {
      var b = Data.billingOf(studentId);
      if (!BillingEngine.isConfigured(b)) return null;
      if (Rules.statusOf(studentId, ym) !== 'overdue') return null;

      var today = U.today();
      var sched = BillingEngine.scheduleForMonth(b, ym, studentId);
      var credit = Data.paidByStudent(studentId, ym);
      var lateFee = 0, interest = 0, days = 0;

      sched.forEach(function (c) {
        var used = Math.min(credit, c.amount);
        credit -= used;
        if (c.amount - used > 0.005) {
          var p = BillingEngine.penalty(b, c.date, today);
          lateFee += p.lateFee; interest += p.interest;
          days = Math.max(days, p.days);
        }
      });

      if (lateFee + interest <= 0) return null;
      return { lateFee: U.round2(lateFee), interest: U.round2(interest), days: days };
    },

    statusLabel: function (s) {
      return { paid: 'Paid', pending: 'Pending', overdue: 'Overdue', none: 'No billing' }[s] || s;
    },

    /** Dashboard totals for a month. */
    totals: function (ym) {
      var received = U.round2(Data.incomeOfMonth(ym)
        .reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0));

      var expected = 0, pending = 0, overdueAmount = 0, overdueCount = 0;

      state.students.forEach(function (stu) {
        var b = Data.billingOf(stu.id);
        if (!BillingEngine.isConfigured(b)) return;
        expected += BillingEngine.expectedForMonth(b, ym, stu.id);
        var out = Rules.outstanding(stu.id, ym);
        pending += out;
        if (Rules.statusOf(stu.id, ym) === 'overdue') {
          overdueAmount += out;
          overdueCount++;
        }
      });

      var expenses = U.round2(Data.expensesOfMonth(ym)
        .reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0));

      return {
        received: received,
        expected: U.round2(expected),
        pending:  U.round2(pending),
        expenses: expenses,
        profit:   U.round2(received - expenses),
        overdueAmount: U.round2(overdueAmount),
        overdueCount:  overdueCount,
        // Default rate (inadimplência): share of what was expected and not paid.
        defaultRate: expected > 0 ? U.round2(overdueAmount / expected * 100) : 0
      };
    },

    /** Upcoming charges across all students, for the next N days. */
    upcoming: function (days) {
      var today = U.today();
      var limit = U.addDays(today, days || 30);
      var out = [];

      state.students.forEach(function (stu) {
        var b = Data.billingOf(stu.id);
        if (!BillingEngine.isConfigured(b)) return;
        var next = BillingEngine.nextDueDate(b, today, stu.id);
        if (next && next <= limit) {
          out.push({
            student: stu,
            billing: b,
            date: next,
            amount: BillingEngine.netAmount(b),
            inDays: U.daysBetween(today, next)
          });
        }
      });

      return out.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    }
  };

  /* ======================================================================
     8. SHARED UI HELPERS
     ====================================================================== */

  var UI = {
    toast: function (msg) {
      var t = U.$('#toast');
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(UI._toastTimer);
      UI._toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
    },

    badge: function (status) {
      return '<span class="badge ' + status + '">' + Rules.statusLabel(status) + '</span>';
    },

    planChip: function (b) {
      if (!BillingEngine.isConfigured(b)) return '<span class="badge none">Not set</span>';
      return '<span class="badge plan">' + U.esc(BillingEngine.typeInfo(b.type).label) + '</span>';
    },

    openModal: function (id) { U.$('#' + id).classList.add('show'); },

    closeModals: function () {
      U.$$('.ov').forEach(function (o) { o.classList.remove('show'); });
      state.editing = { billing: null, income: null, expense: null };
    },

    fillSelect: function (sel, values, placeholder) {
      var html = placeholder ? '<option value="">' + placeholder + '</option>' : '';
      html += values.map(function (v) {
        var value = typeof v === 'object' ? v.value : v;
        var label = typeof v === 'object' ? v.label : v;
        return '<option value="' + U.esc(value) + '">' + U.esc(label) + '</option>';
      }).join('');
      sel.innerHTML = html;
    },

    markSortedHeader: function (tableSel, sortState) {
      U.$$(tableSel + ' th[data-sort]').forEach(function (th) {
        var active = th.getAttribute('data-sort') === sortState.key;
        th.classList.toggle('sorted', active);
        var arrow = th.querySelector('.arrow');
        if (arrow) arrow.textContent = active ? (sortState.dir === 'asc' ? '▲' : '▼') : '▼';
      });
    },

    bindSort: function (tableSel, sortKey, rerender) {
      U.$$(tableSel + ' th[data-sort]').forEach(function (th) {
        th.addEventListener('click', function () {
          var key = th.getAttribute('data-sort');
          var s = state.sort[sortKey];
          if (s.key === key) s.dir = s.dir === 'asc' ? 'desc' : 'asc';
          else { s.key = key; s.dir = 'asc'; }
          rerender();
        });
      });
    }
  };

  /* ======================================================================
     9. DASHBOARD
     ====================================================================== */

  var Dashboard = {
    render: function () {
      var ym = state.refMonth;
      var t = Rules.totals(ym);

      U.$('#dashMonthLabel').textContent = U.monthLabel(ym);
      U.$('#stuMonthLabel').textContent  = U.monthLabel(ym);

      U.$('#kReceived').textContent = U.money(t.received);
      U.$('#kExpected').textContent = U.money(t.expected);
      U.$('#kPending').textContent  = U.money(t.pending);
      U.$('#kExpenses').textContent = U.money(t.expenses);
      U.$('#kProfit').textContent   = U.money(t.profit);

      U.$('#kReceivedHint').textContent =
        Data.incomeOfMonth(ym).length + ' payment(s) recorded';
      U.$('#kExpensesHint').textContent =
        Data.expensesOfMonth(ym).length + ' expense(s) recorded';
      U.$('#kExpectedHint').textContent =
        'from ' + Object.keys(state.billing).filter(function (id) {
          return BillingEngine.isConfigured(state.billing[id]);
        }).length + ' active plan(s)';

      var owing = state.students.filter(function (s) {
        var st = Rules.statusOf(s.id, ym);
        return st === 'pending' || st === 'overdue';
      });
      U.$('#kPendingHint').textContent =
        owing.length + ' student(s) · ' + t.defaultRate.toFixed(1) + '% overdue';

      var profitCard = U.$('#kProfit').closest('.kpi');
      profitCard.classList.toggle('pos', t.profit >= 0);
      profitCard.classList.toggle('neg', t.profit < 0);

      Dashboard.renderDueTable(owing, ym);
      Dashboard.renderUpcoming();
    },

    renderDueTable: function (owing, ym) {
      var body = U.$('#dueBody');

      if (!owing.length) {
        body.innerHTML = '<tr><td colspan="5" class="empty">Nothing pending for ' +
          U.monthLabel(ym) + ' — everyone is up to date.</td></tr>';
        return;
      }

      owing.sort(function (a, b) {
        var sa = Rules.statusOf(a.id, ym), sb = Rules.statusOf(b.id, ym);
        if (sa !== sb) return sa === 'overdue' ? -1 : 1;
        return Rules.outstanding(b.id, ym) - Rules.outstanding(a.id, ym);
      });

      body.innerHTML = owing.map(function (s) {
        var b = Data.billingOf(s.id);
        var status = Rules.statusOf(s.id, ym);
        var pen = Rules.penaltyOf(s.id, ym);
        var penNote = pen
          ? '<div class="hint" style="margin:2px 0 0">' + pen.days + 'd late · +' +
            U.money(pen.lateFee + pen.interest) + ' fee/interest</div>'
          : '';
        return '<tr>' +
          '<td><span class="name-cell"><span class="emo">' + (s.emoji || '🙂') + '</span>' +
            U.esc(s.name) + '</span>' + penNote + '</td>' +
          '<td>' + U.esc(BillingEngine.describe(b)) + '</td>' +
          '<td>' + UI.badge(status) + '</td>' +
          '<td class="num">' + U.money(Rules.outstanding(s.id, ym)) + '</td>' +
          '<td class="num"><button class="btn blue sm no-print" ' +
            'data-quick-pay="' + U.esc(s.id) + '">Received</button></td>' +
        '</tr>';
      }).join('');
    },

    renderUpcoming: function () {
      var rows = Rules.upcoming(30);
      var body = U.$('#upcomingBody');

      if (!rows.length) {
        body.innerHTML = '<tr><td colspan="4" class="empty">' +
          'No charges scheduled for the next 30 days.</td></tr>';
        return;
      }

      body.innerHTML = rows.map(function (r) {
        var when = r.inDays === 0 ? 'today'
                 : r.inDays === 1 ? 'tomorrow'
                 : 'in ' + r.inDays + ' days';
        return '<tr>' +
          '<td><span class="name-cell"><span class="emo">' + (r.student.emoji || '🙂') + '</span>' +
            U.esc(r.student.name) + '</span></td>' +
          '<td>' + UI.planChip(r.billing) + '</td>' +
          '<td>' + U.dateBR(r.date) + ' <span class="hint">· ' + when + '</span></td>' +
          '<td class="num">' + U.money(r.amount) + '</td>' +
        '</tr>';
      }).join('');
    },

    /** One click: register the outstanding amount as received today. */
    quickPay: function (studentId) {
      var s = Data.studentById(studentId);
      var amount = Rules.outstanding(studentId, state.refMonth);
      if (!s || !amount) return;

      state.income.push({
        id: U.uid(),
        date: U.today(),
        studentId: s.id,
        studentName: s.name,
        amount: amount,
        method: PAYMENT_METHODS[0],
        notes: BillingEngine.typeInfo(Data.billingOf(s.id).type).label +
               ' — ' + U.monthLabel(state.refMonth)
      });
      if (!Data.saveIncome()) { UI.toast(MSG_SAVE_FAIL); return; }
      App.renderAll();
      UI.toast('Received ' + U.money(amount) + ' from ' + s.name);
    }
  };

  /* ======================================================================
     10. STUDENTS / BILLING PLANS
     ====================================================================== */

  var Students = {
    rows: function () {
      var ym = state.refMonth;
      return state.students.map(function (s) {
        var b = Data.billingOf(s.id);
        var configured = BillingEngine.isConfigured(b);
        return {
          id: s.id,
          name: s.name,
          emoji: s.emoji || '🙂',
          billing: b,
          type: configured ? BillingEngine.typeInfo(b.type).label : '',
          plan: configured ? BillingEngine.describe(b) : '—',
          amount: configured ? BillingEngine.netAmount(b) : 0,
          expected: configured ? BillingEngine.expectedForMonth(b, ym, s.id) : 0,
          nextDue: configured ? (BillingEngine.nextDueDate(b, U.today(), s.id) || '') : '',
          fromCalendar: configured ? BillingEngine.isFromCalendar(b, ym, s.id) : false,
          credits: configured ? BillingEngine.creditsLeft(b) : null,
          status: Rules.statusOf(s.id, ym)
        };
      });
    },

    render: function () {
      var search = U.$('#stuSearch').value.trim();
      var status = U.$('#stuStatus').value;
      var type   = U.$('#stuType').value;
      var s = state.sort.students;

      var rows = Students.rows()
        .filter(function (r) { return U.matches(r.name, search); })
        .filter(function (r) { return !status || r.status === status; })
        .filter(function (r) { return !type || (r.billing && r.billing.type === type); })
        .sort(function (a, b) { return U.compare(a, b, s.key, s.dir); });

      U.$('#stuCount').textContent = rows.length;
      UI.markSortedHeader('#tblStudents', s);

      var body = U.$('#stuBody');
      if (!rows.length) {
        body.innerHTML = '<tr><td colspan="6" class="empty">' +
          (state.students.length
            ? 'No student matches these filters.'
            : 'No students yet — add them in the Students module first.') +
          '</td></tr>';
        return;
      }

      body.innerHTML = rows.map(function (r) {
        var configured = BillingEngine.isConfigured(r.billing);
        var credits = r.credits != null
          ? '<div class="hint" style="margin:2px 0 0">' + r.credits + ' of ' +
            r.billing.lessonsTotal + ' lessons left</div>'
          : '';
        var notes = (r.billing && r.billing.notes)
          ? '<div class="hint" style="margin:2px 0 0">' + U.esc(r.billing.notes) + '</div>'
          : '';
        return '<tr>' +
          '<td><span class="name-cell"><span class="emo">' + r.emoji + '</span>' +
            U.esc(r.name) + '</span>' + credits + notes + '</td>' +
          '<td>' + UI.planChip(r.billing) +
            (r.fromCalendar ? ' <span class="badge cal" title="Counted from the Lesson Calendar">📅 live</span>' : '') +
            '<div class="hint" style="margin:3px 0 0">' + U.esc(r.plan) + '</div></td>' +
          '<td class="num">' + (configured ? U.money(r.expected) : '—') + '</td>' +
          '<td>' + (r.nextDue ? U.dateBR(r.nextDue) : '—') + '</td>' +
          '<td>' + UI.badge(r.status) + '</td>' +
          '<td class="actions">' +
            '<button class="icon-btn" title="Edit plan" data-edit-billing="' + U.esc(r.id) + '">✏️</button>' +
            (configured
              ? '<button class="icon-btn del" title="Remove plan" data-del-billing="' + U.esc(r.id) + '">🗑️</button>'
              : '') +
          '</td>' +
        '</tr>';
      }).join('');
    },

    /** Show only the inputs that belong to the selected plan type. */
    syncFields: function () {
      var type = U.$('#bType').value;
      var info = BillingEngine.typeInfo(type);
      U.$('#bTypeHint').textContent = info.hint;
      U.$$('[data-field]').forEach(function (el) {
        el.style.display = info.fields.indexOf(el.getAttribute('data-field')) === -1
          ? 'none' : '';
      });

      // The manual forecast only matters when the calendar is not the source.
      if (type === 'per_lesson' && U.$('#bLessonSource').value === 'calendar') {
        U.$('[data-field="lessonsPerMonth"]').style.display = 'none';
      }

      Students.preview();
    },

    /** Live sentence + next three charges, so the plan is never a mystery. */
    preview: function () {
      var b = Students.readForm();
      var box = U.$('#bPreview');
      if (!BillingEngine.isConfigured(b)) {
        box.innerHTML = '<span class="hint">Enter an amount to see the plan.</span>';
        return;
      }

      var studentId = U.$('#bStudent').value;
      var dates = [];
      var cursor = U.today();
      for (var i = 0; i < 3; i++) {
        var d = BillingEngine.nextDueDate(b, cursor, studentId);
        if (!d) break;
        dates.push(d);
        cursor = U.addDays(d, 1);
      }

      var extras = [];
      if (b.discountType !== 'none' && Number(b.discountValue))
        extras.push('discount ' + (b.discountType === 'percent'
          ? b.discountValue + '%' : U.money(b.discountValue)));
      if (b.lateFeeType !== 'none' && Number(b.lateFeeValue))
        extras.push('late fee ' + (b.lateFeeType === 'percent'
          ? b.lateFeeValue + '%' : U.money(b.lateFeeValue)));
      if (Number(b.interestMonthly))
        extras.push('interest ' + b.interestMonthly + '%/month');
      if (Number(b.graceDays))
        extras.push(b.graceDays + ' grace day(s)');

      // Tell the teacher where per-lesson numbers come from.
      var source = '';
      if (b.type === 'per_lesson') {
        var live = BillingEngine.isFromCalendar(b, state.refMonth, studentId);
        source = '<div class="hint" style="margin-top:4px">' + (live
          ? 'Counting real lessons from the Lesson Calendar — ' +
            BillingEngine.scheduleForMonth(b, state.refMonth, studentId).length +
            ' done in ' + U.monthLabel(state.refMonth) + '.'
          : 'Using your manual forecast (no lessons found in the calendar for this student).') +
          '</div>';
      }

      box.innerHTML =
        '<b>' + U.esc(BillingEngine.describe(b)) + '</b>' + source +
        (extras.length ? '<div class="hint" style="margin-top:4px">' + extras.join(' · ') + '</div>' : '') +
        (dates.length
          ? '<div class="hint" style="margin-top:6px">Next charges: ' +
            dates.map(U.dateBR).join(' · ') + '</div>'
          : '<div class="hint" style="margin-top:6px">Charged by hand — no automatic dates.</div>');
    },

    /** Read the modal into a billing object (without saving). */
    readForm: function () {
      var b = BillingEngine.blank();
      b.type            = U.$('#bType').value;
      b.amount          = Number(U.$('#bAmount').value) || 0;
      b.dueDay          = Number(U.$('#bDueDay').value) || 5;
      b.customDay       = Number(U.$('#bCustomDay').value) || 0;
      b.weekday         = Number(U.$('#bWeekday').value) || 0;
      b.anchorDate      = U.$('#bAnchorDate').value || U.today();
      b.lessonSource    = U.$('#bLessonSource').value;
      b.lessonsPerMonth = Number(U.$('#bLessonsPerMonth').value) || 0;
      b.lessonsTotal    = Number(U.$('#bLessonsTotal').value) || 0;
      b.lessonsUsed     = Number(U.$('#bLessonsUsed').value) || 0;
      b.discountType    = U.$('#bDiscountType').value;
      b.discountValue   = Number(U.$('#bDiscountValue').value) || 0;
      b.lateFeeType     = U.$('#bLateFeeType').value;
      b.lateFeeValue    = Number(U.$('#bLateFeeValue').value) || 0;
      b.interestMonthly = Number(U.$('#bInterest').value) || 0;
      b.graceDays       = Number(U.$('#bGraceDays').value) || 0;
      b.notes           = U.$('#bNotes').value.trim();
      b.active          = true;
      return b;
    },

    openModal: function (studentId) {
      if (!state.students.length) {
        alert('Add your students in the Students module first.');
        return;
      }
      state.editing.billing = studentId || null;

      // Student picker
      var sel = U.$('#bStudent');
      UI.fillSelect(sel, state.students.map(function (s) {
        return { value: s.id, label: (s.emoji || '🙂') + '  ' + s.name };
      }));
      sel.value = studentId || state.students[0].id;
      sel.disabled = !!studentId;

      // Static option lists
      UI.fillSelect(U.$('#bType'), BILLING_TYPES.map(function (t) {
        return { value: t.id, label: t.label };
      }));
      var days = [], d;
      for (d = 1; d <= 31; d++) days.push({ value: d, label: 'Day ' + d });
      UI.fillSelect(U.$('#bDueDay'), days);
      UI.fillSelect(U.$('#bCustomDay'),
        [{ value: 0, label: 'By hand (no fixed day)' }].concat(days));
      UI.fillSelect(U.$('#bWeekday'), WEEKDAYS.map(function (w, i) {
        return { value: i, label: w };
      }));

      var b = studentId
        ? BillingEngine.normalize(state.billing[studentId])
        : BillingEngine.blank();

      U.$('#billingTitle').textContent = studentId ? 'Edit billing plan' : 'New billing plan';
      U.$('#bType').value            = b.type;
      U.$('#bAmount').value          = b.amount || '';
      U.$('#bDueDay').value          = b.dueDay;
      U.$('#bCustomDay').value       = b.customDay;
      U.$('#bWeekday').value         = b.weekday;
      U.$('#bAnchorDate').value      = b.anchorDate;
      U.$('#bLessonSource').value    = b.lessonSource || 'calendar';
      U.$('#bLessonsPerMonth').value = b.lessonsPerMonth;
      U.$('#bLessonsTotal').value    = b.lessonsTotal;
      U.$('#bLessonsUsed').value     = b.lessonsUsed;
      U.$('#bDiscountType').value    = b.discountType;
      U.$('#bDiscountValue').value   = b.discountValue || '';
      U.$('#bLateFeeType').value     = b.lateFeeType;
      U.$('#bLateFeeValue').value    = b.lateFeeValue || '';
      U.$('#bInterest').value        = b.interestMonthly || '';
      U.$('#bGraceDays').value       = b.graceDays || 0;
      U.$('#bNotes').value           = b.notes || '';

      // Advanced block starts collapsed — most plans never need it.
      U.$('#bAdvanced').classList.remove('open');

      Students.syncFields();
      UI.openModal('ovBilling');
      U.$('#bAmount').focus();
    },

    save: function () {
      var id = U.$('#bStudent').value;
      if (!id) { alert('Please choose a student.'); return; }

      var b = Students.readForm();
      if (!b.amount || b.amount <= 0) { alert('Please enter an amount.'); return; }
      if (b.type === 'package' && (!b.lessonsTotal || b.lessonsTotal <= 0)) {
        alert('Please enter how many lessons the package has.'); return;
      }
      if (b.type === 'package' && b.lessonsUsed > b.lessonsTotal) {
        alert('Lessons used cannot be greater than the package size.'); return;
      }

      state.billing[id] = b;
      if (!Data.saveBilling()) { UI.toast(MSG_SAVE_FAIL); return; }
      UI.closeModals();
      App.renderAll();
      UI.toast('Billing plan saved');
    },

    remove: function (id) {
      var s = Data.studentById(id);
      if (!confirm('Remove the billing plan for ' + (s ? s.name : 'this student') +
                   '? Income records are kept.')) return;
      delete state.billing[id];
      if (!Data.saveBilling()) { UI.toast(MSG_SAVE_FAIL); return; }
      App.renderAll();
      UI.toast('Billing plan removed');
    }
  };

  /* ======================================================================
     11. INCOME
     ====================================================================== */

  var Income = {
    filtered: function () {
      var search  = U.$('#incSearch').value.trim();
      var student = U.$('#incStudent').value;
      var method  = U.$('#incMethod').value;
      var month   = U.$('#incMonth').value;
      var s = state.sort.income;

      return state.income
        .filter(function (r) { return !student || r.studentId === student; })
        .filter(function (r) { return !method || r.method === method; })
        .filter(function (r) { return !month || U.monthOf(r.date) === month; })
        .filter(function (r) {
          return U.matches(r.studentName, search) || U.matches(r.notes, search);
        })
        .sort(function (a, b) { return U.compare(a, b, s.key, s.dir); });
    },

    render: function () {
      var rows = Income.filtered();
      U.$('#incCount').textContent = rows.length;
      U.$('#incTotal').textContent = U.money(
        rows.reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0)
      );
      UI.markSortedHeader('#tblIncome', state.sort.income);

      var body = U.$('#incBody');
      if (!rows.length) {
        body.innerHTML = '<tr><td colspan="6" class="empty">No income records yet.</td></tr>';
        return;
      }

      body.innerHTML = rows.map(function (r) {
        return '<tr>' +
          '<td>' + U.dateBR(r.date) + '</td>' +
          '<td>' + U.esc(r.studentName) + '</td>' +
          '<td class="num">' + U.money(r.amount) + '</td>' +
          '<td>' + U.esc(r.method) + '</td>' +
          '<td>' + U.esc(r.notes) + '</td>' +
          '<td class="actions">' +
            '<button class="icon-btn" title="Edit" data-edit-income="' + r.id + '">✏️</button>' +
            '<button class="icon-btn del" title="Delete" data-del-income="' + r.id + '">🗑️</button>' +
          '</td>' +
        '</tr>';
      }).join('');
    },

    byId: function (id) {
      for (var i = 0; i < state.income.length; i++) {
        if (state.income[i].id === id) return state.income[i];
      }
      return null;
    },

    openModal: function (recordId) {
      if (!state.students.length) {
        alert('Add your students in the Students module first.');
        return;
      }
      state.editing.income = recordId || null;
      var r = recordId ? Income.byId(recordId) : null;

      UI.fillSelect(U.$('#iStudent'), state.students.map(function (s) {
        return { value: s.id, label: (s.emoji || '🙂') + '  ' + s.name };
      }));
      UI.fillSelect(U.$('#iMethod'), PAYMENT_METHODS);

      U.$('#incomeTitle').textContent = r ? 'Edit income' : 'Add income';
      U.$('#iDate').value    = r ? r.date : U.today();
      U.$('#iAmount').value  = r ? r.amount : '';
      U.$('#iStudent').value = r ? r.studentId : state.students[0].id;
      U.$('#iMethod').value  = r ? r.method : PAYMENT_METHODS[0];
      U.$('#iNotes').value   = r ? r.notes : '';

      UI.openModal('ovIncome');
      U.$('#iAmount').focus();
    },

    save: function () {
      var date   = U.$('#iDate').value;
      var amount = Number(U.$('#iAmount').value);
      var stuId  = U.$('#iStudent').value;
      var stu    = Data.studentById(stuId);

      if (!date) { alert('Please choose a date.'); return; }
      if (!amount || amount <= 0) { alert('Please enter an amount.'); return; }
      if (!stu) { alert('Please choose a student.'); return; }

      var payload = {
        date: date, studentId: stuId, studentName: stu.name,
        amount: amount, method: U.$('#iMethod').value,
        notes: U.$('#iNotes').value.trim()
      };

      if (state.editing.income) {
        var r = Income.byId(state.editing.income);
        if (r) Object.assign(r, payload);
      } else {
        payload.id = U.uid();
        state.income.push(payload);
      }

      if (!Data.saveIncome()) { UI.toast(MSG_SAVE_FAIL); return; }
      UI.closeModals();
      App.renderAll();
      UI.toast('Income saved');
    },

    remove: function (id) {
      var r = Income.byId(id);
      if (!r) return;
      if (!confirm('Delete this income record of ' + U.money(r.amount) +
                   ' from ' + r.studentName + '?')) return;
      state.income = state.income.filter(function (x) { return x.id !== id; });
      if (!Data.saveIncome()) { UI.toast(MSG_SAVE_FAIL); return; }
      App.renderAll();
      UI.toast('Income deleted');
    }
  };

  /* ======================================================================
     12. EXPENSES
     ====================================================================== */

  var Expenses = {
    filtered: function () {
      var search   = U.$('#expSearch').value.trim();
      var category = U.$('#expCategory').value;
      var month    = U.$('#expMonth').value;
      var s = state.sort.expenses;

      return state.expenses
        .filter(function (r) { return !category || r.category === category; })
        .filter(function (r) { return !month || U.monthOf(r.date) === month; })
        .filter(function (r) { return U.matches(r.description, search); })
        .sort(function (a, b) { return U.compare(a, b, s.key, s.dir); });
    },

    render: function () {
      var rows = Expenses.filtered();
      U.$('#expCount').textContent = rows.length;
      U.$('#expTotal').textContent = U.money(
        rows.reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0)
      );
      UI.markSortedHeader('#tblExpenses', state.sort.expenses);

      var body = U.$('#expBody');
      if (!rows.length) {
        body.innerHTML = '<tr><td colspan="5" class="empty">No expenses yet.</td></tr>';
        return;
      }

      body.innerHTML = rows.map(function (r) {
        return '<tr>' +
          '<td>' + U.dateBR(r.date) + '</td>' +
          '<td><span class="badge cat">' + U.esc(r.category) + '</span></td>' +
          '<td>' + U.esc(r.description) + '</td>' +
          '<td class="num">' + U.money(r.amount) + '</td>' +
          '<td class="actions">' +
            '<button class="icon-btn" title="Edit" data-edit-expense="' + r.id + '">✏️</button>' +
            '<button class="icon-btn del" title="Delete" data-del-expense="' + r.id + '">🗑️</button>' +
          '</td>' +
        '</tr>';
      }).join('');
    },

    byId: function (id) {
      for (var i = 0; i < state.expenses.length; i++) {
        if (state.expenses[i].id === id) return state.expenses[i];
      }
      return null;
    },

    openModal: function (recordId) {
      state.editing.expense = recordId || null;
      var r = recordId ? Expenses.byId(recordId) : null;

      UI.fillSelect(U.$('#eCategory'), EXPENSE_CATEGORIES);

      U.$('#expenseTitle').textContent = r ? 'Edit expense' : 'Add expense';
      U.$('#eDate').value        = r ? r.date : U.today();
      U.$('#eAmount').value      = r ? r.amount : '';
      U.$('#eCategory').value    = r ? r.category : EXPENSE_CATEGORIES[0];
      U.$('#eDescription').value = r ? r.description : '';

      UI.openModal('ovExpense');
      U.$('#eAmount').focus();
    },

    save: function () {
      var date        = U.$('#eDate').value;
      var amount      = Number(U.$('#eAmount').value);
      var description = U.$('#eDescription').value.trim();

      if (!date) { alert('Please choose a date.'); return; }
      if (!amount || amount <= 0) { alert('Please enter an amount.'); return; }
      if (!description) { alert('Please enter a description.'); return; }

      var payload = {
        date: date, category: U.$('#eCategory').value,
        description: description, amount: amount
      };

      if (state.editing.expense) {
        var r = Expenses.byId(state.editing.expense);
        if (r) Object.assign(r, payload);
      } else {
        payload.id = U.uid();
        state.expenses.push(payload);
      }

      if (!Data.saveExpenses()) { UI.toast(MSG_SAVE_FAIL); return; }
      UI.closeModals();
      App.renderAll();
      UI.toast('Expense saved');
    },

    remove: function (id) {
      var r = Expenses.byId(id);
      if (!r) return;
      if (!confirm('Delete "' + r.description + '" (' + U.money(r.amount) + ')?')) return;
      state.expenses = state.expenses.filter(function (x) { return x.id !== id; });
      if (!Data.saveExpenses()) { UI.toast(MSG_SAVE_FAIL); return; }
      App.renderAll();
      UI.toast('Expense deleted');
    }
  };

  /* ======================================================================
     13. REPORTS (Chart.js)
     ====================================================================== */

  var Reports = {
    palette: ['#166581', '#4E3768', '#D86375', '#F31CB6', '#121F39',
              '#0d9488', '#b45309', '#7c3aed'],

    availableYears: function () {
      var years = {};
      years[new Date().getFullYear()] = true;
      state.income.forEach(function (r) { years[String(r.date).slice(0, 4)] = true; });
      state.expenses.forEach(function (r) { years[String(r.date).slice(0, 4)] = true; });
      return Object.keys(years).sort().reverse();
    },

    /** Monthly income, expenses, profit and engine-forecast for a year. */
    yearSeries: function (year) {
      var income = new Array(12).fill(0);
      var expenses = new Array(12).fill(0);
      var forecast = new Array(12).fill(0);

      state.income.forEach(function (r) {
        if (String(r.date).slice(0, 4) === String(year)) {
          income[Number(String(r.date).slice(5, 7)) - 1] += Number(r.amount) || 0;
        }
      });
      state.expenses.forEach(function (r) {
        if (String(r.date).slice(0, 4) === String(year)) {
          expenses[Number(String(r.date).slice(5, 7)) - 1] += Number(r.amount) || 0;
        }
      });

      // Forecast comes straight from the billing engine.
      for (var m = 0; m < 12; m++) {
        var ym = year + '-' + U.pad(m + 1);
        forecast[m] = state.students.reduce(function (s, stu) {
          var b = Data.billingOf(stu.id);
          return s + (BillingEngine.isConfigured(b)
            ? BillingEngine.expectedForMonth(b, ym, stu.id) : 0);
        }, 0);
      }

      return {
        income: income,
        expenses: expenses,
        forecast: forecast,
        profit: income.map(function (v, i) { return v - expenses[i]; })
      };
    },

    byCategory: function (year) {
      var totals = {};
      EXPENSE_CATEGORIES.forEach(function (c) { totals[c] = 0; });
      state.expenses.forEach(function (r) {
        if (String(r.date).slice(0, 4) === String(year)) {
          totals[r.category] = (totals[r.category] || 0) + (Number(r.amount) || 0);
        }
      });
      var labels = [], values = [];
      Object.keys(totals).forEach(function (c) {
        if (totals[c] > 0) { labels.push(c); values.push(totals[c]); }
      });
      return { labels: labels, values: values };
    },

    render: function () {
      if (typeof Chart === 'undefined') return; // CDN unavailable — fail quietly

      var year = U.$('#repYear').value || String(new Date().getFullYear());
      var series = Reports.yearSeries(year);
      var cat = Reports.byCategory(year);

      var baseOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (c) {
                var v = c.parsed.y != null ? c.parsed.y : c.parsed;
                return (c.dataset.label ? c.dataset.label + ': ' : '') + U.money(v);
              }
            }
          }
        },
        scales: { y: { beginAtZero: true, ticks: { callback: function (v) { return 'R$ ' + v; } } } }
      };

      Object.keys(state.charts).forEach(function (k) {
        if (state.charts[k]) { state.charts[k].destroy(); state.charts[k] = null; }
      });

      // Received vs forecast — the engine's prediction against reality.
      state.charts.income = new Chart(U.$('#chartIncome'), {
        type: 'bar',
        data: {
          labels: MONTH_NAMES,
          datasets: [
            { label: 'Received', data: series.income, backgroundColor: '#166581', borderRadius: 6 },
            { label: 'Forecast', data: series.forecast, backgroundColor: '#cbd5e1', borderRadius: 6 }
          ]
        },
        options: Object.assign({}, baseOpts, {
          plugins: Object.assign({}, baseOpts.plugins, {
            legend: { display: true, labels: { boxWidth: 12, font: { size: 12 } } }
          })
        })
      });

      state.charts.category = new Chart(U.$('#chartCategory'), {
        type: 'doughnut',
        data: {
          labels: cat.labels.length ? cat.labels : ['No expenses yet'],
          datasets: [{
            data: cat.values.length ? cat.values : [1],
            backgroundColor: cat.values.length ? Reports.palette : ['#e2e8f0'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { boxWidth: 12, font: { size: 12 } } },
            tooltip: {
              callbacks: { label: function (c) { return c.label + ': ' + U.money(c.parsed); } }
            }
          }
        }
      });

      state.charts.profit = new Chart(U.$('#chartProfit'), {
        type: 'bar',
        data: {
          labels: MONTH_NAMES,
          datasets: [{
            data: series.profit,
            backgroundColor: series.profit.map(function (v) {
              return v >= 0 ? '#0d9488' : '#b91c1c';
            }),
            borderRadius: 6
          }]
        },
        options: baseOpts
      });
    }
  };

  /* ======================================================================
     14. EXPORT — CSV and PDF
     ====================================================================== */

  var Export = {
    toCsv: function (matrix) {
      return matrix.map(function (row) {
        return row.map(function (cell) {
          var s = String(cell == null ? '' : cell);
          return /[";\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
        }).join(';');
      }).join('\n');
    },

    download: function (filename, content, mime) {
      var blob = new Blob(['﻿' + content], { type: mime + ';charset=utf-8;' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    },

    csv: function () {
      var ym = state.refMonth;
      var t = Rules.totals(ym);
      var m = [];

      m.push(['Teacher Lu Platform — Finance']);
      m.push(['Reference month', U.monthLabel(ym)]);
      m.push(['Generated', U.dateBR(U.today())]);
      m.push([]);

      m.push(['SUMMARY']);
      m.push(['Received', t.received]);
      m.push(['Expected', t.expected]);
      m.push(['Pending', t.pending]);
      m.push(['Overdue', t.overdueAmount]);
      m.push(['Overdue rate (%)', t.defaultRate]);
      m.push(['Expenses', t.expenses]);
      m.push(['Net profit', t.profit]);
      m.push([]);

      m.push(['BILLING PLANS']);
      m.push(['Name', 'Type', 'Plan', 'Expected this month', 'Next due', 'Status']);
      Students.rows().forEach(function (r) {
        m.push([r.name, r.type, r.plan, r.expected || '',
                r.nextDue ? U.dateBR(r.nextDue) : '', Rules.statusLabel(r.status)]);
      });
      m.push([]);

      m.push(['INCOME — ' + U.monthLabel(ym)]);
      m.push(['Date', 'Student', 'Amount', 'Method', 'Notes']);
      Data.incomeOfMonth(ym).forEach(function (r) {
        m.push([U.dateBR(r.date), r.studentName, r.amount, r.method, r.notes]);
      });
      m.push([]);

      m.push(['EXPENSES — ' + U.monthLabel(ym)]);
      m.push(['Date', 'Category', 'Description', 'Amount']);
      Data.expensesOfMonth(ym).forEach(function (r) {
        m.push([U.dateBR(r.date), r.category, r.description, r.amount]);
      });

      Export.download('finance-' + ym + '.csv', Export.toCsv(m), 'text/csv');
      UI.toast('CSV exported');
    },

    /**
     * PDF via the browser print dialog ("Save as PDF").
     * Dependency-free, works offline and always matches the screen.
     */
    pdf: function () { window.print(); }
  };

  /* ======================================================================
     15. APP — wiring and initialisation
     ====================================================================== */

  var App = {
    renderAll: function () {
      Dashboard.render();
      Students.render();
      Income.render();
      Expenses.render();
      Reports.render();
    },

    switchTab: function (name) {
      U.$$('.tab').forEach(function (t) {
        t.classList.toggle('active', t.getAttribute('data-panel') === name);
      });
      U.$$('.panel').forEach(function (p) {
        p.classList.toggle('active', p.id === 'panel-' + name);
      });
      if (name === 'reports') Reports.render();
    },

    initFilters: function () {
      U.$('#dashMonth').value = state.refMonth;

      UI.fillSelect(U.$('#incStudent'), state.students.map(function (s) {
        return { value: s.id, label: s.name };
      }), 'All students');
      UI.fillSelect(U.$('#incMethod'), PAYMENT_METHODS, 'All methods');
      UI.fillSelect(U.$('#expCategory'), EXPENSE_CATEGORIES, 'All categories');
      UI.fillSelect(U.$('#stuType'), BILLING_TYPES.map(function (t) {
        return { value: t.id, label: t.label };
      }), 'All plan types');

      var years = Reports.availableYears();
      UI.fillSelect(U.$('#repYear'), years);
      U.$('#repYear').value = years[0];
    },

    bindEvents: function () {
      // tabs
      U.$$('.tab').forEach(function (t) {
        t.addEventListener('click', function () {
          App.switchTab(t.getAttribute('data-panel'));
        });
      });

      // reference month
      U.$('#dashMonth').addEventListener('change', function () {
        state.refMonth = this.value || U.thisMonth();
        App.renderAll();
      });

      // add buttons
      U.$('#btnAddBilling').addEventListener('click', function () { Students.openModal(); });
      U.$('#btnAddIncome').addEventListener('click', function () { Income.openModal(); });
      U.$('#btnAddExpense').addEventListener('click', function () { Expenses.openModal(); });

      // modal saves
      U.$('#bSave').addEventListener('click', Students.save);
      U.$('#iSave').addEventListener('click', Income.save);
      U.$('#eSave').addEventListener('click', Expenses.save);

      // billing modal: type switch + live preview
      U.$('#bType').addEventListener('change', Students.syncFields);
      ['#bAmount', '#bDueDay', '#bCustomDay', '#bWeekday', '#bAnchorDate',
       '#bLessonSource', '#bLessonsPerMonth', '#bLessonsTotal', '#bLessonsUsed',
       '#bDiscountType', '#bDiscountValue', '#bLateFeeType', '#bLateFeeValue',
       '#bInterest', '#bGraceDays'].forEach(function (sel) {
        U.$(sel).addEventListener('input', Students.preview);
      });
      U.$('#bAdvancedToggle').addEventListener('click', function () {
        U.$('#bAdvanced').classList.toggle('open');
      });

      // export
      U.$('#btnExportCsv').addEventListener('click', Export.csv);
      U.$('#btnExportPdf').addEventListener('click', Export.pdf);

      // live filters
      ['#stuSearch', '#stuStatus', '#stuType'].forEach(function (sel) {
        U.$(sel).addEventListener('input', Students.render);
      });
      ['#incSearch', '#incStudent', '#incMethod', '#incMonth'].forEach(function (sel) {
        U.$(sel).addEventListener('input', Income.render);
      });
      ['#expSearch', '#expCategory', '#expMonth'].forEach(function (sel) {
        U.$(sel).addEventListener('input', Expenses.render);
      });
      U.$('#incClear').addEventListener('click', function () {
        U.$('#incSearch').value = ''; U.$('#incStudent').value = '';
        U.$('#incMethod').value = ''; U.$('#incMonth').value = '';
        Income.render();
      });
      U.$('#expClear').addEventListener('click', function () {
        U.$('#expSearch').value = ''; U.$('#expCategory').value = '';
        U.$('#expMonth').value = '';
        Expenses.render();
      });

      U.$('#repYear').addEventListener('change', Reports.render);

      // sortable headers
      UI.bindSort('#tblStudents', 'students', Students.render);
      UI.bindSort('#tblIncome', 'income', Income.render);
      UI.bindSort('#tblExpenses', 'expenses', Expenses.render);

      // delegated row actions
      document.addEventListener('click', function (e) {
        var el = e.target.closest('[data-quick-pay],[data-edit-billing],[data-del-billing],' +
          '[data-edit-income],[data-del-income],[data-edit-expense],[data-del-expense]');
        if (!el) return;
        if (el.hasAttribute('data-quick-pay'))    Dashboard.quickPay(el.getAttribute('data-quick-pay'));
        if (el.hasAttribute('data-edit-billing')) Students.openModal(el.getAttribute('data-edit-billing'));
        if (el.hasAttribute('data-del-billing'))  Students.remove(el.getAttribute('data-del-billing'));
        if (el.hasAttribute('data-edit-income'))  Income.openModal(el.getAttribute('data-edit-income'));
        if (el.hasAttribute('data-del-income'))   Income.remove(el.getAttribute('data-del-income'));
        if (el.hasAttribute('data-edit-expense')) Expenses.openModal(el.getAttribute('data-edit-expense'));
        if (el.hasAttribute('data-del-expense'))  Expenses.remove(el.getAttribute('data-del-expense'));
      });

      // modal dismissal
      U.$$('.ov').forEach(function (ov) {
        ov.addEventListener('click', function (e) { if (e.target === ov) UI.closeModals(); });
      });
      U.$$('[data-close]').forEach(function (b) {
        b.addEventListener('click', UI.closeModals);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') UI.closeModals();
      });

      // keep in sync with the Students module in another tab
      window.addEventListener('storage', function (e) {
        if (e.key === KEYS.students) {
          Data.loadAll();
          App.initFilters();
          App.renderAll();
        }
      });
    },

    /**
     * Wire the Lesson Calendar into the billing engine.
     *
     * This is the ONLY place in Finance that mentions the calendar. The
     * engine receives a plain function and never learns where the lessons
     * come from — swap the service here and nothing else changes.
     * If the service is not loaded, the engine simply falls back to the
     * manual forecast.
     */
    connectCalendar: function () {
      var cal = window.TeacherLu && window.TeacherLu.Calendar;
      if (!cal) {
        console.info('[finance] calendar service not loaded — using manual forecasts.');
        return;
      }

      BillingEngine.setLessonProvider(function (studentId, month) {
        var student = Data.studentById(studentId);
        if (!student) return null;
        // No record at all for this student: let the engine forecast instead
        // of pretending the month had zero lessons.
        if (!cal.hasData(student)) return null;
        return {
          dates: cal.lessonsDone(student, month).map(function (l) { return l.date; })
        };
      });
    },

    /** Small banner telling which source the per-lesson plans are using. */
    renderCalendarStatus: function () {
      var el = U.$('#calendarStatus');
      if (!el) return;
      var cal = window.TeacherLu && window.TeacherLu.Calendar;
      var connected = !!cal && cal.isAvailable();
      el.innerHTML = connected
        ? '<span class="badge plan">Calendar connected</span> ' +
          '<span class="hint">Per-lesson plans count the lessons marked as done in the ' +
          '<a href="schedule.html">Lesson Calendar</a>.</span>'
        : '<span class="badge none">Calendar empty</span> ' +
          '<span class="hint">Per-lesson plans use your manual forecast until lessons are ' +
          'marked in the <a href="schedule.html">Lesson Calendar</a>.</span>';
    },

    init: function () {
      Data.loadAll();
      App.connectCalendar();
      App.initFilters();
      App.bindEvents();
      App.renderCalendarStatus();
      App.renderAll();
    }
  };

  // Exposed for debugging in the console (read-only use).
  window.FinanceEngine = BillingEngine;

  document.addEventListener('DOMContentLoaded', App.init);
})();
