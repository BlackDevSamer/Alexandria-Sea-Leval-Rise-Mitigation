import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRiskStore } from "../store/riskStore";
import { RiskMap } from "./RiskMap";
import { Send, Bot, User, Sparkles, Wind, Droplets, Waves } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// TODO: Fetch from API
const ChatPrediction = () => {
  const { setScenario, setYear } = useRiskStore();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);

  // BACKEND: GET /api/chat/metrics
  // Fetch real-time metrics for charts
  useEffect(() => {
    // Placeholder
    setChartData([]);
  }, []);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "مرحباً. أنا مساعدك الذكي للتنبؤ بمخاطر الغرق. يمكنك سؤالي عن سيناريوهات محددة (مثل SSP5-8.5) أو سنوات مستقبلية (مثل 2050).",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: inputValue }]);
    const userText = inputValue;
    setInputValue("");
    setIsTyping(true);

    // BACKEND ENDPOINT: POST /api/chat
    // Body: { message: string, context: { scenario, year } }
    const sendMessageToBot = async () => {
      try {
        /* 
            const response = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({ message: userText, context: { selectedScenario, selectedYear } })
            });
            const data = await response.json();
            setMessages((prev) => [...prev, { type: "bot", text: data.reply }]);
            */

        // Simulate delay for now, but without hardcoded logic
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              type: "bot",
              text: "النظام بانتظار الربط مع الخادم (Backend Integration Pending)...",
            },
          ]);
          setIsTyping(false);
        }, 1000);
      } catch (error) {
        console.error("Chat Error", error);
        setIsTyping(false);
      }
    };

    sendMessageToBot();
  };

  return (
    <div className="absolute inset-0 flex flex-col lg:flex-row bg-gray-50 overflow-hidden animate-fade-in">
      {/* Left Side: Interactive Map & Dashboard */}
      <div className="flex-1 flex flex-col h-[60%] lg:h-full relative z-0">
        {/* Map Container */}
        <div className="flex-1 relative bg-gray-100">
          <RiskMap className="h-full w-full rounded-none border-0" />

          {/* Overlay Stats - Subtle */}
          <div className="absolute top-4 left-4 z-[400] flex gap-2">
            <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              محاكاة حية
            </div>
          </div>
        </div>

        {/* Bottom Metrics Dashboard */}
        <div className="h-48 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 grid grid-cols-3 gap-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-10">
          {chartData.length > 0 ? (
            <>
              {/* Chart 1 */}
              <div className="flex flex-col relative hover:bg-white transition-all p-3 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm group">
                <div className="flex items-center gap-2 mb-2 justify-end">
                  <span className="text-[10px] text-gray-400 font-bold group-hover:text-emerald-500 transition-colors">
                    كم/ساعة
                  </span>
                  <h4 className="font-bold text-gray-700 text-xs text-right group-hover:text-emerald-600 transition-colors">
                    سرعة الرياح
                  </h4>
                  <Wind className="w-3 h-3 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="colorWind"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorWind)"
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2 */}
              <div className="flex flex-col relative hover:bg-white transition-all p-3 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm group">
                <div className="flex items-center gap-2 mb-2 justify-end">
                  <span className="text-[10px] text-gray-400 font-bold group-hover:text-blue-500 transition-colors">
                    مم/ساعة
                  </span>
                  <h4 className="font-bold text-gray-700 text-xs text-right group-hover:text-blue-600 transition-colors">
                    معدل الأمطار
                  </h4>
                  <Droplets className="w-3 h-3 text-blue-500" />
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="colorRain"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorRain)"
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 3 */}
              <div className="flex flex-col relative hover:bg-white transition-all p-3 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm group">
                <div className="flex items-center gap-2 mb-2 justify-end">
                  <span className="text-[10px] text-gray-400 font-bold group-hover:text-indigo-500 transition-colors">
                    سم
                  </span>
                  <h4 className="font-bold text-gray-700 text-xs text-right group-hover:text-indigo-600 transition-colors">
                    مستوى البحر
                  </h4>
                  <Waves className="w-3 h-3 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="colorSea"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6366f1"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6366f1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#6366f1"
                        fillOpacity={1}
                        fill="url(#colorSea)"
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <div className="col-span-3 flex items-center justify-center text-gray-500 text-sm">
              بانتظار تدفق البيانات الحية...
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Chat Panel */}
      <div className="w-full lg:w-[400px] h-[40%] lg:h-full bg-white border-t lg:border-t-0 lg:border-r border-gray-200 flex flex-col shadow-2xl z-20">
        {/* Chat Header */}
        <div className="bg-white/80 backdrop-blur p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">
                مساعد التنبؤ الذكي
              </h3>
              <p className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                متصل الآن
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-gray-50/50 p-4 overflow-y-auto space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 animate-fade-in ${
                msg.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.type === "user"
                    ? "bg-white border-gray-200"
                    : "bg-blue-600 border-blue-600"
                }`}
              >
                {msg.type === "user" ? (
                  <User className="w-4 h-4 text-gray-600" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              <div
                className={`max-w-[80%] space-y-1 ${
                  msg.type === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                    msg.type === "user"
                      ? "bg-gray-900 text-white rounded-tr-none"
                      : "bg-white border border-gray-200 text-gray-700 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 px-1">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white border-t border-gray-100"
        >
          <div className="relative group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="اكتب استفسارك هنا..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-right shadow-inner text-sm transition-all text-gray-800 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-2">
            يمكن لنموذج الذكاء الاصطناعي ارتكاب أخطاء. يرجى مراجعة البيانات
            المهمة.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatPrediction;
