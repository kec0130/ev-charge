import { useRouter } from 'next/router';

const useImgDirectory = () => {
  const router = useRouter();
  return `/images/blog/${router.query.slug}`;
};

export default useImgDirectory;
