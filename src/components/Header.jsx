import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ active = "home" }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left: User Profile (Eng. Ahmed Mahmoud) */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
          <User className="w-6 h-6" />
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-gray-900">م. أحمد محمود</p>
        </div>
      </div>

      {/* Center: Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          to="/home"
          className={`text-sm font-medium transition-colors ${
            active === "home"
              ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-bold"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          الرئيسية
        </Link>
        <Link
          to="/predictions"
          className={`text-sm font-medium transition-colors ${
            active === "predictions"
              ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-bold"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          التنبؤات
        </Link>
        <Link
          to="/analytics"
          className={`text-sm font-medium transition-colors ${
            active === "analytics"
              ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-bold"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          التحليلات
        </Link>
        <Link
          to="/infrastructure"
          className={`text-sm font-medium transition-colors ${
            active === "infrastructure"
              ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-bold"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          البنية التحتية
        </Link>
        <Link
          to="/reports"
          className={`text-sm font-medium transition-colors ${
            active === "reports"
              ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-bold"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          التقارير
        </Link>
      </nav>

      {/* Right: Ministry Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <h2 className="text-xs font-bold text-gray-900">
            وزارة الموارد المائية والري
          </h2>
          <p className="text-[10px] text-gray-500">نظام إدارة تنبؤات الفيضان</p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Coat_of_arms_of_Egypt_%28Official%29.svg"
          alt="App Logo"
          className="w-10 h-auto"
        />
      </div>
    </header>
  );
};

export default Header;
