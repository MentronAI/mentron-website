import createMDX from '@next/mdx';

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
