import React from "react";
import Header from "./Header";
import {
  Calendar,
  FileText,
  Download,
  Printer,
  Wind,
  Droplets,
  Waves,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// TODO: Fetch from API
const data = [];

const ReportsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Header active="reports" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">صفحة التقارير</h1>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نوع التقرير
                </label>
                <select className="block w-full text-right bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                  <option>يومي</option>
                  <option>أسبوعي</option>
                  <option>شهري</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  النطاق الزمني
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    defaultValue="24/10/2023 - 24/10/2023"
                    className="block w-full text-right bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المدينة / المنطقة
                </label>
                <select className="block w-full text-right bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                  <option>الإسكندرية</option>
                  <option>دمياط</option>
                  <option>رشيد</option>
                  <option>بورسعيد</option>
                  <option>مرسى مطروح</option>
                  <option>العريش</option>
                  <option>بلطيم</option>
                  <option>جمصة</option>
                  <option>إدكو</option>
                </select>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-primary hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
                إصدار التقرير
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50">
              <Printer className="w-4 h-4" />
              طباعة التقرير
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50">
              <Download className="w-4 h-4" />
              تحميل PDF
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-center text-gray-800">
              تقرير حالة الفيضان - مدينة الإسكندرية (24 أكتوبر 2023)
            </h2>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Right: Input Data */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-r-4 border-primary pr-3">
                بيانات الإدخال
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="divide-y divide-gray-100">
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50">
                    <span className="text-gray-600 font-medium">
                      منسوب المياه الحالي
                    </span>
                    <span className="text-gray-900 font-bold">1.2 متر</span>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50">
                    <span className="text-gray-600 font-medium">
                      سرعة الرياح
                    </span>
                    <span className="text-gray-900 font-bold">25 كم/س</span>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50">
                    <span className="text-gray-600 font-medium">
                      توقعات الأمطار
                    </span>
                    <span className="text-gray-900 font-bold">غزيرة</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Left: Warning Card */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-r-4 border-primary pr-3">
                نتيجة التنبؤ
              </h3>
              <div className="bg-orange-500 rounded-xl p-8 text-white flex flex-col items-center justify-center text-center shadow-lg transform transition hover:scale-[1.02]">
                <Waves className="w-16 h-16 mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">
                  مستوى الخطر: متوسط (تنبيه)
                </h3>
                <div className="w-16 h-1 bg-white/30 rounded-full mt-2"></div>
              </div>
            </div>

            {/* Bottom Left: Recommendations */}
            <div className="space-y-4 lg:col-start-1 lg:row-start-2">
              <h3 className="text-lg font-bold text-gray-800 border-r-4 border-primary pr-3">
                توصيات النظام
              </h3>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 font-medium">
                      رفع درجة الاستعداد في محطات الرفع والمصبات
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 font-medium">
                      إبلاغ غرف الطوارئ بالمحافظة لاتخاذ اللازم
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 font-medium">
                      مراقبة النقاط الساخنة على الكورنيش بشكل مستمر
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Right: Chart */}
            <div className="space-y-4 lg:col-start-2 lg:row-start-2">
              <h3 className="text-lg font-bold text-gray-800 border-r-4 border-primary pr-3">
                رسوم بيانية
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4 h-64">
                <div className="text-center text-sm text-gray-500 mb-2">
                  توقعات منسوب المياه (48 ساعة)
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      cursor={{
                        stroke: "#1a4e9e",
                        strokeWidth: 1,
                        strokeDasharray: "4 4",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#1a4e9e"
                      strokeWidth={3}
                      dot={{
                        fill: "#1a4e9e",
                        strokeWidth: 2,
                        r: 4,
                        stroke: "#fff",
                      }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
