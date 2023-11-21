import React from "react";
import PMenuButton from "./PMenuButton";

interface Menu {
  kor: string;
  eng: string;
}

const PMenuList: React.FC = () => {
  const menuList: Menu[] = [
    { kor: "용돈/이자율 설정", eng: "interest" },
    { kor: "아르바이트", eng: "alba" },
    { kor: "가계부", eng: "accountbook" },
    { kor: "예금", eng: "deposit" },
    { kor: "대출", eng: "loan" },
    { kor: "퀴즈", eng: "quiz" },
    { kor: "복권", eng: "lotto" },
  ];

  return (
    <div className="flex flex-wrap justify-between">
      {menuList.map((menu, index) => (
        <PMenuButton key={index} menu={menu} />
      ))}
    </div>
  );
};

export default PMenuList;
