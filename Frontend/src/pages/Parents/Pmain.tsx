import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { stateAtom, state } from "../../recoil/stateAtom";

const Pmain: React.FC = () => {
  const [state, setState] = useRecoilState(stateAtom);

  useEffect(() => {
    setState({ id: 1 });
  }, []);

  return (
    <div className="pt-24">
      <h2>부모-메인페이지</h2>
      <Link to={`/Pchilddetail/${1}`}>규렬이 지갑 구경</Link>
      <Link to={`/Pchilddetail/${2}`}>세진이 지갑 구경</Link>
    </div>
  );
};

export default Pmain;
