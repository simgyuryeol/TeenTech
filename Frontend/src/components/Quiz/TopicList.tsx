import React from "react";
import TopicButton from "./TopicButton";

interface Topic {
  kor: string;
  eng: string;
}

const TopicList: React.FC = () => {
    const topicList: Topic[] = [
      { kor: "돈, 화폐", eng: "money" },
      { kor: "소득, 지출", eng: "asset" },
      { kor: "투자, 펀드", eng: "investment" },
      { kor: "물가", eng: "price" },
      { kor: "세금", eng: "tax" },
    ];
  
    return (
      <div className="flex flex-wrap justify-around m-3">
        {topicList.map((topic, index) => (
          <TopicButton key={index} topic={topic} />
        ))}
      </div>
    );
  };

export default TopicList;
