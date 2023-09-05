import PostDetail from '@/components/Blog/PostDetail';
import Lanzador from '@/components/Blog/Content/Lanzador';

const Post = () => {
  return (
    <PostDetail
      title={`람보르기니 최초 전기차 '란자도르 EV' 가격, 출시일`}
      description={`람보르기니 최초 전기차 '란자도르 EV' 가격, 출시일`}
      keywords='람보르기니 전기차, 란자도르, 란자도르 가격, 란자도르 출시일'
      slug='lamborghini-lanzador'
      content={<Lanzador slug='lamborghini-lanzador' />}
    />
  );
};

export default Post;
