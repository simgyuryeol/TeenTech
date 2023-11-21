import React from "react";
import Calendar from "../../components/AccountBook/Calender";

const Paccountbook: React.FC = () => {
  return (
    <div
      className="pt-24 pb-3"
      style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f6f6f6" }}
    >
      <Calendar />
    </div>
  );
};

export default Paccountbook;
