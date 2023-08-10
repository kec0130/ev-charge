import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Flex, List, ListItem, Spacer, useTheme } from '@chakra-ui/react';

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
    <Flex px={[4, 8]} py={2}>
      <Link href='/'>
        <Image src='/images/letter-logo.png' alt='logo' width={84} height={35} />
      </Link>
      <Spacer />
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <List display='flex' justifyContent='center' alignItems='center' gap={5}>
          {MENU_LIST.map((menu) => (
            <ListItem
              key={menu.name}
              color={router.asPath === menu.href ? theme.colors.primary : 'chakra-body-text._dark'}
              fontSize='lg'
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
