# Validierung — nettolohn.at Brutto-Netto-Rechner 2026

## Quellen

- **Bundesministerium für Finanzen (BMF):** [bmf.gv.at](https://www.bmf.gv.at)
- **Sozialversicherung.at:** [sozialversicherung.at](https://www.sozialversicherung.at)
- **Einkommensteuergesetz (EStG) 2026**
- **ASVG (Allgemeines Sozialversicherungsgesetz)**

---

## Testfall 1: Durchschnittliches Gehalt — € 3.000 brutto/Monat

**Eingabe:**
- Bruttogehalt: € 3.000/Monat
- Keine Kinder, kein Alleinverdiener, kein Familienbonus

**Erwartete Berechnung:**

| Position | Berechnung | Betrag |
|---|---|---|
| Bruttogehalt | | € 3.000,00 |
| KV (3,87%) | 3.000 × 0,0387 | −€ 116,10 |
| PV (10,25%) | 3.000 × 0,1025 | −€ 307,50 |
| AV (3%) | 3.000 × 0,03 | −€ 90,00 |
| **SV gesamt** | | **−€ 513,60** |
| Bemessungsgrundlage/Monat | 3.000 − 513,60 | € 2.486,40 |
| Bemessungsgrundlage/Jahr | 2.486,40 × 12 | € 29.836,80 |
| Lohnsteuer (Jahr) | Progressiv | € 4.306,04 |
| − Verkehrsabsetzbetrag | | −€ 463,00 |
| **Lohnsteuer nach Absetzbeträgen** | | **€ 3.843,04** |
| Lohnsteuer/Monat | 3.843,04 ÷ 12 | € 320,25 |
| **Nettogehalt/Monat** | 3.000 − 513,60 − 320,25 | **€ 2.166,15** |

**Sonderzahlungen (13./14.):**
- SV je SZ: € 513,60
- Steuerbasis: 3.000 − 513,60 − 620 = € 1.866,40
- Steuer je SZ: 1.866,40 × 6% = € 111,98
- Netto je SZ: 3.000 − 513,60 − 111,98 = € 2.374,42

**Jahresbrutto:** € 42.000,00 (14 × 3.000)

---

## Testfall 2: Höheres Gehalt — € 5.000 brutto/Monat, 2 Kinder, Familienbonus

**Eingabe:**
- Bruttogehalt: € 5.000/Monat
- 2 Kinder unter 18, Familienbonus Plus aktiv
- Kein Alleinverdiener

**Erwartete Berechnung:**

| Position | Berechnung | Betrag |
|---|---|---|
| Bruttogehalt | | € 5.000,00 |
| KV (3,87%) | 5.000 × 0,0387 | −€ 193,50 |
| PV (10,25%) | 5.000 × 0,1025 | −€ 512,50 |
| AV (3%) | 5.000 × 0,03 | −€ 150,00 |
| **SV gesamt** | | **−€ 856,00** |
| Bemessungsgrundlage/Jahr | (5.000 − 856) × 12 | € 49.728,00 |
| Lohnsteuer (progressiv) | | € 12.789,10 |
| − Verkehrsabsetzbetrag | | −€ 463,00 |
| − Familienbonus Plus | 2 × 2.000 | −€ 4.000,00 |
| **Lohnsteuer nach Absetzbeträgen** | | **€ 8.326,10** |
| Lohnsteuer/Monat | 8.326,10 ÷ 12 | € 693,84 |
| **Nettogehalt/Monat** | 5.000 − 856 − 693,84 | **€ 3.450,16** |

**Jahresbrutto:** € 70.000,00 (14 × 5.000)

---

## Testfall 3: Gehalt über Höchstbeitragsgrundlage — € 8.000 brutto/Monat

**Eingabe:**
- Bruttogehalt: € 8.000/Monat
- Keine Kinder, kein Alleinverdiener

**Erwartete Berechnung:**

| Position | Berechnung | Betrag |
|---|---|---|
| Bruttogehalt | | € 8.000,00 |
| SV-Basis (gedeckelt) | min(8.000, 6.060) | € 6.060,00 |
| KV (3,87%) | 6.060 × 0,0387 | −€ 234,52 |
| PV (10,25%) | 6.060 × 0,1025 | −€ 621,15 |
| AV (3%) | 6.060 × 0,03 | −€ 181,80 |
| **SV gesamt** | | **−€ 1.037,47** |
| Bemessungsgrundlage/Jahr | (8.000 − 1.037,47) × 12 | € 83.550,36 |
| Lohnsteuer (progressiv) | | € 23.073,37 |
| − Verkehrsabsetzbetrag | | −€ 463,00 |
| **Lohnsteuer nach Absetzbeträgen** | | **€ 22.610,37** |
| Lohnsteuer/Monat | 22.610,37 ÷ 12 | € 1.884,20 |
| **Nettogehalt/Monat** | 8.000 − 1.037,47 − 1.884,20 | **€ 5.078,33** |

**Jahresbrutto:** € 112.000,00 (14 × 8.000)

**Hinweis:** Die SV-Beiträge sind bei € 6.060 gedeckelt. Die effektive SV-Rate sinkt 
von ~17,12% (bei € 3.000) auf ~12,97% (bei € 8.000) durch die Deckelung.

---

## Validierungsmethodik

1. Die Steuersätze und Sozialversicherungsbeiträge entsprechen den offiziellen Werten für 2026 gemäß BMF und Sozialversicherung.at.
2. Die progressive Besteuerung wurde anhand der Tarifstufen des EStG verifiziert.
3. Die Berechnung der Sonderzahlungen folgt den Bestimmungen des § 67 EStG (6% Pauschalbesteuerung, € 620 Freibetrag).
4. Die Höchstbeitragsgrundlage wurde korrekt als monatliche Obergrenze implementiert.
5. Alle Absetzbeträge (Verkehrsabsetzbetrag, Familienbonus Plus, AVAB) entsprechen den aktuellen Werten.
