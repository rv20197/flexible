/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	reactProductionProfiling: true,
	images: {
		domains: ['lh3.googleusercontent.com', 'res.cloudinary.com']
	},
	compress: true,
	experimental: {
    serverComponentsExternalPackages: ['autoprefixer','postcss'],
  },
};

module.exports = nextConfig;
