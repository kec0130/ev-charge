import Link from 'next/link';
import { Box, Button, Divider, Heading, useTheme } from '@chakra-ui/react';
import Metadata from '@/components/Metadata';

interface Props {
  title: string;
  description: string;
  keywords: string;
  slug: string;
  content: React.ReactNode;
}

const PostDetail = ({ title, description, keywords, slug, content }: Props) => {
  const theme = useTheme();

  return (
    <>
      <Metadata title={title} description={description} keywords={keywords} url={`/blog/${slug}`} />
      <Heading as='h2' size='xl'>
        {title}
      </Heading>
      <Divider my={6} />
      <Box as='section' mb={6}>
        {content}
      </Box>
      <Button variant='link' color={theme.colors.primary} mb={4}>
        <Link href='/blog'>← 목록으로</Link>
      </Button>
    </>
  );
};

export default PostDetail;
