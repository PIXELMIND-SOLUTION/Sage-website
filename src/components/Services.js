// components/Services.jsx
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { solutionsData } from "../Data/SolutionsData";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const navigate = useNavigate();

  const solutions = Object.entries(solutionsData).map(
    ([slug, solution]) => ({
      slug,
      ...solution,
    })
  );

  /* Viewport animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white via-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 mb-5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">
              Our Expertise
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Enterprise Digital Solutions
          </h2>

          <p className="text-base md:text-lg text-gray-600">
            Scalable, secure, and future-ready technology offerings
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={solution.slug}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`group relative rounded-3xl transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              {/* GRADIENT BORDER */}
              <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-200 group-hover:from-indigo-500 group-hover:via-blue-500 group-hover:to-purple-500 transition-all duration-500" />

              {/* CARD */}
              <div className="relative h-full rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 p-7 overflow-hidden transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_25px_70px_rgba(79,70,229,0.35)]">

                {/* SHIMMER EFFECT */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -left-40 top-0 w-40 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-12 animate-[shimmer_1.5s_linear]" />
                </div>

                {/* LOGO */}
                <div className="w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center shadow-sm">
                  <img
                    src={solution.logo}
                    alt={solution.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">
                  {solution.name}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {solution.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {solution.services.slice(0, 3).map((srv, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700"
                    >
                      {srv.title}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate(`/solutions/${solution.slug}`)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:gap-3 transition-all"
                >
                  Explore Solution
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;
