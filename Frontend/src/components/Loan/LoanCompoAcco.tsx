import React, { useState, ReactNode } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import DownArrow from "../../../src/assets/down-arrow.png";
import UpArrow from "../../../src/assets/up-arrow.png";

interface LoanCompoAccoProps {
  children: ReactNode;
  children2: ReactNode;
  title: string;
  reason: string;
  loanId: number;
  amount: number;
  period: number;
  interestRate: number;
}
const LoanCompoAcco: React.FC<LoanCompoAccoProps> = (props) => {
  const interestrate = props.interestRate;
  const loanName = props.title;
  const loanMoney = props.amount;
  const maturity = props.period;
  const reason = props.reason;

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <Accordion
      open={open === 1}
      className="border rounded-md shadow-md w-[90%] ml-[5%] bg-white mb-2"
    >
      <AccordionHeader
        onClick={() => handleOpen(1)}
        className="text-center flex flex-col justify-center items-center text-md font-normal p-1 border-none"
      >
        <div className="w-full">
          {props.children}
          <div className="flex flex-col mt-2">
            <div className="flex">
              <p className="flex ml-[5%] w-[100%] text-lg">대출 이름</p>
              <p className="w-[30%] text-xs">이자율: {interestrate}%</p>
            </div>
            <p
              className="ml-[5%] border rounded-md w-[90%] mb-2 p-3 "
              style={{ backgroundColor: "#EBF0F3" }}
            >
              {loanName}
            </p>
          </div>
        </div>
        {open === 0 ? (
          <div style={{ width: "30px" }}>
            <img src={DownArrow} />
          </div>
        ) : (
          <div style={{ width: "30px" }}>
            <img src={UpArrow} />
          </div>
        )}
      </AccordionHeader>
      <AccordionBody className="text-md">
        <div>
          <p className="flex ml-[5%] w-[100%] text-lg">대출 금액</p>
          <p
            className="ml-[5%] border rounded-md w-[90%] p-3"
            style={{ backgroundColor: "#EBF0F3" }}
          >
            {loanMoney.toLocaleString()}원
          </p>
        </div>
        <div>
          <p className="flex ml-[5%] w-[100%] text-lg">대출 기간</p>
          <p
            className="ml-[5%] border rounded-md w-[90%] p-3"
            style={{ backgroundColor: "#EBF0F3" }}
          >
            {maturity}개월
          </p>
        </div>
        <div className="mb-4">
          <p className="flex ml-[5%] w-[100%] text-lg">대출 사유</p>
          <p
            className="ml-[5%] border rounded-md w-[90%] p-4 pb-10 break-words"
            style={{ backgroundColor: "#EBF0F3" }}
          >
            {reason}
          </p>
        </div>
        {props.children2}
      </AccordionBody>
    </Accordion>
  );
};
export default LoanCompoAcco;
