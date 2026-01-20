// pages/Home.jsx
import React, { useRef } from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Industries from "../components/Industries";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Navigator from "../views/Navigator";

const Home = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const whyRef = useRef(null);
  const industriesRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  return (
    <>
      <Navigator
        sections={{
          Banners: heroRef,
          Services: servicesRef,
          "Why Us": whyRef,
          Industries: industriesRef,
          Stats: statsRef,
          Testimonials: testimonialsRef,
          "Contact Us": ctaRef,
        }}
      />

      <section ref={heroRef}><Hero /></section>
      <section ref={servicesRef}><Services /></section>
      <section ref={whyRef}><WhyChooseUs /></section>
      <section ref={industriesRef}><Industries /></section>
      <section ref={statsRef}><Stats /></section>
      <section ref={testimonialsRef}><Testimonials /></section>
      <section ref={ctaRef}><CTA /></section>
    </>
  );
};

export default Home;
