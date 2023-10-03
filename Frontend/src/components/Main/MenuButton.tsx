import React from "react";
import { Link } from "react-router-dom";

// 이미지 불러오기
import AccountBook from "../../../src/assets/main/accountbook.png";
import Alba from "../../../src/assets/main/alba.png";
import Lotto from "../../../src/assets/main/lotto.png";
import Quiz from "../../../src/assets/main/quiz.png";

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
    case "AccountBook":
      imageSrc = AccountBook;
      break;
    case "Alba":
      imageSrc = Alba;
      break;
    case "Lotto":
      imageSrc = Lotto;
      break;
    case "Quiz":
      imageSrc = Quiz;
      break;
    default:
      imageSrc = "";
      break;
  }

  return (
    <div className="px-4 pb-1 rounded-full w-20 flex-shrink-0">
      <Link to={`/${eng}`} style={{ color: "black" }}>
        <div className="flex flex-col items-center ">
          <div className="rounded-full bg-gray-300 p-2">
            <img className="w-full" src={imageSrc} alt={eng} />
          </div>
          <p className="font-bold">{kor}</p>
        </div>
      </Link>
    </div>
  );
};

export default MenuButton;
