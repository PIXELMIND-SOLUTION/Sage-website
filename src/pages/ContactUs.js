// pages/ContactUs.jsx
import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  User,
  Briefcase,
  Info,
} from "lucide-react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    interest: "",
    source: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Thank you! Our team will contact you shortly.");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      {/* Decorative Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold mb-4">
            Contact Us
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Let’s Start a Conversation
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your needs and our experts will reach out within 24
            hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT – INFO */}
          <div className="space-y-6">
            {[
              {
                icon: <Phone />,
                title: "Talk to Sales",
                desc: "+91 98765 43210",
              },
              {
                icon: <Mail />,
                title: "Email Us",
                desc: "contact@sagetech.com",
              },
              {
                icon: <MapPin />,
                title: "Office",
                desc: "Hyderabad, India",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* WHY CONTACT */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
              <h4 className="font-bold text-lg mb-3">
                Why Choose Us?
              </h4>
              <ul className="space-y-2 text-sm text-indigo-100">
                <li>✔ Free initial consultation</li>
                <li>✔ 20+ years industry experience</li>
                <li>✔ Trusted by global enterprises</li>
                <li>✔ Quick response & dedicated support</li>
              </ul>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Mobile + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Dropdowns */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">
                    Area of Interest
                  </label>
                  <select
                    name="interest"
                    required
                    value={form.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select</option>
                    <option>AI & Machine Learning</option>
                    <option>Cloud Services</option>
                    <option>Cybersecurity</option>
                    <option>Automation</option>
                    <option>Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">
                    How did you hear about us?
                  </label>
                  <select
                    name="source"
                    required
                    value={form.source}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select</option>
                    <option>Google</option>
                    <option>LinkedIn</option>
                    <option>Referral</option>
                    <option>Social Media</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Reason / Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about your requirement..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600
                text-white font-semibold rounded-full flex items-center justify-center gap-2
                hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                Submit Request
              </button>

              {/* Privacy */}
              <p className="text-xs text-gray-500 mt-2">
                🔒 We respect your privacy. Your information is safe with us.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
