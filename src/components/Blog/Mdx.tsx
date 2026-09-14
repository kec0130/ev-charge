import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import type { AnchorHTMLAttributes } from 'react';
import BlogInarticleAds from '../Common/AdSense/BlogInarticleAds';

const CustomLink = ({ href = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  if (href.startsWith('/')) return <Link href={href} {...props} />;
  if (href.startsWith('http'))
    return <a href={href} target='_blank' rel='noopener noreferrer' {...props} />;
  return <a href={href} {...props} />;
};
const BlogImage = ({
  src,
  alt,
  width = 'full',
  orientation = 'horizontal',
}: {
  src: string;
  alt: string;
  width?: 'full' | 'half' | 'auto';
  orientation?: 'horizontal' | 'vertical' | 'square';
}) => (
  <Image
    src={`/images/blog/${src}`}
    alt={alt}
    width={orientation === 'vertical' ? 525 : 1000}
    height={orientation === 'horizontal' ? 525 : 1000}
    style={{
      width: width === 'auto' ? undefined : width === 'half' ? '50%' : '100%',
      height: 'auto',
    }}
  />
);
const components: MDXComponents = { Image: BlogImage, a: CustomLink, AdSense: BlogInarticleAds };
export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <article className='mdx-prose'>
      <Component components={components} />
    </article>
  );
}
