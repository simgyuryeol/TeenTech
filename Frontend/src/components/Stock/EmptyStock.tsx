import React from "react";

const EmptyStock: React.FC = () => {
  return (
    <div
      className="bg-white bg-opacity-50 m-5 rounded-xl shadow-md p-2 border-4 border-dotted  border-white"
      id="my-stock"
    >
      지금은 가지고 있는 주식이 없어요. <br />
      주식시장을 둘러보고 원하는 주식을 사볼까요?
    </div>
  );
};

export default EmptyStock;
