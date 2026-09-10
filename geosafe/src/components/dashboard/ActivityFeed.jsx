import {
  AlertTriangle,
  BrainCircuit,
  Radio,
  Route,
} from "lucide-react";

function ActivityFeed({ activities }) {
  const icons = {
    incident: AlertTriangle,
    analysis: BrainCircuit,
    dispatch: Radio,
    road: Route,
  };

  return (
    <div className="activity-panel">

      <div className="panel-header">
        <div>
          <span className="panel-eyebrow">SYSTEM LOG</span>
          <h3>Recent Activity</h3>
        </div>
      </div>

      <div className="activity-list">

        {activities.map((activity, index) => {
          const Icon = icons[activity.type];

          return (
            <div className="activity-item" key={index}>

              <div className="activity-icon">
                <Icon size={14} />
              </div>

              <div className="activity-content">
                <strong>{activity.title}</strong>

                <span>
                  {activity.description}
                </span>
              </div>

              <time>{activity.time}</time>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default ActivityFeed;