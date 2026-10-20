import type { NextConfig } from "next";

// WP_URL=mock trabaja sin WordPress (contenido de wordpress/metalquimia-core/seed).
const wpUrl = new URL(process.env.WP_URL && process.env.WP_URL !== "mock" ? process.env.WP_URL : "http://metalquimia.local");

const nextConfig: NextConfig = {
  // Permite abrir el servidor de desarrollo desde la red local (móvil, otro ordenador).
  // Añade más hosts con DEV_ORIGINS=host1,host2.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local", ...(process.env.DEV_ORIGINS?.split(",").filter(Boolean) ?? [])],
  images: {
    // LocalWP resuelve metalquimia.local a 127.0.0.1: solo se permite si el WordPress es local.
    dangerouslyAllowLocalIP: /(\.local|localhost|127\.0\.0\.1)$/.test(wpUrl.hostname),
    remotePatterns: [
      {
        protocol: wpUrl.protocol.replace(":", "") as "http" | "https",
        hostname: wpUrl.hostname,
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
