import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';

import { Review } from '@/types/database';
import { currentStationAtom } from '@/states/map';
import useReview from '@/hooks/useReview';
import ReviewItem from './ReviewItem';
import ReviewModal from './ReviewModal';

const Review = () => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const currentStation = useAtomValue(currentStationAtom);
  const { getReviews } = useReview();

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
          h={40}
          justifyContent='center'
          alignItems='center'
          color={'var(--chakra-colors-gray-500)'}
        >
          리뷰가 없습니다.
        </Flex>
      )}

      {reviews?.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </Box>
  );
};

export default Review;
