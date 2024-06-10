/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ["hohojia.s3.ap-southeast-2.amazonaws.com"],
  },
  output: "standalone",
};

export default nextConfig;
