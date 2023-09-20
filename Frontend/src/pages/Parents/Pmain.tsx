import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { stateAtom } from "../../recoil/stateAtom";
import ChildAdd from "../../components/AccountBook/PMain/ChildAdd";

const Data = [
  {
    id: 1,
    name: "규렬",
    profileImage: "URL_TO_PROFILE_IMAGE_1", // 각 사용자의 프로필 이미지 URL 추가
  },
  {
    id: 2,
    name: "세진",
    profileImage: "URL_TO_PROFILE_IMAGE_2", // 각 사용자의 프로필 이미지 URL 추가
  },
  {
    id: 3,
    name: "재범",
    profileImage: "URL_TO_PROFILE_IMAGE_3", // 각 사용자의 프로필 이미지 URL 추가
  },
];

const Pmain: React.FC = () => {
  const [state, setState] = useRecoilState(stateAtom);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 변수
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const generateCode = () => {
    // 인증 코드 생성 로직
    const generatedCode = "ABC123"; // 예시로 고정된 인증 코드를 생성합니다.
    setCode(generatedCode);
  };

  const sendCode = () => {
    // 인증 코드 전송 로직
    console.log(`인증 코드(${code})를 ${name}에게 전송합니다.`);
    setCode("");
    closeModal();
  };

  useEffect(() => {
    setState({ id: 1 });
  }, []);

  return (
    <div className="">
      <div className="p-5">
        <h2>우리 가족</h2>
      </div>
      <div className="bg-white mx-4 p-3 rounded-2xl">
        <ul className="">
          {Data.map((list) => (
            <li key={list.id} className="my-2 flex items-center py-3">
              <div
                className="ml-2 bg-black rounded-full mr-4"
                style={{ width: "40px", height: "40px" }}
              >
                {/* <img
                  src={list.profileImage}
                  alt={`${list.name}의 프로필 사진`}
                  width={40}
                  height={40}
                  className="rounded-full"
                /> */}
              </div>
              <div className="link-wrapper">
                <Link
                  to={`/Pchilddetail/${list.id}`}
                  key={list.id}
                  className="text-black"
                >
                  {list.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-end mr-4 my-3">
        <button onClick={openModal}>추가</button>
      </div>
      {isModalOpen && (
        <ChildAdd>
          <h2>누굴 추가할거야?</h2>
          <div className="my-4">
            <label htmlFor="name">이름: </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ backgroundColor: "#E5F0F8", borderRadius: "15px" }}
            />
          </div>
          <div className="my-4">
            {code ? (
              <div className="text-center">
                <p>인증 코드: {code}</p>
                <button onClick={sendCode}>전송</button>
              </div>
            ) : (
              <>
                <button onClick={generateCode}>인증 코드 생성</button>
              </>
            )}
          </div>
          <button onClick={closeModal}>Close</button>
        </ChildAdd>
      )}
    </div>
  );
};

export default Pmain;
