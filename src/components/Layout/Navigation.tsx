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
  const theme = useTheme();
  const router = useRouter();
  const currentPath = `/${router.asPath.split('/')[1]}`;

  return (
    <Flex as='header' justifyContent='center'>
      <Flex
        position='fixed'
        top={0}
        zIndex={100}
        alignItems='center'
        h={theme.sizes.navHeight}
        w='full'
        maxW='container.xl'
        px={4}
        bgColor='white'
      >
        <Link href='/'>
          <FullLogoIcon />
        </Link>
        <Spacer />
        <Flex as='nav'>
          <List display='flex' justifyContent='center' alignItems='center' gap={[5, 7]}>
            {MENU_LIST.map((menu) => (
              <ListItem
                key={menu.name}
                color={currentPath === menu.href ? theme.colors.primary : 'chakra-body-text._dark'}
                fontSize={{ base: 'md', sm: 'lg' }}
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
