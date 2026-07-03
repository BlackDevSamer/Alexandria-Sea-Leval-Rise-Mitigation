import React, { useEffect } from "react";
import Header from "./Header";
import { useRiskStore } from "../store/riskStore";
import { useNavigate } from "react-router-dom";

const PredictionsPage = () => {
  const { initialize } = useRiskStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col" dir="rtl">
      <Header active="predictions" />

      <main className="flex-1 flex flex-col w-full h-full relative">
        <div className="flex-1 relative overflow-hidden flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl text-center">
            <h2 className="text-xl font-bold mb-4">تنبؤات - مُدخلات عاجلة</h2>
            <p className="text-gray-600 mb-6">
              تم إزالة وحدة الدردشة. استخدم واجهة الاختيارات لطلب تقرير الهشاشة لمدة 72 ساعة.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate('/infrastructure')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                اذهب إلى البنية التحتية (اختيارات)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PredictionsPage;
