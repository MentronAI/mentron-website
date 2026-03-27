import createMDX from '@next/mdx';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mentron.in',
      },
    ],
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
