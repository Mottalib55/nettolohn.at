/**
 * Österreichischer Gehaltsrechner — Brutto-Netto-Engine
 * Berechnung nach österreichischem Steuer- und Sozialversicherungsrecht 2026
 */

import {
  TAX_BRACKETS,
  KV_RATE,
  PV_RATE,
  AV_TIERS,
  SV_CEILING_MONTHLY,
  SONDERZAHLUNG_TAX_RATE,
  SONDERZAHLUNG_FREIBETRAG,
  VERKEHRSABSETZBETRAG,
  getAlleinverdienerabsetzbetrag,
  FAMILIENBONUS_UNDER_18,
  ECARD_GEBUEHR,
} from './baremes-2026';

// --- Types ---

export interface SalaryInput {
  /** Monatliches Bruttogehalt */
  grossMonthly: number;
  /** Anzahl der Kinder (unter 18) */
  children: number;
  /** Alleinverdiener/Alleinerzieher */
  alleinverdiener: boolean;
  /** Pendlerpauschale pro Jahr (optional) */
  pendlerpauschale?: number;
  /** Familienbonus Plus aktiv */
  familienbonus: boolean;
}

export interface SVBreakdown {
  /** Krankenversicherung */
  kv: number;
  /** Pensionsversicherung */
  pv: number;
  /** Arbeitslosenversicherung */
  av: number;
  /** Gesamt-SV monatlich */
  total: number;
}

export interface SonderzahlungResult {
  /** Brutto pro Sonderzahlung */
  grossPerPayment: number;
  /** SV auf Sonderzahlung */
  svPerPayment: number;
  /** Steuer auf Sonderzahlung (6% pauschal) */
  taxPerPayment: number;
  /** Netto pro Sonderzahlung */
  netPerPayment: number;
  /** Jahres-Netto aus beiden Sonderzahlungen */
  annualNet: number;
}

export interface SalaryResult {
  // Monatlich
  grossMonthly: number;
  svMonthly: SVBreakdown;
  taxableMonthly: number;
  incomeTaxMonthly: number;
  netMonthly: number;

  // Jährlich
  grossAnnual: number;
  svAnnual: number;
  taxableAnnual: number;
  incomeTaxAnnual: number;
  taxCreditsAnnual: number;
  netAnnual: number;

  // Sonderzahlungen
  sonderzahlungen: SonderzahlungResult;

  // Effektiver Steuersatz
  effectiveTaxRate: number;

  // E-Card
  ecardGebuehr: number;
}

// --- Calculation Functions ---

/**
 * Berechnet den AV-Satz basierend auf dem monatlichen Brutto
 */
export function getAVRate(grossMonthly: number): number {
  for (const tier of AV_TIERS) {
    if (grossMonthly <= tier.upTo) {
      return tier.rate;
    }
  }
  return 0.03;
}

/**
 * Berechnet die monatlichen Sozialversicherungsbeiträge (Arbeitnehmeranteil)
 * mit Berücksichtigung der Höchstbeitragsgrundlage
 */
export function calculateSV(grossMonthly: number): SVBreakdown {
  const basis = Math.min(grossMonthly, SV_CEILING_MONTHLY);

  const kv = Math.round(basis * KV_RATE * 100) / 100;
  const pv = Math.round(basis * PV_RATE * 100) / 100;
  const avRate = getAVRate(grossMonthly);
  const av = Math.round(basis * avRate * 100) / 100;
  const total = Math.round((kv + pv + av) * 100) / 100;

  return { kv, pv, av, total };
}

/**
 * Berechnet die Einkommensteuer nach den progressiven Tarifstufen
 * @param annualTaxableIncome Jährliches zu versteuerndes Einkommen
 * @returns Jährliche Einkommensteuer (vor Absetzbeträgen)
 */
export function calculateIncomeTax(annualTaxableIncome: number): number {
  if (annualTaxableIncome <= 0) return 0;

  let tax = 0;

  for (const bracket of TAX_BRACKETS) {
    if (annualTaxableIncome <= bracket.from) break;

    const taxableInBracket = Math.min(annualTaxableIncome, bracket.to) - bracket.from;
    tax += taxableInBracket * bracket.rate;
  }

  return Math.round(tax * 100) / 100;
}

/**
 * Berechnet die Sonderzahlungen (13. und 14. Monatsgehalt)
 * Pauschalbesteuerung mit 6% nach Abzug des Freibetrags
 */
export function calculateSonderzahlungen(grossMonthly: number): SonderzahlungResult {
  const grossPerPayment = grossMonthly;

  // SV auch auf Sonderzahlungen (mit Deckelung)
  const svBasis = Math.min(grossMonthly, SV_CEILING_MONTHLY);
  const svPerPayment = Math.round(svBasis * (KV_RATE + PV_RATE + getAVRate(grossMonthly)) * 100) / 100;

  // Steuerbasis: Brutto - SV - Freibetrag
  const taxBasis = Math.max(0, grossPerPayment - svPerPayment - SONDERZAHLUNG_FREIBETRAG);
  const taxPerPayment = Math.round(taxBasis * SONDERZAHLUNG_TAX_RATE * 100) / 100;

  const netPerPayment = Math.round((grossPerPayment - svPerPayment - taxPerPayment) * 100) / 100;
  const annualNet = Math.round(netPerPayment * 2 * 100) / 100;

  return {
    grossPerPayment,
    svPerPayment,
    taxPerPayment,
    netPerPayment,
    annualNet,
  };
}

/**
 * Hauptberechnung: Brutto → Netto
 */
export function calculateSalary(input: SalaryInput): SalaryResult {
  const { grossMonthly, children, alleinverdiener, pendlerpauschale = 0, familienbonus } = input;

  // --- Monatliche SV ---
  const svMonthly = calculateSV(grossMonthly);

  // --- Jährliches Brutto (12 Monate regulär) ---
  const grossAnnual12 = grossMonthly * 12;

  // --- Jährliche SV (12 reguläre Monate) ---
  const svAnnual12 = Math.round(svMonthly.total * 12 * 100) / 100;

  // --- Zu versteuerndes Jahreseinkommen (laufende Bezüge) ---
  // Brutto 12x minus SV 12x minus Pendlerpauschale
  const taxableAnnual = Math.max(0, grossAnnual12 - svAnnual12 - pendlerpauschale);

  // --- Einkommensteuer ---
  let incomeTaxAnnual = calculateIncomeTax(taxableAnnual);

  // --- Absetzbeträge ---
  let taxCredits = VERKEHRSABSETZBETRAG;

  // Alleinverdienerabsetzbetrag
  if (alleinverdiener && children > 0) {
    taxCredits += getAlleinverdienerabsetzbetrag(children);
  }

  // Familienbonus Plus
  if (familienbonus && children > 0) {
    taxCredits += children * FAMILIENBONUS_UNDER_18;
  }

  // Steuer nach Absetzbeträgen (kann nicht unter 0 fallen, außer bei Negativsteuer für Geringverdiener)
  incomeTaxAnnual = Math.max(0, incomeTaxAnnual - taxCredits);

  // --- Monatliche Lohnsteuer (1/12 der Jahressteuer) ---
  const incomeTaxMonthly = Math.round(incomeTaxAnnual / 12 * 100) / 100;

  // --- Monatlich steuerpflichtiges Einkommen ---
  const taxableMonthly = Math.round(taxableAnnual / 12 * 100) / 100;

  // --- Monatliches Netto ---
  const netMonthly = Math.round((grossMonthly - svMonthly.total - incomeTaxMonthly) * 100) / 100;

  // --- Sonderzahlungen ---
  const sonderzahlungen = calculateSonderzahlungen(grossMonthly);

  // --- Jährliches Gesamt ---
  // SV: 14 Monate
  const svSonderzahlungen = sonderzahlungen.svPerPayment * 2;
  const svAnnualTotal = Math.round((svAnnual12 + svSonderzahlungen) * 100) / 100;

  // Steuer Sonderzahlungen
  const taxSonderzahlungen = sonderzahlungen.taxPerPayment * 2;

  // Gesamtes Jahresbrutto (14 Gehälter)
  const grossAnnualTotal = grossMonthly * 14;

  // Gesamte Jahressteuer
  const totalTaxAnnual = Math.round((incomeTaxAnnual + taxSonderzahlungen) * 100) / 100;

  // Jahresnetto
  const netAnnual = Math.round((grossAnnualTotal - svAnnualTotal - totalTaxAnnual - ECARD_GEBUEHR) * 100) / 100;

  // Effektiver Steuersatz (Gesamtabgaben / Brutto)
  const totalDeductions = svAnnualTotal + totalTaxAnnual + ECARD_GEBUEHR;
  const effectiveTaxRate = grossAnnualTotal > 0
    ? Math.round(totalDeductions / grossAnnualTotal * 10000) / 10000
    : 0;

  return {
    grossMonthly,
    svMonthly,
    taxableMonthly,
    incomeTaxMonthly,
    netMonthly,

    grossAnnual: grossAnnualTotal,
    svAnnual: svAnnualTotal,
    taxableAnnual,
    incomeTaxAnnual: totalTaxAnnual,
    taxCreditsAnnual: taxCredits,
    netAnnual,

    sonderzahlungen,
    effectiveTaxRate,
    ecardGebuehr: ECARD_GEBUEHR,
  };
}
