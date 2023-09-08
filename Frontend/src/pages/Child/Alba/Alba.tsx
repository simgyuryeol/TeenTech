import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router";
import Modal from "../../../components/Common/Modal";
import AlbaDetail from "../../../components/Alba/JobDetail";

interface Job {
  title: string;
  pay: string;
  due: Date;
  description: string;
}

const Alba: React.FC = () => {
  const navigate = useNavigate();
  // 알바 목록 관련
  const [currentJobs, setCurrentJobs] = useState<Job[]>([]);
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   Promise.all([axios.get("진행중알바"),axios.get("가능알바"),]);
    //     .then(([data1, data2]) => {
    //       const currentJobList = data1.data;
    //       setCurrentJobs(currentJobList);
    //      const availableJobList = data2.data;
    //      setAvailableJobs(availableJobList);
    //     })
    //     .catch((err) => console.log(err));
    // };
    const fetchData = () => {
      const currentDate = new Date();
      setCurrentJobs([
        {
          title: "진행중 알바1",
          pay: "1000원",
          due: currentDate,
          description: "진행중 알바1 설명",
        },
        {
          title: "진행중 알바2",
          pay: "1000원",
          due: currentDate,
          description: "진행중 알바2 설명",
        },
      ]);
      setAvailableJobs([
        {
          title: "가능한 알바1",
          pay: "1000원",
          due: currentDate,
          description: "가능한 알바1 설명",
        },
        {
          title: "가능한 알바2",
          pay: "1000원",
          due: currentDate,
          description: "가능한 알바2 설명",
        },
      ]);
    };
    fetchData();
  }, []);

  //   모달 관련
  const [openCurrentModal, setOpenCurrentModal] = useState(false);
  const [openAvailableModal, setOpenAvailableModal] = useState(false);

  const handleCurrentModal = () => {
    setOpenCurrentModal(!openCurrentModal);
  };

  const handleCancel = () => {
    // 진행 중인 알바 취소 신청 로직
    setOpenCurrentModal(!openCurrentModal);
  };

  const handleComplete = () => {
    // 진행 중인 알바 완료 신청 로직
    setOpenCurrentModal(!openCurrentModal);
  };

  const handleAvailableModal = () => {
    // 진행 중인 알바 완료 신청 로직
    setOpenAvailableModal(!openAvailableModal);
  };

  const handleAccept = () => {
    // 진행 중인 알바 완료 신청 로직
    setOpenAvailableModal(!openAvailableModal);
  };

  const currentDate = new Date();

  return (
    <div>
      <h2 className="text-2xl">자식 알바 페이지</h2>
      <hr />

      <div className="border-blue-600">
        <p className="text-lg font-bold">알바 통계</p>
        <button onClick={() => navigate("/AlbaCompleted")}>완료알바보기</button>
        <p>진행 중: 1건</p>
        <p>진행 완료: 0건</p>
        <hr />
      </div>

      <div className="border-green-600">
        <p className="text-lg font-bold">알바비 통계</p>
        <p>총지급액: 5000원</p>
        <p>미지급액: 1000원</p>
        <hr />
      </div>

      <div>
        <p className="text-lg font-bold">진행중인 아르바이트</p>
        <button onClick={handleCurrentModal}>알바</button>
        {openCurrentModal && (
          <Modal>
            <AlbaDetail
              title="설거지"
              pay="1,000"
              due={currentDate}
              description="텀블러씻기"
            />
            <div>
              <button onClick={handleCancel}>못하겠어요😓</button>
              <button onClick={handleComplete}>다 했어요😊</button>
            </div>
          </Modal>
        )}
        <hr />
      </div>

      <div>
        <p className="text-lg font-bold">신청가능한 아르바이트</p>
        <button onClick={handleAvailableModal}>알바</button>
        {openAvailableModal && (
          <Modal>
            <AlbaDetail
              title="설거지"
              pay="1,000"
              due={currentDate}
              description="텀블러씻기"
            />
            <div>
              <button onClick={handleAccept}>할래요😉</button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Alba;
