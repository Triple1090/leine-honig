#!/usr/bin/env npx tsx
async function run() {
  const B = "https://shop.leine-honig.de";
  const { token } = await fetch(B + "/auth/user/emailpass", {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email: "radewaldt@pm.me", password: process.env.ADMIN_PASSWORD }),
  }).then(r => r.json());
  const h = { Authorization: "Bearer " + token };

  console.log("=== Fulfillment Providers ===");
  const fp = await fetch(B + "/admin/fulfillment-providers", { headers: h }).then(r => r.json());
  console.log(JSON.stringify(fp, null, 2));

  console.log("\n=== Stock Location Providers ===");
  const slp = await fetch(B + "/admin/stock-locations/sloc_01KPRVYQ6A1V0GBTCYJW40HKHD?fields=*fulfillment_providers", { headers: h }).then(r => r.json());
  console.log(JSON.stringify(slp.stock_location?.fulfillment_providers, null, 2));
}
run();
