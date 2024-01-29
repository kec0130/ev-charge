import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

export default function LocationErrorModal({
  isOpen,
  onClose,
}: Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onClose'>) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent maxW={300}>
        <ModalHeader>위치 권한 확인</ModalHeader>
        <ModalCloseButton />
        <ModalBody>가까운 충전소를 찾기 위해 위치 서비스 권한을 허용해주세요.</ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
