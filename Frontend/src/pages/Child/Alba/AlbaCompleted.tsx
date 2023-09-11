import React, { useState, useEffect } from "react";
// import axios from "axios";
import AlbaDetail from "../../../components/Alba/JobDetail";

interface Job {
  title: string;
  pay: string;
  due: Date;
  description: string;
}

const AlbaCompleted: React.FC = () => {
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   Promise.all([axios.get("")])
    //     .then((data) => {
    //       const jobList = data.data;
    //       setCompletedJobs(jobList);
    //     })
    //     .catch((err) => console.log(err));
    // };
    const fetchData = () => {
      const currentDate = new Date();
      setCompletedJobs([
        {
          title: "완료한 알바1",
          pay: "1000원",
          due: currentDate,
          description: "완료한 알바1 설명",
        },
        {
          title: "완료한 알바2",
          pay: "1000원",
          due: currentDate,
          description: "완료한 알바2 설명",
        },
      ]);
    };
    fetchData();
  }, []);

  return (
    <div className="mt-10">
      <p className="text-2xl">자식 완료한 알바</p>
      <hr />
      {completedJobs.map((job, index) => (
        <AlbaDetail
          key={index}
          title={job.title}
          pay={job.pay}
          due={job.due}
          description={job.description}
        />
      ))}
    </div>
  );
};

export default AlbaCompleted;
