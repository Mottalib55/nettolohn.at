import { useState, useMemo, useCallback } from 'react';
import { calculateSalary, type SalaryResult } from '../lib/engine';

function formatCurrency(value: number): string {
  return value.toLocaleString('de-AT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatPercent(value: number): string {
  return (value * 100).toFixed(1) + ' %';
}

export default function Calculator() {
  const [grossMonthly, setGrossMonthly] = useState(3000);
  const [children, setChildren] = useState(0);
  const [alleinverdiener, setAlleinverdiener] = useState(false);
  const [familienbonus, setFamilienbonus] = useState(false);
  const [pendlerpauschale, setPendlerpauschale] = useState(0);

  const result: SalaryResult = useMemo(
    () =>
      calculateSalary({
        grossMonthly,
        children,
        alleinverdiener,
        familienbonus,
        pendlerpauschale,
      }),
    [grossMonthly, children, alleinverdiener, familienbonus, pendlerpauschale]
  );

  const handleGrossChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setGrossMonthly(isNaN(val) ? 0 : Math.max(0, val));
  }, []);

  const handleChildrenChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setChildren(parseInt(e.target.value, 10));
  }, []);

  const handlePendlerChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPendlerpauschale(parseInt(e.target.value, 10));
  }, []);

  return (
    <div className="max-w-5xl mx-auto" id="rechner">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🇦🇹</span> Brutto-Netto-Rechner
          </h2>

          {/* Bruttogehalt */}
          <div className="mb-6">
            <label htmlFor="gross" className="block text-sm font-semibold text-gray-700 mb-2">
              Monatliches Bruttogehalt
            </label>
            <div className="relative">
              <input
                id="gross"
                type="number"
                min="0"
                max="100000"
                step="50"
                value={grossMonthly}
                onChange={handleGrossChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                € / Monat
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="15000"
              step="50"
              value={grossMonthly}
              onChange={handleGrossChange}
              className="w-full mt-3 accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>€ 0</span>
              <span>€ 15.000</span>
            </div>
          </div>

          {/* Kinder */}
          <div className="mb-5">
            <label htmlFor="children" className="block text-sm font-semibold text-gray-700 mb-2">
              Anzahl der Kinder (unter 18)
            </label>
            <select
              id="children"
              value={children}
              onChange={handleChildrenChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? 'Keine Kinder' : `${n} ${n === 1 ? 'Kind' : 'Kinder'}`}
                </option>
              ))}
            </select>
          </div>

          {/* Alleinverdiener */}
          <div className="mb-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={alleinverdiener}
                onChange={(e) => setAlleinverdiener(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary accent-primary"
              />
              <div>
                <span className="text-sm font-semibold text-gray-700">Alleinverdiener/Alleinerzieher</span>
                <p className="text-xs text-gray-500">Absetzbetrag bei Kindern</p>
              </div>
            </label>
          </div>

          {/* Familienbonus */}
          <div className="mb-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={familienbonus}
                onChange={(e) => setFamilienbonus(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary accent-primary"
              />
              <div>
                <span className="text-sm font-semibold text-gray-700">Familienbonus Plus</span>
                <p className="text-xs text-gray-500">€ 2.000 pro Kind/Jahr (unter 18)</p>
              </div>
            </label>
          </div>

          {/* Pendlerpauschale */}
          <div className="mb-2">
            <label htmlFor="pendler" className="block text-sm font-semibold text-gray-700 mb-2">
              Pendlerpauschale (jährlich)
            </label>
            <select
              id="pendler"
              value={pendlerpauschale}
              onChange={handlePendlerChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
            >
              <option value="0">Keine Pendlerpauschale</option>
              <option value="696">Klein (2-20 km): € 696/Jahr</option>
              <option value="1356">Mittel (20-40 km): € 1.356/Jahr</option>
              <option value="2016">Groß (40-60 km): € 2.016/Jahr</option>
              <option value="2676">Sehr groß (&gt; 60 km): € 2.676/Jahr</option>
            </select>
          </div>
        </div>

        {/* Result Panel */}
        <div className="space-y-6">
          {/* Monthly Summary */}
          <div className="bg-primary rounded-2xl shadow-lg p-6 md:p-8 text-white">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-1">
              Ihr monatliches Nettogehalt
            </h3>
            <p className="text-4xl md:text-5xl font-extrabold mb-4">
              {formatCurrency(result.netMonthly)}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/70">Brutto</p>
                <p className="font-semibold text-lg">{formatCurrency(result.grossMonthly)}</p>
              </div>
              <div>
                <p className="text-white/70">Effektiver Steuersatz</p>
                <p className="font-semibold text-lg">{formatPercent(result.effectiveTaxRate)}</p>
              </div>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Monatliche Aufschlüsselung</h3>
            <div className="space-y-3">
              <Row label="Bruttogehalt" value={result.grossMonthly} bold />
              <Divider />
              <Row label="Krankenversicherung (KV)" value={-result.svMonthly.kv} sub />
              <Row label="Pensionsversicherung (PV)" value={-result.svMonthly.pv} sub />
              <Row label="Arbeitslosenversicherung (AV)" value={-result.svMonthly.av} sub />
              <Row label="Sozialversicherung gesamt" value={-result.svMonthly.total} highlight />
              <Divider />
              <Row label="Lohnsteuer" value={-result.incomeTaxMonthly} highlight />
              <Divider />
              <Row label="Nettogehalt" value={result.netMonthly} bold primary />
            </div>
          </div>

          {/* Annual Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Jährliche Zusammenfassung</h3>
            <div className="space-y-3">
              <Row label="Jahresbrutto (14 Gehälter)" value={result.grossAnnual} bold />
              <Row label="Sozialversicherung (Jahr)" value={-result.svAnnual} />
              <Row label="Lohnsteuer (Jahr)" value={-result.incomeTaxAnnual} />
              <Row label="Absetzbeträge" value={result.taxCreditsAnnual} sub />
              <Row label="E-Card-Serviceentgelt" value={-result.ecardGebuehr} sub />
              <Divider />
              <Row label="13. Gehalt (Netto)" value={result.sonderzahlungen.netPerPayment} />
              <Row label="14. Gehalt (Netto)" value={result.sonderzahlungen.netPerPayment} />
              <Divider />
              <Row label="Jahresnetto gesamt" value={result.netAnnual} bold primary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-components ---

function Row({
  label,
  value,
  bold,
  sub,
  highlight,
  primary,
}: {
  label: string;
  value: number;
  bold?: boolean;
  sub?: boolean;
  highlight?: boolean;
  primary?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center ${sub ? 'pl-4 text-sm text-gray-500' : ''} ${bold ? 'font-bold text-base' : 'text-sm'} ${primary ? 'text-primary text-lg' : ''} ${highlight ? 'font-semibold text-gray-700' : ''}`}>
      <span>{label}</span>
      <span className={value < 0 ? 'text-red-600' : ''}>{formatCurrency(value)}</span>
    </div>
  );
}

function Divider() {
  return <hr className="border-gray-100" />;
}
