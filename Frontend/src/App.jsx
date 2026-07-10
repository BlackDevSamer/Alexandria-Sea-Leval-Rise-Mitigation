import React, { Suspense, lazy } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";

// Lazy loading components for better performance
const HomePage = lazy(() => import("./components/HomePage"));
const ArgentInterventionPage = lazy(() => import("./components/argentIntervention"));
const AnalyticsPage = lazy(() => import("./components/AnalyticsPage"));
const FuturePlaningPage = lazy(() => import("./components/futurePlaning"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const UserProfile = lazy(() => import("./components/UserProfile"));
import { useAuth } from "./contexts/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAuthReady } = useAuth();
  if (!isAuthReady) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAuthReady, user } = useAuth();
  if (!isAuthReady) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.roles?.includes("Admin")) return <Navigate to="/home" replace />;
  return children;
};

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-500 font-bold text-sm animate-pulse">
      جاري تحميل البيانات...
    </p>
  </div>
);

const AppRoutes = () => {
  return (
    <div className="App">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/Analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          <Route path="/futurePlaning" element={<ProtectedRoute><FuturePlaningPage /></ProtectedRoute>} />
          <Route path="/argentIntervention" element={<ProtectedRoute><ArgentInterventionPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;