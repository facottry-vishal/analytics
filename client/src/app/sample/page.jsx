"use client";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Navbar from "@/Components/Navbar";
import Hero from "@/Components/Hero";
import Pricing from "@/Components/Pricing";
import Footer from "@/Components/Footer";

export default function Sample() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
    <Navbar/>
    <Hero/>
    <Pricing/>
    <Footer/>
    </>
  );
}
