import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PMenuList from "../../components/PChildDetail/PMenuList";
import Ptotal from "../../components/PChildDetail/Ptotal";
import { useRecoilState } from "recoil";
import { childIdAtom, Child } from "../../recoil/childIdAtom";
import { Link } from "react-router-dom";

const Data: Child[] = [
  {
    id: 1,
    name: "규렬",
  },
  {
    id: 2,
    name: "세진",
  },
  {
    id: 3,
    name: "재범",
  },
  {
    id: 4,
    name: "은비",
  },
  {
    id: 5,
    name: "명진",
  },
];

const PchildDetail: React.FC = () => {
  const [childData, setChildData] = useRecoilState(childIdAtom);
  const { id } = useParams<{ id: string }>();
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      const matchingChild = Data.find((child) => child.id === parseInt(id));

      if (matchingChild) {
        setChildData(matchingChild);
      }
    }
  }, [id]);

  const handleLinkClick = (id?: number, name?: string) => {
    if (id && name) {
      setChildData({ id, name });
    }
  };

  return (
    <div className="pt-24 max-h">
      <div className="flex overflow-x-scroll mx-3 mb-2">
        {Data.filter((list) => list.id !== childData.id).map((list) => (
          <Link
            to={`/Pchilddetail/${list.id}`}
            key={list.id}
            className="flex flex-col items-center m-1"
            onClick={() => handleLinkClick(list.id, list.name)}
          >
            <div className="w-16 h-16 rounded-full bg-blue-500 mb-2"></div>
            <p>{list.name}</p>
          </Link>
        ))}
      </div>
      <div
          className="bg-white m-3 rounded-xl mb-4 drop-shadow-xl "
          style={{backgroundColor:'#2E8CFA'}}
      >
        <div className="flex items-center justify-between">
          <div
            className="text-xl text-start p-3 pl-5 text-white"
          >
            {Data[id-1].name} 남은 용돈
        </div>
          <div className="mr-3" onClick={() => setIsPaneOpen(true)}>
            <img src="../../../src/assets/pmain/ellipsis.png" /></div>
          </div>
          <div
            className="text-5xl text-center p-3 pl-5 text-white"
          >
            100000
          </div>
          <div>
            {/* <MenuList /> */}
        </div>
        <div className="flex justify-center text-white pb-2">
          <Link to={'/Paccountbook'} className="mx-2 text-white">가계부</Link>
          <div className="mx-2">|</div>
          <Link to={'/Pinterest'} className="mx-2 text-white">용돈 주기 및 이자율 설정</Link>
        </div>
      </div>
      {/* <div className="bg-white mx-4 relative rounded-2xl">
        <Ptotal />
      </div> */}
      <div className="flex justify-between mx-4">
        <div className="flex-col w-6/12">
          <Link to={'/Ploan'}>
            <div className="text-black h-2/7 text-xl bg-white rounded-2xl drop-shadow p-3 mb-3 mr-4">
              대출 현황
            </div>
          </Link>
      <div
        className="rounded-2xl drop-shadow mb-3 mr-4 h-3/5"
        style={{
          backgroundColor: "#FF9FBC",
        }}
        // onClick={clickStock}
      >
        <div className="text-2xl pt-2 pl-3 text-start text-gray-700">
          신용 등급
        </div>
        <div>
          <div className="pl-3 text-start text-gray-700">
            신용등급은?
          </div>
          <div className="px-2 pb-2 text-end flex justify-end items-center">
            <div className="text-gray-700 text-4xl mr-2">5</div>
            <div className="text-gray-700 text-2xl">등급</div>
          </div>
        </div>
      </div>

      </div>
      <div className="flex-row w-6/12 mb-6">
      <Link to={'/Pdeposit'}>    
      <div
        className="rounded-2xl drop-shadow mb-3 h-3/5"
        style={{
          backgroundColor: "#93C4FF",
        }}
        // onClick={clickStock}
      >
        <div className="text-2xl pt-2 pl-3 text-start text-gray-700">
          예금 내역
        </div>
          <div className="px-3 pb-2 text-end flex justify-end items-center">
            <div className="text-gray-700 text-4xl mr-3">3</div>
            <div className="text-gray-700 text-2xl">건</div>
            <div>화살표</div>
        </div>
        </div>
      </Link>
          <div className="flex h-2/5">
            <Link to={'/Plotto'} className="text-black w-6/12 text-2xl bg-white p-3 mr-3 rounded-2xl drop-shadow flex justify-center items-center">
              <div>복권</div>
            </Link>
            <Link to={`/Pquiz`} className=" text-black w-6/12 text-2xl bg-white p-3 rounded-2xl drop-shadow flex justify-center items-center">
                <div>퀴즈</div>
            </Link>
          </div>
        </div>
      </div>
      <Link to={`/Palba`}>
        <div className="text-xl text-black bg-white rounded-xl drop-shadow mx-4 my-1 p-3">
          <div>아르바이트 현황 확인하기</div>
        </div>
      </Link>
      
      {isPaneOpen && (
        <div 
          style={{
            position:'fixed',
            top :0,
            left :0,
            width :'100%',
            height :'100%',
            backgroundColor :'rgba(0,0,0,.5)',
          }}
          // 이거 있으면 오버레이 배경 클릭하면 모달 닫침
          // onClick={() => setIsPaneOpen(false)}
        >
        <div 
          style={{
            transform : isPaneOpen ? 'translateY(0)' : 'translateY(100%)',
            transition :'transform 2s ease-in-out',
            position :'fixed',
            bottom :0,
            left :0,
            width :'100%',
            height :'50%', 
            backgroundColor:'#fff', 
          }}
          onClick={(e) => e.stopPropagation()}
        >
            <p>용돈 보내기</p>
            <p>복권</p>
            <p>퀴즈</p>
          <button onClick={() => setIsPaneOpen(false)}>Close</button>
        </div>
      </div>  
    )}
      {/* <PMenuList /> */}
    </div>
  );
};

export default PchildDetail;
