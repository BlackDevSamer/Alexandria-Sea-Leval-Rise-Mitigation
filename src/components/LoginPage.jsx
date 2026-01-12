import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, AlertTriangle } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here.
    // For now, directly navigate to home.
    navigate("/home");
  };

  return (
    <div
      className="flex min-h-screen font-sans bg-white direction-rtl"
      dir="rtl"
    >
      {/* Right Side (Form) 
          In RTL flex layout, the first child is on the Right.
      */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-16">
        <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full">
          {/* Top Eagle Logo */}
          <div className="mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Coat_of_arms_of_Egypt_%28Official%29.svg"
              alt="Egypt Coat of Arms"
              className="w-24 h-auto mx-auto"
            />
          </div>

          <div className="text-center mb-10">
            <p className="text-sm text-gray-600 mb-1">
              وزارة الموارد المائية والري
            </p>
            <p className="text-sm text-gray-600 mb-4">جمهورية مصر العربية</p>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              تسجيل الدخول
            </h1>
            <p className="text-lg text-gray-600">
              نظام إدارة التنبؤات بالفيضانات والإنذار المبكر
            </p>
          </div>

          <form className="w-full space-y-6" onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="relative">
              <div className="absolute top-0 bottom-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="اسم المستخدم"
                className="block w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right placeholder-gray-400 outline-none transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute top-0 bottom-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="كلمة المرور"
                className="block w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right placeholder-gray-400 outline-none transition-all"
              />
            </div>

            {/* Error Alert */}
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-right">
                <p className="text-sm text-red-700 font-bold">
                  تنبيه: اسم المستخدم أو كلمة المرور غير صحيحة.
                </p>
                <p className="text-sm text-red-700">
                  الرجاء المحاولة مرة أخرى.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              تسجيل الدخول
            </button>

            <div className="text-center mt-4">
              <a
                href="#"
                className="font-medium text-primary hover:text-blue-800 text-sm"
              >
                نسيت كلمة المرور؟
              </a>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-100 pt-6">
          <p>جميع الحقوق محفوظة © 2024 وزارة الموارد المائية والري</p>
        </div>
      </div>

      {/* Left Side (Map) 
          In RTL flex layout, the second child is on the Left.
      */}
      <div
        className="hidden lg:flex lg:w-1/2 relative"
        style={{
          backgroundImage: `url('${
            import.meta.env.BASE_URL
          }Photos/LoginPage.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "100%",
        }}
      ></div>
    </div>
  );
};

export default LoginPage;
