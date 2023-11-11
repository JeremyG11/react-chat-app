import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { socket } from "../socket";
import { ActiveUser } from "../types";
import { useUserStore } from "../hooks/auth";
import ChatUsersList from "./Chat/ChatUsersList";

interface UserProfileInfoProps {
  activeUsers: ActiveUser[];
}
export default function UserProfileInfo({ activeUsers }: UserProfileInfoProps) {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, activeUsers, socket]);
  return (
    <div className="h-screen">
      <div className="max-h-56 overflow-hidden w-full bg-red-400 rounded-b-xl md:rounded-none">
        <img
          src="https://images.unsplash.com/photo-1698598359362-84e6e1df57ad?auto=format&fit=crop&q=80&w=1632&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="overflow-hidden"
          height="224px"
          object-fit="true"
        />
      </div>
      <div className="relative -top-16 md:top-0 md:px-14 md:pl-72 h-full ">
        <div className=" relative -top-14 grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-3 md:gap-8">
          <div className="hidden relative bg-white rounded-t-3xl shadow md:block md:col-span-4 lg:col-span-1 md:rounded ">
            <div className="rounded-full relative w-24 h-24 xl:w-28 xl:h-28 mx-auto -top-14 ">
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
          <div className="p-4 md:p-0 lg:p-6 col-span-4 lg:col-span-2 rounded-t-3xl overflow-hidden md:rounded bg-gray-700 md:bg-white lg:shadow">
            <div className="lg:px-4">
              <h2 className="text-lg font-medium pb-4 text-gray-500">
                Acitve Friends
              </h2>
              <div className="relative py-1 rounded-full w-full lg:w-[482px] inline-flex items-center space-x-4 overflow-hidden ">
                <button
                  type="button"
                  className="flex flex-shrink-0 items-center justify-center text-white border-2 border-dashed border-blue-700 rounded-full w-12 h-12 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-5 h-5 text-blue-500 transition-transform group-hover:rotate-45"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
                {activeUsers
                  .filter((data) => data.user.id !== user?.id)
                  .map((data) => {
                    return (
                      <button
                        onClick={() =>
                          navigate(`/profile/chat/${data.user.id} `)
                        }
                        key={data.user.id}
                        className="relative flex-shrink-0 inline-flex cursor-pointer"
                      >
                        <img
                          className="w-10 h-10  ring-4 ring-gradient-br from-teal-500 to-emerald-900  rounded-full"
                          src={data.user.imageUrl}
                          alt=""
                        />
                        <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                      </button>
                    );
                  })}
                {activeUsers.length > 8 && (
                  <span className="absolute right-[3px] bg-tranparent">
                    <Link
                      className="flex items-center justify-center w-11  h-11 ring-4 ring-blue-500 font-medium bg-white rounded-full "
                      to="#"
                    >
                      +{activeUsers.length - 8}
                    </Link>
                  </span>
                )}
              </div>
            </div>
            <div className="my-2 lg:px-4">
              <ChatUsersList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
