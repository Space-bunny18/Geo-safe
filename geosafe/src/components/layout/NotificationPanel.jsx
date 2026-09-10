import {
  AlertTriangle,
  Radio,
  ShieldAlert,
  Info,
  X,
} from "lucide-react";

import { notifications } from "../../data/notifications";


function getNotificationIcon(type) {
  switch (type) {
    case "critical":
      return <ShieldAlert size={16} />;

    case "high":
      return <AlertTriangle size={16} />;

    case "moderate":
      return <Radio size={16} />;

    default:
      return <Info size={16} />;
  }
}


function NotificationPanel({ onClose }) {
  return (
    <div className="notification-panel">
      <div className="notification-panel-header">
        <div>
          <span className="notification-panel-eyebrow">
            SYSTEM ALERTS
          </span>

          <h3>Notifications</h3>
        </div>

        <button
          className="notification-close"
          onClick={onClose}
          aria-label="Close notifications"
        >
          <X size={17} />
        </button>
      </div>


      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item notification-${notification.type}`}
          >
            <div className="notification-icon">
              {getNotificationIcon(notification.type)}
            </div>

            <div className="notification-content">
              <div className="notification-item-top">
                <strong>{notification.title}</strong>

                {notification.unread && (
                  <span className="notification-unread-dot" />
                )}
              </div>

              <p>{notification.message}</p>

              <span className="notification-time">
                {notification.time}
              </span>
            </div>
          </div>
        ))}
      </div>


      <div className="notification-panel-footer">
        <button>
          View all notifications
        </button>
      </div>
    </div>
  );
}


export default NotificationPanel;