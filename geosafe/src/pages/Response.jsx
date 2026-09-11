import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  ShieldAlert,
  Radio,
  MapPin,
  Clock3,
  Users,
  Truck,
  CheckCircle2,
  X,
  ArrowUpRight,
  Navigation,
  UserRound,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";


const responseData = [
  {
    id: "RS-071",
    unit: "R-07",
    team: "Rapid Response Alpha",
    incident: "GS-1042",
    location: "NH-05 Landslide",
    sector: "Shimla–Rampur Highway",
    status: "Dispatched",
    priority: "critical",
    eta: "08 min",
    personnel: 6,
    vehicle: "Rescue Vehicle",
    updated: "2 min ago",
    coordinates: "31.1048, 77.1734",
  },
  {
    id: "RS-064",
    unit: "R-04",
    team: "Mountain Rescue Unit",
    incident: "GS-1041",
    location: "Mashobra Soil Movement",
    sector: "Mashobra Sector",
    status: "En Route",
    priority: "critical",
    eta: "14 min",
    personnel: 5,
    vehicle: "Rescue + Medical",
    updated: "8 min ago",
    coordinates: "31.1312, 77.2345",
  },
  {
    id: "RS-058",
    unit: "R-11",
    team: "Road Response Bravo",
    incident: "GS-1038",
    location: "Kufri Road Crack",
    sector: "Kufri Bypass",
    status: "Assigned",
    priority: "high",
    eta: "21 min",
    personnel: 4,
    vehicle: "Road Clearance",
    updated: "14 min ago",
    coordinates: "31.0974, 77.2673",
  },
  {
    id: "RS-052",
    unit: "R-03",
    team: "Field Assessment Team",
    incident: "GS-1035",
    location: "Theog Slope Instability",
    sector: "Theog Region",
    status: "Monitoring",
    priority: "high",
    eta: "32 min",
    personnel: 3,
    vehicle: "Field Unit",
    updated: "21 min ago",
    coordinates: "31.1217, 77.3587",
  },
];


function getPriorityClass(priority) {
  return `response-priority-${priority}`;
}


function getStatusClass(status) {
  return `response-status-${status
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
}


function Response() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [selectedResponse, setSelectedResponse] = useState(() => {
    const incidentId = searchParams.get("incident");

    if (!incidentId) {
      return null;
    }

    return (
      responseData.find(
        (response) => response.incident === incidentId
      ) || null
    );
  });


  const filteredResponses = useMemo(() => {
    return responseData.filter((response) => {
      const query = search.toLowerCase();

      const matchesSearch =
        response.unit.toLowerCase().includes(query) ||
        response.team.toLowerCase().includes(query) ||
        response.incident.toLowerCase().includes(query) ||
        response.location.toLowerCase().includes(query) ||
        response.sector.toLowerCase().includes(query);

      const matchesPriority =
        priorityFilter === "all" ||
        response.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [search, priorityFilter]);


  const activeCount = responseData.filter(
    (response) =>
      response.status !== "Monitoring"
  ).length;

  const criticalCount = responseData.filter(
    (response) =>
      response.priority === "critical"
  ).length;

  const personnelCount = responseData.reduce(
    (total, response) =>
      total + response.personnel,
    0
  );

  const monitoringCount = responseData.filter(
    (response) =>
      response.status === "Monitoring"
  ).length;


  return (
    <div className="app-shell">

      <Sidebar />

      <main className="main-content">

        <Topbar />

        <PageContainer>

          <section className="response-page">

            {/* HEADER */}

            <div className="response-header">

              <div>

                <div className="section-kicker">
                  <span className="kicker-line" />
                  EMERGENCY OPERATIONS
                </div>

                <h1>Emergency Response</h1>

                <p>
                  Coordinate response units, monitor deployment
                  status and prioritize active incidents.
                </p>

              </div>


              <div className="response-live-status">

                <span className="live-dot" />

                RESPONSE NETWORK LIVE

              </div>

            </div>


            {/* METRICS */}

            <div className="response-metrics">

              <div className="response-metric-card">

                <div className="response-metric-icon active">
                  <Radio size={17} />
                </div>

                <div>
                  <span>Active Responses</span>
                  <strong>{activeCount}</strong>
                </div>

              </div>


              <div className="response-metric-card">

                <div className="response-metric-icon critical">
                  <ShieldAlert size={17} />
                </div>

                <div>
                  <span>Critical Priority</span>
                  <strong>{criticalCount}</strong>
                </div>

              </div>


              <div className="response-metric-card">

                <div className="response-metric-icon personnel">
                  <Users size={17} />
                </div>

                <div>
                  <span>Personnel Deployed</span>
                  <strong>{personnelCount}</strong>
                </div>

              </div>


              <div className="response-metric-card">

                <div className="response-metric-icon monitor">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <span>Monitoring</span>
                  <strong>{monitoringCount}</strong>
                </div>

              </div>

            </div>


            {/* CONTROLS */}

            <div className="response-controls">

              <div className="response-search">

                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search units, incidents or sectors..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />

                {search && (
                  <button
                    className="response-clear-search"
                    onClick={() => setSearch("")}
                  >
                    <X size={14} />
                  </button>
                )}

              </div>


              <div className="response-filter">

                <Filter size={15} />

                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(event.target.value)
                  }
                >
                  <option value="all">
                    All Priorities
                  </option>

                  <option value="critical">
                    Critical
                  </option>

                  <option value="high">
                    High
                  </option>

                </select>

              </div>

            </div>


            {/* RESPONSE TABLE */}

            <div className="response-panel">

              <div className="response-panel-header">

                <div>

                  <span className="panel-eyebrow">
                    RESPONSE DEPLOYMENT
                  </span>

                  <h2>Active Response Units</h2>

                </div>

                <span className="response-result-count">
                  {filteredResponses.length} units
                </span>

              </div>


              <div className="response-table-wrapper">

                <table className="response-table">

                  <thead>

                    <tr>
                      <th>UNIT</th>
                      <th>INCIDENT</th>
                      <th>PRIORITY</th>
                      <th>STATUS</th>
                      <th>ETA</th>
                      <th>PERSONNEL</th>
                      <th>UPDATED</th>
                      <th />
                    </tr>

                  </thead>


                  <tbody>

                    {filteredResponses.map((response) => (

                      <tr
                        key={response.id}
                        onClick={() =>
                          setSelectedResponse(response)
                        }
                      >

                        <td>

                          <div className="response-unit-cell">

                            <div className="response-unit-icon">
                              <Truck size={15} />
                            </div>

                            <div>

                              <strong>
                                {response.unit}
                              </strong>

                              <span>
                                {response.team}
                              </span>

                            </div>

                          </div>

                        </td>


                        <td>

                          <div className="response-incident-cell">

                            <strong>
                              {response.incident}
                            </strong>

                            <span>
                              {response.location}
                            </span>

                          </div>

                        </td>


                        <td>

                          <span
                            className={`response-priority ${getPriorityClass(
                              response.priority
                            )}`}
                          >
                            {response.priority}
                          </span>

                        </td>


                        <td>

                          <span
                            className={`response-status ${getStatusClass(
                              response.status
                            )}`}
                          >
                            {response.status}
                          </span>

                        </td>


                        <td>

                          <strong className="response-eta">
                            {response.eta}
                          </strong>

                        </td>


                        <td>

                          <div className="response-personnel">

                            <Users size={13} />

                            {response.personnel}

                          </div>

                        </td>


                        <td>

                          <div className="response-updated">

                            <Clock3 size={12} />

                            {response.updated}

                          </div>

                        </td>


                        <td>

                          <button
                            className="response-open-button"
                            onClick={(event) => {
                              event.stopPropagation();

                              setSelectedResponse(
                                response
                              );
                            }}
                            aria-label={`Open ${response.unit}`}
                          >
                            <ArrowUpRight size={15} />
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>


                {filteredResponses.length === 0 && (

                  <div className="response-empty">

                    <Radio size={28} />

                    <strong>
                      No response units found
                    </strong>

                    <span>
                      Try changing your search or priority
                      filter.
                    </span>

                  </div>

                )}

              </div>

            </div>

          </section>

        </PageContainer>

      </main>


      {/* RESPONSE DETAIL DRAWER */}

      {selectedResponse && (

        <div
          className="response-drawer-backdrop"
          onClick={() =>
            setSelectedResponse(null)
          }
        >

          <aside
            className="response-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="response-drawer-header">

              <div>

                <span className="panel-eyebrow">
                  RESPONSE UNIT
                </span>

                <h2>
                  {selectedResponse.unit}
                </h2>

                <span>
                  {selectedResponse.team}
                </span>

              </div>


              <button
                className="response-drawer-close"
                onClick={() =>
                  setSelectedResponse(null)
                }
              >
                <X size={18} />
              </button>

            </div>


            {/* STATUS */}

            <div className="response-drawer-status">

              <div>

                <span>CURRENT STATUS</span>

                <strong>
                  {selectedResponse.status}
                </strong>

              </div>

              <div
                className={`response-status ${getStatusClass(
                  selectedResponse.status
                )}`}
              >
                {selectedResponse.status}
              </div>

            </div>


            {/* UNIT DETAILS */}

            <div className="response-detail-grid">

              <div>

                <span>PRIORITY</span>

                <strong
                  className={getPriorityClass(
                    selectedResponse.priority
                  )}
                >
                  {selectedResponse.priority.toUpperCase()}
                </strong>

              </div>


              <div>

                <span>ETA</span>

                <strong>
                  {selectedResponse.eta}
                </strong>

              </div>


              <div>

                <span>PERSONNEL</span>

                <strong>
                  {selectedResponse.personnel}
                  {" "}members
                </strong>

              </div>


              <div>

                <span>VEHICLE</span>

                <strong>
                  {selectedResponse.vehicle}
                </strong>

              </div>

            </div>


            {/* INCIDENT */}

            <div className="response-drawer-section">

              <span className="panel-eyebrow">
                ASSIGNED INCIDENT
              </span>

              <div className="response-incident-card">

                <div className="response-incident-icon">
                  <ShieldAlert size={16} />
                </div>

                <div>

                  <strong>
                    {selectedResponse.incident}
                  </strong>

                  <span>
                    {selectedResponse.location}
                  </span>

                  <small>
                    {selectedResponse.sector}
                  </small>

                </div>

              </div>

            </div>


            {/* LOCATION */}

            <div className="response-drawer-section">

              <span className="panel-eyebrow">
                CURRENT LOCATION
              </span>

              <div className="response-coordinate">

                <MapPin size={15} />

                {selectedResponse.coordinates}

              </div>

            </div>


            {/* PERSONNEL */}

            <div className="response-drawer-section">

              <span className="panel-eyebrow">
                DEPLOYED PERSONNEL
              </span>

              <div className="response-personnel-card">

                <UserRound size={16} />

                <div>

                  <strong>
                    {selectedResponse.personnel}
                    {" "}personnel assigned
                  </strong>

                  <span>
                    Field response team active
                  </span>

                </div>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="response-drawer-actions">

              <button className="response-action-primary">
                <Navigation size={15} />
                Track Unit
              </button>

              <button className="response-action-secondary">
                <Radio size={15} />
                Contact Team
              </button>

            </div>

          </aside>

        </div>

      )}

    </div>
  );
}


export default Response;