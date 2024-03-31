import React from "react";
import Navbar from "./Sections/Navbar";
import HeroSection from "./Sections/HeroSection";
import ServicesBar from "./Sections/ServicesBar";
import AboutSection from "./Sections/AboutSection";
import ServicesSection from "./Sections/ServicesSection";
import ProcedureSection from "./Sections/ProcedureSection";
import VideoSection from "./Sections/VideoSection";
import CoachesSection from "./Sections/CoachesSection";
import TestimonialSection from "./Sections/TestimonialSection";
import PricingSection from "./Sections/PricingSection";
import ContactSection from "./Sections/ContactSection";
import Footer from "./Sections/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ServicesBar />
      <AboutSection />
      <ServicesSection />
      <ProcedureSection />
      <VideoSection />
      <CoachesSection />
      <TestimonialSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Home;
