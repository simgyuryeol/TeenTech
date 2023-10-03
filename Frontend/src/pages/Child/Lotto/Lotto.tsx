import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LottoList from "../../../components/Lotto/LottoList";
import Jackpot from "../../../../src/assets/lotto/jackpot2.png";
import Ticket from "../../../../src/assets/lotto/ticket2.png";
import axios from "axios";

const Lotto: React.FC = () => {
  const navigate = useNavigate();
  const [lottoTicket, setLottoTicket] = useState(0);
  const [totalLotteryPrize, sedTotalLotteryPrize] = useState(0); // 부모가 설정한 당첨금액
  const [lottoList, setLottoList] = useState([]);

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

  const lottohistory = () => {
    axios
      .get(`https://j9e207.p.ssafy.io/api/v1/34/lotto`)
      .then((response) => {
        console.log("리스트 정보");
        setLottoList(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const lottorewardset = () => {
  //   axios
  //     .post(`https://j9e207.p.ssafy.io/api/v1/34/lotto/reward/set`, {
  //       cost: 5000,
  //     })
  //     .then((response) => {})
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
