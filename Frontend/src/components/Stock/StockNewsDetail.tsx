import React from "react";

interface StockNewsDetailProps {
  news: News;
}

const StockNewsDetail: React.FC<StockNewsDetailProps> = (props) => {
  const { title, content, newsDate } = props.news;

  return (
    <div className="m-3 bg-gray-200 p-4 rounded-md">
      <p className="font-bold text-2xl text-center">틴 구 일 보</p>
      <p className="text-right">{newsDate}</p>
      <p className="font-bold text-xl my-1 bg-white p-2 rounded-xl">{title}</p>
      <p className="mt-3 text-lg bg-white p-2 rounded-xl overflow-auto max-h-48">{content}</p>
    </div>
  );
};

export default StockNewsDetail;
