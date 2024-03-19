/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// TODO: 추후 우리팀 api url
		remotePatterns: [
			{
				protocol: "http",
				hostname: "**",
			},
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};

export default nextConfig;
