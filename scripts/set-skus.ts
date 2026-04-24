#!/usr/bin/env npx tsx
/**
 * Setzt SKUs für alle Honig-Varianten nach Schema LH-[SORTE]-[GEWICHT]g
 * Ausführen: ADMIN_PASSWORD=xxx npx tsx scripts/set-skus.ts
 */

const BACKEND_URL = process.env.BACKEND_URL || "https://shop.leine-honig.de";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "radewaldt@pm.me";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

// Mapping: Produkttitel-Substring → Kürzel
const TITLE_TO_CODE: Record<string, string> = {
  "Rapshonig":          "RAPS",
  "Blütenhonig":        "BLUT",
  "Sommertrachthonig":  "SOMM",
  "Heidelbeerhonig":    "HEID",
  "Waldhonig":          "WALD",
  "Heidehonig":         "HEIDE",
};

async function api(token: string | null, method: string, path: string, body?: unknown) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json: any;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}: ${text.slice(0, 400)}`);
  return json;
}

function deriveCode(productTitle: string): string | null {
  for (const [key, code] of Object.entries(TITLE_TO_CODE)) {
    if (productTitle.toLowerCase().includes(key.toLowerCase())) return code;
  }
  return null;
}

function deriveWeight(variantTitle: string): string | null {
  const match = variantTitle.match(/(\d+)\s*g/i);
  return match ? `${match[1]}G` : null;
}

async function run() {
  if (!ADMIN_PASSWORD) {
    console.error("ADMIN_PASSWORD fehlt. Aufruf: ADMIN_PASSWORD=xxx npx tsx scripts/set-skus.ts");
    process.exit(1);
  }

  console.log(`\nLeine-Honig SKU-Setup`);
  console.log(`Backend: ${BACKEND_URL}\n`);

  const { token } = await api(null, "POST", "/auth/user/emailpass", {
    email: ADMIN_EMAIL, password: ADMIN_PASSWORD,
  });

  // Alle Produkte laden
  const { products } = await api(token, "GET", "/admin/products?limit=100&fields=id,title,variants.id,variants.title,variants.sku");

  let updated = 0;
  let skipped = 0;

  for (const product of products ?? []) {
    const code = deriveCode(product.title);
    if (!code) {
      console.warn(`  ⚠  Kein Code-Mapping für: "${product.title}" — übersprungen`);
      skipped++;
      continue;
    }

    for (const variant of product.variants ?? []) {
      const weight = deriveWeight(variant.title);
      if (!weight) {
        console.warn(`  ⚠  Kein Gewicht in Varianttitel: "${variant.title}" — übersprungen`);
        skipped++;
        continue;
      }

      const sku = `LH-${code}-${weight}`;
      if (variant.sku === sku) {
        console.log(`  ✓  ${product.title} · ${variant.title} → ${sku} (unverändert)`);
        continue;
      }

      await api(token, "POST", `/admin/products/${product.id}/variants/${variant.id}`, { sku });
      console.log(`  ✅  ${product.title} · ${variant.title} → ${sku}`);
      updated++;
    }
  }

  console.log(`\nFertig: ${updated} SKUs gesetzt, ${skipped} übersprungen.`);
}

run().catch((err) => { console.error(err); process.exit(1); });
