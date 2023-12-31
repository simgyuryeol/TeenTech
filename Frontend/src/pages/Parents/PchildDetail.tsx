import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PMenuList from "../../components/PChildDetail/PMenuList";
import Ptotal from "../../components/PChildDetail/Ptotal";
import { useRecoilState } from "recoil";
import { childIdAtom, Child } from "../../recoil/childIdAtom";
import { Link } from "react-router-dom";
import axios from "axios";
import arrow from "../../assets/pmain/chevron.png";

const PchildDetail: React.FC = () => {
  const [childData, setChildData] = useRecoilState(childIdAtom);
  //const { id } = useParams<{ id: string }>();
  //let childId = Number(id) + 1; // OK
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [childDetail, setChildDetail] = useState({
    totalBalance: 0,
    creditRating: "",
    depositNumber: 0,
  });

  const [childList, setChildList] = useState([]);

  const getChildList = () => {
    axios
      .get(`https://j9e207.p.ssafy.io/api/v1/parents/${childData.pid}/child`)
      .then((response) => {
        console.log("자녀리스트");
        setChildList(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   if (id !== undefined) {
  //     const matchingChild = Data.find((child) => child.id === parseInt(id));

  //     if (matchingChild) {
  //       setChildData(matchingChild);
  //     }
  //   }
  // }, [id]);

  const getChildDetail = () => {
    console.log(childData.id);
    axios
      .get(`https://j9e207.p.ssafy.io/api/v1/childs/child/${childData.id}`)
      .then((response) => {
        setChildDetail(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(childData);
    getChildDetail();
    getChildList();
  }, []);

  const handleLinkClick = (id?: number, name?: string) => {
    if (id && name) {
      setChildData((prevData) => ({
        ...prevData,
        id: id,
        name: name,
      }));
    }
  };

  return (
    <div className="pt-24 max-h">
      <div className="flex overflow-x-scroll mx-3 mb-2">
        {childList
          .filter((list) => list.childId !== childData.id)
          .map((list) => (
            <Link
              to={`/Pchilddetail/${list.childId}`}
              key={list.childId}
              className="flex flex-col items-center m-1"
              onClick={() => handleLinkClick(list.childId, list.childName)}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500 mb-2"></div>
              <p>{list.childName}</p>
            </Link>
          ))}
      </div>
      <div
        className="bg-white m-3 rounded-xl mb-4 drop-shadow-xl "
        style={{ backgroundColor: "#2E8CFA" }}
      >
        <div className="flex items-center justify-between">
          <div className="text-xl text-start p-3 pl-5 text-white">
            {childData.name} 남은 용돈
          </div>
          {/* <div className="mr-3" onClick={() => setIsPaneOpen(true)}>
            <img src="../../../src/assets/pmain/ellipsis.png" />
          </div> */}
        </div>
        <div className="text-5xl text-center p-3 pl-5 text-white">
          {childDetail.totalBalance.toLocaleString()}
        </div>
        <div>{/* <MenuList /> */}</div>
        <div className="flex justify-center text-white pb-2">
          <Link to={"/Paccountbook"} className="mx-2 text-white">
            가계부
          </Link>
          <div className="mx-2">|</div>
          <Link to={"/Pinterest"} className="mx-2 text-white">
            용돈 주기 및 이자율 설정
          </Link>
        </div>
      </div>
      {/* <div className="bg-white mx-4 relative rounded-2xl">
        <Ptotal />
      </div> */}
      <Link to="/Ptransfer">
        <div className="text-xl text-black bg-white rounded-xl drop-shadow mx-4 mb-3 p-3">
          용돈 송금하기
        </div>
      </Link>
      <div className="flex justify-between mx-4">
        <div className="flex-col w-6/12">
          <Link to={"/Ploan"}>
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
              <div className="pl-3 text-start text-gray-700">신용등급은?</div>
              <div className="px-2 pb-2 text-end flex justify-end items-center">
                <div className="text-gray-700 text-4xl mr-2">
                  {childDetail.creditRating}
                </div>
                <div className="text-gray-700 text-2xl">등급</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-row w-6/12 mb-6">
          <Link to={"/Pdeposit"}>
            <div
              className="rounded-2xl drop-shadow mb-3 h-3/5"
              style={{
                backgroundColor: "#93C4FF",
              }}
            >
              <div className="text-2xl pt-2 pl-3 text-start text-gray-700">
                예금 내역
              </div>
              <div className="px-3 pt-3 text-end flex justify-end items-center">
                <div className="text-gray-700 text-4xl mr-3">
                  {childDetail.depositNumber}
                </div>
                <div className="text-gray-700 text-2xl">건</div>
                <div className="ml-2">
                  <img src={arrow} style={{ width: "20px" }} />
                </div>
              </div>
            </div>
          </Link>
          <div className="flex h-2/5">
            <Link
              to={"/Plotto"}
              className="text-black w-6/12 text-2xl bg-white p-3 mr-3 rounded-2xl drop-shadow flex justify-center items-center"
            >
              <div>복권</div>
            </Link>
            <Link
              to={`/Pquiz`}
              className=" text-black w-6/12 text-2xl bg-white p-3 rounded-2xl drop-shadow flex justify-center items-center"
            >
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

      {/* {isPaneOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
          }}
          // 이거 있으면 오버레이 배경 클릭하면 모달 닫침
          // onClick={() => setIsPaneOpen(false)}
        >
          <div
            style={{
              transform: isPaneOpen ? "translateY(0)" : "translateY(100%)",
              transition: "transform 2s ease-in-out",
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "50%",
              backgroundColor: "#fff",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p>용돈 보내기</p>
            <p>복권</p>
            <p>퀴즈</p>
            <button onClick={() => setIsPaneOpen(false)}>Close</button>
          </div>
        </div>
      )} */}
      {/* <PMenuList /> */}
    </div>
  );
};

export default PchildDetail;
