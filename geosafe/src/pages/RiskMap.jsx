import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";
import RiskMapView from "../components/map/RiskMapView";

import {
  ShieldAlert,
  CloudRain,
  Mountain,
  Droplets,
  Route,
  ArrowUpRight,
} from "lucide-react";

import { riskZones } from "../data/mockData";


function getSeverity(risk) {
  if (risk >= 90) return "critical";
  if (risk >= 75) return "high";
  if (risk >= 55) return "moderate";

  return "low";
}


function RiskMap() {
  const navigate = useNavigate();

  const [selectedZone, setSelectedZone] = useState(
    riskZones[0]
  );


  function handleViewIncident() {
    if (!selectedZone) return;

    const incidentMap = {
      1: "GS-1042",
      2: "GS-1041",
      3: "GS-1038",
      4: "GS-1035",
    };

    const incidentId = incidentMap[selectedZone.id];

    if (incidentId) {
      navigate(`/incidents?incident=${incidentId}`);
    }
  }


  return (
    <div className="app-shell">

      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN AREA */}

      <div className="main-area">

        <Topbar />


        <PageContainer>

          {/* PAGE HEADER */}

          <div className="page-heading-row">

            <div>

              <div className="eyebrow">
                <span className="eyebrow-line" />
                GEOSPATIAL INTELLIGENCE
              </div>


              <h1>
                Risk Intelligence Map
              </h1>


              <p>
                Monitor terrain risk, incidents and
                infrastructure conditions across the
                operational region.
              </p>

            </div>


            <div className="page-live-status">
              <span />
              LIVE RISK FEED
            </div>

          </div>


          {/* MAP */}

          <div className="risk-map-page">

            <RiskMapView
              onZoneSelect={setSelectedZone}
            />

          </div>


          {/* RISK INTELLIGENCE */}

          <div className="risk-intelligence-panel">

            {/* PANEL HEADER */}

            <div className="risk-intelligence-header">

              <div>

                <span className="panel-eyebrow">
                  RISK INTELLIGENCE
                </span>

                <h2>
                  Operational Risk Overview
                </h2>

              </div>


              <div className="risk-intelligence-updated">

                <span />

                Updated 2 min ago

              </div>

            </div>


            {/* RISK METRICS */}

            <div className="risk-intelligence-metrics">

              <div className="risk-intelligence-metric critical">

                <div className="risk-metric-icon">
                  <ShieldAlert size={17} />
                </div>

                <div>
                  <span>CRITICAL ZONES</span>
                  <strong>02</strong>
                </div>

              </div>


              <div className="risk-intelligence-metric high">

                <div className="risk-metric-icon">
                  <ShieldAlert size={17} />
                </div>

                <div>
                  <span>HIGH RISK</span>
                  <strong>02</strong>
                </div>

              </div>


              <div className="risk-intelligence-metric moderate">

                <div className="risk-metric-icon">
                  <Mountain size={17} />
                </div>

                <div>
                  <span>ACTIVE INCIDENTS</span>
                  <strong>04</strong>
                </div>

              </div>


              <div className="risk-intelligence-metric road">

                <div className="risk-metric-icon">
                  <Route size={17} />
                </div>

                <div>
                  <span>ROAD BLOCKS</span>
                  <strong>01</strong>
                </div>

              </div>

            </div>


            {/* INTELLIGENCE GRID */}

            <div className="risk-intelligence-grid">

              {/* SELECTED RISK */}

              <div className="highest-risk-card">

                <div className="risk-card-header">

                  <span className="panel-eyebrow">
                    SELECTED RISK ZONE
                  </span>


                  <span
                    className={`risk-critical-badge ${getSeverity(
                      selectedZone.risk
                    )}`}
                  >
                    {getSeverity(
                      selectedZone.risk
                    ).toUpperCase()}
                  </span>

                </div>


                <div className="highest-risk-content">

                  <div className="highest-risk-icon">
                    <ShieldAlert size={20} />
                  </div>


                  <div className="highest-risk-info">

                    <strong>
                      {selectedZone.name}
                    </strong>

                    <span>
                      {selectedZone.type}
                    </span>

                  </div>


                  <div className="highest-risk-score">

                    <strong>
                      {selectedZone.risk}
                    </strong>

                    <span>
                      / 100
                    </span>

                  </div>

                </div>


                {/* INCIDENT ACTION */}

                <button
                  className="risk-view-incident"
                  onClick={handleViewIncident}
                >
                  <span>
                    View Related Incident
                  </span>

                  <ArrowUpRight size={14} />
                </button>

              </div>


              {/* ENVIRONMENTAL SIGNALS */}

              <div className="environment-signals-card">

                <div className="risk-card-header">

                  <span className="panel-eyebrow">
                    ENVIRONMENTAL SIGNALS
                  </span>

                </div>


                <div className="environment-signals">

                  <div className="environment-signal">

                    <div className="environment-signal-icon">
                      <CloudRain size={15} />
                    </div>

                    <div>
                      <span>RAINFALL</span>
                      <strong>
                        {selectedZone.id === 1
                          ? "185 mm"
                          : "142 mm"}
                      </strong>
                    </div>

                  </div>


                  <div className="environment-signal">

                    <div className="environment-signal-icon">
                      <Mountain size={15} />
                    </div>

                    <div>
                      <span>SLOPE</span>
                      <strong>
                        {selectedZone.id === 1
                          ? "38°"
                          : "34°"}
                      </strong>
                    </div>

                  </div>


                  <div className="environment-signal">

                    <div className="environment-signal-icon">
                      <Droplets size={15} />
                    </div>

                    <div>
                      <span>SOIL MOISTURE</span>
                      <strong>
                        {selectedZone.id === 1
                          ? "82%"
                          : "76%"}
                      </strong>
                    </div>

                  </div>


                  <div className="environment-signal">

                    <div className="environment-signal-icon">
                      <Route size={15} />
                    </div>

                    <div>
                      <span>ROAD RISK</span>

                      <strong>
                        {selectedZone.risk >= 90
                          ? "CRITICAL"
                          : selectedZone.risk >= 75
                          ? "HIGH"
                          : "MODERATE"}
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </PageContainer>

      </div>

    </div>
  );
}


export default RiskMap;