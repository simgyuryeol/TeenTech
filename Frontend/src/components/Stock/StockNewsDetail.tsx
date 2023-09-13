import React from "react";

interface News {
  title: string;
  content: string;
  date: string;
}

interface StockNewsDetailProps {
  news: News;
}

const StockNewsDetail: React.FC<StockNewsDetailProps> = (props) => {
  const { title, content, date } = props.news;

  return (
    <div className="m-3">
      <p className="font-bold text-lg">{title}</p>
      <p className="text-right">{date}</p>
      <p>{content}</p>
    </div>
  );
};

export default StockNewsDetail;
