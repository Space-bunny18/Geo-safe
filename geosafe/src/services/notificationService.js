// GeoSafe Notification Service
// Frontend-only notification event system.
// Later this can be connected directly to the FastAPI WebSocket.


import {
  notifications as initialNotifications,
} from "../data/notifications";


const listeners = new Set();

const NOTIFICATION_EVENT =
  "geosafe:notification";


/*
 * Keep the original notifications inside the
 * central notification service as the initial state.
 */
let notificationHistory = [
  ...initialNotifications,
];


/**
 * Subscribe to GeoSafe notification events.
 *
 * The current notification history is immediately
 * sent to the newly connected listener.
 *
 * New notifications are also delivered through
 * the browser-level GeoSafe event channel.
 *
 * Returns an unsubscribe function.
 */
export function subscribeToNotifications(
  listener
) {
  listeners.add(listener);

  /*
   * Send the current notification history
   * immediately when a component subscribes.
   */
  listener([
    ...notificationHistory,
  ]);


  /*
   * Listen to browser-level notification events.
   *
   * This keeps the event connection reliable even
   * during Vite development / module hot replacement.
   */
  const handleBrowserNotification =
    (event) => {

      if (!event?.detail) {
        return;
      }

      listener(event.detail);

    };


  window.addEventListener(
    NOTIFICATION_EVENT,
    handleBrowserNotification
  );


  return () => {

    listeners.delete(listener);

    window.removeEventListener(
      NOTIFICATION_EVENT,
      handleBrowserNotification
    );

  };
}


/**
 * Get currently stored notifications.
 */
export function getNotifications() {
  return [
    ...notificationHistory,
  ];
}


/**
 * Add a new notification event.
 *
 * Later, the WebSocket integration can call
 * this same function when the backend sends
 * a real-time alert.
 */
export function pushNotification(
  notification
) {

  const newNotification = {

    id:
      notification.id ||
      `NT-${Date.now()}`,

    type:
      notification.type ||
      "info",

    title:
      notification.title ||
      "GeoSafe Update",

    message:
      notification.message ||
      "",

    time:
      notification.time ||
      "Just now",

    unread:
      notification.unread !== false,

    incidentId:
      notification.incidentId ||
      null,

    createdAt:
      notification.createdAt ||
      new Date().toISOString(),

  };


  /*
   * Store the new notification.
   */
  notificationHistory = [
    newNotification,
    ...notificationHistory,
  ];


  /*
   * Notify subscribers registered in this
   * notification service instance.
   */
  listeners.forEach(
    (listener) => {
      listener(newNotification);
    }
  );


  /*
   * Also dispatch a browser-level event.
   *
   * Topbar listens to this event through the
   * subscription system above.
   *
   * This gives us a reliable event channel for
   * real-time frontend notifications.
   */
  window.dispatchEvent(
    new CustomEvent(
      NOTIFICATION_EVENT,
      {
        detail: newNotification,
      }
    )
  );


  return newNotification;
}


/**
 * Mark a notification as acknowledged/read.
 */
export function acknowledgeNotification(
  id
) {

  notificationHistory =
    notificationHistory.map(
      (notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
    );


  /*
   * Send the updated notification history
   * to all service subscribers.
   */
  listeners.forEach(
    (listener) => {
      listener([
        ...notificationHistory,
      ]);
    }
  );

}
export function markAllNotificationsAsRead() {
  notificationHistory =
    notificationHistory.map(
      (notification) => ({
        ...notification,
        unread: false,
      })
    );

  listeners.forEach(
    (listener) => {
      listener([
        ...notificationHistory,
      ]);
    }
  );
}

/**
 * Remove all stored notification history.
 */
export function clearNotifications() {

  notificationHistory = [];


  listeners.forEach(
    (listener) => {
      listener([]);
    }
  );

}