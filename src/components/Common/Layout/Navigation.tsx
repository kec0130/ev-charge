import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Flex, List, ListItem, Spacer, useTheme } from '@chakra-ui/react';

import { MENU_LIST } from '@/constants/navigation';

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
        px={[4, 6]}
        bgColor='white'
      >
        <h1>
          <Link href='/'>
            <Image src='/logo.png' alt='전기차 충전소 찾기' width={90} height={38} />
          </Link>
        </h1>
        <Spacer />
        <Flex as='nav'>
          <List display='flex' justifyContent='center' alignItems='center' gap={[4, 6]}>
            {MENU_LIST.map((menu) => (
              <ListItem
                key={menu.name}
                color={currentPath === menu.href ? 'green.400' : 'inherit'}
                fontSize='lg'
                fontWeight='bold'
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
