import React from "react";

interface TimeDisplayProps {
  value: number;
  type: string;
  isDanger: boolean;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ value, type, isDanger }) => {
  return (
    // <div className={isDanger ? "countdown danger" : "countdown"}>
    <div className="flex text-2xl mx-2">
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default TimeDisplay;
