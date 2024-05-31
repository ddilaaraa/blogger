const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.pixabay.com','drive.google.com'], // İzin verilen domainleri buraya ekleyin
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
  },
  transpilePackages: [
    'rc-util',
    '@ant-design',
    'kitchen-flow-editor',
    '@ant-design/pro-editor',
    'zustand',
    'leva',
    'antd',
    'rc-pagination',
    'rc-picker'
  ],
};

export default nextConfig;
