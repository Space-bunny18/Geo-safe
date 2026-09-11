import { useEffect, useState } from "react";
import {
  CloudRain,
  Droplets,
  Mountain,
  Activity,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";

import StatCard from "../components/dashboard/StatCard";
import IncidentList from "../components/dashboard/IncidentList";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import RiskMap from "../components/map/RiskMapView";
import StatusState from "../components/common/StatusState";
import {
  dashboardStats,
  incidents,
  activities,
} from "../data/mockData";


function Dashboard() {
  const [dashboardLoading, setDashboardLoading] =
  useState(false);

const [dashboardError, setDashboardError] =
  useState(false);

  return (
    <div className="app-shell">

      <Sidebar />

      <div className="main-area">

        <Topbar />

        <PageContainer>
          <StatusState
            type="empty"
            title="No active incidents"
            message="No incidents are currently available in this operational region."
          />
          {/* HEADER */}

          <div className="dashboard-header">

            <div>

              <div className="eyebrow">
                <span className="eyebrow-line" />
                LIVE MONITORING
              </div>

              <h1>
                Risk Command Center
              </h1>

              <p>
                Real-time situational awareness across monitored
                terrain, roads and field operations.
              </p>

            </div>


            <div className="header-status">

              <span className="pulse-dot" />

              Live data stream

            </div>

          </div>


          {/* STATISTICS */}

          <div className="stats-grid">

            {dashboardStats.map((stat) => (

              <StatCard
                key={stat.label}
                {...stat}
              />

            ))}

          </div>


          {/* MAP + INCIDENTS */}

          <div className="command-grid">

            <div className="map-panel">

              <RiskMap />

            </div>

            <IncidentList
              incidents={incidents}
            />

          </div>


          {/* ENVIRONMENT */}

          <div className="section-heading">

            <div>

              <span className="panel-eyebrow">
                ENVIRONMENTAL SIGNALS
              </span>

              <h2>
                Current Conditions
              </h2>

            </div>

          </div>


          <div className="environment-grid">

            <div className="environment-card">

              <div className="environment-icon">
                <CloudRain size={18} />
              </div>

              <div>

                <span>
                  24H RAINFALL
                </span>

                <strong>
                  185 mm
                </strong>

                <small>
                  ↑ 32% above threshold
                </small>

              </div>

            </div>


            <div className="environment-card">

              <div className="environment-icon">
                <Droplets size={18} />
              </div>

              <div>

                <span>
                  SOIL MOISTURE
                </span>

                <strong>
                  82%
                </strong>

                <small>
                  High saturation detected
                </small>

              </div>

            </div>


            <div className="environment-card">

              <div className="environment-icon">
                <Mountain size={18} />
              </div>

              <div>

                <span>
                  AVG. SLOPE
                </span>

                <strong>
                  34.8°
                </strong>

                <small>
                  High instability potential
                </small>

              </div>

            </div>


            <div className="environment-card">

              <div className="environment-icon">
                <Activity size={18} />
              </div>

              <div>

                <span>
                  RISK SIGNALS
                </span>

                <strong>
                  08
                </strong>

                <small>
                  3 newly detected
                </small>

              </div>

            </div>

          </div>


          {/* ACTIVITY */}

          <div className="bottom-grid">

            <ActivityFeed
              activities={activities}
            />


            <div className="response-summary">

              <div className="panel-header">

                <div>

                  <span className="panel-eyebrow">
                    RESPONSE STATUS
                  </span>

                  <h3>
                    Emergency Operations
                  </h3>

                </div>

              </div>


              <div className="response-main">

                <div className="response-number">
                  07
                </div>

                <div>

                  <strong>
                    Active responses
                  </strong>

                  <span>
                    Units currently deployed
                  </span>

                </div>

              </div>


              <div className="response-progress">

                <div>

                  <span>
                    Response capacity
                  </span>

                  <strong>
                    72%
                  </strong>

                </div>


                <div className="progress-track">

                  <div className="progress-fill" />

                </div>

              </div>


              <button className="response-button">
                Open Response Matrix
              </button>

            </div>

          </div>

        </PageContainer>

      </div>

    </div>
  );
}


export default Dashboard;