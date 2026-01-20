// components/Industries.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Building2,
  Heart,
  ShoppingBag,
  Factory,
  Cpu,
  Car,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const Industries = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [inView, setInView] = useState(false);
  const [animatedIndices, setAnimatedIndices] = useState([]);
  const sectionRef = useRef(null);

  const industries = [
    {
      icon: <Building2 size={20} />,
      name: "Finance",
      description:
        "Digital banking, fintech, risk management, and compliance solutions.",
      projects: "150+ Projects",
      gradient: "from-blue-500 to-indigo-500",
      features: ["Digital Banking", "Fintech", "Risk Management"],
    },
    {
      icon: <Heart size={20} />,
      name: "Healthcare",
      description:
        "Healthtech, EHR systems, telemedicine, and healthcare analytics.",
      projects: "120+ Projects",
      gradient: "from-emerald-500 to-green-500",
      features: ["Healthtech", "EHR Systems", "Telemedicine"],
    },
    {
      icon: <ShoppingBag size={20} />,
      name: "Retail",
      description:
        "E-commerce platforms, inventory management, and CX solutions.",
      projects: "200+ Projects",
      gradient: "from-amber-500 to-orange-500",
      features: ["E-commerce", "Inventory", "Customer Experience"],
    },
    {
      icon: <Factory size={20} />,
      name: "Manufacturing",
      description:
        "Industry 4.0, IoT, supply chain, and smart factory solutions.",
      projects: "180+ Projects",
      gradient: "from-gray-600 to-gray-800",
      features: ["Industry 4.0", "IoT", "Supply Chain"],
    },
    {
      icon: <Cpu size={20} />,
      name: "Technology",
      description:
        "SaaS development, product engineering, and cloud transformation.",
      projects: "250+ Projects",
      gradient: "from-violet-500 to-purple-500",
      features: ["SaaS", "Product Engineering", "Cloud"],
    },
    {
      icon: <Car size={20} />,
      name: "Automotive",
      description:
        "Connected vehicles, autonomous driving, and automation.",
      projects: "90+ Projects",
      gradient: "from-red-500 to-pink-500",
      features: ["Connected Vehicles", "Autonomous", "Automation"],
    },
  ];

  /* 🔁 Viewport animation – replays every time */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setAnimatedIndices([]);
          industries.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedIndices((prev) => [...prev, index]);
            }, index * 120);
          });
        } else {
          setInView(false);
          setAnimatedIndices([]);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-4">
            Industries We Serve
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Transforming
            <span className="text-indigo-600 ml-2">Sectors</span>
          </h2>
          <p className="text-gray-600">
            Tailored solutions for diverse industry challenges
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {industries.map((industry, index) => {
            const isAnimated = animatedIndices.includes(index);

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative group bg-white rounded-xl md:rounded-2xl p-5 md:p-6
                  border border-gray-200 transition-all duration-300
                  hover:border-indigo-300 hover:shadow-2xl
                  hover:-translate-y-2
                  ${
                    isAnimated
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }
                `}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon */}
                <div
                  className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient}
                  p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{industry.icon}</div>
                </div>

                <h3 className="relative text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-700">
                  {industry.name}
                </h3>

                <p className="relative text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                  {industry.description}
                </p>

                <div className="relative flex flex-wrap gap-2 mb-4">
                  {industry.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full group-hover:bg-indigo-50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="relative flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {industry.projects}
                    </span>
                  </div>

                  <button className="flex items-center text-sm font-medium text-indigo-600 group/btn">
                    View Cases
                    <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`mt-12 md:mt-16 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 
            text-white font-medium hover:shadow-lg hover:shadow-indigo-200 hover:scale-105 transition-all duration-300">
            Explore All Industries
          </button>
        </div>
      </div>
    </section>
  );
};

export default Industries;
