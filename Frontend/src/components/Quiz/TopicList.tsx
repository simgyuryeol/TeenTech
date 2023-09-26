import React from "react";
import TopicButton from "./TopicButton";

interface Topic {
  kor: string;
  eng: string;
  color: string;
}

const TopicList: React.FC = () => {
    const topicList: Topic[] = [
      { kor: "돈, 화폐", eng: "money", color: "#FF5733" },
      { kor: "소득, 지출", eng: "asset", color: "#3498DB" },
      { kor: "투자, 펀드", eng: "investment", color: "#27AE60" },
      { kor: "물가", eng: "price", color: "#F1C40F" },
      { kor: "세금", eng: "tax", color: "#E74C3C" },
    ];
  
    return (
      <div className="flex flex-wrap justify-around m-3">
        {topicList.map((topic, index) => (
          <TopicButton key={index} topic={topic}  />
        ))}
      </div>
    );
  };

export default TopicList;
