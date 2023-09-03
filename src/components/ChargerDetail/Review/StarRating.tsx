import { Box, Flex, Text, useTheme } from '@chakra-ui/react';
import { StarIcon } from '../../../../public/icons';

interface Props {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  isInReview?: boolean;
}

const StarRating = ({ rating, setRating, isInReview }: Props) => {
  const theme = useTheme();

  return (
    <Flex>
      <input type='hidden' name='rating' value={rating} />
      <Flex>
        {[1, 2, 3, 4, 5].map((i) => (
          <Box key={i} onClick={() => setRating(i)}>
            <StarIcon
              style={{
                fill: i <= rating ? theme.colors.accent : theme.colors.gray['200'],
                width: isInReview && 16,
                height: isInReview && 16,
              }}
            />
          </Box>
        ))}
      </Flex>
      {!isInReview && (
        <Text ml={2} fontWeight='semibold'>
          {rating}
        </Text>
      )}
    </Flex>
  );
};

export default StarRating;
