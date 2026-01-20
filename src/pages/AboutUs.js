// pages/AboutUs.jsx
import React, { useEffect, useRef } from "react";
import {
  Award,
  Users,
  Globe,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Rocket,
  HeartHandshake,
} from "lucide-react";

const AboutUs = () => {
  const observerRefs = useRef([]);

  useEffect(() => {
    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-violet-50 to-white">
      {/* Background Blobs */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-400/30 rounded-full blur-3xl" />
      <div className="absolute top-32 -right-40 w-[460px] h-[460px] bg-pink-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 w-[560px] h-[560px] bg-violet-400/30 rounded-full blur-3xl" />

      <div className="container max-w-7xl mx-auto px-6 py-24 relative z-10">

        {/* ================= HERO ================= */}
        <div 
          data-animate="fade-up"
          className="text-center max-w-4xl mx-auto mb-24 opacity-0 translate-y-8 transition-all duration-700"
        >
          <span className="inline-flex px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold mb-6 shadow-lg animate-scale">
            About Sage IT
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Driving Digital Transformation with
            <span className="block bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Innovation & Integrity
            </span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Sage IT is a global technology consulting and services company
            helping enterprises accelerate innovation, optimize operations,
            and build future-ready digital platforms.
          </p>
        </div>

        {/* ================= COMPANY STATS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
          {[
            { icon: <Globe />, value: "40+", label: "Countries Served" },
            { icon: <Users />, value: "1000+", label: "Technology Experts" },
            { icon: <Briefcase />, value: "500+", label: "Enterprise Clients" },
            { icon: <Award />, value: "20+", label: "Years of Excellence" },
          ].map((stat, i) => (
            <div
              key={i}
              data-animate="fade-up"
              data-delay={i * 100}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center
              opacity-0 translate-y-8 transition-all duration-700 hover:-translate-y-2 hover:scale-105"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500
                flex items-center justify-center text-white mb-4 shadow-lg">
                {stat.icon}
              </div>
              <div className="text-3xl font-extrabold text-gray-900">
                {stat.value}
              </div>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ================= OUR STORY ================= */}
        <div className="grid lg:grid-cols-2 gap-16 mb-28 items-center">
          <div 
            data-animate="fade-left"
            className="opacity-0 -translate-x-8 transition-all duration-700"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded with a vision to bridge the gap between business and
              technology, Sage IT has evolved into a trusted digital partner
              for Fortune 500 companies and fast-growing enterprises.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We specialize in cloud transformation, data engineering, AI,
              cybersecurity, and enterprise modernization—delivering
              measurable business outcomes at scale.
            </p>
          </div>

          <div 
            data-animate="fade-right"
            className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600
            rounded-3xl p-10 text-white shadow-2xl opacity-0 translate-x-8 transition-all duration-700
            hover:scale-102"
          >
            <h3 className="text-2xl font-bold mb-4">
              Our Mission
            </h3>
            <p className="text-indigo-100 mb-6">
              Empower organizations with innovative, secure, and scalable
              digital solutions that drive long-term success.
            </p>
            <div className="flex items-center gap-3">
              <Rocket />
              <span className="font-semibold">
                Innovation that creates impact
              </span>
            </div>
          </div>
        </div>

        {/* ================= CORE VALUES ================= */}
        <div 
          data-animate="fade-up"
          className="mb-28 opacity-0 translate-y-8 transition-all duration-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck />,
                title: "Integrity",
                desc: "We act with honesty, transparency, and accountability.",
                gradient: "from-indigo-500 to-blue-500",
              },
              {
                icon: <TrendingUp />,
                title: "Excellence",
                desc: "We strive for continuous improvement and quality.",
                gradient: "from-emerald-500 to-green-500",
              },
              {
                icon: <Users />,
                title: "Collaboration",
                desc: "We believe in teamwork and shared success.",
                gradient: "from-orange-500 to-pink-500",
              },
              {
                icon: <HeartHandshake />,
                title: "Customer First",
                desc: "Our clients' success is our top priority.",
                gradient: "from-violet-500 to-purple-500",
              },
            ].map((value, i) => (
              <div
                key={i}
                data-animate="fade-up"
                data-delay={i * 150}
                className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100
                opacity-0 translate-y-8 transition-all duration-700 hover:-translate-y-3 hover:scale-105"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient}
                  flex items-center justify-center text-white mb-5 shadow-lg`}
                >
                  {value.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= WHY SAGE ================= */}
        <div 
          data-animate="scale"
          className="text-center rounded-3xl p-14 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 
          text-white shadow-2xl opacity-0 scale-95 transition-all duration-700 hover:scale-102"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Why Choose Sage IT?
          </h2>
          <p className="text-indigo-100 max-w-3xl mx-auto mb-10">
            We combine deep industry expertise, cutting-edge technology, and
            a customer-centric approach to deliver exceptional results.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Enterprise-grade solutions",
              "Global delivery model",
              "Agile & scalable teams",
              "Proven track record",
            ].map((item, i) => (
              <div
                key={i}
                data-animate="fade-up"
                data-delay={i * 100}
                className="bg-white/15 backdrop-blur rounded-xl p-4 font-semibold
                opacity-0 translate-y-4 transition-all duration-500 hover:scale-105"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: none !important;
        }
        
        .animate-scale {
          animation: scaleIn 0.6s ease-out;
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default AboutUs;