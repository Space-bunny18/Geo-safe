import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TriangleAlert,
  Route,
  Siren,
  Settings,
  FileText,
  Shield,
  Radio,
  Map,
} from "lucide-react";

function Sidebar() {
  const navigation = [
    {
      section: "COMMAND",
      items: [
        {
          label: "Overview",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
            label: "Risk Map",
            path: "/risk-map",
            icon: Map,
        },
        {
          label: "Incidents",
          path: "/incidents",
          icon: TriangleAlert,
        },
        {
          label: "Road Network",
          path: "/roads",
          icon: Route,
        },
      ],
    },
    {
      section: "RESPONSE",
      items: [
        {
          label: "Emergency Response",
          path: "/response",
          icon: Siren,
        },
        {
          label: "Field Reports",
          path: "/reports",
          icon: FileText,
        },
      ],
    },
  ];

  return (
    <aside className="sidebar">

      {/* BRAND */}
      <div className="sidebar-brand">
        <div className="brand-mark">
          <Shield size={18} strokeWidth={2} />
        </div>

        <div className="brand-copy">
          <div className="brand-name">GEOSAFE</div>
          <div className="brand-subtitle">
            RISK INTELLIGENCE
          </div>
        </div>
      </div>


      {/* SYSTEM STATUS */}
      <div className="sidebar-status">
        <span className="status-dot" />
        <span>SYSTEM OPERATIONAL</span>
      </div>


      {/* NAVIGATION */}
      <nav className="sidebar-navigation">

        {navigation.map((group) => (
          <div className="nav-group" key={group.section}>

            <div className="nav-section-title">
              {group.section}
            </div>

            <div className="nav-items">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? "active" : ""}`
                    }
                  >
                    <span className="nav-icon">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>

                    <span className="nav-label">
                      {item.label}
                    </span>
                  </NavLink>
                );
              })}
            </div>

          </div>
        ))}

      </nav>


      {/* BOTTOM AREA */}
      <div className="sidebar-bottom">

        <NavLink to="/field" className="field-link">
          <div className="field-icon">
            <Radio size={16} />
          </div>

          <div className="field-copy">
            <span>Field Operations</span>
            <small>Open officer portal</small>
          </div>
        </NavLink>


        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `settings-button ${isActive ? "active" : ""}`
          }
        >
          <Settings size={16} />
          <span>System Settings</span>
        </NavLink>


        <div className="sidebar-footer">

          <div className="authority-avatar">
            DA
          </div>

          <div className="authority-info">
            <strong>District Authority</strong>
            <span>Control Center</span>
          </div>

          <div className="online-indicator" />

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;