/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Server Actions abort when the request Origin doesn't match the Host
      // (CSRF protection). Allow the apex + www variants of the production
      // domain so saves work regardless of which one the visitor is on.
      allowedOrigins: ["mk-interiors.design", "www.mk-interiors.design"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
}

export default nextConfig
