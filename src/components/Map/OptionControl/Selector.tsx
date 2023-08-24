import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '../../../../public/icons';

interface Props {
  buttonText: string;
  children: React.ReactNode;
}

const Selector = ({ buttonText, children }: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} size='sm' shadow='md' bgColor='white' rightIcon={<ChevronDownIcon />}>
        {buttonText}
      </MenuButton>
      <MenuList
        maxH='30vh'
        overflowY='scroll'
        fontSize='sm'
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {children}
      </MenuList>
    </Menu>
  );
};

export default Selector;
