import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface FormBlockProps {
  title: string;
  value: string;
}

const FormBlock: React.FC<FormBlockProps> = (props) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-md text-gray-500">{props.title}</p>
      <p className="mb-4 text-2xl font-bold text-right">{props.value}</p>
    </div>
  );
};

interface SellStockProps {
  onClose: () => void;
}

const SellStock: React.FC<SellStockProps> = ({ onClose }) => {
  const [isOrdered, setIsOrdered] = useState(false);

  const handleSellStock = () => {
    console.log("주식 팜");
    setIsOrdered(true);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <React.Fragment>
      {isOrdered ? (
        <div>
          <div className="flex flex-col items-center mb-4">
            <Icon icon="mdi:check-bold" className="w-24 h-24 text-green-700" />
            <p className="px-6 py-2 text-gray-600 text-lg text-center">
              <span className="font-bold text-gray-800 text-xl">삼성전자</span>
              주식을 <br />
              <span className="font-bold text-gray-800 text-xl">2</span>개
              팔았어요.
            </p>
          </div>
          <button
            type="button"
            className="w-56 px-3 py-3 mb-2 text-sm text-black bg-green-200 border border-black rounded-lg shadow"
            onClick={handleClose}
          >
            확인
          </button>
        </div>
      ) : (
        <div className="p-2">
          <p className="text-3xl font-bold mb-6">삼성전자</p>

          <FormBlock title="지금 가격" value="1,200원" />
          <FormBlock title="수량" value="2개" />

          <p className="text-sm text-blue-600 text-right">
            최대 n개까지 팔 수 있어요!
          </p>

          <span className="block w-56 h-1 my-3 bg-gray-100 rounded-lg"></span>
          <FormBlock title="총 가격" value="2,400원" />

          <button
            type="button"
            className="w-56 px-3 py-3 m-auto text-sm text-black bg-blue-300 border border-black rounded-lg shadow"
            onClick={handleSellStock}
          >
            팔래요
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default SellStock;
