import { useState } from "react";
import axios from "axios";

const BotChat: React.FC = () => {

      const conversation_id = '12345'

      const [prompt, setPrompt] = useState("");
      const [result, setResult] = useState("");
      const [loading, setLoading] = useState(false);
    
      const handleClick = async () => {
        try{
            setLoading(true)
            await axios.post(`http://localhost:8000/chat`, {
            "conversation_id": `${conversation_id}`,
            "message": `${prompt}`
            })  
            .then(response => {
                console.log(response.data);
                setResult(response.data)
            })
          }    
            catch(error){
                console.log(error);
            }
        setLoading(false)
      };
    
      return (
        <main className="main mt-20 bg-gradient-to-b min-h-screen flex items-center justify-center from-gray-700 to-gray-900">
          <div className="w-2/4 mx-auto mt-20">
            <div className="text-white">{result}</div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write your prompt.."
              className="textarea w-full h-28 p-3 lg:p-5 focus:outline-none rounded bg-gray-600 text-white"
            ></textarea>
    
            <button
              onClick={handleClick}
              disabled={loading || prompt.length === 0}
              className="btn py-1.5 lg:py-2 text-lg text-gray-100 rounded px-8 hover:opacity-90 bg-teal-700 font-semibold mt-5 w-full disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
    
            {/* <pre className="result -mt-8 whitespace-pre-line text-gray-200">{result}</pre> */}
          </div>
        </main>
      );
    }
export default BotChat;