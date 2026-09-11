import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Roads from "./pages/Roads";
import Response from "./pages/Response";
import FieldDashboard from "./pages/FieldDashboard";
import ReportIncident from "./pages/ReportIncident";
import RiskMap from "./pages/RiskMap";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/risk-map"
          element={<RiskMap />}
        />

        <Route
          path="/incidents"
          element={<Incidents />}
        />

        <Route
          path="/roads"
          element={<Roads />}
        />

        <Route
          path="/response"
          element={<Response />}
        />

        <Route
          path="/field"
          element={<FieldDashboard />}
        />

        <Route
          path="/field/report"
          element={<ReportIncident />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;