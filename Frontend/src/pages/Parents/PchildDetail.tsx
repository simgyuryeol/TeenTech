import React, { useEffect } from "react";
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
    <div className="pt-24">
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
      <div className="bg-white mx-4 relative rounded-2xl">
        <Ptotal />
      </div>
      <div
        className="rounded-2xl drop-shadow mb-3"
        style={{
          backgroundColor: "#68B9E3",
        }}
        // onClick={clickStock}
      >
        <div className="text-2xl pt-2 pl-3 text-start text-gray-700">
          규렬이의 신용 등급은?
        </div>
        <div>
          <div className="pl-3 text-start text-gray-700">
            아르바이트를 통해 등급을 올려주세요
          </div>
          <div className="px-3 pb-2 text-end flex justify-end items-center">
            <div className="text-gray-700 text-4xl mr-3">5</div>
            <div className="text-gray-700 text-2xl">등급</div>
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl drop-shadow mb-3"
        style={{
          backgroundColor: "#68B9E3",
        }}
        // onClick={clickStock}
      >
        <div className="text-2xl pt-2 pl-3 text-start text-gray-700">
          규렬이 예금 내역 확인하기
        </div>
        <div>
          <div className="pl-3 text-start text-gray-700"></div>
          <div className="px-3 pb-2 text-end flex justify-end items-center">
            <div className="text-gray-700 text-4xl mr-3">3</div>
            <div className="text-gray-700 text-2xl">건</div>
          </div>
        </div>
      </div>
      <PMenuList />
    </div>
  );
};

export default PchildDetail;
