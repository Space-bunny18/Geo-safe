import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Clock3,
  Route,
  AlertTriangle,
  CheckCircle2,
  X,
  ArrowUpRight,
  Navigation,
  Radio,
  ShieldAlert,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";


const roadData = [
  {
    id: "RD-204",
    name: "NH-05",
    route: "Shimla — Rampur",
    location: "Mashobra Sector",
    condition: "Blocked",
    severity: "critical",
    risk: 96,
    traffic: "Closed",
    updated: "2 min ago",
    issue: "Landslide",
    coordinates: "31.1312, 77.2345",
  },
  {
    id: "RD-198",
    name: "NH-205",
    route: "Shimla — Bilaspur",
    location: "Kufri Bypass",
    condition: "Restricted",
    severity: "high",
    risk: 82,
    traffic: "Limited",
    updated: "8 min ago",
    issue: "Road Crack",
    coordinates: "31.0974, 77.2673",
  },
  {
    id: "RD-191",
    name: "SH-13",
    route: "Theog — Kotkhai",
    location: "Theog Region",
    condition: "At Risk",
    severity: "high",
    risk: 74,
    traffic: "Controlled",
    updated: "14 min ago",
    issue: "Slope Instability",
    coordinates: "31.1217, 77.3587",
  },
  {
    id: "RD-176",
    name: "NH-22",
    route: "Shimla — Solan",
    location: "Shoghi Sector",
    condition: "Monitored",
    severity: "moderate",
    risk: 58,
    traffic: "Open",
    updated: "21 min ago",
    issue: "Heavy Rainfall",
    coordinates: "31.0186, 77.0967",
  },
  {
    id: "RD-169",
    name: "SH-6",
    route: "Chail — Kufri",
    location: "Chail Road",
    condition: "Normal",
    severity: "low",
    risk: 31,
    traffic: "Open",
    updated: "32 min ago",
    issue: "No active threat",
    coordinates: "30.9652, 77.1896",
  },
];


function getSeverityClass(severity) {
  return `road-severity-${severity}`;
}


function Roads() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [selectedRoad, setSelectedRoad] = useState(null);


  const filteredRoads = useMemo(() => {
    return roadData.filter((road) => {
      const matchesSearch =
        road.name.toLowerCase().includes(search.toLowerCase()) ||
        road.route.toLowerCase().includes(search.toLowerCase()) ||
        road.location.toLowerCase().includes(search.toLowerCase());

      const matchesSeverity =
        severityFilter === "all" ||
        road.severity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [search, severityFilter]);


  const blockedCount = roadData.filter(
    (road) => road.condition === "Blocked"
  ).length;

  const restrictedCount = roadData.filter(
    (road) => road.condition === "Restricted"
  ).length;

  const highRiskCount = roadData.filter(
    (road) => road.risk >= 70
  ).length;


  return (
    <div className="app-shell">

      <Sidebar />

      <main className="main-content">

        <Topbar />

        <PageContainer>

          <section className="roads-page">

            {/* PAGE HEADER */}

            <div className="roads-header">

              <div>
                <div className="section-kicker">
                  <span className="kicker-line" />
                  NETWORK MONITORING
                </div>

                <h1>Road Network</h1>

                <p>
                  Monitor road conditions, blockages and
                  infrastructure risk across monitored routes.
                </p>
              </div>


              <div className="roads-live-status">
                <span className="live-dot" />
                NETWORK LIVE
              </div>

            </div>


            {/* METRICS */}

            <div className="roads-metrics">

              <div className="road-metric-card">
                <div className="road-metric-icon critical">
                  <ShieldAlert size={17} />
                </div>

                <div>
                  <span>Blocked Roads</span>
                  <strong>{blockedCount}</strong>
                </div>
              </div>


              <div className="road-metric-card">
                <div className="road-metric-icon high">
                  <AlertTriangle size={17} />
                </div>

                <div>
                  <span>Restricted</span>
                  <strong>{restrictedCount}</strong>
                </div>
              </div>


              <div className="road-metric-card">
                <div className="road-metric-icon moderate">
                  <Radio size={17} />
                </div>

                <div>
                  <span>High Risk Routes</span>
                  <strong>{highRiskCount}</strong>
                </div>
              </div>


              <div className="road-metric-card">
                <div className="road-metric-icon normal">
                  <Route size={17} />
                </div>

                <div>
                  <span>Routes Monitored</span>
                  <strong>{roadData.length}</strong>
                </div>
              </div>

            </div>


            {/* CONTROLS */}

            <div className="roads-controls">

              <div className="roads-search">

                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search roads, routes or sectors..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />

                {search && (
                  <button
                    className="roads-clear-search"
                    onClick={() => setSearch("")}
                  >
                    <X size={14} />
                  </button>
                )}

              </div>


              <div className="roads-filter">

                <Filter size={15} />

                <select
                  value={severityFilter}
                  onChange={(event) =>
                    setSeverityFilter(event.target.value)
                  }
                >
                  <option value="all">All Risk Levels</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="moderate">Moderate</option>
                  <option value="low">Low</option>
                </select>

              </div>

            </div>


            {/* NETWORK TABLE */}

            <div className="roads-panel">

              <div className="roads-panel-header">

                <div>
                  <span className="panel-eyebrow">
                    ROAD NETWORK STATUS
                  </span>

                  <h2>Monitored Routes</h2>
                </div>

                <span className="roads-result-count">
                  {filteredRoads.length} routes
                </span>

              </div>


              <div className="roads-table-wrapper">

                <table className="roads-table">

                  <thead>
                    <tr>
                      <th>ROAD</th>
                      <th>LOCATION</th>
                      <th>CONDITION</th>
                      <th>RISK</th>
                      <th>TRAFFIC</th>
                      <th>UPDATED</th>
                      <th />
                    </tr>
                  </thead>


                  <tbody>

                    {filteredRoads.map((road) => (

                      <tr
                        key={road.id}
                        onClick={() => setSelectedRoad(road)}
                      >

                        <td>

                          <div className="road-name-cell">

                            <div className="road-route-icon">
                              <Route size={15} />
                            </div>

                            <div>
                              <strong>{road.name}</strong>
                              <span>{road.route}</span>
                            </div>

                          </div>

                        </td>


                        <td>

                          <div className="road-location">

                            <MapPin size={13} />

                            <span>{road.location}</span>

                          </div>

                        </td>


                        <td>

                          <span
                            className={`road-condition ${getSeverityClass(
                              road.severity
                            )}`}
                          >
                            {road.condition}
                          </span>

                        </td>


                        <td>

                          <div className="road-risk">

                            <strong>{road.risk}%</strong>

                            <div className="road-risk-bar">
                              <span
                                className={getSeverityClass(
                                  road.severity
                                )}
                                style={{
                                  width: `${road.risk}%`,
                                }}
                              />
                            </div>

                          </div>

                        </td>


                        <td>

                          <span className="road-traffic">
                            {road.traffic}
                          </span>

                        </td>


                        <td>

                          <div className="road-updated">

                            <Clock3 size={12} />

                            {road.updated}

                          </div>

                        </td>


                        <td>

                          <button
                            className="road-open-button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedRoad(road);
                            }}
                            aria-label={`Open ${road.name}`}
                          >
                            <ArrowUpRight size={15} />
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>


                {filteredRoads.length === 0 && (

                  <div className="roads-empty">

                    <Route size={28} />

                    <strong>No roads found</strong>

                    <span>
                      Try changing your search or filter.
                    </span>

                  </div>

                )}

              </div>

            </div>

          </section>

        </PageContainer>

      </main>


      {/* ROAD DETAIL DRAWER */}

      {selectedRoad && (

        <div
          className="road-drawer-backdrop"
          onClick={() => setSelectedRoad(null)}
        >

          <aside
            className="road-drawer"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="road-drawer-header">

              <div>

                <span className="panel-eyebrow">
                  ROAD DETAILS
                </span>

                <h2>{selectedRoad.name}</h2>

                <span>{selectedRoad.route}</span>

              </div>


              <button
                className="road-drawer-close"
                onClick={() => setSelectedRoad(null)}
              >
                <X size={18} />
              </button>

            </div>


            <div className="road-drawer-risk">

              <div>

                <span>RISK SCORE</span>

                <strong>{selectedRoad.risk}%</strong>

              </div>

              <div
                className={`road-risk-status ${getSeverityClass(
                  selectedRoad.severity
                )}`}
              >
                {selectedRoad.severity.toUpperCase()}
              </div>

            </div>


            <div className="road-detail-grid">

              <div>
                <span>CONDITION</span>
                <strong>{selectedRoad.condition}</strong>
              </div>

              <div>
                <span>TRAFFIC</span>
                <strong>{selectedRoad.traffic}</strong>
              </div>

              <div>
                <span>ACTIVE ISSUE</span>
                <strong>{selectedRoad.issue}</strong>
              </div>

              <div>
                <span>LAST UPDATE</span>
                <strong>{selectedRoad.updated}</strong>
              </div>

            </div>


            <div className="road-drawer-section">

              <span className="panel-eyebrow">
                LOCATION
              </span>

              <div className="road-coordinate">

                <MapPin size={15} />

                {selectedRoad.coordinates}

              </div>

            </div>


            <div className="road-drawer-section">

              <span className="panel-eyebrow">
                OPERATIONAL STATUS
              </span>

              <div className="road-status-message">

                {selectedRoad.condition === "Blocked" ? (
                  <>
                    <ShieldAlert size={17} />
                    <span>
                      Route is currently blocked.
                      Immediate response assessment
                      recommended.
                    </span>
                  </>
                ) : selectedRoad.condition === "Restricted" ? (
                  <>
                    <AlertTriangle size={17} />
                    <span>
                      Traffic restrictions are active
                      on this route.
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={17} />
                    <span>
                      Route remains operational under
                      current monitoring conditions.
                    </span>
                  </>
                )}

              </div>

            </div>


            <div className="road-drawer-actions">

              <button className="road-action-primary">
                <Navigation size={15} />
                View on Map
              </button>

              <button className="road-action-secondary">
                <Radio size={15} />
                Dispatch Response
              </button>

            </div>

          </aside>

        </div>

      )}

    </div>
  );
}


export default Roads;