import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ReportsPage from "./components/ReportsPage";
import HomePage from "./components/HomePage";
import PredictionsPage from "./components/PredictionsPage";
import AnalyticsPage from "./components/AnalyticsPage";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
