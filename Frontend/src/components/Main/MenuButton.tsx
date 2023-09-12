import React from "react";
import { Link } from "react-router-dom";

// 이미지 불러오기
import AccountBook from "../../../src/assets/main/accountbook.png";
import Alba from "../../../src/assets/main/alba.png";
import Deposit from "../../../src/assets/main/deposit.png";
import Loan from "../../../src/assets/main/loan.png";
import Lotto from "../../../src/assets/main/lotto.png";
import Quiz from "../../../src/assets/main/quiz.png";
import Stock from "../../../src/assets/main/stock.png";

interface Menu {
  kor: string;
  eng: string;
}

interface MenuButtonProps {
  menu: Menu;
}

const MenuButton: React.FC<MenuButtonProps> = ({ menu }) => {
  const { kor, eng } = menu;
  let imageSrc;

  switch (eng) {
    case "accountbook":
      imageSrc = AccountBook;
      break;
    case "alba":
      imageSrc = Alba;
      break;
    case "deposit":
      imageSrc = Deposit;
      break;
    case "loan":
      imageSrc = Loan;
      break;
    case "lotto":
      imageSrc = Lotto;
      break;
    case "quiz":
      imageSrc = Quiz;
      break;
    case "stock":
      imageSrc = Stock;
      break;
    default:
      imageSrc = "";
      break;
  }

  return (
    <div className="p-4 bg-white hover:bg-blue-200 rounded-2xl w-5/12 m-4">
      <Link to={`/${eng}`}>
        <div className="flex items-center">
          <img className="relative p-4" src={imageSrc} alt={eng} />
        </div>
        <p className="my-1 text-lg font-bold">{kor}</p>
      </Link>
    </div>
  );
};

export default MenuButton;
