import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbaDetail from "../../../components/Alba/JobDetail";

const NoCompletedJobs: React.FC = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <p className="text-2xl">아직 완료한 아르바이트가 없어요.</p>
    </div>
  );
};

const AlbaCompleted: React.FC = () => {
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);
  const accessToken = localStorage.getItem("accessToken");

  const customHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BASE_URL +
          "/api/v1/albas/child/completed-lists",
        { headers: customHeaders }
      )
      .then((response) => {
        const fetchedData = response.data.data;
        console.log("SUCCESS", fetchedData);
        setCompletedJobs(fetchedData.completedAlbaList);
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
