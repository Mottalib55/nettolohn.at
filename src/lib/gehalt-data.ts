/**
 * Gehaltsdaten für programmatische SEO-Seiten
 * Brutto-Netto-Werte vorberechnet mit engine.ts (Stand 2026)
 */

export interface GehaltEntry {
  slug: string;
  bruttoMonatlich: number;
  nettoMonatlich: number;
  svGesamt: number;
  svKV: number;
  svPV: number;
  svAV: number;
  lohnsteuerMonatlich: number;
  nettoJaehrlich: number;
  bruttoJaehrlich: number;
  sonderzahlungNetto: number;
  sonderzahlungSV: number;
  sonderzahlungSteuer: number;
  effektiverSteuersatz: number;
  steuerpflichtigesEinkommen: number;
  description: string;
  context: string;
  faq: { question: string; answer: string }[];
}

export const gehaltData: GehaltEntry[] = [
  {
    slug: '1500',
    bruttoMonatlich: 1500,
    nettoMonatlich: 1282.74,
    svGesamt: 211.80,
    svKV: 58.05,
    svPV: 153.75,
    svAV: 0,
    lohnsteuerMonatlich: 5.46,
    nettoJaehrlich: 17876.19,
    bruttoJaehrlich: 21000,
    sonderzahlungNetto: 1248.11,
    sonderzahlungSV: 211.80,
    sonderzahlungSteuer: 40.09,
    effektiverSteuersatz: 0.1488,
    steuerpflichtigesEinkommen: 1288.20,
    description: '1.500 € brutto monatlich entsprechen ca. 1.283 € netto in Österreich 2026. Erfahren Sie hier die genaue Aufschlüsselung aller Abzüge.',
    context: 'Ein Bruttogehalt von 1.500 € monatlich liegt unter dem österreichischen Medianeinkommen und entspricht häufig einer Teilzeitstelle oder einem Einstiegsgehalt. Bei diesem Einkommensniveau entfällt die Arbeitslosenversicherung vollständig (0 %), da die Grenze von 2.093 € nicht erreicht wird. Die Lohnsteuerbelastung ist mit nur 5,46 € pro Monat äußerst gering, da ein Großteil des Einkommens unter den steuerfreien Grundfreibetrag von 12.816 € jährlich fällt. Inklusive der begünstigt besteuerten Sonderzahlungen (13. und 14. Gehalt) ergibt sich ein Jahresnetto von rund 17.876 €.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 1.500 € Brutto in Österreich?',
        answer: 'Von 1.500 € brutto monatlich bleiben in Österreich 2026 rund 1.282,74 € netto übrig. Die Abzüge setzen sich aus 211,80 € Sozialversicherung und 5,46 € Lohnsteuer zusammen. Die Arbeitslosenversicherung entfällt bei diesem Gehalt vollständig.',
      },
      {
        question: 'Wie hoch sind die Sozialversicherungsbeiträge bei 1.500 € Brutto?',
        answer: 'Bei einem Bruttogehalt von 1.500 € betragen die Sozialversicherungsbeiträge insgesamt 211,80 € pro Monat: 58,05 € Krankenversicherung (3,87 %), 153,75 € Pensionsversicherung (10,25 %) und 0 € Arbeitslosenversicherung, da das Gehalt unter der Grenze von 2.093 € liegt.',
      },
      {
        question: 'Wie viel Jahresnetto ergibt ein Bruttogehalt von 1.500 €?',
        answer: 'Bei 1.500 € brutto monatlich ergibt sich ein Jahresnetto von rund 17.876 €. Darin enthalten sind 12 reguläre Monatsgehälter sowie die begünstigt besteuerten Sonderzahlungen (13. und 14. Gehalt) mit jeweils ca. 1.248 € netto.',
      },
    ],
  },
  {
    slug: '2000',
    bruttoMonatlich: 2000,
    nettoMonatlich: 1626.26,
    svGesamt: 282.40,
    svKV: 77.40,
    svPV: 205.00,
    svAV: 0,
    lohnsteuerMonatlich: 91.34,
    nettoJaehrlich: 22805.69,
    bruttoJaehrlich: 28000,
    sonderzahlungNetto: 1651.74,
    sonderzahlungSV: 282.40,
    sonderzahlungSteuer: 65.86,
    effektiverSteuersatz: 0.1855,
    steuerpflichtigesEinkommen: 1717.60,
    description: '2.000 € brutto monatlich ergeben ca. 1.626 € netto in Österreich 2026. Alle Abzüge für SV, Lohnsteuer und Sonderzahlungen im Detail.',
    context: 'Mit einem Bruttogehalt von 2.000 € monatlich liegt man in Österreich im unteren Einkommensbereich. Dieses Gehalt ist typisch für Berufseinsteiger, Teilzeitkräfte oder bestimmte Branchen wie den Einzelhandel. Bei diesem Einkommensniveau greift noch keine Arbeitslosenversicherung (Grenze 2.093 €), was das Netto etwas erhöht. Die Lohnsteuer ist mit 91,34 € pro Monat moderat, da der progressive Steuertarif bei niedrigen Einkommen schonend wirkt. Über das Jahr gesehen ergibt sich durch die 14 Gehälter ein Brutto von 28.000 € und ein Netto von rund 22.806 €.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 2.000 € Brutto in Österreich?',
        answer: 'Von 2.000 € brutto monatlich bleiben in Österreich 2026 rund 1.626,26 € netto übrig. Die Abzüge betragen 282,40 € für Sozialversicherung und 91,34 € für Lohnsteuer. Die Arbeitslosenversicherung entfällt bei diesem Gehaltsniveau.',
      },
      {
        question: 'Welcher Steuersatz gilt bei 2.000 € Brutto?',
        answer: 'Bei 2.000 € brutto monatlich liegt der effektive Steuersatz (Gesamtabgaben im Verhältnis zum Brutto) bei rund 18,6 %. Der Grenzsteuersatz auf das zu versteuernde Einkommen beträgt 20 %, da das Jahreseinkommen in die zweite Tarifstufe fällt.',
      },
      {
        question: 'Wie hoch ist das 13. und 14. Gehalt bei 2.000 € Brutto?',
        answer: 'Bei 2.000 € brutto erhält man pro Sonderzahlung ca. 1.651,74 € netto. Die begünstigte Besteuerung mit 6 % (nach Abzug von SV und 620 € Freibetrag) sorgt dafür, dass von den Sonderzahlungen deutlich mehr netto übrig bleibt als beim regulären Monatsgehalt.',
      },
    ],
  },
  {
    slug: '2500',
    bruttoMonatlich: 2500,
    nettoMonatlich: 1876.07,
    svGesamt: 428.00,
    svKV: 96.75,
    svPV: 256.25,
    svAV: 75.00,
    lohnsteuerMonatlich: 195.93,
    nettoJaehrlich: 26469.61,
    bruttoJaehrlich: 35000,
    sonderzahlungNetto: 1984.88,
    sonderzahlungSV: 428.00,
    sonderzahlungSteuer: 87.12,
    effektiverSteuersatz: 0.2437,
    steuerpflichtigesEinkommen: 2072.00,
    description: '2.500 € brutto monatlich ergeben ca. 1.876 € netto in Österreich 2026. Detaillierte Aufschlüsselung mit SV, Steuer und Sonderzahlungen.',
    context: 'Ein monatliches Bruttogehalt von 2.500 € ist in Österreich ein häufiges Einstiegsgehalt für Facharbeiter und Angestellte. Ab diesem Einkommensniveau wird erstmals der volle Satz der Arbeitslosenversicherung (3 %) fällig, da die Grenze von 2.471 € überschritten wird. Die Sozialversicherungsbeiträge steigen dadurch spürbar auf 428 € monatlich. Die Lohnsteuer von rund 196 € monatlich resultiert daraus, dass das zu versteuernde Jahreseinkommen zunehmend in die 30-Prozent-Stufe hineinreicht. Mit den Sonderzahlungen ergibt sich ein Jahresnetto von rund 26.470 €.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 2.500 € Brutto in Österreich?',
        answer: 'Von 2.500 € brutto monatlich bleiben in Österreich 2026 rund 1.876,07 € netto übrig. Die Abzüge setzen sich aus 428 € Sozialversicherung (inkl. 3 % Arbeitslosenversicherung) und 195,93 € Lohnsteuer zusammen.',
      },
      {
        question: 'Warum steigt die SV bei 2.500 € Brutto so stark an?',
        answer: 'Ab einem Bruttogehalt von 2.471 € greift der volle Arbeitslosenversicherungssatz von 3 %. Bei niedrigeren Gehältern gilt ein reduzierter Satz (0-2 %). Dadurch steigen die Gesamtbeiträge zur SV auf 428 € monatlich, was einen SV-Anteil von 17,12 % des Bruttogehalts bedeutet.',
      },
      {
        question: 'Was bleibt bei 2.500 € Brutto jährlich netto übrig?',
        answer: 'Bei 2.500 € brutto monatlich ergibt sich ein Jahresnetto von rund 26.470 €. Das Jahresbrutto beträgt 35.000 € (14 Gehälter). Jede Sonderzahlung bringt ca. 1.985 € netto, dank der begünstigten Besteuerung mit nur 6 %.',
      },
    ],
  },
  {
    slug: '3000',
    bruttoMonatlich: 3000,
    nettoMonatlich: 2166.15,
    svGesamt: 513.60,
    svKV: 116.10,
    svPV: 307.50,
    svAV: 90.00,
    lohnsteuerMonatlich: 320.25,
    nettoJaehrlich: 30729.65,
    bruttoJaehrlich: 42000,
    sonderzahlungNetto: 2374.42,
    sonderzahlungSV: 513.60,
    sonderzahlungSteuer: 111.98,
    effektiverSteuersatz: 0.2683,
    steuerpflichtigesEinkommen: 2486.40,
    description: '3.000 € brutto monatlich ergeben ca. 2.166 € netto in Österreich 2026. Vollständige Berechnung mit allen Abzügen und Sonderzahlungen.',
    context: '3.000 € brutto monatlich ist ein typisches Gehalt für erfahrene Angestellte in Österreich und liegt nahe am Medianeinkommen. Bei diesem Gehalt beträgt die Gesamtbelastung durch Abzüge rund 26,8 %. Die Lohnsteuer von 320,25 € monatlich resultiert daraus, dass ein bedeutender Teil des Einkommens in die 30-Prozent-Tarifstufe fällt. Die Sozialversicherungsbeiträge machen mit 513,60 € den größten Abzugsposten aus. Das Jahresnetto von rund 30.730 € bei einem Jahresbrutto von 42.000 € (14 Gehälter) zeigt den Vorteil des österreichischen Systems mit begünstigten Sonderzahlungen deutlich.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 3.000 € Brutto in Österreich?',
        answer: 'Von 3.000 € brutto monatlich bleiben in Österreich 2026 rund 2.166,15 € netto. Die Abzüge betragen 513,60 € Sozialversicherung und 320,25 € Lohnsteuer. Der effektive Gesamtabgabensatz liegt bei 26,8 %.',
      },
      {
        question: 'Wie viel Lohnsteuer zahlt man bei 3.000 € Brutto?',
        answer: 'Bei 3.000 € brutto monatlich beträgt die Lohnsteuer 320,25 € pro Monat bzw. rund 3.843 € im Jahr. Das zu versteuernde Einkommen fällt dabei teilweise in die 30-Prozent-Tarifstufe. Der Verkehrsabsetzbetrag von 463 € jährlich ist bereits berücksichtigt.',
      },
      {
        question: 'Ist 3.000 € Brutto ein gutes Gehalt in Österreich?',
        answer: '3.000 € brutto monatlich liegt in der Nähe des österreichischen Medianeinkommens und ist ein solides Gehalt für Angestellte. Das ergibt ein Jahresnetto von ca. 30.730 € inklusive 13. und 14. Gehalt. In Ballungsräumen wie Wien kann die Kaufkraft je nach Lebenshaltungskosten variieren.',
      },
    ],
  },
  {
    slug: '3500',
    bruttoMonatlich: 3500,
    nettoMonatlich: 2453.75,
    svGesamt: 599.20,
    svKV: 135.45,
    svPV: 358.75,
    svAV: 105.00,
    lohnsteuerMonatlich: 447.05,
    nettoJaehrlich: 34960.01,
    bruttoJaehrlich: 49000,
    sonderzahlungNetto: 2763.95,
    sonderzahlungSV: 599.20,
    sonderzahlungSteuer: 136.85,
    effektiverSteuersatz: 0.2865,
    steuerpflichtigesEinkommen: 2900.80,
    description: '3.500 € brutto monatlich ergeben ca. 2.454 € netto in Österreich 2026. Aufschlüsselung aller Abzüge, Lohnsteuer und Sonderzahlungen.',
    context: 'Mit 3.500 € brutto monatlich liegt man in Österreich über dem Medianeinkommen. Dieses Gehalt ist typisch für qualifizierte Fachkräfte, Techniker oder Angestellte mit mehrjähriger Berufserfahrung. Die Gesamtabgabenquote steigt auf rund 28,7 %, wobei die Lohnsteuer mit 447 € monatlich bereits ein erheblicher Posten ist. Das zu versteuernde Jahreseinkommen von rund 34.810 € fällt zunehmend in die 40-Prozent-Tarifstufe. Jährlich ergibt sich bei 14 Gehältern ein Brutto von 49.000 € und ein Netto von knapp 34.960 €.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 3.500 € Brutto in Österreich?',
        answer: 'Von 3.500 € brutto monatlich bleiben in Österreich 2026 rund 2.453,75 € netto. Die Sozialversicherung beträgt 599,20 € und die Lohnsteuer 447,05 €. Das ergibt eine Nettoabgabenquote von ca. 29,9 % auf das Monatsgehalt.',
      },
      {
        question: 'Wie verändert sich das Netto zwischen 3.000 € und 3.500 € Brutto?',
        answer: 'Bei einer Erhöhung von 3.000 € auf 3.500 € brutto steigt das monatliche Netto um rund 288 € (von 2.166 € auf 2.454 €). Von den 500 € Bruttomehr bleiben also ca. 57,5 % als Netto übrig — der Rest geht an höhere SV-Beiträge und Lohnsteuer.',
      },
      {
        question: 'Wie hoch ist das Jahresgehalt bei 3.500 € Brutto netto?',
        answer: 'Bei 3.500 € brutto monatlich ergibt sich ein Jahresbrutto von 49.000 € (14 Gehälter) und ein Jahresnetto von rund 34.960 €. Die begünstigt besteuerten Sonderzahlungen tragen jeweils ca. 2.764 € netto zum Jahreseinkommen bei.',
      },
    ],
  },
  {
    slug: '4000',
    bruttoMonatlich: 4000,
    nettoMonatlich: 2702.40,
    svGesamt: 684.80,
    svKV: 154.80,
    svPV: 410.00,
    svAV: 120.00,
    lohnsteuerMonatlich: 612.80,
    nettoJaehrlich: 38722.77,
    bruttoJaehrlich: 56000,
    sonderzahlungNetto: 3153.49,
    sonderzahlungSV: 684.80,
    sonderzahlungSteuer: 161.71,
    effektiverSteuersatz: 0.3085,
    steuerpflichtigesEinkommen: 3315.20,
    description: '4.000 € brutto monatlich ergeben ca. 2.702 € netto in Österreich 2026. Detaillierte Berechnung inklusive Steuer, SV und 13./14. Gehalt.',
    context: 'Ein Bruttogehalt von 4.000 € monatlich ist in Österreich ein überdurchschnittliches Einkommen, das häufig bei Akademikern, IT-Fachkräften oder erfahrenen Führungskräften zu finden ist. Die Gesamtabgabenquote liegt bei rund 30,9 %. Mit einem zu versteuernden Jahreseinkommen von ca. 39.782 € fällt ein beträchtlicher Teil in die 40-Prozent-Tarifstufe. Die Sozialversicherungsbeiträge von 684,80 € und die Lohnsteuer von 612,80 € ergeben zusammen monatliche Abzüge von fast 1.298 €. Jährlich resultiert bei 14 Gehältern ein Brutto von 56.000 € und ein Netto von rund 38.723 €.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 4.000 € Brutto in Österreich?',
        answer: 'Von 4.000 € brutto monatlich bleiben in Österreich 2026 rund 2.702,40 € netto. Die Abzüge betragen 684,80 € Sozialversicherung und 612,80 € Lohnsteuer. Der effektive Gesamtabgabensatz liegt bei 30,9 %.',
      },
      {
        question: 'In welche Steuerstufe fällt man bei 4.000 € Brutto?',
        answer: 'Bei 4.000 € brutto monatlich fällt das zu versteuernde Jahreseinkommen (ca. 39.782 €) in die vierte Tarifstufe mit 40 % Grenzsteuersatz. Die ersten 12.816 € sind steuerfrei, dann folgen Stufen mit 20 %, 30 % und 40 %. Der effektive Durchschnittssteuersatz ist daher deutlich niedriger als 40 %.',
      },
      {
        question: 'Wie viel spart man durch die Sonderzahlungen bei 4.000 € Brutto?',
        answer: 'Die begünstigte Besteuerung der Sonderzahlungen (6 % statt bis zu 40 % regulärer Tarif) spart bei 4.000 € brutto erheblich. Jede Sonderzahlung bringt ca. 3.153 € netto — deutlich mehr als ein reguläres Monatsgehalt (2.702 € netto). Der Steuervorteil beträgt mehrere hundert Euro pro Sonderzahlung.',
      },
    ],
  },
  {
    slug: '4500',
    bruttoMonatlich: 4500,
    nettoMonatlich: 2951.03,
    svGesamt: 770.40,
    svKV: 174.15,
    svPV: 461.25,
    svAV: 135.00,
    lohnsteuerMonatlich: 778.57,
    nettoJaehrlich: 42485.51,
    bruttoJaehrlich: 63000,
    sonderzahlungNetto: 3543.02,
    sonderzahlungSV: 770.40,
    sonderzahlungSteuer: 186.58,
    effektiverSteuersatz: 0.3256,
    steuerpflichtigesEinkommen: 3729.60,
    description: '4.500 € brutto monatlich ergeben ca. 2.951 € netto in Österreich 2026. Vollständige Gehaltsberechnung mit allen Abzügen.',
    context: 'Mit 4.500 € brutto monatlich gehört man in Österreich zu den Besserverdienern. Dieses Gehalt findet sich häufig bei Führungskräften im mittleren Management, erfahrenen IT-Spezialisten oder Ingenieuren. Die Gesamtabgabenquote liegt bei 32,6 %. Das zu versteuernde Jahreseinkommen von rund 44.755 € fällt deutlich in die 40-Prozent-Tarifstufe hinein. Die Lohnsteuer von 778,57 € monatlich übersteigt mittlerweile die Sozialversicherungsbeiträge (770,40 €) — ein Wendepunkt, ab dem die Steuer zum größten Abzugsposten wird. Das Jahresnetto beträgt rund 42.486 €.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 4.500 € Brutto in Österreich?',
        answer: 'Von 4.500 € brutto monatlich bleiben in Österreich 2026 rund 2.951,03 € netto. Die Abzüge setzen sich aus 770,40 € Sozialversicherung und 778,57 € Lohnsteuer zusammen. Ab diesem Gehalt ist die Steuer erstmals höher als die SV-Beiträge.',
      },
      {
        question: 'Wie hoch ist der effektive Steuersatz bei 4.500 € Brutto?',
        answer: 'Bei 4.500 € brutto monatlich liegt der effektive Gesamtabgabensatz bei 32,6 %. Das bedeutet, dass von jedem verdienten Euro rund 32,6 Cent an Sozialversicherung, Lohnsteuer und sonstige Abgaben gehen. Der Grenzsteuersatz auf den letzten verdienten Euro beträgt 40 %.',
      },
      {
        question: 'Lohnt sich eine Gehaltserhöhung von 4.000 € auf 4.500 € Brutto?',
        answer: 'Bei einer Erhöhung von 4.000 € auf 4.500 € brutto steigt das Monatsnetto um ca. 249 € (von 2.702 € auf 2.951 €). Von den 500 € Bruttomehr bleiben also 49,7 % als Netto — der Rest geht an Steuern und SV. Das Jahresnetto steigt um rund 3.763 €.',
      },
    ],
  },
  {
    slug: '5000',
    bruttoMonatlich: 5000,
    nettoMonatlich: 3199.67,
    svGesamt: 856.00,
    svKV: 193.50,
    svPV: 512.50,
    svAV: 150.00,
    lohnsteuerMonatlich: 944.33,
    nettoJaehrlich: 46248.27,
    bruttoJaehrlich: 70000,
    sonderzahlungNetto: 3932.56,
    sonderzahlungSV: 856.00,
    sonderzahlungSteuer: 211.44,
    effektiverSteuersatz: 0.3393,
    steuerpflichtigesEinkommen: 4144.00,
    description: '5.000 € brutto monatlich ergeben ca. 3.200 € netto in Österreich 2026. Detailrechnung mit SV, Lohnsteuer und Sonderzahlungen.',
    context: '5.000 € brutto monatlich ist ein gehobenes Gehalt in Österreich und typisch für Fachexperten, Abteilungsleiter oder Spezialisten in gefragten Branchen. Die Gesamtabgabenquote steigt auf 33,9 %. Die Lohnsteuer von 944,33 € monatlich ist mittlerweile deutlich höher als die Sozialversicherung (856 €). Das zu versteuernde Jahreseinkommen nähert sich der 48-Prozent-Stufe. Bei einem Jahresbrutto von 70.000 € (14 Gehälter) verbleibt ein Jahresnetto von rund 46.248 €. Die Sonderzahlungen bringen jeweils ca. 3.933 € netto — fast 734 € mehr als das reguläre Monatsnetto.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 5.000 € Brutto in Österreich?',
        answer: 'Von 5.000 € brutto monatlich bleiben in Österreich 2026 rund 3.199,67 € netto. Die Abzüge betragen 856 € Sozialversicherung und 944,33 € Lohnsteuer. Der effektive Gesamtabgabensatz liegt bei 33,9 %.',
      },
      {
        question: 'Wie nahe ist man bei 5.000 € Brutto an der SV-Höchstgrenze?',
        answer: 'Bei 5.000 € brutto liegt man noch unter der Höchstbeitragsgrundlage von 6.060 € monatlich. Das bedeutet, dass die vollen SV-Beiträge auf das gesamte Gehalt anfallen. Erst ab 6.060 € werden die SV-Beiträge gedeckelt.',
      },
      {
        question: 'Was verdient man bei 5.000 € Brutto im Jahr netto?',
        answer: 'Bei 5.000 € brutto monatlich ergibt sich ein Jahresbrutto von 70.000 € (14 Gehälter) und ein Jahresnetto von rund 46.248 €. Die beiden Sonderzahlungen tragen zusammen ca. 7.865 € netto zum Jahreseinkommen bei.',
      },
    ],
  },
  {
    slug: '5500',
    bruttoMonatlich: 5500,
    nettoMonatlich: 3448.31,
    svGesamt: 941.60,
    svKV: 212.85,
    svPV: 563.75,
    svAV: 165.00,
    lohnsteuerMonatlich: 1110.09,
    nettoJaehrlich: 50011.03,
    bruttoJaehrlich: 77000,
    sonderzahlungNetto: 4322.10,
    sonderzahlungSV: 941.60,
    sonderzahlungSteuer: 236.30,
    effektiverSteuersatz: 0.3505,
    steuerpflichtigesEinkommen: 4558.40,
    description: '5.500 € brutto monatlich ergeben ca. 3.448 € netto in Österreich 2026. Detaillierte Aufschlüsselung aller Abzüge und Begünstigungen.',
    context: 'Ein Bruttogehalt von 5.500 € monatlich positioniert einen Arbeitnehmer deutlich im oberen Einkommensbereich Österreichs. Dieses Gehalt ist typisch für erfahrene Manager, Senior-Entwickler oder spezialisierte Fachkräfte. Die Gesamtabgabenquote liegt bei 35,1 %. Die Lohnsteuer übersteigt mit 1.110 € pro Monat die Sozialversicherungsbeiträge (941,60 €) erheblich. Das zu versteuernde Jahreseinkommen von rund 54.701 € reicht tief in die 40-Prozent-Tarifstufe. Bei 14 Gehältern ergibt sich ein Jahresbrutto von 77.000 € und erstmals ein Jahresnetto von über 50.000 €.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 5.500 € Brutto in Österreich?',
        answer: 'Von 5.500 € brutto monatlich bleiben in Österreich 2026 rund 3.448,31 € netto. Die Abzüge setzen sich aus 941,60 € Sozialversicherung und 1.110,09 € Lohnsteuer zusammen. Der effektive Gesamtabgabensatz beträgt 35,1 %.',
      },
      {
        question: 'Übersteigt die Lohnsteuer bei 5.500 € Brutto die SV-Beiträge?',
        answer: 'Ja, bei 5.500 € brutto ist die Lohnsteuer (1.110,09 €) bereits deutlich höher als die Sozialversicherungsbeiträge (941,60 €). Dieser Unterschied wächst mit steigendem Einkommen weiter, da die SV durch die Höchstbeitragsgrundlage gedeckelt ist, die Steuer aber progressiv weiter steigt.',
      },
      {
        question: 'Wie wirkt sich der Familienbonus bei 5.500 € Brutto aus?',
        answer: 'Bei 5.500 € brutto und einem Kind reduziert der Familienbonus Plus (2.000 €/Jahr) die monatliche Lohnsteuer um ca. 167 €. Das Monatsnetto steigt dadurch auf rund 3.615 €. Bei zwei Kindern verdoppelt sich die Ersparnis auf ca. 333 € monatlich.',
      },
    ],
  },
  {
    slug: '6000',
    bruttoMonatlich: 6000,
    nettoMonatlich: 3696.95,
    svGesamt: 1027.20,
    svKV: 232.20,
    svPV: 615.00,
    svAV: 180.00,
    lohnsteuerMonatlich: 1275.85,
    nettoJaehrlich: 53773.77,
    bruttoJaehrlich: 84000,
    sonderzahlungNetto: 4711.63,
    sonderzahlungSV: 1027.20,
    sonderzahlungSteuer: 261.17,
    effektiverSteuersatz: 0.3598,
    steuerpflichtigesEinkommen: 4972.80,
    description: '6.000 € brutto monatlich ergeben ca. 3.697 € netto in Österreich 2026. Berechnung nahe der SV-Höchstbeitragsgrundlage.',
    context: '6.000 € brutto monatlich liegt knapp unter der Höchstbeitragsgrundlage der Sozialversicherung (6.060 €). Bei diesem Gehalt zahlt man noch auf das gesamte Einkommen SV-Beiträge — insgesamt 1.027,20 €. Die Lohnsteuer von 1.275,85 € ist bereits der größte Abzugsposten. Das zu versteuernde Jahreseinkommen von rund 59.674 € befindet sich tief in der 40-Prozent-Stufe. Mit einem Jahresbrutto von 84.000 € (14 Gehälter) und einem Jahresnetto von rund 53.774 € gehört man zu den Top-Verdienern in Österreich. Der effektive Abgabensatz liegt bei 36,0 %.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 6.000 € Brutto in Österreich?',
        answer: 'Von 6.000 € brutto monatlich bleiben in Österreich 2026 rund 3.696,95 € netto. Die Abzüge betragen 1.027,20 € Sozialversicherung und 1.275,85 € Lohnsteuer. Der effektive Gesamtabgabensatz liegt bei 36,0 %.',
      },
      {
        question: 'Warum ist 6.000 € Brutto ein wichtiger Schwellenwert?',
        answer: '6.000 € brutto liegt knapp unter der Höchstbeitragsgrundlage von 6.060 €. Ab 6.060 € werden die SV-Beiträge gedeckelt — jeder weitere Euro Brutto ist nur noch lohnsteuerpflichtig, aber nicht mehr SV-pflichtig. Das macht Gehaltserhöhungen über diese Grenze hinaus besonders attraktiv.',
      },
      {
        question: 'Wie viel Jahresnetto ergibt 6.000 € Brutto?',
        answer: 'Bei 6.000 € brutto monatlich ergibt sich ein Jahresbrutto von 84.000 € (14 Gehälter) und ein Jahresnetto von rund 53.774 €. Die zwei Sonderzahlungen bringen jeweils ca. 4.712 € netto — über 1.000 € mehr als ein reguläres Monatsgehalt.',
      },
    ],
  },
  {
    slug: '7000',
    bruttoMonatlich: 7000,
    nettoMonatlich: 4257.87,
    svGesamt: 1037.47,
    svKV: 234.52,
    svPV: 621.15,
    svAV: 181.80,
    lohnsteuerMonatlich: 1704.66,
    nettoJaehrlich: 62365.46,
    bruttoJaehrlich: 98000,
    sonderzahlungNetto: 5641.98,
    sonderzahlungSV: 1037.47,
    sonderzahlungSteuer: 320.55,
    effektiverSteuersatz: 0.3636,
    steuerpflichtigesEinkommen: 5962.53,
    description: '7.000 € brutto monatlich ergeben ca. 4.258 € netto in Österreich 2026. Gehalt über der SV-Höchstbeitragsgrundlage — SV gedeckelt.',
    context: 'Mit 7.000 € brutto monatlich liegt man deutlich über der Höchstbeitragsgrundlage von 6.060 €. Das bedeutet: Die Sozialversicherungsbeiträge sind gedeckelt bei 1.037,47 € — derselbe Betrag wie bei jedem Gehalt über 6.060 €. Die Lohnsteuer ist mit 1.704,66 € monatlich dagegen der bei Weitem größte Abzugsposten. Das zu versteuernde Jahreseinkommen von rund 71.551 € reicht in die 48-Prozent-Tarifstufe. Bei einem Jahresbrutto von 98.000 € (14 Gehälter) ergibt sich ein Jahresnetto von rund 62.365 €. Der effektive Abgabensatz liegt bei 36,4 %.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 7.000 € Brutto in Österreich?',
        answer: 'Von 7.000 € brutto monatlich bleiben in Österreich 2026 rund 4.257,87 € netto. Die Sozialversicherung ist bei 1.037,47 € gedeckelt (Höchstbeitragsgrundlage überschritten), die Lohnsteuer beträgt 1.704,66 €.',
      },
      {
        question: 'Warum sind die SV-Beiträge bei 7.000 € gleich wie bei 6.060 € Brutto?',
        answer: 'Ab einem Bruttogehalt von 6.060 € (Höchstbeitragsgrundlage 2026) werden Sozialversicherungsbeiträge nur noch auf 6.060 € berechnet. Jeder Euro darüber ist SV-frei. Die SV-Beiträge bleiben daher konstant bei 1.037,47 €, unabhängig davon ob man 6.060 €, 7.000 € oder mehr verdient.',
      },
      {
        question: 'In welche Steuerstufe fällt man bei 7.000 € Brutto?',
        answer: 'Bei 7.000 € brutto monatlich fällt das zu versteuernde Jahreseinkommen (ca. 71.551 €) in die fünfte Tarifstufe mit 48 % Grenzsteuersatz. Der Großteil des Einkommens wird jedoch mit niedrigeren Sätzen (0-40 %) besteuert, weshalb der effektive Durchschnittssteuersatz bei 36,4 % liegt.',
      },
    ],
  },
  {
    slug: '8000',
    bruttoMonatlich: 8000,
    nettoMonatlich: 4777.87,
    svGesamt: 1037.47,
    svKV: 234.52,
    svPV: 621.15,
    svAV: 181.80,
    lohnsteuerMonatlich: 2184.66,
    nettoJaehrlich: 70485.46,
    bruttoJaehrlich: 112000,
    sonderzahlungNetto: 6581.98,
    sonderzahlungSV: 1037.47,
    sonderzahlungSteuer: 380.55,
    effektiverSteuersatz: 0.3707,
    steuerpflichtigesEinkommen: 6962.53,
    description: '8.000 € brutto monatlich ergeben ca. 4.778 € netto in Österreich 2026. Gehaltsberechnung für Spitzenverdiener mit gedeckelter SV.',
    context: '8.000 € brutto monatlich ist ein Spitzengehalt in Österreich, typisch für Senior Management, erfahrene Ärzte, Juristen oder hochspezialisierte Fachkräfte. Die Sozialversicherungsbeiträge sind bei 1.037,47 € gedeckelt (wie bei allen Gehältern über 6.060 €), während die Lohnsteuer mit 2.184,66 € den größten Abzugsposten darstellt. Das zu versteuernde Jahreseinkommen von rund 83.550 € liegt deutlich in der 48-Prozent-Tarifstufe. Bei einem Jahresbrutto von 112.000 € (14 Gehälter) ergibt sich ein Jahresnetto von rund 70.485 €. Der effektive Abgabensatz beträgt 37,1 %.',
    faq: [
      {
        question: 'Wie viel Netto bleiben von 8.000 € Brutto in Österreich?',
        answer: 'Von 8.000 € brutto monatlich bleiben in Österreich 2026 rund 4.777,87 € netto. Die gedeckelten SV-Beiträge betragen 1.037,47 € und die Lohnsteuer 2.184,66 €. Der effektive Gesamtabgabensatz liegt bei 37,1 %.',
      },
      {
        question: 'Wie viel von einer Gehaltserhöhung bleibt bei 8.000 € Brutto netto?',
        answer: 'Bei einem Gehalt von 8.000 € brutto liegt der Grenzsteuersatz bei 48 %. Da die SV bereits gedeckelt ist, gehen von jedem zusätzlich verdienten Euro nur 48 % an Steuern. Es bleiben also ca. 52 Cent netto von jedem zusätzlich verdienten Euro — mehr als bei Gehältern unter der SV-Grenze.',
      },
      {
        question: 'Wie viel verdient man bei 8.000 € Brutto im Jahr netto?',
        answer: 'Bei 8.000 € brutto monatlich ergibt sich ein Jahresbrutto von 112.000 € (14 Gehälter) und ein Jahresnetto von rund 70.485 €. Die zwei Sonderzahlungen tragen jeweils ca. 6.582 € netto bei — fast 1.804 € mehr als das reguläre Monatsnetto.',
      },
    ],
  },
];
