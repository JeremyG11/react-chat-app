import { z } from "zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { VscAzure } from "react-icons/vsc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { authLogin } from "../../utils/authInstance";
import getGoogleOAuthURL from "../../utils/google-auth";
import { ZodLoginSchema, loginSchema } from "../../utils/schemas/loginSchema";
import { useUserStore } from "../../hooks/auth";

export default function Login() {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { user } = useUserStore();
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ZodLoginSchema>({ resolver: zodResolver(loginSchema) });

  //  Onsubmit handler
  const onSubmit = async (data: ZodLoginSchema) => {
    try {
      const user = await authLogin(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/user/email-password/login`,
        data
      );
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    user && navigate(from, { replace: true });
  }, [navigate, from, user]);
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-4">
          <VscAzure className="mx-auto text-transparent bg-gradient-to-br from-emerald-600 bg-clip-text text-clip text-3xl" />

          <div className="mt-4">
            <h3 className="text-gray-800 text-transparent text-3xl bg-clip-text bg-gradient-to-r from-rose-400 via-orange-500 to-violet-700 font-bold sm:text-3xl">
              Login
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              autoFocus
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-emerald-600 rounded-lg ring-emerald-600 focus:ring-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm py-2 font-normal">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-medium peer-active:text-emerald-500">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full mt-2 px-3 py-2 peer text-gray-500 bg-transparent outline-none border focus:border-emerald-600 rounded-lg ring-emerald-600 focus:ring-1 duration-150"
            />
            {errors.password && (
              <p className="text-red-500 text-sm py-2 font-normal">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                {...register("checkbox")}
                id="remember-me-checkbox"
                className="checkbox-item peer hidden"
              />
              <label
                htmlFor="remember-me-checkbox"
                className="relative flex w-5 h-5 bg-white peer-checked:bg-emerald-600 rounded-md border ring-offset-2 ring-emerald-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
              ></label>
              <span>Remember me</span>
            </div>
            <a
              href="#"
              className="text-center  text-emerald-600 hover:text-emerald-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            className={`w-full px-4 py-2 text-white font-medium bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600 rounded-lg duration-150 ${isLoading}`}
          >
            Login
          </button>
        </form>
        <a
          href={getGoogleOAuthURL()}
          className=" w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_17_40)">
              <path
                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                fill="#4285F4"
              />
              <path
                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                fill="#34A853"
              />
              <path
                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                fill="#FBBC04"
              />
              <path
                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Continue with Google
        </a>
        <p className="text-center text-sm">
          Don't have an account?
          <Link
            to="#"
            className="mx-2 font-medium text-sm text-emerald-600 hover:text-emerald-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
