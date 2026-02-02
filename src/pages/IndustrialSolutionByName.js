import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { solutionsData } from "../Data/SolutionsData";

const IndustrySolutions = () => {
  const { name } = useParams();

  const key = name
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const data = solutionsData[key];

  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const navigate = useNavigate();

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl font-semibold">
        Solution not found
      </div>
    );
  }

  return (
    <section className="w-full">

      {/* ================= HERO ================= */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-black/60" />

        {/* HERO CONTENT CONTAINER */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
            <div
              className={`max-w-3xl text-white transition-all duration-1000
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                {data.name}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg opacity-90">
                {data.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16"
      >

        {/* LONG DESCRIPTION */}
        {data.longDescription && (
          <p
            className={`max-w-4xl text-gray-600 text-base sm:text-lg mb-14 transition-all duration-1000 delay-150
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {data.longDescription}
          </p>
        )}

        {/* ================= SERVICES GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((item, index) => (
            <div
              key={index}
              className={`group relative h-[280px] rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-500
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Default Card */}
              <div className="absolute inset-0 p-6 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>

              {/* Hover Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-300
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h3 className="text-2xl font-bold mb-4">
            Let’s build your solution
          </h3>
          <button onClick={()=>navigate('/contact')} className="px-8 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;
