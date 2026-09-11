import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Search,
  Filter,
  MapPin,
  Clock3,
  ArrowUpRight,
  X,
  Navigation,
  Radio,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";

import { incidents } from "../data/mockData";


function getStatus(risk) {
  if (risk >= 90) return "ACTIVE";
  if (risk >= 75) return "REVIEW";
  return "MONITOR";
}


function getSeverity(risk) {
  if (risk >= 90) return "critical";
  if (risk >= 75) return "high";
  return "moderate";
}


function Incidents() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("all");
  const [status, setStatus] = useState("all");

  const [selectedIncident, setSelectedIncident] = useState(() => {
    const incidentId = searchParams.get("incident");

    if (!incidentId) {
      return null;
    }

    return (
      incidents.find(
        (item) => item.id === incidentId
      ) || null
    );
  });


  /*
    FILTER INCIDENTS
  */
  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const incidentSeverity = getSeverity(incident.risk);
      const incidentStatus = getStatus(incident.risk);

      const matchesSearch =
        incident.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        incident.location
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        incident.id
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSeverity =
        severity === "all" ||
        incidentSeverity === severity;

      const matchesStatus =
        status === "all" ||
        incidentStatus === status;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus
      );
    });
  }, [search, severity, status]);


  return (
    <div className="app-shell">

      {/* SIDEBAR */}
      <Sidebar />


      <div className="main-area">

        {/* TOPBAR */}
        <Topbar />


        <PageContainer>

          {/* PAGE HEADER */}

          <div className="page-heading-row">

            <div>

              <div className="eyebrow">
                <span className="eyebrow-line" />
                INCIDENT OPERATIONS
              </div>


              <h1>
                Incident Management
              </h1>


              <p>
                Monitor, investigate and coordinate
                active terrain and infrastructure incidents.
              </p>

            </div>


            <div className="page-live-status">
              <span />
              LIVE INCIDENT FEED
            </div>

          </div>


          {/* METRICS */}

          <div className="incident-metrics">

            <div className="incident-metric critical">
              <span>CRITICAL</span>
              <strong>12</strong>
              <small>Immediate action</small>
            </div>


            <div className="incident-metric high">
              <span>HIGH RISK</span>
              <strong>27</strong>
              <small>Active monitoring</small>
            </div>


            <div className="incident-metric active">
              <span>ACTIVE</span>
              <strong>08</strong>
              <small>Open incidents</small>
            </div>


            <div className="incident-metric resolved">
              <span>RESOLVED</span>
              <strong>04</strong>
              <small>Last 24 hours</small>
            </div>

          </div>


          {/* TOOLBAR */}

          <div className="incident-toolbar">

            <div className="incident-search">

              <Search size={15} />

              <input
                type="text"
                placeholder="Search incidents, locations or IDs..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />


              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                >
                  <X size={13} />
                </button>
              )}

            </div>


            <div className="filter-group">

              {/* SEVERITY FILTER */}

              <div className="select-wrapper">

                <Filter size={13} />

                <select
                  value={severity}
                  onChange={(event) =>
                    setSeverity(event.target.value)
                  }
                >
                  <option value="all">
                    All Severity
                  </option>

                  <option value="critical">
                    Critical
                  </option>

                  <option value="high">
                    High
                  </option>

                  <option value="moderate">
                    Moderate
                  </option>
                </select>

                <ChevronDown size={13} />

              </div>


              {/* STATUS FILTER */}

              <div className="select-wrapper">

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value)
                  }
                >
                  <option value="all">
                    All Status
                  </option>

                  <option value="ACTIVE">
                    Active
                  </option>

                  <option value="REVIEW">
                    Review
                  </option>

                  <option value="MONITOR">
                    Monitor
                  </option>
                </select>

                <ChevronDown size={13} />

              </div>

            </div>

          </div>


          {/* INCIDENT TABLE */}

          <div className="incidents-table-container">

            <div className="table-header">

              <div>

                <span className="panel-eyebrow">
                  INCIDENT REGISTER
                </span>

                <h2>
                  Current Incidents
                </h2>

              </div>


              <span className="result-count">
                {filteredIncidents.length} incidents
              </span>

            </div>


            <div className="incident-table">

              {/* TABLE HEADER */}

              <div className="incident-table-head">

                <span>INCIDENT</span>
                <span>LOCATION</span>
                <span>RISK SCORE</span>
                <span>STATUS</span>
                <span>REPORTED</span>
                <span />

              </div>


              {/* TABLE ROWS */}

              {filteredIncidents.length > 0 ? (

                filteredIncidents.map((incident) => {

                  const incidentSeverity =
                    getSeverity(incident.risk);

                  const incidentStatus =
                    getStatus(incident.risk);


                  return (

                    <div
                      className="incident-table-row"
                      key={incident.id}
                      onClick={() =>
                        setSelectedIncident(incident)
                      }
                    >

                      {/* INCIDENT */}

                      <div className="table-incident-name">

                        <div
                          className={`severity-marker ${incidentSeverity}`}
                        />

                        <div>

                          <strong>
                            {incident.title}
                          </strong>

                          <span>
                            {incident.id}
                          </span>

                        </div>

                      </div>


                      {/* LOCATION */}

                      <div className="table-location">

                        <MapPin size={12} />

                        <span>
                          {incident.location}
                        </span>

                      </div>


                      {/* RISK */}

                      <div>

                        <span
                          className={`table-risk ${incidentSeverity}`}
                        >
                          {incident.risk}%
                        </span>

                      </div>


                      {/* STATUS */}

                      <div>

                        <span
                          className={`status-badge ${incidentStatus.toLowerCase()}`}
                        >
                          <span />
                          {incidentStatus}
                        </span>

                      </div>


                      {/* TIME */}

                      <div className="table-time">

                        <Clock3 size={11} />

                        {incident.time}

                      </div>


                      {/* OPEN */}

                      <button
                        className="incident-open-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedIncident(incident);
                        }}
                      >
                        <ArrowUpRight size={15} />
                      </button>

                    </div>

                  );

                })

              ) : (

                <div className="empty-incidents">

                  <Search size={22} />

                  <strong>
                    No incidents found
                  </strong>

                  <span>
                    Try changing your search or filters.
                  </span>

                </div>

              )}

            </div>

          </div>

        </PageContainer>

      </div>


      {/* DETAIL DRAWER */}

      {selectedIncident && (
        <>

          {/* BACKDROP */}

          <div
            className="drawer-backdrop"
            onClick={() =>
              setSelectedIncident(null)
            }
          />


          {/* DRAWER */}

          <aside className="incident-drawer">

            {/* DRAWER HEADER */}

            <div className="drawer-header">

              <div>

                <span className="panel-eyebrow">
                  INCIDENT DETAILS
                </span>

                <h2>
                  {selectedIncident.id}
                </h2>

              </div>


              <button
                className="drawer-close"
                onClick={() =>
                  setSelectedIncident(null)
                }
              >
                <X size={17} />
              </button>

            </div>


            {/* DRAWER CONTENT */}

            <div className="drawer-content">

              {/* RISK SCORE */}

              <div
                className={`drawer-risk ${getSeverity(
                  selectedIncident.risk
                )}`}
              >

                <div>

                  <span>
                    RISK SCORE
                  </span>

                  <strong>
                    {selectedIncident.risk}
                  </strong>

                  <small>
                    / 100
                  </small>

                </div>


                <ShieldAlert size={25} />

              </div>


              {/* TITLE */}

              <div className="drawer-title">

                <span>
                  {selectedIncident.title}
                </span>


                <div className="drawer-location">

                  <MapPin size={13} />

                  {selectedIncident.location}

                </div>

              </div>


              {/* STATUS */}

              <div className="drawer-status-row">

                <div>

                  <span>
                    SEVERITY
                  </span>

                  <strong>
                    {getSeverity(
                      selectedIncident.risk
                    ).toUpperCase()}
                  </strong>

                </div>


                <div>

                  <span>
                    STATUS
                  </span>

                  <strong>
                    {getStatus(
                      selectedIncident.risk
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    REPORTED
                  </span>

                  <strong>
                    {selectedIncident.time}
                  </strong>

                </div>

              </div>


              {/* ENVIRONMENTAL SIGNALS */}

              <div className="drawer-section">

                <div className="drawer-section-title">
                  ENVIRONMENTAL SIGNALS
                </div>


                <div className="drawer-signals">

                  <div>
                    <span>Rainfall</span>
                    <strong>185 mm</strong>
                  </div>


                  <div>
                    <span>Slope</span>
                    <strong>38°</strong>
                  </div>


                  <div>
                    <span>Soil Moisture</span>
                    <strong>82%</strong>
                  </div>


                  <div>
                    <span>Road Risk</span>
                    <strong>HIGH</strong>
                  </div>

                </div>

              </div>


              {/* FIELD OBSERVATION */}

              <div className="drawer-section">

                <div className="drawer-section-title">
                  FIELD OBSERVATION
                </div>


                <div className="field-observation">
                  Visible soil movement and surface
                  instability reported near the
                  monitored road corridor.
                </div>

              </div>


              {/* ACTIONS */}

              <div className="drawer-actions">

                <button className="drawer-map-button">
                  <Navigation size={15} />
                  View on Map
                </button>


                <button className="drawer-dispatch-button">
                  <Radio size={15} />
                  Dispatch Response
                </button>

              </div>

            </div>

          </aside>

        </>
      )}

    </div>
  );
}


export default Incidents;