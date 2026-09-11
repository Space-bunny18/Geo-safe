import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Filter,
  FileText,
  MapPin,
  Clock3,
  UserRound,
  Camera,
  ArrowUpRight,
  X,
  Upload,
  Navigation,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";


const reportData = [
  {
    id: "RP-084",
    incident: "GS-1042",
    title: "NH-05 Landslide Assessment",
    officer: "A. Sharma",
    unit: "FU-021",
    location: "Shimla–Rampur Highway",
    severity: "critical",
    status: "Submitted",
    time: "2 min ago",
    evidence: 4,
    coordinates: "31.1048,77.1734",
    observation:
      "Major debris accumulation detected across the carriageway. Road movement is currently restricted and further slope movement remains possible.",
  },

  {
    id: "RP-081",
    incident: "GS-1041",
    title: "Mashobra Slope Observation",
    officer: "R. Thakur",
    unit: "FU-018",
    location: "Mashobra Sector",
    severity: "critical",
    status: "Under Review",
    time: "8 min ago",
    evidence: 3,
    coordinates: "31.1312,77.2345",
    observation:
      "Visible soil displacement observed near the road edge. Additional monitoring is recommended following continued rainfall.",
  },

  {
    id: "RP-076",
    incident: "GS-1038",
    title: "Kufri Road Surface Report",
    officer: "K. Verma",
    unit: "FU-014",
    location: "Kufri Bypass",
    severity: "high",
    status: "Verified",
    time: "14 min ago",
    evidence: 5,
    coordinates: "31.0974,77.2673",
    observation:
      "Surface crack extending along the outer lane. No immediate structural collapse observed during field inspection.",
  },

  {
    id: "RP-071",
    incident: "GS-1035",
    title: "Theog Slope Stability Report",
    officer: "P. Negi",
    unit: "FU-009",
    location: "Theog Region",
    severity: "high",
    status: "Submitted",
    time: "21 min ago",
    evidence: 2,
    coordinates: "31.1217,77.3587",
    observation:
      "Slope remains unstable after rainfall. Field team recommends continued observation and precautionary traffic control.",
  },

  {
    id: "RP-064",
    incident: "—",
    title: "Shoghi Routine Patrol",
    officer: "S. Rana",
    unit: "FU-006",
    location: "Shoghi Sector",
    severity: "moderate",
    status: "Verified",
    time: "32 min ago",
    evidence: 1,
    coordinates: "31.0186,77.0967",
    observation:
      "Routine patrol completed. No active hazard or significant road obstruction observed.",
  },
];


function getSeverityClass(severity) {
  return `report-severity-${severity}`;
}


function getStatusClass(status) {
  return `report-status-${status
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
}


function Reports() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [reports, setReports] = useState(reportData);

  const [selectedReport, setSelectedReport] =
    useState(null);

  const [reportFormOpen, setReportFormOpen] =
    useState(false);

  const [formData, setFormData] = useState({
    incident: "",
    location: "",
    severity: "moderate",
    observation: "",
  });


  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const query = search.toLowerCase();

      const matchesSearch =
        report.id.toLowerCase().includes(query) ||
        report.title.toLowerCase().includes(query) ||
        report.officer.toLowerCase().includes(query) ||
        report.location.toLowerCase().includes(query) ||
        report.incident.toLowerCase().includes(query);

      const matchesSeverity =
        severityFilter === "all" ||
        report.severity === severityFilter;

      const matchesStatus =
        statusFilter === "all" ||
        report.status === statusFilter;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus
      );
    });
  }, [
    reports,
    search,
    severityFilter,
    statusFilter,
  ]);


  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (report) => report.status === "Submitted"
  ).length;

  const verifiedReports = reports.filter(
    (report) => report.status === "Verified"
  ).length;

  const evidenceCount = reports.reduce(
    (total, report) =>
      total + report.evidence,
    0
  );


  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }


  function handleSubmit(event) {
    event.preventDefault();

    const incidentId =
      formData.incident.trim() || "—";

    const location =
      formData.location.trim() ||
      "Location Pending";

    const observation =
      formData.observation.trim() ||
      "No observation provided.";

    const newReport = {
      id: `RP-${String(
        Math.floor(Math.random() * 900) + 100
      )}`,

      incident: incidentId,

      title:
        incidentId !== "—"
          ? `${incidentId} Field Assessment`
          : "New Field Observation",

      officer: "Current Field Officer",

      unit: "FIELD-01",

      location,

      severity: formData.severity,

      status: "Submitted",

      time: "Just now",

      evidence: 0,

      coordinates: "Pending",

      observation,
    };


    setReports((current) => [
      newReport,
      ...current,
    ]);


    setSelectedReport(newReport);

    setReportFormOpen(false);


    setFormData({
      incident: "",
      location: "",
      severity: "moderate",
      observation: "",
    });
  }


  function handleViewIncident() {
    if (
      !selectedReport ||
      selectedReport.incident === "—"
    ) {
      return;
    }

    setSelectedReport(null);

    navigate(
      `/incidents?incident=${encodeURIComponent(
        selectedReport.incident
      )}`
    );
  }


  function handleViewMap() {
    if (!selectedReport) {
      return;
    }

    const coordinates =
      selectedReport.coordinates;

    if (
      !coordinates ||
      coordinates === "Pending"
    ) {
      return;
    }

    setSelectedReport(null);

    navigate(
      `/risk-map?track=${encodeURIComponent(
        coordinates
      )}`
    );
  }


  function handleVerifyReport() {
    if (!selectedReport) {
      return;
    }

    const updatedReport = {
      ...selectedReport,
      status: "Verified",
    };

    setReports((current) =>
      current.map((report) =>
        report.id === selectedReport.id
          ? updatedReport
          : report
      )
    );

    setSelectedReport(updatedReport);
  }


  function handleAddReview() {
    if (!selectedReport) {
      return;
    }

    const updatedReport = {
      ...selectedReport,
      status: "Under Review",
    };

    setReports((current) =>
      current.map((report) =>
        report.id === selectedReport.id
          ? updatedReport
          : report
      )
    );

    setSelectedReport(updatedReport);
  }


  return (
    <div className="app-shell">

      <Sidebar />


      <main className="main-area">

        <Topbar />


        <PageContainer>

          <section className="reports-page">

            {/* HEADER */}

            <div className="reports-page-header">

              <div>

                <div className="reports-eyebrow">

                  FIELD INTELLIGENCE

                  <span className="reports-live-dot" />

                  REPORT NETWORK LIVE

                </div>


                <h1>
                  Field Reports
                </h1>


                <p>
                  Review observations, evidence and
                  incident reports submitted by field
                  personnel.
                </p>

              </div>


              <button
                type="button"
                className="reports-create-button"
                onClick={() =>
                  setReportFormOpen(true)
                }
              >
                <FileText size={15} />
                New Field Report
              </button>

            </div>


            {/* METRICS */}

            <div className="reports-metrics-grid">

              <div className="reports-metric-card">

                <div className="reports-metric-icon">
                  <FileText size={18} />
                </div>

                <div>

                  <span>
                    Total Reports
                  </span>

                  <strong>
                    {String(totalReports).padStart(
                      2,
                      "0"
                    )}
                  </strong>

                  <small>
                    field submissions
                  </small>

                </div>

              </div>


              <div className="reports-metric-card">

                <div className="reports-metric-icon reports-icon-alert">
                  <AlertTriangle size={18} />
                </div>

                <div>

                  <span>
                    Pending Review
                  </span>

                  <strong>
                    {String(pendingReports).padStart(
                      2,
                      "0"
                    )}
                  </strong>

                  <small>
                    awaiting authority review
                  </small>

                </div>

              </div>


              <div className="reports-metric-card">

                <div className="reports-metric-icon reports-icon-success">
                  <CheckCircle2 size={18} />
                </div>

                <div>

                  <span>
                    Verified
                  </span>

                  <strong>
                    {String(verifiedReports).padStart(
                      2,
                      "0"
                    )}
                  </strong>

                  <small>
                    validated reports
                  </small>

                </div>

              </div>


              <div className="reports-metric-card">

                <div className="reports-metric-icon">
                  <Camera size={18} />
                </div>

                <div>

                  <span>
                    Evidence Items
                  </span>

                  <strong>
                    {String(evidenceCount).padStart(
                      2,
                      "0"
                    )}
                  </strong>

                  <small>
                    attached to reports
                  </small>

                </div>

              </div>

            </div>


            {/* REPORTS CARD */}

            <div className="reports-card">

              <div className="reports-card-header">

                <div>

                  <span className="reports-section-label">
                    FIELD INTELLIGENCE
                  </span>

                  <h2>
                    Submitted Reports
                  </h2>

                </div>


                <span className="reports-count">
                  {filteredReports.length} REPORTS
                </span>

              </div>


              {/* TOOLBAR */}

              <div className="reports-toolbar">

                <div className="reports-search">

                  <Search size={17} />

                  <input
                    type="text"
                    placeholder="Search report, officer, incident or location..."
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                  />

                </div>


                <div className="reports-filter">

                  <Filter size={15} />

                  <select
                    value={severityFilter}
                    onChange={(event) =>
                      setSeverityFilter(
                        event.target.value
                      )
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

                    <option value="low">
                      Low
                    </option>

                  </select>

                </div>


                <div className="reports-filter">

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value
                      )
                    }
                  >

                    <option value="all">
                      All Status
                    </option>

                    <option value="Submitted">
                      Submitted
                    </option>

                    <option value="Under Review">
                      Under Review
                    </option>

                    <option value="Verified">
                      Verified
                    </option>

                  </select>

                </div>

              </div>


              {/* TABLE */}

              <div className="reports-table-wrapper">

                <table className="reports-table">

                  <thead>

                    <tr>

                      <th>REPORT</th>
                      <th>INCIDENT</th>
                      <th>FIELD OFFICER</th>
                      <th>SEVERITY</th>
                      <th>STATUS</th>
                      <th>EVIDENCE</th>
                      <th>SUBMITTED</th>
                      <th />

                    </tr>

                  </thead>


                  <tbody>

                    {filteredReports.map(
                      (report) => (

                        <tr
                          key={report.id}
                          onClick={() =>
                            setSelectedReport(
                              report
                            )
                          }
                        >

                          <td>

                            <div className="report-id-cell">

                              <div className="report-id-icon">
                                <FileText size={15} />
                              </div>

                              <div>

                                <strong>
                                  {report.id}
                                </strong>

                                <span>
                                  {report.title}
                                </span>

                              </div>

                            </div>

                          </td>


                          <td>

                            <div className="report-incident-cell">

                              <strong>
                                {report.incident}
                              </strong>

                              <span>

                                <MapPin size={11} />

                                {report.location}

                              </span>

                            </div>

                          </td>


                          <td>

                            <div className="report-officer-cell">

                              <div className="report-officer-avatar">
                                <UserRound size={14} />
                              </div>

                              <div>

                                <strong>
                                  {report.officer}
                                </strong>

                                <span>
                                  {report.unit}
                                </span>

                              </div>

                            </div>

                          </td>


                          <td>

                            <span
                              className={`report-severity ${getSeverityClass(
                                report.severity
                              )}`}
                            >
                              {report.severity}
                            </span>

                          </td>


                          <td>

                            <span
                              className={`report-status ${getStatusClass(
                                report.status
                              )}`}
                            >

                              <span />

                              {report.status}

                            </span>

                          </td>


                          <td>

                            <div className="report-evidence">

                              <Camera size={13} />

                              {report.evidence}

                            </div>

                          </td>


                          <td>

                            <div className="report-time">

                              <Clock3 size={13} />

                              {report.time}

                            </div>

                          </td>


                          <td>

                            <button
                              type="button"
                              className="report-row-action"
                              onClick={(event) => {

                                event.stopPropagation();

                                setSelectedReport(
                                  report
                                );

                              }}
                            >
                              <ArrowUpRight size={16} />
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>


                {filteredReports.length === 0 && (

                  <div className="reports-empty-state">

                    <Search size={24} />

                    <strong>
                      No reports found
                    </strong>

                    <span>
                      Try changing your search or
                      filters.
                    </span>

                  </div>

                )}

              </div>

            </div>

          </section>

        </PageContainer>


        {/* REPORT DETAIL DRAWER */}

        {selectedReport && (

          <div
            className="reports-drawer-overlay"
            onClick={() =>
              setSelectedReport(null)
            }
          >

            <aside
              className="reports-drawer"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="reports-drawer-header">

                <div>

                  <span className="reports-section-label">
                    FIELD REPORT
                  </span>

                  <h2>
                    {selectedReport.id}
                  </h2>

                </div>


                <button
                  type="button"
                  className="reports-drawer-close"
                  onClick={() =>
                    setSelectedReport(null)
                  }
                >
                  <X size={18} />
                </button>

              </div>


              <div className="reports-drawer-body">

                <div className="reports-detail-title">

                  <div className="reports-detail-icon">
                    <FileText size={20} />
                  </div>

                  <div>

                    <strong>
                      {selectedReport.title}
                    </strong>

                    <span>
                      Submitted by{" "}
                      {selectedReport.officer}
                    </span>

                  </div>

                </div>


                <div className="reports-detail-status-row">

                  <span
                    className={`report-severity ${getSeverityClass(
                      selectedReport.severity
                    )}`}
                  >
                    {selectedReport.severity}
                  </span>


                  <span
                    className={`report-status ${getStatusClass(
                      selectedReport.status
                    )}`}
                  >

                    <span />

                    {selectedReport.status}

                  </span>

                </div>


                <div className="reports-detail-grid">

                  <div>

                    <span>
                      INCIDENT
                    </span>

                    <strong>
                      {selectedReport.incident}
                    </strong>

                  </div>


                  <div>

                    <span>
                      FIELD UNIT
                    </span>

                    <strong>
                      {selectedReport.unit}
                    </strong>

                  </div>


                  <div>

                    <span>
                      LOCATION
                    </span>

                    <strong>
                      {selectedReport.location}
                    </strong>

                  </div>


                  <div>

                    <span>
                      SUBMITTED
                    </span>

                    <strong>
                      {selectedReport.time}
                    </strong>

                  </div>

                </div>


                {/* FIELD OBSERVATION */}

                <div className="reports-observation">

                  <div className="reports-observation-heading">

                    <ShieldAlert size={15} />

                    FIELD OBSERVATION

                  </div>

                  <p>
                    {selectedReport.observation}
                  </p>

                </div>


                {/* EVIDENCE */}

                <div className="reports-evidence-box">

                  <div>

                    <Camera size={16} />

                    <div>

                      <span>
                        EVIDENCE ATTACHED
                      </span>

                      <strong>
                        {selectedReport.evidence}{" "}
                        Evidence Items
                      </strong>

                    </div>

                  </div>


                  <button
                    type="button"
                  >
                    View
                    <ArrowUpRight size={14} />
                  </button>

                </div>


                {/* LOCATION */}

                <div className="reports-location-box">

                  <div>

                    <MapPin size={16} />

                    <div>

                      <span>
                        FIELD LOCATION
                      </span>

                      <strong>
                        {selectedReport.coordinates}
                      </strong>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={handleViewMap}
                    disabled={
                      !selectedReport.coordinates ||
                      selectedReport.coordinates ===
                        "Pending"
                    }
                  >
                    <Navigation size={14} />
                    Map
                  </button>

                </div>


                {/* ACTIONS */}

                <div className="reports-drawer-actions">

                  {selectedReport.incident !==
                    "—" && (

                    <button
                      type="button"
                      className="reports-primary-action"
                      onClick={
                        handleViewIncident
                      }
                    >
                      <ShieldAlert size={15} />
                      View Incident
                    </button>

                  )}


                  {selectedReport.status !==
                    "Verified" && (

                    <button
                      type="button"
                      className="reports-secondary-action"
                      onClick={
                        handleVerifyReport
                      }
                    >
                      <CheckCircle2 size={15} />
                      Verify Report
                    </button>

                  )}


                  {selectedReport.status !==
                    "Under Review" &&
                    selectedReport.status !==
                      "Verified" && (

                    <button
                      type="button"
                      className="reports-secondary-action"
                      onClick={
                        handleAddReview
                      }
                    >
                      <FileText size={15} />
                      Add Review
                    </button>

                  )}

                </div>

              </div>

            </aside>

          </div>

        )}


        {/* CREATE REPORT MODAL */}

        {reportFormOpen && (

          <div
            className="reports-modal-overlay"
            onClick={() =>
              setReportFormOpen(false)
            }
          >

            <div
              className="reports-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="reports-modal-header">

                <div>

                  <span className="reports-section-label">
                    FIELD INTELLIGENCE
                  </span>

                  <h2>
                    Create Field Report
                  </h2>

                  <p>
                    Submit a new observation from the
                    field.
                  </p>

                </div>


                <button
                  type="button"
                  className="reports-drawer-close"
                  onClick={() =>
                    setReportFormOpen(false)
                  }
                >
                  <X size={18} />
                </button>

              </div>


              <form
                className="reports-form"
                onSubmit={handleSubmit}
              >

                <div className="reports-form-grid">

                  <label>

                    <span>
                      INCIDENT ID
                    </span>

                    <input
                      name="incident"
                      value={formData.incident}
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. GS-1042"
                    />

                  </label>


                  <label>

                    <span>
                      SEVERITY
                    </span>

                    <select
                      name="severity"
                      value={formData.severity}
                      onChange={
                        handleInputChange
                      }
                    >

                      <option value="critical">
                        Critical
                      </option>

                      <option value="high">
                        High
                      </option>

                      <option value="moderate">
                        Moderate
                      </option>

                      <option value="low">
                        Low
                      </option>

                    </select>

                  </label>

                </div>


                <label>

                  <span>
                    FIELD LOCATION
                  </span>

                  <div className="reports-input-with-icon">

                    <MapPin size={15} />

                    <input
                      name="location"
                      value={formData.location}
                      onChange={
                        handleInputChange
                      }
                      placeholder="Enter incident location"
                    />

                  </div>

                </label>


                <label>

                  <span>
                    FIELD OBSERVATION
                  </span>

                  <textarea
                    name="observation"
                    value={formData.observation}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Describe what was observed in the field..."
                    rows="5"
                  />

                </label>


                <div className="reports-upload-area">

                  <div className="reports-upload-icon">
                    <Upload size={19} />
                  </div>

                  <strong>
                    Attach Evidence
                  </strong>

                  <span>
                    Add photographs or supporting
                    field evidence
                  </span>

                  <button
                    type="button"
                    className="reports-upload-button"
                  >
                    Select Files
                  </button>

                </div>


                <div className="reports-form-footer">

                  <span>
                    Report will be submitted to the
                    command center.
                  </span>


                  <div>

                    <button
                      type="button"
                      className="reports-cancel-button"
                      onClick={() =>
                        setReportFormOpen(false)
                      }
                    >
                      Cancel
                    </button>


                    <button
                      type="submit"
                      className="reports-submit-button"
                    >
                      <CheckCircle2 size={14} />
                      Submit Report
                    </button>

                  </div>

                </div>

              </form>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}


export default Reports;