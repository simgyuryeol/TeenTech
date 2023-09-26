import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios, { AxiosRequestConfig } from "axios";

const CreateJobForm: React.FC = () => {
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    childId: 34,
    title: "",
    content: "",
    reward: 0,
    start_date: "",
    close_date: "",
  });

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setFormData({
      ...formData,
      start_date: formattedDate,
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.reward ||
      !formData.close_date ||
      !formData.content
    ) {
      setFormError("모든 필드를 입력하세요.");
      return;
    }

    setFormData({
      ...formData,
      reward: Number(formData.reward),
    });

    const startDate = new Date(formData.start_date);
    const closeDate = new Date(formData.close_date);

    if (closeDate <= startDate) {
      setFormError("마감일은 시작일보다 뒤의 날짜여야 합니다.");
      return;
    }

    try {
      const axiosConfig: AxiosRequestConfig = {
        method: "post",
        url: "https://192.168.30.201/api/v1/albas/parent",
        // url: "https://j9e207.p.ssafy.io/api/v1/albas/parent",
        data: formData,
      };

      const response = await axios(axiosConfig);
      console.log("RESPONSE", response.data);
      setFormError("");
    } catch (error) {
      console.error(error);
    }
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
              <label htmlFor="reward" className="mb-2 block">
                <div className="flex flex-row text-lg">
                  <span className="mr-3 mt-1">
                    <Icon icon="circum:dollar" />
                  </span>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2 text-sm">
                      아르바이트 비
                    </span>
                  </p>
                </div>
              </label>
              <input
                type="number"
                name="reward"
                id="reward"
                placeholder="1000"
                className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.reward}
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="close_date" className="mb-2 block">
                <div className="flex flex-row text-lg">
                  <span className="mr-3 mt-1">
                    <Icon icon="circum:calendar-date" />
                  </span>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2 text-sm">
                      마감 날짜
                    </span>
                  </p>
                </div>
              </label>
              <input
                type="date"
                name="close_date"
                id="close_date"
                className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.close_date}
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="content" className="mb-2 block">
                <div className="flex flex-row text-lg">
                  <span className="mr-3 mt-1">
                    <Icon icon="circum:boxes" />
                  </span>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2 text-sm">
                      아르바이트 내용
                    </span>
                  </p>
                </div>
              </label>
              <textarea
                rows={4}
                name="content"
                id="content"
                placeholder="아르바이트 상세 설명"
                className="w-full resize-none rounded-md border border-[#e0e0e0] py-2 px-4 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.content}
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
