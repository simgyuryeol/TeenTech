import React from "react";

interface Topic {
  kor: string;
  eng: string;
}

interface TopicButtonProps {
  topic: Topic;
}

const TopicButton: React.FC<TopicButtonProps> = (props) => {
  const {kor, eng} = props.topic;

  return (
    <div className="mt-10">
      <img src="" alt={eng} />
      <p>{kor}</p>
    </div>
  );
};

export default TopicButton;
