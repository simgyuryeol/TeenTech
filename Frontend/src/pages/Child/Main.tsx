import React from "react";
import Total from "../../components/Main/Total";
import MenuList from "../../components/Main/MenuList";

const Main: React.FC = () => {
  return (
    <div
      className="pt-16 max-h"
      style={{ backgroundColor: "#ABC3D0", overflow: "croll" }}
    >
      <div className="mx-4 rounded-2xl" style={{ backgroundColor: "white" }}>
        <Total />
      </div>
      <div>
        <MenuList />
      </div>
    </div>
  );
};

export default Main;
