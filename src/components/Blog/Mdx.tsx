import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';

import {
  Box,
  Button,
  Heading,
  ListItem,
  OrderedList,
  UnorderedList,
  useTheme,
} from '@chakra-ui/react';
import AdSense from '../Common/AdSense';

const CustomLink = (props: any) => {
  if (props.href.startsWith('/')) {
    return (
      <Button
        as={Link}
        href={props.href}
        variant='link'
        colorScheme='green'
        color='green.400'
        {...props}
      >
        {props.children}
      </Button>
    );
  }

  if (props.href.startsWith('http')) {
    return <a target='_blank' rel='noopener noreferrer' {...props} />;
  }

  return <a {...props} />;
};

const CustomH3 = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  const theme = useTheme();
  return (
    <Heading as='h3' size='lg' pt={theme.sizes.navHeight} mb={5} {...props}>
      {children}
    </Heading>
  );
};

const CustomH4 = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  const theme = useTheme();
  return (
    <Heading as='h4' size='md' pt={theme.sizes.navHeight} mb={5} {...props}>
      {children}
    </Heading>
  );
};

type ImageWidth = 'full' | 'half' | 'auto';
type ImageOrientation = 'horizontal' | 'vertical' | 'square';

const getImageSize = (orientation: ImageOrientation) => {
  switch (orientation) {
    case 'horizontal':
      return {
        width: 1000,
        height: 525,
      };
    case 'vertical':
      return {
        width: 525,
        height: 1000,
      };
    case 'square':
      return {
        width: 500,
        height: 500,
      };
  }
};

const BlogImage = ({
  src,
  alt,
  width = 'full',
  orientation = 'horizontal',
  ...props
}: {
  src: string;
  alt: string;
  width?: ImageWidth;
  orientation?: ImageOrientation;
  props?: any;
}) => {
  return (
    <Image
      src={`/images/blog/${src}`}
      alt={alt}
      {...getImageSize(orientation)}
      {...props}
      style={width === 'auto' ? undefined : { width: width === 'full' ? '100%' : '50%' }}
    />
  );
};

const components: MDXComponents = {
  Image: BlogImage,
  a: CustomLink,
  h3: CustomH3,
  h4: CustomH4,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  AdSense: AdSense,
};

const Mdx = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code);

  return (
    <Box as='article' py={6} className='mdx-prose'>
      <Component components={components} />
    </Box>
  );
};

export default Mdx;
