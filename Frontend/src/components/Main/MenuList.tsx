import React from "react";
import MenuButton from "./MenuButton";

interface Menu {
  kor: string;
  eng: string;
}

const MenuList: React.FC = () => {
  const menuList: Menu[] = [
    { kor: "가계부", eng: "AccountBook" },
    { kor: "아르바이트", eng: "Alba" },
    { kor: "예금", eng: "Deposit" },
    { kor: "대출", eng: "Loan" },
    { kor: "퀴즈", eng: "Quiz" },
    { kor: "주식", eng: "Stock" },
    { kor: "복권", eng: "Lotto" },
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
