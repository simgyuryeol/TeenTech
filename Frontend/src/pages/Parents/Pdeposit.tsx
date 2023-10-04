import React,{useState, useEffect} from "react";
import DepositList from "../../components/Deposit/DepositList";
import { useRecoilValue,} from 'recoil';
import { childIdAtom } from "../../recoil/childIdAtom";
import axios from 'axios';

const base_URL = import.meta.env.VITE_SERVER_URL;

const Pdeposit: React.FC = () => {
  const [deposits, setDeposits] = useState([]);
  const child_id = useRecoilValue(childIdAtom).id

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await axios.get(base_URL + `/api/v1/${child_id}/deposits/`);
        console.log(response.data.data);
        setDeposits(response.data.data);
      } catch (error) {
        console.log(child_id);
        console.log(error);
      }
    };
    // Creditdata();
    fetchDeposits();
  }, []);

  return (
    <div className="pt-20 ml-6 mr-6 mb-2 text-2xl"> 예금 목록
{deposits.length > 0 ? (
  deposits.map((item, index) => (
    <DepositList
      children=''
      key={index}
      depositName={item.depositName}
      depositMoney={item.money}
      maturity={item.endDate}
      interestrate={item.interest}
    />
  ))
) : (
  <div className="flex justify-center items-center">
    <p className="text-gray-500">예금 상품이 없습니다.</p>
  </div>
)}
    </div>
  );
};

export default Pdeposit;
