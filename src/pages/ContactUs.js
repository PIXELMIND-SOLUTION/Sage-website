// pages/ContactUs.jsx
import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  User,
  Building2,
  Globe,
  Loader2,
} from "lucide-react";

const API_URL =
  "http://31.97.206.144:7127/api/positions/submit-contact";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    mobile: "",
    email: "",
    country: "",
    interest: "",
    source: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const payload = {
      fullName: form.name,
      companyName: form.company,
      mobile: form.mobile,
      email: form.email,
      country: form.country,
      areaOfInterest: form.interest,
      heardAboutUs: form.source,
      description: form.message,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg(
          "✅ Thank you! Our team will contact you shortly."
        );
        setForm({
          name: "",
          company: "",
          mobile: "",
          email: "",
          country: "",
          interest: "",
          source: "",
          message: "",
        });
      } else {
        setErrorMsg("Submission failed. Please try again.");
      }
    } catch {
      setErrorMsg("Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen py-12 mt-8 sm:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #f8fafc, #ffffff)",
      }}
    >
      {/* Decorative Blobs */}
      <div
        className="absolute -top-20 -left-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl"
        style={{ background: "#1e5a8e33" }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl"
        style={{ background: "#4dd6d533" }}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 px-4">
          <span
            className="inline-block px-4 py-2 rounded-full font-semibold mb-4 text-white"
            style={{
              background: "linear-gradient(to right, #1e5a8e, #4dd6d5)",
            }}
          >
            Contact Us
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-4">
            Let’s Start a Conversation
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Tell us about your needs and our experts will reach out within
            24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* LEFT INFO */}
          <div className="space-y-4 sm:space-y-6">
            {[
              {
                icon: <Phone size={20} />,
                title: "Talk to Us",
                desc: "+1 (972) 654-2856",
              },
              {
                icon: <Mail size={20} />,
                title: "Email Us",
                desc: "contact@nectarsolutions.com",
              },
              {
                icon: <MapPin size={20} />,
                title: "India Office",
                desc: "Hyderabad, Telangana, India",
              },
              {
                icon: <MapPin size={20} />,
                title: "USA Office",
                desc: "8700 Stacy Rd, McKinney, Texas 75070",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 sm:gap-4 bg-white rounded-xl p-4 sm:p-6 shadow-md border min-w-0"
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{
                    background: "linear-gradient(to bottom right, #1e5a8e, #4dd6d5)",
                  }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border p-4 sm:p-6 lg:p-8 xl:p-12 overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2"
                style={{ borderColor: "#1e5a8e33" }}
              />

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company Name (Optional)"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2"
                style={{ borderColor: "#1e5a8e33" }}
              />

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2"
                  style={{ borderColor: "#1e5a8e33" }}
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2"
                  style={{ borderColor: "#1e5a8e33" }}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2"
                  style={{ borderColor: "#1e5a8e33" }}
                />

                <select
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2"
                  style={{ borderColor: "#1e5a8e33" }}
                >
                  <option value="">Area of Interest</option>
                  <option>Networking</option>
                  <option>Cloud Solutions</option>
                  <option>Cyber Security</option>
                  <option>Data Engineering</option>
                  <option>Consulting</option>
                </select>
              </div>

              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2"
                style={{ borderColor: "#1e5a8e33" }}
              >
                <option value="">How did you hear about us?</option>
                <option>Google Search</option>
                <option>LinkedIn</option>
                <option>Referral</option>
                <option>Social Media</option>
                <option>Other</option>
              </select>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="3"
                placeholder="Message"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2"
                style={{ borderColor: "#1e5a8e33" }}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: "linear-gradient(to right, #1e5a8e, #4dd6d5)",
                }}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Send size={16} /> Submit Request
                  </>
                )}
              </button>

              {successMsg && (
                <p className="text-green-600 text-sm sm:text-base p-3 bg-green-50 rounded-lg">
                  {successMsg}
                </p>
              )}
              {errorMsg && (
                <p className="text-red-500 text-sm sm:text-base p-3 bg-red-50 rounded-lg">
                  {errorMsg}
                </p>
              )}
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
