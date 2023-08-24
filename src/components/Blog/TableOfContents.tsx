import Link from 'next/link';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { convertToSlug } from '@/utils/blog';

const TableOfContents = ({ titles }: { titles: string[] }) => {
  return (
    <Box bgColor='blackAlpha.100' py={6} px={8}>
      <Text fontWeight='bold' mb={1}>
        목차
      </Text>
      <UnorderedList sx={{ '& a:hover': { textDecor: 'underline' } }}>
        {titles.map((title) => (
          <ListItem key={title}>
            <Link href={`#${convertToSlug(title)}`}>{title}</Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default TableOfContents;
