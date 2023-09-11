import React from "react";
import Calender from "../../../components/AccountBook/Calender";
import { Link } from "react-router-dom";

const AccountBook: React.FC = () => {
  return (
    <div>
      <div style={{ width: "100%", paddingTop: "60px" }}>
        <Calender />
      </div>
      <Link to="/AccountBookDetail">일단디테일</Link>
      <h2>자식 가계부 페이지</h2>
    </div>
  );
};

export default AccountBook;
