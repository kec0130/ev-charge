import { Box, Divider, Heading, Text } from '@chakra-ui/react';

import { Post } from '@/types/supabase';
import AdSense from '../Common/AdSense';
import RelatedPosts from './RelatedPosts';
import { BlogLink } from './Common';

import Introduction from './Content/Introduction';
import Subsidy from './Content/Subsidy';
import AcquisitionTax from './Content/AcquisitionTax';
import Lanzador from './Content/Lanzador';
import BenzEQG from './Content/BenzEQG';
import GenesisGV70 from './Content/GenesisGV70';
import GenesisGV80Coupe from './Content/GenesisGV80Coupe';
import BmwIx50 from './Content/BmwIx50';
import HomeCharger from './Content/HomeCharger';

const getContent = (slug: string) =>
  ({
    'ev-charge-introduction': <Introduction />,
    'electric-car-subsidy': <Subsidy />,
    'green-car-acquisition-tax': <AcquisitionTax />,
    'lamborghini-lanzador': <Lanzador />,
    'benz-g-wagen-eqg': <BenzEQG />,
    'genesis-gv70': <GenesisGV70 />,
    'genesis-gv80-coupe': <GenesisGV80Coupe />,
    'bmw-ix50': <BmwIx50 />,
    'home-ev-charger': <HomeCharger />,
  }[slug] || <></>);

interface Props {
  title: string;
  slug: string;
  createdAt: string;
  relatedPosts: Post[];
}

const PostDetail = ({ title, slug, createdAt, relatedPosts }: Props) => {
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
        {getContent(slug)}
      </Box>

      <RelatedPosts posts={relatedPosts} />
      <BlogLink
        href='/blog'
        text='← 목록으로'
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      />
    </>
  );
};

export default PostDetail;
