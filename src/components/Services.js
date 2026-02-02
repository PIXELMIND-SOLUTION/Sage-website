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
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
              className={`group relative rounded-2xl overflow-hidden transition-all duration-700 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* DEFAULT WHITE CARD */}
              <div className="relative z-10 bg-white border border-gray-200 rounded-2xl p-6 md:p-7 h-full transition-all duration-500 group-hover:opacity-0">
                <div
                  className={`w-12 h-16 mb-4 rounded-xl flex items-center justify-center`}
                >
                  <img
                    src={solution.logo}
                    alt={solution.name}
                    className="w-12 h-12 object-contain rounded rounded-2"
                  />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {solution.name}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {solution.description}
                </p>
              </div>

              {/* HOVER IMAGE BACKGROUND */}
              <img
                src={solution.image}
                alt={solution.name}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* HOVER CONTENT */}
              <div className="absolute inset-0 z-20 p-6 md:p-7 flex flex-col text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span
                  className={`inline-flex self-start mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${solution.color}`}
                >
                  {solution.name.replace(" Solutions", "")}
                </span>

                <h3 className="text-lg md:text-xl font-bold mb-3">
                  {solution.name}
                </h3>

                <p className="text-sm text-gray-200 mb-4 line-clamp-3">
                  {solution.longDescription}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {solution.services.slice(0, 3).map((srv, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-white/20 backdrop-blur"
                    >
                      {srv.title}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate(`/solutions/${solution.slug}`)}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
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
