// components/Stats.jsx
import React, { useEffect, useRef, useState } from "react";

const Stats = () => {
  const [counters, setCounters] = useState({
    clients: 0,
    years: 0,
    retention: 0,
    countries: 0,
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const targetValues = {
          clients: 100,
          years: 10,
          retention: 99,
          countries: 8,
        };

        const duration = 2000;
        const steps = 60;
        const increment = {
          clients: targetValues.clients / steps,
          years: targetValues.years / steps,
          retention: targetValues.retention / steps,
          countries: targetValues.countries / steps,
        };

        let step = 0;
        const timer = setInterval(() => {
          step++;
          setCounters({
            clients: Math.min(Math.floor(increment.clients * step), targetValues.clients),
            years: Math.min(Math.floor(increment.years * step), targetValues.years),
            retention: Math.min(Math.floor(increment.retention * step), targetValues.retention),
            countries: Math.min(Math.floor(increment.countries * step), targetValues.countries),
          });

          if (step >= steps) clearInterval(timer);
        }, duration / steps);

        return () => clearInterval(timer);
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: counters.clients, suffix: "+", label: "Enterprise Clients", desc: "Served globally" },
    { value: counters.years, suffix: "+", label: "Years Experience", desc: "Digital transformation" },
    { value: counters.retention, suffix: "%", label: "Client Retention", desc: "Long-term partnerships" },
    { value: counters.countries, suffix: "+", label: "Countries Served", desc: "Worldwide presence" },
  ];

  const companies = [
    {
      name: "Microsoft",
      bg: "bg-blue-500/15",
      text: "text-blue-300",
      ring: "hover:ring-blue-400/40",
    },
    {
      name: "AWS",
      bg: "bg-orange-500/15",
      text: "text-orange-300",
      ring: "hover:ring-orange-400/40",
    },
    {
      name: "Google Cloud",
      bg: "bg-sky-500/15",
      text: "text-sky-300",
      ring: "hover:ring-sky-400/40",
    },
    {
      name: "Salesforce",
      bg: "bg-cyan-500/15",
      text: "text-cyan-300",
      ring: "hover:ring-cyan-400/40",
    },
    {
      name: "Oracle",
      bg: "bg-red-500/15",
      text: "text-red-300",
      ring: "hover:ring-red-400/40",
    },
    {
      name: "IBM",
      bg: "bg-indigo-500/15",
      text: "text-indigo-300",
      ring: "hover:ring-indigo-400/40",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #1e5a8e, #4dd6d5)",
      }}
    >
      {/* Decorative Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* ================= COUNTER SECTION ================= */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Proven Impact. Measurable Results.
          </h2>
          <p style={{ color: "#d2f3f3" }} className="max-w-3xl mx-auto text-lg">
            Our success is defined by long-term partnerships, global reach, and consistent delivery excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur rounded-2xl p-8 text-center
              border border-white/20 hover:border-white/40
              transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-4xl lg:text-5xl font-extrabold text-white mb-3">
                {stat.value}
                <span style={{ color: "#b6ecec" }}>{stat.suffix}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </h3>
              <p style={{ color: "#d2f3f3" }} className="text-sm">{stat.desc}</p>

              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Stats;
