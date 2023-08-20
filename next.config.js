/** @type {import('next').NextConfig} */
const nextConfig = {}

// next.config.js
module.exports = {
    async headers() {
      return [
        {
          source: '/api/:path*', // Adjust the source pattern as needed
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, PATCH, DELETE' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          ],
        },
      ];
    },
  };
  
