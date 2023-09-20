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
}

interface TopicButtonProps {
  topic: Topic;
}

const TopicButton: React.FC<TopicButtonProps> = ({ topic }) => {
  const { kor, eng } = topic;
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
    <div className="p-2 bg-white rounded-xl w-5/12 m-2">
      <Link to={`/QuizList/${eng}`} className="text-black flex flex-col items-center">
        <img className="relative w-12 h-12" src={imageSrc} alt={eng} />
        <p className="my-1 text-lg font-bold">{kor}</p>
      </Link>
    </div>
  );
};

export default TopicButton;
