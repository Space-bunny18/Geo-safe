import { useEffect, useState } from "react";
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

import {
  subscribeToNotifications,
  acknowledgeNotification as acknowledgeServiceNotification,
} from "../../services/notificationService";


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


  const [notificationList, setNotificationList] =
    useState([]);


  /*
   * Listen for notification updates from the
   * central GeoSafe notification service.
   *
   * The service sends the complete notification
   * history when this component subscribes.
   *
   * When a new notification is pushed, the service
   * sends only that new notification.
   */
  useEffect(() => {
    const unsubscribe =
      subscribeToNotifications(
        (notificationData) => {

          /*
           * Initial subscription / notification
           * state update.
           */
          if (Array.isArray(notificationData)) {
            setNotificationList(
              notificationData
            );

            return;
          }


          /*
           * New real-time notification.
           */
          setNotificationList((current) => {

            /*
             * Prevent duplicate notifications
             * if the same event is received again.
             */
            const alreadyExists =
              current.some(
                (notification) =>
                  notification.id ===
                  notificationData.id
              );

            if (alreadyExists) {
              return current;
            }


            return [
              notificationData,
              ...current,
            ];
          });

        }
      );


    return unsubscribe;
  }, []);


  const unreadCount =
    notificationList.filter(
      (notification) =>
        notification.unread
    ).length;


  function acknowledgeNotification(id) {

    /*
     * Update the central notification service.
     */
    acknowledgeServiceNotification(id);

  }


  function viewIncident(notification) {

    acknowledgeNotification(
      notification.id
    );


    onClose();


    if (!notification.incidentId) {
      return;
    }


    navigate(
      `/incidents?incident=${encodeURIComponent(
        notification.incidentId
      )}`
    );
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

        {notificationList.length === 0 ? (

          <div className="notification-empty">

            <Info size={20} />

            <strong>
              No notifications
            </strong>

            <span>
              System alerts will appear here.
            </span>

          </div>

        ) : (

          notificationList.map(
            (notification) => (

              <div
                key={notification.id}
                className={`notification-item notification-${notification.type} ${
                  notification.unread
                    ? "notification-item-unread"
                    : ""
                }`}
              >

                <div className="notification-icon">

                  {getNotificationIcon(
                    notification.type
                  )}

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

                    {notification.incidentId && (

                      <button
                        className="notification-view-button"
                        onClick={() =>
                          viewIncident(
                            notification
                          )
                        }
                      >

                        <ArrowUpRight size={13} />

                        View Incident

                      </button>

                    )}


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

            )
          )

        )}

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