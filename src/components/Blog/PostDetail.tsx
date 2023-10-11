import Link from 'next/link';
import { Box, Button, Divider, Heading, Text } from '@chakra-ui/react';

import { Post } from '@/types/supabase';
import AdSense from '../Common/AdSense';
import RelatedPosts from './RelatedPosts';
import Introduction from './Content/Introduction';
import Subsidy from './Content/Subsidy';
import AcquisitionTax from './Content/AcquisitionTax';
import Lanzador from './Content/Lanzador';
import BenzEQG from './Content/BenzEQG';
import GenesisGV70 from './Content/GenesisGV70';
import GenesisGV80Coupe from './Content/GenesisGV80Coupe';
import BmwIx50 from './Content/BmwIx50';

interface Props {
  title: string;
  slug: string;
  createdAt: string;
  relatedPosts: Post[];
}

const PostDetail = ({ title, slug, createdAt, relatedPosts }: Props) => {
  const imgDir = `/images/blog/${slug}`;

  const content = {
    'ev-charge-introduction': <Introduction imgDir={imgDir} />,
    'electric-car-subsidy': <Subsidy imgDir={imgDir} />,
    'green-car-acquisition-tax': <AcquisitionTax imgDir={imgDir} />,
    'lamborghini-lanzador': <Lanzador imgDir={imgDir} />,
    'benz-g-wagen-eqg': <BenzEQG imgDir={imgDir} />,
    'genesis-gv70': <GenesisGV70 imgDir={imgDir} />,
    'genesis-gv80-coupe': <GenesisGV80Coupe imgDir={imgDir} />,
    'bmw-ix50': <BmwIx50 imgDir={imgDir} />,
  }[slug] || <></>;

  return (
    <>
      <Heading as='h2' size='xl'>
        {title}
      </Heading>
      <Text fontSize='sm' color='gray.500' mt={3}>
        {createdAt}
      </Text>
      <Divider my={6} />
      <AdSense />

      <Box as='section' py={6}>
        {content}
      </Box>

      <RelatedPosts posts={relatedPosts} />
      <Button
        variant='link'
        colorScheme='green'
        color='green.400'
        mt={6}
        mb={2}
        ml='auto'
        display='block'
      >
        <Link href='/blog'>← 목록으로</Link>
      </Button>
    </>
  );
};

export default PostDetail;
