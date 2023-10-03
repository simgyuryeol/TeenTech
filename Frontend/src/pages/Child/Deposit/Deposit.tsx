import React, {useState, useEffect}  from 'react';
import Credit from "../../../components/Credit";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useRecoilValue,} from 'recoil';
import { childIdAtom } from '../../../recoil/childIdAtom';

const base_URL = import.meta.env.VITE_SERVER_URL;

const Deposit: React.FC = () => {
  const credit = "3";
  // const child_id = 34;
  const [deposits, setDeposits] = useState([]);
  const bgcolor = ['gradient-to-tr from-gray-900 to-gray-700','black','pink-300', 'gradient-to-tr from-pink-300 to-blue-500', 'green-400','gray-900', 'blue-300','green-500', 'red-300', 'red-500', 'blue-500', 'green-400', 'black','red-300','blue-300','gradient-to-tr from-gray-900 to-gray-700','black','blue-500', 'blue-300', 'green-400','green-500', 'pink-300','gray-900', 'red-300', 'red-500', 'blue-500', 'green-400', 'black','red-300','blue-300','gradient-to-tr from-gray-900 to-gray-700','black','blue-500', 'blue-300', 'green-400','green-500', 'pink-300','gray-900', 'red-300', 'red-500', 'blue-500', 'green-400', 'black','red-300','blue-300']
  const imo = ['🍕','🍓','🎈','🎁','⚽','🍫','🎮','🟢','🍖','🍩','🍕','🍓','🎈','🎁','⚽','🍫','🎮','🟢','🍖','🍩','🍕','🍓','🎈','🎁','⚽','🍫','🎮','🟢','🍖','🍩',]
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
    <div className="pt-20 bg-white">
      <div className='border bg-yellow-200 rounded-md ml-2 mr-2 mb-2 pt-4'><p className='text-2xl mb-2'>예금</p>
      <div className="mb-4 ">
        <Credit children={''} ></Credit>
          <div className="rounded-md shadow-md mt-3 ml-6 mr-6 bg-white" style={{ borderColor: "#ABD0CE" , backgroundColor:'',}}>
            <div className="flex justify-center">
              <p className="text-xl">{credit}등급</p>
              <p className="text-md flex items-center">을 위한 예금 금리</p>
            </div>
              <p className="text-2xl font-bold mb-2">{"1.5 ~ 2"}%</p>
          </div>
      </div>

        <div className="flex justify-center mb-6">
        <Link to="/DepositJoinDetail" className='rounded-md shadow-md bottom-10 bg-blue-300' 
        // style={{ backgroundColor: "rgb(255, 169, 184)" }}
        >
          <p className="text-2xl m-4 font-bold ml-24 mr-24" style={{ color: "black"}}>
            예금 가입하기+
          </p>
        </Link>
      </div>
      </div>
        <hr></hr>
      <div className='bg-green-300 ml-2 mr-2 rounded-md pt-1 h-[full]'>
        <div className="text-2xl font-bold mt-3 mb-3">가입한 예금 상품</div>
          {deposits.map((item, index) => (
            <Link to={`/DepositDetail/${item.depositId}`} state={item} key={index}>
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
                    className={item.interest < 0 ? "text-blue-500" : "text-red-500"}
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
        ))}
        {/*  */}
      {/* Card Credit */}
      <div className='flex flex-wrap'>
      {deposits.map((item, index) => (
        <Link to={`/DepositDetail/${item.depositId}`} state={item} key={index}>
      <div id="card" className="relative w-44 h-36 rounded-2xl font-mono text-white overflow-hidden ml-2 mb-1">
        {/* Front content */}
        <div className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center bg-${bgcolor[index]}`} style={{ transform: 'rotateY(0deg)' }}>
          <div className="flex justify-between items-center">
            <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt='Smart card' className="w-[48px] ml-2" />
            <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt="Visa image" className="w-[48px] mr-2" />
          </div>
          <div>
            <div className='flex flex-col mb-2'>
              <div className='flex justify-center text-lg'>
                <div>{item.depositName}</div>
              </div>
              <div className='flex justify-center text-xs'>
                <div className='mr-2'>{item.money.toLocaleString()}원</div>
                <div>{item.interest}% {item.interestType}</div>
              </div>
            </div>
            <div className='flex text-xs justify-center'>
              <div>만기일:</div>
              <div>{item.endDate}</div>
            </div>
          </div>
        </div>
      </div>
      </Link>
            ))}
            </div>
{/*  */}
      </div>
    </div>
  );
};

export default Deposit;
