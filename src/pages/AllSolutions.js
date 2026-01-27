import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { solutionsData } from "../Data/SolutionsData";

const AllSolutions = () => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  const solutions = Object.entries(solutionsData).map(
    ([slug, data]) => ({
      slug,
      ...data,
    })
  );

  /* ===== VIEWPORT OBSERVER ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full">

      {/* ================= HERO ================= */}
      <div className="relative h-[45vh] w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
            <div className="max-w-3xl text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                Our Solutions
              </h1>
              <p className="text-sm sm:text-base lg:text-lg opacity-90">
                Scalable, secure, and future-ready technology solutions designed
                to empower modern enterprises.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SOLUTIONS GRID ================= */}
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {solutions.map((item, index) => (
            <Link
              key={item.slug}
              to={`/solutions/${item.slug}`}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-70`}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {item.name}
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  {item.description}
                </p>

                <span className="inline-flex items-center gap-2 font-semibold">
                  Explore Solution
                  <span className="transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="bg-gray-900 py-20 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to transform your infrastructure?
        </h3>
        <p className="text-gray-300 mb-8">
          Talk to our experts and build secure, scalable solutions tailored to your needs.
        </p>
        <Link
          to="/contact"
          className="inline-block px-8 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default AllSolutions;
