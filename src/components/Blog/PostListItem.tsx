import Link from 'next/link';
import Image from 'next/image';
import { Box, Divider, Flex, Heading, ListItem, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  description: string;
  slug: string;
  imgSrc: string;
  imgAlt: string;
}
const PostListItem = ({ title, description, slug, imgSrc, imgAlt }: Props) => {
  return (
    <>
      <ListItem>
        <Link href={`/blog/${slug}`}>
          <Flex w='full' flexDir={['column', 'row']}>
            <Box
              mr={[0, 8]}
              mb={[4, 0]}
              w='full'
              maxW={['full', 300]}
              borderRadius='md'
              overflow='hidden'
            >
              <Image
                src={imgSrc}
                alt={imgAlt}
                width={300}
                height={158}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
            <Box>
              <Heading as='h3' size='lg' mb={[2, 4]} noOfLines={[2, 1]}>
                {title}
              </Heading>
              <Text noOfLines={[3, 4]}>{description}</Text>
            </Box>
          </Flex>
        </Link>
      </ListItem>
      <Divider my={6} />
    </>
  );
};

export default PostListItem;
