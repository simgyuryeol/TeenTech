import React, { useState } from "react";
import Card from "../Common/Card";
import Modal from "../Common/Modal";
import StockNewsDetail from "./StockNewsDetail";


interface StockNewsProps {
  news: News;
}

const StockNews: React.FC<StockNewsProps> = (props) => {
  const { news } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <Card className="p-3">
        <div id="stock-news">
          <p className="text-left">{news.newsDate}</p>
          <p className="font-semibold text-left">
            {news.title}
            <span
              onClick={handleClick}
              className="cursor-pointer text-gray-400 ml-3 text-sm font-light"
            >
              더보기
            </span>
          </p>
        </div>
      </Card>

      {isModalOpen && (
        <Modal>
          <StockNewsDetail news={news} />
          <button onClick={handleClose}>닫기</button>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default StockNews;
