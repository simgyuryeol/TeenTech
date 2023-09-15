import React from "react";
import Calender from "../../../components/AccountBook/Calender";

const AccountBook: React.FC = () => {
  return (
    <div>
      <div className="mt-3" style={{ width: "100%" }}>
        <Calender />
      </div>
      <h2>자식 가계부 페이지</h2>
    </div>
  );
};

export default AccountBook;
