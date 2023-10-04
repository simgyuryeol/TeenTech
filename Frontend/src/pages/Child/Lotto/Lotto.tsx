import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LottoList from "../../../components/Lotto/LottoList";
import Jackpot from "../../../../src/assets/lotto/jackpot2.png";
import Ticket from "../../../../src/assets/lotto/ticket2.png";
import axios from "axios";
import Bot from "../Bot/Bot";

const Lotto: React.FC = () => {
  const navigate = useNavigate();
  const [lottoTicket, setLottoTicket] = useState(0);
  const [totalLotteryPrize, sedTotalLotteryPrize] = useState(0); // 부모가 설정한 당첨금액

  const ClickChange = () => {
    navigate("/LottoChange", { state: { totalLotteryPrize } });
  };

  const getlottoticket = () => {
    axios
      .get(`https://j9e207.p.ssafy.io/api/v1/34/lotto/ticket`)
      .then((response) => {
        setLottoTicket(response.data.data.lotteryCoupon);
        sedTotalLotteryPrize(response.data.data.totalLotteryPrize);
        console.log("티켓정보");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getlottoticket();
    // lottohistory();
  }, []);

  return (
    <div
      className="pt-20 max-h pb-3 "
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(180deg, #141E30 0%, #243B55 100%)",
      }}
    >
      {/* 챗봇 */}
      <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}>
        <div className="flex items-end">
          <div className="bg-sky-200 rounded-lg drop-shadow-md p-2 mb-3">
            질문해줘
          </div>
          <Bot />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative flex justify-center" style={{ width: "100%" }}>
          <img style={{ width: "auto", height: "200px" }} src={Jackpot} />
        </div>
      </div>
      <div className="flex justify-between mx-4">
        <div
          className="rounded-2xl w-1/2 mr-4 text-start"
          style={{
            position: "relative",
            backgroundColor: "#3EACFC",
            boxShadow: "0 0 2rem #3EACFC, inset 0 0 1.3rem #3EACFC",
          }}
          onClick={ClickChange}
        >
          <div className="text-2xl ml-3 mt-3 text-white">
            <div>복권 교환하기</div>
          </div>
          <img
            src={Ticket}
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              position: "absolute",
              bottom: 0,
              right: 10,
            }}
          />
        </div>

        <div className="justify-center w-1/2">
          <div
            className="rounded-2xl drop-shadow mb-3 text-xl"
            style={{ backgroundColor: "white" }}
          >
            <div className="pt-2 pl-3 text-start">현재 당첨금</div>
            <div className="px-3 pt-4 pb-2 text-end">
              {totalLotteryPrize} 원
            </div>
          </div>
          <div
            className="rounded-2xl drop-shadow text-xl"
            style={{ backgroundColor: "white" }}
          >
            <div className="pt-2 pl-3 text-start">복권 교환권</div>
            <div className="px-3 pt-4 pb-2 text-end">{lottoTicket} 장</div>
          </div>
        </div>
      </div>

      <div className="my-3 mx-4 pb-2 bg-white rounded-2xl">
        <LottoList />
      </div>
    </div>
  );
};

export default Lotto;
