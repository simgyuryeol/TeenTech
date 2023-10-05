import React, { useEffect, useState } from "react";
import LoanDetail from "../../../components/Loan/LoanDetail";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { childIdAtom } from "../../../recoil/childIdAtom";

const base_URL = import.meta.env.VITE_SERVER_URL;

const Ploandetail: React.FC = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const [completedloans, setCompletedLoans] = useState([]);
  const childId = useRecoilValue(childIdAtom).id;
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(
          base_URL + `/api/v1/loans/parent/history/${childId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data.data);
        setCompletedLoans(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    // Creditdata();
    fetchLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="pt-20 pb-8"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f6f6f6",
      }}
    >
      <h2>지난 대출</h2>
      {completedloans ? (
        completedloans.map((loan, index) => (
          <LoanDetail
            key={index}
            loanId={loan.loanId}
            title={loan.title}
            amount={loan.amount}
            interestRate={loan.interestRate}
            period={loan.period}
            reason={loan.reason}
            state={loan.state}
          ></LoanDetail>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">지난 대출이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Ploandetail;
