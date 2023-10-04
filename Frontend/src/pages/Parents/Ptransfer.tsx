import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { childIdAtom } from "../../recoil/childIdAtom";
import Modal from "../../components/Common/Modal";
import axios from "axios";

const Ptransfer: React.FC = () => {
  const [childid] = useRecoilState(childIdAtom);
  const [amount, setAmount] = useState<number | "">("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  console.log(childid.id);

  const handleLinkClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    // parent_id랑 child_id 바꿔주기
    axios
      .post(`https://j9e207.p.ssafy.io/api/v1/parents/35/${childid.id}/send`, {
        pinmoney: amount,
      })
      .then((response) => {
        console.log(response);
        alert(`${amount}만큼 ${childid.name}에게 송금되었습니다.`);
        setIsConfirmOpen(false);
        setAmount(""); // 입력값 초기화
      })
      .catch((error) => {
        console.log(amount);
        console.log(error);
      });
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
    setAmount(""); // 입력값 초기화
  };

  return (
    <div className="pt-24 ">
      <div className="text-xl text-black bg-white rounded-xl drop-shadow mx-4 p-3">
        <div className="p-3 ">{childid.name} 에게 얼마를 송금할까요?</div>
        <div className="mb-4">
          <input
            className="text-xl text-black bg-gray-200 rounded-xl drop-shadow px-3"
            style={{ width: "80%" }}
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>
        <button
          className="text-xl text-black bg-blue-100 rounded-xl drop-shadow "
          onClick={handleLinkClick}
          style={{ width: "100%" }}
        >
          송금하기
        </button>
      </div>
      {isConfirmOpen && (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md">
              <p>{`${
                childid.name
              }에게 ${amount.toLocaleString()}원 송금하시겠습니까?`}</p>
              <div className="flex justify-end mt-4">
                <button onClick={handleCancel}>취소</button>
                <button onClick={handleConfirm}>확인</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Ptransfer;
