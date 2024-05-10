/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
        config.resolve.fallback = { ...config.resolve.fallback, net: false, os: false, tls: false, fs: false };
        return config;
      },
};

export default nextConfig;
