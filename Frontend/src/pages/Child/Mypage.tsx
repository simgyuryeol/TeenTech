import React, { useState } from "react";
import Modal from "../../components/PMain/ChildAdd";

const profile = [
  {
    id: 1,
    url: "../../../src/assets/Teen9/Bear.png",
  },
  {
    id: 2,
    url: "../../../src/assets/Teen9/Dog.png",
  },
  {
    id: 3,
    url: "../../../src/assets/Teen9/Elephant.png",
  },
  {
    id: 4,
    url: "../../../src/assets/Teen9/Koala.png",
  },
  {
    id: 5,
    url: "../../../src/assets/Teen9/monkey.png",
  },
  {
    id: 6,
    url: "../../../src/assets/Teen9/Panda.png",
  },
  {
    id: 7,
    url: "../../../src/assets/Teen9/Sloth.png",
  },
];

const Mypage: React.FC = () => {
  const [isModal, setIsModal] = useState(false);
  const [teen9, setTeen9] = useState("../../../src/assets/Teen9/Dog.png");
  const [preTeen9, setPreTeen9] = useState("../../../src/assets/Teen9/Dog.png");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="pt-24">
      <section className="flex-row justify-start">
        <div className="text-3xl m-4">인증코드</div>
        <input
          placeholder="  인증코드"
          className="h-10 w-10/12 mb-3 rounded-md"
        ></input>
      </section>
      <section>
        <div className="h-15 bg-white rounded-full m-8">
          <img src={teen9} style={{ width: "100%", height: "100%" }} />
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
                      setPreTeen9(item.url);
                      setSelectedId(item.id);
                    }}
                  />
                ))}
              </div>
              <button
                className="mt-5 bg-white rounded-2xl drop-shadow"
                onClick={() => {
                  setIsModal(false);
                  setTeen9(preTeen9);
                }}
              >
                변경하기
              </button>
            </div>
          </Modal>
        )}
      </section>
    </div>
  );
};

export default Mypage;
