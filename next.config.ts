import type { NextConfig } from 'next'

/**
 * The whole site is statically generated at build time — every route under
 * `app/[lang]` is prerendered via `generateStaticParams`. There is no server
 * runtime beyond the `/` redirect below, which the CDN edge handles.
 */
const nextConfig: NextConfig = {
  /**
   * Pin the workspace root. Without it Turbopack walks up looking for a
   * lockfile and can settle on an unrelated one outside the project.
   */
  turbopack: {
    root: import.meta.dirname,
  },

  reactStrictMode: true,
  poweredByHeader: false,

  // Trade a slightly longer build for smaller, faster HTML.
  compress: true,

  /**
   * `/` has no page of its own on purpose: keeping `app/[lang]/layout.tsx` as
   * the single root layout is what lets `<html lang>` differ per locale.
   * A config-level redirect is resolved at the edge, so it costs no JS.
   */
  async redirects() {
    return [{ source: '/', destination: '/en', permanent: false }]
  },

  async headers() {
    return [
      {
        source: '/cv/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default nextConfig
