import React from "react";
import { useNavigate } from "react-router-dom";

const Back: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2 onClick={goBack}>뒤로가기</h2>
    </div>
  );
};

export default Back;
