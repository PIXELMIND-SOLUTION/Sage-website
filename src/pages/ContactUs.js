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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Let’s Start a Conversation
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your needs and our experts will reach out within
            24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT INFO */}
          <div className="space-y-6">
            {[
              {
                icon: <Phone />,
                title: "Talk to Us",
                desc: "+1 (972) 654-2856",
              },
              {
                icon: <Mail />,
                title: "Email Us",
                desc: "contact@sagetech.com",
              },
              {
                icon: <MapPin />,
                title: "India Office",
                desc: "Hyderabad, Telangana, India",
              },
              {
                icon: <MapPin />,
                title: "USA Office",
                desc: "8700 Stacy Rd, McKinney, Texas 75070",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-xl p-6 shadow-md border"
              >
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 border rounded-xl"
              />

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company Name (Optional)"
                className="w-full px-4 py-3 border rounded-xl"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />
                <select
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
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
                className="w-full px-4 py-3 border rounded-xl"
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
                rows="4"
                placeholder="Message"
                className="w-full px-4 py-3 border rounded-xl"
              />

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600
                text-white rounded-full font-semibold flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Send size={16} /> Submit Request
                  </>
                )}
              </button>

              {successMsg && (
                <p className="text-green-600">{successMsg}</p>
              )}
              {errorMsg && (
                <p className="text-red-500">{errorMsg}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
