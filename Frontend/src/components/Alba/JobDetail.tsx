import React from "react";
import useDate from "../../hooks/useDate";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Job {
  title: string;
  pay: string;
  due: Date;
  description: string;
  stage: string;
}

const JobDetail: React.FC<Job> = (props) => {
  const { title, pay, due, description, stage } = props;
  const dueDate = useDate(due);

  return (
    <React.Fragment>
      <div className="flex flex-col border rounded-lg overflow-hidden bg-white m-3">
          <div className="flex flex-col space-y-4 p-6">
            <div className="flex flex-row text-sm">
              <span className="mr-3 mt-2">
                <Icon icon="circum:bookmark" />
              </span>
              <p className="flex items-center   text-lg font-bold">{title}</p>
            </div>

            {/* 아르바이트 비*/}
            <div className="flex flex-row text-sm">
              <span className="mr-3 mt-1">
                <Icon icon="circum:dollar" />
              </span>
              <p className="flex items-center">
                <span className="font-semibold mr-2 text-xs uppercase">
                  아르바이트 비:
                </span>
                <span>{pay}</span>
              </p>
            </div>

            {stage === "true" ? (
              <React.Fragment>
                {/* 시작한 날짜 */}
                <div className="flex flex-row text-sm">
                  <span className="mr-3 mt-1">
                    <Icon icon="circum:calendar" />
                  </span>
                  <p className="flex items-center  ">
                    <span className="font-semibold mr-2 text-xs uppercase">
                      시작한 날짜:
                    </span>
                    <span>{dueDate}</span>
                  </p>
                </div>

                {/* 완료한 날짜 */}
                <div className="flex flex-row text-sm">
                  <span className="mr-3 mt-1">
                    <Icon icon="circum:calendar-date" />
                  </span>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2 text-xs uppercase">
                      완료한 날짜:
                    </span>
                    <span>{dueDate}</span>
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <div className="flex flex-row text-sm">
                <span className="mr-3 mt-1">
                  <Icon icon="circum:calendar-date" />
                </span>
                <p className="flex items-center">
                  <span className="font-semibold mr-2 text-xs uppercase">
                    마감 날짜:
                  </span>
                  <span>{dueDate}</span>
                </p>
              </div>
            )}

            {/* 아르바이트 내용 */}
            <div className="flex flex-row text-sm">
              <span className="mr-3 mt-1">
                <Icon icon="circum:boxes" />
              </span>
              <p className="flex items-center  ">
                <span className="font-semibold mr-2 text-xs uppercase">
                  아르바이트 내용:
                </span>
                <span>{description}</span>
              </p>
            </div>
          </div>
      </div>
    </React.Fragment>
  );
};

export default JobDetail;
