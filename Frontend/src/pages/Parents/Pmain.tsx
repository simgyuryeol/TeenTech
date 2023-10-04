import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { stateAtom } from "../../recoil/stateAtom";
import { childIdAtom } from "../../recoil/childIdAtom";
import ChildAdd from "../../components/PMain/ChildAdd";
import axios from "axios";

const Pmain: React.FC = () => {
  const [child, setChild] = useRecoilState(childIdAtom);
  const [state, setState] = useRecoilState(stateAtom);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 변수
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [childList, setChildList] = useState([]);

  const getChildList = () => {
    axios
      .get(`https://j9e207.p.ssafy.io/api/v1/parents/${child.pid}/child`)
      .then((response) => {
        setChildList(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sendCode = () => {
    // 인증 코드 전송 로직
    console.log(code);
    axios
      .post(`https://j9e207.p.ssafy.io/api/v1/parents/${child.pid}/child`, {
        accountNumber: code,
      })
      .then((response) => {
        console.log(response);
        console.log(`${name}을 추가했습니다!`);
        setCode("");
        getChildList();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(`인증 코드(${code})를 ${name}에게 전송합니다.`);
    // setCode("");
    // closeModal();
  };

  const getchild = (item) => {
    setChild((prevChild) => ({
      ...prevChild,
      id: item.childId,
      name: item.childName,
    }));
  };

  useEffect(() => {
    getChildList();
    console.log(child);
    // state 1 -> 부모 0 -> 자녀
    setState({ id: 1 });
  }, []);

  return (
    <div className="">
      <div className="p-5">
        <h2>우리 가족!!!!!!</h2>
      </div>
      <div className="bg-white mx-4 p-3 rounded-2xl">
        <ul className="">
          {childList.map((list, index) => (
            <li key={index} className="my-2 flex items-center py-3">
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
                  to={`/Pchilddetail/${list.childId}`}
                  key={list.childId}
                  className="text-black"
                  onClick={() => getchild(list)}
                >
                  {list.childName}
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
          {/* <h2>자녀 이름을 입력해주세요</h2> */}
          {/* <div className="mt-1 mb-4"> */}
          {/* <label htmlFor="name">이름: </label> */}
          {/* <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                backgroundColor: "#E5F0F8",
                borderRadius: "15px",
                paddingLeft: "5px",
              }}
            />
          </div> */}
          <h2>자녀에게 발급된 </h2>
          <h2>계좌번호를 입력해주세요</h2>
          <div className="mt-1 mb-4">
            {/* <label htmlFor="name">계좌번호: </label> */}
            <input
              id="accountnumber"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                backgroundColor: "#E5F0F8",
                borderRadius: "15px",
                paddingLeft: "5px",
              }}
            />
          </div>
          {/* <div className="my-4">
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
          </div> */}
          <div>
            <button className="mr-4" onClick={closeModal}>
              Close
            </button>
            <button onClick={sendCode}>전송</button>
          </div>
        </ChildAdd>
      )}
    </div>
  );
};

export default Pmain;
