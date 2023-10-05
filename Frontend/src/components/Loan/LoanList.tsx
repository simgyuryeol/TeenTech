import React, { ReactNode } from "react";
import LoanCompo from "./LoanCompo";
import RunDog from "../../../src/assets/run_dog2.gif";

interface LoanListProps {
  children: ReactNode;
  children2: ReactNode;
  amount: number;  
  lastBalance: number;  
  loanId: number;
  title: string;  
  maturityDate: string;
  reason: string;
  interestRate: number;
  initialBalance: number;
}

const LoanList: React.FC<LoanListProps> = (props) => {
  const now = new Date();
  const enddate = props.maturityDate
  const distance = new Date(enddate).getTime() - now.getTime()
  const maturitydatecount = Math.floor(distance / (1000 * 60 * 60 * 24));

  const LoanName = props.title;
  // 총 갚아야 될 돈
  // const [totalLoanMoney, setTotalLoanmoney] = useState(props.amount)
  const totalLoanMoney = props.initialBalance
  // 갚은 돈
  // const [LoanMoney, setLoanmoney] = useState(totalLoanMoney - props.lastBalance)
  const LoanMoney = totalLoanMoney - props.lastBalance;
  const progress = (LoanMoney / totalLoanMoney) * 100;
  // useEffect(() => {
  //   if (LoanMoney < 0){
  //     const interest = props.lastBalance - props.amount
  //     setLoanmoney(LoanMoney + interest)
  //     setTotalLoanmoney(props.lastBalance + LoanMoney + interest)
  //   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const maturity = props.maturityDate;

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div>
      <div
        className="drop-shadow-xl rounded-xl pt-2 mr-6 ml-6 bg-white"
        style={{ borderColor: "#ABD0CE" }}
      >
        <div className="flex mb-4 justify-between">
          <div className="text-xl text-start pl-3">{LoanName}</div>
          <div className="text-lg text-start mr-3 rounded-md px-2 bg-red-500 text-white">
            D-{maturitydatecount+1}
          </div>
        </div>
        {/* 진행도 바 */}
        <div className="h-8">
          <div className="flex m-3 pb-3 relative">
            <div
              className="absolute"
              style={{
                left: `calc(${progress}% - 25px)`,
                top: "12px",
                transform: "translateY(-50%)",
              }}
            >
              <img
                src={RunDog}
                style={{ width: "60px", height: "auto" }}
                alt="Running person"
              />
            </div>
            <div
              className="bg-gray-300 h-3 rounded-md absolute"
              style={{ width: "98%", top: "30px" }}
            ></div>
            <div
              className="bg-red-500 h-3 rounded-md absolute"
              style={{ width: `${progress}%`, top: "30px" }}
            ></div>
          </div>
        </div>
        {/* progress바 여기까지 */}
        <div className="flex justify-between mt-2">
          <div className="mt-1 mb-1 mx-3 text-red-500">
            <div>{LoanMoney}</div>
          </div>
          <div className="mt-1 mb-1 mx-3 text-gray-500">
            <div>{totalLoanMoney}</div>
          </div>
        </div>
        <div className="mx-3 text-xl text-start mb-3">
          갚을 금액이 {totalLoanMoney - LoanMoney}원 남았어요!
        </div>
        <div className="flex justify-end">
          <p
            onClick={() => handleOpen(1)}
            className="rounded-md px-2 py-1 mb-3 mr-2 bg-gray-300"
          >
            자세히 보기
          </p>
          {props.children}
        </div>
      </div>
      {open === 1 && (
        <LoanCompo loanId={props.loanId} title={props.title} amount={props.amount} reason={props.reason} initialBalance={props.initialBalance} interestRate={props.interestRate} maturityDate={props.maturityDate} closeModal={handleOpen} children2={props.children2}>
          {}
        </LoanCompo>
      )}
      <br></br>
    </div>
  );
};

export default LoanList;
