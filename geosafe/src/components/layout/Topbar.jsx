import { useState } from "react";

import {
  Search,
  Bell,
  ChevronDown,
  Clock3,
} from "lucide-react";

import NotificationPanel from "./NotificationPanel";


function Topbar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);


  return (
    <header className="topbar">

      <div className="topbar-left">
        <div className="breadcrumb">
          <span>COMMAND CENTER</span>
          <span className="breadcrumb-operator">/</span>
          <strong>Overview</strong>
        </div>
      </div>


      <div className="topbar-right">

        <div className="live-clock">
          <Clock3 size={15} />

          <span>10 SEP 2026</span>

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
              notificationsOpen ? "notification-active" : ""
            }`}
            onClick={() =>
              setNotificationsOpen(!notificationsOpen)
            }
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell size={18} />

            <span className="notification-badge">
              4
            </span>
          </button>


          {notificationsOpen && (
            <NotificationPanel
              onClose={() => setNotificationsOpen(false)}
            />
          )}

        </div>


        <div className="topbar-user">

          <div className="user-details">
            <strong>District Authority</strong>

            <span>Administrator</span>
          </div>

          <ChevronDown size={16} />

        </div>

      </div>

    </header>
  );
}


export default Topbar;