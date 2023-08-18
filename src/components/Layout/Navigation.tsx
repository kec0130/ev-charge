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
  const theme = useTheme();
  const router = useRouter();
  const currentPath = `/${router.asPath.split('/')[1]}`;

  return (
    <Flex as='header' justifyContent='center'>
      <Flex
        position='fixed'
        top={0}
        zIndex={theme.zIndex.nav}
        alignItems='center'
        h={theme.sizes.navHeight}
        w='full'
        maxW='container.lg'
        px={4}
        bgColor='white'
      >
        <h1>
          <Link href='/'>
            <Image src='/logo.png' alt='전기차 충전소 찾기' width={90} height={38} />
          </Link>
        </h1>
        <Spacer />
        <Flex as='nav'>
          <List display='flex' justifyContent='center' alignItems='center' gap={[5, 7]}>
            {MENU_LIST.map((menu) => (
              <ListItem
                key={menu.name}
                color={currentPath === menu.href ? theme.colors.primary : 'chakra-body-text._dark'}
                fontSize='lg'
                fontWeight='semibold'
              >
                <Link href={menu.href}>{menu.name}</Link>
              </ListItem>
            ))}
          </List>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navigation;
