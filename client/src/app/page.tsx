"use client"
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ToggleTheme";
import logo from "@/assets/logo_1.svg";
import logo_dark from "@/assets/logo_dark_1.svg";
import { Button } from "@/components/ui/button";
import { userStore } from "@/lib/store";
import React from "react";
import { FlipWords } from "@/components/aceternity/flip-words";

export default function Home() {
  const [user] = userStore((state) => [state.user]);
  const words = ["Scale", "Optimize", "Automate", "Monitor", "Analyze"];

  return (
    <div className="relative dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
      {/* Masking the background */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-0" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen bg-inherit text-primary pt-5 px-8 dark:text-white max-w-7xl m-auto">
        <nav className="flex justify-between items-center">
          <div>
            <Image src={logo} className="dark:hidden" alt="Facottry Logo" width={100} height={100} />
            <Image src={logo_dark} className="hidden dark:block" alt="Facottry Logo" width={100} height={100} />
          </div>
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
            <div className="text-7xl font-bold mx-auto text-neutral-600 dark:text-neutral-400 flex flex-col justify-center mb-10 items-center">
              <div><FlipWords words={words} /> your app</div>
              <div>with FacOTTry</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}