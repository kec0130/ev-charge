import Link from 'next/link';
import { Box, Button, Divider, Heading, Text } from '@chakra-ui/react';

import { Post } from '@/types/supabase';
import RelatedPosts from './RelatedPosts';
import Introduction from './Content/Introduction';
import Subsidy from './Content/Subsidy';
import AcquisitionTax from './Content/AcquisitionTax';
import Lanzador from './Content/Lanzador';
import BenzEQG from './Content/BenzEQG';

interface Props {
  title: string;
  slug: string;
  createdAt: string;
  relatedPosts: Post[];
}

const PostDetail = ({ title, slug, createdAt, relatedPosts }: Props) => {
  const getContent = (slug: string) =>
    ({
      'ev-charge-introduction': <Introduction slug={slug} />,
      'electric-car-subsidy': <Subsidy slug={slug} />,
      'green-car-acquisition-tax': <AcquisitionTax slug={slug} />,
      'lamborghini-lanzador': <Lanzador slug={slug} />,
      'benz-g-wagen-eqg': <BenzEQG slug={slug} />,
    }[slug] || <></>);

  return (
    <>
      <Heading as='h2' size='xl'>
        {title}
      </Heading>
      <Text fontSize='sm' color='gray.500' mt={3}>
        {createdAt}
      </Text>
      <Divider my={6} />
      <Box as='section' pb={6}>
        {getContent(slug)}
      </Box>

      <RelatedPosts posts={relatedPosts} />
      <Divider my={6} />
      <Button variant='link' colorScheme='green' color='green.400' mb={2} ml='auto' display='block'>
        <Link href='/blog'>← 목록으로</Link>
      </Button>
    </>
  );
};

export default PostDetail;
