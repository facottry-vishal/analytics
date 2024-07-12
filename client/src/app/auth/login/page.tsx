"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo_1_dark from "@/assets/logo_dark_1.svg";
import logo_1 from "@/assets/logo_1.svg";
import GoogleIcon from "@/assets/Google.svg";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { axios_analytics } from "@/lib/axios";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const isAuth = async () => {
      try {
        await axios_analytics.get("/");
        router.push("/dashboard/home");
      } catch (error) {
        console.log(error);
      }
    };

    isAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios_analytics.post("/login", {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        remember_me: e.currentTarget.remember_me.checked,
      });
      setIsLoading(false);

      router.push("/dashboard");
    } catch (error: any) {
      alert(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen bg-white">
      {/* Logo */}
      <Link href="/">
        <Image
          src={logo_1}
          priority={true}
          alt="logo"
          width={100}
          height={100}
        />
        <Image
          src={logo_1_dark}
          alt="logo"
          className="hidden"
          width={100}
          height={100}
          priority={true}
        />
      </Link>

      {/* Login Form */}
      <div className="w-full bg-white shadow-lg border rounded-lg md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="example@gmail.com"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />

              <div
                onClick={() => {
                  setIsPasswordVisible((prevState) => !prevState);
                }}
                className="cursor-pointer absolute right-3 bottom-2 text-slate-400"
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible fontSize="1.4rem" />
                ) : (
                  <AiOutlineEye fontSize="1.4rem" />
                )}
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mb-4">
              <input
                defaultChecked
                type="checkbox"
                id="remember_me"
                name="remember_me"
                className="text-primary-600 border-gray-300 focus:ring-primary-600 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="mb-4 w-full bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
            >
              Sign in
            </button>

            <Link
              href={process.env.NEXT_PUBLIC_AUTH_BASE_URL + "/google"}
              type="button"
              className="flex items-center justify-center mb-4 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border transition-all hover:bg-slate-100"
            >
              <Image
                src={GoogleIcon}
                alt="google icon"
                width={20}
                height={20}
                className="inline-block mr-2"
              />
              <p className="text-black">Continue with Google</p>
            </Link>

            <p className="mb-2 text-sm text-gray-500">
              Forgot Password?{" "}
              <Link
                href="/auth/forgot-password"
                className="font-semibold text-primary-600 hover:underline"
              >
                Reset
              </Link>
            </p>

            <p className="text-sm text-gray-500">
              Don’t have an account yet?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-primary-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Loader Icon */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-20">
          <div className="flex items-center justify-center p-8 w-72 h-72">
            <svg
              className="animate-spin h-14 w-14 text-primary-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
