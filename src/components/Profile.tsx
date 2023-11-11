import { VscAzure } from "react-icons/vsc";
import { ImCommand } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useUserStore } from "../hooks/auth";
import { NotificationList } from "./Notification";
import { sidebarLink, navsFooter, Menu, nestedLink } from "./sidebarData";

const Profie = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent) => {
      if (!sidebarRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleBackdropClick);

    return () => {
      document.removeEventListener("mousedown", handleBackdropClick);
    };
  }, []);
  return (
    <section className="">
      <nav
        className={`px-4 ${
          isOpen ? "pointer-events-none" : ""
        } flex justify-between items-center md:px-14`}
      >
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block rounded p-2 bg-gray-50  text-gray-600 transition hover:text-gray-600/75 md:invisible"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>{" "}
          </button>
          <h2 className="hidden text-lg md:px-4 md:block text-gray-500 md:pl-[168px]">
            <span className="font-bold">Welcome!</span>{" "}
            <span>{user?.name.split(" ")[0]}</span>
          </h2>
        </div>
        <div className="flex relative items-center">
          <NotificationList />

          <div className="rounded-full">
            {user?.imageUrl ? (
              <img
                className="w-8 h-8 p-0.5 rounded-full ring-1 ring-emerald-300"
                src={user?.imageUrl}
                alt="Avatar"
              />
            ) : (
              <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-10 h-10 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </nav>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full border-r z-30 bg-white space-y-8 w-9/12 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transform transition-transform duration-300 ease-in-out md:w-64`}
      >
        <div className="flex flex-col h-full">
          <div className="h-20 w-20  p-6 flex items-center justify-start">
            <VscAzure className="rounded !bg-gradient-to-br from-red-600 bg-clip-text text-clip text-3xl" />
          </div>
          <div className="flex-1 flex flex-col h-full overflow-auto">
            <ul className="px-4 flex-1 flex flex-col space-y-5">
              {sidebarLink.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-x-2 rounded-lg cursor-pointer font-medium hover:bg-gray-100 active:bg-gray-100 duration-150"
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-100 flex items-center justify-between w-full p-2  rounded-lg text-black"
                        : "bg-gray-100 flex w-full justify-between p-2 items-center rounded-lg text-gray-500 bg-transparent hover:bg-gray-50"
                    }
                  >
                    <div className="flex items-center">
                      <div className="">{item.icon}</div>
                      <p className="ml-2">{item.title}</p>
                    </div>

                    {item?.isMessages ? (
                      <p className="rounded px-1.5 h-5 text-center text-black bg-emerald-500 text-sm">
                        2
                      </p>
                    ) : null}
                    {item?.isSearch ? (
                      <kbd className="rounded px-1.5 h-6 flex items-center justify-center text-black bg-gray-200 text-sm">
                        <ImCommand className="text-xl text-gray-500" /> K
                      </kbd>
                    ) : null}
                  </NavLink>
                </li>
              ))}
              <li className="border-t py-2">
                <Menu items={nestedLink}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                    />
                  </svg>

                  <p className="font-medium">Other</p>
                </Menu>
              </li>
            </ul>
            <div>
              <ul className="px-4 pb-4 text-sm font-medium space-y-3">
                {navsFooter.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={item?.onclick}
                    className={`cursor-pointer rounded-lg  duration-150  ${
                      item?.onclick
                        ? "bg-black text-gray-200 hover:opacity-90"
                        : "active:bg-gray-100 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-x-2 p-2 duration-150">
                      <div>{item.icon}</div>
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
      {children}
    </section>
  );
};

export default Profie;
