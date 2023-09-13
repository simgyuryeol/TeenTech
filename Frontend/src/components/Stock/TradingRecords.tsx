import React from "react";

interface TableHeaderProp {
  title: string;
}

const TableHeader: React.FC<TableHeaderProp> = ({ title }) => {
  return (
    <th
      scope="col"
      className="p-4 text-xs font-medium text-gray-500 tracking-wider"
    >
      {title}
    </th>
  );
};

interface TradingRecord {
  date: string;
  type: string;
  stock: string;
  amount: string;
  stockPrice: string;
  totalPrice: string;
}

interface TradingRecordProps {
  record: TradingRecord;
  className: string;
}

const TradingRecord: React.FC<TradingRecordProps> = ({ record, className }) => {
  const { date, type, stock, amount, stockPrice, totalPrice } = record;

  return (
    <tr className={` ${className}`}>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        {date}
        <br />
        {type}
      </td>

      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        {stock}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        {amount}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        {stockPrice}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        {totalPrice}
      </td>
    </tr>
  );
};

const TradingRecords: React.FC = () => {
  const tableHeaderList = ["날짜", "종목", "수", "단가", "금액"];
  const sampleRecord: TradingRecord[] = [
    {
      date: "9/13",
      type: "팔았어요",
      stock: "삼성전자",
      amount: "2",
      stockPrice: "1,200",
      totalPrice: "2,400",
    },
    {
      date: "9/11",
      type: "샀어요",
      stock: "삼성전자",
      amount: "2",
      stockPrice: "1,000",
      totalPrice: "2,000",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg m-3">
      <table className="divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {tableHeaderList.map((item, index) => (
              <TableHeader key={index} title={item} />
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {sampleRecord.map((record, index) => (
            <TradingRecord
              key={index}
              record={record}
              className={index % 2 !== 0 ? "bg-gray-50" : "bg-white"}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradingRecords;
