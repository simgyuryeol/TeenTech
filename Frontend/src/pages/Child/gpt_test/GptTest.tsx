import React, { useState, useEffect } from "react";

const GptTest: React.FC = () => {
  const [newsData, setNewsData] = useState({
    title: "기사제목",
    data:
      "삼성전자가 PC·노트북 D램 시장의 새로운 폼팩터(제품구조)를 제시할 차세대 모듈 ‘LPCAMM(저전력 LP 모듈)’을 업계 최초로 개발했다고 26일 밝혔다. 이는 LPDDR(저전력더블데이터레이트) D램 기반의 7.5Gbps 성능으로 이 모듈을 사용하면 기존보다 PC나 노트북의 두께가 크게 줄어 사용 편의성이 높아질 전망이다. 삼성전자는 인텔 플랫폼에서 7.5Gbps LPCAMM 동작 검증을 마쳤으며, 2024년 상용화를 위해 연내 인텔을 포함한 주요 고객사와 차세대 시스템에서 검증할 예정이다. 삼성전자는 LPCAMM으로 기존 DDR 기반 So-DIMM(작은 아웃라인 듀얼 인라인 메모리 모듈) 대비 성능·저전력·디자인 효율성 측면에서 기술 혁신을 이뤄내겠다는 전략이다. 이를 통해 차세대 PC와 노트북 시장에 새로운 폼팩터 패러다임을 제시할 것으로 예상된다. 기존 PC나 노트북에는 LPDDR 패키지 제품을 메인보드에 직접 탑재한 온보드 방식 혹은 DDR 기반 모듈 형태의 So-DIMM이 사용되고 있다. 온보드 방식은 소형화, 저전력 등의 장점이 있지만 메인보드에 직접 탑재돼 교체가 어렵고, So-DIMM은 모듈 형태로 탈부착이 가능하지만 전송 속도, 공간 효율화 등에서 물리적 개발 한계가 있다. 삼성전자는 LPDDR을 모듈에 탑재해 고성능, 저전력을 구현함과 동시에 탈부착을 가능하게 해 제조사에게는 제조 유연성을, 사용자에게는 교체·업그레이드 등의 편의성을 증대시켰다. LPCAMM은 So-DIMM 대비 탑재 면적을 최대 60% 이상 감소시켜 PC나 노트북의 부품 구성 자유도를 높여 배터리 용량 추가 확보 등 내부 공간을 보다 효율적으로 사용할 수 있다. 특히 LPCAMM은 So-DIMM보다 성능은 최대 50%, 전력효율은 최대 70%까지 향상시켜 인공지능(AI)·고성능 컴퓨팅(HPC)·서버·데이터센터 등 응용처가 확대될 것으로 전망하고 있다. 최근 데이터센터 고객들은 LPDDR 탑재를 고려한 전력 운영 및 총 소유 비용(TCO) 효율화를 검토 중으로, 온보드 방식의 경우 사양 업그레이드와 문제 발생시 메인보드를 전부 교체해야 하는 어려움이 있다. 하지만 LPCAMM을 서버에 적용할 경우 원하는 성능으로 제품을 교체해 업그레이드가 가능할 뿐만 아니라, 전력 운영 관점에서도 비용 절감 효과를 가져올 수 있다고 삼성전자는 설명했다. 배용철 삼성전자 메모리사업부 상품기획팀 부사장은 “다양한 분야에 걸쳐 고성능, 저전력, 제조 융통성에 대한 요구가 증가함에 따라 LPCAMM은 PC·노트북과 데이터센터 등으로 점차 응용처가 늘어날 전망”이라며 “앞으로 삼성전자는 LPCAMM 솔루션 시장 확대 기회를 적극 타진해 신규 시장을 개척하여 메모리 산업을 이끌어 갈 것”이라고 말했다. 인텔 메모리 & IO 테크놀로지 VP 디미트리오스 지아카스는 “LPCAMM은 에너지 효율성과 교체·수리 용이성이 강점으로, 이 새로운 폼팩터는 PC시장의 게임 체인저가 될 것”이라며 “클라이언트 PC 생태계의 원동력이 되고, 보다 넓은 시장 응용처에서 혁신을 이끌어 나갈 새로운 표준화에 참여할 수 있게 됐다”고 말했다.",
  });
  const [transformedArticle, setTransformedArticle] = useState("");

  // FastAPI 서버에 뉴스 데이터를 보내고 변환된 기사를 가져오는 함수
  const fetchTransformedNews = async () => {
    console.log("변환들어왔오..");
    try {
      const response = await fetch("http://localhost:8000/transform_news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          news_text: newsData.data, // 뉴스 데이터를 요청에 포함
        }),
      });

      if (!response.ok) {
        throw new Error("뉴스 변환 요청 실패");
      }

      const data = await response.json();
      console.log(data);
      setTransformedArticle(data.transformed_article);
    } catch (error) {
      console.error("뉴스 변환 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchTransformedNews();
  }, []);

  return (
    <div>
      {/* 기사 제목 */}
      <h2>{newsData.title}</h2>
      {/* 원본 뉴스 기사
      <p>{newsData.data}</p> */}
      {/* 변환된 뉴스 기사 */}
      <p>변환된 뉴스 기사</p>
      <p>{transformedArticle}</p>
    </div>
  );
};

export default GptTest;
