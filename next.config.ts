/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Das hier ist der magische Schalter!
  trailingSlash: false,
  images: {
    unoptimized: true, // Wichtig, da Lima-City Bilder nicht live berechnen kann
  },
};

export default nextConfig;
