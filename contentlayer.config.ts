import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { existsSync } from 'node:fs';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    keywords: {
      type: 'string',
      required: true,
    },
    created_at: {
      type: 'date',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    image_url: {
      type: 'string',
      resolve: (doc) => {
        const directory = `/images/blog/${doc._raw.flattenedPath}`;
        return ['jpg', 'png', 'webp']
          .map((extension) => `${directory}/01.${extension}`)
          .find((path) => existsSync(`public${path}`)) || '/og.png';
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      [
        remarkToc,
        {
          heading: '목차',
          maxDepth: 4,
          skip: 'Intro',
        },
      ],
    ],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
});
