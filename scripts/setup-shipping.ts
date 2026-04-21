#!/usr/bin/env npx tsx
/**
 * Richtet DHL-Versandoptionen in Medusa ein (gewichtsbasiert).
 */

const BACKEND_URL = process.env.BACKEND_URL || "https://shop.leine-honig.de";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "radewaldt@pm.me";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

const DHL_OPTIONS = [
  { name: "DHL Päckchen (bis 2 kg)", amount: 4.29, maxWeight: 2000 },
  { name: "DHL Paket (bis 5 kg)",    amount: 6.49, maxWeight: 5000 },
  { name: "DHL Paket (bis 10 kg)",   amount: 8.49, maxWeight: 10000 },
  { name: "DHL Paket (bis 20 kg)",   amount: 13.99, maxWeight: 20000 },
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
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}: ${text.slice(0, 400)}`);
  return json;
}

async function run() {
  console.log(`\nLeine-Honig DHL-Versand einrichten`);
  console.log(`Backend: ${BACKEND_URL}\n`);

  // 1. Login
  const { token } = await api(null, "POST", "/auth/user/emailpass", {
    email: ADMIN_EMAIL, password: ADMIN_PASSWORD,
  });
  if (!token) { console.error("Login fehlgeschlagen"); process.exit(1); }
  console.log("✓ Eingeloggt\n");

  // 2. Shipping Profile
  const { shipping_profiles } = await api(token, "GET", "/admin/shipping-profiles?limit=10");
  const spId = shipping_profiles[0].id;
  console.log(`✓ Shipping Profile: ${spId}`);

  // 3. Stock Location prüfen / anlegen
  const { stock_locations } = await api(token, "GET", "/admin/stock-locations?limit=10");
  let locationId: string;
  if (stock_locations?.length > 0) {
    locationId = stock_locations[0].id;
    console.log(`✓ Stock Location: ${locationId} (${stock_locations[0].name})`);
  } else {
    const { stock_location } = await api(token, "POST", "/admin/stock-locations", {
      name: "Lager Neustadt am Rübenberge",
      address: { address_1: "Lager", city: "Neustadt am Rübenberge", country_code: "de" },
    });
    locationId = stock_location.id;
    console.log(`✓ Stock Location angelegt: ${locationId}`);
  }

  // 4. Fulfillment Set + Service Zone anlegen
  let fulfillmentSetId: string;
  let serviceZoneId: string;

  // Fulfillment Set über Stock Location laden (kein List-Endpoint in Medusa v2)
  const { stock_location: locDetail } = await api(token, "GET",
    `/admin/stock-locations/${locationId}?fields=id,*fulfillment_sets,*fulfillment_sets.service_zones`
  );

  const existingFs = locDetail.fulfillment_sets?.[0];
  if (existingFs?.id) {
    fulfillmentSetId = existingFs.id;
    console.log(`✓ Fulfillment Set: ${fulfillmentSetId}`);
    const existingSz = existingFs.service_zones?.[0];
    if (existingSz?.id) {
      serviceZoneId = existingSz.id;
      console.log(`✓ Service Zone: ${serviceZoneId} (bereits vorhanden)`);
    } else {
      const szRes = await api(token, "POST",
        `/admin/fulfillment-sets/${fulfillmentSetId}/service-zones`, {
          name: "Deutschland", geo_zones: [{ type: "country", country_code: "de" }],
        }
      );
      serviceZoneId = szRes.fulfillment_set?.service_zones?.slice(-1)[0]?.id;
      console.log(`✓ Service Zone angelegt: ${serviceZoneId}`);
    }
  } else {
    const fsRes = await api(token, "POST",
      `/admin/stock-locations/${locationId}/fulfillment-sets`, {
        name: "Leine-Honig Versand", type: "shipping",
      }
    );
    fulfillmentSetId = fsRes.fulfillment_set?.id ?? fsRes.stock_location?.fulfillment_sets?.[0]?.id;
    console.log(`✓ Fulfillment Set angelegt: ${fulfillmentSetId}`);
    const szRes = await api(token, "POST",
      `/admin/fulfillment-sets/${fulfillmentSetId}/service-zones`, {
        name: "Deutschland", geo_zones: [{ type: "country", country_code: "de" }],
      }
    );
    serviceZoneId = szRes.fulfillment_set?.service_zones?.[0]?.id;
    console.log(`✓ Service Zone angelegt: ${serviceZoneId}`);
  }
  if (!serviceZoneId) throw new Error("Service Zone konnte nicht ermittelt werden");

  // 4b. Manual provider für Location aktivieren
  await api(token, "POST", `/admin/stock-locations/${locationId}/fulfillment-providers`, {
    add: ["manual_manual"],
  });
  console.log("✓ Provider 'manual_manual' aktiviert");

  // 5. Bestehende Shipping Options löschen (Neuanlage)
  const { shipping_options: existing } = await api(token, "GET",
    `/admin/shipping-options?service_zone_id=${serviceZoneId}&limit=50`
  );
  if (existing?.length > 0) {
    console.log(`\n  Lösche ${existing.length} bestehende Versandoptionen...`);
    for (const so of existing) {
      await api(token, "DELETE", `/admin/shipping-options/${so.id}`);
    }
  }

  // 6. DHL Optionen anlegen
  console.log("\nVersandoptionen anlegen:");
  for (const opt of DHL_OPTIONS) {
    process.stdout.write(`  ${opt.name} (${opt.amount} €)... `);
    try {
      await api(token, "POST", "/admin/shipping-options", {
        name: opt.name,
        service_zone_id: serviceZoneId,
        shipping_profile_id: spId,
        provider_id: "manual_manual",
        type: { label: "Standard", description: "DHL Versand", code: "standard" },
        price_type: "flat",
        prices: [{ currency_code: "eur", amount: opt.amount }],
        rules: [
          { attribute: "cart.weight", operator: "lte", value: String(opt.maxWeight) },
          ...(DHL_OPTIONS.indexOf(opt) > 0 ? [{
            attribute: "cart.weight",
            operator: "gt",
            value: String(DHL_OPTIONS[DHL_OPTIONS.indexOf(opt) - 1].maxWeight),
          }] : []),
        ],
      });
      console.log("✓");
    } catch (err: any) {
      console.log(`✗ ${err.message}`);
    }
  }

  // 7. Produktgewichte korrigieren (Honig + DIB-Glas TO82 + Verpackung)
  // 250g: 250g Honig + 140g Glas + 50g Verpackung = 440g
  // 500g: 500g Honig + 200g Glas + 50g Verpackung = 750g
  console.log("\nProduktgewichte aktualisieren (inkl. Glas + Verpackung):");
  const { products } = await api(token, "GET", "/admin/products?limit=100");
  for (const p of products) {
    for (const v of p.variants ?? []) {
      const isHalf = v.title === "250g";
      const newWeight = isHalf ? 440 : 750;
      process.stdout.write(`  ${p.title} ${v.title} → ${newWeight}g... `);
      const res = await fetch(`${BACKEND_URL}/admin/products/${p.id}/variants/${v.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ weight: newWeight }),
      });
      console.log(res.ok ? "✓" : `✗ ${res.status}`);
    }
  }

  console.log("\n✅  Versand eingerichtet!\n");
  console.log("Hinweis: Im Admin unter Settings → Locations & Shipping prüfen.");
}

run().catch((e) => { console.error(e); process.exit(1); });
