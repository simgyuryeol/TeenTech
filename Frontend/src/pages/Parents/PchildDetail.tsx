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

  return (
    <div className="pt-24">
      <div className="flex overflow-x-scroll mx-3 mb-2">
        {Data.filter((list) => list.id !== childData.id).map((list) => (
          <Link
            to={`/Pchilddetail/${list.id}`}
            key={list.id}
            className="flex flex-col items-center m-1"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500 mb-2"></div>
            <p>{list.name}</p>
          </Link>
        ))}
      </div>
      <div className="bg-white mx-4">
        <Ptotal />
      </div>
      <PMenuList />
    </div>
  );
};

export default PchildDetail;
