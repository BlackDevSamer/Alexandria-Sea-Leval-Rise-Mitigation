import React, { useEffect, useState } from "react";
import { Users, FileText, Trash2, Shield, Activity, RefreshCw } from "lucide-react";
import { dataService } from "../services/dataService";
import { useToast } from "../contexts/useToast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "users") {
        const data = await dataService.getUsers();
        setUsers(data);
      } else {
        const data = await dataService.getAllForecastLogs();
        setLogs(data);
      }
    } catch (err) {
      addToast("فشل تحميل البيانات. الرجاء المحاولة مرة أخرى.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    
    try {
      await dataService.deleteUser(id);
      addToast("تم حذف المستخدم بنجاح", "success");
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      addToast(err.message || "فشل حذف المستخدم", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 text-right rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم المسؤول</h1>
              <p className="text-sm text-gray-500">إدارة المستخدمين وسجلات النظام</p>
            </div>
          </div>
          
          <button 
            onClick={fetchData}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="تحديث البيانات"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 space-x-reverse bg-white p-2 rounded-xl shadow-sm border border-gray-100 inline-flex">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "users" 
                ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Users className="w-4 h-4" />
            إدارة المستخدمين
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "logs" 
                ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Activity className="w-4 h-4" />
            سجلات التنبؤات
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-medium animate-pulse">جاري تحميل البيانات...</p>
            </div>
          ) : activeTab === "users" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">اسم المستخدم</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">البريد الإلكتروني</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">الصلاحيات</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 text-left">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">لا يوجد مستخدمين</td>
                    </tr>
                  ) : (
                    users.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                              {u.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-900">{u.username}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{u.email}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1 flex-wrap">
                            {(u.roles || []).map(r => (
                              <span key={r} className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                                {r}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-left">
                          <button 
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                            title="حذف المستخدم"
                          >
                            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">المستخدم</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">السيناريو / السنة</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">منسوب السطح (م)</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">المنسوب المتوقع (م)</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">تاريخ الطلب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">لا توجد سجلات حالياً</td>
                    </tr>
                  ) : (
                    logs.map(log => (
                      <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{log.username}</p>
                            <p className="text-xs text-gray-500">{log.userEmail}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                              {log.scenario}
                            </span>
                            <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md">
                              {log.year}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-gray-600">{log.baselineSeaLevel.toFixed(2)}</td>
                        <td className="px-6 py-4 font-mono text-sm font-bold text-blue-600">{log.projectedSeaLevel.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(log.requestedAt).toLocaleString("ar-EG")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
