import React, { useEffect } from "react";
import Total from "../../components/Main/total";
import MenuList from "../../components/Main/MenuList";
import { useRecoilState } from "recoil";
import { stateAtom, state } from "../../recoil/stateAtom";

const Main: React.FC = () => {
  const [state, setState] = useRecoilState(stateAtom);
  useEffect(() => {
    setState({ id: 2 });
  }, []);
  const id = 1;
  return (
    <div
      className="pt-4 max-h"
      style={{ backgroundColor: "#ABC3D0", overflow: "croll" }}
    >
      <div className="mx-4 rounded-2xl" style={{ backgroundColor: "white" }}>
        <Total childId={id} />
      </div>
      <div>
        <MenuList />
      </div>
    </div>
  );
};

export default Main;
