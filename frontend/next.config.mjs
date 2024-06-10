/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    output: 'standalone',
    images: {
        domains: ['hohojia.s3.ap-southeast-2.amazonaws.com', 'images.dog.ceo'],
    },
}

export default nextConfig
