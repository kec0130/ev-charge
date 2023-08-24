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
  useTheme,
} from '@chakra-ui/react';

import { MarkerHelpIcon } from '../../../../public/icons';
import Image from 'next/image';

export default function MarkerInfoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();

  return (
    <>
      <IconButton
        icon={<MarkerHelpIcon />}
        aria-label='마커 정보 보기'
        size='sm'
        shadow='md'
        bgColor='white'
        rounded='full'
        onClick={onOpen}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW={300}>
          <ModalHeader>마커 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontWeight='bold'>사용가능 여부</Text>
              <Flex alignItems='center' gap={3} my={2}>
                <Image src='/images/markers/available.png' alt='' width={30} height={40} />
                사용가능
              </Flex>
              <Flex alignItems='center' gap={3} my={2}>
                <Image src='/images/markers/unavailable.png' alt='' width={30} height={40} />
                사용불가능 / 상태미확인
              </Flex>
            </Box>
            <Box mt={5}>
              <Text fontWeight='bold'>급속충전기 유무</Text>
              <Flex alignItems='center' gap={3} my={2}>
                <Image src='/images/markers/fast-charge.png' alt='' width={30} height={30} />
                급속충전기 있음
              </Flex>
              <Flex alignItems='center' gap={3} my={2}>
                <Image src='/images/markers/slow-charge.png' alt='' width={30} height={30} />
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
