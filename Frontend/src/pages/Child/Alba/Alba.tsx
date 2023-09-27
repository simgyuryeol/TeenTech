import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import JobCarousel from "../../../components/Alba/JobCarousel";
import NoJob from "../../../components/Alba/NoJob";

const Alba: React.FC = () => {
  const navigate = useNavigate();

  const [currentJobs, setCurrentJobs] = useState<Job[]>([]);
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);

  useEffect(() => {
    // const customHeaders = {
    //   Authorization: 'Bearer YourAccessToken',
    // };

    axios
      // .get(import.meta.env.VITE_BASE_URL + `/api/v1/albas/parent/lists/${childId}`, {
      // .get(import.meta.env.VITE_BASE_URL + `/albas/child/lists`, {
      //   headers: customHeaders,
      // })
      .get(import.meta.env.VITE_BASE_URL + `/albas/child/lists`)
      .then((response) => {
        const fetchedData = response.data;
        console.log("SUCCESS", response.data);
        setCurrentJobs(fetchedData.inProgressAlbaList);
        setAvailableJobs(fetchedData.applicableAlbaList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">자식 알바 페이지</h2>
      <div className="m-4">
        <div className="flex flex-col">
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <Icon icon="circum:view-list" className="w-8 h-8" />
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
                    <p className="text-red-600">{currentJobs? currentJobs.length : 0}건</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>진행 완료</p>
                    <p className="text-red-600">0건</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                <Icon icon="circum:dollar" className="w-8 h-8" />
              </div>

              <div className="ml-3 w-10/12">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl">내 알바비</span>
                </div>
                <div className=" text-gray-700 pr-2 mt-2">
                  <div className="flex items-center justify-between">
                    <p>총지급액</p>
                    <p className="text-red-600">5000원</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>미지급액</p>
                    <p className="text-red-600">1000원</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-2xl font-bold">진행 중인 아르바이트</p>
          {currentJobs.length ? (
            <JobCarousel jobs={currentJobs} />
          ) : (
            <NoJob status="진행 중인" />
          )}
        </div>

        <div className="mt-10">
          <p className="text-2xl font-bold">신청 가능한 아르바이트</p>
          {availableJobs.length ? (
            <JobCarousel jobs={availableJobs} />
          ) : (
            <NoJob status="신청 가능한"/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alba;
