import React from "react";
import TopicButton from "./TopicButton";

interface Topic {
  kor: string;
  eng: string;
  color: string;
}

const TopicList: React.FC = () => {
    const topicList: Topic[] = [
      { kor: "돈, 화폐", eng: "MONEY", color: "#FE9182" },
      { kor: "소득, 지출", eng: "SAVING", color: "#A64DFF" },
      { kor: "투자, 펀드", eng: "INVEST", color: "#12A5FF" },
      // { kor: "물가", eng: "PRICE", color: "#FFDB55" },
      // { kor: "세금", eng: "TAX", color: "#13DB96" },
      // { kor: "세금", eng: "TAX", color: "#F76997" },
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
