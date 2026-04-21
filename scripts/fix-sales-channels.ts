#!/usr/bin/env npx tsx
async function run() {
  const BACKEND_URL = "https://shop.leine-honig.de";
  const { token } = await fetch(BACKEND_URL + "/auth/user/emailpass", {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email: "radewaldt@pm.me", password: process.env.ADMIN_PASSWORD }),
  }).then(r => r.json());

  const h = { "Content-Type": "application/json", Authorization: "Bearer " + token };

  const { sales_channels } = await fetch(BACKEND_URL + "/admin/sales-channels?limit=10", { headers: h }).then(r => r.json());
  const scId = sales_channels[0].id;
  console.log("Sales Channel:", scId);

  const { products } = await fetch(BACKEND_URL + "/admin/products?limit=100", { headers: h }).then(r => r.json());
  console.log(`${products.length} Produkte gefunden\n`);

  for (const p of products) {
    process.stdout.write(`  ${p.title}... `);
    // Sales channel neu setzen
    const res = await fetch(`${BACKEND_URL}/admin/products/${p.id}`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({ sales_channels: [{ id: scId }] }),
    });
    if (res.ok) {
      console.log("✓");
    } else {
      const text = await res.text();
      console.log(`✗ ${res.status}: ${text.slice(0, 100)}`);
    }
  }

  console.log("\n✅  Fertig\n");
}
run();
