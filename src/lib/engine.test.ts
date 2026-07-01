import { describe, it, expect } from 'vitest';
import {
  calculateSV,
  calculateIncomeTax,
  calculateSonderzahlungen,
  calculateSalary,
  getAVRate,
} from './engine';
import {
  KV_RATE,
  PV_RATE,
  SV_CEILING_MONTHLY,
  VERKEHRSABSETZBETRAG,
} from './baremes-2026';

// Helper: round to 2 decimals
const r2 = (n: number) => Math.round(n * 100) / 100;

describe('getAVRate', () => {
  it('should return 0% for income <= 2,093', () => {
    expect(getAVRate(2000)).toBe(0);
    expect(getAVRate(2093)).toBe(0);
  });

  it('should return 1% for income 2,094 - 2,282', () => {
    expect(getAVRate(2200)).toBe(0.01);
    expect(getAVRate(2282)).toBe(0.01);
  });

  it('should return 2% for income 2,283 - 2,471', () => {
    expect(getAVRate(2400)).toBe(0.02);
    expect(getAVRate(2471)).toBe(0.02);
  });

  it('should return 3% for income > 2,471', () => {
    expect(getAVRate(3000)).toBe(0.03);
    expect(getAVRate(5000)).toBe(0.03);
  });
});

describe('calculateSV', () => {
  it('should calculate SV for a typical salary of 3,000€', () => {
    const sv = calculateSV(3000);
    expect(sv.kv).toBe(r2(3000 * KV_RATE));
    expect(sv.pv).toBe(r2(3000 * PV_RATE));
    expect(sv.av).toBe(r2(3000 * 0.03));
    expect(sv.total).toBe(r2(sv.kv + sv.pv + sv.av));
  });

  it('should cap SV at the ceiling (Höchstbeitragsgrundlage)', () => {
    const svAtCeiling = calculateSV(SV_CEILING_MONTHLY);
    const svAboveCeiling = calculateSV(10_000);
    expect(svAboveCeiling.kv).toBe(svAtCeiling.kv);
    expect(svAboveCeiling.pv).toBe(svAtCeiling.pv);
    // Note: AV rate might differ but basis is capped
    expect(svAboveCeiling.kv).toBe(r2(SV_CEILING_MONTHLY * KV_RATE));
    expect(svAboveCeiling.pv).toBe(r2(SV_CEILING_MONTHLY * PV_RATE));
  });

  it('should return 0 SV for 0 income', () => {
    const sv = calculateSV(0);
    expect(sv.total).toBe(0);
  });

  it('should use 0% AV for low income', () => {
    const sv = calculateSV(1500);
    expect(sv.av).toBe(0);
  });
});

describe('calculateIncomeTax', () => {
  it('should return 0 tax for income below 12,816€', () => {
    expect(calculateIncomeTax(10_000)).toBe(0);
    expect(calculateIncomeTax(12_816)).toBe(0);
  });

  it('should tax 20% in the second bracket', () => {
    // Exactly 15,000: tax = (15000 - 12816) * 0.20 = 2184 * 0.20 = 436.80
    expect(calculateIncomeTax(15_000)).toBe(436.80);
  });

  it('should correctly calculate tax across multiple brackets', () => {
    // 40,000€:
    // 0-12816: 0
    // 12816-20818: (20818-12816) * 0.20 = 8002 * 0.20 = 1600.40
    // 20818-34513: (34513-20818) * 0.30 = 13695 * 0.30 = 4108.50
    // 34513-40000: (40000-34513) * 0.40 = 5487 * 0.40 = 2194.80
    // Total: 1600.40 + 4108.50 + 2194.80 = 7903.70
    expect(calculateIncomeTax(40_000)).toBe(7903.70);
  });

  it('should handle the 48% bracket', () => {
    // 80,000€:
    // 0-12816: 0
    // 12816-20818: 8002 * 0.20 = 1600.40
    // 20818-34513: 13695 * 0.30 = 4108.50
    // 34513-66612: 32099 * 0.40 = 12839.60
    // 66612-80000: 13388 * 0.48 = 6426.24
    // Total: 1600.40 + 4108.50 + 12839.60 + 6426.24 = 24974.74
    expect(calculateIncomeTax(80_000)).toBe(24974.74);
  });

  it('should return 0 for negative income', () => {
    expect(calculateIncomeTax(-5000)).toBe(0);
  });

  it('should handle the 50% bracket', () => {
    const tax100k = calculateIncomeTax(100_000);
    expect(tax100k).toBeGreaterThan(0);
    // Verify it includes contributions from the 50% bracket
    // 99266-100000: 734 * 0.50 = 367
    const taxAt99266 = calculateIncomeTax(99_266);
    expect(r2(tax100k - taxAt99266)).toBe(367);
  });

  it('should handle the 55% bracket for millionaires', () => {
    const tax1_1M = calculateIncomeTax(1_100_000);
    const tax1M = calculateIncomeTax(1_000_000);
    // (1100000 - 1000000) * 0.55 = 55000
    expect(r2(tax1_1M - tax1M)).toBe(55000);
  });
});

describe('calculateSonderzahlungen', () => {
  it('should calculate 6% flat tax on Sonderzahlungen', () => {
    const sz = calculateSonderzahlungen(3000);
    expect(sz.grossPerPayment).toBe(3000);
    expect(sz.svPerPayment).toBeGreaterThan(0);
    expect(sz.taxPerPayment).toBeGreaterThan(0);
    expect(sz.netPerPayment).toBe(r2(3000 - sz.svPerPayment - sz.taxPerPayment));
    expect(sz.annualNet).toBe(r2(sz.netPerPayment * 2));
  });

  it('should apply the Freibetrag of 620€', () => {
    const sz = calculateSonderzahlungen(3000);
    const svPerPayment = sz.svPerPayment;
    const expectedTaxBasis = 3000 - svPerPayment - 620;
    const expectedTax = r2(expectedTaxBasis * 0.06);
    expect(sz.taxPerPayment).toBe(expectedTax);
  });

  it('should handle Sonderzahlungen above SV ceiling', () => {
    const sz = calculateSonderzahlungen(8000);
    // SV should be capped at ceiling
    const svBasis = SV_CEILING_MONTHLY;
    const expectedKV = r2(svBasis * KV_RATE);
    const expectedPV = r2(svBasis * PV_RATE);
    const expectedAV = r2(svBasis * 0.03);
    expect(sz.svPerPayment).toBe(r2(expectedKV + expectedPV + expectedAV));
  });
});

describe('calculateSalary — full pipeline', () => {
  it('should calculate net salary for a typical 3,000€ gross', () => {
    const result = calculateSalary({
      grossMonthly: 3000,
      children: 0,
      alleinverdiener: false,
      familienbonus: false,
    });

    expect(result.grossMonthly).toBe(3000);
    expect(result.grossAnnual).toBe(42000); // 14 months
    expect(result.svMonthly.total).toBeGreaterThan(0);
    expect(result.netMonthly).toBeGreaterThan(0);
    expect(result.netMonthly).toBeLessThan(3000);
    expect(result.netAnnual).toBeGreaterThan(0);
    expect(result.effectiveTaxRate).toBeGreaterThan(0);
    expect(result.effectiveTaxRate).toBeLessThan(1);
  });

  it('should include Verkehrsabsetzbetrag', () => {
    const result = calculateSalary({
      grossMonthly: 3000,
      children: 0,
      alleinverdiener: false,
      familienbonus: false,
    });

    expect(result.taxCreditsAnnual).toBe(VERKEHRSABSETZBETRAG);
  });

  it('should apply Familienbonus Plus for children', () => {
    const withoutKids = calculateSalary({
      grossMonthly: 4000,
      children: 0,
      alleinverdiener: false,
      familienbonus: false,
    });

    const withKids = calculateSalary({
      grossMonthly: 4000,
      children: 2,
      alleinverdiener: false,
      familienbonus: true,
    });

    // With Familienbonus, net should be higher
    expect(withKids.netAnnual).toBeGreaterThan(withoutKids.netAnnual);
    // Tax credits should include 2 * 2000 = 4000 more
    expect(withKids.taxCreditsAnnual - withoutKids.taxCreditsAnnual).toBe(4000);
  });

  it('should apply Alleinverdienerabsetzbetrag', () => {
    const normal = calculateSalary({
      grossMonthly: 4000,
      children: 1,
      alleinverdiener: false,
      familienbonus: false,
    });

    const alleinverdiener = calculateSalary({
      grossMonthly: 4000,
      children: 1,
      alleinverdiener: true,
      familienbonus: false,
    });

    expect(alleinverdiener.netAnnual).toBeGreaterThan(normal.netAnnual);
  });

  it('should handle 0€ gross salary', () => {
    const result = calculateSalary({
      grossMonthly: 0,
      children: 0,
      alleinverdiener: false,
      familienbonus: false,
    });

    expect(result.netMonthly).toBe(0);
    expect(result.netAnnual).toBe(-12.95); // Only E-Card fee
    expect(result.svMonthly.total).toBe(0);
  });

  it('should handle very high salary with SV ceiling', () => {
    const result = calculateSalary({
      grossMonthly: 10_000,
      children: 0,
      alleinverdiener: false,
      familienbonus: false,
    });

    // SV should be capped
    const svAtCeiling = calculateSV(SV_CEILING_MONTHLY);
    expect(result.svMonthly.kv).toBe(svAtCeiling.kv);
    expect(result.svMonthly.pv).toBe(svAtCeiling.pv);
    expect(result.effectiveTaxRate).toBeGreaterThan(0.3);
  });

  it('should include E-Card Gebühr', () => {
    const result = calculateSalary({
      grossMonthly: 3000,
      children: 0,
      alleinverdiener: false,
      familienbonus: false,
    });
    expect(result.ecardGebuehr).toBe(12.95);
  });

  it('should produce 14-month gross annual', () => {
    const result = calculateSalary({
      grossMonthly: 2500,
      children: 0,
      alleinverdiener: false,
      familienbonus: false,
    });
    expect(result.grossAnnual).toBe(2500 * 14);
  });
});
