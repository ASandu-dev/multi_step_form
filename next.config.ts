const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/multi_step_form' : '',
  assetPrefix: isProd ? '/multi_step_form/' : '',
  output: 'export',
};

export default nextConfig;