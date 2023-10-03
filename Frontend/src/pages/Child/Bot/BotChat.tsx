import { useState, useEffect } from "react";
import axios from "axios";

const BotChat: React.FC = () => {
  const conversation_id = '12345';
  const [prompt, setPrompt] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ message: string; isUser: boolean }[]>([]);

  useEffect(() => {
    // chatHistory가 업데이트될 때마다 스크롤을 가장 아래로 이동
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  const handleClick = async () => {
    try {
      setLoading(true);
      await axios
        .post(`http://localhost:8000/chat`, {
          conversation_id: `${conversation_id}`,
          message: `${prompt}`,
        })
        .then((response) => {
          console.log(response.data);
          setResult(response.data);
          setChatHistory((prevChat) => [
            ...prevChat,
            { message: prompt, isUser: true },
            { message: response.data, isUser: false },
          ]);
          setPrompt("");
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-20 w-100 z-50 flex items-center flex-col bg-white rounded-xl">
      <div className="flex flex-col rounded-md">
        <div
          id="chat-container"
          className=" pt-20 pr-5 pl-5 border w-[100vw] h-[75vh] text-lg bg-blue-200 overflow-auto rounded-t-md"
        >
          {chatHistory.map((messageData, index) => (
            <div key={index} className={`mb-${index === chatHistory.length -1 ? '4' : '2'}`}>
              <p className={`text-md ${messageData.isUser ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block py-[8px] px-[12px] rounded-lg ${
                    messageData.isUser ? 'bg-green-500 text-white' : 'bg-white'
                  }`}
                >
                  {messageData.message}
                </span>
              </p>
            </div>
	))}
	</div>
	<div className="flex flex-col border rounded-b-md">
  {/* 입력창 */}
  <textarea
  value={prompt}
   onChange={(e) => setPrompt(e.target.value)}
   placeholder="궁금한 질문을 입력해주세요."
   className="focus:outline-none h-[10vh] pl-1 resize-none"
  ></textarea>
   
   {/* 전송 버튼 */}
   <button
     onClick={handleClick}
     disabled={loading || prompt.length === 0}
     className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
       loading ? "opacity-50 cursor-not-allowed" : ""
     }`}
   >
     {loading ? "전송중..." : "전송"}
   </button>
   
	</div>
     </div>
   </div>
 );
};

export default BotChat;
