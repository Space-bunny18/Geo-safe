import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Route,
} from "lucide-react";

function StatCard({
  label,
  value,
  change,
  description,
  level,
}) {
  const icons = {
    critical: AlertTriangle,
    high: AlertTriangle,
    moderate: TrendingDown,
    road: Route,
  };

  const Icon = icons[level];

  const increasing = change.startsWith("+");

  return (
    <div className={`stat-card ${level}`}>

      <div className="stat-card-top">

        <div className="stat-icon">
          <Icon size={16} strokeWidth={2} />
        </div>

        <div className="stat-trend">
          {increasing ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}

          <span>{change}</span>
        </div>

      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-label">
        {label}
      </div>

      <div className="stat-description">
        {description}
      </div>

    </div>
  );
}

export default StatCard;