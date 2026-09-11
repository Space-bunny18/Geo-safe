import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  Radio,
  ShieldAlert,
  Info,
  X,
  Check,
  ArrowUpRight,
} from "lucide-react";

import "./NotificationPanel.css";
import { notifications as initialNotifications } from "../../data/notifications";


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
  const navigate = useNavigate();

  const [notificationList, setNotificationList] = useState(
    initialNotifications
  );


  const unreadCount = notificationList.filter(
    (notification) => notification.unread
  ).length;


  function acknowledgeNotification(id) {
    setNotificationList((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  }


  function viewIncident(notification) {
    acknowledgeNotification(notification.id);

    onClose();

    navigate(`/incidents?incident=${notification.incidentId}`);
  }


  return (
    <div className="notification-panel">

      {/* HEADER */}
      <div className="notification-panel-header">

        <div>
          <span className="notification-panel-eyebrow">
            SYSTEM ALERTS
          </span>

          <h3>
            Notifications

            {unreadCount > 0 && (
              <span className="notification-header-count">
                {unreadCount}
              </span>
            )}
          </h3>
        </div>


        <button
          className="notification-close"
          onClick={onClose}
          aria-label="Close notifications"
        >
          <X size={17} />
        </button>

      </div>


      {/* NOTIFICATIONS */}
      <div className="notification-list">

        {notificationList.map((notification) => (

          <div
            key={notification.id}
            className={`notification-item notification-${notification.type} ${
              notification.unread
                ? "notification-item-unread"
                : ""
            }`}
          >

            <div className="notification-icon">
              {getNotificationIcon(notification.type)}
            </div>


            <div className="notification-content">

              <div className="notification-item-top">

                <strong>
                  {notification.title}
                </strong>

                {notification.unread && (
                  <span className="notification-unread-dot" />
                )}

              </div>


              <p>
                {notification.message}
              </p>


              <span className="notification-time">
                {notification.time}
              </span>


              {/* ACTIONS */}
              <div className="notification-actions">

                <button
                  className="notification-view-button"
                  onClick={() =>
                    viewIncident(notification)
                  }
                >
                  <ArrowUpRight size={13} />
                  View Incident
                </button>


                {notification.unread && (
                  <button
                    className="notification-ack-button"
                    onClick={() =>
                      acknowledgeNotification(
                        notification.id
                      )
                    }
                  >
                    <Check size={13} />
                    Acknowledge
                  </button>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* FOOTER */}
      <div className="notification-panel-footer">

        <button>
          View all notifications
        </button>

      </div>

    </div>
  );
}


export default NotificationPanel;