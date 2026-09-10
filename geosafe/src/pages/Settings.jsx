import { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  ShieldAlert,
  Database,
  Map,
  RefreshCw,
  UserRound,
  Lock,
  CheckCircle2,
  ChevronRight,
  Radio,
  Activity,
  Save,
  Navigation,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";

function Settings() {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [highRiskAlerts, setHighRiskAlerts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("30");

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-area">
        <Topbar />

        <PageContainer>
          <section className="settings-page">
            {/* HEADER */}
            <div className="settings-page-header">
              <div>
                <div className="settings-eyebrow">
                  SYSTEM CONTROL
                  <span className="settings-live-dot" />
                  SYSTEM OPERATIONAL
                </div>

                <h1>System Settings</h1>

                <p>
                  Configure GeoSafe monitoring, alerting, synchronization
                  and authority control preferences.
                </p>
              </div>

              <div className="settings-system-status">
                <CheckCircle2 size={15} />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>

            {/* SYSTEM OVERVIEW */}
            <div className="settings-overview-grid">
              <div className="settings-overview-card">
                <div className="settings-overview-icon">
                  <Activity size={18} />
                </div>

                <div>
                  <span>System Status</span>
                  <strong>Operational</strong>
                  <small>All services running</small>
                </div>
              </div>

              <div className="settings-overview-card">
                <div className="settings-overview-icon">
                  <Database size={18} />
                </div>

                <div>
                  <span>Data Synchronization</span>
                  <strong>Connected</strong>
                  <small>Last sync just now</small>
                </div>
              </div>

              <div className="settings-overview-card">
                <div className="settings-overview-icon">
                  <Radio size={18} />
                </div>

                <div>
                  <span>Alert Dispatcher</span>
                  <strong>Active</strong>
                  <small>Monitoring critical events</small>
                </div>
              </div>

              <div className="settings-overview-card">
                <div className="settings-overview-icon">
                  <ShieldAlert size={18} />
                </div>

                <div>
                  <span>Risk Engine</span>
                  <strong>Online</strong>
                  <small>Risk analysis available</small>
                </div>
              </div>
            </div>

            {/* SETTINGS GRID */}
            <div className="settings-content-grid">
              {/* ALERT SETTINGS */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-icon settings-icon-alert">
                    <Bell size={17} />
                  </div>

                  <div>
                    <span>ALERT CONFIGURATION</span>
                    <h2>Notification Controls</h2>
                  </div>
                </div>

                <div className="settings-card-body">
                  <div className="settings-toggle-row">
                    <div>
                      <strong>System Alerts</strong>
                      <span>
                        Enable automated risk and incident notifications.
                      </span>
                    </div>

                    <button
                      className={`settings-toggle ${
                        alertsEnabled ? "active" : ""
                      }`}
                      onClick={() => setAlertsEnabled(!alertsEnabled)}
                      aria-label="Toggle system alerts"
                    >
                      <span />
                    </button>
                  </div>

                  <div className="settings-divider" />

                  <div className="settings-toggle-row">
                    <div>
                      <strong>Critical Risk Alerts</strong>
                      <span>
                        Notify authority when critical risk is detected.
                      </span>
                    </div>

                    <button
                      className={`settings-toggle ${
                        criticalAlerts ? "active" : ""
                      }`}
                      onClick={() =>
                        setCriticalAlerts(!criticalAlerts)
                      }
                      aria-label="Toggle critical alerts"
                    >
                      <span />
                    </button>
                  </div>

                  <div className="settings-divider" />

                  <div className="settings-toggle-row">
                    <div>
                      <strong>High Risk Alerts</strong>
                      <span>
                        Notify authority when high-risk conditions emerge.
                      </span>
                    </div>

                    <button
                      className={`settings-toggle ${
                        highRiskAlerts ? "active" : ""
                      }`}
                      onClick={() =>
                        setHighRiskAlerts(!highRiskAlerts)
                      }
                      aria-label="Toggle high risk alerts"
                    >
                      <span />
                    </button>
                  </div>

                  <div className="settings-divider" />

                  <div className="settings-toggle-row">
                    <div>
                      <strong>Alert Sound</strong>
                      <span>
                        Play an audible signal for incoming alerts.
                      </span>
                    </div>

                    <button
                      className={`settings-toggle ${
                        soundEnabled ? "active" : ""
                      }`}
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      aria-label="Toggle alert sound"
                    >
                      <span />
                    </button>
                  </div>
                </div>
              </div>

              {/* RISK THRESHOLDS */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-icon settings-icon-risk">
                    <ShieldAlert size={17} />
                  </div>

                  <div>
                    <span>RISK ENGINE</span>
                    <h2>Risk Thresholds</h2>
                  </div>
                </div>

                <div className="settings-card-body">
                  <div className="settings-threshold">
                    <div className="settings-threshold-top">
                      <span>CRITICAL</span>
                      <strong>90 — 100</strong>
                    </div>

                    <div className="settings-threshold-bar">
                      <div
                        className="critical"
                        style={{ width: "100%" }}
                      />
                    </div>

                    <small>
                      Immediate authority intervention recommended.
                    </small>
                  </div>

                  <div className="settings-threshold">
                    <div className="settings-threshold-top">
                      <span>HIGH</span>
                      <strong>75 — 89</strong>
                    </div>

                    <div className="settings-threshold-bar">
                      <div
                        className="high"
                        style={{ width: "82%" }}
                      />
                    </div>

                    <small>
                      Active monitoring and response preparation.
                    </small>
                  </div>

                  <div className="settings-threshold">
                    <div className="settings-threshold-top">
                      <span>MODERATE</span>
                      <strong>55 — 74</strong>
                    </div>

                    <div className="settings-threshold-bar">
                      <div
                        className="moderate"
                        style={{ width: "64%" }}
                      />
                    </div>

                    <small>
                      Continued monitoring within the affected zone.
                    </small>
                  </div>

                  <div className="settings-threshold">
                    <div className="settings-threshold-top">
                      <span>LOW</span>
                      <strong>0 — 54</strong>
                    </div>

                    <div className="settings-threshold-bar">
                      <div
                        className="low"
                        style={{ width: "45%" }}
                      />
                    </div>

                    <small>
                      Normal monitoring conditions.
                    </small>
                  </div>
                </div>
              </div>

              {/* DATA & SYNC */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-icon settings-icon-data">
                    <RefreshCw size={17} />
                  </div>

                  <div>
                    <span>DATA PIPELINE</span>
                    <h2>Synchronization</h2>
                  </div>
                </div>

                <div className="settings-card-body">
                  <div className="settings-toggle-row">
                    <div>
                      <strong>Automatic Refresh</strong>
                      <span>
                        Automatically refresh dashboard intelligence.
                      </span>
                    </div>

                    <button
                      className={`settings-toggle ${
                        autoRefresh ? "active" : ""
                      }`}
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      aria-label="Toggle automatic refresh"
                    >
                      <span />
                    </button>
                  </div>

                  <div className="settings-divider" />

                  <div className="settings-select-row">
                    <div>
                      <strong>Refresh Interval</strong>
                      <span>
                        Frequency for live data synchronization.
                      </span>
                    </div>

                    <select
                      value={refreshInterval}
                      onChange={(e) =>
                        setRefreshInterval(e.target.value)
                      }
                    >
                      <option value="15">15 sec</option>
                      <option value="30">30 sec</option>
                      <option value="60">60 sec</option>
                      <option value="120">2 min</option>
                    </select>
                  </div>

                  <div className="settings-sync-status">
                    <div className="settings-sync-icon">
                      <RefreshCw size={15} />
                    </div>

                    <div>
                      <strong>Data pipeline connected</strong>
                      <span>
                        Weather, terrain and incident feeds available.
                      </span>
                    </div>

                    <CheckCircle2 size={16} />
                  </div>
                </div>
              </div>

              {/* MAP SETTINGS */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-icon settings-icon-map">
                    <Map size={17} />
                  </div>

                  <div>
                    <span>GEOSPATIAL MONITORING</span>
                    <h2>Map Preferences</h2>
                  </div>
                </div>

                <div className="settings-card-body">
                  <button className="settings-option-row">
                    <div className="settings-option-icon">
                      <Map size={15} />
                    </div>

                    <div>
                      <strong>Default Map View</strong>
                      <span>Risk intelligence layer</span>
                    </div>

                    <ChevronRight size={16} />
                  </button>

                  <div className="settings-divider" />

                  <button className="settings-option-row">
                    <div className="settings-option-icon">
                      <Navigation size={15} />
                    </div>

                    <div>
                      <strong>Terrain Visualization</strong>
                      <span>Elevation and slope analysis</span>
                    </div>

                    <ChevronRight size={16} />
                  </button>

                  <div className="settings-divider" />

                  <button className="settings-option-row">
                    <div className="settings-option-icon">
                      <Radio size={15} />
                    </div>

                    <div>
                      <strong>Live Risk Layers</strong>
                      <span>Real-time risk zone overlays</span>
                    </div>

                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* AUTHORITY PROFILE */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-icon settings-icon-user">
                    <UserRound size={17} />
                  </div>

                  <div>
                    <span>AUTHORITY ACCESS</span>
                    <h2>Control Center Profile</h2>
                  </div>
                </div>

                <div className="settings-card-body">
                  <div className="settings-profile">
                    <div className="settings-profile-avatar">
                      <UserRound size={21} />
                    </div>

                    <div>
                      <strong>District Authority</strong>
                      <span>Administrator</span>
                    </div>

                    <span className="settings-profile-status">
                      ACTIVE
                    </span>
                  </div>

                  <div className="settings-profile-details">
                    <div>
                      <span>ACCESS LEVEL</span>
                      <strong>CONTROL CENTER</strong>
                    </div>

                    <div>
                      <span>SESSION</span>
                      <strong>SECURE</strong>
                    </div>
                  </div>

                  <button className="settings-security-button">
                    <Lock size={15} />
                    Security & Access
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

              {/* SYSTEM INFORMATION */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-icon">
                    <SettingsIcon size={17} />
                  </div>

                  <div>
                    <span>PLATFORM</span>
                    <h2>System Information</h2>
                  </div>
                </div>

                <div className="settings-card-body">
                  <div className="settings-info-list">
                    <div>
                      <span>PLATFORM</span>
                      <strong>GeoSafe Risk Intelligence</strong>
                    </div>

                    <div>
                      <span>VERSION</span>
                      <strong>1.0.0</strong>
                    </div>

                    <div>
                      <span>ENVIRONMENT</span>
                      <strong>Production</strong>
                    </div>

                    <div>
                      <span>REGION</span>
                      <strong>Himachal Pradesh</strong>
                    </div>

                    <div>
                      <span>LAST SYSTEM CHECK</span>
                      <strong>Just now</strong>
                    </div>
                  </div>

                  <div className="settings-save-area">
                    <span>
                      Settings are currently stored locally.
                    </span>

                    <button className="settings-save-button">
                      <Save size={14} />
                      Save Configuration
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </PageContainer>
      </main>
    </div>
  );
}

export default Settings;