import React from "react";
import Back from "./Back";

const Pheader: React.FC = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-50 left-0 bg-white">
      <h2>Header</h2>
      <Back></Back>
    </div>
  );
};

export default Pheader;
