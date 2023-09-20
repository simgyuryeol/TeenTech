import React from "react";
import useDate from "../../hooks/useDate";

interface Job {
  title: string;
  pay: string;
  due: Date;
}

const JobSummary: React.FC<Job> = (props) => {
  const { title, pay, due } = props;
  const date = useDate(due);

  return (
    <div className="px-5 py-5 mx-auto" style={{width: "92vw"}}>
      <div className="flex flex-wrap -m-4 text-center">
        <div className="p-1 w-full hover:scale-105 duration-500">

          <div className="flex flex-col items-start justify-between py-4 px-8 rounded-lg bg-white shadow-indigo-50 shadow-md">
            <p className="text-gray-900 text-xl font-bold">{title}</p>

            <div className="flex items-center justify-between" style={{width: "70vw"}}>
              <p className="font-semibold text-gray-400">{date}까지</p>
              <p className="text-xl font-bold text-yellow-500">+ {pay}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobSummary;
