import { useEffect, useRef, useState } from "react";

 
import { useUserStore } from "../hooks/auth";
import { Notification } from "./Notification";
import { navigation, navsFooter } from "./sidebarData";

const Profie = () => {
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
          <h2 className="text-xl px-4 md:pl-[168px]">Profile</h2>
        </div>
        <div className="flex items-center">
          {/* <button
            type="button"
            className="mr-3 relative inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-full"
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

            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs p-1 font-bold text-white bg-red-500 rounded-full top-2 right-2 ">
              7
            </div>
          </button> */}
          <Notification/>

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
        } transform transition-transform duration-300 ease-in-out md:w-56 `}
      >
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-8">Profie</div>
          <div className="flex-1 flex flex-col h-full overflow-auto">
            <ul className="px-4 text-sm font-medium flex-1 flex flex-col space-y-3">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                  >
                    <div className="text-gray-500">{item.icon}</div>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <ul className="px-4 pb-4 text-sm font-medium">
                {navsFooter.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                    >
                      <div className="text-gray-500">{item.icon}</div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div className="h-screen">
        <div className="h-56 w-full bg-blue-400 rounded-b-xl md:rounded-none"></div>
        <div className="relative -top-16 md:top-0 md:px-14 md:pl-64 h-full ">
          <div className=" relative -top-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <div className="relative bg-white rounded-t-3xl md:rounded md:bg-gray-200">
              <div className="rounded-full relative w-24 h-24 md:w-28 md:h-28 mx-auto -top-14 ">
                <img
                  className="w-full h-full rounded-full"
                  src={
                    user?.imageUrl ||
                    "https://t3.ftcdn.net/jpg/03/58/90/78/240_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
                  }
                  alt="Avatar"
                />
                <button className="bottom-1 right-0 absolute  w-7 h-7 p-1 border-2 border-white bg-blue-500 rounded-full flex items-center justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-4 py-2 flex flex-col items-center justify-center relative -top-14">
                <h5 className="text-lg mb-1 text-gray-700 ">Gatwech Nguth</h5>
                <span className="text-xs tracking-widest font-light uppercase text-gray-500">
                  UI Designer
                </span>
              </div>
            </div>
            <div className="h-32 rounded bg-gray-200 md:col-span-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profie;
