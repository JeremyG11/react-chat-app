import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { socket } from "../socket";
import { Notification } from "../types";

export const NotificationList = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const ref = useRef<HTMLButtonElement>(null!);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Receive notifications from the server
    socket.emit("notifications");
    socket.on("notification response", (data) => {
      console.log("Emit notification", data);
      setNotifications([...notifications, data]);
    });

    console.log("rendered");
    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [notifications]);

  const handleNotificationClick = (notification: Notification) => {
    // Handle notification click (mark it as seen, open a modal, etc.)
    // Emit an acknowledgment back to the server
    socket.emit("notification-acknowledgment", notification);
  };

  useEffect(() => {
    const handleDropDown = (e: MouseEvent) => {
      if (ref?.current && !ref?.current.contains(e.target as Node)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleDropDown);
  }, [ref]);

  return (
    <div className="relative border-t lg:border-none">
      <div className="">
        <button
          ref={ref}
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          type="button"
          className="mr-8 relative inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 p-1.5 bg-gray-50 rounded-full text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>

          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs p-1 font-bold text-white bg-red-500 rounded-full top-2 right-2 ">
            {notifications.length}
          </div>
        </button>
      </div>
      <div
        className={`z-50 bg-white max-w-sm w-72 top-14 -right-10 mt-1 space-y-0 absolute rounded shadow-2xl lg:space-y-0 ${
          isDropdownVisible ? "" : "hidden"
        }`}
      >
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
          Notifications
        </div>
        {notifications.map((item, idx) => (
          <Link
            key={idx}
            to="#"
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww"
                alt="Jese image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                <svg
                  className="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                  <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                New message from{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Jese Leos
                </span>
                : "Hey, what's up? All set for the presentation?"
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">
                a few moments ago
              </div>
            </div>
          </Link>
        ))}
        <Link
          to="#"
          className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
        >
          <div className="inline-flex items-center ">
            <svg
              className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View all
          </div>
        </Link>
      </div>
    </div>
  );
};
