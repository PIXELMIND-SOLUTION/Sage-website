// components/Testimonials.jsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "NectarSolutions transformed our digital infrastructure, resulting in 40% operational efficiency gains. Their expertise in cloud migration was exceptional.",
      author: "Sarah Johnson",
      position: "CTO, Global Financial Services",
      company: "Fortune 500 Banking Corporation",
      rating: 5,
    },
    {
      quote:
        "The AI-driven analytics platform developed by NectarSolutions provided unprecedented insights into our supply chain, optimizing costs by 30% annually.",
      author: "Michael Chen",
      position: "CIO",
      company: "Leading Manufacturing Conglomerate",
      rating: 5,
    },
    {
      quote:
        "Their cybersecurity framework implementation not only secured our systems but also ensured full regulatory compliance across 15 countries.",
      author: "David Rodriguez",
      position: "Head of Technology",
      company: "International Healthcare Provider",
      rating: 5,
    },
  ];

  const next = () =>
    setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative Blobs */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(30,90,142,0.25)" }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(77,214,213,0.25)" }}
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span
            className="inline-flex items-center px-4 py-2 rounded-full font-semibold mb-4"
            style={{
              backgroundColor: "#e6f2f8",
              color: "#1e5a8e",
            }}
          >
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Industry Leaders Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from executives who partnered with us to drive digital excellence
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-2xl transition-all duration-500">
            {/* Quote Icon */}
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
              style={{
                background: "linear-gradient(to bottom right, #1e5a8e, #4dd6d5)",
              }}
            >
              <Quote className="w-8 h-8 text-white" />
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-6 mt-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current mx-0.5 animate-pulse"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-xl sm:text-2xl text-gray-800 text-center leading-relaxed mb-10 transition-opacity duration-500">
              “{testimonials[currentIndex].quote}”
            </p>

            {/* Author */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full p-[2px]"
                  style={{
                    background: "linear-gradient(to bottom right, #1e5a8e, #4dd6d5)",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#1e5a8e" }}
                    >
                      {testimonials[currentIndex].author.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h4 className="text-lg font-bold text-gray-900">
                  {testimonials[currentIndex].author}
                </h4>
                <p className="text-gray-600 text-sm">
                  {testimonials[currentIndex].position}
                </p>
                <p className="text-gray-500 text-xs">
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-white shadow-lg transition"
                style={{}}
              >
                <ChevronLeft style={{ color: "#1e5a8e" }} />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <button
                onClick={next}
                className="p-3 rounded-full bg-white shadow-lg transition"
              >
                <ChevronRight style={{ color: "#1e5a8e" }} />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-10 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="h-3 rounded-full transition-all duration-300"
                  style={{
                    width: index === currentIndex ? "32px" : "12px",
                    backgroundColor:
                      index === currentIndex ? "#1e5a8e" : "#d1d5db",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
