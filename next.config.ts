import type { NextConfig } from "next";

// Static export so the site can be hosted for free (GitHub Pages, Netlify, Cloudflare Pages…).
// NEXT_PUBLIC_BASE_PATH is set by the GitHub Pages workflow when the site lives at
// username.github.io/<repo>. Leave it empty for a custom domain or a root-level host.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
