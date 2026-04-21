#!/usr/bin/env npx tsx
async function run() {
  const BACKEND_URL = "https://shop.leine-honig.de";
  const { token } = await fetch(BACKEND_URL + "/auth/user/emailpass", {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email: "radewaldt@pm.me", password: process.env.ADMIN_PASSWORD }),
  }).then(r => r.json());

  const h = { "Content-Type": "application/json", Authorization: "Bearer " + token };

  const { products } = await fetch(BACKEND_URL + "/admin/products?limit=100", { headers: h }).then(r => r.json());

  for (const p of products) {
    for (const v of p.variants ?? []) {
      process.stdout.write(`  ${p.title} – ${v.title}... `);
      const res = await fetch(`${BACKEND_URL}/admin/products/${p.id}/variants/${v.id}`, {
        method: "POST", headers: h,
        body: JSON.stringify({ manage_inventory: false }),
      });
      console.log(res.ok ? "✓" : `✗ ${res.status}`);
    }
  }
  console.log("\n✅  Fertig");
}
run();
