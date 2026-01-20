// components/WhyChooseUs.jsx
import React, { useEffect, useRef, useState } from "react";
import { Globe, Award, Users, CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const features = [
    {
      icon: <Globe size={24} />,
      title: "Global Delivery Model",
      description:
        "24/7 delivery centers across North America, Europe, and APAC ensuring seamless collaboration.",
      stat: "15+ Countries",
    },
    {
      icon: <Award size={24} />,
      title: "Fortune-level Clients",
      description:
        "Trusted by Fortune 500 companies across finance, healthcare, retail, and manufacturing.",
      stat: "200+ Enterprises",
    },
    {
      icon: <Users size={24} />,
      title: "Expert Team",
      description:
        "Certified professionals with deep domain expertise and cutting-edge technical skills.",
      stat: "1000+ Experts",
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Proven Methodology",
      description:
        "Agile delivery framework ensuring quality, transparency, and timely completion.",
      stat: "99% Success Rate",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 👇 This is the key change
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <div
            className={`transition-all duration-700 ease-out ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 font-semibold mb-6">
              Why Choose SageTech
            </span>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              20+ Years of Excellence in <br />
              <span className="text-indigo-600">Digital Transformation</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-xl">
              We combine industry expertise, innovation, and proven delivery
              models to create measurable business impact and long-term success.
            </p>

            <div className="space-y-6">
              {[
                {
                  color: "green",
                  title: "End-to-End Solutions",
                  desc: "From strategy and design to implementation and support",
                },
                {
                  color: "blue",
                  title: "Industry-Specific Expertise",
                  desc: "Deep understanding of regulatory and operational needs",
                },
                {
                  color: "purple",
                  title: "Innovation-Driven",
                  desc: "Continuous investment in emerging technologies and R&D",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start transition-all duration-700 ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div
                    className={`w-9 h-9 rounded-full bg-${item.color}-100 flex items-center justify-center mr-4`}
                  >
                    <CheckCircle
                      className={`w-5 h-5 text-${item.color}-600`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FEATURE GRID */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative bg-white/70 backdrop-blur rounded-2xl p-6 border border-gray-100
                shadow-lg transition-all duration-500 ease-out group
                hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-100
                ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100
                  flex items-center justify-center mb-5
                  group-hover:scale-110 transition-transform duration-300">
                  <div className="text-indigo-600">{feature.icon}</div>
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <div className="text-2xl font-extrabold text-indigo-600">
                  {feature.stat}
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
