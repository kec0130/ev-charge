import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';

import { Review } from '@/types/supabase';
import { currentStationAtom } from '@/states/map';
import { getReviews } from '@/services/reviews';
import ReviewItem from './ReviewItem';
import ReviewModal from './ReviewModal';

const Review = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const currentStation = useAtomValue(currentStationAtom);

  useEffect(() => {
    getReviews(currentStation).then((res) => setReviews(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStation]);

  return (
    <Box p={4}>
      <Flex>
        <Heading as='h3' size='sm'>
          충전소 리뷰
        </Heading>
        <Spacer />
        <ReviewModal setReviews={setReviews} />
      </Flex>

      {reviews?.length === 0 && (
        <Flex
          h={20}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          fontSize='sm'
          color='gray.500'
        >
          리뷰가 없습니다.
          <br />첫 리뷰를 작성해보세요.
        </Flex>
      )}

      {reviews?.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </Box>
  );
};

export default Review;
