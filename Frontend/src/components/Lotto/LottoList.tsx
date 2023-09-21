import React from "react";

interface Winning {
  id: number;
  date: string;
  price: number;
}

const Data: Winning[] = [
  { id: 1, date: "2023-07-27", price: 5000 },
  { id: 2, date: "2023-08-4", price: 5000 },
  { id: 2, date: "2023-08-4", price: 5000 },
  { id: 2, date: "2023-08-4", price: 5000 },
];

const LottoList: React.FC = () => {
  return (
    <div>
      <div className="p-3">당첨내역</div>
      <div>
        {Data.map((winning, index) => (
          <div
            key={index}
            className="m-3 rounded-2xl"
            style={{ backgroundColor: "#D2DEE5" }}
          >
            <div className="text-start p-3">{winning.date}</div>
            <div className="text-end  p-3">{winning.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LottoList;
