import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";


const JobDetail: React.FC<{job:Job}> = ({job}) => {

  return (
    <div className="flex flex-col border rounded-lg overflow-hidden bg-white my-3 w-60">
      <div className="flex flex-col space-y-4 p-6">
        <div className="flex flex-row text-lg">
          <span className="mr-3 mt-2">
            <Icon icon="circum:bookmark" />
          </span>
          <p className="flex items-center text-lg font-bold">{job.title}</p>
        </div>

        {/* 아르바이트 비*/}
        <div className="flex flex-row text-lg">
          <span className="mr-3 mt-1">
            <Icon icon="circum:dollar" />
          </span>
          <p className="flex items-center">
            <span className="font-semibold mr-2 text-sm uppercase">
              아르바이트 비:
            </span>
            <span>{job.reward.toLocaleString()}</span>
          </p>
        </div>

        {job.status === "완료" ? (
          <React.Fragment>
            {/* 시작한 날짜 */}
            <div className="flex flex-row text-lg">
              <span className="mr-3 mt-1">
                <Icon icon="circum:calendar" />
              </span>
              <p className="flex items-center  ">
                <span className="font-semibold mr-2 text-sm uppercase">
                  시작한 날짜:
                </span>
                <span>{job.startDate}</span>
              </p>
            </div>

            {/* 완료한 날짜 */}
            <div className="flex flex-row text-lg">
              <span className="mr-3 mt-1">
                <Icon icon="circum:calendar-date" />
              </span>
              <p className="flex items-center">
                <span className="font-semibold mr-2 text-sm uppercase">
                  완료한 날짜:
                </span>
                <span>{job.closeDate}</span>
              </p>
            </div>
          </React.Fragment>
        ) : (
          <div className="flex flex-row text-lg">
            <span className="mr-3 mt-1">
              <Icon icon="circum:calendar-date" />
            </span>
            <p className="flex items-center">
              <span className="font-semibold mr-2 text-sm uppercase">
                마감 날짜:
              </span>
              <span>{job.closeDate}</span>
            </p>
          </div>
        )}

        {/* 아르바이트 내용 */}
        <div className="flex flex-row text-lg">
          <span className="mr-3 mt-1">
            <Icon icon="circum:boxes" />
          </span>
          <div className="flex flex-col">
            <p className="font-semibold mr-2 text-sm uppercase">
              아르바이트 내용:
            </p>
            <p>{job.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
