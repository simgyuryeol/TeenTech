import React from "react";
import useDate from "../../hooks/useDate";

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
      <div className="flex flex-col border rounded-lg overflow-hidden bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-4">
          <div className="flex flex-col sm:border-l col-span-3">
            <div className="flex flex-col space-y-4  p-6">
              <div className="flex flex-row text-sm">
                <span className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="20px"
                    viewBox="0 0 24 24"
                    width="20px"
                    fill="#64748b"
                  >
                    <g>
                      <rect fill="none" height="24" width="24" />
                    </g>
                    <g>
                      <path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z" />
                    </g>
                  </svg>
                </span>
                <p className="flex items-center   text-lg font-bold">{title}</p>
              </div>

              {/* 아르바이트 비*/}
              <div className="flex flex-row text-sm">
                <span className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 0 24 24"
                    width="20px"
                    fill="#64748b"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                  </svg>
                </span>
                <p className="flex items-center  ">
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
                    <span className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 0 24 24"
                        width="20px"
                        fill="#64748b"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                      </svg>
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
                    <span className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 0 24 24"
                        width="20px"
                        fill="#64748b"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                      </svg>
                    </span>
                    <p className="flex items-center  ">
                      <span className="font-semibold mr-2 text-xs uppercase">
                        완료한 날짜:
                      </span>
                      <span>{dueDate}</span>
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                <div className="flex flex-row text-sm">
                  <span className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 0 24 24"
                      width="20px"
                      fill="#64748b"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                    </svg>
                  </span>
                  <p className="flex items-center  ">
                    <span className="font-semibold mr-2 text-xs uppercase">
                      마감 날짜:
                    </span>
                    <span>{dueDate}</span>
                  </p>
                </div>
              )}

              {/* 아르바이트 내용 */}
              <div className="flex flex-row text-sm">
                <span className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="20px"
                    viewBox="0 0 24 24"
                    width="20px"
                    fill="#64748b"
                  >
                    <rect fill="none" height="24" width="24" />
                    <g>
                      <path d="M6,3c0-1.1,0.9-2,2-2s2,0.9,2,2c0,1.1-0.9,2-2,2S6,4.1,6,3z M20.06,1h-2.12L15.5,3.44l1.06,1.06L20.06,1z M22,23v-2h-1 c-1.04,0-2.08-0.35-3-1c-1.83,1.3-4.17,1.3-6,0c-1.83,1.3-4.17,1.3-6,0c-0.91,0.65-1.96,1-3,1H2l0,2h1c1.03,0,2.05-0.25,3-0.75 c1.89,1,4.11,1,6,0c1.89,1,4.11,1,6,0h0c0.95,0.5,1.97,0.75,3,0.75H22z M21,13.28c0,1.44-2.19,3.62-5.04,5.58 C15.65,18.95,15.33,19,15,19c-1.2,0-2.27-0.66-3-1.5c-0.73,0.84-1.8,1.5-3,1.5c-0.94,0-1.81-0.41-2.49-0.99 c0.46-0.39,0.96-0.78,1.49-1.17l-1.55-2.97C6.15,13.3,6,12.64,6,12V8c0-1.1,0.9-2,2-2h3c1.38,0,2.63-0.56,3.54-1.46l1.41,1.41 C14.68,7.21,12.93,8,11,8H9.6l0,3.5h2.8l1.69,1.88c1.95-0.84,3.77-1.38,5.06-1.38C19.99,12,21,12.25,21,13.28z M12.2,14.27 l-0.7-0.77L9,13.6l0.83,2.01C10.42,15.23,11.64,14.55,12.2,14.27z" />
                    </g>
                  </svg>{" "}
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobDetail;
