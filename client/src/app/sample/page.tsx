"use client";
import { useState } from "react";
import Navbar from "@/components/sample/Navbar";
import Hero from "@/components/sample/Hero";
import Pricing from "@/components/sample/Pricing";
import Footer from "@/components/sample/Footer";

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
