import { BlogHeading, BlogImage, BlogText } from '../Common';
import TableOfContents from '../TableOfContents';
import useImgDirectory from '@/hooks/useImgDirectory';

const AcquisitionTax = () => {
  const imgDir = useImgDirectory();
  const alt = '전기차 취득세';
  const titles = ['자동차 취등록세 정의', '2023 전기차 취득세', '하이브리드, 수소 자동차 취득세'];

  return (
    <>
      <TableOfContents titles={titles} />
      <br />

      <BlogImage src={`${imgDir}/01.jpg`} alt={alt} />
      <BlogText>
        자동차를 구매하게 되면, 취등록세가 발생하게 됩니다. 전기차도 동일하게 취득세가 부과되는데요.
        오늘은 전기차를 중심으로 내연기관 차량들과 비교하여 취득세(취등록세) 정보를
        전달해드리겠습니다.
      </BlogText>

      <BlogHeading title={titles[0]} />
      <BlogText>
        자동차 취등록세의 정의를 우선 살펴보겠습니다. 재산권의 매매나 변경 또는 소멸에 따른 재산권
        이전 등기를 하는 과정에 있어서 붙는 수수료를 의미합니다. 앞서 설명드린 내용처럼 자동차를
        구매하는 경우 30일 이내 구/군에 구매하여 신고를 하는 것을 의미합니다.
      </BlogText>
      <BlogText>
        이를 기한내에 신고하지 않으면 2%의 가산세가 추가로 붙게 되는점 주의하시기 바랍니다.
      </BlogText>

      <BlogHeading title={titles[1]} />
      <BlogText>
        오늘의 핵심내용인 전기차 취득세에 대해서 알아보겠습니다. 내연기관차량과 다른점은 세금 감면
        혜택을 받을 수 있습니다.
      </BlogText>
      <BlogText>
        친환경경적 자동차 개발 및 보급 촉진에 관한 법률 2조 3호에 의거하여 전기차를 취득하는 경우
        취등록세가 <strong>140만원 이하는 면제를 받으실 수 있습니다.</strong>
      </BlogText>
      <BlogText>
        만약 140만원이 초과하게 되면, 140만원을 공제하게 되고 초과액에 대한 금액을 납부하시면
        됩니다. 또 한가지 중요한 사항은 중고 전기차를 구매해도 동일하게 취득세를 140만원 면제 받으실
        수 있습니다.
      </BlogText>
      <BlogImage src={`${imgDir}/02.jpg`} alt={alt} />

      <BlogHeading title={titles[2]} />
      <BlogText>
        하이브리드 자동차의 경우에도 세금 감면 혜택이 있습니다. 전기차보단 적은 금액이지만,
        취등록세가 40만원 이하인 경우 면제를 받으실 수 있습니다.
      </BlogText>
      <BlogText>
        반대로 수소차는 전기차와 동일하게 140만원 이하의 경우 취득세를 면제 받으실수 있으며, 중고차
        구매시에도 동일한 감면혜택을 받게됩니다.
      </BlogText>
      <BlogText>이상으로 전기차 취득세 핵심정보를 간략하게 살펴보았습니다.</BlogText>
    </>
  );
};

export default AcquisitionTax;
