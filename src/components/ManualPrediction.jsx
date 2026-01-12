import React, { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";

const ManualPrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedCity, setSelectedCity] = useState("الإسكندرية");
  const [mapUrl, setMapUrl] = useState(
    "https://maps.google.com/maps?q=31.2001,29.9187&z=12&t=h&ie=UTF8&iwloc=&output=embed"
  );

  const cityCoordinates = {
    الإسكندرية: { lat: 31.2001, lng: 29.9187 },
    دمياط: { lat: 31.4175, lng: 31.8144 },
    رشيد: { lat: 31.4044, lng: 30.4183 },
    بورسعيد: { lat: 31.2653, lng: 32.3019 },
    "مرسى مطروح": { lat: 31.3526, lng: 27.2373 },
    العريش: { lat: 31.1316, lng: 33.7984 },
    بلطيم: { lat: 31.5799, lng: 31.0859 },
    جمصة: { lat: 31.4428, lng: 31.4285 },
    إدكو: { lat: 31.3069, lng: 30.2989 },
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (cityCoordinates[city]) {
      const { lat, lng } = cityCoordinates[city];
      setMapUrl(
        `https://maps.google.com/maps?q=${lat},${lng}&z=12&t=h&ie=UTF8&iwloc=&output=embed`
      );
    }
  };

  const handlePrediction = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResult({
        riskLevel: "مرتفع",
        floodChance: 89,
        color: "red",
      });
    }, 2000);
  };

  const resetPrediction = () => {
    setResult(null);
  };

  return (
    <div className="absolute inset-0 bg-gray-50 p-4 animate-fade-in">
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-blue-50">
        {/* Full Screen Map Background */}
        <iframe
          src={mapUrl}
          className="w-full h-full border-0 absolute inset-0 opacity-60"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Satellite Map"
        ></iframe>

        {/* Form Overlay - Centered */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            result
              ? "scale-90 opacity-0 pointer-events-none"
              : "scale-100 opacity-100"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-2xl border-t-4 border-primary">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
              إدخال بيانات التنبؤ
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  اختر المدينة
                </label>
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="block w-full text-right bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="الإسكندرية">الإسكندرية</option>
                  <option value="دمياط">دمياط</option>
                  <option value="رشيد">رشيد</option>
                  <option value="بورسعيد">بورسعيد</option>
                  <option value="مرسى مطروح">مرسى مطروح</option>
                  <option value="العريش">العريش</option>
                  <option value="بلطيم">بلطيم</option>
                  <option value="جمصة">جمصة</option>
                  <option value="إدكو">إدكو</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    كمية الأمطار (مم)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="block w-full text-right bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    سرعة الرياح (كم/س)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="block w-full text-right bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    مستوى سطح البحر (متر)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="block w-full text-right bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    الضغط الجوي (هيكتوباسكال)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="block w-full text-right bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <button
                onClick={handlePrediction}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-all text-lg mt-4 shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري التحليل...
                  </>
                ) : (
                  "تشغيل التنبؤ"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Result Overlay */}
        {result && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-auto w-full max-w-5xl animate-slide-up bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-red-600 flex flex-col md:flex-row h-auto min-h-[500px]">
              {/* Left Side (Map) - Visually Left on Desktop */}
              <div className="w-full md:w-1/2 bg-gray-100 relative order-2 md:order-1 min-h-[300px] md:min-h-full">
                <iframe
                  src={mapUrl.replace("t=h", "t=k")} // Force satellite view for result
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Result Map"
                ></iframe>

                {/* Map Legend Overlay */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur shadow-lg p-4 rounded-xl text-right dir-rtl border border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-2 border-b pb-1">
                    مفتاح الخريطة
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 justify-end">
                      <span className="text-xs font-medium text-gray-600">
                        مستوى خطر مرتفع
                      </span>
                      <div className="w-4 h-4 bg-red-600 rounded shadow-sm"></div>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <span className="text-xs font-medium text-gray-600">
                        مستوى خطر متوسط
                      </span>
                      <div className="w-4 h-4 bg-orange-400 rounded shadow-sm"></div>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <span className="text-xs font-medium text-gray-600">
                        آمن
                      </span>
                      <div className="w-4 h-4 bg-green-100 rounded shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side (Details) - Visually Right on Desktop */}
              <div className="w-full md:w-1/2 p-8 md:p-10 order-1 md:order-2 flex flex-col bg-white">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-8">
                  <div className="bg-red-50 p-3 rounded-2xl">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm mb-2">
                      <span>مستوى الخطورة: مرتفع</span>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    </div>
                    <p className="text-gray-400 text-xs font-mono mt-1">
                      23-12-2025 | الإسكندرية
                    </p>
                  </div>
                </div>

                {/* Main Warning Text */}
                <div className="text-right mb-8 dir-rtl">
                  <h2 className="text-4xl font-black text-gray-800 mb-2 leading-tight">
                    تحذير من <span className="text-red-600">خطر مرتفع</span>
                  </h2>
                </div>

                {/* Risk Factors List */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8 dir-rtl">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg border-b pb-2">
                    <span className="text-blue-600">●</span>
                    سبب إرتفاع الخطورة:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between group">
                      <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                        زيادة كمية الأمطار من المعدل الطبيعي
                      </span>
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                    </div>
                    <div className="flex items-center justify-between group">
                      <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                        إرتفاع مستوى سطح البحر
                      </span>
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                    </div>
                    <div className="flex items-center justify-between group">
                      <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                        انخفاض الضغط الجوي
                      </span>
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer / Stats */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-blue-50 rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-1">
                        سرعة الرياح
                      </div>
                      <div className="font-bold text-blue-700">40 كم/س</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-1">الأمطار</div>
                      <div className="font-bold text-blue-700">40 مم</div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                      <div className="text-xs text-red-500 mb-1">الخطر</div>
                      <div className="font-bold text-red-700 text-xl">
                        {result.floodChance}%
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetPrediction}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                  >
                    <span className="pb-1">حفظ التنبؤ والعودة</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualPrediction;
