import { Review } from '@/types/database';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import StarRating from './StarRating';

const ReviewItem = ({ review }: { review: Review }) => {
  const date = new Date(review.created_at);
  const kstDate = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replaceAll(' ', '');

  return (
    <>
      <Box py={4}>
        <Flex alignItems='center'>
          <StarRating rating={review.rating} setRating={() => {}} isInReview />
          <Divider orientation='vertical' h={4} mx={1.5} borderColor='gray.300' />
          <Text fontSize='xs' color='gray.500'>
            {kstDate}
          </Text>
        </Flex>
        <Text fontSize='sm' mt={2}>
          {review.content}
        </Text>
      </Box>
      <Divider />
    </>
  );
};

export default ReviewItem;
