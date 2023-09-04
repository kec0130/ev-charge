# 전기차G

## 서비스 소개

> <https://ev-charge.kr>

전기차 충전소의 위치와 상세 정보, 실시간 충전 현황을 지도에서 확인할 수 있는 서비스입니다.

<br />

## 기술 스택

| 분류             | 기술 스택      |
| ---------------- | -------------- |
| Framework        | Next.js        |
| Language         | TypeScript     |
| Data Fetching    | SWR            |
| State Management | Jotai          |
| Database         | Supabase       |
| Deployment       | Vercel         |
| Map              | Naver Maps API |
| Styling          | Chakra UI      |

<br />

## 주요 기능 및 구현 내용

- 충전소 지도

  - [한국환경공단 OpenAPI](https://www.data.go.kr/data/15076352/openapi.do)를 활용하여 충전소 정보, 실시간 충전 현황 제공
  - Naver Maps API를 활용하여 충전소 위치 표시
  - 지도를 드래그하면 Reverse Geocoding API를 활용하여 해당 지역의 주소를 인식
  - 드롭다운에서 주소를 선택하면 Geocoding API를 활용하여 해당 지역으로 지도 이동

- 현 위치 주변 충전소 찾기

  - Geolocation API를 활용하여 유저의 현재 위치를 가져옴
  - 위경도로 거리를 계산하여 현 위치에서 가까운 순으로 정렬하여 표시

- 충전소 필터링

  - 사용가능 여부, 급속충전기 보유 여부에 따른 필터링
  - 필터링 조건에 따라 다른 색상의 마커 사용

- 충전소 리뷰

  - 리뷰 작성 및 평점 등록
  - Supabase를 활용하여 충전소 리뷰 및 평점 저장

- 데이터 요청 최적화
  - Next API Routes를 사용하여 OpenAPI 데이터를 원하는 형태로 가공하여 활용
  - SWR을 활용하여 충전소 데이터 캐싱
