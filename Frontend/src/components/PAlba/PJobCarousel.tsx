import React, { useState } from "react";
import Modal from "../Common/Modal";
import JobSummary from "../Alba/JobSummary";
import JobDetail from "../Alba/JobDetail";

interface Job {
  title: string;
  pay: string;
  due: Date;
  description: string;
  stage: string;
}

const PJobCarousel: React.FC<{ jobs: Job[] }> = (props) => {
  const { jobs } = props;
  const [curr, setCurr] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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

  return (
    <div className="overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 z-10"
        >
          <p>←</p>
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 z-10"
        >
          <p>→</p>
        </button>
      </div>
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {jobs.map((job, index) => (
          <div key={index} onClick={() => openModal(job)}>
            <JobSummary title={job.title} pay={job.pay} due={job.due} />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal>
          <JobDetail
            title={selectedJob?.title || ""}
            pay={selectedJob?.pay || ""}
            due={selectedJob?.due || new Date()}
            description={selectedJob?.description || ""}
            stage={selectedJob?.stage || ""}
          />
          {selectedJob?.stage === "pre" ? (
            <div>
              <button onClick={closeModal}>삭제하기</button>
              <button onClick={closeModal}>닫기</button>
            </div>
          ) : (
            <button onClick={closeModal}>승인하기</button>
          )}
        </Modal>
      )}
    </div>
  );
};

export default PJobCarousel;
