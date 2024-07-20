"use client"
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ToggleTheme";
import logo from "@/assets/logo_1.svg";
import logo_dark from "@/assets/logo_dark_1.svg";
import { Button } from "@/components/ui/button";
import { userStore } from "@/lib/store";

export default function Home() {
  const [user] = userStore((state) => [state.user]);
  console.log(user);

  return (
    <div className="min-h-screen bg-background text-primary pt-5 px-8 dark:text-white max-w-7xl m-auto">
      <nav className="flex justify-between items-center">
        <div className="">
          <Image src={logo} className="dark:hidden" alt="Facottry Logo" width={100} height={100} />
          <Image src={logo_dark} className="hidden dark:block" alt="Facottry Logo" width={100} height={100} />
        </div>
        <ul className="flex gap-2">
          <ModeToggle />

          {user ? (
            <div className="flex gap-2">
              <Button>
                <Link href="/dashboard/home">
                  Dashboard
                </Link>
              </Button>
              <Button variant={"outline"}>
                <Link href="/auth/logout">
                  Logout
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button >
                <Link href="/auth/login" >
                  Login
                </Link>
              </Button>
            </div>
          )
          }
        </ul>
      </nav>

    </div>
  );
}