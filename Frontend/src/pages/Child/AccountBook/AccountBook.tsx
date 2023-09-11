import React from "react";
import styles from "./AccountBook.module.css";
import Statics from "../../../components/AccountBook/Statics";
import Calender from "../../../components/AccountBook/Calender";
import { Link } from "react-router-dom";

const AccountBook: React.FC = () => {
  return (
    <div>
      <div style={{ width: "100%", paddingTop: "50px" }}>
        <Statics />
      </div>
      <div style={{ width: "100%" }}>
        <div>달력</div>
        <Calender />
      </div>
      <Link to="/AccountBookDetail">일단디테일</Link>
      <h2>자식 가계부 페이지</h2>
    </div>
  );
};

export default AccountBook;
