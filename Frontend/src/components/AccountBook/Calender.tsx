import React, { useState } from "react";
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

interface RenderCellsProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (date: Date) => void;
}

const RenderHeader: React.FC<{
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}> = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="flex" style={{ justifyContent: "space-between" }}>
      <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
      <div className="col col-start">
        <span className="text">{format(currentMonth, "M")}월</span>
        {format(currentMonth, "yyyy")}
      </div>

      <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
    </div>
  );
};

const RenderDay: React.FC = () => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(<div key={i}>{date[i]}</div>);
  }

  return <div className="flex justify-around my-2">{days}</div>;
};

const RenderCells: React.FC<RenderCellsProps> = ({
  currentMonth,
  selectedDate,
  onDateClick,
}) => {
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

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div
          style={{
            height: "100px",
            width: "100%",
          }}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <div>{formattedDate}</div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" style={{ display: "flex" }} key={day}>
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

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className={`${styles.calendar} mx-3 drop-shadow-lg rounded-xl`}>
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDay />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={handleDateClick}
      />
    </div>
  );
};

export default Calendar;
