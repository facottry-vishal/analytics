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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { userStore } from "@/lib/store";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { toast } = useToast();
  const [user] = userStore(state => [state.user]);

  if(user){
    router.push("/dashboard/home");
  }

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

      toast({
        title: "Login Successful!",
        description: "Welcome to FacOTTry Analytics.",
      })
      router.push("/dashboard/home");
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      setIsLoading(false);
    }
  };

  return (
    <div className="dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex flex-col items-center justify-center px-6 mx-auto h-screen">

      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-0" />

      {/* Logo */}
      <Link className="z-10" href="/">
        <Image
          src={logo_1}
          priority={true}
          alt="logo"
          width={100}
          height={100}
          className="dark:hidden"
        />
        <Image
          src={logo_1_dark}
          alt="logo"
          className="hidden dark:block"
          width={100}
          height={100}
          priority={true}
        />
      </Link>

      <div className="w-full z-10 bg-background shadow-lg border rounded-lg md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium"
              >
                Email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
              />

              <div
                onClick={() => {
                  setIsPasswordVisible((prevState) => !prevState);
                }}
                className="cursor-pointer absolute right-3 bottom-2"
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
                type="checkbox"
                defaultChecked
                id="remember_me"
                name="remember_me"
                className="border accent-black focus:ring-primary cursor-pointer"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              className="w-full mb-3"
            >
              Sign in
            </Button>

            <Button variant={"outline"} className="w-full mb-4">
              <Link
                href={process.env.NEXT_PUBLIC_AUTH_BASE_URL + "/google"}
                type="button"
                className="flex"
              >
                <Image
                  src={GoogleIcon}
                  alt="google icon"
                  width={20}
                  height={20}
                  className="inline-block mr-2"
                />
                <p>Continue with Google</p>
              </Link>
            </Button>
          </form>
        </div>
      </div>

      {/* Loader Icon */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black/40">
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
