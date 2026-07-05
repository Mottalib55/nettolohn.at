/**
 * Einzigartiger Content-Generator f\u00fcr Gehaltsseiten
 * Erzeugt pro Gehaltsstufe individuellen Text mit 80%+ Uniqueness
 */

import type { GehaltEntry } from './gehalt-data';

// --- Hilfsfunktionen ---

const AUSTRIAN_MEDIAN_MONTHLY = 3200;
const WORKING_DAYS_PER_MONTH = 22;
const WORKING_HOURS_PER_DAY = 8;

function fmt(value: number): string {
  return value.toLocaleString('de-AT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(value: number): string {
  return Math.round(value).toLocaleString('de-AT');
}

/** Deterministic variation index from salary amount */
function vi(amount: number): number {
  return ((amount * 7 + 3) % 13);
}

/** Secondary variation seed */
function vi2(amount: number): number {
  return ((amount * 11 + 5) % 17);
}

/** Tertiary variation */
function vi3(amount: number): number {
  return ((amount * 3 + 7) % 19);
}

// --- getBandContext ---

export function getBandContext(entry: GehaltEntry): string {
  const amount = entry.bruttoMonatlich;
  const ratio = amount / AUSTRIAN_MEDIAN_MONTHLY;
  const dailyBrutto = amount / WORKING_DAYS_PER_MONTH;
  const hourlyBrutto = dailyBrutto / WORKING_HOURS_PER_DAY;
  const dailyNetto = entry.nettoMonatlich / WORKING_DAYS_PER_MONTH;
  const hourlyNetto = dailyNetto / WORKING_HOURS_PER_DAY;
  const sonderzahlungVorteil = entry.sonderzahlungNetto - entry.nettoMonatlich;
  const jahresSVGesamt = entry.svGesamt * 14;
  const abgabenMonatlich = entry.svGesamt + entry.lohnsteuerMonatlich;
  const abgabenProzent = ((abgabenMonatlich / amount) * 100).toFixed(1);
  const nettoQuote = ((entry.nettoMonatlich / amount) * 100).toFixed(1);
  const v = vi(amount);
  const v2 = vi2(amount);

  // Completely different paragraph structures per salary band
  if (amount <= 1500) {
    return `Mit einem Bruttogehalt von ${fmtInt(amount)} \u20ac monatlich bewegt man sich in \u00d6sterreich im Bereich der Geringverdiener \u2014 das entspricht lediglich ${(ratio * 100).toFixed(0)} % des Medianeinkommens von ${fmtInt(AUSTRIAN_MEDIAN_MONTHLY)} \u20ac. Charakteristisch f\u00fcr dieses Einkommensniveau ist die vollst\u00e4ndige Befreiung von der Arbeitslosenversicherung (Freigrenze: 2.093 \u20ac), wodurch die SV-Belastung auf ${fmt(entry.svGesamt)} \u20ac beschr\u00e4nkt bleibt. Der effektive Nettolohn von ${fmt(hourlyNetto)} \u20ac pro Stunde (${fmt(dailyNetto)} \u20ac pro Arbeitstag) liegt nahe am kollektivvertraglichen Mindestlohn vieler Branchen. Bemerkenswert: Die Lohnsteuer betr\u00e4gt bei ${fmtInt(amount)} \u20ac brutto nur ${fmt(entry.lohnsteuerMonatlich)} \u20ac monatlich, da das Jahreseinkommen von ${fmtInt(entry.bruttoJaehrlich)} \u20ac gro\u00dfteils unter dem Grundfreibetrag von 12.816 \u20ac bleibt. Von jedem verdienten Euro bleiben ${nettoQuote} Cent als Netto erhalten \u2014 eine der h\u00f6chsten Nettoquoten aller Einkommensstufen. Die Sonderzahlungen liefern bei diesem Gehalt pro St\u00fcck ${fmt(entry.sonderzahlungNetto)} \u20ac netto, was einem Bonus von ${fmt(sonderzahlungVorteil)} \u20ac gegen\u00fcber dem Regelgehalt entspricht.`;
  }
  if (amount <= 2000) {
    return `${fmtInt(amount)} \u20ac brutto monatlich repr\u00e4sentieren in \u00d6sterreich ${(ratio * 100).toFixed(0)} % des Medianeinkommens \u2014 ein Niveau, auf dem sich viele Berufseinsteiger und Teilzeitbesch\u00e4ftigte befinden. Die Nettoquote ist mit ${nettoQuote} % noch vergleichsweise hoch, weil die progressive Besteuerung bei niedrigen Einkommen schonend greift: Nur ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer fallen monatlich an. Auf den Arbeitstag heruntergebrochen verdient man ${fmt(dailyBrutto)} \u20ac brutto und beh\u00e4lt ${fmt(dailyNetto)} \u20ac netto \u2014 bei einem Stundensatz von ${fmt(hourlyNetto)} \u20ac netto. Die Sozialversicherung schl\u00e4gt mit ${fmt(entry.svGesamt)} \u20ac zu Buche, wobei ${entry.svAV === 0 ? 'die Arbeitslosenversicherung bei diesem Gehalt noch entf\u00e4llt (Grenze: 2.093 \u20ac)' : 'bereits ein reduzierter AV-Satz gilt'}. Im Jahresverlauf summiert sich das Brutto auf ${fmtInt(entry.bruttoJaehrlich)} \u20ac (14 Geh\u00e4lter), wovon ${fmt(entry.nettoJaehrlich)} \u20ac netto verbleiben. Jede Sonderzahlung bringt ${fmt(entry.sonderzahlungNetto)} \u20ac \u2014 ein Plus von ${fmt(sonderzahlungVorteil)} \u20ac gegen\u00fcber dem regul\u00e4ren Monatsnetto, dank der 6-%-Pauschalbesteuerung.`;
  }
  if (amount <= 2500) {
    return `Bei einem Bruttoeinkommen von ${fmtInt(amount)} \u20ac monatlich erreicht man ${(ratio * 100).toFixed(0)} % des \u00f6sterreichischen Medians. Dieses Gehaltsniveau markiert einen wichtigen Schwellenwert: Ab 2.471 \u20ac greift der volle Arbeitslosenversicherungssatz von 3 %, was die Gesamtabgaben sp\u00fcrbar erh\u00f6ht. Die monatliche Abgabenlast betr\u00e4gt ${fmt(abgabenMonatlich)} \u20ac (${abgabenProzent} % des Brutto), aufgeteilt in ${fmt(entry.svGesamt)} \u20ac SV und ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer. Der Nettostundenlohn liegt bei ${fmt(hourlyNetto)} \u20ac, was einem Tagesverdienst von ${fmt(dailyNetto)} \u20ac entspricht. Die j\u00e4hrliche SV-Last \u00fcber 14 Geh\u00e4lter betr\u00e4gt ${fmt(jahresSVGesamt)} \u20ac. Positiv wirkt sich die Sonderzahlungsbeg\u00fcnstigung aus: Pro 13./14. Gehalt erh\u00e4lt man ${fmt(entry.sonderzahlungNetto)} \u20ac netto \u2014 das sind ${fmt(sonderzahlungVorteil)} \u20ac mehr als beim normalen Monatsgehalt, weil die 6-%-Pauschale statt des vollen Tarifs gilt.`;
  }
  if (amount <= 3000) {
    return `Ein monatliches Bruttoeinkommen von ${fmtInt(amount)} \u20ac positioniert Arbeitnehmer bei ${(ratio * 100).toFixed(0)} % des \u00f6sterreichischen Medians \u2014 im soliden Mittelfeld. Die Gesamtabgaben von ${fmt(abgabenMonatlich)} \u20ac (${abgabenProzent} %) teilen sich in ${fmt(entry.svGesamt)} \u20ac Sozialversicherung und ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer. Auf Stundenbasis ergibt sich ein Nettoverdienst von ${fmt(hourlyNetto)} \u20ac \u2014 umgerechnet ${fmt(dailyNetto)} \u20ac pro Arbeitstag bei 22 Arbeitstagen im Monat. Die Lohnsteuer greift bei diesem Einkommen mit dem 30-%-Tarif, da das zu versteuernde Jahreseinkommen von ${fmtInt(entry.steuerpflichtigesEinkommen * 12)} \u20ac in diese Stufe f\u00e4llt. \u00dcber das gesamte Jahr (14 Geh\u00e4lter) summieren sich die SV-Beitr\u00e4ge auf ${fmt(jahresSVGesamt)} \u20ac. Der Sonderzahlungsvorteil betr\u00e4gt bei ${fmtInt(amount)} \u20ac exakt ${fmt(sonderzahlungVorteil)} \u20ac mehr netto pro Zahlung gegen\u00fcber dem Regelgehalt.`;
  }
  if (amount <= 3500) {
    return `${fmtInt(amount)} \u20ac brutto bedeuten ${(ratio * 100).toFixed(0)} % des Medianeinkommens und platzieren dieses Gehalt \u00fcber dem \u00f6sterreichischen Durchschnitt. Die Abgabenlast von ${abgabenProzent} % setzt sich aus ${fmt(entry.svGesamt)} \u20ac SV-Beitr\u00e4gen und ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer zusammen. Das steuerpflichtige Monatseinkommen von ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac wird zunehmend mit dem 40-%-Tarif besteuert. Auf den Arbeitstag gerechnet verdient man ${fmt(dailyBrutto)} \u20ac brutto und beh\u00e4lt ${fmt(dailyNetto)} \u20ac netto (Stundenlohn netto: ${fmt(hourlyNetto)} \u20ac). Die 14 Geh\u00e4lter summieren sich auf ${fmtInt(entry.bruttoJaehrlich)} \u20ac Jahresbrutto, wovon nach allen Abz\u00fcgen ${fmt(entry.nettoJaehrlich)} \u20ac netto bleiben. Pro Sonderzahlung erh\u00e4lt man ${fmt(entry.sonderzahlungNetto)} \u20ac \u2014 genau ${fmt(sonderzahlungVorteil)} \u20ac mehr als das Monatsnetto von ${fmt(entry.nettoMonatlich)} \u20ac, dank der beg\u00fcnstigten 6-%-Besteuerung.`;
  }
  if (amount <= 4000) {
    return `Mit ${fmtInt(amount)} \u20ac Bruttogehalt verdient man ${(ratio * 100).toFixed(0)} % des Medians \u2014 ein klar \u00fcberdurchschnittliches Einkommen in \u00d6sterreich. Von jedem Euro gehen ${abgabenProzent} Cent an den Staat: ${fmt(entry.svGesamt)} \u20ac Sozialversicherung plus ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer monatlich. Der Brutto-Stundenlohn von ${fmt(hourlyBrutto)} \u20ac schrumpft auf ${fmt(hourlyNetto)} \u20ac netto \u2014 ein t\u00e4glicher Nettoverdienst von ${fmt(dailyNetto)} \u20ac. Das zu versteuernde Jahreseinkommen liegt bei ca. ${fmtInt(entry.steuerpflichtigesEinkommen * 12)} \u20ac und reicht damit in die 40-%-Tarifstufe. Die j\u00e4hrliche SV-Belastung (14 Monate) betr\u00e4gt ${fmt(jahresSVGesamt)} \u20ac. Beim 13. und 14. Gehalt macht sich die Beg\u00fcnstigung deutlich bemerkbar: ${fmt(entry.sonderzahlungNetto)} \u20ac netto pro Sonderzahlung stehen ${fmt(entry.nettoMonatlich)} \u20ac regul\u00e4rem Monatsnetto gegen\u00fcber \u2014 ein Vorteil von ${fmt(sonderzahlungVorteil)} \u20ac.`;
  }
  if (amount <= 4500) {
    return `Bei ${fmtInt(amount)} \u20ac brutto liegt man bei ${(ratio * 100).toFixed(0)} % des Medians und geh\u00f6rt zu den Besserverdienern \u00d6sterreichs. Ein markanter Punkt: Die Lohnsteuer (${fmt(entry.lohnsteuerMonatlich)} \u20ac) \u00fcbersteigt ab diesem Niveau die SV-Beitr\u00e4ge (${fmt(entry.svGesamt)} \u20ac) \u2014 die Steuer wird zum gr\u00f6\u00dften Abzugsposten. Insgesamt verbleiben ${nettoQuote} % als Netto: ${fmt(entry.nettoMonatlich)} \u20ac monatlich, also ${fmt(dailyNetto)} \u20ac pro Tag und ${fmt(hourlyNetto)} \u20ac pro Stunde. Die Gesamtabgaben summieren sich auf ${fmt(abgabenMonatlich)} \u20ac (${abgabenProzent} %). Das steuerpflichtige Einkommen f\u00e4llt mit ca. ${fmtInt(entry.steuerpflichtigesEinkommen * 12)} \u20ac j\u00e4hrlich deutlich in die 40-%-Zone. Die Sonderzahlungen bringen jeweils ${fmt(entry.sonderzahlungNetto)} \u20ac netto \u2014 um ${fmt(sonderzahlungVorteil)} \u20ac attraktiver als ein regul\u00e4res Monatsgehalt. \u00dcber das Jahr betrachtet erwirtschaftet man ${fmtInt(entry.bruttoJaehrlich)} \u20ac brutto und beh\u00e4lt ${fmt(entry.nettoJaehrlich)} \u20ac.`;
  }
  if (amount <= 5000) {
    return `${fmtInt(amount)} \u20ac monatliches Brutto \u2014 das sind ${(ratio * 100).toFixed(0)} % des Medianeinkommens und ein gehobener Verdienst, der sich auf ${fmt(hourlyBrutto)} \u20ac brutto pro Stunde beziehungsweise ${fmt(hourlyNetto)} \u20ac netto aufschl\u00fcsselt. Die Abgabenlast von ${abgabenProzent} % bedeutet: Monatlich flie\u00dfen ${fmt(entry.svGesamt)} \u20ac in die Sozialversicherung und ${fmt(entry.lohnsteuerMonatlich)} \u20ac an den Fiskus. Pro Arbeitstag bleiben ${fmt(dailyNetto)} \u20ac netto \u00fcbrig. Das zu versteuernde Einkommen n\u00e4hert sich mit ca. ${fmtInt(entry.steuerpflichtigesEinkommen * 12)} \u20ac j\u00e4hrlich bereits der 48-%-Tarifstufe (ab 66.612 \u20ac). Die Sonderzahlungen federn die hohe Steuerlast ab: Pro 13./14. Gehalt flie\u00dfen ${fmt(entry.sonderzahlungNetto)} \u20ac netto auf das Konto \u2014 ${fmt(sonderzahlungVorteil)} \u20ac mehr als beim Regelgehalt. Die j\u00e4hrliche SV-Gesamtbelastung (14 Monate) liegt bei ${fmt(jahresSVGesamt)} \u20ac.`;
  }
  if (amount <= 5500) {
    return `Wer ${fmtInt(amount)} \u20ac brutto monatlich verdient, liegt bei ${(ratio * 100).toFixed(0)} % des Medians und z\u00e4hlt zum oberen Einkommenssegment. Die Steuerprogression macht sich deutlich bemerkbar: ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer stehen ${fmt(entry.svGesamt)} \u20ac SV-Beitr\u00e4gen gegen\u00fcber. Die Gesamtabgabenquote betr\u00e4gt ${abgabenProzent} %, netto verbleiben ${fmt(entry.nettoMonatlich)} \u20ac (Tagessatz: ${fmt(dailyNetto)} \u20ac, Stundensatz: ${fmt(hourlyNetto)} \u20ac). Das Jahresbrutto von ${fmtInt(entry.bruttoJaehrlich)} \u20ac (14 Geh\u00e4lter) reduziert sich auf ein Jahresnetto von ${fmt(entry.nettoJaehrlich)} \u20ac \u2014 erstmals \u00fcber der 50.000-\u20ac-Marke. Die SV wird noch vollst\u00e4ndig auf das Gehalt berechnet (H\u00f6chstbeitragsgrundlage: 6.060 \u20ac), die j\u00e4hrliche Belastung betr\u00e4gt ${fmt(jahresSVGesamt)} \u20ac. Jede Sonderzahlung liefert ${fmt(entry.sonderzahlungNetto)} \u20ac netto, ein Bonus von ${fmt(sonderzahlungVorteil)} \u20ac gegen\u00fcber dem Monatsnetto.`;
  }
  if (amount <= 6000) {
    return `${fmtInt(amount)} \u20ac brutto monatlich bedeuten ${(ratio * 100).toFixed(0)} % des \u00f6sterreichischen Medians und einen Verdienst knapp unter der SV-H\u00f6chstbeitragsgrundlage von 6.060 \u20ac. Diese N\u00e4he zur Deckelungsgrenze ist relevant: Bei ${fmtInt(amount)} \u20ac werden noch die vollen SV-Beitr\u00e4ge f\u00e4llig (${fmt(entry.svGesamt)} \u20ac/Monat, ${fmt(jahresSVGesamt)} \u20ac/Jahr f\u00fcr 14 Geh\u00e4lter). Die Lohnsteuer von ${fmt(entry.lohnsteuerMonatlich)} \u20ac dominiert die Abgabenseite. Die Gesamtbelastung von ${abgabenProzent} % l\u00e4sst ${fmt(entry.nettoMonatlich)} \u20ac netto \u00fcbrig \u2014 ${fmt(dailyNetto)} \u20ac pro Arbeitstag, ${fmt(hourlyNetto)} \u20ac pro Stunde. Eine Gehaltserh\u00f6hung \u00fcber 6.060 \u20ac w\u00e4re besonders netto-effektiv, da ab dieser Grenze keine zus\u00e4tzliche SV anf\u00e4llt. Die Sonderzahlungen erbringen ${fmt(entry.sonderzahlungNetto)} \u20ac netto pro St\u00fcck (Vorteil: ${fmt(sonderzahlungVorteil)} \u20ac vs. Regelgehalt).`;
  }
  if (amount <= 7000) {
    return `Bei ${fmtInt(amount)} \u20ac brutto (${(ratio * 100).toFixed(0)} % des Medians) profitiert man bereits von der SV-Deckelung: Die Beitr\u00e4ge sind bei ${fmt(entry.svGesamt)} \u20ac eingefroren, da die H\u00f6chstbeitragsgrundlage von 6.060 \u20ac \u00fcberschritten ist. Die Lohnsteuer mit ${fmt(entry.lohnsteuerMonatlich)} \u20ac ist nun mit Abstand der gr\u00f6\u00dfte Posten \u2014 das zu versteuernde Jahreseinkommen von ca. ${fmtInt(entry.steuerpflichtigesEinkommen * 12)} \u20ac reicht in die 48-%-Stufe. Insgesamt betr\u00e4gt die Abgabenlast ${abgabenProzent} %, es verbleiben ${fmt(entry.nettoMonatlich)} \u20ac netto monatlich. Pro Stunde sind das ${fmt(hourlyNetto)} \u20ac netto bei einem Brutto-Stundensatz von ${fmt(hourlyBrutto)} \u20ac. Die j\u00e4hrlichen SV-Kosten belaufen sich konstant auf ${fmt(jahresSVGesamt)} \u20ac (14 \u00d7 ${fmt(entry.svGesamt)} \u20ac). Jede Sonderzahlung bringt netto ${fmt(entry.sonderzahlungNetto)} \u20ac auf das Konto \u2014 ganze ${fmt(sonderzahlungVorteil)} \u20ac mehr als das regul\u00e4re Monatsnetto von ${fmt(entry.nettoMonatlich)} \u20ac.`;
  }
  // 8000+
  return `${fmtInt(amount)} \u20ac brutto monatlich ist ein Spitzeneinkommen (${(ratio * 100).toFixed(0)} % des Medians), bei dem die SV-Deckelung voll greift: Die Beitr\u00e4ge stagnieren bei ${fmt(entry.svGesamt)} \u20ac, unabh\u00e4ngig vom Gehalt \u00fcber der H\u00f6chstbeitragsgrundlage. Dominant ist die Lohnsteuer mit ${fmt(entry.lohnsteuerMonatlich)} \u20ac monatlich \u2014 das steuerpflichtige Einkommen von ca. ${fmtInt(entry.steuerpflichtigesEinkommen * 12)} \u20ac j\u00e4hrlich wird tief in der 48-%-Stufe besteuert. Die Gesamtabgabenquote von ${abgabenProzent} % l\u00e4sst ${fmt(entry.nettoMonatlich)} \u20ac netto monatlich \u00fcbrig \u2014 auf den Arbeitstag gerechnet ${fmt(dailyNetto)} \u20ac und stundenbezogen ${fmt(hourlyNetto)} \u20ac netto. Bei 14 Geh\u00e4ltern summiert sich das Jahresbrutto auf ${fmtInt(entry.bruttoJaehrlich)} \u20ac, das Jahresnetto auf ${fmt(entry.nettoJaehrlich)} \u20ac. Die Sonderzahlungen bringen jeweils ${fmt(entry.sonderzahlungNetto)} \u20ac netto (Vorteil gegen\u00fcber Regelgehalt: ${fmt(sonderzahlungVorteil)} \u20ac), weil nur 6 % Pauschale statt bis zu 48 % Tarif anfallen.`;
}

// --- getCareerDescription ---

const CAREER_DATA: Record<string, { roles: string[]; context: string }> = {
  '1500': {
    roles: ['Teilzeit-Verk\u00e4ufer/in im Einzelhandel', 'Werkstudent/in in der Verwaltung', 'geringf\u00fcgig besch\u00e4ftigte Reinigungskraft', 'Teilzeit-Rezeptionist/in', 'studentische Aushilfskraft in der Gastronomie'],
    context: 'Dieses Gehaltsniveau findet sich prim\u00e4r bei Teilzeitvertr\u00e4gen (20\u201325 Wochenstunden) oder bei Vollzeitbesch\u00e4ftigungen im untersten Kollektivvertragssegment. Der KV-Mindestlohn in der Reinigung liegt 2026 bei ca. 1.470 \u20ac brutto, im Handel bei 1.895 \u20ac f\u00fcr Vollzeit. Karriereaussicht: Durch Erh\u00f6hung auf Vollzeit oder Branchenwechsel l\u00e4sst sich dieses Einkommen oft innerhalb eines Jahres auf 2.000\u20132.200 \u20ac steigern.',
  },
  '2000': {
    roles: ['Berufseinsteiger/in im B\u00fcro', 'Lehrling im letzten Lehrjahr', 'Kassierer/in im Lebensmittelhandel', 'Lagerarbeiter/in im Versand', 'Rezeptionist/in in einem kleinen Hotel'],
    context: 'Viele Kollektivvertr\u00e4ge in \u00d6sterreich starten f\u00fcr Vollzeitkr\u00e4fte bei rund 1.900\u20132.100 \u20ac brutto. Der Handels-KV sieht f\u00fcr Besch\u00e4ftigungsgruppe B im ersten Jahr ca. 1.995 \u20ac vor. Typischerweise erreicht man durch Vorr\u00fcckungen und Berufsjahre nach 3\u20135 Jahren das Niveau von 2.300\u20132.500 \u20ac brutto.',
  },
  '2500': {
    roles: ['Facharbeiter/in in der Produktion', 'kaufm\u00e4nnische/r Angestellte/r mit 3 Jahren Erfahrung', 'Techniker/in im Au\u00dfendienst', 'Sachbearbeiter/in in der Versicherungsbranche', 'p\u00e4dagogische Fachkraft in der Kinderbetreuung'],
    context: 'Laut Statistik Austria erreichen rund 30 % der \u00f6sterreichischen Vollzeitarbeitnehmer ein Bruttoeinkommen zwischen 2.300 und 2.700 \u20ac. Der Metall-KV sieht f\u00fcr gelernte Facharbeiter im dritten Berufsjahr ca. 2.450\u20132.600 \u20ac vor. In der IT-Branche ist 2.500 \u20ac ein g\u00e4ngiges Junior-Einstiegsgehalt.',
  },
  '3000': {
    roles: ['erfahrene/r Buchhalter/in', 'Pflegefachkraft im Krankenhaus', 'Elektrotechniker/in mit Berufserfahrung', 'Polizeibeamter/in nach 5+ Dienstjahren', 'Bankkaufmann/-frau im Kundengesch\u00e4ft'],
    context: 'Das Medianeinkommen in \u00d6sterreich liegt bei rund 3.200 \u20ac brutto, womit 3.000 \u20ac knapp darunter angesiedelt ist. Im \u00f6ffentlichen Dienst (Gehaltsgruppe v2/3) und im Gesundheitswesen (BAGS-KV Verwendungsgruppe 7) sind 3.000 \u20ac nach einigen Dienstjahren Standard. In Wien liegen die Geh\u00e4lter tendenziell 5\u201310 % h\u00f6her als in l\u00e4ndlichen Regionen.',
  },
  '3500': {
    roles: ['Softwareentwickler/in (Junior bis Mid-Level)', 'Projektkoordinator/in im Bauwesen', 'Marketingspezialist/in in einer Agentur', 'Lehrer/in im \u00f6ffentlichen Dienst (nach 6+ Jahren)', 'Vertriebsmitarbeiter/in mit Fixum und Provision'],
    context: 'Ab 3.500 \u20ac brutto geh\u00f6rt man in \u00d6sterreich zum oberen Drittel der Einkommenspyramide. Der IT-KV sieht f\u00fcr Spezialisten (ST2) mit Erfahrung ca. 3.400\u20133.800 \u20ac vor. Im Bildungssektor erreichen Lehrer diese Stufe nach etwa 6\u20138 Dienstjahren. Vertriebspositionen k\u00f6nnen durch variable Anteile auf 4.000+ \u20ac kommen.',
  },
  '4000': {
    roles: ['IT-Systemadministrator/in mit Zertifizierungen', 'Ingenieur/in in der Automobilindustrie', 'Teamleiter/in im Kundenservice', 'Steuerberaterassistent/in mit Pr\u00fcfungsabschluss', 'Pharmareferent/in im Au\u00dfendienst'],
    context: 'Bei 4.000 \u20ac brutto befindet man sich laut Einkommensstatistik im 70. Perzentil. In der Automobilindustrie (Metall-KV Verwendungsgruppe IV) und in der Pharmaindustrie sind solche Geh\u00e4lter f\u00fcr erfahrene Fachkr\u00e4fte \u00fcblich. IT-Professionals erreichen dieses Niveau nach ca. 4\u20136 Jahren Berufserfahrung, je nach Spezialisierung.',
  },
  '4500': {
    roles: ['Senior-Softwareentwickler/in', 'Abteilungsleiter/in im Mittelstand', 'Wirtschaftspr\u00fcfer/in (Berufsanf\u00e4nger nach Examen)', 'Produktmanager/in in der Industrie', 'Konstruktionsingenieur/in mit Spezialisierung'],
    context: 'Das 75. Einkommensperzentil in \u00d6sterreich liegt bei ca. 4.400 \u20ac brutto. F\u00fcr Senior-Entwickler in Wien ist 4.500 \u20ac ein markt\u00fcbliches Fixgehalt (ohne Bonus). In der Wirtschaftspr\u00fcfung erreicht man nach dem Berufsexamen \u00fcblicherweise 4.200\u20134.800 \u20ac. Abteilungsleitungen im Mittelstand werden je nach Unternehmensgr\u00f6\u00dfe mit 4.000\u20135.500 \u20ac dotiert.',
  },
  '5000': {
    roles: ['IT-Architekt/in und Cloud-Spezialist/in', 'Filialleiter/in einer Bankfiliale', 'erfahrene/r Unternehmensberater/in', 'Oberarzt/Ober\u00e4rztin im \u00f6ffentlichen Spital', 'Senior Manager im Finanzwesen'],
    context: 'Mit 5.000 \u20ac brutto geh\u00f6rt man zum 80. Perzentil der \u00f6sterreichischen Einkommen. In der Finanzbranche (Bank-KV h\u00f6here Verwendungsgruppen) und bei Beratungsfirmen sind solche Fixgeh\u00e4lter f\u00fcr erfahrene Mitarbeiter Standard. \u00c4rzte im \u00f6ffentlichen Dienst erreichen als Ober\u00e4rzte ca. 4.800\u20135.500 \u20ac brutto (exkl. Nacht-/Wochenenddienste).',
  },
  '5500': {
    roles: ['Data-Science-Lead', 'Prokurist/in im Mittelstand', 'Rechtsanwalt/Rechtsanw\u00e4ltin mit 5+ Jahren Berufserfahrung', 'leitende/r Ingenieur/in in der Energietechnik', 'Bereichsleiter/in im Vertrieb'],
    context: 'Bei 5.500 \u20ac brutto befindet man sich im 85. Perzentil. In Rechtsanwaltskanzleien ist dies ein \u00fcbliches Gehalt f\u00fcr Associates nach 5+ Jahren. In der Energiewirtschaft (E-Wirtschafts-KV, h\u00f6here Verwendungsgruppen) und im technischen Management liegen die Geh\u00e4lter ebenfalls in diesem Bereich. Data-Science-Leads in Wien k\u00f6nnen 5.200\u20136.000 \u20ac erwarten.',
  },
  '6000': {
    roles: ['Direktor/in Business Development', 'Senior Consultant bei einer Big-4-Gesellschaft', 'Facharzt/Fach\u00e4rztin im Spital', 'Werksleiter/in in der Fertigungsindustrie', 'Head of Engineering'],
    context: 'Ab 6.000 \u20ac brutto spricht man vom 90. Einkommensperzentil. Dieses Niveau erreichen in \u00d6sterreich prim\u00e4r Fachexpertinnen mit 10+ Jahren Erfahrung, mittlere F\u00fchrungskr\u00e4fte in Konzernen und \u00c4rzte im fortgeschrittenen Karrierestadium. Bei den Big-4-Gesellschaften (KPMG, EY, Deloitte, PwC) ist dies das Gehalt eines Senior Managers.',
  },
  '7000': {
    roles: ['Gesch\u00e4ftsf\u00fchrer/in eines KMU', 'Partner/in in einer Anwaltskanzlei', 'Prim\u00e4rarzt/Prim\u00e4r\u00e4rztin', 'VP Engineering bei einem Scale-up', 'Investmentbanker/in im Mid-Level'],
    context: 'Bei 7.000 \u20ac brutto befindet man sich im 93. Perzentil der \u00f6sterreichischen Einkommensverteilung. KMU-Gesch\u00e4ftsf\u00fchrer (10\u201350 Mitarbeiter) werden h\u00e4ufig in dieser Bandbreite entlohnt. In der Medizin erreichen Prim\u00e4r\u00e4rzte 6.500\u20138.000 \u20ac brutto (Grundgehalt), VPs in der Tech-Branche liegen bei 6.800\u20137.500 \u20ac fix plus Equity.',
  },
  '8000': {
    roles: ['C-Level-F\u00fchrungskraft (CFO/CTO)', 'Vorstandsmitglied eines mittelgro\u00dfen Unternehmens', 'Partner/in in einer Top-Managementberatung', 'Chefchirurg/in an einer Universit\u00e4tsklinik', 'Head of Sales DACH-Region'],
    context: 'Mit 8.000 \u20ac brutto monatlich (112.000 \u20ac j\u00e4hrlich) geh\u00f6rt man zum obersten Einkommensdezil (\u00fcber 95. Perzentil) in \u00d6sterreich. Dieses Niveau ist typisch f\u00fcr C-Suite-Positionen in mittelgro\u00dfen Unternehmen, Partner bei Beratungsfirmen und Klinikvorst\u00e4nde. Oft kommen variable Komponenten (Bonus, Aktienoptionen) von 20\u201350 % des Fixgehalts hinzu.',
  },
};

export function getCareerDescription(entry: GehaltEntry): string {
  const amount = entry.bruttoMonatlich;
  const key = amount.toString();
  const data = CAREER_DATA[key] || CAREER_DATA['3000'];
  const v = vi(amount);

  const roleList = data.roles.slice(0, 3).join(', ');
  const remainingRoles = data.roles.slice(3).join(' oder ');

  const structures = [
    `${fmtInt(amount)} \u20ac brutto monatlich verdienen in \u00d6sterreich typischerweise ${roleList}, ${remainingRoles}. ${data.context}`,
    `Zu den Berufsbildern mit ${fmtInt(amount)} \u20ac Bruttogehalt z\u00e4hlen: ${roleList}, ${remainingRoles}. ${data.context}`,
    `Arbeitnehmer mit einem Monatsbrutto von ${fmtInt(amount)} \u20ac finden sich h\u00e4ufig in Positionen wie ${roleList} oder ${remainingRoles}. ${data.context}`,
  ];

  const closings = [
    `Mit ${fmt(entry.nettoMonatlich)} \u20ac monatlichem Netto (${fmt(entry.nettoJaehrlich)} \u20ac im Jahr) ist die finanzielle Grundlage f\u00fcr diese T\u00e4tigkeitsprofile gelegt.`,
    `Das verf\u00fcgbare Einkommen von ${fmt(entry.nettoMonatlich)} \u20ac netto erm\u00f6glicht diesen Berufsgruppen ${amount < 3000 ? 'eine solide Grundversorgung' : amount < 5000 ? 'einen komfortablen Lebensstandard' : 'gehobene Lebensqualit\u00e4t'} in \u00d6sterreich.`,
    `Nach Abz\u00fcgen verbleiben ${fmt(entry.nettoMonatlich)} \u20ac netto \u2014 bei ${fmtInt(entry.bruttoJaehrlich)} \u20ac Jahresbrutto ergeben sich ${fmt(entry.nettoJaehrlich)} \u20ac Jahresnetto f\u00fcr diese Positionen.`,
  ];

  return structures[v % structures.length] + ' ' + closings[(v + 2) % closings.length];
}

// --- getTaxTips ---

export function getTaxTips(entry: GehaltEntry): string {
  const amount = entry.bruttoMonatlich;
  const v = vi(amount);
  const v2 = vi2(amount);

  const familienbonusSaving = Math.min(entry.lohnsteuerMonatlich * 12, 2000);
  const pendlerSmall = 696;
  const pendlerLarge = 3672;
  const grenzsteuersatz = amount < 3000 ? 0.30 : amount < 5000 ? 0.40 : 0.48;
  const svSatz = amount >= 6060 ? 0 : 0.1712;
  const gesamtGrenzsatz = svSatz + grenzsteuersatz * (1 - svSatz);
  const pendlerSavingSmall = pendlerSmall * grenzsteuersatz;
  const pendlerSavingLarge = pendlerLarge * grenzsteuersatz;
  const homeOffice = 300;
  const homeOfficeSaving = homeOffice * grenzsteuersatz;
  const steuerausgleichPotential = amount < 2500 ? 120 : amount < 3500 ? 220 : amount < 5000 ? 380 : 550;
  const essenzuschussJahr = 8 * WORKING_DAYS_PER_MONTH * 11; // 11 Monate abz\u00fcgl. Urlaub
  const klimaticketJahr = 1095;

  const sections: string[] = [];

  // Section 1 - unique per salary level
  if (amount <= 1500) {
    sections.push(`Negativsteuer und SV-R\u00fcckerstattung: Bei ${fmtInt(amount)} \u20ac brutto besteht bei der Arbeitnehmerveranlagung Anspruch auf die sogenannte Negativsteuer (SV-Bonus). Geringverdiener erhalten bis zu 463 \u20ac j\u00e4hrlich zur\u00fcck, wenn die Lohnsteuer nach Abzug der Absetzbetr\u00e4ge unter null f\u00e4llt. Das ergibt bei ${fmtInt(amount)} \u20ac Brutto eine potenzielle R\u00fcckzahlung von ca. ${fmtInt(steuerausgleichPotential)} \u20ac. Der Antrag erfolgt \u00fcber die Arbeitnehmerveranlagung bei FinanzOnline.`);
  } else if (amount <= 2000) {
    sections.push(`SV-Bonus und Steuerausgleich: Bei ${fmtInt(amount)} \u20ac brutto und einer Lohnsteuer von nur ${fmt(entry.lohnsteuerMonatlich)} \u20ac/Monat ist die Arbeitnehmerveranlagung besonders lohnend. Der SV-Bonus (Negativsteuer) kann bis zu 463 \u20ac zur\u00fcckerstatten. Zus\u00e4tzlich sind Werbungskosten \u00fcber der Pauschale von 132 \u20ac absetzbar \u2014 bei einem Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} % bringt das ${(grenzsteuersatz * 100).toFixed(0)} Cent pro Euro. Gesamtpotenzial: ca. ${fmtInt(steuerausgleichPotential)} \u20ac j\u00e4hrlich.`);
  } else if (amount <= 2500) {
    sections.push(`Steuerausgleich bei ${fmtInt(amount)} \u20ac brutto: Mit einem Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} % beginnen absetzbare Ausgaben sich sp\u00fcrbar auszuwirken. Gewerkschaftsbeitr\u00e4ge (ca. ${fmtInt(amount * 0.01 * 12)} \u20ac/Jahr), die Home-Office-Pauschale (bis ${homeOffice} \u20ac, Ersparnis ${fmt(homeOfficeSaving)} \u20ac) und Fortbildungen senken die Steuerlast. R\u00fcckerstattungspotenzial bei diesem Gehalt: ca. ${fmtInt(steuerausgleichPotential)} \u20ac j\u00e4hrlich \u00fcber die Arbeitnehmerveranlagung.`);
  } else if (amount <= 3000) {
    sections.push(`Arbeitnehmerveranlagung bei ${fmtInt(amount)} \u20ac: Das R\u00fcckerstattungspotenzial liegt bei ca. ${fmtInt(steuerausgleichPotential)} \u20ac. Relevante Absetzposten: Fortbildungskosten (${(grenzsteuersatz * 100).toFixed(0)} Cent pro Euro zur\u00fcck), Gewerkschaftsbeitrag (${fmtInt(amount * 0.01 * 12)} \u20ac/Jahr absetzbar), Fachliteratur, Home-Office-Pauschale (${homeOffice} \u20ac = ${fmt(homeOfficeSaving)} \u20ac Ersparnis). Auch Spenden an beg\u00fcnstigte Empf\u00e4nger sind bis 10 % des Einkommens absetzbar.`);
  } else if (amount <= 3500) {
    sections.push(`Steuerliche Handlungsm\u00f6glichkeiten bei ${fmtInt(amount)} \u20ac brutto: Der Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} % macht jeden absetzbaren Euro wertvoll. Empfohlene Ma\u00dfnahmen: Werbungskostenpauschale (132 \u20ac) bewusst \u00fcberschreiten durch Dokumentation von Arbeitsmitteln, Fachliteratur und Fortbildungen. R\u00fcckerstattung bei der Arbeitnehmerveranlagung: durchschnittlich ${fmtInt(steuerausgleichPotential)} \u20ac. Home-Office-Pauschale (${homeOffice} \u20ac) ergibt ${fmt(homeOfficeSaving)} \u20ac Ersparnis.`);
  } else if (amount <= 4000) {
    sections.push(`Werbungskosten-Strategie bei ${fmtInt(amount)} \u20ac brutto: Bei ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz lohnt sich jede Investition in die eigene Karriere steuerlich doppelt. Absetzbare Fortbildungen (MBA: ca. 15.000 \u20ac \u00fcber 2 Jahre = ${fmtInt(15000 * grenzsteuersatz)} \u20ac Steuerersparnis), Fachkongresse (Reisekosten + Teilnahme), professionelle Arbeitsmittel. Durchschnittliche R\u00fcckerstattung: ca. ${fmtInt(steuerausgleichPotential)} \u20ac bei konsequenter Dokumentation aller Aufw\u00e4nde.`);
  } else if (amount <= 4500) {
    sections.push(`Steuerausgleich bei ${fmtInt(amount)} \u20ac brutto: Der ${(grenzsteuersatz * 100).toFixed(0)}-%-Steuersatz auf den letzten verdienten Euro maximiert den Wert jedes Absetzpostens. Besonders wirkungsvoll: berufsbegleitende Weiterbildung (bei 8.000 \u20ac Kosten: ${fmtInt(8000 * grenzsteuersatz)} \u20ac Ersparnis), Arbeitszimmer bei \u00fcberwiegender Home-Office-Nutzung (2.000\u20133.000 \u20ac absetzbar), professionelle Mitgliedschaften und Fachliteratur. Gesamtpotenzial: ${fmtInt(steuerausgleichPotential)} \u20ac+ j\u00e4hrlich.`);
  } else if (amount <= 5000) {
    sections.push(`Steuerplanung bei ${fmtInt(amount)} \u20ac brutto: Mit ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz und einem Jahresbrutto von ${fmtInt(entry.bruttoJaehrlich)} \u20ac ist professionelle Steuerplanung empfehlenswert. Relevante Hebel: Au\u00dfergew\u00f6hnliche Belastungen (Selbstbehalt ca. ${fmtInt(entry.bruttoJaehrlich * 0.06)} \u20ac), Sonderausgaben (Kirchenbeitrag max. 400 \u20ac, Personenversicherungen), absetzbare Spenden. Werbungskosten-Potenzial: Fortbildungen, doppelte Haushaltsf\u00fchrung bei Fernpendlern. Durchschnittliche R\u00fcckerstattung: ca. ${fmtInt(steuerausgleichPotential)} \u20ac.`);
  } else if (amount <= 5500) {
    sections.push(`Steueroptimierung bei ${fmtInt(amount)} \u20ac: Jeder absetzbare Euro bringt bei ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz fast 50 Cent zur\u00fcck. Top-Absetzposten: Fortbildungen und Fachkongresse (international absetzbar inkl. Reisekosten), Fachliteratur und Arbeitsmittel, Mitgliedsbeitr\u00e4ge. Bei Immobilienbesitz: Handwerkerleistungen. Doppelte Haushaltsf\u00fchrung (bis 2.200 \u20ac/Monat) bei berufsbedingtem Zweitwohnsitz. R\u00fcckerstattung realistisch: ${fmtInt(steuerausgleichPotential)} \u20ac+ pro Jahr.`);
  } else if (amount <= 6000) {
    sections.push(`Steuerliche Gestaltung bei ${fmtInt(amount)} \u20ac brutto: An der Schwelle zur SV-H\u00f6chstbeitragsgrundlage (6.060 \u20ac) verdient die Steuersituation besondere Aufmerksamkeit. Der Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} % plus ${(svSatz * 100).toFixed(0)} % SV ergibt eine Gesamtgrenzbelastung von ca. ${((grenzsteuersatz * (1 - svSatz) + svSatz) * 100).toFixed(0)} %. Absetzbare Ausgaben: doppelte Haushaltsf\u00fchrung, Fortbildung (MBA absetzbar: Ersparnis ${fmtInt(10000 * grenzsteuersatz)} \u20ac bei 10.000 \u20ac Kosten), Fachliteratur. Potenzial: ${fmtInt(steuerausgleichPotential)} \u20ac+ j\u00e4hrlich.`);
  } else if (amount <= 7000) {
    sections.push(`Steuerplanung bei ${fmtInt(amount)} \u20ac (SV gedeckelt): Da keine zus\u00e4tzliche SV anf\u00e4llt, liegt die marginale Belastung bei reinen ${(grenzsteuersatz * 100).toFixed(0)} % Lohnsteuer. Das ver\u00e4ndert die Optimierungsstrategie: (a) Absetzbare Fortbildungen bringen ${(grenzsteuersatz * 100).toFixed(0)} Cent pro Euro (ohne SV-Effekt). (b) Sachbez\u00fcge sind besonders wertvoll: 1.000 \u20ac steuerfrei = ${fmtInt(1000 / (1 - grenzsteuersatz))} \u20ac Brutto\u00e4quivalent. (c) Doppelte Haushaltsf\u00fchrung und Familienheimfahrten bei Fernpendlern. R\u00fcckerstattungspotenzial: ca. ${fmtInt(steuerausgleichPotential)} \u20ac j\u00e4hrlich.`);
  } else {
    sections.push(`Executive-Steuerplanung bei ${fmtInt(amount)} \u20ac brutto: Bei ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz und gedeckelter SV ist die marginale Belastung rein steuerlich. Relevante Absetzposten auf diesem Niveau: doppelte Haushaltsf\u00fchrung (bis 2.200 \u20ac/Monat), Familienheimfahrten, Fortbildungen in der eigenen Fachrichtung, repr\u00e4sentative Arbeitskleidung. Bei Nebeneink\u00fcnften: Pr\u00fcfung der optimalen Rechtsform (Einzelunternehmen vs. GmbH). R\u00fcckerstattungspotenzial: ca. ${fmtInt(steuerausgleichPotential)} \u20ac j\u00e4hrlich bei professioneller Beratung.`);
  }

  // Section 2 - Familienbonus (unique per salary using amount-based index)
  const famIdx = Math.floor(amount / 500) % 4;
  if (famIdx === 0) {
    sections.push(`Familienbonus Plus: Pro Kind unter 18 reduziert sich die Lohnsteuer um 2.000 \u20ac/Jahr (166,67 \u20ac/Monat). Bei ${fmtInt(amount)} \u20ac brutto und einem Kind steigt das Monatsnetto von ${fmt(entry.nettoMonatlich)} \u20ac auf ca. ${fmt(entry.nettoMonatlich + familienbonusSaving / 12)} \u20ac. Bei zwei Kindern spart man ${fmtInt(Math.min(familienbonusSaving * 2, entry.lohnsteuerMonatlich * 12))} \u20ac j\u00e4hrlich. Der Bonus wird direkt \u00fcber die Lohnverrechnung ber\u00fccksichtigt.`);
  } else if (famIdx === 1) {
    sections.push(`Kinderbedingte Steuervorteile: Der Familienbonus Plus (2.000 \u20ac/Kind/Jahr) senkt bei ${fmtInt(amount)} \u20ac brutto die j\u00e4hrliche Steuerlast um bis zu ${fmtInt(familienbonusSaving)} \u20ac pro Kind. Hinzu kommt der Kindermehrbetrag (bis 700 \u20ac) f\u00fcr Geringverdiener bzw. der Alleinverdienerabsetzbetrag (520 \u20ac bei 1 Kind, 704 \u20ac bei 2 Kindern). Insgesamt k\u00f6nnen Familien bei diesem Gehalt bis zu ${fmtInt(familienbonusSaving + 520)} \u20ac pro Kind und Jahr sparen.`);
  } else if (famIdx === 2) {
    sections.push(`Familienf\u00f6rderung bei ${fmtInt(amount)} \u20ac Brutto: Durch den Familienbonus Plus (max. 2.000 \u20ac/Kind) erh\u00f6ht sich das Jahresnetto von ${fmt(entry.nettoJaehrlich)} \u20ac auf ca. ${fmt(entry.nettoJaehrlich + familienbonusSaving)} \u20ac (bei einem Kind). Beide Elternteile k\u00f6nnen den Bonus je zur H\u00e4lfte geltend machen. Ab dem 18. Geburtstag des Kindes reduziert sich der Bonus auf 700 \u20ac/Jahr.`);
  } else {
    sections.push(`Steuerliche Entlastung f\u00fcr Eltern bei ${fmtInt(amount)} \u20ac: Der Familienbonus Plus wirkt als Absetzbetrag direkt gegen die Lohnsteuer (${fmt(entry.lohnsteuerMonatlich)} \u20ac/Monat). Mit einem Kind: j\u00e4hrlich ${fmtInt(familienbonusSaving)} \u20ac weniger Steuerlast. Zus\u00e4tzlich: Alleinerzieherabsetzbetrag (520\u2013704 \u20ac), Unterhaltsabsetzbetrag (35\u201370 \u20ac/Monat je Kind) und Familienbeihilfe (ab 120 \u20ac/Monat je nach Alter).`);
  }

  // Section 3 - Pendlerpauschale (unique per salary using alternating pattern)
  const pendIdx = Math.floor(amount / 500) % 3;
  if (pendIdx === 0) {
    sections.push(`Pendlerpauschale und Pendlereuro: Bei einer Entfernung von 20+ km zum Arbeitsort (kleine Pendlerpauschale: ${fmtInt(pendlerSmall)} \u20ac/Jahr) ergibt sich bei ${fmtInt(amount)} \u20ac brutto eine Steuerersparnis von ${fmt(pendlerSavingSmall)} \u20ac. Die gro\u00dfe Pendlerpauschale (60+ km, ${fmtInt(pendlerLarge)} \u20ac) bringt ${fmt(pendlerSavingLarge)} \u20ac. Zus\u00e4tzlich gibt es den Pendlereuro (2 \u20ac pro km Entfernung und Jahr).`);
  } else if (pendIdx === 1) {
    sections.push(`F\u00fcr Pendler lohnt sich bei ${fmtInt(amount)} \u20ac brutto die Geltendmachung besonders: Die kleine Pauschale (ab 20 km einfach) reduziert das zu versteuernde Einkommen um ${fmtInt(pendlerSmall)} \u20ac, was bei einem Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} % eine Ersparnis von ${fmt(pendlerSavingSmall)} \u20ac bedeutet. Bei 60+ km sind es ${fmt(pendlerSavingLarge)} \u20ac weniger Steuer pro Jahr, plus Pendlereuro (2 \u20ac je km).`);
  } else {
    sections.push(`Pendlerregelung bei ${fmtInt(amount)} \u20ac Brutto: Wer t\u00e4glich mehr als 20 km zum Arbeitsort pendelt, kann die Pendlerpauschale geltend machen. Kleine Pauschale (20\u201340 km): ${fmtInt(pendlerSmall)} \u20ac/Jahr, Steuerersparnis ${fmt(pendlerSavingSmall)} \u20ac bei ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz. Gro\u00dfe Pauschale (\u00fcber 60 km): ${fmtInt(pendlerLarge)} \u20ac/Jahr = ${fmt(pendlerSavingLarge)} \u20ac Ersparnis. Der Pendlereuro (2 \u20ac/km/Jahr) kommt als direkter Absetzbetrag hinzu. Voraussetzung: Arbeitsweg mit \u00f6ffentlichen Verkehrsmitteln unzumutbar oder \u00fcber 2 Stunden.`);
  }

  // Section 4 - Sachbez\u00fcge (unique per salary level)
  if (amount <= 2000) {
    sections.push(`Steuerfreie Zuwendungen bei ${fmtInt(amount)} \u20ac brutto: Auch bei niedrigem Einkommen k\u00f6nnen Arbeitgeber das verf\u00fcgbare Einkommen steuer- und abgabenfrei erh\u00f6hen. Essenszusch\u00fcsse (bis 8 \u20ac/Tag = ca. ${fmtInt(essenzuschussJahr)} \u20ac/Jahr steuerfrei), das Klimaticket (${fmtInt(klimaticketJahr)} \u20ac steuerfrei \u00fcbernehmbar), Zukunftsvorsorge (300 \u20ac/Jahr) und Mitarbeiter-Events (bis 365 \u20ac/Jahr) erh\u00f6hen das Netto ohne Abgaben. Insgesamt bis zu ca. ${fmtInt(essenzuschussJahr + klimaticketJahr + 300 + 365)} \u20ac steuerfreie Zusatzleistungen m\u00f6glich.`);
  } else if (amount <= 3000) {
    sections.push(`Benefits als Netto-Turbo bei ${fmtInt(amount)} \u20ac: Steuerfreie Sachbez\u00fcge sind bei ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz eine kluge Alternative zur Gehaltserh\u00f6hung. Essenszuschuss (8 \u20ac/Tag = ${fmtInt(essenzuschussJahr)} \u20ac/Jahr nettofrei, Brutto\u00e4quivalent: ${fmtInt(essenzuschussJahr / (1 - gesamtGrenzsatz))} \u20ac). Klimaticket (${fmtInt(klimaticketJahr)} \u20ac/Jahr, arbeitgeberfinanziert steuerfrei). Zukunftsvorsorge (300 \u20ac steuerfrei). Gesamtwert: bis ${fmtInt((essenzuschussJahr + klimaticketJahr + 300) / (1 - gesamtGrenzsatz))} \u20ac Brutto\u00e4quivalent. Tipp: Beim n\u00e4chsten Mitarbeitergespr\u00e4ch gezielt nach Sachbez\u00fcgen fragen.`);
  } else if (amount <= 4000) {
    sections.push(`Gehalts-Benefits bei ${fmtInt(amount)} \u20ac Brutto: Mit steigendem Grenzsteuersatz (${(grenzsteuersatz * 100).toFixed(0)} %) werden steuerfreie Sachbez\u00fcge immer wertvoller. Rechnung: ${fmtInt(essenzuschussJahr)} \u20ac Essenszuschuss nettofrei = ${fmtInt(essenzuschussJahr / (1 - gesamtGrenzsatz))} \u20ac Bruttowert. ${fmtInt(klimaticketJahr)} \u20ac Klimaticket steuerfrei = ${fmtInt(klimaticketJahr / (1 - gesamtGrenzsatz))} \u20ac Bruttowert. Zukunftsvorsorge (300 \u20ac), Mitarbeiterevents (365 \u20ac/Jahr), Corporate-Benefits-Programme. Summe aller steuerfreien Zusatzleistungen: bis ${fmtInt((essenzuschussJahr + klimaticketJahr + 300 + 365) / (1 - gesamtGrenzsatz))} \u20ac Brutto\u00e4quivalent j\u00e4hrlich.`);
  } else if (amount <= 4500) {
    sections.push(`Nettolohn-Optimierung durch Sachbez\u00fcge bei ${fmtInt(amount)} \u20ac: Der ${(grenzsteuersatz * 100).toFixed(0)}-%-Grenzsteuersatz plus ${(svSatz * 100).toFixed(0)} % SV ergibt eine Gesamtgrenzbelastung von ${((gesamtGrenzsatz) * 100).toFixed(0)} %. Steuerfreie Benefits wirken hier maximal: Essensgutscheine (8 \u20ac/Tag) = Brutto\u00e4quivalent von ${fmtInt(essenzuschussJahr / (1 - gesamtGrenzsatz))} \u20ac/Jahr. Klimaticket (${fmtInt(klimaticketJahr)} \u20ac): Arbeitgeber spart sich die Lohnnebenkosten (ca. 30 %), Arbeitnehmer die Steuer \u2014 Win-win von ca. ${fmtInt(klimaticketJahr * 0.3 + klimaticketJahr * gesamtGrenzsatz)} \u20ac. Zukunftsvorsorge, Mitarbeiterrabatte und Firmenfitness runden das Paket ab.`);
  } else if (amount <= 5500) {
    sections.push(`Premium-Benefits bei ${fmtInt(amount)} \u20ac brutto: Bei einer kombinierten Grenzbelastung von ${((gesamtGrenzsatz) * 100).toFixed(0)} % (Steuer ${(grenzsteuersatz * 100).toFixed(0)} % + SV ${(svSatz * 100).toFixed(0)} %) sind steuerfreie Benefits \u00e4u\u00dferst effizient. Essenszuschuss: 8 \u20ac/Tag = ${fmtInt(essenzuschussJahr)} \u20ac/Jahr nettofrei (Brutto\u00e4quivalent: ${fmtInt(essenzuschussJahr / (1 - gesamtGrenzsatz))} \u20ac). Klimaticket: ${fmtInt(klimaticketJahr)} \u20ac steuerfrei. Zukunftsvorsorge: 300 \u20ac/Jahr. Firmenwagen (Elektro): Sachbezug nur 1,5 % statt 2 % = deutliche Ersparnis. Gesamtpotenzial steuerfreier Leistungen: ${fmtInt((essenzuschussJahr + klimaticketJahr + 300) / (1 - gesamtGrenzsatz))} \u20ac Brutto\u00e4quivalent.`);
  } else {
    sections.push(`Sachbezugs-Strategie bei ${fmtInt(amount)} \u20ac brutto: Mit ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz${svSatz > 0 ? ' plus ' + (svSatz * 100).toFixed(0) + ' % SV' : ' (SV gedeckelt)'} haben steuerfreie Benefits den h\u00f6chsten relativen Nettowert. Essenszuschuss: 8 \u20ac/Tag \u00d7 ca. 200 Tage = ${fmtInt(essenzuschussJahr)} \u20ac nettofrei (Brutto\u00e4quivalent: ${fmtInt(essenzuschussJahr / (1 - gesamtGrenzsatz))} \u20ac). Klimaticket: ${fmtInt(klimaticketJahr)} \u20ac = ${fmtInt(klimaticketJahr / (1 - gesamtGrenzsatz))} \u20ac Bruttoersparnis. Firmenwagen (E-Auto): 1,5 % Sachbezug statt 2 % bei Verbrenner. Betriebliche Pensionszusage: steuerfrei f\u00fcr AN und absetzbar f\u00fcr AG. Gesamtpotenzial: ${fmtInt((essenzuschussJahr + klimaticketJahr + 300) / (1 - gesamtGrenzsatz))} \u20ac Brutto\u00e4quivalent j\u00e4hrlich.`);
  }

  return sections.join(' ');
}

// --- buildFaqs ---

export function buildFaqs(entry: GehaltEntry): { question: string; answer: string }[] {
  const amount = entry.bruttoMonatlich;
  const v = vi(amount);
  const dailyNetto = entry.nettoMonatlich / WORKING_DAYS_PER_MONTH;
  const hourlyNetto = dailyNetto / WORKING_HOURS_PER_DAY;
  const weeklyNetto = entry.nettoMonatlich / 4.33;
  const grenzsteuersatz = amount < 3000 ? 0.30 : amount < 5000 ? 0.40 : amount >= 6060 ? 0.48 : 0.40;
  const raise100Sv = amount >= 6060 ? 0 : 100 * 0.1712;
  const raise100Steuer = (100 - raise100Sv) * grenzsteuersatz;
  const raise100Net = 100 - raise100Sv - raise100Steuer;
  const abgabenquote = ((entry.svGesamt + entry.lohnsteuerMonatlich) / amount * 100).toFixed(1);
  const svAnteil = ((entry.svGesamt / amount) * 100).toFixed(1);
  const lstAnteil = ((entry.lohnsteuerMonatlich / amount) * 100).toFixed(1);

  const faqs: { question: string; answer: string }[] = [];

  // FAQ 1
  faqs.push({
    question: `Was bleibt ${(new Date()).getFullYear()} von ${fmtInt(amount)} \u20ac brutto in \u00d6sterreich netto \u00fcbrig?`,
    answer: `Bei ${fmt(amount)} \u20ac brutto monatlich verbleiben exakt ${fmt(entry.nettoMonatlich)} \u20ac netto. Die Abz\u00fcge: ${fmt(entry.svGesamt)} \u20ac Sozialversicherung (${svAnteil} % vom Brutto) und ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer (${lstAnteil} %). Die Gesamtbelastung betr\u00e4gt ${abgabenquote} %. Auf den Arbeitstag gerechnet sind das ${fmt(dailyNetto)} \u20ac netto (${fmt(hourlyNetto)} \u20ac/Stunde).`,
  });

  // FAQ 2
  faqs.push({
    question: `Wie hoch f\u00e4llt das Jahresgehalt bei ${fmtInt(amount)} \u20ac brutto mit Sonderzahlungen aus?`,
    answer: `Das Jahresbrutto betr\u00e4gt ${fmt(entry.bruttoJaehrlich)} \u20ac (14 Geh\u00e4lter). Nach allen Abz\u00fcgen verbleiben ${fmt(entry.nettoJaehrlich)} \u20ac Jahresnetto. Davon stammen ${fmt(entry.nettoMonatlich * 12)} \u20ac aus 12 Regelgeh\u00e4ltern und ${fmt(entry.sonderzahlungNetto * 2)} \u20ac aus den zwei Sonderzahlungen (\u00e0 ${fmt(entry.sonderzahlungNetto)} \u20ac netto).`,
  });

  // FAQ 3
  faqs.push({
    question: `Welche Sozialversicherungsbeitr\u00e4ge fallen bei ${fmtInt(amount)} \u20ac brutto an?`,
    answer: `Monatliche SV-Beitr\u00e4ge bei ${fmtInt(amount)} \u20ac: Krankenversicherung ${fmt(entry.svKV)} \u20ac (3,87 %), Pensionsversicherung ${fmt(entry.svPV)} \u20ac (10,25 %), Arbeitslosenversicherung ${fmt(entry.svAV)} \u20ac (${entry.svAV === 0 ? '0 % \u2014 Freigrenze 2.093 \u20ac nicht erreicht' : amount <= 2282 ? '1 % \u2014 reduzierter Satz bis 2.282 \u20ac' : amount <= 2471 ? '2 % \u2014 reduzierter Satz bis 2.471 \u20ac' : '3 % \u2014 voller Satz'}). Gesamt: ${fmt(entry.svGesamt)} \u20ac/Monat, ${fmt(entry.svGesamt * 14)} \u20ac/Jahr (14 Geh\u00e4lter). ${amount > 6060 ? 'Hinweis: Die SV ist bei der H\u00f6chstbeitragsgrundlage (6.060 \u20ac) gedeckelt.' : ''}`,
  });

  // FAQ 4
  faqs.push({
    question: `Wie ver\u00e4ndert eine Erh\u00f6hung um 100 \u20ac das Netto bei ${fmtInt(amount)} \u20ac brutto?`,
    answer: `Von 100 \u20ac Bruttomehr bleiben bei ${fmtInt(amount)} \u20ac ca. ${fmt(raise100Net)} \u20ac netto \u00fcbrig (${(raise100Net).toFixed(0)} %). ${amount >= 6060 ? `Da die SV-H\u00f6chstgrenze \u00fcberschritten ist, entf\u00e4llt der SV-Abzug. Es greift nur der Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} %.` : `Abz\u00fcge: ca. ${fmt(raise100Sv)} \u20ac SV (17,12 %) und ${fmt(raise100Steuer)} \u20ac Lohnsteuer (Grenzsteuersatz ${(grenzsteuersatz * 100).toFixed(0)} % auf den SV-bereinigten Betrag).`} J\u00e4hrlich (14 Geh\u00e4lter) bedeutet +100 \u20ac brutto ca. +${fmt(raise100Net * 12 + raise100Net * 2 * 0.94)} \u20ac netto mehr.`,
  });

  // FAQ 5
  faqs.push({
    question: `Was verdient man bei ${fmtInt(amount)} \u20ac brutto pro Woche, Tag und Stunde netto?`,
    answer: `Woche: ca. ${fmt(weeklyNetto)} \u20ac netto (${fmtInt(amount)} \u20ac \u00f7 4,33 Wochen abz\u00fcgl. Abgaben). Arbeitstag: ${fmt(dailyNetto)} \u20ac netto (22 Tage/Monat). Stunde: ${fmt(hourlyNetto)} \u20ac netto (8h-Tag). Brutto-Stundenlohn zum Vergleich: ${fmt(amount / WORKING_DAYS_PER_MONTH / WORKING_HOURS_PER_DAY)} \u20ac \u2014 die Differenz von ${fmt(amount / WORKING_DAYS_PER_MONTH / WORKING_HOURS_PER_DAY - hourlyNetto)} \u20ac/Stunde geht an SV und Steuer.`,
  });

  // FAQ 6
  faqs.push({
    question: `Wie funktioniert die 6-%-Besteuerung der Sonderzahlungen bei ${fmtInt(amount)} \u20ac?`,
    answer: `Berechnung bei ${fmtInt(amount)} \u20ac brutto: Sonderzahlung (${fmt(amount)} \u20ac) minus SV (${fmt(entry.sonderzahlungSV)} \u20ac) minus Freibetrag (620 \u20ac) = Steuerbasis ${fmt(Math.max(0, amount - entry.sonderzahlungSV - 620))} \u20ac. Darauf 6 % = ${fmt(entry.sonderzahlungSteuer)} \u20ac Steuer. Netto pro Sonderzahlung: ${fmt(entry.sonderzahlungNetto)} \u20ac. Regul\u00e4res Monatsnetto: ${fmt(entry.nettoMonatlich)} \u20ac. Vorteil: ${fmt(entry.sonderzahlungNetto - entry.nettoMonatlich)} \u20ac mehr netto durch die Beg\u00fcnstigung.`,
  });

  return faqs;
}

// --- getRaiseSimulation ---

export function getRaiseSimulation(entry: GehaltEntry): string {
  const amount = entry.bruttoMonatlich;
  const v = vi(amount);
  const grenzsteuersatz = amount < 3000 ? 0.30 : amount < 5000 ? 0.40 : amount >= 6060 ? 0.48 : 0.40;
  const svSatz = amount >= 6060 ? 0 : 0.1712;
  const currentAbgaben = entry.svGesamt + entry.lohnsteuerMonatlich;
  const currentAbgabenProzent = ((currentAbgaben / amount) * 100).toFixed(1);

  // Different raise amounts per salary level
  const raises = amount <= 2000 ? [150, 350, 700] :
                 amount <= 2500 ? [200, 400, 800] :
                 amount <= 3000 ? [250, 500, 900] :
                 amount <= 3500 ? [300, 600, 1200] :
                 amount <= 4000 ? [350, 700, 1100] :
                 amount <= 4500 ? [400, 800, 1500] :
                 amount <= 5000 ? [500, 1000, 1500] :
                 amount <= 5500 ? [500, 1000, 2000] :
                 amount <= 6000 ? [600, 1200, 1800] :
                 amount <= 7000 ? [500, 1000, 2000] :
                 [700, 1500, 2500];

  const lines: string[] = [];

  // Varied intro
  if (v % 3 === 0) {
    lines.push(`Gehaltsverhandlung bei ${fmtInt(amount)} \u20ac brutto: Wie viel kommt von einer Erh\u00f6hung tats\u00e4chlich auf dem Konto an? Bei einer aktuellen Abgabenlast von ${currentAbgabenProzent} % (${fmt(currentAbgaben)} \u20ac monatlich) gilt f\u00fcr die n\u00e4chsten Euros ein Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} %${svSatz > 0 ? ` plus ${(svSatz * 100).toFixed(1)} % SV-Beitr\u00e4ge` : ' (SV entf\u00e4llt \u2014 H\u00f6chstbeitragsgrundlage erreicht)'}.`);
  } else if (v % 3 === 1) {
    lines.push(`Die Frage \u201eWie viel bleibt von einer Gehaltserh\u00f6hung netto?\u201c ist bei ${fmtInt(amount)} \u20ac brutto besonders relevant. Derzeit betr\u00e4gt die Abgabenquote ${currentAbgabenProzent} %. F\u00fcr jeden zus\u00e4tzlichen Euro greift ${amount >= 6060 ? 'nur noch der Lohnsteuersatz von 48 %, da keine SV mehr anf\u00e4llt' : `ein kombinierter Grenzsatz von ca. ${((svSatz + grenzsteuersatz * (1 - svSatz)) * 100).toFixed(0)} % (SV + Lohnsteuer)`}.`);
  } else {
    lines.push(`Netto-Effekt einer Gehaltserh\u00f6hung bei ${fmtInt(amount)} \u20ac brutto: Aktuell flie\u00dfen ${fmt(currentAbgaben)} \u20ac (${currentAbgabenProzent} %) an Abgaben ab. Die marginale Belastung auf zus\u00e4tzliches Einkommen betr\u00e4gt ${amount >= 6060 ? '48 % (nur Lohnsteuer, SV bereits gedeckelt)' : `ca. ${((svSatz + grenzsteuersatz * (1 - svSatz)) * 100).toFixed(0)} % (Lohnsteuer ${(grenzsteuersatz * 100).toFixed(0)} % + SV ${(svSatz * 100).toFixed(0)} %)`}.`);
  }

  for (const raise of raises) {
    const svAbzug = Math.min(raise, Math.max(0, 6060 - amount)) * svSatz;
    const steuerAbzug = (raise - svAbzug) * grenzsteuersatz;
    const nettoPlus = raise - svAbzug - steuerAbzug;
    const nettoProzent = ((nettoPlus / raise) * 100).toFixed(0);
    const jahresPlus = nettoPlus * 14;
    lines.push(`+${fmtInt(raise)} \u20ac brutto (neues Gehalt: ${fmtInt(amount + raise)} \u20ac): Netto-Zugewinn ca. ${fmt(nettoPlus)} \u20ac/Monat (${nettoProzent} % Nettoanteil). Jahreseffekt bei 14 Geh\u00e4ltern: +${fmt(jahresPlus)} \u20ac netto.`);
  }

  // Closing with salary-specific advice
  if (amount <= 2000) {
    lines.push(`Tipp: Bei ${fmtInt(amount)} \u20ac brutto lohnt sich eine Erh\u00f6hung besonders, da der Grenzsteuersatz noch bei ${(grenzsteuersatz * 100).toFixed(0)} % liegt. Bereits eine kleine Erh\u00f6hung auf 2.200\u20132.500 \u20ac bringt deutlich mehr Netto. Alternativ k\u00f6nnen steuerfreie Benefits (Essenszuschuss, \u00d6ffi-Ticket) den gleichen Nettoeffekt bei geringeren Arbeitgeberkosten erzielen.`);
  } else if (amount <= 3000) {
    lines.push(`Tipp bei ${fmtInt(amount)} \u20ac: Der Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} % ist moderat. Eine Verhandlung auf 3.500+ \u20ac bringt \u00fcberproportional viel Netto, da die SV prozentual gleich bleibt. Steuerfreie Zulagen (SEG-Zulagen, \u00dcberstundenzuschl\u00e4ge) und Benefits vom Arbeitgeber sind eine clevere Alternative zur reinen Bruttosteigerung.`);
  } else if (amount <= 4000) {
    lines.push(`Strategie bei ${fmtInt(amount)} \u20ac: Der ${(grenzsteuersatz * 100).toFixed(0)}-%-Grenzsteuersatz macht es sinnvoll, Erh\u00f6hungen teils als steuerfreie Benefits zu verhandeln (Essenszuschuss, Klimaticket, Zukunftsvorsorge). Eine Erh\u00f6hung Richtung SV-Grenze (6.060 \u20ac) lohnt sich langfristig, da ab dieser Schwelle keine SV mehr anf\u00e4llt.`);
  } else if (amount <= 5000) {
    lines.push(`Perspektive bei ${fmtInt(amount)} \u20ac: Der Weg zur SV-H\u00f6chstbeitragsgrundlage (6.060 \u20ac) ist greifbar. Eine Erh\u00f6hung um ${fmtInt(6060 - amount)} \u20ac w\u00fcrde daf\u00fcr sorgen, dass k\u00fcnftige Gehaltssteigerungen nur noch mit ${(grenzsteuersatz * 100).toFixed(0)} % Lohnsteuer belastet werden (statt ${((svSatz + grenzsteuersatz * (1 - svSatz)) * 100).toFixed(0)} % kombiniert).`);
  } else if (amount < 6060) {
    lines.push(`Schl\u00fcsselstrategie bei ${fmtInt(amount)} \u20ac: Nur noch ${fmtInt(6060 - amount)} \u20ac fehlen bis zur SV-H\u00f6chstbeitragsgrundlage! Ab 6.060 \u20ac brutto entf\u00e4llt die SV auf jeden Mehrverdienst. Jeder Euro dar\u00fcber wird nur mit ${(grenzsteuersatz * 100).toFixed(0)} % Lohnsteuer belastet statt mit ${((svSatz + grenzsteuersatz * (1 - svSatz)) * 100).toFixed(0)} % kombiniert \u2014 ein Unterschied von ${(((svSatz + grenzsteuersatz * (1 - svSatz)) - grenzsteuersatz) * 100).toFixed(0)} Prozentpunkten.`);
  } else if (amount <= 7000) {
    lines.push(`Vorteil bei ${fmtInt(amount)} \u20ac: Die SV-Grenze ist bereits \u00fcberschritten \u2014 von jeder Erh\u00f6hung flie\u00dfen ${((1 - grenzsteuersatz) * 100).toFixed(0)} % direkt ins Netto ohne SV-Abzug. Verhandlungstipp: Variable Gehaltsbestandteile (Bonus, Tantieme) sind bei gedeckelter SV besonders netto-effektiv. Erg\u00e4nzend: Pensionsfonds-Zuschuss (300 \u20ac steuerfrei) oder Firmenwagen (Sachbezugsvorteil bei E-Auto).`);
  } else {
    lines.push(`Executive-Tipp bei ${fmtInt(amount)} \u20ac: Da die SV-Grenze weit \u00fcberschritten ist, flie\u00dfen ${((1 - grenzsteuersatz) * 100).toFixed(0)} % jeder Erh\u00f6hung direkt ins Netto. Auf diesem Niveau empfiehlt sich: Variable Verg\u00fctung maximieren (Bonus: nur bei Zufluss besteuert), Firmenbeteiligung verhandeln (3.000 \u20ac/Jahr steuerbeg\u00fcnstigt), Sachbez\u00fcge optimieren (E-Firmenwagen: 1,5 % statt 2 % Sachbezug), betriebliche Pensionszusage vereinbaren.`);
  }

  return lines.join(' ');
}

// --- getBudgetBreakdown ---

export function getBudgetBreakdown(entry: GehaltEntry): string {
  const net = entry.nettoMonatlich;
  const amount = entry.bruttoMonatlich;
  const v = vi(amount);

  // Budget allocation varies by income level with unique thresholds
  let wohnen: number, lebensmittel: number, transport: number, versicherung: number, freizeit: number, sparen: number, sonstiges: number;

  if (net < 1400) {
    wohnen = 0.40; lebensmittel = 0.22; transport = 0.08; versicherung = 0.05; freizeit = 0.10; sparen = 0.08; sonstiges = 0.07;
  } else if (net < 1700) {
    wohnen = 0.37; lebensmittel = 0.19; transport = 0.09; versicherung = 0.06; freizeit = 0.12; sparen = 0.10; sonstiges = 0.07;
  } else if (net < 2200) {
    wohnen = 0.33; lebensmittel = 0.17; transport = 0.09; versicherung = 0.07; freizeit = 0.13; sparen = 0.14; sonstiges = 0.07;
  } else if (net < 2800) {
    wohnen = 0.30; lebensmittel = 0.14; transport = 0.08; versicherung = 0.07; freizeit = 0.14; sparen = 0.20; sonstiges = 0.07;
  } else if (net < 3500) {
    wohnen = 0.27; lebensmittel = 0.12; transport = 0.07; versicherung = 0.06; freizeit = 0.15; sparen = 0.26; sonstiges = 0.07;
  } else if (net < 4200) {
    wohnen = 0.25; lebensmittel = 0.10; transport = 0.06; versicherung = 0.06; freizeit = 0.16; sparen = 0.30; sonstiges = 0.07;
  } else {
    wohnen = 0.22; lebensmittel = 0.09; transport = 0.05; versicherung = 0.05; freizeit = 0.17; sparen = 0.35; sonstiges = 0.07;
  }

  const wohnenEur = net * wohnen;
  const lebensmittelEur = net * lebensmittel;
  const transportEur = net * transport;
  const versicherungEur = net * versicherung;
  const freizeitEur = net * freizeit;
  const sparenEur = net * sparen;
  const sonstigesEur = net * sonstiges;
  const notgroschenMonate = 3;
  const notgroschen = net * notgroschenMonate;
  const sparenJahr = sparenEur * 12;
  const sparen10Jahre = sparenEur * 12 * 10 * 1.35; // ~6% p.a. \u00fcber 10 Jahre

  const parts: string[] = [];

  // Unique intro per salary level
  if (net < 1500) {
    parts.push(`Bei ${fmt(net)} \u20ac Netto (${fmtInt(amount)} \u20ac brutto) ist eine straffe Budgetplanung essenziell. Die folgende Aufteilung orientiert sich an der 50/30/20-Regel, angepasst f\u00fcr Geringverdiener in \u00d6sterreich:`);
  } else if (net < 2200) {
    parts.push(`Mit ${fmt(net)} \u20ac monatlichem Netto (aus ${fmtInt(amount)} \u20ac brutto) l\u00e4sst sich in \u00d6sterreich ein solides Budget aufstellen. Empfohlene Verteilung nach der angepassten 50/30/20-Methode:`);
  } else if (net < 3200) {
    parts.push(`Ein Nettoeinkommen von ${fmt(net)} \u20ac (bei ${fmtInt(amount)} \u20ac brutto) bietet guten Spielraum f\u00fcr gezielte Verm\u00f6gensbildung. Hier eine praxiserprobte Budgetaufteilung f\u00fcr dieses Einkommensniveau:`);
  } else if (net < 4200) {
    parts.push(`Bei ${fmt(net)} \u20ac Netto (${fmtInt(amount)} \u20ac brutto) empfiehlt sich eine Budgetstrategie mit hohem Sparanteil. Die prozentuale Aufteilung verschiebt sich gegen\u00fcber niedrigeren Einkommen deutlich zugunsten des Verm\u00f6gensaufbaus:`);
  } else {
    parts.push(`Mit einem Nettoeinkommen von ${fmt(net)} \u20ac monatlich (${fmtInt(amount)} \u20ac brutto) steht eine komfortable Ausgangslage f\u00fcr ambitioniertes Sparen und Investieren zur Verf\u00fcgung:`);
  }

  parts.push(`Wohnen: ${fmt(wohnenEur)} \u20ac/Monat (${(wohnen * 100).toFixed(0)} %). ${net < 1800 ? 'In Wien liegt die durchschnittliche Miete f\u00fcr eine 45-m\u00b2-Wohnung bei ca. 650\u2013800 \u20ac warm \u2014 eine WG oder Gemeindewohnung kann hier finanziellen Freiraum schaffen.' : net < 3000 ? 'Damit ist eine 55\u201365-m\u00b2-Mietwohnung in mittlerer Lage finanzierbar. In Wien (Bezirke 10\u201323) oder in Landeshauptst\u00e4dten au\u00dferhalb des Zentrums.' : net < 4000 ? 'Ausreichend f\u00fcr eine hochwertige Mietwohnung (70\u201380 m\u00b2) in guter Lage oder die Rate f\u00fcr eine Eigentumswohnung.' : 'Komfortabel f\u00fcr eine gro\u00dfz\u00fcgige Wohnung in Top-Lage oder eine Kreditrate f\u00fcr Wohneigentum.'}`);

  parts.push(`Lebensmittel & Haushalt: ${fmt(lebensmittelEur)} \u20ac (${(lebensmittel * 100).toFixed(0)} %). ${net < 2000 ? 'Tipp: Aktionspreise nutzen und Mahlzeiten vorkochen spart bei diesem Budget ca. 80\u2013120 \u20ac/Monat.' : 'Ausreichend f\u00fcr qualit\u00e4tsbewusste Ern\u00e4hrung mit Bio-Anteil und gelegentlichem Restaurantbesuch.'}`);

  parts.push(`Mobilit\u00e4t: ${fmt(transportEur)} \u20ac (${(transport * 100).toFixed(0)} %). Das Klimaticket \u00d6sterreich (91 \u20ac/Monat) deckt den gesamten \u00f6ffentlichen Verkehr ab. ${net < 2500 ? 'Bei diesem Einkommen ist \u00d6ffi-Nutzung klar wirtschaftlicher als ein eigenes Auto.' : `Alternativ: Autokosten (Versicherung, Treibstoff, Wartung) liegen bei ca. 350\u2013500 \u20ac/Monat \u2014 bei ${fmt(transportEur)} \u20ac Budget w\u00e4re ein KFZ ${transportEur > 400 ? 'knapp finanzierbar' : 'eine Belastung f\u00fcr das Budget'}.`}`);

  parts.push(`Sparen & Investieren: ${fmt(sparenEur)} \u20ac (${(sparen * 100).toFixed(0)} %). ${net < 1800 ? `Priorit\u00e4t: Notgroschen von ${fmt(notgroschen)} \u20ac aufbauen (3 Monate Netto). Danach: ETF-Sparplan ab 50 \u20ac/Monat.` : net < 3000 ? `Empfehlung: Erst Notgroschen (${fmt(notgroschen)} \u20ac = 3 Monatsgeh\u00e4lter), dann Investition in breit gestreute ETFs. Bei ${fmt(sparenEur)} \u20ac monatlich: ca. ${fmtInt(sparenJahr)} \u20ac/Jahr, in 10 Jahren rund ${fmtInt(sparen10Jahre)} \u20ac (bei 6 % p.a.).` : `Bei ${fmt(sparenEur)} \u20ac monatlicher Sparrate (${fmtInt(sparenJahr)} \u20ac/Jahr) und 6 % Rendite ergeben sich in 10 Jahren ca. ${fmtInt(sparen10Jahre)} \u20ac. Diversifikation: 70 % Welt-ETF, 20 % Europa-Aktien, 10 % Anleihen.`}`);

  parts.push(`Versicherung & Vorsorge: ${fmt(versicherungEur)} \u20ac (${(versicherung * 100).toFixed(0)} %). Empfohlen: Private Haftpflicht (ca. 5\u20138 \u20ac/Monat), Haushaltsversicherung (15\u201325 \u20ac), ${net > 3000 ? 'Berufsunf\u00e4higkeitsversicherung (60\u2013120 \u20ac).' : 'ggf. Unfallversicherung (10\u201320 \u20ac).'}`);

  return parts.join(' ');
}

// --- getUniqueComparisons ---

export function getUniqueComparisons(entry: GehaltEntry, allEntries: GehaltEntry[]): string {
  const amount = entry.bruttoMonatlich;
  const currentIdx = allEntries.findIndex(e => e.bruttoMonatlich === amount);
  const prev = currentIdx > 0 ? allEntries[currentIdx - 1] : null;
  const next = currentIdx < allEntries.length - 1 ? allEntries[currentIdx + 1] : null;
  const v = vi(amount);

  const parts: string[] = [];

  // Unique intro per salary
  if (amount <= 1500) {
    parts.push(`${fmtInt(amount)} \u20ac brutto im Vergleich: Wie positioniert sich dieses Einstiegsgehalt gegen\u00fcber h\u00f6heren Einkommensstufen und welchen Nettoeffekt h\u00e4tte ein Aufstieg?`);
  } else if (amount <= 2500) {
    parts.push(`${fmtInt(amount)} \u20ac brutto im Vergleich: Wie positioniert sich dieses Gehalt in der \u00f6sterreichischen Einkommenslandschaft und was \u00e4ndert sich beim Wechsel auf eine benachbarte Stufe?`);
  } else if (amount <= 3000) {
    parts.push(`Einordnung von ${fmtInt(amount)} \u20ac brutto: Nahe am \u00f6sterreichischen Median zeigt der Vergleich mit benachbarten Gehaltsstufen, wie sich Abgabenquote und Nettoertrag entwickeln.`);
  } else if (amount <= 3500) {
    parts.push(`Vergleichsanalyse bei ${fmtInt(amount)} \u20ac brutto: \u00dcber dem Median angesiedelt, lohnt ein Blick auf die Auswirkungen eines Auf- oder Abstiegs bei der Gehaltsklasse.`);
  } else if (amount <= 4500) {
    parts.push(`Gehaltsvergleich rund um ${fmtInt(amount)} \u20ac brutto: Ab diesem Niveau steigt die Progression sp\u00fcrbar \u2014 ein Blick auf die Nachbarstufen verdeutlicht den Effekt.`);
  } else if (amount <= 5500) {
    parts.push(`${fmtInt(amount)} \u20ac brutto im gehobenen Segment: Die Steuerprogression greift hier deutlich \u2014 der Vergleich zeigt, wie viel vom Bruttomehr tats\u00e4chlich netto ankommt.`);
  } else if (amount <= 6000) {
    parts.push(`${fmtInt(amount)} \u20ac brutto im Kontext der SV-H\u00f6chstbeitragsgrundlage: Die N\u00e4he zur 6.060-\u20ac-Grenze macht den Vergleich mit h\u00f6heren Stufen besonders spannend.`);
  } else if (amount <= 7000) {
    parts.push(`Vergleichsanalyse bei ${fmtInt(amount)} \u20ac brutto: \u00dcber der SV-Deckelung ver\u00e4ndert sich die Netto-Dynamik \u2014 nur noch die Lohnsteuer greift auf Mehrverdienst zu.`);
  } else {
    parts.push(`Spitzenverdiener-Vergleich bei ${fmtInt(amount)} \u20ac brutto: Im obersten Einkommenssegment bestimmt ausschlie\u00dflich der 48-%-Grenzsteuersatz die Nettowirkung von Gehaltsunterschieden.`);
  }

  if (prev) {
    const nettoDiff = entry.nettoMonatlich - prev.nettoMonatlich;
    const bruttoDiff = amount - prev.bruttoMonatlich;
    const nettoQuote = ((nettoDiff / bruttoDiff) * 100).toFixed(1);
    const steuersatzDiff = ((entry.effektiverSteuersatz - prev.effektiverSteuersatz) * 100).toFixed(1);
    parts.push(`Vergleich nach unten (${fmtInt(prev.bruttoMonatlich)} \u20ac \u2192 ${fmtInt(amount)} \u20ac): Die Differenz von ${fmtInt(bruttoDiff)} \u20ac brutto bringt ${fmt(nettoDiff)} \u20ac zus\u00e4tzliches Monatsnetto (${nettoQuote} % Nettoquote). Der effektive Steuersatz steigt dabei um ${steuersatzDiff} Prozentpunkte (von ${(prev.effektiverSteuersatz * 100).toFixed(1)} % auf ${(entry.effektiverSteuersatz * 100).toFixed(1)} %). Jahresdifferenz: ${fmt(entry.nettoJaehrlich - prev.nettoJaehrlich)} \u20ac mehr Jahresnetto.`);
  }

  if (next) {
    const nettoDiff = next.nettoMonatlich - entry.nettoMonatlich;
    const bruttoDiff = next.bruttoMonatlich - amount;
    const nettoQuote = ((nettoDiff / bruttoDiff) * 100).toFixed(1);
    const steuersatzDiff = ((next.effektiverSteuersatz - entry.effektiverSteuersatz) * 100).toFixed(1);
    parts.push(`Vergleich nach oben (${fmtInt(amount)} \u20ac \u2192 ${fmtInt(next.bruttoMonatlich)} \u20ac): +${fmtInt(bruttoDiff)} \u20ac brutto ergeben +${fmt(nettoDiff)} \u20ac monatlich netto (${nettoQuote} % Nettoquote). Die Abgabenquote w\u00fcrde um ${steuersatzDiff} Prozentpunkte auf ${(next.effektiverSteuersatz * 100).toFixed(1)} % steigen. Jahresplus: ${fmt(next.nettoJaehrlich - entry.nettoJaehrlich)} \u20ac netto.`);
  }

  // Median comparison - unique per level
  const medianNetto = 2304; // approx netto at 3200 brutto
  const medianDiffBrutto = amount - AUSTRIAN_MEDIAN_MONTHLY;
  const medianDiffNetto = entry.nettoMonatlich - medianNetto;
  if (medianDiffBrutto < -500) {
    parts.push(`Abstand zum Median: ${fmtInt(amount)} \u20ac brutto liegen ${fmtInt(Math.abs(medianDiffBrutto))} \u20ac unter dem \u00f6sterreichischen Median von ${fmtInt(AUSTRIAN_MEDIAN_MONTHLY)} \u20ac. Netto bedeutet das ca. ${fmt(Math.abs(medianDiffNetto))} \u20ac weniger pro Monat (${fmt(Math.abs(medianDiffNetto) * 14)} \u20ac weniger pro Jahr bei 14 Geh\u00e4ltern).`);
  } else if (medianDiffBrutto < 500) {
    parts.push(`Median-N\u00e4he: Mit ${fmtInt(amount)} \u20ac brutto liegt man ${medianDiffBrutto >= 0 ? `${fmtInt(medianDiffBrutto)} \u20ac \u00fcber` : `${fmtInt(Math.abs(medianDiffBrutto))} \u20ac unter`} dem \u00f6sterreichischen Median (${fmtInt(AUSTRIAN_MEDIAN_MONTHLY)} \u20ac). Das Netto von ${fmt(entry.nettoMonatlich)} \u20ac weicht um ${fmt(Math.abs(medianDiffNetto))} \u20ac vom gesch\u00e4tzten Medien-Netto (${fmtInt(medianNetto)} \u20ac) ab.`);
  } else {
    parts.push(`Median-\u00dcberschuss: ${fmtInt(amount)} \u20ac brutto liegen ${fmtInt(medianDiffBrutto)} \u20ac \u00fcber dem Median (${fmtInt(AUSTRIAN_MEDIAN_MONTHLY)} \u20ac). Das Netto von ${fmt(entry.nettoMonatlich)} \u20ac \u00fcbersteigt das Median-Netto (ca. ${fmtInt(medianNetto)} \u20ac) um ${fmt(medianDiffNetto)} \u20ac monatlich \u2014 j\u00e4hrlich ein Mehr von rund ${fmtInt(medianDiffNetto * 14)} \u20ac.`);
  }

  return parts.join(' ');
}

// --- getSonderzahlungenContext ---

export function getSonderzahlungenContext(entry: GehaltEntry): string {
  const amount = entry.bruttoMonatlich;
  const v = vi(amount);
  const sonderzahlungNettoJahr = entry.sonderzahlungNetto * 2;
  const sonderzahlungSteuerJahr = entry.sonderzahlungSteuer * 2;
  const sonderzahlungSVJahr = entry.sonderzahlungSV * 2;
  const regularNettoJahr = entry.nettoMonatlich * 12;
  const sonderzahlungAnteil = ((sonderzahlungNettoJahr / entry.nettoJaehrlich) * 100).toFixed(1);
  const steuerVorteil = entry.sonderzahlungNetto - entry.nettoMonatlich;
  const steuerbasis = Math.max(0, amount - entry.sonderzahlungSV - 620);
  const hypothetischVollTarif = amount - entry.svGesamt - entry.lohnsteuerMonatlich;
  const gesamtVorteilJahr = steuerVorteil * 2;

  // Completely unique paragraph per salary level
  if (amount <= 1500) {
    return `Bei ${fmtInt(amount)} \u20ac brutto wirken sich die Sonderzahlungen besonders positiv aus: Da die Lohnsteuer auf das regul\u00e4re Gehalt ohnehin minimal ist (${fmt(entry.lohnsteuerMonatlich)} \u20ac/Monat), bringt die 6-%-Pauschalbesteuerung der Sonderzahlungen einen proportional hohen Vorteil. Konkret: Pro Sonderzahlung (brutto ${fmt(amount)} \u20ac) werden ${fmt(entry.sonderzahlungSV)} \u20ac SV abgezogen. Die Steuerbasis (${fmt(amount)} \u2212 ${fmt(entry.sonderzahlungSV)} \u2212 620 \u20ac Freibetrag = ${fmt(steuerbasis)} \u20ac) wird mit nur 6 % besteuert: ${fmt(entry.sonderzahlungSteuer)} \u20ac. Netto-Ergebnis: ${fmt(entry.sonderzahlungNetto)} \u20ac pro Sonderzahlung. Im Jahr liefern beide Sonderzahlungen zusammen ${fmt(sonderzahlungNettoJahr)} \u20ac \u2014 das sind ${sonderzahlungAnteil} % des Jahresnettos von ${fmt(entry.nettoJaehrlich)} \u20ac.`;
  }
  if (amount <= 2500) {
    return `Die Sonderzahlungsmechanik bei ${fmtInt(amount)} \u20ac brutto: Urlaubsgeld (Juni) und Weihnachtsgeld (November) werden jeweils in H\u00f6he des Bruttomonatsgehalts ausbezahlt. Rechenweg: ${fmt(amount)} \u20ac brutto minus ${fmt(entry.sonderzahlungSV)} \u20ac SV-Beitr\u00e4ge minus 620 \u20ac Freibetrag ergibt eine Steuerbasis von ${fmt(steuerbasis)} \u20ac. Darauf fallen 6 % Pauschalsteuer an: ${fmt(entry.sonderzahlungSteuer)} \u20ac. Netto pro Sonderzahlung: ${fmt(entry.sonderzahlungNetto)} \u20ac. Vergleich: Das regul\u00e4re Monatsnetto betr\u00e4gt nur ${fmt(entry.nettoMonatlich)} \u20ac \u2014 die Sonderzahlung bringt also ${fmt(steuerVorteil)} \u20ac mehr. \u00dcber das Jahr betrachtet flie\u00dfen ${fmt(regularNettoJahr)} \u20ac aus 12 Regelgeh\u00e4ltern und ${fmt(sonderzahlungNettoJahr)} \u20ac aus Sonderzahlungen (${sonderzahlungAnteil} % des Gesamtnettos). Der Steuervorteil gegen\u00fcber einer Regelbesteuerung betr\u00e4gt j\u00e4hrlich ca. ${fmt(gesamtVorteilJahr)} \u20ac.`;
  }
  if (amount <= 3500) {
    return `Bei ${fmtInt(amount)} \u20ac brutto zeigt sich der Sonderzahlungsvorteil besonders deutlich, weil das regul\u00e4re Gehalt bereits dem 30\u201340-%-Tarif unterliegt, die Sonderzahlungen aber nur mit 6 % besteuert werden. Schritt f\u00fcr Schritt: Brutto-Sonderzahlung ${fmt(amount)} \u20ac, abz\u00fcglich ${fmt(entry.sonderzahlungSV)} \u20ac SV ergibt ${fmt(amount - entry.sonderzahlungSV)} \u20ac. Nach Abzug des Freibetrags (620 \u20ac) bleibt eine Steuerbasis von ${fmt(steuerbasis)} \u20ac. 6 % davon: ${fmt(entry.sonderzahlungSteuer)} \u20ac Steuer. Netto: ${fmt(entry.sonderzahlungNetto)} \u20ac \u2014 gegen\u00fcber ${fmt(entry.nettoMonatlich)} \u20ac regul\u00e4rem Monatsnetto ein Plus von ${fmt(steuerVorteil)} \u20ac. Die Sonderzahlungen machen ${sonderzahlungAnteil} % des Jahresnettos (${fmt(entry.nettoJaehrlich)} \u20ac) aus. J\u00e4hrliche SV auf Sonderzahlungen: ${fmt(sonderzahlungSVJahr)} \u20ac, j\u00e4hrliche Steuer: nur ${fmt(sonderzahlungSteuerJahr)} \u20ac.`;
  }
  if (amount <= 5000) {
    return `Das 13. und 14. Gehalt bei ${fmtInt(amount)} \u20ac brutto: Hier wird der Unterschied zwischen 6-%-Pauschale und regul\u00e4rem Tarif (Grenzsteuersatz 40 %) besonders greifbar. Jede Sonderzahlung liefert ${fmt(entry.sonderzahlungNetto)} \u20ac netto \u2014 das sind ${fmt(steuerVorteil)} \u20ac mehr als das laufende Monatsnetto von ${fmt(entry.nettoMonatlich)} \u20ac. Berechnungsdetail: ${fmt(amount)} \u20ac Brutto \u2212 ${fmt(entry.sonderzahlungSV)} \u20ac SV \u2212 620 \u20ac Freibetrag = ${fmt(steuerbasis)} \u20ac Steuerbasis \u00d7 6 % = ${fmt(entry.sonderzahlungSteuer)} \u20ac Steuer. Zusammen bringen die Sonderzahlungen ${fmt(sonderzahlungNettoJahr)} \u20ac/Jahr netto ein, bei nur ${fmt(sonderzahlungSteuerJahr)} \u20ac Gesamtsteuer und ${fmt(sonderzahlungSVJahr)} \u20ac SV. Das entspricht ${sonderzahlungAnteil} % des Jahresnettos. In L\u00e4ndern ohne Sonderzahlungssystem w\u00fcrde das gleiche Jahresbrutto deutlich h\u00f6her besteuert.`;
  }
  if (amount <= 6000) {
    return `Sonderzahlungen bei ${fmtInt(amount)} \u20ac brutto \u2014 nahe der SV-H\u00f6chstgrenze: Die SV-Beitr\u00e4ge auf die Sonderzahlung betragen ${fmt(entry.sonderzahlungSV)} \u20ac (identisch mit dem regul\u00e4ren Gehalt, da ${fmtInt(amount)} \u20ac unter 6.060 \u20ac liegt). Steuerbasis: ${fmt(amount)} \u2212 ${fmt(entry.sonderzahlungSV)} \u2212 620 = ${fmt(steuerbasis)} \u20ac. Pauschalsteuer (6 %): ${fmt(entry.sonderzahlungSteuer)} \u20ac. Netto pro Sonderzahlung: ${fmt(entry.sonderzahlungNetto)} \u20ac. Das regul\u00e4re Monatsnetto (${fmt(entry.nettoMonatlich)} \u20ac) liegt ${fmt(steuerVorteil)} \u20ac niedriger \u2014 ein klarer Beweis f\u00fcr die Wirksamkeit der 6-%-Regelung. J\u00e4hrlicher Gesamteffekt: ${fmt(sonderzahlungNettoJahr)} \u20ac netto aus Sonderzahlungen bei ${fmt(sonderzahlungSteuerJahr + sonderzahlungSVJahr)} \u20ac Gesamtabgaben. Anteil am Jahresnetto: ${sonderzahlungAnteil} %.`;
  }
  if (amount <= 7000) {
    return `Sonderzahlungen bei ${fmtInt(amount)} \u20ac brutto \u2014 maximaler Steuervorteil dank SV-Deckelung: Da ${fmtInt(amount)} \u20ac die H\u00f6chstbeitragsgrundlage (6.060 \u20ac) \u00fcbersteigt, sind die SV-Beitr\u00e4ge auf die Sonderzahlung bei ${fmt(entry.sonderzahlungSV)} \u20ac gedeckelt. Berechnung: ${fmt(amount)} \u20ac Brutto minus ${fmt(entry.sonderzahlungSV)} \u20ac gedeckelte SV minus 620 \u20ac Freibetrag = ${fmt(steuerbasis)} \u20ac Steuerbasis. Darauf 6 % Pauschale: ${fmt(entry.sonderzahlungSteuer)} \u20ac. Ergebnis: ${fmt(entry.sonderzahlungNetto)} \u20ac netto pro Sonderzahlung. Zum Vergleich: Das regul\u00e4re Monatsnetto (${fmt(entry.nettoMonatlich)} \u20ac) unterliegt einem Grenzsteuersatz von 48 %. Dadurch ergibt sich ein Mehrertrag von ${fmt(steuerVorteil)} \u20ac pro Sonderzahlung. J\u00e4hrlich flie\u00dfen ${fmt(sonderzahlungNettoJahr)} \u20ac netto aus Sonderzahlungen (${sonderzahlungAnteil} % des Jahresnettos). Gesamtabgaben auf beide Zahlungen: lediglich ${fmt(sonderzahlungSteuerJahr + sonderzahlungSVJahr)} \u20ac.`;
  }
  // 8000+
  return `Die Sonderzahlungsmechanik bei Spitzengeh\u00e4ltern von ${fmtInt(amount)} \u20ac brutto: Durch die H\u00f6chstbeitragsgrundlage (6.060 \u20ac) bleibt die SV bei ${fmt(entry.sonderzahlungSV)} \u20ac konstant \u2014 unabh\u00e4ngig von der Gehaltsh\u00f6he. Die Steuerbasis f\u00fcr die 6-%-Pauschale berechnet sich als: ${fmt(amount)} \u20ac abz\u00fcglich ${fmt(entry.sonderzahlungSV)} \u20ac SV abz\u00fcglich 620 \u20ac Freibetrag = ${fmt(steuerbasis)} \u20ac. Pauschalsteuer: ${fmt(entry.sonderzahlungSteuer)} \u20ac. Netto-Sonderzahlung: ${fmt(entry.sonderzahlungNetto)} \u20ac. Der Kontrast zum Regelgehalt ist bei diesem Einkommensniveau besonders krass: Statt der monatlichen Lohnsteuer von ${fmt(entry.lohnsteuerMonatlich)} \u20ac fallen auf die Sonderzahlung nur ${fmt(entry.sonderzahlungSteuer)} \u20ac Steuer an \u2014 der Vorteil betr\u00e4gt ${fmt(steuerVorteil)} \u20ac pro Zahlung! Im Jahres\u00fcberblick: ${fmt(sonderzahlungNettoJahr)} \u20ac Netto aus Sonderzahlungen bei nur ${fmt(sonderzahlungSteuerJahr)} \u20ac Gesamtsteuer (statt ca. ${fmt(entry.lohnsteuerMonatlich * 2)} \u20ac bei Regelbesteuerung). Anteil am Jahresnetto (${fmt(entry.nettoJaehrlich)} \u20ac): ${sonderzahlungAnteil} %.`;
}

// --- getWorkLifeContext ---

export function getWorkLifeContext(entry: GehaltEntry): string {
  const amount = entry.bruttoMonatlich;
  const net = entry.nettoMonatlich;
  const v = vi(amount);

  if (amount <= 1500) {
    return `Lebensrealit\u00e4t bei ${fmt(net)} \u20ac netto: Mit diesem Einkommen ist eine eigenst\u00e4ndige Lebensf\u00fchrung in \u00d6sterreich herausfordernd. In Wien liegt die durchschnittliche Warmmiete f\u00fcr eine kleine Wohnung bei 600\u2013800 \u20ac \u2014 das w\u00e4ren bereits ${((700 / net) * 100).toFixed(0)} % des Nettos. Viele Arbeitnehmer in dieser Gehaltsklasse leben daher in WGs, bei Angeh\u00f6rigen oder nutzen gef\u00f6rderte Wohnformen. Wichtig: Es besteht in der Regel Anspruch auf Wohnbeihilfe (je nach Bundesland 100\u2013300 \u20ac/Monat) und den Heizkostenzuschuss. Die Jahreskarte der Wiener Linien (365 \u20ac = 30 \u20ac/Monat) ist eine der g\u00fcnstigsten Mobilit\u00e4tsoptionen europaweit.`;
  }
  if (amount <= 2000) {
    return `Alltagsfinanzierung mit ${fmt(net)} \u20ac netto: Dieses Einkommen erm\u00f6glicht eine bescheidene, aber eigenst\u00e4ndige Lebensf\u00fchrung. Eine kleine Wohnung (35\u201345 m\u00b2) au\u00dferhalb der Innenstadtlagen ist mit ca. 550\u2013700 \u20ac Warmmiete realistisch \u2014 das entspricht ${((625 / net) * 100).toFixed(0)} % des Nettos. F\u00fcr Lebensmittel rechnet man mit ca. ${fmt(net * 0.19)} \u20ac/Monat. Ein eigenes Auto ist bei diesem Einkommen finanziell schwer tragbar; das Klimaticket (91 \u20ac/Monat) ist die wirtschaftlichere Alternative. Sparquote realistisch: 8\u201312 % bzw. ${fmt(net * 0.10)} \u20ac monatlich.`;
  }
  if (amount <= 2500) {
    return `Lebensstandard bei ${fmt(net)} \u20ac Monatsnetto: Mit diesem Einkommen erreicht man einen stabilen Lebensstandard in \u00d6sterreich. Eine Zwei-Zimmer-Wohnung (50\u201360 m\u00b2) ist mit ca. 700\u2013850 \u20ac Warmmiete (${((775 / net) * 100).toFixed(0)} % des Nettos) gut leistbar. Es bleibt Spielraum f\u00fcr regelm\u00e4\u00dfige Freizeitausgaben (ca. ${fmt(net * 0.13)} \u20ac/Monat) und eine solide Sparquote von 12\u201316 % (${fmt(net * 0.14)} \u20ac). In l\u00e4ndlichen Gebieten ist bei diesem Gehalt sogar Wohneigentum \u00fcber einen Kredit denkbar. Die Lebenshaltungskosten variieren je nach Bundesland um bis zu 15 %.`;
  }
  if (amount <= 3000) {
    return `Finanzielle Situation bei ${fmt(net)} \u20ac netto monatlich: Dieses Einkommensniveau bietet in den meisten \u00f6sterreichischen Regionen einen komfortablen Lebensstil. Die empfohlene Mietobergrenze (30 % des Netto) liegt bei ${fmt(net * 0.30)} \u20ac \u2014 ausreichend f\u00fcr eine 60\u201375 m\u00b2 Wohnung auch in gr\u00f6\u00dferen St\u00e4dten. Ein Eigenheim-Kredit (Richtwert: max. ${fmtInt(net * 100)} \u20ac Kreditvolumen) ist je nach Region realisierbar. Freizeitbudget von ca. ${fmt(net * 0.14)} \u20ac und Sparpotenzial von ${fmt(net * 0.20)} \u20ac/Monat erlauben sowohl Lebensgenuss als auch Verm\u00f6gensaufbau.`;
  }
  if (amount <= 3500) {
    return `Lebenssituation mit ${fmt(net)} \u20ac netto: In diesem Einkommenssegment besteht deutlicher finanzieller Spielraum. Die Wohnkosten sollten idealerweise unter ${fmt(net * 0.28)} \u20ac bleiben (28 %) \u2014 damit ist in Wien eine gute Mietwohnung (65\u201380 m\u00b2, gute Lage) oder au\u00dferhalb Wiens bereits eine Kreditrate finanzierbar. Ein Kfz (ca. 350\u2013450 \u20ac/Monat Gesamtkosten) ist realistisch einplanbar. Die Sparquote kann bei 22\u201328 % liegen (${fmt(net * 0.25)} \u20ac monatlich), was langfristig erhebliches Verm\u00f6gen aufbaut: In 20 Jahren bei 6 % Rendite w\u00e4ren das ca. ${fmtInt(net * 0.25 * 12 * 20 * 1.65)} \u20ac.`;
  }
  if (amount <= 4000) {
    return `Lebensstandard bei ${fmt(net)} \u20ac netto monatlich (${fmtInt(amount)} \u20ac brutto): Man bewegt sich im oberen Mittelfeld der \u00f6sterreichischen Einkommen. Wohnkosten-Richtwert: max. ${fmt(net * 0.28)} \u20ac (28 %) f\u00fcr eine 70\u201385-m\u00b2-Wohnung in gutem Stadtteil oder ein Reihenhaus im Umland. Hauskredit-Potenzial bei 30 Jahren Laufzeit: ca. ${fmtInt(net * 0.28 * 12 * 22)} \u20ac Kreditvolumen. Mobilit\u00e4t: Ein Mittelklassefahrzeug (ca. 400 \u20ac/Monat Gesamtkosten) ist realistisch neben den sonstigen Ausgaben. Freizeitbudget: ${fmt(net * 0.15)} \u20ac monatlich, was regelm\u00e4\u00dfige Sportverein-Mitgliedschaft, Kulturangebote und 1\u20132 Urlaube/Jahr abdeckt. Sparquote bei disziplinierter Planung: 22\u201326 % (${fmt(net * 0.24)} \u20ac), in 15 Jahren mit 6 % Rendite: ca. ${fmtInt(net * 0.24 * 12 * 15 * 1.45)} \u20ac Verm\u00f6gen.`;
  }
  if (amount <= 4500) {
    return `Finanzielle Komfortzone bei ${fmt(net)} \u20ac Nettoverdienst (aus ${fmtInt(amount)} \u20ac brutto): Dieses Einkommen erm\u00f6glicht in \u00d6sterreich eine gehobene Lebensf\u00fchrung ohne Verzicht. Wohnkosten-Empfehlung: max. ${fmt(net * 0.27)} \u20ac (27 %), ausreichend f\u00fcr eine moderne 75\u201390-m\u00b2-Mietwohnung in bevorzugter Lage oder eine Eigentums-Kreditrate (Volumen: ${fmtInt(net * 0.27 * 12 * 25)} \u20ac bei 25 Jahren). Lifestyle-Spielraum: 2\u20133 Urlaube j\u00e4hrlich (Gesamtbudget ca. ${fmtInt(net * 0.16 * 3)} \u20ac), hochwertige Freizeitgestaltung (${fmt(net * 0.16)} \u20ac/Monat). Verm\u00f6gensaufbau: Bei einer Sparrate von ${fmt(net * 0.28)} \u20ac monatlich (${fmtInt(net * 0.28 * 12)} \u20ac/Jahr) erreicht man in 10 Jahren bei 6 % Rendite ca. ${fmtInt(net * 0.28 * 12 * 10 * 1.35)} \u20ac. Die Sonderzahlungen (\u00e0 ${fmt(entry.sonderzahlungNetto)} \u20ac netto) eignen sich ideal f\u00fcr Sondertilgungen oder gr\u00f6\u00dfere Anschaffungen.`;
  }
  if (amount <= 5000) {
    return `Gehobener Lebensstandard mit ${fmt(net)} \u20ac netto (${fmtInt(amount)} \u20ac brutto): Man geh\u00f6rt zum wohlhabenden F\u00fcnftel der \u00f6sterreichischen Arbeitnehmer. Wohnsituation: Eine Kreditrate von ${fmt(net * 0.26)} \u20ac erm\u00f6glicht ein Kreditvolumen von ${fmtInt(net * 0.26 * 12 * 25)} \u20ac \u2014 ausreichend f\u00fcr eine Eigentumswohnung (80\u2013100 m\u00b2) in guter st\u00e4dtischer Lage oder ein Einfamilienhaus im Umland. Sparstrategie: 26\u201332 % Sparquote (${fmt(net * 0.29)} \u20ac/Monat), aufgeteilt in ETF-Portfolio (70 %), Immobilien-Tilgung (20 %) und Cash-Reserve (10 %). In 12 Jahren ergibt das bei 6 % Rendite ca. ${fmtInt(net * 0.29 * 12 * 12 * 1.40)} \u20ac. Lifestyle: 2\u20133 hochwertige Urlaube (Budget ${fmtInt(net * 0.15 * 4)} \u20ac/Jahr), Premium-Sportangebote, kulturelle Abonnements. Die Sonderzahlungen (je ${fmt(entry.sonderzahlungNetto)} \u20ac netto) erm\u00f6glichen zus\u00e4tzliche Sondertilgungen von ${fmt(entry.sonderzahlungNetto * 2)} \u20ac/Jahr.`;
  }
  if (amount <= 5500) {
    return `Finanzielle Unabh\u00e4ngigkeit bei ${fmt(net)} \u20ac netto monatlich: In diesem Einkommensbereich ist gleichzeitiger Verm\u00f6gensaufbau und gehobene Lebensf\u00fchrung problemlos m\u00f6glich. Immobilienfinanzierung: Rate ${fmt(net * 0.25)} \u20ac (25 % des Netto) ergibt bei 25 Jahren Laufzeit ca. ${fmtInt(net * 0.25 * 12 * 25)} \u20ac Kreditvolumen \u2014 genug f\u00fcr eine gro\u00dfz\u00fcgige Immobilie. Investmentstrategie empfohlen: monatlich ${fmt(net * 0.30)} \u20ac in diversifiziertes Portfolio (${fmtInt(net * 0.30 * 12)} \u20ac/Jahr). Prognose bei 6 % p.a.: nach 15 Jahren ca. ${fmtInt(net * 0.30 * 12 * 15 * 1.45)} \u20ac Depotwert. Lebensqualit\u00e4t: Gehobene Gastronomie, internationale Reisen (3+ pro Jahr), Premium-Mobilit\u00e4t und kulturelle Teilhabe ohne Budgetdruck. Die zwei Sonderzahlungen (\u00e0 ${fmt(entry.sonderzahlungNetto)} \u20ac) liefern j\u00e4hrlich ${fmt(entry.sonderzahlungNetto * 2)} \u20ac zus\u00e4tzlich f\u00fcr Verm\u00f6gensaufbau oder Luxusausgaben.`;
  }
  if (amount <= 6000) {
    return `Gehobener Lebensstandard bei ${fmt(net)} \u20ac netto: Mit diesem Top-Einkommen sind in \u00d6sterreich praktisch alle Lebensbereiche komfortabel finanzierbar. Wohneigentum in guter Lage (Rate: ${fmt(net * 0.25)} \u20ac = Kredit ca. ${fmtInt(net * 0.25 * 12 * 25)} \u20ac), ein gutes Fahrzeug (ca. 500 \u20ac/Monat) und regelm\u00e4\u00dfiges Reisen sind gleichzeitig m\u00f6glich. Die Sparrate kann bei 30+ % liegen (${fmt(net * 0.32)} \u20ac/Monat). Besonders relevant: Die N\u00e4he zur SV-H\u00f6chstbeitragsgrundlage bedeutet, dass k\u00fcnftige Erh\u00f6hungen netto-effektiver ausfallen. Private Vorsorge (z.B. fondsgebundene Lebensversicherung, Immobilien) gewinnt steuerlich an Bedeutung.`;
  }
  if (amount <= 7000) {
    return `Wohlstandsperspektive bei ${fmt(net)} \u20ac netto monatlich (${fmtInt(amount)} \u20ac brutto): Als F\u00fchrungskraft oder hochqualifizierter Spezialist lebt man auf einem Niveau, das umfassende Lebensplanung erlaubt. Verm\u00f6gensaufbau: Bei einer Sparrate von 32 % (${fmt(net * 0.32)} \u20ac/Monat = ${fmtInt(net * 0.32 * 12)} \u20ac j\u00e4hrlich) und 6 % Rendite ergibt sich nach 10 Jahren ein Depotwert von ca. ${fmtInt(net * 0.32 * 12 * 10 * 1.35)} \u20ac. Immobilie: Eine Kreditrate von ${fmt(net * 0.23)} \u20ac erm\u00f6glicht ein Volumen von ${fmtInt(net * 0.23 * 12 * 25)} \u20ac \u2014 ausreichend f\u00fcr eine Premiumimmobilie in \u00d6sterreich. Lebensstil: Mehrere Fernreisen pro Jahr, gehobene Gastronomie, Premium-Mobilit\u00e4t (Leasing ca. 600\u2013800 \u20ac/Monat). SV-Deckelungsvorteil: Die Beitr\u00e4ge von ${fmt(entry.svGesamt)} \u20ac sind fixiert, k\u00fcnftige Erh\u00f6hungen flie\u00dfen SV-frei ins Netto.`;
  }
  // 8000+
  return `Exklusive Finanzposition bei ${fmt(net)} \u20ac Netto (${fmtInt(amount)} \u20ac brutto, ${fmtInt(entry.bruttoJaehrlich)} \u20ac/Jahr): Auf diesem Einkommensniveau sind Wealth-Management-Strategien angebracht. Aggressiver Verm\u00f6gensaufbau: Mit 35 % Sparquote (${fmt(net * 0.35)} \u20ac/Monat, ${fmtInt(net * 0.35 * 12)} \u20ac/Jahr) erreicht man bei 6 % p.a. nach 10 Jahren ca. ${fmtInt(net * 0.35 * 12 * 10 * 1.35)} \u20ac Kapital. Immobilienstrategie: Eigenheim (Rate ${fmt(net * 0.20)} \u20ac = Kredit ${fmtInt(net * 0.20 * 12 * 25)} \u20ac) plus Vorsorgewohnung als Steuer-Asset (AfA + Zinsabzug). Fahrzeug: Premiumklasse realistisch (Sachbezug \u00fcber Arbeitgeber pr\u00fcfen \u2014 bei E-Auto nur 1,5 % statt 2 %). Reisen: 4+ Urlaube international, Business-Class finanzierbar. Steuerliche Besonderheit: Die SV-Beitr\u00e4ge (${fmt(entry.svGesamt)} \u20ac) sind eingefroren \u2014 bei proportionaler Berechnung w\u00e4ren es ${fmt(amount * 0.1712)} \u20ac monatlich. Empfehlung: Diversifizierung \u00fcber Immobilien, ETFs, betriebliche Pensionszusage und ggf. GmbH-Konstruktion f\u00fcr Nebeneink\u00fcnfte.`;
}

// --- getTaxBracketExplanation ---

export function getTaxBracketExplanation(entry: GehaltEntry): string {
  const amount = entry.bruttoMonatlich;
  const taxableAnnual = entry.steuerpflichtigesEinkommen * 12;
  const v = vi(amount);

  // Tax brackets decomposition
  const brackets = [
    { from: 0, to: 12816, rate: 0, label: '0 %' },
    { from: 12816, to: 20818, rate: 0.20, label: '20 %' },
    { from: 20818, to: 34513, rate: 0.30, label: '30 %' },
    { from: 34513, to: 66612, rate: 0.40, label: '40 %' },
    { from: 66612, to: 99266, rate: 0.48, label: '48 %' },
    { from: 99266, to: 1000000, rate: 0.50, label: '50 %' },
  ];

  const parts: string[] = [];

  // Unique intro
  if (amount <= 1500) {
    parts.push(`Steuertarif bei ${fmtInt(amount)} \u20ac brutto: Das zu versteuernde Jahreseinkommen betr\u00e4gt lediglich ${fmt(taxableAnnual)} \u20ac (Brutto minus SV-Beitr\u00e4ge). Bei diesem geringen Einkommen bleibt der Gro\u00dfteil steuerfrei, da der Grundfreibetrag von 12.816 \u20ac kaum \u00fcberschritten wird:`);
  } else if (amount <= 2500) {
    parts.push(`So verteilt sich die Steuerlast bei ${fmtInt(amount)} \u20ac brutto auf die Tarifstufen: Das zu versteuernde Jahreseinkommen betr\u00e4gt ${fmt(taxableAnnual)} \u20ac (Brutto minus SV-Beitr\u00e4ge). Bei diesem Einkommensniveau greift haupts\u00e4chlich der niedrigste Steuersatz von 20\u201330 %:`);
  } else if (amount <= 3000) {
    parts.push(`Tarifstufenzerlegung bei ${fmtInt(amount)} \u20ac brutto: Nach Abzug der Sozialversicherung ergibt sich ein zu versteuerndes Jahreseinkommen von ${fmt(taxableAnnual)} \u20ac. Die 30-%-Stufe dominiert bei diesem Gehalt die Steuerlast:`);
  } else if (amount <= 3500) {
    parts.push(`Stufenweise Besteuerung bei ${fmtInt(amount)} \u20ac brutto: Das steuerpflichtige Jahreseinkommen betr\u00e4gt ${fmt(taxableAnnual)} \u20ac (nach Abzug der SV-Beitr\u00e4ge vom Brutto). Bei diesem Einkommen beginnt die 40-%-Stufe zu greifen:`);
  } else if (amount <= 4500) {
    parts.push(`Die progressive Besteuerung bei ${fmtInt(amount)} \u20ac brutto im Detail: Das steuerpflichtige Jahreseinkommen von ${fmt(taxableAnnual)} \u20ac verteilt sich auf die folgenden Tarifstufen des \u00f6sterreichischen Steuertarifs 2026:`);
  } else if (amount <= 5500) {
    parts.push(`Progression bei ${fmtInt(amount)} \u20ac brutto: Mit ${fmt(taxableAnnual)} \u20ac zu versteuerndem Jahreseinkommen befindet man sich tief in der 40-%-Zone und n\u00e4hert sich der 48-%-Stufe. Die Tarifstufen im Einzelnen:`);
  } else if (amount <= 7000) {
    parts.push(`Steuerprogressions-Analyse bei ${fmtInt(amount)} \u20ac brutto: Mit einem zu versteuernden Jahreseinkommen von ${fmt(taxableAnnual)} \u20ac greift bereits die ${taxableAnnual > 66612 ? 'f\u00fcnfte (48-%)' : 'vierte (40-%)'} Tarifstufe. Aufschl\u00fcsselung:`);
  } else {
    parts.push(`Spitzensteuersatz-Analyse bei ${fmtInt(amount)} \u20ac brutto: Das zu versteuernde Jahreseinkommen von ${fmt(taxableAnnual)} \u20ac wird \u00fcber alle f\u00fcnf relevanten Tarifstufen besteuert, wobei ein erheblicher Anteil dem 48-%-Satz unterliegt:`);
  }

  let gesamtSteuer = 0;
  for (const bracket of brackets) {
    if (taxableAnnual <= bracket.from) break;
    const taxableInBracket = Math.min(taxableAnnual, bracket.to) - bracket.from;
    const steuerInBracket = taxableInBracket * bracket.rate;
    gesamtSteuer += steuerInBracket;

    if (bracket.rate === 0) {
      parts.push(`Stufe 1 (0\u201312.816 \u20ac, ${bracket.label}): ${fmt(Math.min(taxableAnnual, bracket.to))} \u20ac steuerfrei \u2014 keine Steuer auf diesen Betrag.`);
    } else {
      parts.push(`Stufe ${brackets.indexOf(bracket) + 1} (${fmtInt(bracket.from)}\u2013${fmtInt(bracket.to)} \u20ac, ${bracket.label}): ${fmt(taxableInBracket)} \u20ac \u00d7 ${bracket.label} = ${fmt(steuerInBracket)} \u20ac Steuer.`);
    }
  }

  const verkehrsAB = 463;
  const steuerNachAB = Math.max(0, gesamtSteuer - verkehrsAB);
  parts.push(`Zwischensumme Einkommensteuer: ${fmt(gesamtSteuer)} \u20ac. Nach Abzug des Verkehrsabsetzbetrags (${fmtInt(verkehrsAB)} \u20ac) verbleiben ${fmt(steuerNachAB)} \u20ac j\u00e4hrliche Lohnsteuer bzw. ${fmt(steuerNachAB / 12)} \u20ac monatlich. Der effektive Durchschnittssteuersatz auf das Bruttojahresgehalt (${fmtInt(entry.bruttoJaehrlich)} \u20ac) betr\u00e4gt ${(entry.effektiverSteuersatz * 100).toFixed(1)} % (inkl. SV).`);

  return parts.join(' ');
}

// --- getKollektivvertragInfo ---

export function getKollektivvertragInfo(entry: GehaltEntry): string {
  const amount = entry.bruttoMonatlich;

  if (amount <= 1500) {
    return `Kollektivvertragliche Einordnung: ${fmtInt(amount)} \u20ac brutto liegt f\u00fcr Vollzeitbesch\u00e4ftigte unterhalb der meisten KV-Mindestl\u00f6hne und deutet auf eine Teilzeitanstellung (ca. ${((amount / 2000) * 40).toFixed(0)} Wochenstunden bei KV-Minimum) hin. Der Handels-KV sieht 2026 f\u00fcr Besch\u00e4ftigungsgruppe A (ungelernt) ein Vollzeit-Minimum von ca. 1.895 \u20ac vor, der Gastro-KV startet bei ca. 1.800 \u20ac. Wer ${fmtInt(amount)} \u20ac verdient und Vollzeit arbeitet, sollte pr\u00fcfen, ob der einschl\u00e4gige Kollektivvertrag eingehalten wird \u2014 der Arbeitgeber ist gesetzlich zur KV-Einhaltung verpflichtet. Wichtig: Die 14 Geh\u00e4lter sind in \u00d6sterreich gesetzlich verankert und stehen auch Teilzeitkr\u00e4ften anteilig zu.`;
  }
  if (amount <= 2000) {
    return `Kollektivvertragliche Einordnung: ${fmtInt(amount)} \u20ac brutto entspricht den Einstiegsstufen vieler \u00f6sterreichischer Kollektivvertr\u00e4ge. Der Handels-KV (Besch\u00e4ftigungsgruppe B, 1. Berufsjahr) liegt bei ca. 1.995 \u20ac, der Reinigungsgewerbe-KV bei ca. 1.850 \u20ac f\u00fcr gelernte Kr\u00e4fte. Im Hotel- und Gastgewerbe starten Fachkr\u00e4fte (Koch/K\u00f6chin) bei rund 1.950 \u20ac. Nach dem ersten Berufsjahr ist in den meisten KVs eine automatische Vorrr\u00fcckung auf ca. 2.050\u20132.150 \u20ac vorgesehen. Tipp: Die AK-Lohnkontrolle (arbeiterkammer.at) pr\u00fcft kostenlos, ob der korrekte KV-Lohn bezahlt wird.`;
  }
  if (amount <= 2500) {
    return `Kollektivvertragliche Einordnung: ${fmtInt(amount)} \u20ac brutto liegt im mittleren Bereich der KV-Gehaltsschemata. Relevante Referenzpunkte: Metall-KV Verwendungsgruppe C (Facharbeiter, 3. Berufsjahr): ca. 2.400\u20132.600 \u20ac. IT-KV Stufe ST1 (Spezielle T\u00e4tigkeiten): ca. 2.325\u20132.500 \u20ac. Handel-KV Besch\u00e4ftigungsgruppe C (nach 5 Jahren): ca. 2.350 \u20ac. Die KV-Erh\u00f6hungen 2026 lagen branchenabh\u00e4ngig zwischen 3,5 % und 5,2 %. \u00dcber-KV-Zahlungen (Ist-Geh\u00e4lter \u00fcber dem KV-Minimum) sind bei diesem Gehaltsniveau bereits h\u00e4ufig.`;
  }
  if (amount <= 3000) {
    return `Kollektivvertragliche Einordnung: ${fmtInt(amount)} \u20ac brutto \u00fcberschreitet in den meisten Branchen die KV-Minima und enth\u00e4lt oft eine \u00dcber-KV-Zahlung. Vergleichswerte: Metall-KV VWG D (qualifizierte Facharbeit): ca. 2.800\u20133.100 \u20ac. Bank-KV mittlere Verwendungsgruppe: ca. 2.900\u20133.200 \u20ac. \u00d6ffentlicher Dienst (v2, nach 8 Jahren): ca. 2.950 \u20ac. Der BAGS-KV (Sozialwirtschaft) sieht f\u00fcr diplomiertes Pflegepersonal nach einigen Jahren ca. 2.900\u20133.100 \u20ac vor. Bei Gehaltsverhandlungen ist die Kenntnis des eigenen KV-Minimums die wichtigste Ausgangsbasis.`;
  }
  if (amount <= 3500) {
    return `Kollektivvertragliche Einordnung: ${fmtInt(amount)} \u20ac brutto liegt in den meisten Branchen deutlich \u00fcber dem KV-Minimum und spiegelt Berufserfahrung oder Spezialisierung wider. Referenzwerte: IT-KV ST2 (h\u00f6her qualifizierte T\u00e4tigkeiten): ca. 3.200\u20133.600 \u20ac. Metall-KV VWG E (Vorarbeiter/Meister): ca. 3.300\u20133.700 \u20ac. Lehrer-Gehaltsschema (nach 6 Jahren, pd-Schema): ca. 3.400 \u20ac. Der Bank-KV obere Verwendungsgruppen sieht ca. 3.400\u20133.800 \u20ac vor. In diesem Segment ist die individuelle Verhandlung \u00fcber dem KV die Norm \u2014 das tats\u00e4chliche Ist-Gehalt \u00fcbersteigt das KV-Minimum oft um 10\u201320 %.`;
  }
  if (amount <= 4000) {
    return `Kollektivvertragliche Einordnung: ${fmtInt(amount)} \u20ac brutto \u00fcberschreitet die meisten KV-Minima deutlich. Relevante Vergleichswerte: IT-KV Stufe ST2 (Seniorstufe): ca. 3.800\u20134.200 \u20ac. Metall-KV VWG E\u2013F (Meister/F\u00fchrung): ca. 3.600\u20134.300 \u20ac. Bank-KV obere Verwendungsgruppen: ca. 3.600\u20134.100 \u20ac. Pharma-KV f\u00fcr Fachkr\u00e4fte mit Berufserfahrung: ca. 3.800\u20134.200 \u20ac. Bei ${fmtInt(amount)} \u20ac handelt es sich h\u00e4ufig um Ist-Geh\u00e4lter mit signifikanter \u00dcber-KV-Zahlung (typisch: 15\u201325 % \u00fcber Mindest-KV). Achtung: All-in-Vertr\u00e4ge auf diesem Niveau sollten auf korrekte \u00dcberstundenabgeltung gepr\u00fcft werden \u2014 die AK bietet kostenlose Vertragschecks.`;
  }
  if (amount <= 4500) {
    return `Kollektivvertragliche Einordnung: ${fmtInt(amount)} \u20ac brutto liegt im Bereich, den nur spezialisierte KVs als Minimum vorsehen. Vergleichswerte: IT-KV Seniorstufe ST2+ (nach 8+ Jahren): ca. 4.200\u20134.700 \u20ac. Pharma-KV leitende Angestellte: ca. 4.300\u20135.200 \u20ac. Metall-KV VWG F (F\u00fchrungsebene, langj\u00e4hrig): ca. 4.100\u20134.800 \u20ac. Bank-KV h\u00f6chste Verwendungsgruppen: ab 4.300 \u20ac. Bei ${fmtInt(amount)} \u20ac handelt es sich \u00fcberwiegend um individuell verhandelte Verg\u00fctungen oder All-in-Vereinbarungen. Pr\u00fcfenswert: Ob ein All-in-Vertrag tats\u00e4chlich g\u00fcnstiger ist als KV-Gehalt plus gesondert verg\u00fctete \u00dcberstunden (Faustregel: ab 10 \u00dcberstunden/Monat lohnt sich Einzelabrechnung).`;
  }
  if (amount <= 5000) {
    return `Kollektivvertragliche Einordnung: ${fmtInt(amount)} \u20ac brutto \u00fcbertrifft die Spitzenwerte der meisten Kollektivvertr\u00e4ge. Vergleichspunkte: Bank-KV h\u00f6chste Stufen: ca. 4.800\u20135.500 \u20ac. \u00c4rzte-KV (Gemeindespital, Facharzt nach 10+ Jahren): ca. 4.800\u20135.400 \u20ac. IT-KV Spezialf\u00e4lle (CTO-nahe Positionen): ca. 4.700\u20135.300 \u20ac. Auf diesem Level sind \u00fcberwiegend individuelle Arbeitsvertr\u00e4ge \u00fcblich, oft als All-in-Vereinbarung mit pauschaler \u00dcberstundenabgeltung (15\u201320 \u00dcberstunden/Monat). Die Arbeiterkammer empfiehlt, All-in-Vertr\u00e4ge j\u00e4hrlich zu pr\u00fcfen: tats\u00e4chliche \u00dcberstunden \u00d7 Zuschlag muss unter dem All-in-\u00dcberzahlungsbetrag liegen.`;
  }
  if (amount <= 5500) {
    return `Gehaltseinordnung: ${fmtInt(amount)} \u20ac brutto bewegt sich deutlich im individuell verhandelten Bereich, jenseits standard-kollektivvertraglicher Schemata. Vergleichbare Verg\u00fctungen: Rechtsanwalts-KV (Konzipient nach Pr\u00fcfung, Wiener Kanzlei): ca. 5.200\u20136.000 \u20ac. Universit\u00e4tsprofessor (A1/v1, mittlere Dienstaltersstufe): ca. 5.400\u20135.800 \u20ac. Energie-KV Leitungsebene: ca. 5.300\u20136.200 \u20ac. Beratungsbranche (Senior Manager): ca. 5.500\u20136.500 \u20ac fix. Auf diesem Niveau sind zus\u00e4tzliche Benefits entscheidend: Firmenwagen (Sachbezug 400\u2013720 \u20ac/Monat), betriebliche Pensionszusage, Bonusvereinbarungen (10\u201320 % des Jahresgehalts). Die individuelle Vertragsgestaltung hat hier mehr Einfluss auf das Netto als KV-Erh\u00f6hungen.`;
  }
  if (amount <= 6000) {
    return `Kollektivvertragliche Einordnung: ${fmtInt(amount)} \u20ac brutto liegt weit \u00fcber den meisten KV-Mindests\u00e4tzen. In dieser Gehaltsklasse dominieren individuelle Dienstvertr\u00e4ge, All-in-Vereinbarungen oder leitende Angestelltenvertr\u00e4ge. Vergleichsrahmen: Leitender Arzt (Gemeinde-\u00c4rzte-KV, Stufe 4+): ca. 5.500\u20136.500 \u20ac. Universit\u00e4tsprofessor (A1, fortgeschritten): ca. 5.800\u20136.600 \u20ac. Gesch\u00e4ftsf\u00fchrende in KMUs: individuell ${fmtInt(amount - 500)}\u2013${fmtInt(amount + 1000)} \u20ac. Bei All-in-Vertr\u00e4gen essenziell: \u00dcberstundenpauschale muss mindestens das KV-Minimum f\u00fcr tats\u00e4chlich geleistete Stunden abdecken, andernfalls droht Nachzahlung.`;
  }
  if (amount <= 7000) {
    return `Gehaltseinordnung: ${fmtInt(amount)} \u20ac brutto ist ein Gehalt jenseits kollektivvertraglicher Schemata \u2014 es handelt sich praktisch immer um individuell verhandelte Verg\u00fctungen auf F\u00fchrungsebene. Vergleichbare Positionen: GF-Geh\u00e4lter in KMU (20\u201350 MA): ${fmtInt(amount - 500)}\u2013${fmtInt(amount + 2000)} \u20ac fix. Prim\u00e4rarztstellen: ca. 6.500\u20138.000 \u20ac brutto (Grundgehalt ohne Dienste). VP/Director in Konzernen: ${fmtInt(amount - 1000)}\u2013${fmtInt(amount + 1500)} \u20ac. Oft kommen bei diesem Niveau variable Bestandteile (Bonus 15\u201330 %, Firmen-PKW Sachbezug ca. 400\u2013720 \u20ac/Monat) hinzu, die den Gesamtverdienst deutlich erh\u00f6hen.`;
  }
  // 8000+
  return `Verg\u00fctungseinordnung: ${fmtInt(amount)} \u20ac brutto (${fmtInt(entry.bruttoJaehrlich)} \u20ac/Jahr) positioniert den Arbeitnehmer in der obersten Gehaltsklasse \u00d6sterreichs. Auf diesem Niveau gibt es keine relevanten KV-Bezugspunkte mehr. Markt\u00fcbliche Verg\u00fctungsvergleiche: C-Level in Unternehmen mit 100\u2013500 MA: ${fmtInt(amount * 0.85)}\u2013${fmtInt(amount * 1.4)} \u20ac fix plus 20\u201340 % variabler Anteil. Partner Big-4 (EY, KPMG, PwC, Deloitte): ab ${fmtInt(amount)} \u20ac fix plus Gewinnbeteiligung. Vorstandsmitglieder b\u00f6rsenotierter ATX-Unternehmen: ab ${fmtInt(amount * 2)} \u20ac. Typische Zusatzleistungen auf diesem Level: Firmenfahrzeug (Sachbezug 2 % = ca. 720\u20131.200 \u20ac/Monat steuerpflichtig), Pensionszusage, Aktienbeteiligungen und Golden-Parachute-Klauseln.`;
}

// --- getNettoOptimierung ---

export function getNettoOptimierung(entry: GehaltEntry): string {
  const amount = entry.bruttoMonatlich;
  const net = entry.nettoMonatlich;
  const grenzsteuersatz = amount < 3000 ? 0.30 : amount < 5000 ? 0.40 : 0.48;
  const svSatz = amount >= 6060 ? 0 : 0.1712;
  const gesamtGrenzsatz = svSatz + grenzsteuersatz * (1 - svSatz);
  const nettoAnteil = 1 - gesamtGrenzsatz;

  if (amount <= 1500) {
    return `Optimierungsm\u00f6glichkeiten bei ${fmtInt(amount)} \u20ac brutto: Da die Steuerlast bei diesem Einkommen minimal ist (nur ${fmt(entry.lohnsteuerMonatlich)} \u20ac/Monat), bieten klassische Steueroptimierungen wenig Potenzial. Effektiver: (1) Arbeitszeitstunden pr\u00fcfen \u2014 Aufstockung auf Vollzeit w\u00fcrde das Brutto auf ca. 2.000+ \u20ac erh\u00f6hen, mit nur geringf\u00fcgig h\u00f6herer Steuer. (2) Negativsteuer/SV-Bonus: \u00dcber die Arbeitnehmerveranlagung k\u00f6nnen bis zu 463 \u20ac j\u00e4hrlich r\u00fcckerstattet werden. (3) Wohnbeihilfe und Heizkostenzuschuss beantragen \u2014 bei ${fmt(net)} \u20ac Netto besteht in allen Bundesl\u00e4ndern Anspruch. (4) GIS-Befreiung bei niedrigem Einkommen pr\u00fcfen. (5) Falls Kinder vorhanden: Familienbonus Plus kann von dem besserverdienenden Elternteil beansprucht werden, um die Familiensteuerbelastung insgesamt zu minimieren.`;
  }
  if (amount <= 2000) {
    return `Netto-Optimierung bei ${fmtInt(amount)} \u20ac brutto: Bei einem Grenzsteuersatz von nur ${(grenzsteuersatz * 100).toFixed(0)} % und geringer AV-Belastung liegt der Fokus auf: (1) Negativsteuer sichern: Die Arbeitnehmerveranlagung bringt bei diesem Einkommen h\u00e4ufig 100\u2013300 \u20ac R\u00fcckerstattung (SV-Bonus). (2) Steuerfreie Zulagen nutzen: Schmutz-, Ersch\u00fctterungs- und Gefahrenzulagen (SEG-Zulagen) sind bis 360 \u20ac/Monat steuerfrei \u2014 relevant bei k\u00f6rperlicher Arbeit. (3) Nachtarbeitszuschlag steuerfrei: Zwischen 19 und 7 Uhr geleistete Arbeit kann mit bis zu 360 \u20ac/Monat steuerfrei verg\u00fctet werden. (4) \u00dcberstunden-Begr\u00fcnstigung: Die ersten 10 \u00dcberstunden/Monat sind mit 50-%-Zuschlag zu 86,21 \u20ac steuerfrei. (5) Pendlerpauschale beantragen (Ersparnis ca. ${fmt(696 * grenzsteuersatz)} \u20ac j\u00e4hrlich ab 20 km Arbeitsweg).`;
  }
  if (amount <= 2500) {
    return `Netto-Optimierung bei ${fmtInt(amount)} \u20ac brutto: Der Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} % bietet moderate Optimierungsm\u00f6glichkeiten. Konkrete Ma\u00dfnahmen: (1) Pendlerpauschale + Pendlereuro: Ab 20 km Arbeitsweg ergibt das ${fmt(696 * grenzsteuersatz)} \u2013 ${fmt(3672 * grenzsteuersatz)} \u20ac j\u00e4hrliche Ersparnis plus 2 \u20ac/km Pendlereuro. (2) Home-Office-Pauschale: Bis zu 3 \u20ac/Tag (max. 300 \u20ac/Jahr) absetzbar = ${fmt(300 * grenzsteuersatz)} \u20ac Ersparnis. (3) Gewerkschaftsbeitrag absetzen: ca. ${fmtInt(amount * 0.01 * 12)} \u20ac/Jahr, Steuerersparnis ${fmt(amount * 0.01 * 12 * grenzsteuersatz)} \u20ac. (4) Fortbildungskosten geltend machen: Jeder Euro senkt die Steuerlast um ${(grenzsteuersatz * 100).toFixed(0)} Cent. (5) \u00dcberstunden-Zuschlag nutzen: Die ersten 10 \u00dcberstunden/Monat bringen neben dem Zuschlag auch einen Steuerfreibetrag von bis zu 86,21 \u20ac monatlich. (6) Steuerfreie Essenzusch\u00fcsse vom Arbeitgeber erbitten (bis 8 \u20ac/Tag = ca. 1.408 \u20ac/Jahr nettofrei).`;
  }
  if (amount <= 3500) {
    return `Netto-Optimierung bei ${fmtInt(amount)} \u20ac brutto: Mit einem Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} % hat jede Optimierungsma\u00dfnahme sp\u00fcrbaren Effekt. Strategie: (1) Arbeitnehmerveranlagung immer durchf\u00fchren \u2014 Durchschnittserstattung bei diesem Gehalt: ca. 250\u2013400 \u20ac. (2) Sonderausgaben aussch\u00f6pfen: Kirchenbeitrag (max. 400 \u20ac absetzbar = ${fmt(400 * grenzsteuersatz)} \u20ac Ersparnis), private Kranken-/Unfallversicherung (Topf-Sonderausgaben bis 2.920 \u20ac). (3) Werbungskosten \u00fcber der Pauschale (132 \u20ac): Arbeitsmittel, Fachliteratur, Arbeitskleidung, Fortbildungen. (4) Bei Kindern: Familienbonus Plus (2.000 \u20ac/Kind) plus Kindermehrbetrag pr\u00fcfen. (5) Mit dem Arbeitgeber \u00fcber steuerfreie Benefits verhandeln: Essenszuschuss (${fmtInt(8 * 22 * 11)} \u20ac/Jahr nettofrei), \u00d6ffi-Ticket (Klimaticket 1.095 \u20ac steuerfrei), Zukunftsvorsorge (300 \u20ac/Jahr). Gesamtpotenzial: 800\u20131.500 \u20ac j\u00e4hrliche Netto-Verbesserung.`;
  }
  if (amount <= 4000) {
    return `Netto-Maximierung bei ${fmtInt(amount)} \u20ac brutto: Der ${(grenzsteuersatz * 100).toFixed(0)}-%-Grenzsteuersatz macht Steueroptimierung besonders wirkungsvoll. Top-5-Hebel: (1) Fortbildungskosten absetzen: Ein berufsbegleitendes Studium (ca. 5.000\u201315.000 \u20ac) reduziert die Steuerlast um ${fmtInt(5000 * grenzsteuersatz)}\u2013${fmtInt(15000 * grenzsteuersatz)} \u20ac \u00fcber die Studiendauer. (2) Arbeitszimmer (20 m\u00b2, anteilige Miete): Falls beruflich notwendig, ca. 2.000\u20133.000 \u20ac absetzbar = ${fmtInt(2500 * grenzsteuersatz)} \u20ac Ersparnis. (3) Doppelte Haushaltsf\u00fchrung: Bei berufsbedingtem Zweitwohnsitz bis 2.200 \u20ac/Monat absetzbar. (4) Benefits statt Brutto: Essenszuschuss + \u00d6ffi-Ticket + Zukunftsvorsorge = ca. 2.800 \u20ac/Jahr nettofrei (Brutto\u00e4quivalent: ${fmtInt(2800 / nettoAnteil)} \u20ac). (5) Familienbonus + Kindermehrbetrag + Alleinverdiener-AB: Bei 2 Kindern bis zu ${fmtInt(2 * 2000 + 704)} \u20ac weniger Steuer/Jahr. Realistisches Gesamtpotenzial: 1.500\u20133.000 \u20ac j\u00e4hrliche Netto-Steigerung.`;
  }
  if (amount <= 4500) {
    return `Fortgeschrittene Steuergestaltung bei ${fmtInt(amount)} \u20ac brutto: In diesem Einkommensbereich lohnt sich eine aktive Steuerstrategie besonders. Der Grenzsteuersatz von ${(grenzsteuersatz * 100).toFixed(0)} % bedeutet: Jeder absetzbare Euro mindert die Steuerlast um ${(grenzsteuersatz * 100).toFixed(0)} Cent. Wirksame Ma\u00dfnahmen: (1) \u00dcberstundenregelung optimieren: Die ersten 10 \u00dcberstunden (50-%-Zuschlag) bieten einen Freibetrag von 86,21 \u20ac/Monat steuerfrei. Bei regelm\u00e4\u00dfigen \u00dcberstunden ergibt das bis 1.035 \u20ac steuerfreies Einkommen pro Jahr. (2) Gehaltsumwandlung verhandeln: Steuerfreie Benefits im Wert von 2.800 \u20ac (Essensgutscheine, Klimaticket, Vorsorge) entsprechen bei ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz einem Brutto\u00e4quivalent von ${fmtInt(2800 / nettoAnteil)} \u20ac. (3) Sonderausgabenpauschale \u00fcberschreiten: Spenden an beg\u00fcnstigte Organisationen (bis 10 % des Einkommens = ${fmtInt(entry.bruttoJaehrlich * 0.10)} \u20ac) sind absetzbar. (4) Au\u00dfergew\u00f6hnliche Belastungen: Krankheitskosten, Zahnarzt, Brille \u00fcber Selbstbehalt (ca. ${fmtInt(entry.bruttoJaehrlich * 0.08)} \u20ac bei diesem Einkommen). Potenzial insgesamt: 1.800\u20133.500 \u20ac/Jahr.`;
  }
  if (amount <= 5000) {
    return `Steueroptimierung bei ${fmtInt(amount)} \u20ac brutto \u2014 n\u00e4her an der SV-Grenze: Mit ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz und voller SV-Belastung (${(svSatz * 100).toFixed(1)} %) ist die kombinierte Grenzbelastung bei ca. ${((gesamtGrenzsatz) * 100).toFixed(0)} %. Priorit\u00e4ten: (1) SV-Grenze im Blick: Bei ${fmtInt(amount)} \u20ac brutto fehlen nur noch ${fmtInt(6060 - amount)} \u20ac bis zur H\u00f6chstbeitragsgrundlage. Eine Erh\u00f6hung \u00fcber 6.060 \u20ac w\u00e4re netto besonders attraktiv. (2) Werbungskosten systematisch sammeln: Bei ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz bringt jeder Euro \u00fcber der 132-\u20ac-Pauschale ${(grenzsteuersatz * 100).toFixed(0)} Cent zur\u00fcck. (3) Betriebliche Altersvorsorge: Arbeitgeberbeitr\u00e4ge sind steuerfrei \u2014 besser als Gehaltserh\u00f6hung. (4) Immobilien als Steuerhebel: Vorsorgewohnung mit AfA, Zinsen und Instandhaltung als Werbungskosten. (5) Internationaler Vergleich: In Deutschland w\u00fcrde bei gleichem Brutto ca. ${fmtInt(amount * 0.02)} \u20ac weniger netto bleiben (kein Sonderzahlungsvorteil). Netto-Verbesserungspotenzial: 2.000\u20134.000 \u20ac j\u00e4hrlich.`;
  }
  if (amount <= 5500) {
    return `Einkommensoptimierung bei ${fmtInt(amount)} \u20ac brutto: Die SV-H\u00f6chstbeitragsgrundlage (6.060 \u20ac) ist greifbar nah \u2014 nur ${fmtInt(6060 - amount)} \u20ac Differenz. Strategische \u00dcberlegungen: (1) Gezielte Erh\u00f6hung anstreben: Ab 6.060 \u20ac entf\u00e4llt die SV auf Mehrverdienst komplett. Eine Erh\u00f6hung um ${fmtInt(6060 - amount + 200)} \u20ac w\u00fcrde netto ca. ${fmt((6060 - amount) * nettoAnteil + 200 * (1 - grenzsteuersatz))} \u20ac mehr bringen (teilweise SV-frei). (2) Gehaltsverhandlung kombinieren: Fixgehalt auf 6.100+ \u20ac plus steuerfreie Benefits. (3) Fachbezogene Fortbildung: Investition in Zertifizierungen (CISSP, PMP, CFA: 3.000\u20138.000 \u20ac) absetzbar und karrieref\u00f6rdernd. (4) Diensterfindungen: Bei technischen Innovationen kann eine steuerlich beg\u00fcnstigte Pr\u00e4mie vereinbart werden. (5) Sabbatical-Modell: Zeitwertkonten erm\u00f6glichen Steuerstundung bei gleichbleibendem Durchschnittssteuersatz. Gesamtpotenzial: 2.500\u20135.000 \u20ac/Jahr.`;
  }
  if (amount <= 6000) {
    return `Steuerplanung bei ${fmtInt(amount)} \u20ac brutto \u2014 direkt an der SV-Grenze: Mit nur ${fmtInt(6060 - amount)} \u20ac Abstand zur H\u00f6chstbeitragsgrundlage ist die Steuersituation einzigartig. Schl\u00fcsselstrategien: (1) Gehaltserh\u00f6hung \u00fcber 6.060 \u20ac hat Sondereffekt: Die SV-Ersparnis macht jeden Euro \u00fcber der Grenze besonders wertvoll. (2) All-in-Vertrag pr\u00fcfen: Wenn \u00dcberstundenpauschale das Gehalt \u00fcber 6.060 \u20ac hebt, profitiert man von der SV-Deckelung. (3) Gehaltsumwandlung nutzen: Bei ${(grenzsteuersatz * 100).toFixed(0)} % Grenzsteuersatz + ${(svSatz * 100).toFixed(0)} % SV ist die kombinierte Belastung bei ${((gesamtGrenzsatz) * 100).toFixed(0)} % \u2014 steuerfreie Benefits sind hier maximal wertvoll. (4) MBA/Executive Education: Kosten von 20.000\u201340.000 \u20ac \u00fcber 2\u20133 Jahre absetzbar = Ersparnis ${fmtInt(30000 * grenzsteuersatz)} \u20ac. (5) Betriebliche Pensionszusage: Arbeitgeber-finanziert, steuerfrei f\u00fcr AN, und erg\u00e4nzt die gesetzliche Pension. Optimierungspotenzial: 3.000\u20135.500 \u20ac j\u00e4hrlich.`;
  }
  if (amount <= 7000) {
    return `Premium-Steueroptimierung bei ${fmtInt(amount)} \u20ac brutto: Die SV-Deckelung ist erreicht, der Grenzsteuersatz liegt bei ${(grenzsteuersatz * 100).toFixed(0)} %. Strategien f\u00fcr maximale Effizienz: (1) Vorteil der SV-Deckelung nutzen: Jeder zus\u00e4tzlich verdiente Euro wird nur noch mit ${(grenzsteuersatz * 100).toFixed(0)} % belastet (kein SV-Abzug mehr). Variable Verg\u00fctungsbestandteile sind daher besonders netto-effektiv. (2) Firmenwagen-Optimierung: Sachbezug 1,5 % (Elektrofahrzeug) statt 2 % (Verbrenner) spart ca. ${fmtInt(amount * 0.005 * grenzsteuersatz * 12)} \u20ac Steuer/Jahr. (3) Betriebliche Altersvorsorge: Arbeitgeberbeitr\u00e4ge zur Pensionskasse sind f\u00fcr den Arbeitnehmer steuerfrei und SV-frei. (4) Aktienoptionen/Stock Options: Unter bestimmten Bedingungen bis 3.000 \u20ac/Jahr steuerbeg\u00fcnstigt (halber Steuersatz). (5) Nebent\u00e4tigkeit \u00fcber GmbH: Bei Beratungs-/Vortragst\u00e4tigkeit kann die K\u00d6St (25 %) g\u00fcnstiger sein als der Grenzsteuersatz (${(grenzsteuersatz * 100).toFixed(0)} %). Gesamtpotenzial: 3.000\u20136.000 \u20ac j\u00e4hrliche Optimierung.`;
  }
  // 8000+
  return `Executive-Steuerplanung bei ${fmtInt(amount)} \u20ac brutto (${fmtInt(entry.bruttoJaehrlich)} \u20ac/Jahr): Bei diesem Einkommensniveau ist professionelle Steuerberatung essenziell. Kernstrategien: (1) Verg\u00fctungsstruktur optimieren: Mix aus Fixgehalt, Erfolgsbeteiligung und steuerfreien Benefits maximiert das Netto. Bei ${fmtInt(amount)} \u20ac brutto und 48 % Grenzsteuersatz ist jeder nettofrei gestaltbare Euro doppelt so viel wert. (2) Firmenbeteiligungsmodelle: Mitarbeiter-Kapitalbeteiligungen bis 3.000 \u20ac/Jahr steuerbeg\u00fcnstigt. Bei Start-up-Beteiligungen gilt die Zuflussbesteuerung erst bei Realisierung. (3) Internationale Steuerplanung: Bei grenz\u00fcberschreitender T\u00e4tigkeit DBA-Regelungen (Doppelbesteuerungsabkommen) pr\u00fcfen. (4) Immobilienstrategie: Vorsorgewohnung als Werbungskosten-Quelle (AfA 1,5 %, Zinsen, Instandhaltung) kann die Steuerlast um 2.000\u20135.000 \u20ac/Jahr senken. (5) Pensionsvorsorge: Beitr\u00e4ge zur Zukunftsvorsorge (pr\u00e4mienf\u00f6rdernd) und betriebliche Pensionszusage kombinieren. Realistisches Gesamt-Optimierungspotenzial bei professioneller Beratung: 5.000\u201310.000 \u20ac j\u00e4hrlich.`;
}

// --- getGehaltsZusammensetzung ---

export function getGehaltsZusammensetzung(entry: GehaltEntry): string {
  const amount = entry.bruttoMonatlich;

  if (amount <= 1500) {
    return `Vom Bruttogehalt (${fmt(amount)} \u20ac) werden als Erstes die Sozialversicherungsbeitr\u00e4ge abgezogen: ${fmt(entry.svKV)} \u20ac f\u00fcr die Krankenversicherung und ${fmt(entry.svPV)} \u20ac f\u00fcr die Pensionsversicherung. Da ${fmtInt(amount)} \u20ac unter der Freigrenze von 2.093 \u20ac liegt, entf\u00e4llt die Arbeitslosenversicherung komplett. Insgesamt gehen ${fmt(entry.svGesamt)} \u20ac an die Sozialversicherung. Das verbleibende steuerpflichtige Einkommen von ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac wird mit nur ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer belastet \u2014 das zu versteuernde Jahreseinkommen liegt gr\u00f6\u00dftenteils im steuerfreien Grundfreibetrag. Ergebnis: ${fmt(entry.nettoMonatlich)} \u20ac netto auf Ihrem Konto.`;
  }
  if (amount <= 2000) {
    return `Die Gehaltsabrechnung bei ${fmtInt(amount)} \u20ac brutto: Zuerst werden ${fmt(entry.svGesamt)} \u20ac Sozialversicherung einbehalten (${fmt(entry.svKV)} \u20ac KV, ${fmt(entry.svPV)} \u20ac PV, ${fmt(entry.svAV)} \u20ac AV${entry.svAV === 0 ? ' \u2014 Freigrenze nicht erreicht' : entry.bruttoMonatlich <= 2282 ? ' zum reduzierten Satz von 1 %' : ''}). Das steuerpflichtige Monatseinkommen betr\u00e4gt dann ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac. Die Lohnsteuer schl\u00e4gt mit ${fmt(entry.lohnsteuerMonatlich)} \u20ac zu Buche \u2014 noch verh\u00e4ltnism\u00e4\u00dfig gering, da der Gro\u00dfteil des Einkommens in der niedrigsten Tarifstufe (20 %) liegt. Netto-Ergebnis: ${fmt(entry.nettoMonatlich)} \u20ac monatlich.`;
  }
  if (amount <= 2500) {
    return `So wird Ihr Bruttogehalt von ${fmt(amount)} \u20ac aufgeteilt: Die Sozialversicherung beansprucht ${fmt(entry.svGesamt)} \u20ac (Krankenvers. ${fmt(entry.svKV)} \u20ac, Pensionsvers. ${fmt(entry.svPV)} \u20ac, Arbeitslosenvers. ${fmt(entry.svAV)} \u20ac). Nach SV-Abzug verbleibt ein steuerpflichtiges Einkommen von ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac. Darauf wird nach dem progressiven Steuertarif ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer erhoben. Die Besteuerung erfolgt haupts\u00e4chlich in der 20-30-%-Stufe. Am Ende verbleiben ${fmt(entry.nettoMonatlich)} \u20ac als verf\u00fcgbares Nettoeinkommen auf Ihrem Gehaltskonto.`;
  }
  if (amount <= 3000) {
    return `Detaillierte Zusammensetzung bei ${fmtInt(amount)} \u20ac brutto: Vom Bruttogehalt gehen ${fmt(entry.svGesamt)} \u20ac an die Sozialversicherungstr\u00e4ger ab \u2014 aufgegliedert in ${fmt(entry.svKV)} \u20ac Krankenversicherung (3,87 %), ${fmt(entry.svPV)} \u20ac Pensionsversicherung (10,25 %) und ${fmt(entry.svAV)} \u20ac Arbeitslosenversicherung (3 %). Das verbleibende steuerpflichtige Monatseinkommen (${fmt(entry.steuerpflichtigesEinkommen)} \u20ac) wird mit ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer belastet. Die Steuerlast liegt nahe am \u00f6sterreichischen Median und greift haupts\u00e4chlich mit dem 30-%-Tarif. Endergebnis: ${fmt(entry.nettoMonatlich)} \u20ac Nettogehalt.`;
  }
  if (amount <= 3500) {
    return `Der Weg vom Brutto zum Netto bei ${fmtInt(amount)} \u20ac: Zun\u00e4chst werden die gesetzlichen SV-Beitr\u00e4ge einbehalten: ${fmt(entry.svKV)} \u20ac Krankenversicherung, ${fmt(entry.svPV)} \u20ac Pensionsversicherung und ${fmt(entry.svAV)} \u20ac Arbeitslosenversicherung (gesamt: ${fmt(entry.svGesamt)} \u20ac). Auf das resultierende steuerpflichtige Einkommen von ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac greift der progressive Lohnsteuertarif: ${fmt(entry.lohnsteuerMonatlich)} \u20ac monatlich. Bei diesem Gehalt beginnt die 40-%-Stufe zu wirken. Nach s\u00e4mtlichen Abz\u00fcgen stehen ${fmt(entry.nettoMonatlich)} \u20ac netto zur Verf\u00fcgung.`;
  }
  if (amount <= 4000) {
    return `Brutto-Netto-Analyse bei ${fmtInt(amount)} \u20ac: Die Sozialversicherungsbeitr\u00e4ge summieren sich auf ${fmt(entry.svGesamt)} \u20ac (${fmt(entry.svKV)} \u20ac KV + ${fmt(entry.svPV)} \u20ac PV + ${fmt(entry.svAV)} \u20ac AV). Danach wird das steuerpflichtige Einkommen von ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac mit dem progressiven Tarif besteuert: ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer fallen an. Ab dieser Gehaltsklasse ist die Lohnsteuer bereits der gr\u00f6\u00dfere Abzugsposten. Nach beiden Abz\u00fcgen bleiben Ihnen monatlich ${fmt(entry.nettoMonatlich)} \u20ac netto \u00fcbrig.`;
  }
  if (amount <= 4500) {
    return `Gehaltsaufschl\u00fcsselung ${fmtInt(amount)} \u20ac brutto: Erste Abzugsstufe \u2014 Sozialversicherung: ${fmt(entry.svGesamt)} \u20ac gesamt, bestehend aus Krankenversicherung (${fmt(entry.svKV)} \u20ac), Pensionsversicherung (${fmt(entry.svPV)} \u20ac) und Arbeitslosenversicherung (${fmt(entry.svAV)} \u20ac). Zweite Abzugsstufe \u2014 Lohnsteuer: Auf das steuerpflichtige Einkommen von ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac entfallen ${fmt(entry.lohnsteuerMonatlich)} \u20ac (der 40-%-Tarif dominiert deutlich). Die Lohnsteuer \u00fcbersteigt die SV-Beitr\u00e4ge mittlerweile erheblich. Netto-Ergebnis: ${fmt(entry.nettoMonatlich)} \u20ac f\u00fcr Ihren Lebensunterhalt.`;
  }
  if (amount <= 5000) {
    return `Analyse der Gehaltsbestandteile bei ${fmtInt(amount)} \u20ac brutto: Von Ihrem Gehalt werden ${fmt(entry.svGesamt)} \u20ac Sozialversicherung abgef\u00fchrt \u2014 ${fmt(entry.svKV)} \u20ac Krankenversicherung (3,87 %), ${fmt(entry.svPV)} \u20ac Pensionsversicherung (10,25 %) und ${fmt(entry.svAV)} \u20ac Arbeitslosenversicherung (3 %). Das steuerpflichtige Resteinkommen von ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac wird mit ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer belastet \u2014 das Jahreseinkommen n\u00e4hert sich der 48-%-Tarifstufe. Ihr monatliches Netto nach allen Abz\u00fcgen: ${fmt(entry.nettoMonatlich)} \u20ac.`;
  }
  if (amount <= 5500) {
    return `Nettolohn-Ermittlung bei ${fmtInt(amount)} \u20ac monatlichem Brutto: Die SV-Beitr\u00e4ge betragen insgesamt ${fmt(entry.svGesamt)} \u20ac (KV: ${fmt(entry.svKV)} \u20ac, PV: ${fmt(entry.svPV)} \u20ac, AV: ${fmt(entry.svAV)} \u20ac). Von den verbleibenden ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac steuerpflichtigem Einkommen zieht das Finanzamt ${fmt(entry.lohnsteuerMonatlich)} \u20ac Lohnsteuer ab. Bei diesem Gehaltsniveau ist die Lohnsteuer mehr als doppelt so hoch wie die SV-Beitr\u00e4ge \u2014 ein Zeichen f\u00fcr die fortgeschrittene Progression. Monatliches Netto: ${fmt(entry.nettoMonatlich)} \u20ac.`;
  }
  if (amount <= 6000) {
    return `Vom Brutto zum Netto bei ${fmtInt(amount)} \u20ac: Die Sozialversicherung (${fmt(entry.svGesamt)} \u20ac) setzt sich zusammen aus: ${fmt(entry.svKV)} \u20ac Krankenversicherung, ${fmt(entry.svPV)} \u20ac Pensionsversicherung und ${fmt(entry.svAV)} \u20ac Arbeitslosenversicherung. Da ${fmtInt(amount)} \u20ac knapp unter der H\u00f6chstbeitragsgrundlage (6.060 \u20ac) liegt, wird der volle SV-Beitragssatz noch auf das gesamte Bruttogehalt angewandt. Die Lohnsteuer betr\u00e4gt ${fmt(entry.lohnsteuerMonatlich)} \u20ac auf das steuerpflichtige Einkommen von ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac. Netto verbleiben ${fmt(entry.nettoMonatlich)} \u20ac.`;
  }
  if (amount <= 7000) {
    return `Gehaltsberechnung bei ${fmtInt(amount)} \u20ac brutto: Dank der SV-H\u00f6chstbeitragsgrundlage (6.060 \u20ac) sind die Sozialversicherungsbeitr\u00e4ge bei ${fmt(entry.svGesamt)} \u20ac gedeckelt \u2014 bestehend aus ${fmt(entry.svKV)} \u20ac KV, ${fmt(entry.svPV)} \u20ac PV und ${fmt(entry.svAV)} \u20ac AV (alle berechnet auf 6.060 \u20ac, nicht auf das volle Gehalt). Die Lohnsteuer ist mit ${fmt(entry.lohnsteuerMonatlich)} \u20ac der dominierende Abzugsposten und wird auf das steuerpflichtige Einkommen von ${fmt(entry.steuerpflichtigesEinkommen)} \u20ac erhoben. Nach allen Abz\u00fcgen bleiben ${fmt(entry.nettoMonatlich)} \u20ac netto monatlich.`;
  }
  // 8000+
  return `Detailberechnung bei ${fmtInt(amount)} \u20ac Bruttogehalt: Die Sozialversicherungsbeitr\u00e4ge sind bei ${fmt(entry.svGesamt)} \u20ac eingefroren (${fmt(entry.svKV)} \u20ac Kranken-, ${fmt(entry.svPV)} \u20ac Pensions-, ${fmt(entry.svAV)} \u20ac Arbeitslosenversicherung) \u2014 alles berechnet auf die H\u00f6chstbeitragsgrundlage von 6.060 \u20ac statt auf die vollen ${fmtInt(amount)} \u20ac. Bei proportionaler Berechnung w\u00e4ren es ${fmt(amount * 0.1712)} \u20ac SV-Beitr\u00e4ge. Die Lohnsteuer von ${fmt(entry.lohnsteuerMonatlich)} \u20ac entf\u00e4llt auf das steuerpflichtige Einkommen (${fmt(entry.steuerpflichtigesEinkommen)} \u20ac) und wird haupts\u00e4chlich mit dem 48-%-Tarif berechnet. Netto-Ergebnis: ${fmt(entry.nettoMonatlich)} \u20ac monatlich auf Ihrem Konto.`;
}
