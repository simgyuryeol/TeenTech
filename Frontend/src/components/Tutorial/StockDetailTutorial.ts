export const tourOptions = {
  nextLabel: "다음",
  prevLabel: "이전",
  doneLabel: "끝",
  disableInteraction: true,
  buttonClass: "text-black p-2 m-1",
};

export const tourSteps = [
  {
    title: "오늘 가격",
    element: "#stock-today",
    intro:
      "주식의 <b>오늘 가격</b>이에요. <br/> 어제와 비교해 가격이 올랐는 지 내렸는 지 확인할 수 있어요.",
  },
  {
    title: "주식 차트",
    element: "#stock-chart",
    intro:
      "그래프를 클릭해 원하는 날의 가격을 보거나, 오른쪽 위에 위치한 버튼을 눌러 원하는 기간의 가격을 확인해보세요!",
  },
  {
    title: "뉴스",
    element: "#stock-news",
    intro: "관련된 기사를 읽고 주식의 가격이 적절한 지 생각해보아요.",
  },
  {
    title: "주식 사기",
    element: "#buy-btn",
    intro: "주식이 원하는 가격일 때 살 수 있어요.",
  },
  {
    title: "주식 팔기",
    element: "#sell-btn",
    intro: "주식이 원하는 가격일 때 팔 수 있어요.",
  },
];
