#!/usr/bin/env bash
# Cola reanudable: salta lo que ya bajó. Uso: bash assets/gen/lanzar.sh
cd "$(dirname "$0")"
mkdir -p out
BASE="Recreate this exact interior as a photorealistic editorial photograph. Preserve the architecture, ceiling, walls, lighting, furniture, Reformer machines and any logos exactly as they are. Warm indirect 2700K light, natural skin texture, candid genuine smiles, real people (not models posing), modest fitted athleisure in earthy and black tones. Do not add any text, signage or watermark. Scene: "
while IFS='|' read -r nombre ref ar escena; do
  [ -z "$nombre" ] && continue
  [ -f "out/$nombre.png" ] && { echo "salto $nombre"; continue; }
  echo ">> $nombre"
  json=$(higgsfield generate create nano_banana_pro --prompt "$BASE$escena" --image-references "../renders/$ref" --aspect_ratio "$ar" --resolution 2k --wait --json </dev/null)
  url=$(echo "$json" | grep -oE 'https://[^"]+\.(png|jpg|jpeg|webp)' | head -1)
  if [ -n "$url" ]; then curl -sL "$url" -o "out/$nombre.png" && echo "ok $nombre"; else echo "FALLO $nombre: $json" | head -c 600; echo; fi
done < cola.txt
