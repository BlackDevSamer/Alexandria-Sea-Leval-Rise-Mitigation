import React, { useEffect } from "react";
import Header from "./Header";
import { useRiskStore } from "../store/riskStore";
import {
  Users,
  Waves,
  Building2,
  ExternalLink,
  Map as MapIcon,
  AlertTriangle,
  Zap,
  ShieldCheck,
  BarChart3,
  Layers,
  Search,
  ChevronLeft,
  Info,
  Focus,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { dashboardData, initialize } = useRiskStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-500/30 relative overflow-x-hidden"
      dir="rtl"
    >
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#3B82F6"
              fillOpacity="0.1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            >
              <animate
                attributeName="d"
                dur="20s"
                repeatCount="indefinite"
                values="
                        M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z;
                        M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,96C672,75,768,85,864,106.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z;
                        M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              />
            </path>
          </svg>
        </div>
      </div>

      <Header active="home" />

      <main className="container mx-auto px-6 py-8 space-y-12">
        {/* Section 1: Top Metrics Dashboard */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {/* Card 1: Projected SLR */}
          <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-blue-500/50 transition-all group shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                ارتفاع مستوى البحر المتوقع 2100
              </div>
              <Activity className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {/* BACKEND: Bind to real SLR projection */}
                --
              </span>
              <span className="text-xs text-slate-500 mt-1">
                IPCC SSP5-8.5 خط الأساس
              </span>
            </div>
          </div>

          {/* Card 2: Population at Risk */}
          <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-blue-500/50 transition-all group shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                السكان المعرضون للخطر
              </div>
              <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {dashboardData?.populationAtRisk
                  ? (dashboardData.populationAtRisk / 1000000).toFixed(1) + "M"
                  : "--"}
              </span>
              <span className="text-xs text-red-600 mt-1 font-semibold">
                -- زيادة متوقعة
              </span>
            </div>
          </div>

          {/* Card 3: High Risk Zones */}
          <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-blue-500/50 transition-all group shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                مناطق عالية الخطورة
              </div>
              <Layers className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {/* BACKEND: Bind to risk coverage % */}
                --
              </span>
              <span className="text-xs text-slate-500 mt-1">
                تغطية المناطق الإدارية
              </span>
            </div>
          </div>

          {/* Card 4: Critical Hotspot */}
          <div className="bg-white border border-gray-200 p-6 rounded-2xl border-l-4 border-l-red-500 hover:border-blue-500/50 transition-all group relative overflow-hidden shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                بؤرة حرجة
              </div>
              <Focus className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {dashboardData?.highRiskAreas?.[0] || "--"}
              </span>
              <span className="text-xs text-red-600 mt-1 font-semibold underline underline-offset-4 cursor-pointer">
                إجراء مطلوب
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Geospatial Risk Visualization */}
        <section className="space-y-6 animate-slide-up delay-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                تصور المخاطر المكانية
              </h2>
              <p className="text-gray-600 text-sm">
                نمذجة الغمر في الوقت الفعلي بناءً على قياس الأعماق الحالي وهبوط
                الأرض.
              </p>
            </div>
            <div className="flex bg-white border border-gray-200 p-1 rounded-lg self-start shadow-sm">
              <button className="px-4 py-1.5 text-xs font-bold rounded bg-gray-100 text-gray-900 shadow-sm border border-gray-200">
                SSP1-2.6
              </button>
              <button className="px-4 py-1.5 text-xs font-bold rounded text-gray-500 hover:text-gray-700 transition-colors">
                SSP2-4.5
              </button>
              <button className="px-4 py-1.5 text-xs font-bold rounded text-gray-500 hover:text-gray-700 transition-colors">
                SSP5-8.5
              </button>
            </div>
          </div>

          <div className="relative h-[500px] w-full bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-lg group">
            {/* Map Placeholder/Iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d54602.18844150924!2d29.900389000000004!3d31.203083000000003!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1767744874248!5m2!1sen!2sus"
              className="w-full h-full opacity-80 pointer-events-none mix-blend-multiply"
              title="Geospatial Risk Map"
            ></iframe>

            {/* Map Overlay HUD */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
              <div className="flex justify-between items-start">
                <div className="bg-white/90 backdrop-blur-md border border-gray-200 p-5 rounded-2xl pointer-events-auto shadow-md">
                  <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">
                    دليل مؤشر المخاطر
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]"></div>
                      <span className="text-xs font-medium text-gray-700">
                        غمر حرج (&gt;1.5م)
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"></div>
                      <span className="text-xs font-medium text-gray-700">
                        مخاطر عالية (0.8م - 1.5م)
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]"></div>
                      <span className="text-xs font-medium text-gray-700">
                        فيضانات معتدلة (0.2م - 0.8م)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-2 pointer-events-auto">
                  <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 shadow-sm">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 shadow-sm">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="p-3 mt-4 bg-blue-600 rounded-full hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                    <Info className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-lg border border-gray-200 text-[10px] font-mono text-gray-600 uppercase tracking-widest shadow-sm">
                  LAT: 31.2001° N | LONG: 29.9187° E
                </div>
                <div className="flex gap-4">
                  <div className="bg-white/90 backdrop-blur-md border border-gray-200 px-6 py-3 rounded-xl pointer-events-auto shadow-sm">
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      ثقة تعلم الآلة
                    </div>
                    <div className="text-lg font-bold text-green-600">--%</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md border border-gray-200 px-6 py-3 rounded-xl pointer-events-auto shadow-sm">
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      عقد الاستشعار
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      -- نشطة
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Threat Landscape */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-12 items-center animate-slide-up delay-200">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold uppercase tracking-widest">
              <AlertTriangle className="w-3 h-3" />
              محركات الضعف
            </div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              فهم مشهد التهديدات المتزايد
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              تواجه الإسكندرية تهديداً مزدوجاً: ارتفاع مستوى سطح البحر وهبوط
              الأرض. الساحل الشمالي للمدينة يتعرض لتآكل كبير بينما تستمر الكثافة
              السكانية في الأقسام المنخفضة في الارتفاع، مما يعقد استراتيجيات
              الإخلاء والمرونة.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-4">
              <div className="flex gap-5">
                <div className="w-12 h-12 shrink-0 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-lg mb-1">
                    هبوط الأرض
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    معدلات الهبوط تصل إلى 3-5 مم/سنة في حواف دلتا النيل.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 shrink-0 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-lg mb-1">
                    الضغط السكاني
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    البنية التحتية الحيوية لـ 1.2 مليون شخص تقع حالياً ضمن نطاق
                    غمر +1.0م.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-[2rem] space-y-8 relative overflow-hidden group shadow-lg">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-[100px] group-hover:bg-blue-100 transition-colors"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
              القدرات التقنية
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              نظام متكامل لدعم القرار
            </h3>
            <p className="text-gray-600 leading-relaxed italic border-r-2 border-blue-500/30 pr-4">
              "تستفيد منصتنا من صور الأقمار الصناعية متعددة الأطياف ونماذج تعلم
              الآلة لتوفير تقييمات ديناميكية عالية الدقة للمخاطر."
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h5 className="text-gray-900 font-bold">
                  النمذجة المستندة إلى الذكاء الاصطناعي
                </h5>
                <p className="text-gray-500 text-xs">
                  تحليل تنبؤي باستخدام 40 عاماً من بيانات تغير السواحل
                  التاريخية.
                </p>
              </div>
              <div className="space-y-3">
                <Layers className="w-6 h-6 text-blue-600" />
                <h5 className="text-gray-900 font-bold">التحليل المكاني</h5>
                <p className="text-gray-500 text-xs">
                  دمج البيانات الاجتماعية والاقتصادية مع خرائط الفيضانات
                  الهيدروديناميكية.
                </p>
              </div>
              <div className="space-y-3">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <h5 className="text-gray-900 font-bold">التحقق من الصحة</h5>
                <p className="text-gray-500 text-xs">
                  بيانات استشعار أرضية تمت معايرتها مع بيانات القمر الصناعي
                  Sentinel-1/2.
                </p>
              </div>
              <div className="space-y-3">
                <Zap className="w-6 h-6 text-blue-600" />
                <h5 className="text-gray-900 font-bold">المزامنة الحقيقية</h5>
                <p className="text-gray-500 text-xs">
                  تحديثات يومية لمقاييس المخاطر بناءً على مدخلات المناخ
                  الإقليمية.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Analytical Modules */}
        <section className="py-20 animate-slide-up delay-300">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              الوحدات التحليلية الأساسية
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              اختر وحدة أدناه للتعمق في مجموعات البيانات التفصيلية وإنشاء تقارير
              متخصصة للتخطيط الحضري.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/analytics"
              className="bg-white border border-gray-200 p-8 rounded-2xl hover:bg-gray-50 hover:border-blue-500/50 transition-all group flex flex-col items-center text-center shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-bold text-lg mb-3">
                تحليل مستوى الأقسام
              </h4>
              <p className="text-gray-500 text-sm">
                توزيع محلي للغاية لمقاييس المخاطر ومؤشرات الضعف.
              </p>
            </Link>

            <Link
              to="/analytics"
              className="bg-white border border-gray-200 p-8 rounded-2xl hover:bg-gray-50 hover:border-blue-500/50 transition-all group flex flex-col items-center text-center shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                <Waves className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-bold text-lg mb-3">
                خرائط الفيضانات
              </h4>
              <p className="text-gray-500 text-sm">
                محاكاة هيدروديناميكية للعواصف وأحداث الطقس المتطرفة.
              </p>
            </Link>

            <Link
              to="/predictions"
              className="bg-white border border-gray-200 p-8 rounded-2xl hover:bg-gray-50 hover:border-blue-500/50 transition-all group flex flex-col items-center text-center shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-bold text-lg mb-3">
                مخاطر البنية التحتية
              </h4>
              <p className="text-gray-500 text-sm">
                تقييم الضعف للموانئ والمواقع التراثية والممرات المرورية.
              </p>
            </Link>

            <Link
              to="/analytics"
              className="bg-white border border-gray-200 p-8 rounded-2xl hover:bg-gray-50 hover:border-blue-500/50 transition-all group flex flex-col items-center text-center shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-bold text-lg mb-3">
                مقارنة السيناريوهات
              </h4>
              <p className="text-gray-500 text-sm">
                تحليل جنبًا إلى جنب لمسارات التكيف مع المناخ والجداول الزمنية.
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 px-6 mt-12 animate-fade-in">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <h3 className="text-gray-900 font-bold text-sm tracking-tight">
                تقييم مخاطر سواحل الإسكندرية
              </h3>
              <p className="text-gray-500 text-xs">
                © 2024 معهد البحوث والسياسات البحرية. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-8 text-xs font-semibold uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              منهجية البيانات
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              توثيق واجهة البرمجيات
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              اتصل بنا
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
