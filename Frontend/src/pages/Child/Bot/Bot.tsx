import React from "react";
import Chatbotmain from "./chatbotmain";
import BotModal from "../../../components/Bot/BotModal";
import Bear from "../../../assets/Teen9/Bear.png";
import Dog from "../../../assets/Teen9/Dog.png";
import Elephant from "../../../assets/Teen9/Elephant.png";
import Koala from "../../../assets/Teen9/Koala.png";
import monkey from "../../../assets/Teen9/monkey.png";
import Panda from "../../../assets/Teen9/Panda.png";
import Sloth from "../../../assets/Teen9/Sloth.png";
import { teen9Atom } from "../../../recoil/teen9Atom";
import { useRecoilState } from "recoil";

const imageMap = {
  Bear: Bear,
  Dog: Dog,
  Elephant: Elephant,
  Koala: Koala,
  monkey: monkey,
  Panda: Panda,
  Sloth: Sloth,
};

const Bot: React.FC = () => {
  const [open, setOpen] = React.useState(0);
  const [teen9url] = useRecoilState(teen9Atom);
  console.log(teen9url.avatarImageUrl);

  const handleOpen = (value: React.SetStateAction<number>) =>
    setOpen(open === value ? 0 : value);

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}>
      <div className="flex items-end">
        <div className="bg-sky-200 rounded-lg drop-shadow-md p-2 mb-3">
          질문해줘
        </div>
        <img
          src={imageMap[teen9url.avatarImageUrl]}
          width={"100px"}
          onClick={() => handleOpen(1)}
        ></img>

        {open === 1 && <Chatbotmain closeModal={handleOpen}></Chatbotmain>}
        {open === 1 && (
          <BotModal closeModal={handleOpen} children={""}></BotModal>
        )}
      </div>
    </div>
  );
};

export default Bot;
