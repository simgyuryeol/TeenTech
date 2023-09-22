import React from "react";
import DepositList from "../../components/Deposit/DepositList";

const Pdeposit: React.FC = () => {
  return (
    <div className="pt-24">
      <DepositList></DepositList>
      <DepositList></DepositList>
    </div>
  );
};

export default Pdeposit;
