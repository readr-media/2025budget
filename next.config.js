// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundlerAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? `${process.env.DOMAIN}/${process.env.GCS_BUCKET_PATH}`
      : '',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
}

module.exports = withBundlerAnalyzer(nextConfig)
