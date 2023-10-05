import React, { useState } from "react";
import axios from "axios";
import Modal from "../Common/Modal";
import JobSummary from "./JobSummary";
import JobDetail from "./JobDetail";
import { Icon } from "@iconify/react/dist/iconify.js";

const JobCarousel: React.FC<{ jobs: Job[] }> = (props) => {
  const { jobs } = props;
  const [curr, setCurr] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const albaId = selectedJob.albaId

  const prev = () =>
    setCurr((curr) => (curr === 0 ? jobs.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === jobs.length - 1 ? 0 : curr + 1));

  const openModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: string
  ) => {
    axios
      .post(import.meta.env.VITE_BASE_URL + `/albas/child/${albaId}/${status}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-between p-2">
        <button
          onClick={prev}
          className="bg-transparent p-0 text-gray-400 z-10"
        >
          <Icon icon="mdi-light:chevron-left" className="w-8 h-8" />
        </button>
        <button
          onClick={next}
          className="bg-transparent p-0 text-gray-400 z-10"
        >
          <Icon icon="mdi-light:chevron-right" className="w-8 h-8" />
        </button>
      </div>

      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {jobs.map((job, index) => (
          <div key={index} onClick={() => openModal(job)}>
            <JobSummary
              title={job.title}
              reward={job.reward}
              closeDate={job.closeDate}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal>
          <button
            className="bg-transparent relative inset-x-32"
            onClick={closeModal}
          >
            <Icon
              icon="zondicons:close-outline"
              className="w-6 h-6 text-gray-600"
            />
          </button>
          <JobDetail job={selectedJob} />
          {selectedJob?.status === "PRE" ? (
            <button onClick={(e) => handleClick(e, "accept")}>할래요😉</button>
          ) : (
            <div>
              <button onClick={(e) => handleClick(e, "giveup")} className="m-2">
                못하겠어요😓
              </button>
              <button
                onClick={(e) => handleClick(e, "complete")}
                className="m-2"
              >
                다 했어요😊
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default JobCarousel;
