import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRiskStore } from "../store/riskStore";
import {
  Send,
  Plus,
  Minus,
  Maximize,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
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
  const [chartData, setChartData] = useState([
    { time: "00:00", value: 30 },
    { time: "04:00", value: 45 },
    { time: "08:00", value: 60 },
    { time: "12:00", value: 80 },
    { time: "16:00", value: 65 },
    { time: "20:00", value: 50 },
    { time: "24:00", value: 40 },
  ]);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "مرحباً. من فضلك أدخل سيناريو التغير المناخي (مثال: SSP585) والسنة المستهدفة (مثال: 2050) لعرض التحليلات.",
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

    // Simulate Bot Response
    // Simulate Bot Response & Action
    setTimeout(() => {
      let responseText = "";
      const lowerText = userText.toLowerCase();

      // Parse Scenario
      let detectedScenario = null;
      if (lowerText.includes("ssp126") || lowerText.includes("126"))
        detectedScenario = "SSP126";
      else if (lowerText.includes("ssp245") || lowerText.includes("245"))
        detectedScenario = "SSP245";
      else if (lowerText.includes("ssp370") || lowerText.includes("370"))
        detectedScenario = "SSP370";
      else if (lowerText.includes("ssp585") || lowerText.includes("585"))
        detectedScenario = "SSP585";

      // Parse Year
      let detectedYear = null;
      if (lowerText.includes("2030")) detectedYear = "2030";
      else if (lowerText.includes("2050")) detectedYear = "2050";
      else if (lowerText.includes("2070")) detectedYear = "2070";
      else if (lowerText.includes("2100")) detectedYear = "2100";

      if (detectedScenario || detectedYear) {
        if (detectedScenario) setScenario(detectedScenario);
        if (detectedYear) setYear(detectedYear);

        responseText = (
          <div>
            <p className="font-bold mb-1 text-gray-800">جاري تحديث النظام...</p>
            <p className="text-sm">
              تم رصد:
              {detectedScenario && (
                <span className="font-bold text-blue-600 mx-1">
                  {detectedScenario}
                </span>
              )}
              {detectedYear && (
                <span className="font-bold text-blue-600 mx-1">
                  {detectedYear}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              جاري الانتقال لصفحة التحليلات...
            </p>
          </div>
        );

        setTimeout(() => {
          navigate("/analytics");
        }, 2000);
      } else {
        responseText =
          "الرجاء إدخال سيناريو صالح (مثال: SSP585) وسنة صالحة (2030, 2050, 2070, 2100).";
      }

      setMessages((prev) => [...prev, { type: "bot", text: responseText }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="absolute inset-0 flex gap-4 bg-gray-50 p-4 animate-fade-in">
      {/* Left Side: Map & Dashboard (Resizable or Flex) */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Top: Map (Takes remaining height minus chart height) */}
        <div className="flex-1 relative bg-blue-50 border-r border-b border-gray-200 transition-all hover:shadow-md duration-300">
          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <button className="bg-white p-2 rounded shadow hover:bg-gray-50 transform hover:scale-105 transition-transform">
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
            <button className="bg-white p-2 rounded shadow hover:bg-gray-50 transform hover:scale-105 transition-transform">
              <Minus className="w-5 h-5 text-gray-600" />
            </button>
            <button className="bg-white p-2 rounded shadow hover:bg-gray-50 transform hover:scale-105 transition-transform">
              <Maximize className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="absolute top-4 right-4 z-10 bg-white rounded shadow-md px-4 py-2 w-72 flex items-center transition-all focus-within:ring-2 focus-within:ring-primary">
            <input
              type="text"
              placeholder="مستوى الخطر"
              className="w-full text-right text-sm outline-none placeholder-gray-400"
            />
          </div>

          {/* Full Map Iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d54602.18844150924!2d29.900389000000004!3d31.203083000000003!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1767744874248!5m2!1sen!2sus"
            className="w-full h-full border-0 absolute inset-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Prediction Map Satellite"
          ></iframe>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 p-3 rounded shadow-md border border-gray-100 z-10 transition-transform hover:translate-y-[-2px]">
            <h4 className="font-bold text-xs mb-2 text-right">مستوى الخطر:</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-xs">منخفض</span>
                <div className="w-3 h-3 bg-green-400 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-xs">متوسط</span>
                <div className="w-3 h-3 bg-orange-400 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-xs">مرتفع</span>
                <div className="w-3 h-3 bg-red-500 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-xs">شديد</span>
                <div className="w-3 h-3 bg-red-900 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Charts Dashboard (Boxed Height) */}
        <div className="h-56 bg-white border-t border-gray-200 p-4 grid grid-cols-3 gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
          {/* Chart 1 */}
          <div className="flex flex-col relative hover:bg-gray-50 transition-colors p-2 rounded-lg cursor-pointer group">
            <h4 className="font-bold text-gray-800 text-sm text-right mb-1 group-hover:text-primary transition-colors">
              سرعة الرياح (كم/ساعة)
            </h4>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    fill="#d1fae5"
                    strokeWidth={2}
                  />
                  <XAxis dataKey="time" hide />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2 */}
          <div className="flex flex-col relative border-r border-gray-100 pr-4 hover:bg-gray-50 transition-colors p-2 rounded-lg cursor-pointer group">
            <h4 className="font-bold text-gray-800 text-sm text-right mb-1 group-hover:text-primary transition-colors">
              كمية الأمطار (مم/ساعة)
            </h4>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#dbeafe"
                    strokeWidth={2}
                  />
                  <XAxis dataKey="time" hide />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3 */}
          <div className="flex flex-col relative border-r border-gray-100 pr-4 hover:bg-gray-50 transition-colors p-2 rounded-lg cursor-pointer group">
            <h4 className="font-bold text-gray-800 text-sm text-right mb-1 group-hover:text-primary transition-colors">
              مستوى سطح البحر (سم)
            </h4>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                  <XAxis dataKey="time" hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Chat Panel (Fixed Width) */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col shadow-xl z-20">
        <div className="bg-primary px-4 py-4 text-white text-center font-bold text-lg shadow-md">
          نظام التنبؤ الذكي
        </div>

        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
          {/* Messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 items-start animate-fade-in"
            >
              <div
                className={`px-4 py-3 rounded-2xl text-sm max-w-[90%] shadow-sm ${
                  msg.type === "user"
                    ? "bg-primary text-white rounded-tl-none self-start"
                    : "bg-white border border-gray-200 text-gray-800 rounded-tr-none text-right self-end"
                }`}
              >
                <span
                  className={`font-bold block text-xs mb-1 ${
                    msg.type === "user" ? "text-blue-200" : "text-primary"
                  }`}
                >
                  {msg.type === "user" ? "المستخدم" : "مساعد الحكومة"}
                </span>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex flex-col gap-1 items-start animate-fade-in">
              <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-2xl rounded-tr-none text-sm max-w-[90%] text-right self-end shadow-sm">
                <span className="font-bold block text-xs text-primary mb-1">
                  مساعد الحكومة
                </span>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-gray-200 bg-white"
        >
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-right shadow-sm transition-shadow"
            />
            <button
              type="submit"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPrediction;
