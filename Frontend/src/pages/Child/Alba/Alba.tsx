import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router";
import JobCarousel from "../../../components/Alba/JobCarousel";

// 진행여부: pre, ing, true, false

interface Job {
  title: string;
  pay: string;
  due: Date;
  description: string;
  stage: string;
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
          stage: "ing",
        },
        {
          title: "진행중 알바2",
          pay: "1000원",
          due: currentDate,
          description: "진행중 알바2 설명",
          stage: "ing",
        },
      ]);
      setAvailableJobs([
        {
          title: "가능한 알바1",
          pay: "1000원",
          due: currentDate,
          description: "가능한 알바1 설명",
          stage: "pre",
        },
        {
          title: "가능한 알바2",
          pay: "1000원",
          due: currentDate,
          description: "가능한 알바2 설명",
          stage: "pre",
        },
      ]);
    };
    fetchData();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">자식 알바 페이지</h2>
      <hr />
      <div className="flex flex-col">
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>

            <div className="ml-4">
              <div>
                <span className="font-semibold">내 알바</span>
                <button onClick={() => navigate("/AlbaCompleted")}>
                  완료알바보기
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">진행 중: 1건</p>
              <p className="mt-2 text-sm text-gray-500">진행 완료: 0건</p>
            </div>
          </div>

          <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <div className="ml-4">
              <h2 className="font-semibold">내 알바비</h2>
              <p className="mt-2 text-sm text-gray-500">총지급액: 5000원</p>
              <p className="mt-2 text-sm text-gray-500">미지급액: 1000원</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-lg font-bold">진행중인 아르바이트</p>
        <JobCarousel jobs={currentJobs} />
        <hr />
      </div>

      <div className="mt-6">
        <p className="text-lg font-bold">신청가능한 아르바이트</p>
        <JobCarousel jobs={availableJobs} />
      </div>
    </div>
  );
};

export default Alba;
