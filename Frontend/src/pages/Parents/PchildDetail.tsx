import React from "react";
import { useParams } from "react-router-dom";
import PMenuList from "../../components/PChildDetail/PMenuList";

const PchildDetail: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div className="mt-12">
      <p className="font-bold text-lg">{id}번 자녀 상세 보기</p>
      <PMenuList />
    </div>
  );
};

export default PchildDetail;
