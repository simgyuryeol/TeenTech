import React, { ReactNode } from "react";
import LoanCompo from "./LoanCompo";

interface LoanListProps {
  children: ReactNode;
  children2: ReactNode;
}

const LoanList: React.FC<LoanListProps> = (props) => {
  const LoanName = "세진이 생일 선물";
  const totalLoanMoney = 200000;
  const LoanMoney = 100000;
  const progress = (LoanMoney / totalLoanMoney) * 100;
  // const depositMoney2 = depositMoney >= 10000 ? depositMoney / 10000 +'만' : depositMoney;
  // const interestrate = '2'
  const maturity = "2023.10.04";

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div>
      <div
        className="border border-2 rounded-xl pt-2 mr-6 ml-6 bg-white"
        style={{ borderColor: "#ABD0CE" }}
      >
        <div className="flex">
          <div className=" w-[100%]">
            <div>
              {/* <div className='text-sm'>대출 이름</div> */}
              <div className="text-lg text-start pl-3">{LoanName}</div>
            </div>
            <div>
              <div className="text-sm">남은 상환액</div>
              <div className="text-2xl text-red-500">
                {LoanMoney.toLocaleString()}원
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-[100%]">
            <p className="text-5xl text-red-500 font-bold">D-4</p>
          </div>
        </div>
        <div className="flex justify-end">
          <p
            onClick={() => handleOpen(1)}
            className="border-2 rounded-md pl-2 pr-2 mb-1 mr-4 bg-gray-300"
          >
            자세히 보기
          </p>
          {props.children}
        </div>
        {/* 진행도 바 */}
        <div className="flex m-3 pb-3 relative">
          <div
            className="absolute"
            style={{
              left: `calc(${progress}% - 20px)`,
              top: "-25px",
              transform: "translateY(-50%)",
            }}
          >
            <img
              src="../../../src/assets/Teen9/Dog.png"
              style={{ width: "50px", height: "auto" }}
              alt="Running person"
            />
          </div>
          <div
            className="bg-gray-300 h-3 rounded-md absolute"
            style={{ width: "98%" }}
          ></div>
          <div
            className="bg-red-500 h-3 rounded-md absolute"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {open === 1 && (
        <LoanCompo
          closeModal={handleOpen}
          children2={props.children2}
        ></LoanCompo>
      )}
      <br></br>
    </div>
  );
};

export default LoanList;
