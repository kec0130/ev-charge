import Image from 'next/image';
import { Box, Divider, Flex, Heading, ListItem, Text } from '@chakra-ui/react';
import { UsedCar } from '@/types/supabase';

interface Props {
  usedCar: UsedCar;
  index: number;
}

const UsedCarListItem = ({ usedCar, index }: Props) => {
  const { name, image, min_price: minPrice, max_price: maxPrice } = usedCar;

  return (
    <>
      {index !== 0 && <Divider my={6} />}
      <ListItem display='flex' w='full'>
        <Box flex={1} pos='relative' h={['80px', '120px']} borderRadius='md' overflow='hidden'>
          <Image
            src={image || '/og.png'}
            alt={name}
            fill
            objectFit='cover'
            objectPosition='center'
            sizes='(max-width: 479px) 105px, 240px'
          />
        </Box>
        <Flex flexDir='column' justifyContent='center' flex={3} ml={[4, 6]}>
          <Heading as='h3' size={['md', 'lg']} mb={[2, 4]}>
            {name}
          </Heading>
          <Text>
            {minPrice.toLocaleString()}만 원 ~ {maxPrice.toLocaleString()}만 원
          </Text>
        </Flex>
      </ListItem>
    </>
  );
};

export default UsedCarListItem;
