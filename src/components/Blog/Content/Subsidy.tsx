import { Tr, Td, Th, Tbody, Thead } from '@chakra-ui/react';
import { BlogHeading, BlogImage, BlogTable, BlogText } from '../Common';
import TableOfContents from '../TableOfContents';
import useImgDirectory from '@/hooks/useImgDirectory';

const Subsidy = () => {
  const imgDir = useImgDirectory();
  const alt = '전기차 보조금';
  const titles = [
    '지자체별 전기차 보조금',
    '차량별 국고 보조금 지원 금액',
    '전기차 보조금 신청 절차 및 기간',
  ];

  return (
    <>
      <TableOfContents titles={titles} />

      <BlogText>
        최근 전기차 수요가 급증하고 있습니다. 각 브랜드에서도 뛰어난 기술력으로 전기차를 출시하고
        있는데요. 또 하나의 특장점은 바로 보조금입니다. 그러나 전기차 보조금은 1년 단위로 수량이
        정해져 있기 때문에 선착순으로 혜택을 받으실 수 있는데요, 2023년 전기차 보조금과 관련한
        정보와 지자체별 금액 등에 대해서 살펴보겠습니다.
      </BlogText>
      <BlogImage src={`${imgDir}/01.jpg`} alt={alt} />

      <BlogHeading title={titles[0]} />
      <BlogText>
        우선 지자체별 보조금에 대해서 살펴보겠습니다. 지자체마다 보조금이 상이하기 때문에 2023년
        기준 전기차 보조금 상위지차체는 국비와 지자체별 합친 금액으로 거창군이 1,830만 원으로 가장
        높았으며 경북 울릉군이 1,780만 원 이었습니다.
      </BlogText>

      <BlogTable alignCenter>
        <Thead>
          <Tr>
            <Th>지역</Th>
            <Th>보조금 (국비 + 지방자치별 보조금)</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>서울특별시</Td>
            <Td>860만 원</Td>
          </Tr>
          <Tr>
            <Td>부산광역시</Td>
            <Td>980만 원</Td>
          </Tr>
          <Tr>
            <Td>울산광역시</Td>
            <Td>1,020만 원</Td>
          </Tr>
          <Tr>
            <Td>대구광역시</Td>
            <Td>1,030만 원</Td>
          </Tr>
          <Tr>
            <Td>인천광역시</Td>
            <Td>1,030만 원</Td>
          </Tr>
          <Tr>
            <Td>광주광역시</Td>
            <Td>1,070만 원</Td>
          </Tr>
          <Tr>
            <Td>세종특별시</Td>
            <Td>1,080만 원</Td>
          </Tr>
          <Tr>
            <Td>경남 거창</Td>
            <Td>1,830만 원</Td>
          </Tr>
          <Tr>
            <Td>울릉군</Td>
            <Td>1,780만 원</Td>
          </Tr>
          <Tr>
            <Td>전남 (곡성,광양,보성,진도,장성,함평,해남)</Td>
            <Td>1,530만 원</Td>
          </Tr>
          <Tr>
            <Td>전남 고흥</Td>
            <Td>1,510만 원</Td>
          </Tr>
          <Tr>
            <Td>경남 합천</Td>
            <Td>1,480만 원</Td>
          </Tr>
        </Tbody>
      </BlogTable>

      <BlogHeading title={titles[1]} />
      <BlogText>
        다음은 차량별 국고 지원 금액에 대한 내용입니다. 아래 표는 각 지자체별 지원금액이 들어간
        금액이 아니며, 거주지역의 지자체별 전기차 지원금액을 확인해보신 후에 최종적으로 구입하려는
        차의 가격을 확인하실 수 있습니다. 승용차뿐 아니라, 전기이륜차와 화물차등 차량별 보조금도
        확인하실 수 있으니, 구매를 고려하고 있는 모델이 있으시다면 국고 보조금이 얼마인지 확인해
        보시기 바랍니다.
      </BlogText>

      <BlogTable alignCenter>
        <Thead>
          <Tr>
            <Th>차종</Th>
            <Th>제조/수입사</Th>
            <Th>모델명</Th>
            <Th>국고보조금 지원금액 (만 원)</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td rowSpan={67}>승용</Td>
            <Td rowSpan={22}>현대자동차</Td>
            <Td>G80 Electrified</Td>
            <Td>337</Td>
          </Tr>
          <Tr>
            <Td>GV60 스탠다드 2WD 19인치</Td>
            <Td>340</Td>
          </Tr>
          <Tr>
            <Td>GV60 스탠다드 AWD 19인치</Td>
            <Td>337</Td>
          </Tr>
          <Tr>
            <Td>GV60 스탠다드 AWD 20인치</Td>
            <Td>326</Td>
          </Tr>
          <Tr>
            <Td>GV60 퍼포먼스 AWD 21인치</Td>
            <Td>311</Td>
          </Tr>
          <Tr>
            <Td>Electrified GV70 AWD 20인치</Td>
            <Td>322</Td>
          </Tr>
          <Tr>
            <Td>Electrified GV70 AWD 19인치</Td>
            <Td>337</Td>
          </Tr>
          <Tr>
            <Td>아이오닉5 2WD 스탠다드 19인치</Td>
            <Td>678</Td>
          </Tr>
          <Tr>
            <Td>아이오닉5 AWD 스탠다드 19인치</Td>
            <Td>653</Td>
          </Tr>
          <Tr>
            <Td>아이오닉5 2WD 롱레인지 19인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>아이오닉5 2WD 롱레인지 19인치 빌트인 캠 미적용</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>아이오닉5 2WD 롱레인지 20인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>아이오닉5 AWD 롱레인지 19인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>아이오닉5 AWD 롱레인지 20인치</Td>
            <Td>655</Td>
          </Tr>
          <Tr>
            <Td>아이오닉6 스탠다드 2WD 18인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>아이오닉6 롱레인지 2WD 18인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>아이오닉6 롱레인지 2WD 20인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>아이오닉6 롱레인지 AWD 18인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>아이오닉6 롱레인지 AWD 20인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>코나 일렉트릭 2WD 스탠다드 17인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>코나 일렉트릭 2WD 롱레인지 17인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>코나 일렉트릭 2WD 롱레인지 19인치</Td>
            <Td>667</Td>
          </Tr>
          <Tr>
            <Td rowSpan={14}>기아</Td>
            <Td>EV6 스탠다드 2WD 19인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>EV6 롱레인지 2WD 20인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>EV6 롱레인지 4WD 20인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>EV6 롱레인지 2WD 19인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>EV6 롱레인지 4WD 19인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>EV6 스탠다드 4WD 19인치</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>니로 플러스</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>The all-new Kia Niro EV</Td>
            <Td>680</Td>
          </Tr>
          <Tr>
            <Td>EV6 GT</Td>
            <Td>304</Td>
          </Tr>
          <Tr>
            <Td>EV9 2WD 19인치</Td>
            <Td>330</Td>
          </Tr>
          <Tr>
            <Td>EV9 2WD 20인치</Td>
            <Td>328</Td>
          </Tr>
          <Tr>
            <Td>EV9 4WD 19인치</Td>
            <Td>314</Td>
          </Tr>
          <Tr>
            <Td>EV9 4WD 21인치</Td>
            <Td>319</Td>
          </Tr>
          <Tr>
            <Td>EV9 GTL 4WD 21인치</Td>
            <Td>311</Td>
          </Tr>
          <Tr>
            <Td rowSpan={5}>BMW</Td>
            <Td>iX3 M Sport</Td>
            <Td>293</Td>
          </Tr>
          <Tr>
            <Td>MINI Cooper SE</Td>
            <Td>557</Td>
          </Tr>
          <Tr>
            <Td>i4 eDrive 40</Td>
            <Td>326</Td>
          </Tr>
          <Tr>
            <Td>i4 M50</Td>
            <Td>301</Td>
          </Tr>
          <Tr>
            <Td>iX1 xDrive30</Td>
            <Td>295</Td>
          </Tr>
          <Tr>
            <Td rowSpan={2}>한국지엠</Td>
            <Td>볼트 EV</Td>
            <Td>640</Td>
          </Tr>
          <Tr>
            <Td>볼트 EUV</Td>
            <Td>640</Td>
          </Tr>
          <Tr>
            <Td rowSpan={4}>스텔란티스코리아</Td>
            <Td>Peugeot e-2008 SUV GT</Td>
            <Td>438</Td>
          </Tr>
          <Tr>
            <Td>DS3 CROSSBACK E-TENSE</Td>
            <Td>459</Td>
          </Tr>
          <Tr>
            <Td>Peugeot e-2008 SUV</Td>
            <Td>459</Td>
          </Tr>
          <Tr>
            <Td>Peugeot e-208</Td>
            <Td>484</Td>
          </Tr>
          <Tr>
            <Td rowSpan={6}>테슬라코리아</Td>
            <Td>Model 3 Performance</Td>
            <Td>260</Td>
          </Tr>
          <Tr>
            <Td>Model Y Long Range</Td>
            <Td>260</Td>
          </Tr>
          <Tr>
            <Td>Model Y Performance</Td>
            <Td>260</Td>
          </Tr>
          <Tr>
            <Td>Model 3 Long Range</Td>
            <Td>260</Td>
          </Tr>
          <Tr>
            <Td>Model Y RWD</Td>
            <Td>260</Td>
          </Tr>
          <Tr>
            <Td>Model 3 RWD</Td>
            <Td>260</Td>
          </Tr>
          <Tr>
            <Td rowSpan={4}>벤츠코리아</Td>
            <Td>EQA250(MY22-1)</Td>
            <Td>268</Td>
          </Tr>
          <Tr>
            <Td>EQA250(MY22-2)</Td>
            <Td>273</Td>
          </Tr>
          <Tr>
            <Td>EQB300 4MATIC(5인승)</Td>
            <Td>275</Td>
          </Tr>
          <Tr>
            <Td>EQB300 4MATIC(7인승)</Td>
            <Td>275</Td>
          </Tr>
          <Tr>
            <Td>스마트솔루션즈</Td>
            <Td>EV Z</Td>
            <Td>472</Td>
          </Tr>
          <Tr>
            <Td>케이지모빌리티</Td>
            <Td>코란도 e-motion 2WD Heat Pump</Td>
            <Td>608</Td>
          </Tr>
          <Tr>
            <Td rowSpan={2}>폴스타</Td>
            <Td>Polestar 2 Long Range Single Motor</Td>
            <Td>488</Td>
          </Tr>
          <Tr>
            <Td>Polestar 2 Long Range Dual Motor</Td>
            <Td>201</Td>
          </Tr>
          <Tr>
            <Td rowSpan={2}>볼보자동차</Td>
            <Td>XC40 Recharge twin</Td>
            <Td>203</Td>
          </Tr>
          <Tr>
            <Td>C40 Recharge twin</Td>
            <Td>212</Td>
          </Tr>
          <Tr>
            <Td>한국토요타자동차</Td>
            <Td>렉서스 RZ450e</Td>
            <Td>320</Td>
          </Tr>
          <Tr>
            <Td rowSpan={3}>폭스바겐그룹</Td>
            <Td>아우디 Q4 Sportback e-tron 40</Td>
            <Td>253</Td>
          </Tr>
          <Tr>
            <Td>아우디 Q4 Sportback e-tron 40 Premium</Td>
            <Td>253</Td>
          </Tr>
          <Tr>
            <Td>폭스바겐 ID.4 Pro(2022)</Td>
            <Td>560</Td>
          </Tr>
          <Tr>
            <Td rowSpan={4}>초소형</Td>
            <Td>대창모터스</Td>
            <Td>DANIGO</Td>
            <Td>350</Td>
          </Tr>
          <Tr>
            <Td>마이브</Td>
            <Td>마이브 M1</Td>
            <Td>350</Td>
          </Tr>
          <Tr>
            <Td rowSpan={2}>쎄보모빌리티</Td>
            <Td>CEVO-C SE</Td>
            <Td>350</Td>
          </Tr>
          <Tr>
            <Td>CEVO-C SE VAN</Td>
            <Td>350</Td>
          </Tr>
        </Tbody>
      </BlogTable>

      <br />
      <BlogImage src={`${imgDir}/02.jpg`} alt={alt} />

      <BlogHeading title={titles[2]} />
      <BlogText>
        구매자는 차량구매대금과 보조금의 차액을 자동차 제조‧수입사에 납부하고, 자동차 제조‧수입사는
        지방자치단체(국비보조금+지방비보조금)로부터 보조금을 수령합니다.
      </BlogText>

      <BlogTable alignCenter>
        <Thead>
          <Tr>
            <Th>지역</Th>
            <Th>기간</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>서울</Td>
            <Td>2월 27일 ~ 소진 시까지</Td>
          </Tr>
          <Tr>
            <Td>인천</Td>
            <Td>2월 21일 ~ 11월 30일까지</Td>
          </Tr>
          <Tr>
            <Td>수원</Td>
            <Td>2월 20일 ~ 6월 30일까지</Td>
          </Tr>
          <Tr>
            <Td>고양</Td>
            <Td>2월 16일 ~ 소진 시까지</Td>
          </Tr>
          <Tr>
            <Td rowSpan={2}>세종</Td>
            <Td>상반기 : 2월 23일 ~ 6월 30일 까지</Td>
          </Tr>
          <Tr>
            <Td>하반기 : 7월 1일 ~ 12월 15일 까지</Td>
          </Tr>
          <Tr>
            <Td rowSpan={2}>대전</Td>
            <Td>상반기 : 2월 17일 ~ 6월 30일 까지</Td>
          </Tr>
          <Tr>
            <Td>하반기 : 7월 1일 ~ 11월 30일 까지</Td>
          </Tr>
          <Tr>
            <Td>대구</Td>
            <Td>2월 14일 ~ 12월 8일 까지</Td>
          </Tr>
          <Tr>
            <Td>울산</Td>
            <Td>2월 13일 ~ 6월 30일 까지</Td>
          </Tr>
          <Tr>
            <Td>부산</Td>
            <Td>2월 16일 ~ 12월 8일 까지</Td>
          </Tr>
        </Tbody>
      </BlogTable>
    </>
  );
};

export default Subsidy;
