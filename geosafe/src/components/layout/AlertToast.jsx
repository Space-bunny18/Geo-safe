import {
  AlertTriangle,
  ShieldAlert,
  Radio,
  Info,
  X,
  ArrowUpRight,
} from "lucide-react";

import "./AlertToast.css";


function getAlertIcon(type) {
  switch (type) {
    case "critical":
      return <ShieldAlert size={19} />;

    case "high":
      return <AlertTriangle size={19} />;

    case "moderate":
      return <Radio size={19} />;

    default:
      return <Info size={19} />;
  }
}


function AlertToast({
  notification,
  onClose,
  onViewIncident,
}) {
  if (!notification) {
    return null;
  }


  return (
    <div
      className={`alert-toast alert-toast-${notification.type}`}
    >

      {/* ALERT ICON */}

      <div className="alert-toast-icon">

        {getAlertIcon(
          notification.type
        )}

      </div>


      {/* CONTENT */}

      <div className="alert-toast-content">

        <div className="alert-toast-label">

          <span>
            {notification.type === "critical"
              ? "CRITICAL ALERT"
              : notification.type === "high"
              ? "HIGH PRIORITY"
              : notification.type === "moderate"
              ? "RISK UPDATE"
              : "SYSTEM UPDATE"}
          </span>

          <span className="alert-toast-live">
            LIVE
          </span>

        </div>


        <strong>
          {notification.title}
        </strong>


        <p>
          {notification.message}
        </p>


        {/* ACTIONS */}

        <div className="alert-toast-actions">

          {notification.incidentId && (
            <button
              type="button"
              className="alert-toast-view"
              onClick={() =>
                onViewIncident(
                  notification
                )
              }
            >

              <ArrowUpRight size={13} />

              View Incident

            </button>
          )}


          <button
            type="button"
            className="alert-toast-dismiss"
            onClick={onClose}
          >
            Dismiss
          </button>

        </div>

      </div>


      {/* CLOSE */}

      <button
        type="button"
        className="alert-toast-close"
        onClick={onClose}
        aria-label="Dismiss alert"
      >
        <X size={16} />
      </button>

    </div>
  );
}


export default AlertToast;