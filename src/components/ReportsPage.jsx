import React, { useState, useEffect } from "react";
import Header from "./Header";
import {
  FileText,
  Download,
  Printer,
  ChevronDown,
  AlertTriangle,
  Users,
  Building2,
  Anchor,
  LayoutGrid,
  List,
  ArrowRight,
  Waves,
  Home,
  ShieldAlert,
  Share,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useToast } from "../contexts/ToastContext";

const ReportsPage = () => {
  const { addToast } = useToast();

  const [floodData, setFloodData] = useState([]);
  const [populationData, setPopulationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // BACKEND ENDPOINT: GET /api/reports/statistics
  // Params: ?scenario=...&year=...
  useEffect(() => {
    setIsLoading(true);
    // Placeholder for backend fetch
    setFloodData([]);
    setPopulationData([]);
    setIsLoading(false);
  }, []);

  const handleExportCSV = () => {
    // Generate CSV content
    const headers = [
      "Year",
      "Flood Risk (%)",
      "Population Group",
      "Percentage",
    ];
    const rows = [
      ...floodData.map((d) => [d.name, d.value, "", ""]),
      ...populationData.map((d) => ["", "", d.name, d.value]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "alexandria_risk_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("تم تصدير التقرير بنجاح", "success");
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900" dir="rtl">
      <Header active="reports" />

      <main className="container mx-auto px-6 py-8 space-y-8 print:py-0 print:px-0">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in print:hidden">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              تقارير المخاطر ورؤى السياسات
            </h1>
            <p className="text-gray-500 max-w-2xl">
              تقييم شامل لضعف السواحل في محافظة الإسكندرية، مصر، لدعم اتخاذ
              القرارات والتخطيط الحضري.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-bold shadow-sm transition-colors">
            <FileText className="w-4 h-4" />
            عرض المنهجية
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col xl:flex-row items-center justify-between gap-4 shadow-sm animate-slide-up delay-100 print:hidden">
          {/* Filters Group */}
          <div className="flex flex-wrap gap-4 w-full xl:w-auto">
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 cursor-pointer min-w-[160px] justify-between group hover:border-blue-500/50 transition-all">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  السيناريو
                </span>
                <span className="font-bold text-gray-900 text-sm">
                  SSP5-8.5
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            </div>

            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 cursor-pointer min-w-[140px] justify-between group hover:border-blue-500/50 transition-all">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  السنة
                </span>
                <span className="font-bold text-gray-900 text-sm">2050</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            </div>

            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 cursor-pointer min-w-[180px] justify-between group hover:border-blue-500/50 transition-all">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  المستوى الإداري
                </span>
                <span className="font-bold text-gray-900 text-sm">
                  كل الأقسام
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            </div>
          </div>

          {/* Action Buttons Group */}
          <div className="flex gap-3 w-full xl:w-auto justify-end">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
            >
              <Share className="w-4 h-4" />
              تصدير CSV
            </button>
            <button
              onClick={handlePrintPDF}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 transition-colors"
            >
              <FileText className="w-4 h-4" />
              تحميل PDF
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up delay-100">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                مستوى المخاطر العام
              </h3>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">--</div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded w-fit">
              <span>--% بحلول 2030</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                السكان المعرضون للخطر
              </h3>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">--</div>
            <div className="flex items-center gap-2 text-xs font-bold text-yellow-700 bg-yellow-50 px-2 py-1 rounded w-fit">
              <Users className="w-3 h-3" />
              <span>مناطق عالية الكثافة</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                أحياء عالية المخاطر
              </h3>
              <LayoutGrid className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">
              -- أحياء
            </div>
            <p className="text-xs text-gray-500 truncate">--</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                الأصول الحيوية
              </h3>
              <Anchor className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">--</div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">
              <span>تأثير استراتيجي</span>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Title */}
        <div className="flex justify-between items-center pt-8 animate-slide-up delay-200">
          <h2 className="text-2xl font-bold text-gray-900">
            تحليل التقرير المفصل
          </h2>
          <div className="flex bg-white border border-gray-200 rounded-lg p-1">
            <button className="p-2 hover:bg-gray-50 rounded">
              <LayoutGrid className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded">
              <List className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Detailed Analysis Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up delay-200">
          {/* Analysis Card 1: Coastal Flood Risk */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Waves className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  مخاطر الفيضانات الساحلية
                </h3>
              </div>
              <span className="bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-red-100">
                حرج للغاية
              </span>
            </div>

            <div className="h-48 w-full bg-gray-50 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
              {floodData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={floodData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: "#e0f2fe" }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <span className="text-gray-400 text-sm">
                  انتظار البيانات...
                </span>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-sm text-gray-600 font-medium">--</p>
              <ul className="space-y-2">
                <li className="flex gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                  --
                </li>
                <li className="flex gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                  --
                </li>
              </ul>
            </div>

            <button className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
              استكشاف البيانات <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Analysis Card 2: Population Exposure */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  التعرض السكاني
                </h3>
              </div>
              <span className="bg-yellow-50 text-yellow-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-yellow-100">
                مرتفع
              </span>
            </div>

            <div className="flex justify-center mb-6 h-48 relative">
              {populationData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={populationData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {populationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-3xl font-extrabold text-slate-800">
                      22%
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      من إجمالي السكان
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl">
                  <span className="text-gray-400 text-sm">
                    انتظار البيانات...
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-sm text-gray-600 font-medium">
                يعيش أكثر من 1.2 مليون ساكن في مناطق عالية الضعف تحت علامة
                ارتفاع 2 متر.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                  أعلى تركز للمخاطر في المنتزة والعامرية.
                </li>
                <li className="flex gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                  35٪ من السكان المعرضين للخطر هم من الأطفال دون سن 14 وكبار
                  السن فوق 65.
                </li>
              </ul>
            </div>

            <button className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
              التوزيع الديموغرافي <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Analysis Card 3: Infrastructure Impact */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  تأثير البنية التحتية
                </h3>
              </div>
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">
                مراقبة
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-xs text-gray-500 font-bold mb-1">
                  قدرة الميناء
                </div>
                <div className="text-2xl font-bold text-red-600">-18%</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-xs text-gray-500 font-bold mb-1">
                  شبكة الطرق
                </div>
                <div className="text-2xl font-bold text-orange-500">42km</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-sm text-gray-600 font-medium">
                المناطق الصناعية الحيوية وميناء الإسكندرية يواجهون تعطيلاً
                تشغيلياً مباشراً بسبب ارتفاع مستوى سطح البحر.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                  خط السكة الحديد المؤدي للقاهرة معرض لخطر الهبوط المتكرر في
                  قطاع مرغم.
                </li>
                <li className="flex gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                  3 محطات تحلية رئيسية تتطلب تحصيناً هيكلياً بحلول عام 2035.
                </li>
              </ul>
            </div>

            <button className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
              جرد الأصول <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Analysis Card 4: Informal Settlements */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  المناطق العشوائية
                </h3>
              </div>
              <span className="bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-red-100">
                هشاشة
              </span>
            </div>

            <div className="h-32 w-full bg-slate-200 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-[linear-gradient(45deg,#f1f5f9_25%,#e2e8f0_25%,#e2e8f0_50%,#f1f5f9_50%,#f1f5f9_75%,#e2e8f0_75%,#e2e8f0_100%)] bg-[length:20px_20px] opacity-20"></div>
              <div className="absolute text-gray-400 font-bold text-sm flex gap-2 items-center">
                <ShieldAlert className="w-5 h-5" />
                <span>خريطة الكثافة الحضرية</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-sm text-gray-600 font-medium">--</p>
              <ul className="space-y-2">
                <li className="flex gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                  --
                </li>
                <li className="flex gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                  --
                </li>
              </ul>
            </div>

            <button className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
              إرشادات السياسة الحضرية <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer / Methodology */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white animate-fade-in mt-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-xl font-bold mb-4 border-r-4 border-blue-500 pr-4">
                المنهجية ومصادر البيانات
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                يستخدم هذا التقييم نماذج المناخ العالمية CMIP6 المصغرة لحوض
                البحر الأبيض المتوسط. يتم استخلاص بيانات الارتفاع من مسوحات
                LiDAR بدقة 1 متر التي أجريت في عام 2023.
              </p>
              <p className="text-slate-600 text-[10px] mt-6 italic">
                إخلاء مسؤولية: هذا التقرير لأغراض التخطيط الحضري ومحاكاة
                السياسات فقط. قد تختلف أحداث الفيضانات الفعلية بناءً على الظروف
                الجوية المحلية وأداء الجدران البحرية.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
                  نسخة النموذج
                </div>
                <div className="font-mono text-blue-400 font-bold">
                  Alex-CVI v4.2.1
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
                  آخر تحديث
                </div>
                <div className="font-mono text-white">12 أكتوبر 2024</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
                  موثوقية البيانات
                </div>
                <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full box-shadow-green"></span>
                  94.2% موثوقية
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
