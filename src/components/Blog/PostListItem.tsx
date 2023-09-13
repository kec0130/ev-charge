import Link from 'next/link';
import Image from 'next/image';
import { Box, Divider, Flex, Heading, ListItem, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  description?: string;
  slug: string;
  imgSrc: string;
  index: number;
}
const PostListItem = ({ title, description, slug, imgSrc, index }: Props) => {
  return (
    <>
      {index !== 0 && <Divider my={6} />}
      <ListItem>
        <Link href={`/blog/${slug}`}>
          <Flex w='full' flexDir={['column', 'row']}>
            <Box
              mr={[0, 8]}
              mb={[4, 0]}
              w={['full', 300]}
              minW={['full', 300]}
              h={[180, 160]}
              borderRadius='md'
              overflow='hidden'
            >
              <Image
                src={imgSrc}
                alt={slug}
                width={300}
                height={160}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
            <Box>
              <Heading as='h3' size='lg' mb={[2, 4]} noOfLines={2}>
                {title}
              </Heading>
              {description && <Text noOfLines={[2, 3]}>{description}</Text>}
            </Box>
          </Flex>
        </Link>
      </ListItem>
    </>
  );
};

export default PostListItem;
