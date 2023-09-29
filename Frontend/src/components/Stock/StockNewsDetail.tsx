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
      <p className="font-bold text-2xl text-center">틴 구 일 보</p>
      <p className="text-right">{date}</p>
      <p className="font-bold text-xl my-1 bg-gray-200 p-2 rounded-xl">{title}</p>
      <p className="mt-3 bg-gray-200 p-2 rounded-xl">{content}</p>
    </div>
  );
};

export default StockNewsDetail;
