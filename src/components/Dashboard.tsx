import { useEffect } from "react";
import { useRiskStore } from "../store/riskStore";
import { DashboardControls } from "./DashboardControls";
import { RiskMap } from "./RiskMap";
import { RiskCharts } from "./RiskCharts";

export const Dashboard = () => {
  const { initialize, error } = useRiskStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">حدث خطأ</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div
          className="container mx-auto px-4 py-4 flex justify-between items-center"
          dir="rtl"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                نظام محاكاة مخاطر الغرق
              </h1>
              <p className="text-xs text-gray-500">
                محافظة الإسكندرية - وحدة البيانات المكانية
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              متصل بالنظام
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Intro */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            لوحة التحكم التفاعلية
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استعرض سيناريوهات التغير المناخي وتأثيرها المتوقع على المناطق
            الساحلية والبنية التحتية حتى عام 2100.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar Controls - 1 Col */}
          <div className="xl:col-span-1 order-2 xl:order-1">
            <DashboardControls />

            {/* Info Card */}
            <div
              className="mt-6 bg-blue-50/50 border border-blue-100 p-4 rounded-xl"
              dir="rtl"
            >
              <h4 className="font-bold text-blue-800 text-sm mb-2">
                عن السيناريوهات (SSP)
              </h4>
              <p className="text-xs text-blue-700/80 leading-relaxed">
                تعتمد المحاكاة على مسارات الاجتماعية والاقتصادية المشتركة (SSPs)
                المعتمدة من الهيئة الحكومية الدولية المعنية بتغير المناخ (IPCC).
              </p>
            </div>
          </div>

          {/* Main Visuals - 3 Cols */}
          <div className="xl:col-span-3 space-y-6 order-1 xl:order-2">
            {/* Map Section */}
            <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
              <RiskMap />
            </div>

            {/* Charts Section */}
            <RiskCharts />
          </div>
        </div>
      </main>
    </div>
  );
};
