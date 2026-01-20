// pages/Careers.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  Users,
  TrendingUp,
  HeartHandshake,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  Upload,
} from "lucide-react";

const Careers = () => {
  const [openJob, setOpenJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Modal animation
  useEffect(() => {
    if (showModal) {
      setTimeout(() => setModalVisible(true), 10);
    } else {
      setModalVisible(false);
    }
  }, [showModal]);

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Cloud / DevOps Engineer",
    "UI/UX Designer",
    "QA Engineer",
    "Data Engineer",
  ];

  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  const jobs = [
    {
      title: "Frontend Developer (React)",
      location: "Hyderabad / Remote",
      type: "Full Time",
      experience: "2–5 Years",
      description:
        "Build modern, scalable UI applications using React, Tailwind, and modern frontend tools.",
      requirements: [
        "Strong React & JavaScript fundamentals",
        "Experience with REST APIs",
        "UI/UX best practices",
        "Team collaboration skills",
      ],
    },
    {
      title: "Backend Developer (Node.js)",
      location: "Bangalore / Remote",
      type: "Full Time",
      experience: "3–6 Years",
      description:
        "Develop high-performance backend services and secure APIs for enterprise systems.",
      requirements: [
        "Node.js & Express",
        "MongoDB / SQL",
        "API security",
        "Cloud exposure",
      ],
    },
    {
      title: "Cloud & DevOps Engineer",
      location: "Remote",
      type: "Full Time",
      experience: "4+ Years",
      description:
        "Design scalable cloud infrastructure and CI/CD pipelines.",
      requirements: [
        "AWS / Azure / GCP",
        "Docker & Kubernetes",
        "CI/CD pipelines",
        "Monitoring & security",
      ],
    },
  ];

  return (
    <>
      {/* ================= CAREERS PAGE ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-violet-50 to-white py-24">
        {/* Background blobs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-400/30 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-40 w-[420px] h-[420px] bg-pink-400/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-[520px] h-[520px] bg-violet-400/30 rounded-full blur-3xl" />

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          {/* HERO */}
          <div 
            data-animate="fade-up"
            className="text-center max-w-4xl mx-auto mb-24 opacity-0 translate-y-8 transition-all duration-700"
          >
            <span className="inline-flex px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold mb-6 shadow-lg animate-scale">
              Careers at Sage
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Grow Your Career with
              <span className="block bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Innovation & Impact
              </span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Join a vibrant team of technologists, innovators, and leaders.
            </p>
          </div>

          {/* OPEN POSITIONS */}
          <div 
            data-animate="fade-up"
            className="max-w-4xl mx-auto mb-28 opacity-0 translate-y-8 transition-all duration-700"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Open Positions
            </h2>

            <div className="space-y-6">
              {jobs.map((job, index) => (
                <div
                  key={index}
                  data-animate="fade-up"
                  data-delay={index * 100}
                  className="rounded-3xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 shadow-lg
                  opacity-0 translate-y-4 transition-all duration-500 hover:scale-101"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() =>
                      setOpenJob(openJob === index ? null : index)
                    }
                    className="w-full p-6 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {job.type}
                        </span>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    {openJob === index ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {openJob === index && (
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 animate-slide-down">
                        <p className="text-gray-700 mb-4">
                          {job.description}
                        </p>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mb-4">
                          {job.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                        <button
                          onClick={() => setShowModal(true)}
                          className="px-6 py-3 rounded-full font-semibold text-white
                          bg-gradient-to-r from-indigo-600 to-pink-600
                          hover:scale-105 transition-all"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FINAL CTA */}
          <div 
            data-animate="scale"
            className="text-center rounded-3xl p-12 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 
            shadow-2xl text-white opacity-0 scale-95 transition-all duration-700 hover:scale-102"
          >
            <h3 className="text-3xl font-bold mb-4">
              Didn't find the perfect role?
            </h3>
            <p className="text-indigo-100 mb-8">
              Submit your resume and we'll reach out when a role matches.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600
              rounded-full font-semibold hover:scale-110 transition-all"
            >
              <Send size={18} />
              Submit Resume
            </button>
          </div>
        </div>
      </section>

      {/* ================= RESUME MODAL ================= */}
      {showModal && (
        <div 
          className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 transition-opacity duration-300
            ${modalVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setShowModal(false)}
        >
          <div 
            className={`bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative transition-all duration-300
              ${modalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Submit Your Resume
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                required
              />

              {/* MULTI-SELECT ROLES */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Roles Interested In
                </label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <button
                      type="button"
                      key={role}
                      onClick={() => toggleRole(role)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
                        ${
                          selectedRoles.includes(role)
                            ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white border-transparent"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* FILE UPLOAD */}
              <label className="flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                <Upload size={18} />
                <span className="text-sm text-gray-600">
                  Upload Resume (PDF / DOC)
                </span>
                <input type="file" className="hidden" />
              </label>

              <textarea
                rows="3"
                placeholder="Message (optional)"
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-full text-white font-semibold
                bg-gradient-to-r from-indigo-600 to-pink-600
                hover:scale-105 transition-all"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: none !important;
        }
        
        .animate-scale {
          animation: scaleIn 0.6s ease-out;
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        
        .scale-101 {
          transform: scale(1.01);
        }
        
        .hover\:scale-101:hover {
          transform: scale(1.01);
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </>
  );
};

export default Careers;