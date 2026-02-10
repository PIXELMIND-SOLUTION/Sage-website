import React, { useEffect } from "react";
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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f7f9fc]">
      
      {/* ===== LUXURY BACKGROUND ===== */}
      <div className="absolute -top-60 left-[-200px] w-[700px] h-[700px] bg-indigo-500/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-[-300px] right-[-200px] w-[700px] h-[700px] bg-violet-500/20 blur-[160px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">

        {/* ================= HERO ================= */}

        <div
          data-animate
          className="text-center max-w-5xl mx-auto mb-32 opacity-0 translate-y-10 transition-all duration-700"
        >
          <span className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg">
            About NectarSolutions
          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Engineering the Future of
            <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
              Enterprise Technology
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            We partner with forward-thinking organizations to design,
            build, and scale digital platforms that redefine industries.
          </p>
        </div>

        {/* ================= FLOATING STATS ================= */}

        <div className="grid md:grid-cols-4 gap-8 mb-32">
          {[
            { icon: Globe, value: "40+", label: "Countries Served" },
            { icon: Users, value: "1000+", label: "Tech Experts" },
            { icon: Briefcase, value: "500+", label: "Enterprise Clients" },
            { icon: Award, value: "20+", label: "Years Experience" },
          ].map((stat, i) => {
            const Icon = stat.icon;

            return (
              <div
                key={i}
                data-animate
                style={{ transitionDelay: `${i * 120}ms` }}
                className="
                opacity-0 translate-y-10 transition-all duration-700
                relative rounded-3xl p-[1px]
                bg-gradient-to-br from-indigo-200 via-violet-200 to-pink-200
                hover:from-indigo-500 hover:via-violet-500 hover:to-pink-500
                "
              >
                <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-8 text-center shadow-xl hover:-translate-y-3 transition-all duration-500">
                  
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white mb-4 shadow-lg">
                    <Icon />
                  </div>

                  <div className="text-3xl font-extrabold text-gray-900">
                    {stat.value}
                  </div>

                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= STORY + MISSION ================= */}

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-36">

          {/* STORY */}
          <div
            data-animate
            className="opacity-0 -translate-x-10 transition-all duration-700"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Our Story
            </h2>

            <p className="text-gray-600 mb-5 leading-relaxed">
              NectarSolutions was founded with a bold vision — to close the gap
              between business ambition and technological capability.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Today, we empower global enterprises through cloud engineering,
              AI-driven insights, cybersecurity resilience, and large-scale
              digital modernization.
            </p>
          </div>

          {/* MISSION CARD */}
          <div
            data-animate
            className="
            opacity-0 translate-x-10 transition-all duration-700
            relative p-[1px] rounded-3xl
            bg-gradient-to-br from-indigo-500 via-violet-500 to-pink-500
            "
          >
            <div className="rounded-3xl p-12 text-white bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-600 shadow-2xl hover:scale-[1.02] transition-all duration-500">

              <Rocket className="mb-6 w-10 h-10 opacity-90" />

              <h3 className="text-2xl font-bold mb-4">
                Our Mission
              </h3>

              <p className="text-indigo-100">
                To empower organizations with intelligent, secure,
                and scalable technology that accelerates growth.
              </p>

            </div>
          </div>
        </div>

        {/* ================= CORE VALUES ================= */}

        <div className="mb-36">
          <h2
            data-animate
            className="text-4xl font-bold text-center mb-14 opacity-0 translate-y-10 transition-all duration-700"
          >
            Our Core Values
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: ShieldCheck,
                title: "Integrity",
                desc: "Transparency and trust drive everything we do.",
              },
              {
                icon: TrendingUp,
                title: "Excellence",
                desc: "We push boundaries and deliver elite results.",
              },
              {
                icon: Users,
                title: "Collaboration",
                desc: "Great outcomes come from great teamwork.",
              },
              {
                icon: HeartHandshake,
                title: "Customer First",
                desc: "Your success defines our success.",
              },
            ].map((value, i) => {
              const Icon = value.icon;

              return (
                <div
                  key={i}
                  data-animate
                  style={{ transitionDelay: `${i * 140}ms` }}
                  className="
                  opacity-0 translate-y-10 transition-all duration-700
                  group relative rounded-3xl p-[1px]
                  bg-gradient-to-br from-indigo-200 via-violet-200 to-pink-200
                  hover:from-indigo-500 hover:to-pink-500
                  "
                >
                  <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-8 shadow-xl group-hover:-translate-y-3 transition-all duration-500">

                    <div className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center text-white bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg">
                      <Icon />
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      {value.desc}
                    </p>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= MEGA CTA ================= */}

        <div
          data-animate
          className="
          opacity-0 scale-95 transition-all duration-700
          relative p-[1px] rounded-3xl
          bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500
          "
        >
          <div className="rounded-3xl text-center p-16 text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 shadow-2xl">

            <h2 className="text-4xl font-bold mb-6">
              Why Choose NectarSolutions?
            </h2>

            <p className="text-indigo-100 max-w-2xl mx-auto mb-10">
              We combine deep engineering expertise with strategic thinking
              to help enterprises innovate faster and operate smarter.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Enterprise-grade architecture",
                "Global delivery capability",
                "Elite engineering teams",
                "Proven transformation success",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/15 backdrop-blur rounded-xl py-4 font-semibold hover:scale-105 transition"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
