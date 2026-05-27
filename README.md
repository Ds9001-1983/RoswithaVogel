# roswithavogel.de

Personal-Brand-Website für die Pfälzer Autorin und Malerin **Roswitha Vogel** —
Krimi-Trilogie, Sachbuch, Autobiografie, Kinderbuch und 23 Acryl-Werke
in einer ruhigen, typografiefokussierten One-Pager-Struktur mit
Adaptive-Island-Navigation.

Statisch generiert mit Astro 6, Tailwind 4 und etwas Motion One.

---

## Stack

- **Astro 6** — Static Site Generation, eingebaute Bildpipeline (Sharp → AVIF/WebP)
- **Tailwind CSS 4** — via `@tailwindcss/vite`
- **Motion One** — Vanilla-Animationen für die Adaptive Island
- **GSAP + ScrollTrigger** — Reveal-on-scroll
- **PhotoSwipe v5** — Galerie-Lightbox
- **lite-youtube-embed** — DSGVO-freundliches YouTube-Embed (inline implementiert)
- **Fontsource** — EB Garamond (Display) + Inter Variable (Body), lokal gehostet

## Setup

```sh
npm install
bash scripts/fetch-images.sh   # lädt 26 Gemälde + Portrait von pfalzdigital.de
npm run dev                    # http://localhost:4321
npm run build                  # statischer Output in dist/
npm run preview                # Build lokal testen
```

## Wichtig vor Veröffentlichung

### 1. Gemälde-Mapping korrigieren

`src/data/gallery.json` ist aktuell ein **Platzhalter** —
die 26 heruntergeladenen Pfalzdigital-Bilder sind den 23 Werk-Titeln aus
dem Briefing nur grob zugeordnet. So ordnest du sie sauber zu:

```sh
# scripts/mapper.html im Browser öffnen
open scripts/mapper.html
```

Im Tool ordnest du jedem Bild (raw-01.jpg … raw-26.jpg) den korrekten
Werk-Titel zu, klickst auf *Mapping exportieren* und ersetzt damit
`src/data/gallery.json`. Dauert ca. 10 Min.

### 2. Fehlende Buchcover ergänzen

3 von 6 Buchcovern sind enthalten (Mannstod, Macht des Alkohols, Mein Weg
aus dem Zwinger — von Pfalzdigital).
Fehlen noch: **Gegenwind**, **Frauenmord**, **Der kleine Löwe**.

Wenn die Cover als JPG/PNG/WebP vorliegen, einfach nach
`src/assets/covers/<slug>.<ext>` ablegen und in `src/data/books.json`
das `"cover"` Feld setzen, z.&nbsp;B. `"cover": "gegenwind.jpg"`.
Karten ohne Cover zeigen automatisch eine typografische Fallback-Karte.

### 3. Impressum + Datenschutz mit Pflichtangaben füllen

`src/pages/impressum.astro` und `src/pages/datenschutz.astro` enthalten
Platzhalter — Anschrift, E-Mail, Telefon u.&nbsp;a. müssen vor dem Launch
gesetzt werden.

### 4. Bio-Texte gegenlesen

Die paraphrasierten Texte in `src/components/BioSection.astro` stammen
aus dem Pfalzdigital-Artikel, sind aber neu formuliert. Vor Launch
durch Roswitha freigeben lassen.

### 5. Nutzungsrechte Bilder

Die Pfalzdigital-Bilder wurden ursprünglich von Roswitha Vogel zur
Verfügung gestellt — als Urheberin kann sie die Wiederverwendung auf
der eigenen Website freigeben. Vor Launch trotzdem schriftliches OK
einholen.

## Projektstruktur

```
RoswithaVogel/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   └── favicon.svg
├── scripts/
│   ├── fetch-images.sh         # cURL-Skript für Pfalzdigital-Bilder
│   ├── mapper.html             # Bild ⇄ Titel Zuordnungs-Tool
│   └── screenshot.mjs          # Playwright-Verifikation
└── src/
    ├── assets/
    │   ├── portrait.png
    │   ├── gallery/            # raw-01.jpg … raw-26.jpg
    │   └── covers/             # 3 Cover + Platz für 3 weitere
    ├── components/
    │   ├── AdaptiveIsland.astro   ← Floating-Pill-Navigation
    │   ├── Hero.astro
    │   ├── BioSection.astro
    │   ├── VideoSection.astro
    │   ├── BookGrid.astro
    │   ├── Gallery.astro          ← inkl. PhotoSwipe-Lightbox
    │   └── Footer.astro
    ├── data/
    │   ├── books.json
    │   └── gallery.json           ← Platzhalter, via Mapper ersetzen
    ├── layouts/
    │   └── Base.astro
    ├── pages/
    │   ├── index.astro
    │   ├── impressum.astro
    │   └── datenschutz.astro
    └── styles/
        └── global.css
```

## Verifikation

```sh
npm run build
npm run preview
node scripts/screenshot.mjs http://localhost:4321/
# Screenshots in /tmp/rovo-*.png prüfen
```

Manueller Walkthrough (Desktop 1440 + Mobile 390):
- Hero scrollt smooth zu allen 4 Sektionen über Insel-Klick
- Adaptive Island schrumpft beim Scroll und zeigt aktive Sektion
- Mobile-Insel zeigt Pill mit "Menü" → öffnet Vollbild-Sheet
- Bücher: 5 von 6 Karten haben Amazon-Button (Macht des Alkohols nicht)
- Galerie: Tile-Click öffnet Lightbox mit Caption, Pfeile + ESC funktionieren
- Video: Vorschau klickbar → lädt YouTube-Iframe
- Lighthouse ≥ 95 (statisch, lokal gehostete Fonts)

## Lizenz & Credits

Inhalt (Texte, Bilder, Bücher) © Roswitha Vogel. Quelle der biografischen
Angaben: <https://www.pfalzdigital.de/fachpersonen-und-mediaexperten/roswitha-vogel/>
(redaktioneller Artikel; Texte hier neu formuliert).

Site-Code für Roswitha Vogel privat erstellt.
