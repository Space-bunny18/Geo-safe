import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Radio,
  Clock3,
  Users,
  Camera,
  FileText,
  Navigation,
  ShieldAlert,
  AlertTriangle,
  X,
  ArrowUpRight,
  UserRound,
  Wifi,
  WifiOff,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";

const fieldUnits = [
  {
    id: "FU-021",
    officer: "A. Sharma",
    team: "Mountain Survey Alpha",
    incident: "GS-1042",
    assignment: "NH-05 Landslide",
    location: "Shimla–Rampur Highway",
    status: "On Site",
    priority: "critical",
    lastUpdate: "2 min ago",
    personnel: 4,
    observation: "Major debris accumulation detected across carriageway.",
    coordinates: "31.1048, 77.1734",
    connection: "Online",
  },
  {
    id: "FU-018",
    officer: "R. Thakur",
    team: "Slope Assessment Unit",
    incident: "GS-1041",
    assignment: "Mashobra Soil Movement",
    location: "Mashobra Sector",
    status: "En Route",
    priority: "critical",
    lastUpdate: "8 min ago",
    personnel: 3,
    observation: "Visible slope movement reported near road edge.",
    coordinates: "31.1312, 77.2345",
    connection: "Online",
  },
  {
    id: "FU-014",
    officer: "K. Verma",
    team: "Road Inspection Bravo",
    incident: "GS-1038",
    assignment: "Kufri Road Crack",
    location: "Kufri Bypass",
    status: "On Site",
    priority: "high",
    lastUpdate: "14 min ago",
    personnel: 3,
    observation: "Surface crack expanding along outer lane.",
    coordinates: "31.0974, 77.2673",
    connection: "Online",
  },
  {
    id: "FU-009",
    officer: "P. Negi",
    team: "Field Assessment Team",
    incident: "GS-1035",
    assignment: "Theog Slope Instability",
    location: "Theog Region",
    status: "Monitoring",
    priority: "high",
    lastUpdate: "21 min ago",
    personnel: 2,
    observation: "Slope remains unstable following rainfall.",
    coordinates: "31.1217, 77.3587",
    connection: "Online",
  },
  {
    id: "FU-006",
    officer: "S. Rana",
    team: "Patrol Unit",
    incident: "—",
    assignment: "Routine Patrol",
    location: "Shoghi Sector",
    status: "Available",
    priority: "moderate",
    lastUpdate: "32 min ago",
    personnel: 2,
    observation: "No active threat observed.",
    coordinates: "31.0186, 77.0967",
    connection: "Offline",
  },
];

function getPriorityClass(priority) {
  return `field-priority-${priority}`;
}

function getStatusClass(status) {
  return `field-status-${status
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
}

function getPriorityLabel(priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function Field() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedUnit, setSelectedUnit] = useState(null);

  const filteredUnits = useMemo(() => {
    return fieldUnits.filter((unit) => {
      const matchesSearch =
        unit.id.toLowerCase().includes(search.toLowerCase()) ||
        unit.officer.toLowerCase().includes(search.toLowerCase()) ||
        unit.team.toLowerCase().includes(search.toLowerCase()) ||
        unit.assignment.toLowerCase().includes(search.toLowerCase()) ||
        unit.location.toLowerCase().includes(search.toLowerCase());

      const matchesPriority =
        priorityFilter === "all" ||
        unit.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [search, priorityFilter]);

  const activeUnits = fieldUnits.filter(
    (unit) =>
      unit.status === "On Site" ||
      unit.status === "En Route" ||
      unit.status === "Monitoring"
  ).length;

  const onSiteUnits = fieldUnits.filter(
    (unit) => unit.status === "On Site"
  ).length;

  const onlineUnits = fieldUnits.filter(
    (unit) => unit.connection === "Online"
  ).length;

  const personnelDeployed = fieldUnits
    .filter((unit) => unit.status !== "Available")
    .reduce((total, unit) => total + unit.personnel, 0);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-area">
        <Topbar />

        <PageContainer>
          <section className="field-page">
            {/* HEADER */}
            <div className="field-page-header">
              <div>
                <div className="field-eyebrow">
                  FIELD OPERATIONS
                  <span className="field-live-dot" />
                  FIELD NETWORK LIVE
                </div>

                <h1>Field Operations</h1>

                <p>
                  Monitor deployed teams, field observations and
                  operational activity across active risk zones.
                </p>
              </div>

              <div className="field-sync-status">
                <Wifi size={15} />
                <span>FIELD SYNC ACTIVE</span>
              </div>
            </div>

            {/* METRICS */}
            <div className="field-metrics-grid">
              <div className="field-metric-card">
                <div className="field-metric-icon">
                  <Radio size={18} />
                </div>

                <div>
                  <span>Active Units</span>
                  <strong>{String(activeUnits).padStart(2, "0")}</strong>
                  <small>currently deployed</small>
                </div>
              </div>

              <div className="field-metric-card">
                <div className="field-metric-icon field-icon-critical">
                  <MapPin size={18} />
                </div>

                <div>
                  <span>On Site</span>
                  <strong>{String(onSiteUnits).padStart(2, "0")}</strong>
                  <small>teams at incidents</small>
                </div>
              </div>

              <div className="field-metric-card">
                <div className="field-metric-icon">
                  <Users size={18} />
                </div>

                <div>
                  <span>Personnel Deployed</span>
                  <strong>
                    {String(personnelDeployed).padStart(2, "0")}
                  </strong>
                  <small>field personnel</small>
                </div>
              </div>

              <div className="field-metric-card">
                <div className="field-metric-icon field-icon-online">
                  <Wifi size={18} />
                </div>

                <div>
                  <span>Units Online</span>
                  <strong>{String(onlineUnits).padStart(2, "0")}</strong>
                  <small>connected to network</small>
                </div>
              </div>
            </div>

            {/* FIELD COMMAND */}
            <div className="field-command-grid">
              <div className="field-command-card">
                <div className="field-section-header">
                  <div>
                    <span className="field-section-label">
                      DEPLOYED UNITS
                    </span>

                    <h2>Field Unit Operations</h2>
                  </div>

                  <span className="field-unit-count">
                    {filteredUnits.length} UNITS
                  </span>
                </div>

                {/* TOOLBAR */}
                <div className="field-toolbar">
                  <div className="field-search">
                    <Search size={17} />

                    <input
                      type="text"
                      placeholder="Search unit, officer or location..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="field-filter">
                    <Filter size={15} />

                    <select
                      value={priorityFilter}
                      onChange={(e) =>
                        setPriorityFilter(e.target.value)
                      }
                    >
                      <option value="all">All Priority</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="moderate">Moderate</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                {/* TABLE */}
                <div className="field-table-wrapper">
                  <table className="field-table">
                    <thead>
                      <tr>
                        <th>UNIT</th>
                        <th>ASSIGNMENT</th>
                        <th>PRIORITY</th>
                        <th>STATUS</th>
                        <th>PERSONNEL</th>
                        <th>UPDATED</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredUnits.map((unit) => (
                        <tr
                          key={unit.id}
                          onClick={() => setSelectedUnit(unit)}
                        >
                          <td>
                            <div className="field-unit-cell">
                              <div className="field-unit-avatar">
                                <UserRound size={16} />
                              </div>

                              <div>
                                <strong>{unit.id}</strong>
                                <span>{unit.officer}</span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="field-assignment-cell">
                              <strong>{unit.assignment}</strong>
                              <span>
                                <MapPin size={12} />
                                {unit.location}
                              </span>
                            </div>
                          </td>

                          <td>
                            <span
                              className={`field-priority ${getPriorityClass(
                                unit.priority
                              )}`}
                            >
                              {getPriorityLabel(unit.priority)}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`field-status ${getStatusClass(
                                unit.status
                              )}`}
                            >
                              <span />
                              {unit.status}
                            </span>
                          </td>

                          <td>
                            <div className="field-personnel">
                              <Users size={14} />
                              {unit.personnel}
                            </div>
                          </td>

                          <td>
                            <div className="field-updated">
                              <Clock3 size={13} />
                              {unit.lastUpdate}
                            </div>
                          </td>

                          <td>
                            <button
                              className="field-row-action"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedUnit(unit);
                              }}
                            >
                              <ArrowUpRight size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredUnits.length === 0 && (
                    <div className="field-empty-state">
                      <Search size={24} />
                      <strong>No field units found</strong>
                      <span>
                        Try changing your search or priority filter.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* FIELD STATUS CARD */}
              <div className="field-status-card">
                <div className="field-section-header">
                  <div>
                    <span className="field-section-label">
                      FIELD NETWORK
                    </span>

                    <h2>Operational Status</h2>
                  </div>
                </div>

                <div className="field-status-overview">
                  <div className="field-status-ring">
                    <div>
                      <strong>{onlineUnits}</strong>
                      <span>ONLINE</span>
                    </div>
                  </div>

                  <div className="field-status-summary">
                    <div>
                      <span>Network State</span>
                      <strong>Operational</strong>
                    </div>

                    <div>
                      <span>Last Sync</span>
                      <strong>Just now</strong>
                    </div>

                    <div>
                      <span>Coverage</span>
                      <strong>94%</strong>
                    </div>
                  </div>
                </div>

                <div className="field-status-list">
                  <div>
                    <span className="field-status-list-dot online" />
                    <span>Connected Units</span>
                    <strong>{onlineUnits}</strong>
                  </div>

                  <div>
                    <span className="field-status-list-dot offline" />
                    <span>Offline Units</span>
                    <strong>
                      {fieldUnits.length - onlineUnits}
                    </strong>
                  </div>

                  <div>
                    <span className="field-status-list-dot alert" />
                    <span>Critical Assignments</span>
                    <strong>
                      {
                        fieldUnits.filter(
                          (unit) => unit.priority === "critical"
                        ).length
                      }
                    </strong>
                  </div>
                </div>

                <div className="field-network-note">
                  <Radio size={15} />

                  <span>
                    Field telemetry is synchronized with the command
                    center.
                  </span>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="field-quick-actions">
              <div>
                <span className="field-section-label">
                  FIELD COMMAND
                </span>

                <h2>Quick Actions</h2>
              </div>

              <div className="field-action-grid">
                <button className="field-action-card">
                  <div className="field-action-icon">
                    <FileText size={18} />
                  </div>

                  <div>
                    <strong>Submit Field Report</strong>
                    <span>
                      Record observations from the field
                    </span>
                  </div>

                  <ArrowUpRight size={16} />
                </button>

                <button className="field-action-card">
                  <div className="field-action-icon">
                    <Camera size={18} />
                  </div>

                  <div>
                    <strong>Upload Evidence</strong>
                    <span>
                      Attach photos or incident evidence
                    </span>
                  </div>

                  <ArrowUpRight size={16} />
                </button>

                <button className="field-action-card">
                  <div className="field-action-icon">
                    <Navigation size={18} />
                  </div>

                  <div>
                    <strong>Locate Unit</strong>
                    <span>
                      View deployed unit coordinates
                    </span>
                  </div>

                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </PageContainer>

        {/* DETAIL DRAWER */}
        {selectedUnit && (
          <div
            className="field-drawer-overlay"
            onClick={() => setSelectedUnit(null)}
          >
            <aside
              className="field-drawer"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="field-drawer-header">
                <div>
                  <span className="field-section-label">
                    FIELD UNIT
                  </span>

                  <h2>{selectedUnit.id}</h2>
                </div>

                <button
                  className="field-drawer-close"
                  onClick={() => setSelectedUnit(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="field-drawer-body">
                <div className="field-unit-profile">
                  <div className="field-profile-avatar">
                    <UserRound size={22} />
                  </div>

                  <div>
                    <strong>{selectedUnit.officer}</strong>
                    <span>{selectedUnit.team}</span>
                  </div>

                  <span
                    className={`field-status ${getStatusClass(
                      selectedUnit.status
                    )}`}
                  >
                    <span />
                    {selectedUnit.status}
                  </span>
                </div>

                <div className="field-risk-banner">
                  <div>
                    <ShieldAlert size={17} />

                    <span>
                      {getPriorityLabel(selectedUnit.priority)} Priority
                    </span>
                  </div>

                  <strong>
                    {selectedUnit.incident}
                  </strong>
                </div>

                <div className="field-detail-grid">
                  <div>
                    <span>ASSIGNMENT</span>
                    <strong>{selectedUnit.assignment}</strong>
                  </div>

                  <div>
                    <span>PERSONNEL</span>
                    <strong>{selectedUnit.personnel} Members</strong>
                  </div>

                  <div>
                    <span>LOCATION</span>
                    <strong>{selectedUnit.location}</strong>
                  </div>

                  <div>
                    <span>LAST UPDATE</span>
                    <strong>{selectedUnit.lastUpdate}</strong>
                  </div>
                </div>

                <div className="field-observation">
                  <div className="field-observation-heading">
                    <AlertTriangle size={16} />
                    <span>FIELD OBSERVATION</span>
                  </div>

                  <p>{selectedUnit.observation}</p>
                </div>

                <div className="field-coordinates">
                  <div>
                    <MapPin size={16} />

                    <div>
                      <span>COORDINATES</span>
                      <strong>{selectedUnit.coordinates}</strong>
                    </div>
                  </div>

                  {selectedUnit.connection === "Online" ? (
                    <Wifi size={17} />
                  ) : (
                    <WifiOff size={17} />
                  )}
                </div>

                <div className="field-drawer-actions">
                  <button className="field-primary-action">
                    <Navigation size={16} />
                    Track Unit
                  </button>

                  <button className="field-secondary-action">
                    <FileText size={16} />
                    View Reports
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default Field;