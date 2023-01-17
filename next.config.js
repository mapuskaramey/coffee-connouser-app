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
  }
}
module.exports = nextConfig