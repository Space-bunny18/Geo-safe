import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

function IncidentList({ incidents }) {
  return (
    <div className="incident-panel">

      <div className="panel-header">
        <div>
          <span className="panel-eyebrow">LIVE QUEUE</span>
          <h3>Critical Incidents</h3>
        </div>

        <button className="panel-action">
          View all
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="incident-list">
        {incidents.map((incident) => (
          <div className="incident-row" key={incident.id}>

            <div className={`incident-severity ${incident.severity}`}>
              <span />
            </div>

            <div className="incident-main">
              <div className="incident-title-row">
                <strong>{incident.title}</strong>

                <span className={`risk-badge ${incident.severity}`}>
                  {incident.risk}%
                </span>
              </div>

              <div className="incident-location">
                <MapPin size={11} />
                {incident.location}
              </div>
            </div>

            <div className="incident-meta">
              <span>{incident.id}</span>
              <small>{incident.time}</small>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default IncidentList;