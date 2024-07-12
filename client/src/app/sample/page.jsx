"use client";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar";
import Pricing from "../../components/Pricing";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";

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
