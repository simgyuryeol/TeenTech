import React from "react";
import Calender from "../../../components/AccountBook/Calender";
import Bot from "../../Child/Bot/Bot";
const AccountBook: React.FC = () => {
  return (
    <div
      style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f6f6f6" }}
    >
      {/* 챗봇 */}
      <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}>
        <div className="flex items-end">
          <div className="bg-sky-200 rounded-lg drop-shadow-md p-2 mb-3">
            질문해줘
          </div>
          <Bot />
        </div>
      </div>

      <div className="pt-24 pb-3" style={{ width: "100%", minHeight: "100%" }}>
        <Calender />
      </div>
    </div>
  );
};

export default AccountBook;
