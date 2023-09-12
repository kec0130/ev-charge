import { Button, Menu, MenuButton, MenuItem, MenuList, useTheme } from '@chakra-ui/react';
import { ChevronDownIcon } from '../../../../public/icons';

interface Props {
  buttonText: string;
  menuList: string[];
  menuObject: { [key: string]: string };
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Selector = ({ buttonText, menuList, menuObject, onClick }: Props) => {
  const theme = useTheme();

  return (
    <Menu>
      <MenuButton
        as={Button}
        size='sm'
        bgColor='white'
        shadow={theme.shadows.onMap}
        rightIcon={<ChevronDownIcon />}
      >
        {buttonText}
      </MenuButton>

      <MenuList
        maxH='35dvh'
        overflowY='scroll'
        fontSize='sm'
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {menuList.map((key) => (
          <MenuItem
            key={key}
            value={key}
            onClick={onClick}
            _focus={{ bg: 'transparent' }}
            _hover={{ bg: theme.colors.gray[100] }}
          >
            {menuObject[key]}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Selector;
