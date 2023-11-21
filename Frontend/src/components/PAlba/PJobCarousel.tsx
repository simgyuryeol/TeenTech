import React, { useState } from "react";
import Modal from "../Common/Modal";
import JobSummary from "../Alba/JobSummary";
import JobDetail from "../Alba/JobDetail";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios, { AxiosRequestConfig } from "axios";
import PinInput from "../Common/PinInput";

const PJobCarousel: React.FC<{ jobs: Job[] }> = (props) => {
  const { jobs } = props;
  const [curr, setCurr] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  const urlForCompletion =
    import.meta.env.VITE_BASE_URL + "/api/v1/albas/parent/complete";

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

  const closePinModal = () => {
    setIsPinModalOpen(false);
  };

  const handleApproval = (job) => {
    console.log(selectedJob)
    setIsModalOpen(false);
    setSelectedJob(job);
    setIsPinModalOpen(true);
  };

  const handleDispproval = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const axiosConfig: AxiosRequestConfig = {
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "/api/v1/albas/parent/reject",
        data: {
          childId: selectedJob.childId,
          albaId: selectedJob.albaId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios(axiosConfig);
      console.log("RESPONSE", response.data);
      window.location.reload()
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedJob(null);
    setIsModalOpen(false);
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
          {selectedJob?.status === "게시" ? (
            <div>
              <button
                onClick={handleDelete}
                className="bg-rose-300 text-lg font-bold m-2"
              >
                삭제하기
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={handleApproval}
                className="bg-green-300 text-lg font-bold m-2"
              >
                승인하기
              </button>
              <button
                onClick={handleDispproval}
                className="bg-red-300 text-lg font-bold m-2"
              >
                거절하기
              </button>
            </div>
          )}
        </Modal>
      )}

      {isPinModalOpen && (
        <Modal>
          <button
            className="bg-transparent relative inset-x-32"
            onClick={closePinModal}
          >
            <Icon
              icon="zondicons:close-outline"
              className="w-6 h-6 text-gray-600"
            />
          </button>
          <PinInput
            onclose={closePinModal}
            method="post"
            url={urlForCompletion}
            data={{
              childId: jobs[0].childId,
              albaId: jobs[0].albaId,
            }}
            headers={{Authorization: `Bearer ${accessToken}`}}
          />
        </Modal>
      )}
    </div>
  );
};

export default PJobCarousel;
