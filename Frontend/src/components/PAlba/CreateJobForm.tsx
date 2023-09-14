import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const CreateJobForm: React.FC = () => {
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    pay: "",
    due: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.pay ||
      !formData.due ||
      !formData.description
    ) {
      setFormError("모든 필드를 입력하세요.");
      return;
    }

    console.log(formData);
    setFormError("");
  };

  return (
    <div className="transform transition duration-300 ease-in-out bg-white rounded-xl p-3 my-2">
      <div className="flex flex-col overflow-hidden m-3">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="title" className="mb-2 block">
                <div className="flex flex-row text-lg">
                  <span className="mr-2 mt-1">
                    <Icon icon="circum:bookmark" />
                  </span>
                  <p className="text-lg font-bold">아르바이트 이름</p>
                </div>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="아르바이트 이름"
                className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="pay" className="mb-2 block">
                <div className="flex flex-row text-lg">
                  <span className="mr-3 mt-1">
                    <Icon icon="circum:dollar" />
                  </span>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2 text-xs">
                      아르바이트 비
                    </span>
                  </p>
                </div>
              </label>
              <input
                type="number"
                name="pay"
                id="pay"
                placeholder="1000"
                className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.pay}
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="due" className="mb-2 block">
                <div className="flex flex-row text-lg">
                  <span className="mr-3 mt-1">
                    <Icon icon="circum:calendar-date" />
                  </span>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2 text-xs">
                      마감 날짜
                    </span>
                  </p>
                </div>
              </label>
              <input
                type="date"
                name="due"
                id="due"
                className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.due}
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="description" className="mb-2 block">
                <div className="flex flex-row text-lg">
                  <span className="mr-3 mt-1">
                    <Icon icon="circum:boxes" />
                  </span>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2 text-xs">
                      아르바이트 내용
                    </span>
                  </p>
                </div>
              </label>
              <textarea
                rows={4}
                name="description"
                id="description"
                placeholder="아르바이트 상세 설명"
                className="w-full resize-none rounded-md border border-[#e0e0e0] py-2 px-4 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              {formError && <div className="text-red-600">{formError}</div>}
              <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 font-semibold text-white outline-none">
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobForm;
