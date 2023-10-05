import React, {useState} from "react";
import LottoList from "../../components/Lotto/LottoList";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { childIdAtom } from "../../recoil/childIdAtom";

const base_URL = import.meta.env.VITE_SERVER_URL;

const Plotto: React.FC = () => {
  const child_id = useRecoilValue(childIdAtom).id
  const [pocketMoney, setPocketmoney] = useState(0);
  const handlePocketmoney = (e) => {
    const money = e.target.value;
    setPocketmoney(money);
  };
  const pinmoneyset = () => {
    axios
      .post(base_URL + `/api/v1/${child_id}/lotto/reward/set`, {
        cost: pocketMoney,
        // userId: window.localStorage.getItem('userId'),
      })
      .then((response) => {
        console.log(response.data);
        alert("당첨금 설정 완료");
        // const depositid = response.data
        // navigate(`/DepositJoinSuccess/${depositid}`);
      })
      .catch((error) => {
        alert("당첨금 설정 실패");
        console.log(error);
      });
  };
  return (
    <div className="pt-24" style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f6f6f6" }}>
            <div className="mb-3">
        <p className="text-2xl font-bold">복권 당첨금 설정</p>
        <div
          className="flex flex-col border-2 rounded-xl mr-6 ml-6 mb-1 p-2 pt-4 bg-white"
          style={{ borderColor: "gray" }}
        >
          <div className="flex justify-between ml-[5%] mr-[8%]">
            <p className="text-xl font-bold">복권 당첨금</p>
          </div>
          <div>
            <input
              className="border-2 rounded-md w-[90%] p-3 mb-2"
              type="number"
              id="interest"
              placeholder="당첨금 금액"
              value={pocketMoney}
              onChange={handlePocketmoney}
              required
            />
            원
          </div>
        </div>
        <p className="flex justify-end text-sm mr-6 ml-6">
          설정에 따라 자동이체됩니다.
        </p>
        <div className="flex justify-end m-2 mr-6">
          <p
            onClick={pinmoneyset}
            className="p-10 pt-1 pb-1 border-2 border-black  rounded-md border-gray-500"
          >
            완료
          </p>
        </div>
      </div>
      <hr/>
      <div>
        <LottoList />
      </div>
    </div>
  );
};

export default Plotto;
