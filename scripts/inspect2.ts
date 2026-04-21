#!/usr/bin/env npx tsx
async function run() {
  const BACKEND_URL = "https://shop.leine-honig.de";
  const { token } = await fetch(BACKEND_URL + "/auth/user/emailpass", {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email: "radewaldt@pm.me", password: process.env.ADMIN_PASSWORD }),
  }).then(r => r.json());

  const { products } = await fetch(BACKEND_URL + "/admin/products?limit=100&fields=id,title,handle,options,variants.id,variants.title,variants.options", {
    headers: { Authorization: "Bearer " + token }
  }).then(r => r.json());

  for (const p of products) {
    console.log(`\n${p.title} (${p.handle})`);
    console.log("  options:", JSON.stringify(p.options));
    for (const v of p.variants ?? []) {
      console.log(`  variant [${v.title}] options:`, JSON.stringify(v.options));
    }
  }
}
run();
