import React, { useEffect, useState } from "react";
import { User, Activity, Settings, Save, AlertCircle } from "lucide-react";
import { dataService } from "../services/dataService";
import { useAuth } from "../contexts/useAuth";
import { useToast } from "../contexts/useToast";

const UserProfile = () => {
  const { user, session, logout } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const { addToast } = useToast();

  useEffect(() => {
    if (user?.username) setUsername(user.username);
  }, [user]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await dataService.getMyForecastLogs();
      setLogs(data);
    } catch (err) {
      addToast("فشل تحميل سجلاتك. الرجاء المحاولة مرة أخرى.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dataService.updateProfile({ username });
      addToast("تم تحديث الملف الشخصي بنجاح", "success");
      
      // Update session to reflect new username locally
      if (session) {
        dataService.setSession({ ...session, username });
        // Hard reload or we'd need to sync context. Since session is from local storage, reload is easiest.
        window.location.reload(); 
      }
    } catch (err) {
      addToast(err.message || "فشل تحديث الملف الشخصي", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 text-right rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.username}</h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Settings */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-900">
                <Settings className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold">إعدادات الحساب</h2>
              </div>
              
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-500 rounded-xl cursor-not-allowed sm:text-sm text-right"
                    dir="ltr"
                  />
                  <p className="mt-1 text-xs text-gray-400">لا يمكن تغيير البريد الإلكتروني</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المستخدم
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
                    dir="rtl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving || username === user?.username}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-200"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Forecast Logs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6 text-gray-900">
                <Activity className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold">سجل نشاطاتك (التنبؤات)</h2>
              </div>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-10 text-gray-400 gap-4">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-medium animate-pulse">جاري تحميل السجلات...</p>
                </div>
              ) : logs.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-10 text-gray-400 gap-3">
                  <AlertCircle className="w-12 h-12 text-gray-300" />
                  <p className="text-sm">لم تقم بإجراء أي تنبؤات بعد.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-sm font-bold text-gray-700">السيناريو / السنة</th>
                        <th className="px-4 py-3 text-sm font-bold text-gray-700">منسوب السطح (م)</th>
                        <th className="px-4 py-3 text-sm font-bold text-gray-700">المنسوب المتوقع (م)</th>
                        <th className="px-4 py-3 text-sm font-bold text-gray-700">تاريخ الطلب</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {logs.map(log => (
                        <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                                {log.scenario}
                              </span>
                              <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md">
                                {log.year}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-mono text-sm text-gray-600">{log.baselineSeaLevel.toFixed(2)}</td>
                          <td className="px-4 py-3 font-mono text-sm font-bold text-blue-600">{log.projectedSeaLevel.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(log.requestedAt).toLocaleString("ar-EG")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
