import React from "react";

interface Job {
  title: string;
  pay: string;
  due: Date;
  description: string;
}

const JobDetail: React.FC<Job> = (props) => {
  const year = props.due.getFullYear();
  const month = props.due.getMonth() + 1;
  const day = props.due.getDate();

  const dueDate = `${year}-${month}-${day}`;

  return (
    <React.Fragment>
      <p className="text-lg font-bold">{props.title}</p>
      <p>지급 아르바이트비: {props.pay}</p>
      <p>기간: {dueDate}</p>
      <p>내용: {props.description}</p>
    </React.Fragment>
  );
};

export default JobDetail;
