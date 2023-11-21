import React, { ReactNode } from "react";
import Modal from "../Common/Modal";

interface InterestInfoProps {
    children: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    closeModal: (value: any) => void;
  }

const InterestInfo: React.FC<InterestInfoProps> = ({closeModal,}) => {

  return (
    <div className="overflow-hidden relative">
        <Modal>
            <div>
                <div>
                    <p>신용 등급에 따른</p>
                    <div className="flex">
                    <p className="text-blue-500">예금</p>
                    <p>이자율</p>
                    </div>
                </div>
                <div>1등급 ~ 2등급 : 2 ~ 3%</div>
                <div>3등급 ~ 6등급 : 1.5~2%</div>
                <div>7등급 ~ 8등급 : 1~1.5%</div>
                <div>9등급 ~10등급 : 0 ~ 1%</div>
                <div className='flex justify-center' >
                  <button onClick={closeModal}>확인</button>
                </div>
            </div>
        </Modal>
    </div>
  );
};

export default InterestInfo;
