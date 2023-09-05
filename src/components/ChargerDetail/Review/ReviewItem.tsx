import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { Review } from '@/types/database';
import StarRating from './StarRating';

const ReviewItem = ({ review }: { review: Review }) => {
  const { rating, content, created_at } = review;

  const convertToKST = (date: string) => {
    return new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(new Date(date))
      .replaceAll(' ', '');
  };

  return (
    <>
      <Box py={4}>
        <Flex alignItems='center'>
          <StarRating rating={rating} readOnly />
          <Divider orientation='vertical' h={4} mx={1.5} borderColor='gray.300' />
          <Text fontSize='xs' color='gray.500'>
            {convertToKST(created_at)}
          </Text>
        </Flex>
        <Text fontSize='sm' mt={2}>
          {content}
        </Text>
      </Box>
      <Divider />
    </>
  );
};

export default ReviewItem;
