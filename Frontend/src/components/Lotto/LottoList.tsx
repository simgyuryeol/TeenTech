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
  const [childData] = useRecoilState(childIdAtom);
  const [lottoList, setLottoList] = useState([]);

  const lottohistory = () => {
    if (state.id === 0) {
      axios
        .get(`https://j9e207.p.ssafy.io/api/v1/34/lotto`)
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
        .get(`https://j9e207.p.ssafy.io/api/v1/${childData.id}/lotto`)
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
      <div className="p-3">당첨내역</div>
      <div>
        {lottoList.map((item, index) => (
          <div
            key={index}
            className="m-3 rounded-2xl"
            style={{ backgroundColor: "#D2DEE5" }}
          >
            <div className="text-start p-3">{item.date}</div>
            <div className="text-end  p-3">{item.cost}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LottoList;
