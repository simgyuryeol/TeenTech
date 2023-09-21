import React from "react";
import { useNavigate } from "react-router-dom";

interface AccountBottonProps {
  date?: string;
}

const AccountBotton: React.FC<AccountBottonProps> = ({ date }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate("/AccountBookAdd", { state: { date } });
  };

  return (
    <div className="flex justify-end mr-4">
      {/* 가계부 수정 링크 */}
      <button onClick={handleLinkClick} className="text-black bg-white mr-3">
        가계부 수정
      </button>
      {/* 가계부 쓰기 링크 */}
      <button onClick={handleLinkClick} className="text-black bg-white">
        가계부 쓰기
      </button>
    </div>
  );
};

export default AccountBotton;
