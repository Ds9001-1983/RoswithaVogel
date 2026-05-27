#!/usr/bin/env bash
# Lädt die 26 Pfalzdigital-Bilder + das Portrait herunter.
# Quelle: https://www.pfalzdigital.de/fachpersonen-und-mediaexperten/roswitha-vogel/
# Urheberin der Bilder: Roswitha Vogel.

set -euo pipefail

DEST="src/assets/gallery"
BASE="https://www.pfalzdigital.de/wp-content/uploads/2023/06"

mkdir -p "$DEST" src/assets/covers

echo "Lade 26 Gemälde-Bilder von Pfalzdigital ..."
for i in $(seq -w 1 26); do
  url="${BASE}/Roswitha-Vogel_0${i}.jpg"
  out="${DEST}/raw-${i}.jpg"
  if [[ -f "$out" ]]; then
    echo "  ✔ raw-${i}.jpg bereits vorhanden"
    continue
  fi
  echo "  ↓ raw-${i}.jpg"
  curl -fsSL -o "$out" "$url"
done

echo "Lade Portrait ..."
curl -fsSL -o src/assets/portrait.png "${BASE}/Roswitha-Vogel.png"

echo ""
echo "Fertig. ${DEST} enthält:"
ls "${DEST}" | wc -l
