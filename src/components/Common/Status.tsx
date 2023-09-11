import { Flex, Spinner, Text, useTheme } from '@chakra-ui/react';
import { CarLogoIcon, MarkerErrorIcon } from '../../../public/icons';

interface Props {
  type: 'loading' | 'error' | 'success';
  icon?: React.ReactNode;
  text: string;
  footer?: React.ReactNode;
  fullHeight?: boolean;
}

const Status = ({ type, icon, text, footer, fullHeight = false }: Props) => {
  const theme = useTheme();

  return (
    <Flex h={fullHeight ? '60vh' : '40vh'} justify='center' align='center' flexDir='column' gap={6}>
      {type === 'loading' && <Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
      {type === 'error' && <MarkerErrorIcon style={{ fill: theme.colors.gray[600] }} />}
      {type === 'success' && <CarLogoIcon />}
      {icon}
      <Text color='gray.600' whiteSpace='pre' textAlign='center'>
        {text}
      </Text>
      {footer}
    </Flex>
  );
};

export default Status;
