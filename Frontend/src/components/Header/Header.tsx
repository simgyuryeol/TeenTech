import React, { useState } from "react";
import Back from "./Back";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // 버튼 클릭시 메뉴 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative z-10	">
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleMenu}
        ></div>
      )}
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Header
            </span>
          </a>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-hamburger"
            aria-expanded={isMenuOpen}
          >
            버튼
          </button>
        </div>

        <Back></Back>
        {/* 메뉴 */}
        <div
          className={`fixed inset-y-0 right-0 transform ${
            isMenuOpen ? "" : "translate-x-full"
          } bg-white w-64 p-4 transition-transform duration-300 ease-in-out shadow-lg`}
        >
          {/* 메뉴 내용 */}
          <h2 className="text-2xl mb-4">메뉴 리스트</h2>
          <div onClick={toggleMenu}>닫침</div>
          <ul>
            <li>메뉴 항목 1</li>
            <li>메뉴 항목 2</li>
            <li>메뉴 항목 3</li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
