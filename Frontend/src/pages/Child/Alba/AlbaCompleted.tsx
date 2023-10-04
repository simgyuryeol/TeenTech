import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbaDetail from "../../../components/Alba/JobDetail";
import Bot from "../Bot/Bot";
const NoCompletedJobs: React.FC = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      {/* 챗봇 */}
      <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}>
        <div className="flex items-end">
          <div className="bg-sky-200 rounded-lg drop-shadow-md p-2 mb-3">
            질문해줘
          </div>
          <Bot />
        </div>
      </div>
      <p className="text-2xl">아직 완료한 아르바이트가 없어요.</p>
    </div>
  );
};

const AlbaCompleted: React.FC = () => {
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios
      // .get(import.meta.env.VITE_BASE_URL + `/api/v1/albas/parent/lists/${childId}`, {
      .get(import.meta.env.VITE_BASE_URL + "/albas/parent/completed-lists/34")
      .then((response) => {
        const fetchedData = response.data;
        console.log("SUCCESS", response.data);
        setCompletedJobs(fetchedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-10">
      <p className="text-2xl">자식 완료한 알바</p>
      <hr />
      {completedJobs.length ? (
        completedJobs.map((job, index) => <AlbaDetail key={index} job={job} />)
      ) : (
        <NoCompletedJobs />
      )}
    </div>
  );
};

export default AlbaCompleted;
