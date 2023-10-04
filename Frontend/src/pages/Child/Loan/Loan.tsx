import React, { useState, useEffect } from "react";
import Credit from "../../../components/Credit";
import LoanStatus from "../../../components/Loan/LoanStatus";
import { Link } from "react-router-dom";
import LoanList from "../../../components/Loan/LoanList";
import LoanCreate from "../../../components/Loan/LoanCreate";
import LoanrepaymentButton from "../../../components/Loan/LoanrepaymentButton";
import axios from "axios";

const base_URL = import.meta.env.VITE_SERVER_URL;

interface Loan {
  totalInProgressLoanCount: number;
  totalLoanBalance: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inProgressLoanList: any[];
  loanLimitation: number;
}

const Loan: React.FC<Loan> = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const accessToken = window.localStorage.getItem("accessToken");

  const [loans, setLoans] = useState<Partial<Loan>>({});
  const totalInProgressLoanCount = loans.totalInProgressLoanCount;
  const totalLoanBalance = loans.totalLoanBalance;
  const loanList = loans.inProgressLoanList;
  const LoanLimitation = loans.loanLimitation;

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(
          base_URL + `/api/v1/loans/child/summary`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data.data);
        setLoans(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    // Creditdata();
    fetchLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-24">
      <Credit children={""} />
      <div className="flex flex-col justify-center">
        <LoanStatus
          totalInProgressLoanCount={totalInProgressLoanCount}
          totalLoanBalance={totalLoanBalance}
          loanLimitation = {LoanLimitation}
        >
          <div className="flex justify-end">
            <button
              onClick={() => handleOpen(1)}
              className="text-base font-bold p-2 pt-1 pb-1 mr-3 mt-3 mb-3 drop-shadow-md"
              style={{ backgroundColor: "#96B3FF" }}
              // style={{ color: "#363636", backgroundColor: "#ABC3D0" }}
            >
              대출 신청
            </button>
            <Link to="/LoanCompleted">
              <div>
                <p
                  className="font-bold p-2 pt-1 pb-1 mr-3 mt-3 mb-3 drop-shadow-md rounded-lg text-base	
                  text-black"
                  style={{ backgroundColor: "#96B3FF" }}
                >
                  지난 대출 보기
                </p>
              </div>
            </Link>
          </div>
        </LoanStatus>
      </div>
      {/* <Link to="/LoanCompleted">
        <p className="text-xs text-end mr-10 text-black">지난 대출 보기</p>
      </Link> */}
      <hr className="border-1 mt-8" style={{ borderColor: "#ABD0CE" }} />
      <div>
        <p className="m-4 text-lg">대출 리스트</p>
      </div>
      <div>
      {loanList? (loanList.map((loan, index) => (
          <LoanList children2={''} key={index} loanId={loan.loanId} title={loan.title} initialBalance={loan.initialBalance} lastBalance={loan.lastBalance} maturityDate={loan.maturityDate} reason={loan.reason} interestRate={loan.interestRate} amount={loan.amount}>
            <div className="">
              <div className="border-2 rounded-md pl-5 pr-5 py-1 mr-2 mb-3 bg-gray-300">
                <LoanrepaymentButton loanId={loan.loanId}></LoanrepaymentButton>
              </div>
            </div>
          </LoanList>
      ))):('')}
      </div>
      {open === 1 && (
        <LoanCreate
          loanLimit={LoanLimitation- totalLoanBalance}
          totalLoanBalance={totalLoanBalance}
          closeModal={handleOpen}
        ></LoanCreate>
      )}
    </div>
  );
};

export default Loan;
