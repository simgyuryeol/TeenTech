import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import CreateJob from "../../components/PAlba/CreateJob";
import PJobCarousel from "../../components/PAlba/PJobCarousel";
import NoJob from "../../components/Alba/NoJob";
import { childIdAtom } from "../../recoil/childIdAtom";
import { useRecoilValue } from "recoil";

const Palba: React.FC = () => {
  const navigate = useNavigate();
  const [currentJobs, setCurrentJobs] = useState<Job[]>([]);
  const [createdJobs, setCreatedJobs] = useState<Job[]>([]);
  const [waitForApprovalJobs, setWaitForApprovalJobs] = useState<Job[]>([]);
  const child = useRecoilValue(childIdAtom);
  const accessToken = window.localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BASE_URL +
          `/api/v1/albas/parent/lists/${child.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const fetchedData = response.data.data;
        setCurrentJobs(fetchedData.inProgressAlbaList);
        setCreatedJobs(fetchedData.postedAlbaList);

        axios
          .get(
            import.meta.env.VITE_BASE_URL +
              `/api/v1/albas/parent/wait-for-check-lists/${child.id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((secondResponse) => {
            const secondFetchedData = secondResponse.data.data;
            console.log("Second Fetched Data: ", secondFetchedData);
            setWaitForApprovalJobs(secondFetchedData.waitForCheckAlbaList);
          })
          .catch((secondError) => {
            console.log("Error in second request:", secondError);
            alert(secondError.message);
          });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }, []);

  return (
    <div
      className="pt-24 pb-4"
      style={{ minHeight: "100vh", backgroundColor: "#f6f6f6" }}
    >
      <div className="mx-4">
        <div className="flex rounded-xl bg-white p-4 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
            <Icon icon="circum:view-list" className="h-8 w-8" />
          </div>

          <div className="ml-3 w-10/12">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl">알바 현황</span>
              <button
                onClick={() => navigate("/PalbaCompleted")}
                className="ml-8"
              >
                지난 알바보기
              </button>
            </div>
            <div className=" text-gray-700 pr-2">
              <div className="flex items-center justify-between">
                <p>진행 중</p>
                <p className="text-red-600">
                  {currentJobs ? currentJobs.length : 0}건
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>승인 대기</p>
                <p className="text-red-600">
                  {waitForApprovalJobs ? waitForApprovalJobs.length : 0}건
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex rounded-xl bg-white p-4 shadow-lg my-4">
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
        </div> */}

        <CreateJob />

        <React.Fragment>
          <p className="text-lg font-bold">진행 중인 아르바이트</p>
          {currentJobs && currentJobs.length ? (
            <PJobCarousel jobs={currentJobs} />
          ) : (
            <NoJob status="진행 중인" />
          )}
        </React.Fragment>

        <React.Fragment>
          <p className="text-lg font-bold">등록한 아르바이트</p>
          {createdJobs && createdJobs.length ? (
            <PJobCarousel jobs={createdJobs} />
          ) : (
            <NoJob status="등록한" />
          )}
        </React.Fragment>

        <React.Fragment>
          <p className="text-lg font-bold">승인 대기 중인 아르바이트</p>
          {waitForApprovalJobs && waitForApprovalJobs.length ? (
            <PJobCarousel jobs={waitForApprovalJobs} />
          ) : (
            <NoJob status="승인 대기 중인" />
          )}
        </React.Fragment>
      </div>
    </div>
  );
};

export default Palba;
