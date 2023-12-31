import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { stateAtom } from "../../recoil/stateAtom";
import { childIdAtom } from "../../recoil/childIdAtom";
import axios from "axios";

interface Winning {
  id: number;
  date: string;
  price: number;
}

const Data: Winning[] = [
  { id: 1, date: "2023-07-27", price: 5000 },
  { id: 2, date: "2023-08-4", price: 5000 },
  { id: 2, date: "2023-08-4", price: 5000 },
  { id: 2, date: "2023-08-4", price: 5000 },
];

const LottoList: React.FC = () => {
  //1->부모, 0->자녀
  const [state, setState] = useRecoilState(stateAtom);
  const [childId] = useRecoilState(childIdAtom);
  const [lottoList, setLottoList] = useState([]);

  const lottohistory = () => {
    if (state.id === 0) {
      axios
        .get(`https://j9e207.p.ssafy.io/api/v1/${childId.id}/lotto`)
        .then((response) => {
          console.log("리스트 정보");
          console.log(response.data.data);
          setLottoList(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (state.id === 1) {
      axios
        .get(`https://j9e207.p.ssafy.io/api/v1/${childId.id}/lotto`)
        .then((response) => {
          console.log("자식 리스트 정보");
          setLottoList(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    lottohistory();
  }, []);

  return (
    <div className="text-2xl">
      <div>
        <div className="p-3">당첨내역</div>
        {lottoList.length === 0 ? ( // lottoList가 비어있는지 확인
          <p
            className="m-3 p-4 rounded-2xl drop-shadow mb-3 text-xl"
            style={{ backgroundColor: "white" }}
          >
            당첨내역이 없습니다.
          </p> // 비어있다면 이 문구를 출력
        ) : (
          lottoList.map((
            item,
            index // 비어있지 않다면 리스트를 출력
          ) => (
            <div
              key={index}
              className="m-3 rounded-2xl"
              style={{ backgroundColor: "#D2DEE5" }}
            >
              <div className="text-start p-3">{item.date}</div>
              <div className="text-end  p-3">{item.cost}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LottoList;
