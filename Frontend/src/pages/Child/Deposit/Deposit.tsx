import React, { useState, useEffect } from "react";
import Credit from "../../../components/Credit";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useRecoilValue,} from 'recoil';
import { childIdAtom } from '../../../recoil/childIdAtom';
import { CreditAtom } from "../../../recoil/creditAtom";

const base_URL = import.meta.env.VITE_SERVER_URL;

const Deposit: React.FC = () => {
  const credit = useRecoilValue(CreditAtom).credit
  const depositinterest = useRecoilValue(CreditAtom).depositinterest
  const [deposits, setDeposits] = useState([]);
  const imo = ['🍕','🍓','🎈','🎁','⚽','🍫','🎮','🟢','🍖','🍩','🍕','🍓','🎈','🎁','⚽','🍫','🎮','🟢','🍖','🍩','🍕','🍓','🎈','🎁','⚽','🍫','🎮','🟢','🍖','🍩',]
  const child_id = useRecoilValue(childIdAtom).id

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await axios.get(
          base_URL + `/api/v1/${child_id}/deposits/`
        );
        console.log(response.data.data);
        setDeposits(response.data.data);
      } catch (error) {
        console.log(child_id);
        console.log(error);
      }
    };
    fetchDeposits();
  }, []);

  return (
    <div className="pt-20 bg-white">
      <div className="border bg-yellow-200 rounded-md ml-2 mr-2 mb-2 pt-4">
        <p className="text-2xl mb-2">예금</p>
        <div className="mb-4 ">
          <Credit children={""}></Credit>
          <div
            className="rounded-md shadow-md mt-3 ml-6 mr-6 bg-white"
            style={{ borderColor: "#ABD0CE", backgroundColor: "" }}
          >
            <div className="flex justify-center">
              <p className="text-xl">{credit}등급</p>
              <p className="text-md flex items-center">을 위한 예금 금리</p>
            </div>
              <p className="text-2xl font-bold mb-2">{depositinterest}%</p>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Link
            to="/DepositJoinDetail"
            className="rounded-md shadow-md bottom-10 bg-blue-300"
            // style={{ backgroundColor: "rgb(255, 169, 184)" }}
          >
            <p
              className="text-2xl m-4 font-bold ml-24 mr-24"
              style={{ color: "black" }}
            >
              예금 가입하기+
            </p>
          </Link>
        </div>
      </div>
        <hr></hr>
      <div className='bg-green-300 ml-2 mr-2 rounded-md pt-1 pb-80'>
        <div className="text-2xl font-bold mt-3 mb-3">가입한 예금 상품</div>
        {deposits.length > 0 ? (
    deposits.map((item, index) => (
      <Link to={`/DepositDetail/${item.depositId}`} state={item} key={index}>
        {/* 예금 상품 내용 */}
        <div
              className="rounded-xl shadow-md m-6 mb-1 flex justify-between bg-white"
              style={{ borderColor: "#ABD0CE" }}
            >
              <div className="flex items-center ml-3">
                <p className="text-sm">{imo[index]}</p>
              </div>
              <div className="m-3">
                <p className="text-black">{item.depositName}</p>
                <div className="flex justify-center">
                  <p
                    className={
                      item.interest < 0 ? "text-blue-500" : "text-red-500"
                    }
                  >
                    {item.interest}%
                  </p>
                  <p
                    className="text-white border rounded-md pr-1 pl-1"
                    style={{ backgroundColor: "#96B3FF" }}
                  >
                    {item.interestType}
                  </p>
                </div>
              </div>
              <div className="m-3">
                <p className="text-black">맡긴 금액</p>
                <p className="text-black">{item.money.toLocaleString()}원</p>
              </div>
              <div className="m-3">
                <p className="text-black">만기일</p>
                <p className="text-black">{item.endDate}</p>
              </div>
            </div>
      </Link>
    ))
  ) : (
    <div className="flex justify-center items-center h-full">
      <p className="text-gray-500">예금 상품이 없습니다.</p>
    </div>
  )}
      </div>
    </div>
  );
};

export default Deposit;
