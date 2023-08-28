import Link from 'next/link';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { convertToSlug } from '@/utils/blog';

const TableOfContents = ({ titles }: { titles: (string | string[])[] }) => {
  return (
    <Box bgColor='blackAlpha.100' py={6} px={8}>
      <Text fontWeight='bold' mb={1}>
        목차
      </Text>
      <UnorderedList sx={{ '& a:hover': { textDecor: 'underline' } }}>
        {titles.map((title, index) => {
          if (typeof title === 'string') {
            return (
              <ListItem key={title}>
                <Link href={`#${convertToSlug(title)}`}>{title}</Link>
              </ListItem>
            );
          } else {
            return (
              <UnorderedList key={`${title}-${index}`}>
                {title.map((subTitle) => (
                  <ListItem key={subTitle}>
                    <Link href={`#${convertToSlug(subTitle)}`}>{subTitle}</Link>
                  </ListItem>
                ))}
              </UnorderedList>
            );
          }
        })}
      </UnorderedList>
    </Box>
  );
};

export default TableOfContents;
