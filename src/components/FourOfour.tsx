import React from "react";
import { Link } from "react-router-dom";

export default function FourOfour() {
  return (
    <div className="relative">
      <div className="bg-fourOfour grid h-screen w-full">
        <div className="relative text-center bg-black opacity-80 w-full h-full px-96 py-20">
          <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-500 to-violet-700  text-9xl tracking-wider">
            404
          </h1>

          <p className="text-2xl font-semibold tracking-wider text-gray-50 sm:text-4xl">
            Uh Oops sorry!
          </p>

          <p className="mt-4 text-gray-50">We can't find that page.</p>

          <Link
            to="/"
            className="inline-block px-10 z-10 py-3 mt-6 text-sm font-medium cursor-pointer text-white bg-emerald-600 rounded-full hover:bg-emerald-800 focus:outline-none focus:ring"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
