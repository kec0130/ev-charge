import { Box, Divider, Heading } from '@chakra-ui/react';
import Metadata from '@/components/Metadata';

interface Props {
  title: string;
  description: string;
  keywords: string;
  slug: string;
  content: React.ReactNode;
}

const PostDetail = ({ title, description, keywords, slug, content }: Props) => {
  return (
    <>
      <Metadata title={title} description={description} keywords={keywords} url={`/blog/${slug}`} />
      <Heading as='h2' size='xl'>
        {title}
      </Heading>
      <Divider my={6} />
      <Box mb={6}>{content}</Box>
    </>
  );
};

export default PostDetail;
