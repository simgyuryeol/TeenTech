import React from "react";
import { Link } from "react-router-dom";

// 이미지 불러오기
import money from "../../../src/assets/quiz/money.png";
import investment from "../../../src/assets/quiz/investment.png";
import price from "../../../src/assets/quiz/price.png";
import tax from "../../../src/assets/quiz/tax.png";
import asset from "../../../src/assets/quiz/asset.png";

interface Topic {
  kor: string;
  eng: string;
  color: string;
}

interface TopicButtonProps {
  topic: Topic;
}

const TopicButton: React.FC<TopicButtonProps> = ({ topic }) => {
  const { kor, eng, color } = topic;
  let imageSrc;

  switch (eng) {
    case "money":
      imageSrc = money;
      break;
    case "investment":
      imageSrc = investment;
      break;
    case "price":
      imageSrc = price;
      break;
    case "tax":
      imageSrc = tax;
      break;
    case "asset":
      imageSrc = asset;
      break;
    default:
      imageSrc = "";
      break;
  }

  return (
    <div
      // className="p-2 rounded-xl w-5/12 m-2 bg-white"
      className="p-2 rounded-xl w-36 h-36 my-2 flex items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <Link
        to={`/QuizList/${eng}`}
        className="text-black flex flex-col items-center"
      >
        <img className="relative w-16 h-16" src={imageSrc} alt={eng} />
        <p className="my-2 text-2xl font-bold text-gray-50">{kor}</p>
      </Link>
    </div>
  );
};

export default TopicButton;
