import fs from 'fs';
import RSS from 'rss';

export default async function generateRssFeed() {
  const siteURL =
    process.env.NODE_ENV === 'production' ? 'https://ev-charge.kr' : 'http://localhost:3000';

  const feedOptions = {
    title: '전기차G 블로그 | RSS 피드',
    description: '전기차와 관련된 유용한 정보를 알려드립니다.',
    site_url: siteURL,
    feed_url: `${siteURL}/rss.xml`,
    image_url: `${siteURL}/logo.png`,
  };

  const feed = new RSS(feedOptions);

  feed.item({
    title: `전기차충전소 찾기, 실시간 조회 서비스 '전기차G'`,
    description: `전기차충전소 찾기 서비스 '전기차G' 소개 및 이용방법`,
    url: `${siteURL}/blog/ev-charge-introduction`,
    date: new Date('2023-08-15'),
  });

  feed.item({
    title: '2023 전기차 보조금, 신청방법 핵심정보 요약',
    description: '2023년 전기차 보조금과 관련한 정보와 지자체별 금액 등에 대해서 살펴보겠습니다.',
    url: `${siteURL}/blog/electric-car-subsidy`,
    date: new Date('2023-08-15'),
  });

  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}
