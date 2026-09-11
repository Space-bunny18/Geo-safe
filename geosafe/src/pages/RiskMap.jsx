import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";
import RiskMapView from "../components/map/RiskMapView";


function RiskMap() {
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

            <RiskMapView />

          </div>

        </PageContainer>

      </div>

    </div>
  );
}


export default RiskMap;