import React, { useState } from "react";
import Header from "./Header";
import ManualPrediction from "./ManualPrediction";
import ChatPrediction from "./ChatPrediction";

const PredictionsPage = () => {
  const [mode, setMode] = useState("chat"); // 'chat' or 'manual'

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col" dir="rtl">
      <Header active="predictions" />

      <main className="flex-1 flex flex-col w-full h-full relative">
        {/* Toggle Switch - Floating or Top Bar */}
        <div className="bg-white border-b border-gray-200 py-2 px-4 flex justify-center shadow-sm z-10">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setMode("manual")}
              className={`px-6 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === "manual"
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              التنبؤ اليدوي
            </button>
            <button
              onClick={() => setMode("chat")}
              className={`px-6 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === "chat"
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              التنبؤ الذكي
            </button>
          </div>
        </div>

        {/* Content Area - Fills remaining space */}
        <div className="flex-1 relative overflow-hidden">
          {mode === "manual" ? <ManualPrediction /> : <ChatPrediction />}
        </div>
      </main>
    </div>
  );
};

export default PredictionsPage;
