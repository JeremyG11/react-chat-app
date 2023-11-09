import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useUserStore } from "../hooks/auth";

export default function Home() {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated]);

  return (
    <section className="relative top-0 h-screen overflow-hidden bg-[url(https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80)] bg-cover bg-top bg-no-repeat">
      <div className="bg-black/60 h-full p-8 md:p-12 lg:px-16 lg:py-24 flex justify-center">
        <div className=" w-7/12 ">
          <h2 className="text-gray-800 text-transparent sm:text-3xl xl:text-5xl p-5 bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500 font-bold sm:te">
            Welcome! Hang Out With Collegues. In Realtime Of course
          </h2>

          <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
            officia corporis quasi doloribus iure architecto quae voluptatum
            beatae excepturi dolores.
          </p>

          <div className="mt-4 sm:mt-8">
            <a
              href="#"
              className="inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Yours Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
