import React from "react";
import MenuButton from "./MenuButton";

interface Menu {
  kor: string;
  eng: string;
}

const MenuList: React.FC = () => {
  const menuList: Menu[] = [
    { kor: "가계부", eng: "AccountBook" },
    { kor: "알바", eng: "Alba" },
    // { kor: "예금", eng: "Deposit" },
    // { kor: "대출", eng: "Loan" },
    { kor: "퀴즈", eng: "Quiz" },
    // { kor: "주식", eng: "Stock" },
    { kor: "복권", eng: "Lotto" },
    // { kor: "틴구", eng: "" },
  ];

  return (
    <div
      className="flex justify-between mx-2"
      style={{
        overflowY: "auto", // 스크롤을 추가
      }}
    >
      {menuList.map((menu, index) => (
        <MenuButton key={index} menu={menu} />
      ))}
    </div>
  );
};

export default MenuList;
