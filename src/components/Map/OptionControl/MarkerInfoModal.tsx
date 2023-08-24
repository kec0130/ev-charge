import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';

import { MarkerHelpIcon } from '../../../../public/icons';

export default function MarkerInfoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<MarkerHelpIcon />}
        aria-label='마커 설명 보기'
        size='sm'
        bgColor='white'
        rounded='full'
        onClick={onOpen}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW={300}>
          <ModalHeader>마커 설명</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontWeight='bold'>사용가능 여부</Text>
              <Flex alignItems='center' gap={3} my={2}>
                <Image
                  src='/images/markers/available.png'
                  alt='초록색 마커'
                  width={30}
                  height={40}
                />
                사용가능
              </Flex>
              <Flex alignItems='center' gap={3} my={2}>
                <Image
                  src='/images/markers/unavailable.png'
                  alt='회색 마커'
                  width={30}
                  height={40}
                />
                사용불가능 / 상태미확인
              </Flex>
            </Box>
            <Box mt={5}>
              <Text fontWeight='bold'>급속충전기 유무</Text>
              <Flex alignItems='center' gap={3} my={2}>
                <Image
                  src='/images/markers/fast-charge.png'
                  alt='분홍색 번개 아이콘'
                  width={30}
                  height={30}
                />
                급속충전기 있음
              </Flex>
              <Flex alignItems='center' gap={3} my={2}>
                <Image
                  src='/images/markers/slow-charge.png'
                  alt='노란색 번개 아이콘'
                  width={30}
                  height={30}
                />
                완속충전기만 있음
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
