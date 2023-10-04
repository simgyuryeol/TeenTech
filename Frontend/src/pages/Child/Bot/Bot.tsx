import React from "react";
import Chatbotmain from "./chatbotmain";
import BotModal from "../../../components/Bot/BotModal";
import dog from "../../../assets/Teen9/Dog.png";

const Bot: React.FC = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: React.SetStateAction<number>) =>
    setOpen(open === value ? 0 : value);

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}>
      <div className="flex items-end">
        <div className="bg-sky-200 rounded-lg drop-shadow-md p-2 mb-3">
          질문해줘
        </div>
        <img src={dog} width={"100px"} onClick={() => handleOpen(1)}></img>
        {open === 1 && <Chatbotmain closeModal={handleOpen}></Chatbotmain>}
        {open === 1 && (
          <BotModal closeModal={handleOpen} children={""}></BotModal>
        )}
      </div>
    </div>
  );
};

export default Bot;
