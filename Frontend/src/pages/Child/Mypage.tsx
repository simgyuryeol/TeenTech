import React, { useEffect, useState } from "react";
import Modal from "../../components/PMain/ChildAdd";
import Bear from "../../../src/assets/Teen9/Bear.png";
import Dog from "../../../src/assets/Teen9/Dog.png";
import Elephant from "../../../src/assets/Teen9/Elephant.png";
import Koala from "../../../src/assets/Teen9/Koala.png";
import monkey from "../../../src/assets/Teen9/monkey.png";
import Panda from "../../../src/assets/Teen9/Panda.png";
import Sloth from "../../../src/assets/Teen9/Sloth.png";
import axios from "axios";
import { childIdAtom } from "../../recoil/childIdAtom";
import { teen9Atom } from "../../recoil/teen9Atom";
import { useRecoilState } from "recoil";
import Bot from "./Bot/Bot";

const profile = [
  {
    id: 1,
    name: "Bear",
    url: Bear,
  },
  {
    id: 2,
    name: "Dog",
    url: Dog,
  },
  {
    id: 3,
    name: "Elephant",
    url: Elephant,
  },
  {
    id: 4,
    name: "Koala",
    url: Koala,
  },
  {
    id: 5,
    name: "monkey",
    url: monkey,
  },
  {
    id: 6,
    name: "Panda",
    url: Panda,
  },
  {
    id: 7,
    name: "Sloth",
    url: Sloth,
  },
];

const imageMap = {
  Bear: Bear,
  Dog: Dog,
  Elephant: Elephant,
  Koala: Koala,
  monkey: monkey,
  Panda: Panda,
  Sloth: Sloth,
};

const Mypage: React.FC = () => {
  const [isModal, setIsModal] = useState(false);
  const [childId] = useRecoilState(childIdAtom);
  const [teen9url, setTeen9url] = useRecoilState(teen9Atom);
  const [preTeen9, setPreTeen9] = useState("Dog");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 틴구 변경 api
  const changeTeen9 = () => {
    // child id 변경하기
    axios
      .post(`https://j9e207.p.ssafy.io/api/v1/childs/${childId.id}`, {
        avatarImageUrl: preTeen9,
      })
      .then((response) => {
        setTeen9url({ avatarImageUrl: preTeen9 });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeTeen9 = () => {
    // console.log(preTeen9);
    changeTeen9();
  };

  return (
    <div className="pt-24">
      <section className="flex-row justify-start">
        <div className="text-3xl m-4">계좌번호</div>
        <input
          placeholder="  인증코드"
          className="h-10 w-10/12 mb-3 rounded-md"
        ></input>
      </section>
      <section>
        <div className="h-15 bg-white rounded-full m-8">
          <img
            src={imageMap[teen9url.avatarImageUrl]}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <button
          className="text-xl bg-white  drop-shadow"
          onClick={() => setIsModal(true)}
        >
          틴구변경
        </button>
        {isModal && (
          <Modal>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-wrap justify-around">
                {profile.map((item) => (
                  <img
                    key={item.id}
                    src={item.url}
                    className="rounded-xl "
                    style={{
                      width: "calc(33% - 10px)",
                      height: "auto",
                      margin: "5px",
                      border: item.id === selectedId ? "2px solid #FF9FBC" : "",
                    }}
                    onClick={() => {
                      setPreTeen9(item.name);
                      setSelectedId(item.id);
                    }}
                  />
                ))}
              </div>
              <div className="">
                <button
                  className="mt-5 bg-white rounded-2xl drop-shadow mr-3"
                  onClick={() => {
                    setIsModal(false);
                    // setTeen9(preTeen9);
                    handleChangeTeen9();
                  }}
                >
                  변경하기
                </button>
                <button
                  className="mt-5 bg-white rounded-2xl drop-shadow"
                  onClick={() => {
                    setIsModal(false);
                    // setTeen9url({ avatarImageUrl: preTeen9 });
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          </Modal>
        )}
      </section>
    </div>
  );
};

export default Mypage;
