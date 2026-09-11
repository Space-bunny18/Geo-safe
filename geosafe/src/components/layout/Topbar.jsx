import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  ChevronDown,
  Clock3,
} from "lucide-react";

import NotificationPanel from "./NotificationPanel";
import AlertToast from "./AlertToast";

import {
  subscribeToNotifications,
} from "../../services/notificationService";


function Topbar() {
  const navigate = useNavigate();


  const [notificationsOpen, setNotificationsOpen] =
    useState(false);


  const [alertToast, setAlertToast] =
    useState(null);


  /*
   * Keep the notification list locally so the
   * notification badge can display the real
   * unread count.
   */
  const [notificationList, setNotificationList] =
    useState([]);


  /*
   * Subscribe to the central GeoSafe notification
   * service.
   *
   * The service sends:
   *
   * 1. An array when the component subscribes
   *    or notification state changes.
   *
   * 2. A single notification when a new alert
   *    arrives.
   */
  useEffect(() => {

    const handleNotification =
      (notificationData) => {

        /*
         * Initial notification history or an
         * updated notification history.
         */
        if (Array.isArray(notificationData)) {

          setNotificationList(
            notificationData
          );

          return;
        }


        /*
         * A new notification has arrived.
         *
         * Add it to the local notification list.
         */
        setNotificationList(
          (current) => {

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

          }
        );


        /*
         * Show the new notification as
         * a real-time toast.
         */
        setAlertToast({
          ...notificationData,
        });

      };


    const unsubscribe =
      subscribeToNotifications(
        handleNotification
      );


    return () => {
      unsubscribe();
    };

  }, []);


  /*
   * Calculate the current unread notification
   * count from the notification service state.
   */
  const unreadCount =
    notificationList.filter(
      (notification) =>
        notification.unread
    ).length;


  function handleCloseToast() {
    setAlertToast(null);
  }


  function handleViewIncident(notification) {

    setAlertToast(null);

    setNotificationsOpen(false);


    if (!notification?.incidentId) {
      return;
    }


    /*
     * Keep navigation inside React Router.
     */
    navigate(
      `/incidents?incident=${encodeURIComponent(
        notification.incidentId
      )}`
    );

  }


  return (
    <header className="topbar">

      <div className="topbar-left">

        <div className="breadcrumb">

          <span>
            COMMAND CENTER
          </span>

          <span className="breadcrumb-operator">
            /
          </span>

          <strong>
            Overview
          </strong>

        </div>

      </div>


      <div className="topbar-right">

        <div className="live-clock">

          <Clock3 size={15} />

          <span>
            10 SEP 2026
          </span>

          <span className="clock-time">
            20:48 IST
          </span>

        </div>


        <div className="topbar-divider" />


        <button
          className="topbar-icon-button"
          aria-label="Search"
        >
          <Search size={18} />
        </button>


        <div className="notification-wrapper">

          <button
            className={`topbar-icon-button notification-button ${
              notificationsOpen
                ? "notification-active"
                : ""
            }`}
            onClick={() =>
              setNotificationsOpen(
                !notificationsOpen
              )
            }
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >

            <Bell size={18} />


            {/* DYNAMIC UNREAD BADGE */}

            {unreadCount > 0 && (

              <span className="notification-badge">

                {unreadCount > 99
                  ? "99+"
                  : unreadCount}

              </span>

            )}

          </button>


          {notificationsOpen && (

            <NotificationPanel
              onClose={() =>
                setNotificationsOpen(false)
              }
            />

          )}

        </div>


        <div className="topbar-user">

          <div className="user-details">

            <strong>
              District Authority
            </strong>

            <span>
              Administrator
            </span>

          </div>

          <ChevronDown size={16} />

        </div>

      </div>


      {/* REAL-TIME ALERT TOAST */}

      {alertToast && (

        <AlertToast
          notification={alertToast}
          onClose={handleCloseToast}
          onViewIncident={
            handleViewIncident
          }
        />

      )}

    </header>
  );
}


export default Topbar;