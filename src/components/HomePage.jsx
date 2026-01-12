import React, { useEffect } from "react";
import Header from "./Header";
import { useRiskStore } from "../store/riskStore";
import {
  Users,
  Waves,
  Building2,
  ExternalLink,
  FileText,
  Map,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { dashboardData, initialize } = useRiskStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Header active="home" />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative h-[1000px] w-full bg-slate-900 text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 bg-slate-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d54602.18844150924!2d29.900389000000004!3d31.203083000000003!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1767744874248!5m2!1sen!2sus"
              className="w-full h-full opacity-40 object-cover pointer-events-none"
              title="Default Map Background"
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30"></div>
          </div>

          <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center z-10 py-12">
            {/* Ministry Logo & Branding */}
            <div className="mb-8 flex flex-col items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Coat_of_arms_of_Egypt_%28Official%29.svg"
                alt="Ministry Logo"
                className="w-20 h-auto mb-4 opacity-90"
              />
              <h2 className="text-lg font-bold text-white mb-1">
                وزارة الري والموارد المائية
              </h2>
              <p className="text-sm text-gray-300 font-medium">
                نظام إدارة التنبؤات الفيضانات
              </p>
            </div>

            <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 flex items-center gap-2">
              <Map className="w-4 h-4" />
              دراسة حالة: الإسكندرية، مصر
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
              استشراف مستقبل الإسكندرية <br />
              <span className="text-blue-200">تقييم الضعف الساحلي</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
              تصور تأثيرات ارتفاع مستوى سطح البحر في ظل المسارات الاجتماعية
              والاقتصادية المشتركة (SSPs) لإرشاد السياسات وتخطيط المرونة.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/analytics"
                className="bg-primary hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
              >
                استكشاف السيناريوهات
              </Link>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                قراءة التقرير الكامل
              </button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-20 -mt-10 relative z-20">
          {/* Section 2: Metrics */}
          <div className="mb-24">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                مؤشرات الضعف الرئيسية (توقعات عام 2100)
              </h2>
              <p className="text-gray-500 text-lg mt-2">
                بناءً على سيناريو SSP5-8.5 (العمل كالمعتاد)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Population Card */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                    <Users className="w-7 h-7" />
                  </div>
                  <span
                    className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1"
                    dir="ltr"
                  >
                    +15% vs 2050 ↗
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                    السكان المعرضون للخطر
                  </h3>
                  <p className="text-5xl font-extrabold text-gray-900">
                    {dashboardData?.populationAtRisk.toLocaleString() || "--"}
                  </p>
                </div>
              </div>

              {/* Area Card */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                    <Waves className="w-7 h-7" />
                  </div>
                  <span className="bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1">
                    ⚠ حرج
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                    المناطق المغمورة
                  </h3>
                  <p className="text-5xl font-extrabold text-gray-900">
                    {dashboardData?.floodedAreaKm2.toLocaleString() || "--"}
                  </p>
                </div>
              </div>

              {/* Districts Card */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1">
                    أولوية قصوى
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                    المناطق الحيوية (الأقسام)
                  </h3>
                  <p className="text-5xl font-extrabold text-gray-900">
                    {dashboardData?.highRiskAreas.length || "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Scenarios & Data */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-24">
            {/* Scenarios Section */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  فهم السيناريوهات
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  تستخدم هذه اللوحة أحدث نماذج المناخ CMIP6 لتوقع تأثيرات ارتفاع
                  مستوى سطح البحر (SLR). نركز على مسارين رئيسيين اجتماعيين
                  واقتصاديين (SSPs) حددتهما الهيئة الحكومية الدولية المعنية
                  بتغير المناخ (IPCC):
                </p>
              </div>

              {/* SSP1-2.6 Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 flex gap-6 transition-all hover:border-green-500 hover:shadow-md group cursor-pointer relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-green-500 rounded-l-xl"></div>
                <div className="mt-1">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <span className="font-bold text-xl">🌿</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    SSP1-2.6 (المتفائل)
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    مسار يركز على الاستدامة حيث يتم خفض انبعاثات ثاني أكسيد
                    الكربون العالمية بشدة، مما يحد من الاحترار إلى أقل من 2 درجة
                    مئوية.
                  </p>
                </div>
              </div>

              {/* SSP5-8.5 Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 flex gap-6 transition-all hover:border-red-500 hover:shadow-md group cursor-pointer relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500 rounded-l-xl"></div>
                <div className="mt-1">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <span className="font-bold text-xl">🏭</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    SSP5-8.5 (العمل كالمعتاد)
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    مسار تنمية يعتمد على الوقود الأحفوري مع استهلاك عالٍ للطاقة،
                    مما يؤدي إلى احترار كبير وارتفاع أعلى لمستوى سطح البحر.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Sources Section */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 h-fit sticky top-8">
              <h3 className="font-bold text-xl text-gray-900 mb-6">
                مصادر البيانات
              </h3>
              <ul className="space-y-5 mb-8">
                <li className="flex items-start gap-4 text-gray-700">
                  <ExternalLink className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>تقرير IPCC AR6 (2021)</span>
                </li>
                <li className="flex items-start gap-4 text-gray-700">
                  <ExternalLink className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>بوابة ناسا لتغير مستوى سطح البحر</span>
                </li>
                <li className="flex items-start gap-4 text-gray-700">
                  <ExternalLink className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>بيانات التعداد السكاني (CAPMAS)</span>
                </li>
              </ul>
              <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors">
                عرض المنهجية
              </button>
            </div>
          </div>

          {/* Section 4: Call to Action */}
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 relative overflow-hidden text-center mb-12">
            {/* Background Image */}
            <div className="absolute inset-0 bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                مستعد لتحليل التأثير؟
              </h2>
              <p className="text-slate-300 mb-8 text-lg">
                استكشف الخرائط التفاعلية مع كثافة السكان والبنية التحتية الحيوية
                لتحديد المناطق عالية المخاطر في الإسكندرية.
              </p>
              <Link
                to="/predictions"
                className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/20 transition-all transform hover:-translate-y-1"
              >
                تشغيل الخريطة التفاعلية
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
