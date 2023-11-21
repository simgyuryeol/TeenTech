import React from "react";

interface TableHeaderProp {
  title: string;
}

const TableHeader: React.FC<TableHeaderProp> = ({ title }) => {
  return (
    <th scope="col" className="p-4 font-medium text-gray-500 tracking-wider">
      {title}
    </th>
  );
};

interface TradingRecordProps {
  record: TradingRecord;
  className: string;
}

const TradingRecord: React.FC<TradingRecordProps> = ({ record, className }) => {
  const { date, type, companyName, amount, price } = record;
  let maskedCompanyName: string;
  switch (companyName) {
    case "삼성전자":
      maskedCompanyName = "싸피전자";
      break;
    case "카카오":
      maskedCompanyName = "싸피IT";
      break;
    case "LG화학":
      maskedCompanyName = "싸피화학";
      break;
    case "KB금융":
      maskedCompanyName = "싸피금융";
      break;
    default:
      maskedCompanyName = "";
      break;
  }

  return (
    <tr className={` ${className}`}>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        {date}
        <br />
        {type ? <span>샀어요</span> : <span>팔았어요</span>}
      </td>

      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        {maskedCompanyName}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        {amount}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        {price.toLocaleString()}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        {(amount * price).toLocaleString()}
      </td>
    </tr>
  );
};

interface TradingRecordsProps {
  history: TradingRecord[];
}

const TradingRecords: React.FC<TradingRecordsProps> = (props) => {
  const tableHeaderList = ["날짜", "회사", "개수", "가격", "총 금액"];
  const history = props.history;

  return (
    <div
      className="overflow-x-auto rounded-lg m-3 pl-2 overflow-y-auto"
      style={{ height: "28rem" }}
    >
      <table className="divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {tableHeaderList.map((item, index) => (
              <TableHeader key={index} title={item} />
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {history.map((record, index) => (
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
