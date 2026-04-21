#!/usr/bin/env npx tsx
/**
 * Automatischer Bestellflow-Test
 *
 * Führt einen kompletten Vorkasse-Checkout gegen die echte API durch.
 * Verwendung:
 *   npx tsx scripts/test-order.ts
 *   BACKEND_URL=https://shop.leine-honig.de npx tsx scripts/test-order.ts
 */

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  "http://localhost:9000";

const PUBLISHABLE_KEY =
  process.env.PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
  "";

const TEST_EMAIL = process.env.TEST_EMAIL || "test@example.com";

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function ok(label: string, value?: unknown) {
  console.log(`  ✓  ${label}${value !== undefined ? `: ${JSON.stringify(value)}` : ""}`);
  passed++;
}

function fail(label: string, error?: unknown) {
  console.error(`  ✗  ${label}`);
  if (error) console.error("     ", error);
  failed++;
}

async function api(
  method: string,
  path: string,
  body?: unknown
): Promise<any> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json: any;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
  return json;
}

// ─── Testschritte ────────────────────────────────────────────────────────────

async function run() {
  console.log(`\nLeine-Honig Bestellflow-Test`);
  console.log(`Backend: ${BACKEND_URL}`);
  console.log(`E-Mail:  ${TEST_EMAIL}\n`);

  // 1. Produkte laden und eine Variante finden
  console.log("1. Produkte abrufen");
  let variantId: string;
  try {
    const { products } = await api(
      "GET",
      "/store/products?limit=10&fields=id,title,variants.id,variants.title,variants.prices"
    );
    const product = products?.[0];
    const variant = product?.variants?.[0];
    if (!variant?.id) throw new Error("Keine Produktvariante gefunden");
    variantId = variant.id;
    ok("Variante gefunden", `${product.title} – ${variant.title} (${variantId})`);
  } catch (e) {
    fail("Produkte konnten nicht geladen werden", e);
    process.exit(1);
  }

  // 2. Region laden
  console.log("\n2. Region abrufen");
  let regionId: string;
  try {
    const { regions } = await api("GET", "/store/regions");
    regionId = regions?.[0]?.id;
    if (!regionId) throw new Error("Keine Region gefunden");
    ok("Region", regionId);
  } catch (e) {
    fail("Region konnte nicht geladen werden", e);
    process.exit(1);
  }

  // 3. Warenkorb erstellen
  console.log("\n3. Warenkorb erstellen");
  let cartId: string;
  try {
    const { cart } = await api("POST", "/store/carts", { region_id: regionId });
    cartId = cart.id;
    ok("Warenkorb erstellt", cartId);
  } catch (e) {
    fail("Warenkorb konnte nicht erstellt werden", e);
    process.exit(1);
  }

  // 4. Artikel hinzufügen
  console.log("\n4. Artikel hinzufügen");
  try {
    await api("POST", `/store/carts/${cartId}/line-items`, {
      variant_id: variantId,
      quantity: 1,
    });
    ok("Artikel hinzugefügt");
  } catch (e) {
    fail("Artikel konnte nicht hinzugefügt werden", e);
    process.exit(1);
  }

  // 5. Lieferadresse + E-Mail setzen
  console.log("\n5. Lieferadresse setzen");
  try {
    await api("POST", `/store/carts/${cartId}`, {
      email: TEST_EMAIL,
      shipping_address: {
        first_name: "Test",
        last_name: "Bestellung",
        address_1: "Teststraße 1",
        city: "Hannover",
        postal_code: "30159",
        country_code: "de",
        phone: "0511000000",
      },
      billing_address: {
        first_name: "Test",
        last_name: "Bestellung",
        address_1: "Teststraße 1",
        city: "Hannover",
        postal_code: "30159",
        country_code: "de",
      },
    });
    ok("Adresse gesetzt");
  } catch (e) {
    fail("Adresse konnte nicht gesetzt werden", e);
    process.exit(1);
  }

  // 6. Versandoption hinzufügen (optional)
  console.log("\n6. Versandoption");
  try {
    const { shipping_options } = await api(
      "GET",
      `/store/shipping-options?cart_id=${cartId}`
    );
    if (shipping_options?.length) {
      await api("POST", `/store/carts/${cartId}/shipping-methods`, {
        option_id: shipping_options[0].id,
      });
      ok("Versand gesetzt", shipping_options[0].name);
    } else {
      ok("Keine Versandoptionen (übersprungen)");
    }
  } catch {
    ok("Versandoptionen nicht verfügbar (übersprungen)");
  }

  // 7. Payment Collection erstellen
  console.log("\n7. Payment Collection erstellen");
  let paymentCollectionId: string;
  try {
    const { payment_collection } = await api("POST", "/store/payment-collections", {
      cart_id: cartId,
    });
    paymentCollectionId = payment_collection.id;
    ok("Payment Collection", paymentCollectionId);
  } catch (e) {
    fail("Payment Collection fehlgeschlagen", e);
    process.exit(1);
  }

  // 8. Vorkasse-Session initiieren
  console.log("\n8. Vorkasse-Zahlung initiieren");
  try {
    await api(
      "POST",
      `/store/payment-collections/${paymentCollectionId}/payment-sessions`,
      { provider_id: "pp_system_default" }
    );
    ok("Vorkasse-Session erstellt");
  } catch (e) {
    fail("Payment Session fehlgeschlagen", e);
    process.exit(1);
  }

  // 9. Bestellung abschließen
  console.log("\n9. Bestellung abschließen");
  let orderDisplayId: number;
  try {
    const result = await api("POST", `/store/carts/${cartId}/complete`);
    if (result.type !== "order") {
      throw new Error(`Unerwarteter Ergebnistyp: ${result.type}`);
    }
    orderDisplayId = result.order.display_id;
    const orderNumber = `LH-${String(orderDisplayId).padStart(4, "0")}`;
    ok("Bestellung abgeschlossen", orderNumber);
    ok("Order-ID", result.order.id);
    ok("Betrag", `${result.order.total} EUR`);
  } catch (e) {
    fail("Bestellung konnte nicht abgeschlossen werden", e);
    process.exit(1);
  }

  // ─── Ergebnis ───────────────────────────────────────────────────────────────
  console.log(`\n${"─".repeat(50)}`);
  if (failed === 0) {
    console.log(`✅  Alle ${passed} Schritte erfolgreich`);
    console.log(`   → Prüfe jetzt die Backend-Logs auf "[order-placed]" Einträge`);
    console.log(`   → Prüfe ${TEST_EMAIL} auf die Bestätigungs-E-Mail\n`);
  } else {
    console.log(`❌  ${failed} Fehler, ${passed} erfolgreich\n`);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Unerwarteter Fehler:", e);
  process.exit(1);
});
