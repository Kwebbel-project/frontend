/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    API_GATEWAY: process.env.API_GATEWAY,
    DOMAIN: process.env.DOMAIN,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  
}

module.exports = nextConfig

