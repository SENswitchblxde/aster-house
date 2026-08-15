/**
 * Static export for GitHub Pages.
 *
 * BASE_PATH is set by the GitHub Actions workflow.
 *   • Repo named `<username>.github.io`  → leave it empty
 *   • Custom domain (asterhouse.com)     → leave it empty
 *   • Project repo (username.github.io/aster-house) → set it to `/aster-house`
 */
const basePath = process.env.BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // writes a static site to ./out
  trailingSlash: true,       // /publish/index.html — required for GH Pages routing
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,       // no server, so no on-demand image optimisation
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
};

export default nextConfig;
