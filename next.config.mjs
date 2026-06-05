import createMDX from '@next/mdx';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mentron.in',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/:path(.*\\.(?:js|css|woff2|svg|png|jpg|jpeg|gif|webp|avif|ico))$',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  turbopack: {
    root: __dirname,
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Note: In Next.js 16/Turbopack, passing strings instead of imported functions 
    // helps avoid serialization errors.
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [
      ['rehype-slug'],
      ['rehype-autolink-headings', { behavior: 'wrap' }],
      ['rehype-pretty-code', { theme: 'github-dark', keepBackground: true }]
    ],
    mdxRs: false, // Required for compatibility with most plugins
  },
});

export default withMDX(nextConfig);
