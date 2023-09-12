import React from "react";
import Calender from "../../../components/AccountBook/Calender";

const AccountBook: React.FC = () => {
  return (
    <div>
      <div style={{ width: "100%", paddingTop: "60px" }}>
        <Calender />
      </div>
      <h2>자식 가계부 페이지</h2>
    </div>
  );
};

export default AccountBook;
