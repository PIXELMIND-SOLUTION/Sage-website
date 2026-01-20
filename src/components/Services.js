// components/Services.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  Cloud,
  Cpu,
  GitMerge,
  Database,
  Shield,
  ArrowRight,
  X,
  Zap,
  TrendingUp,
} from "lucide-react";

const serviceBackgrounds = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  const services = [
    {
      icon: <Brain size={24} />,
      title: "AI & Machine Learning",
      shortDesc: "Enterprise AI solutions and automation",
      fullDesc:
        "Build intelligent systems with AI & ML. From predictive analytics to NLP, we help enterprises gain competitive advantage.",
      gradient: "from-indigo-500 to-violet-500",
      features: ["Predictive Analytics", "Computer Vision", "NLP", "MLOps"],
      stat: "+40% Efficiency",
    },
    {
      icon: <Cloud size={24} />,
      title: "Cloud Services",
      shortDesc: "Cloud migration and optimization",
      fullDesc:
        "End-to-end cloud solutions including migration, optimization, and multi-cloud strategies.",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Cloud Migration", "Cost Optimization", "Multi-Cloud", "DevOps"],
      stat: "99.9% Uptime",
    },
    {
      icon: <Cpu size={24} />,
      title: "Intelligent Automation",
      shortDesc: "RPA and workflow automation",
      fullDesc:
        "Automate workflows using RPA and BPM solutions to reduce cost and increase accuracy.",
      gradient: "from-emerald-500 to-green-500",
      features: ["RPA", "Workflow Automation", "Process Mining", "BPM"],
      stat: "60% Time Saved",
    },
    {
      icon: <GitMerge size={24} />,
      title: "Integration Services",
      shortDesc: "API management and integrations",
      fullDesc:
        "Seamless enterprise integrations using microservices, APIs, and event-driven architecture.",
      gradient: "from-amber-500 to-orange-500",
      features: ["API Management", "Microservices", "Event-Driven"],
      stat: "3x Faster",
    },
    {
      icon: <Database size={24} />,
      title: "Data & Analytics",
      shortDesc: "BI & real-time analytics",
      fullDesc:
        "Transform raw data into insights using real-time analytics, BI, and governance.",
      gradient: "from-violet-500 to-purple-500",
      features: ["Data Lakes", "BI", "Real-time Analytics"],
      stat: "Live Insights",
    },
    {
      icon: <Shield size={24} />,
      title: "Cybersecurity",
      shortDesc: "Enterprise security solutions",
      fullDesc:
        "End-to-end cybersecurity including Zero Trust, SOC, compliance, and threat intelligence.",
      gradient: "from-rose-500 to-pink-500",
      features: ["Zero Trust", "Threat Intel", "Compliance", "SOC"],
      stat: "24/7 Protection",
    },
  ];

  /* 🔥 Viewport animation – triggers EVERY time */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Mobile detection */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 mb-4">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">
              Our Core Services
            </span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enterprise Digital Solutions
          </h2>
          <p className="text-gray-600">
            Scalable, secure, and future-ready technology services
          </p>
        </div>

        {/* Desktop Grid */}
        {!isMobile && (
          <div className="grid grid-cols-3 gap-6 relative">
            {services.map((service, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Base Card */}
                  <div
                    className={`relative bg-white rounded-2xl border border-gray-200 p-6 h-full transition-all duration-300 ${
                      isHovered
                        ? "opacity-0 pointer-events-none"
                        : "shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <div
                      className={`w-14 h-16 rounded-xl bg-gradient-to-br ${service.gradient} p-3 mb-4`}
                    >
                      <div className="text-white">{service.icon}</div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  {isHovered && (
                    <div className="absolute inset-0 z-50 scale-[1.06] transition-transform duration-300 ease-out">
                      <div className="relative h-full rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                        <img
                          src={serviceBackgrounds[index]}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/70" />

                        <div className="relative p-6 h-full flex flex-col text-white">
                          <h3 className="text-2xl font-bold mb-3">
                            {service.title}
                          </h3>
                          <p className="text-sm mb-4">
                            {service.fullDesc}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {service.features.map((f, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-white/20 rounded-full text-xs"
                              >
                                {f}
                              </span>
                            ))}
                          </div>

                          <button className="mt-4 inline-flex items-center text-sm font-semibold">
                            Get Started
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition-all duration-700 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-3 mb-3`}
                >
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {service.shortDesc}
                </p>
                <button className="text-indigo-600 text-sm flex items-center">
                  View Details <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
