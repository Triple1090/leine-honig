#!/usr/bin/env npx tsx
/**
 * Prüft und repariert Produkte mit kaputten Option-Werten.
 * Löscht defekte Produkte und legt sie neu an.
 */

const BACKEND_URL = process.env.BACKEND_URL || "https://shop.leine-honig.de";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

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
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}: ${text.slice(0, 300)}`);
  return json;
}

async function run() {
  console.log(`\nLeine-Honig Produkt-Fix`);
  console.log(`Backend: ${BACKEND_URL}\n`);

  // Login
  const { token } = await api(null, "POST", "/auth/user/emailpass", {
    email: ADMIN_EMAIL, password: ADMIN_PASSWORD,
  });
  if (!token) { console.error("Login fehlgeschlagen"); process.exit(1); }

  // Shipping Profile + Sales Channel
  const { shipping_profiles } = await api(token, "GET", "/admin/shipping-profiles?limit=10");
  const spId = shipping_profiles[0].id;
  const { sales_channels } = await api(token, "GET", "/admin/sales-channels?limit=10");
  const scId = sales_channels[0].id;

  // Alle vorhandenen Produkte laden
  const { products: existing } = await api(token, "GET",
    "/admin/products?limit=100&fields=id,title,handle,options,variants.id,variants.title,variants.options"
  );

  // Handles die wir verwalten
  const ourHandles = new Set(products.map(p => p.handle));

  // Defekte prüfen: Variant-Option mit null-Wert
  for (const ep of existing) {
    if (!ourHandles.has(ep.handle) && ep.handle !== "glas-honig") continue;
    const broken = ep.variants?.some((v: any) =>
      v.options?.some((o: any) => o.value === null || o.value === undefined)
    );
    const hasNullOption = ep.options?.some((o: any) => o.values?.some((val: any) => val === null));

    if (broken || hasNullOption || ep.handle === "glas-honig") {
      process.stdout.write(`   Lösche defektes Produkt: ${ep.title} (${ep.handle})... `);
      try {
        await api(token, "DELETE", `/admin/products/${ep.id}`);
        console.log("✓");
      } catch (e: any) {
        console.log(`✗ ${e.message}`);
      }
    }
  }

  // Alle unsere Produkte neu prüfen/anlegen
  console.log("\nProdukte anlegen:\n");
  for (const product of products) {
    process.stdout.write(`   ${product.title}... `);

    // Nochmal prüfen ob noch vorhanden nach Löschung
    const { products: check } = await api(token, "GET", `/admin/products?handle=${product.handle}&limit=1`);
    if (check?.length > 0) {
      console.log("bereits vorhanden ✓");
      continue;
    }

    try {
      await api(token, "POST", "/admin/products", {
        handle: product.handle,
        title: product.title,
        subtitle: product.subtitle,
        description: product.description,
        status: "published",
        discountable: true,
        material: "Honig",
        hs_code: "04090000",
        origin_country: "DE",
        shipping_profile_id: spId,
        sales_channels: [{ id: scId }],
        options: [{ title: "Größe", values: ["500g", "250g"] }],
        variants: product.variants.map((v) => ({
          title: v.title,
          sku: v.sku,
          manage_inventory: true,
          allow_backorder: false,
          weight: v.weight,
          options: { Größe: v.title },
          prices: [{ currency_code: "eur", amount: v.price }],
        })),
      });
      console.log("angelegt ✓");
    } catch (err: any) {
      console.log(`✗ ${err.message}`);
    }
  }

  console.log("\n✅  Fertig\n");
}

run().catch((e) => { console.error(e); process.exit(1); });
