import React from "react";
import { Link } from "react-router-dom";

const Pmain: React.FC = () => {
  const childId = 1;
  return (
    <div className="mt-12">
      <h2>부모-메인페이지</h2>
      <Link to={`/Pchilddetail/${childId}`}>
        규렬이 지갑 구경
      </Link>
    </div>
  );
};

export default Pmain;
