/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['lh3.googleusercontent.com', 'res.cloudinary.com']
	},
	compress: true,
	experimental: {
    turbo: {
      loaders: {
        '.md': [
          {
            // Option format
            loader: '@mdx-js/loader',
            options: {
              format: 'md',
            },
          },
        ],
        '.svg': ['@svgr/webpack'],
      },
    },
  },
};

module.exports = nextConfig;
