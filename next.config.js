/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['lh3.googleusercontent.com', 'res.cloudinary.com']
	},
	headers: () => [
		{
			source: '/:path*',
			headers: [
				{
					key: 'Cache-Control',
					value: 'no-store'
				}
			]
		}
	]
};

module.exports = nextConfig;
