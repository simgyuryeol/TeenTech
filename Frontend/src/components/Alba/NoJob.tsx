import React from "react";

interface NoJobProps {
  status: string;
}

const NoJob: React.FC<NoJobProps> = ({ status }) => {
  return (
    <div className="bg-white bg-opacity-50 m-5 rounded-xl shadow-md p-2 border-4 border-dotted  border-white">
      <p>{status} 아르바이트가 없어요.</p>
    </div>
  );
};

export default NoJob;
