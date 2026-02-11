// components/CTA.jsx
import React from "react";
import { MessageSquare, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom right, #1e5a8e, #4dd6d5)",
        }}
      />

      {/* Decorative Blobs (smaller) */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div
          className="
            max-w-3xl mx-auto
            bg-white/10 backdrop-blur-xl
            border border-white/20
            rounded-2xl
            px-6 py-10 md:px-10 md:py-12
            text-center
            shadow-xl
          "
        >
          {/* Accent Icon (smaller) */}
          <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/20">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
            Ready to Transform
            <span
              className="block"
              style={{ color: "#b6ecec" }}
            >
              Your Business?
            </span>
          </h2>

          <p
            className="text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ color: "#d2f3f3" }}
          >
            Talk to our experts and discover solutions tailored to your growth
            and digital goals.
          </p>

          {/* CTA Buttons (smaller) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="
                group px-6 py-3
                bg-white
                font-semibold rounded-full
                flex items-center justify-center
                shadow-md
                hover:scale-105 hover:shadow-lg
                transition-all duration-300
              "
              style={{ color: "#1e5a8e" }}
              onClick={() => navigate('/contact')}
            >
              <MessageSquare className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              Contact Us
            </button>

            {/* <button
              className="
                px-6 py-3
                border border-white
                text-white font-semibold rounded-full
                flex items-center justify-center
                hover:bg-white/10 hover:scale-105
                transition-all duration-300
              "
            >
              <Calendar className="mr-2 w-4 h-4" />
              Schedule Demo
            </button> */}
          </div>

          {/* Trust Note */}
          <p
            className="mt-6 text-xs tracking-wide"
            style={{ color: "#b6ecec" }}
          >
            ⏱ Response within 24 hours • No obligation
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
