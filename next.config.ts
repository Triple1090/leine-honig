/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Verhindert Clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Verhindert MIME-Type-Sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer-Datenleck einschränken
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Kamera, Mikrofon, Geolocation sperren
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // HTTPS erzwingen (1 Jahr)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js braucht inline scripts für Hydration
              "script-src 'self' 'unsafe-inline'",
              // Tailwind/framer-motion braucht inline styles
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Google Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Bilder: data: für Emoji-Favicon, https für externe Bilder
              "img-src 'self' data: https:",
              // Formular-Aktion: nur submit-form.com erlaubt
              "form-action 'self' https://submit-form.com",
              // Frames komplett sperren
              "frame-ancestors 'none'",
              // Basis-URL einschränken
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
