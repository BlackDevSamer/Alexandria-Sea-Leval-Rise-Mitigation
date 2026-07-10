import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { useToast } from "../contexts/useToast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      addToast("تم تسجيل الدخول بنجاح", "success");
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err.message || "فشل تسجيل الدخول. يرجى التحقق من بياناتك.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <img
            src="./public/Photos/logo_alexguard.png"
            alt="AlexGuard Logo"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            تسجيل الدخول
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            مرحباً بك مجدداً في نظام AlexGuard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 p-4 rounded-xl flex items-center gap-3 text-red-700 text-sm border border-red-100">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4 flex flex-col items-end">
            <div className="w-full relative">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-right pr-12"
                  placeholder="name@example.com"
                  dir="ltr"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="w-full relative">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-right pr-12"
                  placeholder="••••••••"
                  dir="ltr"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-200"
            >
              {loading ? "جاري تسجيل الدخول..." : "دخول"}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 text-sm">
          <p className="text-gray-600">
            ليس لديك حساب؟{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
            >
              سجل الآن
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
