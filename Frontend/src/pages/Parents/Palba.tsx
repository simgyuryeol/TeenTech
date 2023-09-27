import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import CreateJob from "../../components/PAlba/CreateJob";
import PJobCarousel from "../../components/PAlba/PJobCarousel";

// 진행여부: pre, ing, true, false

interface Job {
  title: string;
  pay: string;
  due: Date;
  description: string;
  stage: string;
}

const Palba: React.FC = () => {
  const navigate = useNavigate();
  // 알바 목록 관련
  const [currentJobs, setCurrentJobs] = useState<Job[]>([]);
  const [createdJobs, setCreatedJobs] = useState<Job[]>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   Promise.all([axios.get("진행중알바"),axios.get("가능알바"),]);
    //     .then(([data1, data2]) => {
    //       const currentJobList = data1.data;
    //       setCurrentJobs(currentJobList);
    //      const availableJobList = data2.data;
    //      setCreatedJobs(availableJobList);
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
      setCreatedJobs([
        {
          title: "등록한 알바1",
          pay: "1000원",
          due: currentDate,
          description: "등록한 알바1 설명",
          stage: "pre",
        },
        {
          title: "등록한 알바2",
          pay: "1000원",
          due: currentDate,
          description: "등록한 알바2 설명",
          stage: "pre",
        },
      ]);
    };
    fetchData();
  }, []);

  return (
    <div className="pt-24 mx-4">
      <div className="flex rounded-xl bg-white p-4 shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
          <Icon icon="circum:view-list" className="h-8 w-8" />
        </div>

        <div className="ml-3 w-10/12">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl">내 알바</span>
                  <button
                    onClick={() => navigate("/AlbaCompleted")}
                    className="ml-8"
                  >
                    완료알바보기
                  </button>
                </div>
                <div className=" text-gray-700 pr-2">
                  <div className="flex items-center justify-between">
                    <p>진행 중</p>
                    <p className="text-red-600">1건</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>진행 완료</p>
                    <p className="text-red-600">0건</p>
                  </div>
                </div>
              </div>
            </div>

      <div className="flex rounded-xl bg-white p-4 shadow-lg my-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
          <Icon icon="circum:dollar" className="h-8 w-8" />
        </div>

        <div className="mx-4 text-left w-9/12">
          <p className="font-semibold">지급한 아르바이트비</p>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">총지급액</p>
            <p className="text-sm text-gray-500">5000원</p>
          </div>
        </div>
      </div>

      <CreateJob />

      <React.Fragment>
        <p className="text-lg font-bold">진행중인 아르바이트</p>
        <PJobCarousel jobs={currentJobs} />
      </React.Fragment>

      <React.Fragment>
        <p className="text-lg font-bold">등록한 아르바이트</p>
        <PJobCarousel jobs={createdJobs} />
      </React.Fragment>
    </div>
  );
};

export default Palba;
