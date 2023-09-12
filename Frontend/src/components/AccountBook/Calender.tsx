import React, { useState } from "react";
import Statics from "./Statics";
import styles from "./Calender.module.css";
import { Icon } from "@iconify/react";
import {
  addMonths,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";
import { useNavigate } from "react-router-dom";

interface sampleDate {
  date: string;
  income: number;
  exp: number;
}

const Data: sampleDate[] = [
  {
    date: "2023-08-05",
    income: 2000,
    exp: 0,
  },
  {
    date: "2023-08-11",
    income: 0,
    exp: -5000,
  },
  {
    date: "2023-08-22",
    income: 1000,
    exp: -8000,
  },
  {
    date: "2023-09-05",
    income: 2000,
    exp: 0,
  },
  {
    date: "2023-09-11",
    income: 0,
    exp: -5000,
  },
  {
    date: "2023-09-22",
    income: 1000,
    exp: -8000,
  },
];

const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");

const RenderHeader: React.FC<{
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}> = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="flex justify-center items-center p-1">
      <div className="px-4">
        <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
      </div>
      <div className="col col-start">
        <span className="text">
          {format(currentMonth, "yyyy")}. {format(currentMonth, "M")}월
        </span>
      </div>
      <div className="px-4">
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </div>
    </div>
  );
};

const RenderDay: React.FC = () => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div key={i} className="mb-3">
        {date[i]}
      </div>
    );
  }

  return (
    <div className={`${styles.calendarDate} flex justify-around my-2`}>
      {days}
    </div>
  );
};

const RenderCells: React.FC<{
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (date: Date) => void;
}> = ({ currentMonth, selectedDate, onDateClick }) => {
  // 월의 시작일
  const monthStart = startOfMonth(currentMonth);
  // 월의 마지막일
  const monthEnd = endOfMonth(monthStart);
  // 시작 요일
  const startDate = startOfWeek(monthStart);
  // 마지막 요일
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  console.log(monthStart);

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;

      const formattedDay = formatDate(cloneDay);
      const dataItem = Data.find((item) => item.date === formattedDay);

      days.push(
        <div
          className={`container h-24 
            ${i < 6 ? styles.calendarRightBorder : ""} 
            ${
              day < monthStart || day > monthEnd
                ? styles.minMonthStart
                : styles.largeMonthStart
            }
            `}
          key={day.toString()}
          onClick={() => onDateClick(cloneDay)}
        >
          <div className="mt-1">{formattedDate}</div>
          {dataItem && (
            <div className="container h-full flex-row justify-center">
              {dataItem.income !== 0 && (
                <div className="text-xs text-blue-500">{dataItem.income}</div>
              )}
              {dataItem.exp !== 0 && (
                <div className="text-xs text-red-500">{dataItem.exp}</div>
              )}
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div
        className={`flex ${day >= endDate ? "" : styles.calendarBottomBorder}`}
        key={day.toString()}
      >
        {days}
      </div>
    );
    days = [];
  }

  return <div className="body">{rows}</div>;
};

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    const formattedDate = formatDate(date);
    console.log(formattedDate);
    const dataItem = Data.find((item) => item.date === formattedDate);

    if (dataItem) {
      setSelectedDate(date);
      navigate(`/AccountBookDetail`, { state: { date: formattedDate } });
    } else {
      alert("이날은 작성한 가계부가 없어요~~");
    }
  };

  return (
    <div>
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <Statics />
      <div
        className={`${styles.calendar} mx-4 bg-white m-3 p-2 drop-shadow-lg rounded-xl`}
      >
        <RenderDay />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
        />
      </div>
    </div>
  );
};

export default Calendar;
