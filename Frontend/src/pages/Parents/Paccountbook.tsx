import React from "react";
import Calendar from "../../components/AccountBook/Calender";

const PaccountBook: React.FC = () => {
  return (
    <div className="pt-24">
      <Calendar />
      <h2>부모 - 자녀가계부</h2>
    </div>
  );
};

export default PaccountBook;
