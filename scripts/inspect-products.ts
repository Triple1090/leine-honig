#!/usr/bin/env npx tsx
const BACKEND_URL = "https://shop.leine-honig.de";
const token_res = await fetch(BACKEND_URL + "/auth/user/emailpass", {
  method: "POST", headers: {"Content-Type":"application/json"},
  body: JSON.stringify({ email: "radewaldt@pm.me", password: process.env.ADMIN_PASSWORD }),
});
const { token } = await token_res.json();

const res = await fetch(BACKEND_URL + "/admin/products?limit=100", {
  headers: { Authorization: "Bearer " + token }
});
const { products } = await res.json();
console.log(JSON.stringify(products, null, 2));
