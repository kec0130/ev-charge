import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flex, List, ListItem, Spacer, useTheme } from '@chakra-ui/react';
import { FullLogoIcon } from '../../../public/icons';

const MENU_LIST = [
  {
    name: '홈',
    href: '/',
  },
  {
    name: '블로그',
    href: '/blog',
  },
];

const Navigation = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Flex px={4} mx='auto' maxW='8xl' h={theme.sizes.navHeight} alignItems='center'>
      <Link href='/'>
        <FullLogoIcon />
      </Link>
      <Spacer />
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <List display='flex' justifyContent='center' alignItems='center' gap={[5, 7]}>
          {MENU_LIST.map((menu) => (
            <ListItem
              key={menu.name}
              color={router.asPath === menu.href ? theme.colors.primary : 'chakra-body-text._dark'}
              fontSize={{ base: 'md', sm: 'lg' }}
              fontWeight='semibold'
            >
              <Link href={menu.href}>{menu.name}</Link>
            </ListItem>
          ))}
        </List>
      </nav>
    </Flex>
  );
};

export default Navigation;
