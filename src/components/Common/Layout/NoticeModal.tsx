import { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useTheme,
} from '@chakra-ui/react';

export default function NoticeModal() {
  const [isOpen, setIsOpen] = useState(true);
  const theme = useTheme();

  return (
    <Modal onClose={() => setIsOpen(false)} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent w='90%' maxW={400}>
        <ModalHeader>웹사이트 도메인 변경 안내</ModalHeader>
        <ModalCloseButton />
        <ModalBody display='flex' flexDirection='column' gap={4}>
          <p>전기차G 주소가 변경되었습니다. 현재 주소가 새로운 주소와 일치하는지 확인해주세요.</p>
          <div>
            <p>
              <strong>새로운 주소</strong>
            </p>
            <a href='https://ev-charge.chaechae.life' style={{ color: theme.colors.primary }}>
              <strong>https://ev-charge.chaechae.life</strong>
            </a>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' mx='auto' onClick={() => setIsOpen(false)}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
