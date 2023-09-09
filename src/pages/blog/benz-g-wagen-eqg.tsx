import PostDetail from '@/components/Blog/PostDetail';
import BenzEQG from '@/components/Blog/Content/BenzEQG';

const Post = () => {
  return (
    <PostDetail
      title='2023 벤츠 지바겐 전기차 EQG 가격, 출시일 정보'
      description='2023 벤츠 지바겐 전기차 EQG 가격, 출시일 정보'
      keywords='벤츠 지바겐 전기차, 벤츠 지바겐 EQG, 지바겐 전기차 가격, 지바겐 전기차 출시일, 지바겐 전기차 정보'
      slug='benz-g-wagen-eqg'
      content={<BenzEQG slug='benz-g-wagen-eqg' />}
    />
  );
};

export default Post;
