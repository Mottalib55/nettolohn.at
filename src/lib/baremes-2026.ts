/**
 * Österreichische Steuer- und Sozialversicherungsdaten 2026
 * Quellen: BMF.gv.at, Sozialversicherung.at
 */

// --- Einkommensteuer-Tarifstufen 2026 ---
export interface TaxBracket {
  /** Untere Grenze (inklusiv) */
  from: number;
  /** Obere Grenze (exklusiv, Infinity für letzte Stufe) */
  to: number;
  /** Steuersatz in Dezimal */
  rate: number;
}

export const TAX_BRACKETS: TaxBracket[] = [
  { from: 0,         to: 12_816,      rate: 0.00 },
  { from: 12_816,    to: 20_818,      rate: 0.20 },
  { from: 20_818,    to: 34_513,      rate: 0.30 },
  { from: 34_513,    to: 66_612,      rate: 0.40 },
  { from: 66_612,    to: 99_266,      rate: 0.48 },
  { from: 99_266,    to: 1_000_000,   rate: 0.50 },
  { from: 1_000_000, to: Infinity,    rate: 0.55 },
];

// --- Sozialversicherung (SV) — Arbeitnehmeranteile ---
/** Krankenversicherung (KV) — Arbeitnehmeranteil */
export const KV_RATE = 0.0387;

/** Pensionsversicherung (PV) — Arbeitnehmeranteil */
export const PV_RATE = 0.1025;

/**
 * Arbeitslosenversicherung (AV) — gestaffelt nach Einkommen
 * Monatliche Brutto-Grenzen und zugehörige Sätze
 */
export interface AVTier {
  /** Bis zu diesem monatlichen Brutto (inklusiv) */
  upTo: number;
  /** AV-Satz */
  rate: number;
}

export const AV_TIERS: AVTier[] = [
  { upTo: 2_093,   rate: 0.00 },
  { upTo: 2_282,   rate: 0.01 },
  { upTo: 2_471,   rate: 0.02 },
  { upTo: Infinity, rate: 0.03 },
];

/** Unfallversicherung — 0% für Arbeitnehmer (Arbeitgeber zahlt 1,1%) */
export const UV_RATE_EMPLOYEE = 0.0;

/** Monatliche Höchstbeitragsgrundlage 2026 */
export const SV_CEILING_MONTHLY = 6_060;

/** Tägliche Höchstbeitragsgrundlage */
export const SV_CEILING_DAILY = 202;

// --- Sonderzahlungen (13. und 14. Gehalt) ---
/** Fester Steuersatz für Sonderzahlungen */
export const SONDERZAHLUNG_TAX_RATE = 0.06;

/** Freibetrag für Sonderzahlungen */
export const SONDERZAHLUNG_FREIBETRAG = 620;

/** Jährlicher Freibetrag für SZ-Besteuerung */
export const SONDERZAHLUNG_ANNUAL_FREIBETRAG = 2_100;

// --- Absetzbeträge ---
/** Verkehrsabsetzbetrag (jährlich) */
export const VERKEHRSABSETZBETRAG = 463;

/**
 * Alleinverdienerabsetzbetrag (jährlich)
 * Abhängig von der Anzahl der Kinder
 */
export function getAlleinverdienerabsetzbetrag(children: number): number {
  if (children === 0) return 0;
  if (children === 1) return 520;
  if (children === 2) return 704;
  // Ab 3 Kindern: 704 + 232 pro weiterem Kind
  return 704 + (children - 2) * 232;
}

// --- Familienbonus Plus ---
/** Familienbonus Plus pro Kind/Jahr (unter 18) */
export const FAMILIENBONUS_UNDER_18 = 2_000;

/** Familienbonus Plus pro Kind/Jahr (ab 18) */
export const FAMILIENBONUS_OVER_18 = 700;

// --- E-Card-Serviceentgelt ---
/** E-Card-Serviceentgelt pro Jahr */
export const ECARD_GEBUEHR = 12.95;

// --- Weitere Konstanten ---
/** Anzahl Monate für reguläres Gehalt */
export const REGULAR_MONTHS = 12;

/** Anzahl Sonderzahlungen (13. + 14.) */
export const SONDERZAHLUNGEN_COUNT = 2;

/** Gesamte Monatsgehälter pro Jahr */
export const TOTAL_MONTHS = REGULAR_MONTHS + SONDERZAHLUNGEN_COUNT;
