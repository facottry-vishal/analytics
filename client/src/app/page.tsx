"use client"
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import logo_2 from "@/assets/logo_2.svg";
import logo_dark_2 from "@/assets/logo_dark_2.svg";
import { Button } from "@/components/ui/button";
import { userStore } from "@/lib/store";
import React from "react";
import { FlipWords } from "@/components/aceternity/flip-words";
import { Spotlight } from "@/components/aceternity/spotlight";
import { HoverBorderGradient } from "@/components/aceternity/hover-border-gradient";
import heroImageDark from "@/assets/hero-dark@90.dba36cdf.jpg";
import heroImageLight from "@/assets/hero@75.b2469a49.jpg";

export default function Home() {
  const [user] = userStore((state) => [state.user]);
  const words = ["Analyze", "Monitor", "Optimize", "Scale"];

  return (
    <div className="relative dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
      <Image src={heroImageDark} alt="heroDark" className="absolute h-screen inset-0 z-0 opacity-70 blur-lg dark:block hidden" />
      <Image src={heroImageLight} alt="heroLight" className="absolute h-screen inset-0 z-0 opacity-80 blur-lg dark:hidden" />

      {/* Masking the background */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10" />

      <Spotlight
        className="-top-20 left-0 md:left-20 md:-top-20"
        fill="white"
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen bg-inherit text-primary pt-5 px-8  max-w-7xl m-auto">
        <nav className="flex justify-between items-center">
          <Link href='/' className="flex gap-2 items-center">
            <Image
              src={logo_2}
              alt="FacOTTry"
              width={50}
              height={50}
              className="dark:hidden"
            />
            <Image
              src={logo_dark_2}
              alt="FacOTTry"
              width={50}
              height={50}
              className="hidden dark:block"
            />
            <p className="font-extrabold text-2xl">
              Fac<span className="">OTT</span>ry
            </p>
          </Link>
          <ul className="flex gap-2">
            <ModeToggle />

            {user ? (
              <div className="flex gap-2">
                <Button>
                  <Link href="/dashboard/home">Dashboard</Link>
                </Button>
                <Button variant={"outline"}>
                  <Link href="/auth/logout">Logout</Link>
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button>
                  <Link href="/auth/login">Login</Link>
                </Button>
              </div>
            )}
          </ul>
        </nav>

        {/* Hero */}
        <section className="">
          <div className="h-[40rem] w-full bg-inherit flex flex-col items-center justify-center overflow-hidden rounded-md">
            <div className="text-4xl sm:text-5xl md:text-7xl xl:text-[6rem] font-bold mx-auto text-zinc-600 dark:text-zinc-400 flex flex-col justify-self-center mb-10 items-center">
              <div><FlipWords words={words} /> your app</div>
              <div>with FacOTTry</div>
            </div>

            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 xl:text-lg font-semibold"
              onClick={() => console.log("Get Started")}
            >
              <span>Get Started</span>
            </HoverBorderGradient>
          </div>
        </section>
      </div>
    </div>
  );
}