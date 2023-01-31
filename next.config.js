/** @type {import('next').NextConfig} */

const nextConfig =  {
  reactStrictMode: false,
  swcMinify: false,

  async headers() {
    return [

      {
        source: '/contact',
        headers: [
                    {
                      key: 'x-title',
                      value: 'Contact'
                    }
                ],
      }

    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
    ],
  },
}
module.exports = nextConfig