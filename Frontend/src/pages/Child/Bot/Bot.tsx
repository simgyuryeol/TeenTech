import React from 'react';
import Chatbotmain from './chatbotmain';
import BotModal from '../../../components/Bot/BotModal';
import dog from "../../../assets/Teen9/Dog.png"

const Bot: React.FC = () => {

    const [open, setOpen] = React.useState(0);
 
    const handleOpen = (value: React.SetStateAction<number>) => setOpen(open === value ? 0 : value);

    return (
        <div className='flex justify-center'>
            <img src={dog} width={'15%'} onClick={() => handleOpen(1)}></img>
        {open === 1 && (
            <Chatbotmain closeModal={handleOpen}>
            </Chatbotmain>
             )}
        {open === 1 && (
            <BotModal closeModal={handleOpen}>
            </BotModal>
             )}
        </div>
    )
};

export default Bot;