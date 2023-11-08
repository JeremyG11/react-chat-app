import { useState } from "react";
import { Link } from "react-router-dom";
import { VscAzure } from "react-icons/vsc";

import { useUserStore } from "../hooks/auth";
import { UserAvatarDropdown } from "./auth/UserAvatarDropdown";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [state, setState] = useState(false);

  const { user } = useUserStore();

  return (
    <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link to="/" className="block text-teal-600">
            <span className="sr-only">Home</span>
            <VscAzure className="text-3xl" />
          </Link>
          <div className="md:hidden">
            <button
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-8 md:flex md:space-x-10 md:space-y-0">
            <li className="text-gray-700 hover:text-indigo-600">
              <Link to="/" className="block">
                Home
              </Link>
            </li>
            <li className="text-gray-700 hover:text-indigo-600">
              <Link to="/" className="block">
                Home
              </Link>
            </li>
            <li className="text-gray-700 hover:text-indigo-600">
              <Link to="/" className="block">
                Home
              </Link>
            </li>
            <li className="text-gray-700 hover:text-indigo-600">
              <div className="flex md:hidden">
                <Link
                  className="w-full text-center rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                  to="/login"
                >
                  login
                </Link>
              </div>
            </li>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              <div className="relative">
                {user ? (
                  <button
                    onClick={() => setToggle(!toggle)}
                    className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                    type="button"
                  >
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

                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      // aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                    {toggle ? <UserAvatarDropdown /> : null}
                  </button>
                ) : (
                  <div className="hidden sm:flex">
                    <Link
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                      to="/login"
                    >
                      login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
