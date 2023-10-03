import React, { useState, ReactNode } from "react";
import Modal from "../Common/Modal";

interface LoanInterestInfoProps {
    closeModal: (value: any) => void;
  }

const LoanInterestInfo: React.FC<LoanInterestInfoProps> = ({closeModal}) => {

  return (
    <div className="overflow-hidden relative">
        <Modal>
            <div>
                <div>
                    <p>신용 등급에 따른</p>
                    <div className="flex">
                    <p className="text-red-500">대출</p>
                    <p>이자율</p>
                    </div>
                </div>
                <div>1등급 ~ 2등급 : 최대 5%</div>
                <div>3등급 ~ 6등급 : 최대 8%</div>
                <div>7등급 ~ 8등급 : 최대 10%</div>
                <div>9등급 ~10등급 : 최대 15%</div>
                <div className='flex justify-center' >
                  <button onClick={closeModal}>확인</button>
                </div>
            </div>
        </Modal>
    </div>
  );
};

export default LoanInterestInfo;
