import Link from 'next/link';
import Image from 'next/image';
import {
  Button,
  ChakraProps,
  Heading,
  Highlight,
  Table,
  TableContainer,
  Text,
  useTheme,
} from '@chakra-ui/react';

import { convertToSlug } from '@/utils/blog';

export const BlogHeading = ({ title }: { title: string }) => {
  const theme = useTheme();
  return (
    <Heading id={convertToSlug(title)} as='h3' size='lg' pt={theme.sizes.navHeight} mb={5}>
      {title}
    </Heading>
  );
};

export const BlogText = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <Text my={5} style={style}>
      {children}
    </Text>
  );
};

type ImageOrientation = 'horizontal' | 'vertical' | 'square';

export const BlogImage = ({
  src,
  alt,
  widthPercent = 100,
  orientation = 'horizontal',
}: {
  src: string;
  alt: string;
  widthPercent?: number;
  orientation?: ImageOrientation;
}) => {
  const getSize = (orientation: ImageOrientation) => {
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

  return (
    <Image
      src={src}
      alt={alt}
      {...getSize(orientation)}
      style={{
        width: `${widthPercent}%`,
        height: 'auto',
      }}
    />
  );
};

export const BlogTable = ({
  children,
  alignCenter = false,
}: {
  children: React.ReactNode;
  alignCenter?: boolean;
}) => {
  return (
    <TableContainer>
      <Table
        variant='simple'
        size={['sm', 'md']}
        whiteSpace='normal'
        sx={{
          th: {
            textAlign: alignCenter ? 'center' : 'left',
            fontSize: ['sm', 'md'],
          },
          td: {
            textAlign: alignCenter ? 'center' : 'left',
          },
        }}
      >
        {children}
      </Table>
    </TableContainer>
  );
};

export const BlogLink = ({
  href,
  text,
  inline = false,
  sx,
}: {
  href: string;
  text: string;
  inline?: boolean;
  sx?: ChakraProps['sx'];
}) => {
  return (
    <Button
      as={Link}
      href={href}
      variant='link'
      colorScheme='green'
      color='green.400'
      my={inline ? undefined : 5}
      display={inline ? 'inline' : 'block'}
      sx={sx}
    >
      {text}
    </Button>
  );
};

export const BlogHighlight = ({ text }: { text: string }) => {
  return (
    <Highlight query={text} styles={{ bg: 'orange.100', fontWeight: 'bold' }}>
      {text}
    </Highlight>
  );
};
