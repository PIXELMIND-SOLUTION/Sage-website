// pages/Careers.jsx
import React, { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";

const API_BASE = "http://31.97.206.144:7127/api/positions";

const Careers = () => {
  const [openJob, setOpenJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [applyForJob, setApplyForJob] = useState(null);
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    description: "",
    resumeFile: null,
  });
  
  const [roles, setRoles] = useState([""]);
  const [uploadFileName, setUploadFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  /* ================= FETCH JOBS ================= */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE}/all`);
        const data = await res.json();

        if (data.success) {
          setJobs(data.data);
        } else {
          setError("Failed to load job openings");
        }
      } catch {
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* ================= MODAL ANIMATION ================= */
  useEffect(() => {
    if (showModal) {
      setTimeout(() => setModalVisible(true), 10);
    } else {
      setModalVisible(false);
    }
  }, [showModal]);

  /* ================= PREVENT BODY SCROLL WHEN MODAL IS OPEN ================= */
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (index, value) => {
    const newRoles = [...roles];
    newRoles[index] = value;
    setRoles(newRoles);
  };

  const addRoleField = () => {
    setRoles([...roles, ""]);
  };

  const removeRoleField = (index) => {
    if (roles.length > 1) {
      const newRoles = roles.filter((_, i) => i !== index);
      setRoles(newRoles);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload PDF or DOC/DOCX files only.');
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB.');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        resumeFile: file
      }));
      setUploadFileName(file.name);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      description: "",
      resumeFile: null,
    });
    setRoles([""]);
    setUploadFileName("");
    setSubmitError("");
    setApplyForJob(null);
  };

  const openApplicationModal = (jobTitle = null) => {
    resetForm();
    
    if (jobTitle) {
      setApplyForJob(jobTitle);
      setRoles([jobTitle, ""]); // Pre-fill with job title and empty field
    } else {
      setRoles([""]);
    }
    
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty roles and validate
    const nonEmptyRoles = roles.filter(role => role.trim() !== "");
    
    if (!formData.fullName.trim()) {
      setSubmitError("Full name is required");
      return;
    }
    
    if (!formData.email.trim()) {
      setSubmitError("Email is required");
      return;
    }
    
    if (!formData.mobile.trim()) {
      setSubmitError("Mobile number is required");
      return;
    }
    
    if (nonEmptyRoles.length === 0) {
      setSubmitError("Please add at least one role");
      return;
    }
    
    if (!formData.resumeFile) {
      setSubmitError("Resume file is required");
      return;
    }
    
    setSubmitting(true);
    setSubmitError("");
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('roles', nonEmptyRoles.join(', '));
      formDataToSend.append('description', formData.description);
      formDataToSend.append('resume', formData.resumeFile);
      
      const response = await fetch(`${API_BASE}/submit`, {
        method: 'POST',
        body: formDataToSend,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        
        // Auto close modal after 3 seconds
        setTimeout(() => {
          setShowModal(false);
          setSubmitSuccess(false);
          resetForm();
        }, 3000);
      } else {
        setSubmitError(result.message || "Failed to submit application");
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      resetForm();
      setSubmitSuccess(false);
    }, 300);
  };

  return (
    <>
      {/* ================= CAREERS PAGE ================= */}
      <section className="relative bg-gradient-to-b from-indigo-50 via-violet-50 to-white py-24 overflow-hidden min-h-screen">
        {/* Background blobs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-400/30 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-40 w-[420px] h-[420px] bg-pink-400/30 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* HERO */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="inline-flex px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold mb-6">
              Careers at SageTech
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              Grow Your Career with
              <span className="block bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Innovation & Impact
              </span>
            </h1>

            <p className="text-lg text-gray-700">
              Join a team building next-generation enterprise solutions.
            </p>
          </div>

          {/* ================= OPEN POSITIONS ================= */}
          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">
              Open Positions
            </h2>

            {loading && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
                <p className="text-gray-600">Loading job openings...</p>
              </div>
            )}

            {error && (
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <AlertCircle className="inline-block text-red-500 mb-2" size={24} />
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {!loading && !error && jobs.length === 0 && (
              <div className="text-center p-8 bg-gray-50 rounded-3xl">
                <p className="text-gray-600">No open positions at the moment.</p>
                <p className="text-gray-500 text-sm mt-2">Check back soon or submit your resume for future opportunities.</p>
              </div>
            )}

            <div className="space-y-6">
              {jobs.map((job, index) => (
                <div
                  key={job._id}
                  className="rounded-3xl bg-gradient-to-r from-indigo-50 to-violet-50
                  border border-indigo-100 shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
                >
                  <button
                    onClick={() =>
                      setOpenJob(openJob === index ? null : index)
                    }
                    className="w-full p-6 flex items-center justify-between hover:bg-white/50 rounded-3xl"
                  >
                    <div className="text-left">
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
                        <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs font-medium">
                          {job.experience}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium px-3 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-full">
                        Apply Now
                      </span>
                      {openJob === index ? <ChevronUp className="text-indigo-600" /> : <ChevronDown className="text-gray-500" />}
                    </div>
                  </button>

                  {openJob === index && (
                    <div className="px-6 pb-6 border-t border-indigo-100 pt-6">
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirement.map((req, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => openApplicationModal(job.title)}
                          className="px-6 py-3 rounded-full font-semibold text-white
                          bg-gradient-to-r from-indigo-600 to-pink-600
                          hover:scale-105 transition hover:shadow-lg"
                        >
                          Apply for this Position
                        </button>
                        
                        <button
                          onClick={() => openApplicationModal()}
                          className="px-6 py-3 rounded-full font-semibold border-2 border-indigo-600
                          text-indigo-600 hover:bg-indigo-50 transition"
                        >
                          Submit General Application
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-700 font-medium">Team Members</div>
              <p className="text-gray-500 text-sm mt-2">Across 10+ countries</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-indigo-600 mb-2">20+</div>
              <div className="text-gray-700 font-medium">Years Experience</div>
              <p className="text-gray-500 text-sm mt-2">Enterprise solutions expertise</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-indigo-600 mb-2">99%</div>
              <div className="text-gray-700 font-medium">Retention Rate</div>
              <p className="text-gray-500 text-sm mt-2">Employee satisfaction</p>
            </div>
          </div>

          {/* ================= FINAL CTA ================= */}
          <div className="text-center rounded-3xl p-12 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Didn't find the perfect role?
            </h3>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
              Submit your resume and we'll reach out when a role matches your skills and experience.
            </p>
            <button
              onClick={() => openApplicationModal()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600
              rounded-full font-semibold hover:scale-110 transition hover:shadow-xl text-lg"
            >
              <Send size={20} />
              Submit Your Resume
            </button>
            <p className="text-indigo-200 text-sm mt-4">
              We review all submissions within 48 hours
            </p>
          </div>
        </div>
      </section>

      {/* ================= RESUME MODAL ================= */}
      {showModal && (
        <div
          className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-8
          transition-opacity duration-300 ${modalVisible ? "opacity-100" : "opacity-0"}
          overflow-y-auto`}
          onClick={handleCloseModal}
        >
          <div
            className={`bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative
            transition-all duration-300 ${modalVisible ? "scale-100" : "scale-95"}
            my-auto max-h-[90vh] overflow-hidden flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex-shrink-0 p-6 sm:p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    {applyForJob ? `Apply for: ${applyForJob}` : 'Submit Your Resume'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Fill in your details and upload your resume. You can apply for multiple roles.
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:bg-gray-100 p-2 rounded-full flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="absolute inset-0 bg-white rounded-3xl flex flex-col items-center justify-center p-8 z-10">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                <p className="text-gray-600 text-center mb-6">
                  Thank you for your interest. We'll review your application and get back to you soon.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            )}

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 sm:p-8">
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <AlertCircle size={16} />
                      {submitError}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address *"
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Mobile Number *"
                      className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>

                  {/* DYNAMIC ROLE INPUTS */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Roles Applied For *
                      <span className="text-gray-500 font-normal ml-2">(Add one or multiple roles)</span>
                    </label>
                    
                    <div className="space-y-3">
                      {roles.map((role, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={role}
                            onChange={(e) => handleRoleChange(index, e.target.value)}
                            placeholder={`Role ${index + 1} (e.g., Frontend Developer, Backend Developer)`}
                            className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                          {roles.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeRoleField(index)}
                              className="p-3 text-red-500 hover:bg-red-50 rounded-xl flex-shrink-0"
                              title="Remove role"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      type="button"
                      onClick={addRoleField}
                      className="mt-3 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      <Plus size={16} />
                      Add Another Role
                    </button>
                    
                    {roles.filter(r => r.trim() !== "").length > 0 && (
                      <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                        <p className="text-sm font-medium text-gray-700 mb-2">You're applying for:</p>
                        <div className="flex flex-wrap gap-2">
                          {roles.filter(r => r.trim() !== "").map((role, index) => (
                            <span key={index} className="px-3 py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* FILE UPLOAD */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Upload Resume *
                    </label>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border rounded-xl hover:bg-gray-50">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Upload size={18} className="text-gray-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="text-sm text-gray-600 block truncate">
                            {uploadFileName || "Choose PDF/DOC file (Max 5MB)"}
                          </span>
                          {uploadFileName && (
                            <span className="text-xs text-green-600 font-medium">
                              ✓ Ready to upload
                            </span>
                          )}
                        </div>
                      </div>
                      <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer text-sm font-medium transition-colors whitespace-nowrap">
                        Browse Files
                        <input 
                          type="file" 
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                          required={!uploadFileName}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>

                  <div>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Tell us about your experience, skills, and what you're looking for (optional)"
                      className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full py-3 rounded-full text-white font-semibold flex items-center justify-center gap-2
                      bg-gradient-to-r from-indigo-600 to-pink-600 hover:scale-105 transition text-lg
                      ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          {applyForJob ? 'Apply Now' : 'Submit Resume'}
                        </>
                      )}
                    </button>
                    
                    <p className="text-xs text-gray-500 text-center mt-3">
                      By submitting, you agree to our privacy policy and consent to contact about opportunities.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Careers;