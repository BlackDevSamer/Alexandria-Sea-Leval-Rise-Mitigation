import React, { Suspense, lazy } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";

// Lazy loading components for better performance
const ReportsPage = lazy(() => import("./components/ReportsPage"));
const HomePage = lazy(() => import("./components/HomePage"));
const PredictionsPage = lazy(() => import("./components/PredictionsPage"));
const AnalyticsPage = lazy(() => import("./components/AnalyticsPage"));
const InfrastructurePage = lazy(
  () => import("./components/InfrastructurePage"),
);

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-500 font-bold text-sm animate-pulse">
      جاري تحميل البيانات...
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <ToastProvider>
        <div className="App">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/infrastructure" element={<InfrastructurePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/predictions" element={<PredictionsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </Suspense>
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
