import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { addMonths, format, subMonths } from 'date-fns';

const RenderHeader: React.FC<{ currentMonth: Date, prevMonth: () => void, nextMonth: () => void }> =
    ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div style={{display:"flex", justifyContent:'space-between'}}>
            <div className="col col-start">
                <span className="text">
                    {format(currentMonth,'M')}월
                </span>
                {format(currentMonth,'yyyy')}
            </div>
            <div style={{display:'flex'}}>
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}/>
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}/>
            </div>
        </div>
    )
}

const RenderDay = () => {
    const days = [];
    const date = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++){
        days.push(
            <div key={i}>
                {date[i]}
            </div>,
        )
    }

    return <div style={{display:"flex",justifyContent:'space-around'}}>{days}</div>
}

// 달력만들기
const RenderCells = ({ currentMont, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    const days = [];
    const day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++){
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    
                >

                </div>
            )
        }
    }
}

const Calender: React.FC = () => {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    }

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    }

    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDay/>
            <div className="header"></div>
            <div className="days"></div>
            <div className="body"></div>
        </div>
    )
}

export default Calender;