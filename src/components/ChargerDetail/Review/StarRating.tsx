import { Box, Flex, Text, useTheme } from '@chakra-ui/react';
import { StarIcon } from '../../../../public/icons';

interface Props {
  rating: number;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
  readOnly?: boolean;
}

const StarRating = ({ rating, setRating, readOnly }: Props) => {
  const theme = useTheme();

  return (
    <Flex>
      <input type='hidden' name='rating' value={rating} />
      <Flex>
        {[1, 2, 3, 4, 5].map((i) => (
          <Box
            key={i}
            onClick={() => setRating && setRating(i)}
            cursor={readOnly ? 'default' : 'pointer'}
          >
            <StarIcon
              style={{
                fill: i <= rating ? theme.colors.accent : theme.colors.gray[200],
                width: readOnly && 16,
                height: readOnly && 16,
              }}
            />
          </Box>
        ))}
      </Flex>
      {!readOnly && (
        <Text ml={2} fontWeight='semibold'>
          {rating}
        </Text>
      )}
    </Flex>
  );
};

export default StarRating;
