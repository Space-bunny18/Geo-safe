import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";

function Dashboard() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-area">
        <Topbar />

        <PageContainer>
          <div className="dashboard-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                LIVE MONITORING
              </div>

              <h1>Risk Command Center</h1>

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

          <div className="dashboard-placeholder">
            <div>
              <span>COMMAND CENTER</span>
              <h2>Dashboard workspace</h2>
              <p>
                Risk intelligence, terrain visualization and emergency
                response modules will appear here.
              </p>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}

export default Dashboard;