import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import CreateJobForm from "./CreateJobForm";

const CreateJob: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" p-4">
      <div
        onClick={toggleAccordion}
        className="flex items-center justify-between border-b overflow-hidden cursor-pointer"
      >
        <button className="font-semibold w-10/12">
          신규 아르바이트 생성하기
        </button>

        <div
          className={`transform transition duration-300 ease-in-out ${
            isOpen ? "rotate-90" : "-translate-y-0.0"
          }`}
        >
          <Icon icon="mdi:chevron-right" className="w-8 h-8" />
        </div>
      </div>

      {isOpen && <CreateJobForm />}
    </div>
  );
};

export default CreateJob;
