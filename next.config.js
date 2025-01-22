/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
<<<<<<< HEAD
        hostname: '*.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        pathname: '/**',
=======
        hostname: '**',
>>>>>>> refs/remotes/origin/development
      }
    ],
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig