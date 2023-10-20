import { useAtomValue } from 'jotai';
import { FormEventHandler, useState } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';

import { currentStationAtom } from '@/states/map';
import { Review } from '@/types/supabase';
import { postReview } from '@/services/reviews';
import StarRating from './StarRating';
import { EditIcon } from '../../../../public/icons';

interface Props {
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

const ReviewModal = ({ setReviews }: Props) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentStation = useAtomValue(currentStationAtom);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!content.trim()) return alert('리뷰 내용을 작성해주세요.');

    setIsSubmitting(true);

    const newReview = {
      stationId: currentStation,
      rating,
      content,
    };

    postReview(newReview)
      .then((res) => {
        if (res.error) return alert('리뷰를 등록할 수 없습니다.');
        setReviews((prev) => [...res.data, ...prev]);
      })
      .finally(() => {
        setIsSubmitting(false);
        handleClose();
      });
  };

  const handleClose = () => {
    setRating(5);
    setContent('');
    onClose();
  };

  return (
    <>
      <Button
        size='xs'
        fontSize='sm'
        rounded='md'
        colorScheme='green'
        color='green.400'
        variant='ghost'
        onClick={onOpen}
        leftIcon={<EditIcon style={{ fill: theme.colors.green[400], width: 14, height: 14 }} />}
      >
        리뷰 작성
      </Button>

      <Modal onClose={handleClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>리뷰 작성</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <StarRating rating={rating} setRating={setRating} />
              <InputGroup size='md' mt={6}>
                <Input
                  pl={3}
                  pr='4rem'
                  placeholder='리뷰를 작성해주세요.'
                  focusBorderColor={theme.colors.primary}
                  name='content'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={100}
                  autoFocus={false}
                  autoComplete='off'
                />
                <InputRightElement w='4rem'>
                  <Button type='submit' h='1.75rem' size='sm' isLoading={isSubmitting}>
                    등록
                  </Button>
                </InputRightElement>
              </InputGroup>
            </form>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
