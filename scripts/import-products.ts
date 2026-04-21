#!/usr/bin/env npx tsx
/**
 * Legt alle Honigsorten als Medusa-Produkte an.
 * Verwendung:
 *   ADMIN_EMAIL=admin@... ADMIN_PASSWORD=... npx tsx scripts/import-products.ts
 *   BACKEND_URL=https://shop.leine-honig.de ADMIN_EMAIL=... ADMIN_PASSWORD=... npx tsx scripts/import-products.ts
 */

const BACKEND_URL = process.env.BACKEND_URL || "https://shop.leine-honig.de";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("ADMIN_EMAIL und ADMIN_PASSWORD müssen gesetzt sein.");
  process.exit(1);
}

// ─── Produktdaten aus CSV ────────────────────────────────────────────────────

const products = [
  {
    handle: "rapshonig",
    title: "Rapshonig",
    subtitle: "Fein cremig gerührt – aus der Leineniederung",
    description: "Milder, hellgelber Rapshonig aus den Rapsfeldern rund um Luttmersen und Neustadt am Rübenberge. Fein cremig gerührt, streichzart und von zurückhaltender Süße – der perfekte Frühstückshonig für die ganze Familie.",
    variants: [
      { title: "500g", sku: "leinehonig-raps-500g", weight: 500, price: 7 },
      { title: "250g", sku: "leinehonig-raps-250g", weight: 250, price: 4 },
    ],
  },
  {
    handle: "bluetenhonig",
    title: "Blütenhonig",
    subtitle: "Goldgelber Frühjahrshonig",
    description: "Aromatischer Blütenhonig aus der Frühtracht der Leineregion. Ein feines Bouquet aus Obstblüten, Löwenzahn, Ahorn und Wildkräutern – goldgelb, flüssig bis fein kristallin.",
    variants: [
      { title: "500g", sku: "leinehonig-blueten-500g", weight: 500, price: 7 },
      { title: "250g", sku: "leinehonig-blueten-250g", weight: 250, price: 4 },
    ],
  },
  {
    handle: "sommertracht",
    title: "Sommertrachthonig",
    subtitle: "Kräftig-aromatische Sommerernte",
    description: "Dunkler, kräftig-aromatischer Sommerhonig aus der vielfältigen Blütentracht der Region – von Linde über Brombeere bis zu Wildblumen und Kleinem Honigtau.",
    variants: [
      { title: "500g", sku: "leinehonig-sommertracht-500g", weight: 500, price: 7 },
      { title: "250g", sku: "leinehonig-sommertracht-250g", weight: 250, price: 4 },
    ],
  },
  {
    handle: "heidelbeerhonig",
    title: "Heidelbeerhonig",
    subtitle: "Seltener Sortenhonig aus der Lüneburger Heide",
    description: "Besonderer Sortenhonig aus den Heidelbeer-Wanderblüten in der Lüneburger Heide. Fruchtig-mild mit feiner, leicht herber Note – eine Spezialität in streng limitierter Menge.",
    variants: [
      { title: "500g", sku: "leinehonig-heidelbeere-500g", weight: 500, price: 8 },
      { title: "250g", sku: "leinehonig-heidelbeere-250g", weight: 250, price: 4 },
    ],
  },
  {
    handle: "waldhonig",
    title: "Waldhonig",
    subtitle: "Dunkler Honigtau aus norddeutschen Wäldern",
    description: "Dunkler, würziger Waldhonig aus dem Honigtau der Nadel- und Mischwälder. Kräftiges, malziges Aroma mit einer feinen Karamellnote – lange flüssig bleibend.",
    variants: [
      { title: "500g", sku: "leinehonig-wald-500g", weight: 500, price: 8 },
      { title: "250g", sku: "leinehonig-wald-250g", weight: 250, price: 4 },
    ],
  },
  {
    handle: "heidehonig",
    title: "Heidehonig",
    subtitle: "Die Königin unter den Honigen",
    description: "Echter Heidehonig von der Sommerblüte der Besenheide – im Stempelglas abgefüllt. Gelee-artige Konsistenz, intensiv-würziges Aroma und leicht bitterer Abgang. Eine norddeutsche Rarität aus Wanderimkerei.",
    variants: [
      { title: "500g", sku: "leinehonig-heide-500g", weight: 500, price: 11 },
      { title: "250g", sku: "leinehonig-heide-250g", weight: 250, price: 5.5 },
    ],
  },
];

// ─── Hilfsfunktionen ─────────────────────────────────────────────────────────

async function adminApi(token: string, method: string, path: string, body?: unknown) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json: any;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}: ${text.slice(0, 300)}`);
  return json;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\nLeine-Honig Produkt-Import`);
  console.log(`Backend: ${BACKEND_URL}\n`);

  // 1. Admin-Login
  console.log("1. Authentifizierung...");
  const authRes = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const { token } = await authRes.json();
  if (!token) { console.error("Login fehlgeschlagen"); process.exit(1); }
  console.log("   ✓ Eingeloggt\n");

  // 2. Shipping Profile
  console.log("2. Shipping Profile ermitteln...");
  const { shipping_profiles } = await adminApi(token, "GET", "/admin/shipping-profiles?limit=10");
  const shippingProfileId = shipping_profiles?.[0]?.id;
  if (!shippingProfileId) { console.error("Kein Shipping Profile gefunden"); process.exit(1); }
  console.log(`   ✓ ${shippingProfileId}\n`);

  // 3. Sales Channel
  console.log("3. Sales Channel ermitteln...");
  const { sales_channels } = await adminApi(token, "GET", "/admin/sales-channels?limit=10");
  const salesChannelId = sales_channels?.[0]?.id;
  if (!salesChannelId) { console.error("Kein Sales Channel gefunden"); process.exit(1); }
  console.log(`   ✓ ${salesChannelId}\n`);

  // 4. Produkte anlegen
  console.log("4. Produkte anlegen...\n");
  let created = 0;
  let skipped = 0;

  for (const product of products) {
    process.stdout.write(`   ${product.title}... `);

    // Prüfen ob bereits vorhanden
    try {
      const existing = await adminApi(token, "GET", `/admin/products?handle=${product.handle}&limit=1`);
      if (existing.products?.length > 0) {
        console.log("übersprungen (existiert bereits)");
        skipped++;
        continue;
      }
    } catch {}

    try {
      await adminApi(token, "POST", "/admin/products", {
        handle: product.handle,
        title: product.title,
        subtitle: product.subtitle,
        description: product.description,
        status: "published",
        discountable: true,
        material: "Honig",
        hs_code: "04090000",
        origin_country: "DE",
        shipping_profile_id: shippingProfileId,
        sales_channels: [{ id: salesChannelId }],
        options: [{ title: "Größe", values: ["500g", "250g"] }],
        variants: product.variants.map((v) => ({
          title: v.title,
          sku: v.sku,
          manage_inventory: true,
          allow_backorder: false,
          weight: v.weight,
          material: "Honig",
          hs_code: "04090000",
          origin_country: "DE",
          options: { Größe: v.title },
          prices: [{ currency_code: "eur", amount: v.price }],
        })),
      });
      console.log("✓");
      created++;
    } catch (err: any) {
      console.log(`✗ ${err.message}`);
    }
  }

  console.log(`\n${"─".repeat(50)}`);
  console.log(`✅  ${created} angelegt, ${skipped} übersprungen\n`);
}

run().catch((e) => { console.error("Fehler:", e); process.exit(1); });
