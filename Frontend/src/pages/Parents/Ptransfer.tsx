import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { childIdAtom } from "../../recoil/childIdAtom";
import Modal from "../../components/Common/Modal";

const Ptransfer: React.FC = () => {
  const [childid] = useRecoilState(childIdAtom);
  const [amount, setAmount] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleLinkClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    // 여기에서 실제로 송금 로직을 처리할 수 있습니다.
    alert(`${amount}만큼 ${childid.name}에게 송금되었습니다.`);
    setIsConfirmOpen(false);
    setAmount(""); // 입력값 초기화
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
    setAmount(""); // 입력값 초기화
  };

  return (
    <div className="pt-24 ">
      <div className="text-start bg-blue-100 m-3">
        <div className="p-3 ">{childid.name} 에게 얼마를 송금할까요?</div>
        <div className="m-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button onClick={handleLinkClick} style={{ width: "100%" }}>
          송금하기
        </button>
      </div>

      {/* 확인 모달 */}
      {isConfirmOpen && (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md">
              <p>{`${amount}만큼 ${childid.name}에게 송금하시겠습니까?`}</p>
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
