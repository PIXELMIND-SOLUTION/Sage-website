// pages/TalkToExperts.jsx
import React, { useState } from "react";
import {
  MessageCircle,
  PhoneCall,
  Mail,
  Calendar,
  Users,
  ShieldCheck,
  Zap,
  Send,
} from "lucide-react";

const TalkToExperts = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    interest: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔌 Connect API here later
    console.log("Form Submitted:", form);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-violet-50 to-white">
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-400/30 blur-3xl rounded-full" />
      <div className="absolute top-32 -right-40 w-[420px] h-[420px] bg-pink-400/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 left-1/3 w-[520px] h-[520px] bg-violet-400/30 blur-3xl rounded-full" />

      <div className="container max-w-7xl mx-auto px-6 py-24 relative z-10">

        {/* ================= HERO ================= */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full 
            bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold mb-6 shadow-lg">
            <MessageCircle size={16} />
            Talk to Experts
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Get Expert Guidance for Your
            <span className="block bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Digital Transformation
            </span>
          </h1>

          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Connect with our industry experts to discuss cloud, data, AI,
            cybersecurity, and enterprise modernization solutions.
          </p>
        </div>

        {/* ================= EXPERT HIGHLIGHTS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            {
              icon: <Users />,
              title: "Certified Experts",
              desc: "1000+ certified technology professionals",
              gradient: "from-indigo-500 to-blue-500",
            },
            {
              icon: <ShieldCheck />,
              title: "Enterprise Security",
              desc: "Compliance-driven & secure solutions",
              gradient: "from-emerald-500 to-green-500",
            },
            {
              icon: <Zap />,
              title: "Fast Response",
              desc: "Connect within 24 hours",
              gradient: "from-orange-500 to-pink-500",
            },
            {
              icon: <Calendar />,
              title: "Flexible Scheduling",
              desc: "Book calls at your convenience",
              gradient: "from-violet-500 to-purple-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100
              hover:-translate-y-3 transition-all"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient}
                flex items-center justify-center text-white mb-5 shadow-lg`}
              >
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ================= FORM SECTION ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT INFO */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Let’s Start a Conversation
            </h2>
            <p className="text-gray-600 mb-8">
              Share your requirements and our experts will reach out with
              tailored recommendations.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <PhoneCall />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Call Us</p>
                  <p className="text-gray-600 text-sm">+91 90000 00000</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                  <Mail />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email Us</p>
                  <p className="text-gray-600 text-sm">contact@sageit.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Talk to an Expert
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <select
                name="interest"
                value={form.interest}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="">Select Area of Interest</option>
                <option>Cloud Services</option>
                <option>Data & Analytics</option>
                <option>AI & Machine Learning</option>
                <option>Cybersecurity</option>
                <option>Enterprise Modernization</option>
              </select>

              <textarea
                name="message"
                rows="4"
                placeholder="Tell us about your requirement"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-full text-white font-semibold
                bg-gradient-to-r from-indigo-600 to-pink-600
                hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Submit Request
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              We respect your privacy. No spam, guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalkToExperts;
