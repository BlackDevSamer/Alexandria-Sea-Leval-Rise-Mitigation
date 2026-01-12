import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ active = "home" }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* Left: User Profile (Eng. Ahmed Mahmoud) */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
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
          className={`text-sm font-medium ${
            active === "home"
              ? "text-primary border-b-2 border-primary pb-1 font-bold"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          الرئيسية
        </Link>
        <Link
          to="/predictions"
          className={`text-sm font-medium ${
            active === "predictions"
              ? "text-primary border-b-2 border-primary pb-1 font-bold"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          التنبؤات
        </Link>
        <Link
          to="/analytics"
          className={`text-sm font-medium ${
            active === "analytics"
              ? "text-primary border-b-2 border-primary pb-1 font-bold"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          التحليلات
        </Link>
        <Link
          to="/reports"
          className={`text-sm font-medium ${
            active === "reports"
              ? "text-primary border-b-2 border-primary pb-1 font-bold"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          التقارير
        </Link>
      </nav>

      {/* Right: Ministry Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <h2 className="text-xs font-bold text-gray-800">
            وزارة الموارد المائية والري
          </h2>
          <p className="text-xs text-gray-600">نظام إدارة تنبؤات الفيضان</p>
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
