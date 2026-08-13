import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },

  reactStrictMode: true,
  poweredByHeader: false,

  compress: true,

  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: false },
      { source: '/packages/:slug', destination: '/en/packages/:slug', permanent: false },
    ]
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
