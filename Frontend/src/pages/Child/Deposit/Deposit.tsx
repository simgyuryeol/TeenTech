import React, {useState, useEffect}  from 'react';
import Credit from "../../../components/Credit";
import { Link } from "react-router-dom";
import axios from 'axios';

const base_URL = import.meta.env.VITE_SERVER_URL;

const Deposit: React.FC = () => {
  const credit = "3";
  const child_id = 34;
  const [deposits, setDeposits] = useState([]);
  
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

  // const Creditdata = () => {
  //   axios
  //     .get(base_URL + `/api/v1/users/credit-and-interests`, {
  //       // userId: window.localStorage.getItem('userId'),
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //       // const depositid = response.data
  //       // navigate(`/DepositJoinSuccess/${depositid}`);
  //     })
  //     .catch(error => {
  //       console.log(child_id)
  //       console.log(error);
  //     });
  // };
  

  return (
    <div className="pt-24 ">
      <div className="mb-4">
        <Credit children={
                <div
                className="rounded-xl"
                style={{ borderColor: "#ABD0CE" }}
                >
                <div className="flex justify-center">
                <p className="text-xl">{credit}등급</p>
                <p className="text-md flex items-center">을 위한 예금 금리</p>
                </div>
                <p className="text-2xl font-bold mb-2">{"1.5 ~ 2"}%</p>
              </div>
              
        } ></Credit>
        </div>
      
        <div className="flex justify-center mb-2">
        <Link to="/DepositJoinDetail" className='rounded-md shadow-md bottom-10' style={{ backgroundColor: "rgb(255, 169, 184)" }}>
          <p className="text-2xl m-4 font-bold ml-10 mr-10" style={{ color: "black"}}>
            예금 가입하기+
          </p>
        </Link>
      </div>

      <div>
        <div className="text-2xl font-bold mb-3">가입한 예금 상품</div>
          {deposits.map((item, index) => (
          <Link to={`/DepositDetail/${item.depositId}`} state={item} key={index}>
            <div
              className="rounded-xl shadow-md m-6 mb-1 flex justify-around bg-white"
              style={{ borderColor: "#ABD0CE" }}
            >
              <div className="m-3">
                <p className="text-black">{item.depositName}</p>
                <div className="flex justify-around">
                  <p
                    className={item.interest < 0 ? "text-blue-500" : "text-red-500"}
                  >
                    {item.interest}%
                  </p>
                  <p
                    className="text-white border rounded-md pr-1 pl-1"
                    style={{ backgroundColor: "#476C82" }}
                  >
                    {item.interestType}
                  </p>
                </div>
              </div>
              <div className="m-3">
                <p className="text-black">만기일</p>
                <p className="text-black">{item.endDate}</p>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
      
  );
};

export default Deposit;
