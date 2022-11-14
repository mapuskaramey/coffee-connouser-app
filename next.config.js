/** @type {import('next').NextConfig} */

const nextConfig =  {
  reactStrictMode: false,
  swcMinify: true,

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
  }
}
module.exports = nextConfig