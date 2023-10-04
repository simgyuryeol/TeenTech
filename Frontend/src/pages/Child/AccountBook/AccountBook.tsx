import React from "react";
import Calender from "../../../components/AccountBook/Calender";
const AccountBook: React.FC = () => {
  return (
    <div
      className="pb-10"
      style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f6f6f6" }}
    >
      <div className="pt-24 pb-3" style={{ width: "100%", minHeight: "100%" }}>
        <Calender />
      </div>
    </div>
  );
};

export default AccountBook;
