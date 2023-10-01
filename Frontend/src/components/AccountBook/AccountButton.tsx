import React from "react";
import { useNavigate } from "react-router-dom";

interface AccountBottonProps {
  date?: string;
  total: number;
  spendingAmount: number;
  importAmount: number;
  buttonState: number;
}

const AccountBotton: React.FC<AccountBottonProps> = ({
  date,
  total,
  spendingAmount,
  importAmount,
  buttonState,
}) => {
  console.log(buttonState);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate("/AccountBookAdd", {
      state: { date, total, spendingAmount, importAmount },
    });
  };

  return (
    <div className="flex justify-end mr-4">
      {/* 가계부 수정 링크 */}
      {buttonState === 0 && (
        <button onClick={handleLinkClick} className="text-black bg-white">
          가계부 수정
        </button>
      )}
      {/* 가계부 쓰기 링크 */}
      {buttonState === 1 && (
        <button onClick={handleLinkClick} className="text-black bg-white">
          가계부 쓰기
        </button>
      )}
    </div>
  );
};

export default AccountBotton;
