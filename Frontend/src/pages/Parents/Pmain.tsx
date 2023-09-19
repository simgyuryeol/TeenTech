import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { stateAtom } from "../../recoil/stateAtom";

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
        <button>추가</button>
      </div>
    </div>
  );
};

export default Pmain;
