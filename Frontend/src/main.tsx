// import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./index.css";
import Bot from "./pages/Child/Bot/Bot.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RecoilRoot>
    <App />
    {/* 챗봇 */}
    <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}>
      <div className="flex items-end">
        <div className="bg-sky-200 rounded-lg drop-shadow-md p-2 mb-3">
          질문해줘
        </div>
        <Bot />
      </div>
    </div>
  </RecoilRoot>
  // </React.StrictMode>
);
