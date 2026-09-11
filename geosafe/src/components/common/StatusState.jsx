import {
  LoaderCircle,
  AlertTriangle,
  Inbox,
  RotateCcw,
} from "lucide-react";

import "./StatusState.css";


function StatusState({
  type = "empty",
  title,
  message,
  actionLabel = "Retry",
  onAction,
}) {

  const config = {
    loading: {
      icon: <LoaderCircle size={22} />,
      defaultTitle: "Loading data",
      defaultMessage:
        "Retrieving the latest operational information.",
    },

    error: {
      icon: <AlertTriangle size={22} />,
      defaultTitle: "Data unavailable",
      defaultMessage:
        "Unable to retrieve the requested information.",
    },

    empty: {
      icon: <Inbox size={22} />,
      defaultTitle: "No data available",
      defaultMessage:
        "There is currently nothing to display.",
    },
  };

  const current =
    config[type] || config.empty;


  return (
    <div
      className={`status-state status-state-${type}`}
    >

      <div className="status-state-icon">
        {current.icon}
      </div>


      <strong>
        {title || current.defaultTitle}
      </strong>


      <p>
        {message || current.defaultMessage}
      </p>


      {type === "error" && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="status-state-action"
        >
          <RotateCcw size={13} />
          {actionLabel}
        </button>
      )}

    </div>
  );
}


export default StatusState;