import React, { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={`${props.className} bg-white m-5 rounded-xl shadow-md`}>
      {props.children}
    </div>
  );
};

export default Card;
