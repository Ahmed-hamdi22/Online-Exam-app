import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "e-commerce.thelanerealestate.com",
        pathname: "/images/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
