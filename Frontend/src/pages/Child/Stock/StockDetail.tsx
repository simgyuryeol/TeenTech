import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../../components/Common/Modal";
import StockChart from "../../../components/Stock/StockChart";
import StockNews from "../../../components/Stock/StockNews";
import BuyStock from "../../../components/Stock/BuyStock";
import SellStock from "../../../components/Stock/SellStock";

interface News {
  title: string;
  content: string;
  date: string;
}

const StockDetail: React.FC = () => {
  const { eng } = useParams();
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const newsList: News[] = [
    {
      title:
        "돌아온 금융株 계절… 최대 실적 ‘KB’·주가 기대 ‘하나’·배당수익 ‘우리’",
      content:
        "‘가을 전어 생각날 때, 찬 바람 불 때 배당주.’ 지지부진한 국내 증시 상황 속에서 배당주의 계절이 돌아왔다. 대표 배당 종목인 금융주는 올해도 은행 금리 이상의 수익률을 낼 수 있을 것으로 기대를 모은다.",
      date: "2023-09-12",
    },
    {
      title: "'일이 손에 안 잡힌다'…93만원까지 밀린 에코프로, 개미도 던졌다",
      content:
        " '에코프로 주가 빠지는 걸 보고 있자니 일이 손에 안 잡힌다. 지난 밤에 테슬라는 10% 급등했는데 왜 에코프로는 이렇게 떨어지는 건가.'(에코프로 주주 A씨)국내 유일 '황제주' 자리를 반납한 에코프로(086520)가 장중 91만원선까지 밀리는 등 크게 출렁이면서 개인 투자자들의 한숨이 깊어지고 있다. 최근 에코프로가 100만원선을 밑돌면서 저가 매수 기회라는 판단 아래 개인 투자자들은 물량을 대거 사들였는데 이틀 연속 급락세를 나타내면서다.",
      date: "2023-09-12",
    },
  ];

  const handleBuyClick = () => {
    setIsBuyModalOpen(true);
  };
  const handleSellClick = () => {
    setIsSellModalOpen(true);
  };
  const handleBuyClose = () => {
    setIsBuyModalOpen(false);
  };
  const handleSellClose = () => {
    setIsSellModalOpen(false);
  };

  return (
    <React.Fragment>
      <div className="mt-12">
        <p className="font-bold text-2xl">{eng}</p>
        <StockChart />
        <p className="font-bold text-lg text-left ml-7">뉴스</p>
        {newsList.map((news, index) => (
          <StockNews key={index} news={news} />
        ))}
        <button onClick={handleBuyClick} className="border-2 border-red-300 w-32 font-bold">
          살래요
        </button>
        <span className="m-5" />
        <button onClick={handleSellClick} className="border-2 border-blue-300 w-32 font-bold">
      팔래요
        </button>
      </div>

      {isBuyModalOpen && (
        <Modal>
          <button
            className="rounded-full relative inset-x-32"
            onClick={handleBuyClose}
          >
            x
          </button>
          <BuyStock price={1200} onClose={handleBuyClose} />
        </Modal>
      )}

      {isSellModalOpen && (
        <Modal>
          <button
            className="rounded-full relative inset-x-32"
            onClick={handleSellClose}
          >
            x
          </button>
          <SellStock price={1200} onClose={handleSellClose} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default StockDetail;
