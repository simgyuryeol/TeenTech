import React from "react";
import MenuButton from "./MenuButton";

interface Menu {
  kor: string;
  eng: string;
}

const MenuList: React.FC = () => {
  const menuList: Menu[] = [
    { kor: "가계부", eng: "accountbook" },
    { kor: "아르바이트", eng: "alba" },
    { kor: "예금", eng: "deposit" },
    { kor: "대출", eng: "loan" },
    { kor: "퀴즈", eng: "quiz" },
    { kor: "주식", eng: "stock" },
    { kor: "복권", eng: "lotto" },
    { kor: "틴구", eng: "" },
  ];

  return (
    <div className="flex flex-wrap justify-between">
      {menuList.map((menu, index) => (
        <MenuButton key={index} menu={menu} />
      ))}
    </div>
  );
};

export default MenuList;
