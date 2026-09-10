import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Roads from "./pages/Roads";
import Response from "./pages/Response";
import FieldDashboard from "./pages/FieldDashboard";
import ReportIncident from "./pages/ReportIncident";
import RiskMap from "./pages/RiskMap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/roads" element={<Roads />} />
        <Route path="/response" element={<Response />} />
        <Route path="/field" element={<FieldDashboard />} />
        <Route path="/field/report" element={<ReportIncident />} />
        <Route path="/risk-map" element={<RiskMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;