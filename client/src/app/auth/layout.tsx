'use client'
import Image from "next/image";
import heroImageDark from "@/assets/hero-dark@90.dba36cdf.jpg";
import heroImageLight from "@/assets/hero@75.b2469a49.jpg";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative">
            <Image src={heroImageDark} alt="heroDark" className="absolute h-screen inset-0 z-0 opacity-70 blur-lg dark:block hidden" />
            <Image src={heroImageLight} alt="heroLight" className="absolute h-screen inset-0 z-0 opacity-80 blur-lg dark:hidden" />
            {children}
        </main>
    )
}
