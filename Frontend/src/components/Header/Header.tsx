import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const menulist = [
  {
    link: "/AccountBook",
    name: "가계부",
  },
  {
    link: "/Alba",
    name: "아르바이트",
  },
  {
    link: "/Deposit",
    name: "예금",
  },
  {
    link: "/Loan",
    name: "대출",
  },
  {
    link: "/Quiz",
    name: "퀴즈",
  },
  {
    link: "/Stock",
    name: "주식",
  },
  {
    link: "/Lotto",
    name: "복권",
  },
  {
    link: "/Mypage",
    name: "마이페이지",
  },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const locationNow = useLocation();
  const [now, setNow] = useState<string>("/");
  const [nowPath, setNowPath] = useState<string>("/");
  const navigate = useNavigate();

  useEffect(() => {
    for (let i = 0; i < menulist.length; i++) {
      if (menulist[i].link.includes(locationNow.pathname)) {
        setNow(menulist[i].name);
        setNowPath(locationNow.pathname);
      }
    }
  }, [locationNow]);

  // 버튼 클릭시 메뉴 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link: string) => {
    toggleMenu();
    navigate(link, { replace: true });
  };

  const goBack = () => {
    console.log(nowPath);
    console.log(locationNow.pathname);
    if (nowPath === locationNow.pathname) {
      navigate("/Main");
    } else {
      navigate(-1);
    }
  };

  if (locationNow.pathname === "/Main") return null;
  return (
    <div className="fixed inset-x-0 top-0 z-50 left-0">
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleMenu}
        ></div>
      )}
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex justify-center items-center">
            {nowPath !== locationNow.pathname && (
              <div
                onClick={goBack}
                className="inline-flex items-center justify-center p-2 w-11 h-11"
              >
                <img src="../../../src/assets/main/back.png" />
              </div>
            )}

            <div className="p-2">{now}</div>
          </div>
          <div className="flex w-2/6 justify-end">
            <div className="p-2 w-11 h-11">
              <Link to="/Main">
                <img src="../../../src/assets/main/home.png" />
              </Link>
            </div>
            <div onClick={toggleMenu} className="p-2 w-11 h-11">
              <img src="../../../src/assets/main/hamburger.png" />
            </div>
          </div>
        </div>

        {/* 메뉴 */}
        <div
          className={`fixed inset-y-0 right-0 transform ${
            isMenuOpen ? "" : "translate-x-full"
          } bg-white w-64 p-4 transition-transform duration-300 ease-in-out shadow-lg`}
        >
          {/* 메뉴 내용 */}
          <div className="flex jusfify-end">
            <div onClick={toggleMenu} className="w-10">
              <img src="../../../src/assets/main/close.png" />
            </div>
          </div>
          <ul>
            {menulist.map((menu) => (
              <li
                key={menu.link}
                onClick={() => handleLinkClick(menu.link)}
                style={{ padding: "10px" }}
              >
                <Link to={menu.link} style={{ color: "black" }}>
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
