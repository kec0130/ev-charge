import fs from 'fs';
import RSS from 'rss';

export default async function generateRssFeed() {
  const siteURL = 'https://ev-charge.kr';

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
    description: '2023년 전기차 보조금 정보 및 차종별, 지자체별 금액',
    url: `${siteURL}/blog/electric-car-subsidy`,
    date: new Date('2023-08-15'),
  });

  feed.item({
    title: '2023 자동차(전기차,수소차,하이브리드) 취득세 핵심 정보',
    description: '2023 친환경 자동차 취득세, 취등록세 핵심 정보',
    url: `${siteURL}/blog/green-car-acquisition-tax`,
    date: new Date('2023-08-28'),
  });

  feed.item({
    title: `람보르기니 최초 전기차 '란자도르 EV' 가격, 출시일`,
    description: `람보르기니 최초 전기차 '란자도르 EV' 가격, 출시일`,
    url: `${siteURL}/blog/lamborghini-lanzador`,
    date: new Date('2023-09-05'),
  });

  feed.item({
    title: '2023 벤츠 지바겐 전기차 EQG 가격, 출시일 정보',
    description: '2023 벤츠 지바겐 전기차 EQG 가격, 출시일 정보',
    url: `${siteURL}/blog/benz-g-wagen-eqg`,
    date: new Date('2023-09-09'),
  });

  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}
