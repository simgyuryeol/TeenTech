import React from "react";
import Credit from "../../../components/Credit";
import LoanStatus from "../../../components/Loan/LoanStatus";
import { Link } from "react-router-dom";
import LoanList from "../../../components/Loan/LoanList";
import LoanCreate from "../../../components/Loan/LoanCreate";
import LoanrepaymentButton from "../../../components/Loan/LoanrepaymentButton";

const Loan: React.FC = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="pt-24">
      <Credit />
      <div className="flex flex-col justify-center">
        <LoanStatus>
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
        <LoanList
          children2={
            <div className="border-2 border-black rounded-md">
              <div className="p-6 pt-1 pb-1">
                <LoanrepaymentButton></LoanrepaymentButton>
              </div>
            </div>
          }
        >
          <div className="rounded-md px-2 py-1 mb-3 mr-2 bg-gray-300">
            <LoanrepaymentButton></LoanrepaymentButton>
          </div>
        </LoanList>
        <LoanList children2>
          <div className="rounded-md px-2 py-1 mb-3 mr-2 bg-gray-300">
            <LoanrepaymentButton></LoanrepaymentButton>
          </div>
        </LoanList>
        <LoanList children2>
          <div className="rounded-md px-2 py-1 mb-3 mr-2 bg-gray-300">
            <LoanrepaymentButton></LoanrepaymentButton>
          </div>
        </LoanList>
      </div>
      {open === 1 && <LoanCreate closeModal={handleOpen}></LoanCreate>}
    </div>
  );
};

export default Loan;
