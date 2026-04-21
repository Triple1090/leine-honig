#!/usr/bin/env npx tsx
async function run() {
  const BACKEND_URL = "https://shop.leine-honig.de";
  const { token } = await fetch(BACKEND_URL + "/auth/user/emailpass", {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email: "radewaldt@pm.me", password: process.env.ADMIN_PASSWORD }),
  }).then(r => r.json());

  // Fetch one product fully
  const { products } = await fetch(BACKEND_URL + "/admin/products?limit=1&handle=rapshonig", {
    headers: { Authorization: "Bearer " + token }
  }).then(r => r.json());

  console.log(JSON.stringify(products[0], null, 2));
}
run();
