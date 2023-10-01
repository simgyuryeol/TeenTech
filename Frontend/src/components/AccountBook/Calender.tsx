import React, { useState, useEffect } from "react";
import Statics_month from "./Statics_month";
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
import { useRecoilState } from "recoil";
import { stateAtom, state } from "../../recoil/stateAtom";
import { childIdAtom } from "../../recoil/childIdAtom";
import axios from "axios";

const base_URL = import.meta.env.VITE_SERVER_URL;

interface dateDate {
  date: string;
  importAmount: number;
  spendingAmount: number;
}

const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");

const RenderHeader: React.FC<{
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}> = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="flex justify-center items-center p-1">
      <div className="px-4">
        <Icon
          icon="bi:arrow-left-circle-fill"
          style={{ fontSize: "20px" }}
          onClick={prevMonth}
        />
      </div>
      <div className="col col-start">
        <span className="text text-3xl">
          {format(currentMonth, "yyyy")}. {format(currentMonth, "M")}월
        </span>
      </div>
      <div className="px-4">
        <Icon
          icon="bi:arrow-right-circle-fill"
          style={{ fontSize: "20px" }}
          onClick={nextMonth}
        />
      </div>
    </div>
  );
};

const RenderDay: React.FC = () => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div
        key={i}
        className={`mb-3 text-xl ${i === 0 ? styles.sun : ""} ${
          i === 6 ? styles.sat : ""
        }`}
      >
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
  Datedata: dateDate[];
}> = ({ currentMonth, selectedDate, onDateClick, Datedata }) => {
  // 월의 시작일
  const monthStart = startOfMonth(currentMonth);
  // 월의 마지막일
  const monthEnd = endOfMonth(monthStart);
  // 시작 요일
  const startDate = startOfWeek(monthStart);
  // 마지막 요일
  const endDate = endOfWeek(monthEnd);
  //console.log();
  const Month = Number(format(currentMonth, "M"));

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  const child_id = 1;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;

      const formattedDay = formatDate(cloneDay);
      const dataItem = Datedata.find((item) => item.date === formattedDay);

      days.push(
        <div
          className={`container h-24
            ${i < 6 ? styles.calendarRightBorder : ""}
            ${i === 0 ? styles.sun : ""} ${i === 6 ? styles.sat : ""}
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
              {dataItem.importAmount !== 0 && (
                <div className="text-xs text-blue-500">
                  {dataItem.importAmount}
                </div>
              )}
              {dataItem.spendingAmount !== 0 && (
                <div className="text-xs text-red-500">
                  {dataItem.spendingAmount}
                </div>
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
  console.log(Datedata);
  return <div className="body">{rows}</div>;
};

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [income, setIncome] = useState(0);
  const [spending, setSpending] = useState(0);

  const [selectedYear, setSelectedYear] = useState(new Date());
  // state -> 1 이면 부모, 0이면 자녀
  const [state, setState] = useRecoilState(stateAtom);
  const [Datedata, setDatedata] = useState<dateDate[]>([]);
  const [childData] = useRecoilState(childIdAtom);

  const navigate = useNavigate();

  const getDate = () => {
    console.log(formatDate(currentMonth));
    if (state.id == 0) {
      axios
        .get(
          `https://j9e207.p.ssafy.io/api/v1/34/accountbooks/date/${formatDate(
            currentMonth
          )}`
        )
        .then((response) => {
          console.log(response.data);
          setDatedata(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (state.id == 1) {
      console.log("자녀확인");
      axios
        .get(
          `https://j9e207.p.ssafy.io/api/v1/${
            childData.id
          }/accountbooks/date/${formatDate(currentMonth)}`
        )
        .then((response) => {
          console.log(response.data);
          setDatedata(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getDate();
  }, [currentMonth]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    const formattedDate = formatDate(date);
    const dataItem = Datedata.find((item) => item.date === formattedDate);
    // setIncome(dataItem.importAmount);
    // setSpending(dataItem.spendingAmount);
    console.log(dataItem.importAmount);
    console.log(dataItem.spendingAmount);

    if (dataItem) {
      setSelectedDate(date);
      if (state.id === 1) {
        navigate(`/PaccountbookDetail`, {
          state: {
            date: formattedDate,
            importAmount: dataItem.importAmount,
            spendingAmount: dataItem.spendingAmount,
          },
        });
      } else {
        navigate(`/AccountBookDetail`, {
          state: {
            date: formattedDate,
            importAmount: dataItem.importAmount,
            spendingAmount: dataItem.spendingAmount,
          },
        });
      }
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
      <Statics_month date={formatDate(currentMonth)} />
      <div
        className={`${styles.calendar} mx-4 bg-white m-3 p-2 drop-shadow-lg rounded-xl`}
      >
        <RenderDay />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
          Datedata={Datedata}
        />
      </div>
    </div>
  );
};

export default Calendar;
