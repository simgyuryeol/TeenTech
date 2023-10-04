import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import useDate from "../../hooks/useDate";

interface FormBlockProps {
  title: string;
  value: number;
}

const FormBlock: React.FC<FormBlockProps> = (props) => {
  const formattedValue = props.value.toLocaleString();

  return (
    <div className="flex items-center justify-between">
      <p className="text-md text-gray-500">{props.title}</p>
      <p className="mb-4 text-2xl font-bold text-right">{formattedValue}원</p>
    </div>
  );
};

interface BuyStockProps {
  companyName: string;
  price: number;
  onClose: () => void;
}

const BuyStock: React.FC<BuyStockProps> = (props) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const today = new Date();
  const todayToString = useDate(today);

  const handleBuyStock = () => {
    console.log({
      companyName: props.companyName,
      date: todayToString,
      amount: quantity,
    });

    axios
      // .post(import.meta.env.VITE_BASE_URL + `/api/v1/${child_id}/deposits/create`, {
      .post(import.meta.env.VITE_BASE_URL + `/api/v1/34/investments/buy`, {
        companyName: props.companyName,
        date: todayToString,
        amount: quantity,
      })
      .then((response) => {
        console.log(response.data);
        setIsOrdered(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    props.onClose();
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (!newValue) {
      setQuantity(0);
      return;
    }

    const parsedValue = parseFloat(newValue);
    setQuantity(parsedValue);
  };

  return (
    <React.Fragment>
      {isOrdered ? (
        <div>
          <div className="flex flex-col items-center mb-4">
            <Icon icon="mdi:check-bold" className="w-24 h-24 text-green-700" />
            <p className="px-6 py-2 text-gray-600 text-lg text-center">
              <span className="font-bold text-gray-800 text-xl">
                {props.companyName}
              </span>
              주식을 <br />
              <span className="font-bold text-gray-800 text-xl">
                {quantity}
              </span>
              개 샀어요.
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
        <div>
          <div className="p-2">
            <p className="text-3xl font-bold mb-6">{props.companyName}</p>

            <FormBlock title="지금 가격" value={props.price} />

            <div className="flex items-center justify-between">
              <p className="text-md text-gray-500">수량</p>
              <div className="flex items-center mb-2">
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 px-3 py-1 text-2xl font-bold text-right border border-gray-300 rounded-lg"
                />
                <p className="ml-1 text-2xl font-bold text-right">개</p>
              </div>
            </div>

            <p className="text-sm text-red-500 text-right">
              최대 n개까지 살 수 있어요!
            </p>

            <span className="block w-56 h-1 my-3 bg-gray-100 rounded-lg"></span>
            <FormBlock title="총 가격" value={quantity * props.price} />
            <button
              type="button"
              className={`w-56 px-3 py-3 m-auto text-sm text-black  border border-black rounded-lg shadow ${
                quantity === 0 ? "bg-gray-200" : "bg-red-300"
              }`}
              onClick={handleBuyStock}
              disabled={quantity === 0}
            >
              살래요
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BuyStock;
