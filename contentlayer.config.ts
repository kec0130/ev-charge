import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
      resolve: (doc) => `/images/blog/${doc._raw.flattenedPath}/01.jpg`,
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
