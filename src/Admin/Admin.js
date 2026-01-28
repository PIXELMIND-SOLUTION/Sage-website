import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Loader2,
  Briefcase,
  FileText,
  Mail,
  Eye,
  MapPin,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  User,
  Phone,
  Calendar,
  Building,
  Globe,
  Filter,
  FileDown,
} from "lucide-react";

const API_BASE = "http://31.97.206.144:7127/api/positions";
const API_DOWNLOAD = "http://31.97.206.144:7127";
const PAGE_SIZE = 5;

const emptyForm = {
  title: "",
  location: "",
  type: "",
  experience: "",
  description: "",
  requirement: [""],
};

const emptyResumeForm = {
  fullName: "",
  email: "",
  mobile: "",
  roles: [""],
  description: "",
  resumeFile: null,
};

const emptyContactForm = {
  fullName: "",
  companyName: "",
  mobile: "",
  email: "",
  country: "",
  areaOfInterest: "",
  heardAboutUs: "",
  description: "",
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState("careers");
  const [positions, setPositions] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  /* pagination + filters */
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  /* resume pagination + filters */
  const [resumePage, setResumePage] = useState(1);
  const [resumeSearch, setResumeSearch] = useState("");

  /* contact pagination + filters */
  const [contactPage, setContactPage] = useState(1);
  const [contactSearch, setContactSearch] = useState("");
  const [contactInterestFilter, setContactInterestFilter] = useState("");
  const [contactHeardAboutFilter, setContactHeardAboutFilter] = useState("");

  /* modals */
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [viewModal, setViewModal] = useState(false);
  const [viewData, setViewData] = useState(null);

  /* resume modals */
  const [viewResumeModal, setViewResumeModal] = useState(false);
  const [resumeViewData, setResumeViewData] = useState(null);
  const [resumeEditModal, setResumeEditModal] = useState(false);
  const [resumeEditId, setResumeEditId] = useState(null);
  const [resumeEditForm, setResumeEditForm] = useState(emptyResumeForm);

  /* contact modals */
  const [viewContactModal, setViewContactModal] = useState(false);
  const [contactViewData, setContactViewData] = useState(null);
  const [contactEditModal, setContactEditModal] = useState(false);
  const [contactEditId, setContactEditId] = useState(null);
  const [contactEditForm, setContactEditForm] = useState(emptyContactForm);

  /* ================= FETCH ALL ================= */
  const fetchPositions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/all`);
      const data = await res.json();
      if (data.success) setPositions(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/all-resumes`);
      const data = await res.json();
      if (data.success) setResumes(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/all-contacts`);
      const data = await res.json();
      if (data.success) setContacts(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "careers") fetchPositions();
    if (activeTab === "resumes") fetchResumes();
    if (activeTab === "contacts") fetchContacts();
  }, [activeTab]);

  /* ================= GET UNIQUE FILTER VALUES ================= */
  const getUniquePositionTypes = () => {
    const types = positions.map(p => p.type).filter(Boolean);
    return [...new Set(types)];
  };

  const getUniqueContactInterests = () => {
    const interests = contacts.map(c => c.areaOfInterest).filter(Boolean);
    return [...new Set(interests)];
  };

  const getUniqueContactSources = () => {
    const sources = contacts.map(c => c.heardAboutUs).filter(Boolean);
    return [...new Set(sources)];
  };

  /* ================= SEARCH + FILTER ================= */
  const filteredPositions = positions.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());

    const matchType = typeFilter ? p.type === typeFilter : true;
    return matchSearch && matchType;
  });

  const filteredResumes = resumes.filter((r) => {
    return (
      r.fullName.toLowerCase().includes(resumeSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(resumeSearch.toLowerCase()) ||
      r.mobile.toLowerCase().includes(resumeSearch.toLowerCase()) ||
      r.roles.some(role => 
        role.toLowerCase().includes(resumeSearch.toLowerCase())
      )
    );
  });

  const filteredContacts = contacts.filter((c) => {
    const matchSearch =
      c.fullName.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.companyName.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.mobile.toLowerCase().includes(contactSearch.toLowerCase());

    const matchInterest = contactInterestFilter 
      ? c.areaOfInterest === contactInterestFilter 
      : true;

    const matchSource = contactHeardAboutFilter
      ? c.heardAboutUs === contactHeardAboutFilter
      : true;

    return matchSearch && matchInterest && matchSource;
  });

  const totalPages = Math.ceil(filteredPositions.length / PAGE_SIZE);
  const paginatedPositions = filteredPositions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const totalResumePages = Math.ceil(filteredResumes.length / PAGE_SIZE);
  const paginatedResumes = filteredResumes.slice(
    (resumePage - 1) * PAGE_SIZE,
    resumePage * PAGE_SIZE
  );

  const totalContactPages = Math.ceil(filteredContacts.length / PAGE_SIZE);
  const paginatedContacts = filteredContacts.slice(
    (contactPage - 1) * PAGE_SIZE,
    contactPage * PAGE_SIZE
  );

  /* ================= FORM ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRequirementChange = (i, value) => {
    const req = [...form.requirement];
    req[i] = value;
    setForm({ ...form, requirement: req });
  };

  const addRequirement = () =>
    setForm({ ...form, requirement: [...form.requirement, ""] });

  const removeRequirement = (i) =>
    setForm({
      ...form,
      requirement: form.requirement.filter((_, idx) => idx !== i),
    });

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      requirement: form.requirement.filter(Boolean),
    };

    const url = isEdit
      ? `${API_BASE}/update/${currentId}`
      : `${API_BASE}/create`;

    await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setShowModal(false);
    setForm(emptyForm);
    setIsEdit(false);
    fetchPositions();
  };

  /* ================= EDIT ================= */
  const handleEdit = async (id) => {
    const res = await fetch(`${API_BASE}/get/${id}`);
    const data = await res.json();
    if (data.success) {
      setForm(data.data);
      setCurrentId(id);
      setIsEdit(true);
      setShowModal(true);
    }
  };

  /* ================= VIEW ================= */
  const handleView = async (id) => {
    const res = await fetch(`${API_BASE}/get/${id}`);
    const data = await res.json();
    if (data.success) {
      setViewData(data.data);
      setViewModal(true);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this position?")) return;
    await fetch(`${API_BASE}/delete/${id}`, { method: "DELETE" });
    fetchPositions();
  };

  /* ================= RESUME FUNCTIONS ================= */
  const handleViewResume = async (id) => {
    const res = await fetch(`${API_BASE}/resume/${id}`);
    const data = await res.json();
    if (data.success) {
      setResumeViewData(data.data);
      setViewResumeModal(true);
    }
  };

  const handleEditResume = async (id) => {
    const res = await fetch(`${API_BASE}/resume/${id}`);
    const data = await res.json();
    if (data.success) {
      setResumeEditForm({
        fullName: data.data.fullName,
        email: data.data.email,
        mobile: data.data.mobile,
        roles: data.data.roles,
        description: data.data.description,
        resumeFile: null,
      });
      setResumeEditId(id);
      setResumeEditModal(true);
    }
  };

  const handleResumeEditChange = (e) => {
    if (e.target.name === "resumeFile") {
      setResumeEditForm({ ...resumeEditForm, resumeFile: e.target.files[0] });
    } else {
      setResumeEditForm({ ...resumeEditForm, [e.target.name]: e.target.value });
    }
  };

  const handleRoleChange = (i, value) => {
    const roles = [...resumeEditForm.roles];
    roles[i] = value;
    setResumeEditForm({ ...resumeEditForm, roles });
  };

  const addRole = () => setResumeEditForm({ 
    ...resumeEditForm, 
    roles: [...resumeEditForm.roles, ""] 
  });

  const removeRole = (i) => setResumeEditForm({
    ...resumeEditForm,
    roles: resumeEditForm.roles.filter((_, idx) => idx !== i),
  });

  const handleResumeUpdate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("fullName", resumeEditForm.fullName);
    if (resumeEditForm.resumeFile) {
      formData.append("resume", resumeEditForm.resumeFile);
    }

    try {
      await fetch(`${API_BASE}/updateresume/${resumeEditId}`, {
        method: "PUT",
        body: formData,
      });
      
      setResumeEditModal(false);
      setResumeEditForm(emptyResumeForm);
      setResumeEditId(null);
      fetchResumes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteResume = async (id) => {
    if (!window.confirm("Delete this resume submission?")) return;
    
    try {
      const res = await fetch(`${API_BASE}/deleteresume/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        fetchResumes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CONTACT FUNCTIONS ================= */
  const handleViewContact = async (id) => {
    const res = await fetch(`${API_BASE}/contact/${id}`);
    const data = await res.json();
    if (data.success) {
      setContactViewData(data.data);
      setViewContactModal(true);
    }
  };

  const handleEditContact = async (id) => {
    const res = await fetch(`${API_BASE}/contact/${id}`);
    const data = await res.json();
    if (data.success) {
      setContactEditForm({
        fullName: data.data.fullName,
        companyName: data.data.companyName,
        mobile: data.data.mobile,
        email: data.data.email,
        country: data.data.country,
        areaOfInterest: data.data.areaOfInterest,
        heardAboutUs: data.data.heardAboutUs,
        description: data.data.description,
      });
      setContactEditId(id);
      setContactEditModal(true);
    }
  };

  const handleContactEditChange = (e) => {
    setContactEditForm({ ...contactEditForm, [e.target.name]: e.target.value });
  };

  const handleContactUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${API_BASE}/update-contact/${contactEditId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactEditForm),
      });
      
      if (res.ok) {
        setContactEditModal(false);
        setContactEditForm(emptyContactForm);
        setContactEditId(null);
        fetchContacts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Delete this contact form submission?")) return;
    
    try {
      const res = await fetch(`${API_BASE}/delete-contact/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        fetchContacts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= EXPORT FUNCTIONS ================= */
  const exportContactsToCSV = () => {
    if (filteredContacts.length === 0) {
      alert("No contacts to export");
      return;
    }

    const headers = [
      "Full Name",
      "Company Name", 
      "Email",
      "Mobile",
      "Country",
      "Area of Interest",
      "Heard About Us",
      "Description",
      "Submitted Date"
    ];

    const csvData = filteredContacts.map(contact => [
      `"${contact.fullName}"`,
      `"${contact.companyName}"`,
      `"${contact.email}"`,
      `"${contact.mobile}"`,
      `"${contact.country}"`,
      `"${contact.areaOfInterest}"`,
      `"${contact.heardAboutUs}"`,
      `"${contact.description}"`,
      `"${new Date(contact.createdAt).toLocaleDateString()}"`
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `contacts_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadResume = (resumePath) => {
    const fileName = resumePath.split("\\").pop();
    const downloadUrl = `${API_DOWNLOAD}/${resumePath}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto p-8 mt-8">
      {/* ================= NAV ================= */}
      <div className="flex gap-4 my-8">
        {[
          { key: "careers", label: "Careers", icon: Briefcase },
          { key: "resumes", label: "Resume Submissions", icon: FileText },
          { key: "contacts", label: "Contact Forms", icon: Mail },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => {
                setActiveTab(t.key);
                setPage(1);
                setResumePage(1);
                setContactPage(1);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold ${
                activeTab === t.key
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Icon size={18} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* ================= CAREERS ================= */}
      {activeTab === "careers" && (
        <>
          {/* Top Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Search positions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-xl"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border rounded-xl"
              >
                <option value="">All Types</option>
                {getUniquePositionTypes().map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setForm(emptyForm);
                setIsEdit(false);
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl"
            >
              <Plus size={18} /> Add Position
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow border overflow-x-auto">
            {loading ? (
              <div className="p-10 flex justify-center">
                <Loader2 className="animate-spin text-indigo-600" />
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4 text-left">Title</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Experience</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPositions.map((p, index) => (
                    <tr key={p._id} className="border-t">
                      <td className="p-4 text-gray-500">
                        {(page - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="p-4 font-medium">{p.title}</td>
                      <td className="p-4">{p.location}</td>
                      <td className="p-4">{p.type}</td>
                      <td className="p-4">{p.experience}</td>
                      <td className="p-4 flex justify-end gap-2">
                        <button
                          onClick={() => handleView(p._id)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(p._id)}
                          className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages || 1}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}

      {/* ================= RESUMES ================= */}
      {activeTab === "resumes" && (
        <>
          {/* Top Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Search resumes..."
                  value={resumeSearch}
                  onChange={(e) => setResumeSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow border overflow-x-auto">
            {loading ? (
              <div className="p-10 flex justify-center">
                <Loader2 className="animate-spin text-indigo-600" />
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4 text-left">Full Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Mobile</th>
                    <th className="p-4">Roles</th>
                    <th className="p-4">Submitted</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedResumes.map((r, index) => (
                    <tr key={r._id} className="border-t">
                      <td className="p-4 text-gray-500">
                        {(resumePage - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="p-4 font-medium">{r.fullName}</td>
                      <td className="p-4">{r.email}</td>
                      <td className="p-4">{r.mobile}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {r.roles.slice(0, 2).map((role, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
                              {role}
                            </span>
                          ))}
                          {r.roles.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                              +{r.roles.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-xs text-gray-500">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        <button
                          onClick={() => handleViewResume(r._id)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => downloadResume(r.resumeFile)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                          title="Download Resume"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => handleEditResume(r._id)}
                          className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteResume(r._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              disabled={resumePage === 1}
              onClick={() => setResumePage((p) => p - 1)}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <span className="px-4 py-2">
              Page {resumePage} of {totalResumePages || 1}
            </span>
            <button
              disabled={resumePage === totalResumePages}
              onClick={() => setResumePage((p) => p + 1)}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}

      {/* ================= CONTACTS ================= */}
      {activeTab === "contacts" && (
        <>
          {/* Top Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Search contacts..."
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-xl"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select
                  value={contactInterestFilter}
                  onChange={(e) => setContactInterestFilter(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-xl"
                >
                  <option value="">All Interests</option>
                  {getUniqueContactInterests().map((interest, idx) => (
                    <option key={idx} value={interest}>{interest}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select
                  value={contactHeardAboutFilter}
                  onChange={(e) => setContactHeardAboutFilter(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-xl"
                >
                  <option value="">All Sources</option>
                  {getUniqueContactSources().map((source, idx) => (
                    <option key={idx} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={exportContactsToCSV}
              className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              <FileDown size={18} /> Export Contacts
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow border overflow-x-auto">
            {loading ? (
              <div className="p-10 flex justify-center">
                <Loader2 className="animate-spin text-indigo-600" />
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4 text-left">Full Name</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Mobile</th>
                    <th className="p-4">Interest</th>
                    <th className="p-4">Submitted</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedContacts.map((c, index) => (
                    <tr key={c._id} className="border-t">
                      <td className="p-4 text-gray-500">
                        {(contactPage - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="p-4 font-medium">{c.fullName}</td>
                      <td className="p-4">{c.companyName}</td>
                      <td className="p-4">{c.email}</td>
                      <td className="p-4">{c.mobile}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                          {c.areaOfInterest}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-gray-500">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        <button
                          onClick={() => handleViewContact(c._id)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditContact(c._id)}
                          className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(c._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              disabled={contactPage === 1}
              onClick={() => setContactPage((p) => p - 1)}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <span className="px-4 py-2">
              Page {contactPage} of {totalContactPages || 1}
            </span>
            <button
              disabled={contactPage === totalContactPages}
              onClick={() => setContactPage((p) => p + 1)}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}

      {/* ================= VIEW MODAL ================= */}
      {viewModal && viewData && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setViewModal(false)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-3xl p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X />
            </button>

            <h3 className="text-2xl font-bold mb-2">{viewData.title}</h3>

            <div className="flex gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {viewData.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {viewData.type}
              </span>
              <span>{viewData.experience}</span>
            </div>

            <p className="text-gray-700 mb-4">{viewData.description}</p>

            <h4 className="font-semibold mb-2">Requirements</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {viewData.requirement.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ================= RESUME VIEW MODAL ================= */}
      {viewResumeModal && resumeViewData && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setViewResumeModal(false)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-3xl p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewResumeModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <User size={24} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{resumeViewData.fullName}</h3>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Mail size={14} /> {resumeViewData.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={14} /> {resumeViewData.mobile}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> 
                    {new Date(resumeViewData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Roles Applied For</h4>
              <div className="flex flex-wrap gap-2">
                {resumeViewData.roles.map((role, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-700">{resumeViewData.description}</p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Resume File</h4>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-gray-500" />
                  <span className="text-sm">
                    {resumeViewData.resumeFile.split("\\").pop()}
                  </span>
                </div>
                <button
                  onClick={() => downloadResume(resumeViewData.resumeFile)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                  <Download size={16} /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTACT VIEW MODAL ================= */}
      {viewContactModal && contactViewData && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setViewContactModal(false)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-3xl p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewContactModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{contactViewData.fullName}</h3>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building size={14} /> {contactViewData.companyName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={14} /> {contactViewData.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> 
                    {new Date(contactViewData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold text-sm mb-1">Mobile</h4>
                <p className="text-gray-700">{contactViewData.mobile}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Country</h4>
                <p className="text-gray-700 flex items-center gap-1">
                  <Globe size={14} /> {contactViewData.country}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Area of Interest</h4>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                  {contactViewData.areaOfInterest}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Heard About Us</h4>
                <p className="text-gray-700">{contactViewData.heardAboutUs}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                {contactViewData.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= CREATE / EDIT MODAL ================= */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white max-w-xl w-full rounded-3xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X />
            </button>

            <h3 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Position" : "Create Position"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {["title", "location", "type", "experience"].map((f) => (
                <input
                  key={f}
                  name={f}
                  value={form[f]}
                  onChange={handleChange}
                  placeholder={f.toUpperCase()}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ))}

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                placeholder="Description"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div>
                <label className="font-semibold text-sm">Requirements</label>
                {form.requirement.map((req, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <input
                      value={req}
                      onChange={(e) =>
                        handleRequirementChange(i, e.target.value)
                      }
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {form.requirement.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeRequirement(i)}
                        className="p-2 hover:bg-gray-100 rounded"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRequirement}
                  className="text-indigo-600 text-sm mt-2 hover:text-indigo-700"
                >
                  + Add Requirement
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 font-semibold"
              >
                {isEdit ? "Update Position" : "Create Position"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= RESUME EDIT MODAL ================= */}
      {resumeEditModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setResumeEditModal(false)}
        >
          <div
            className="bg-white max-w-xl w-full rounded-3xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setResumeEditModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X />
            </button>

            <h3 className="text-xl font-bold mb-4">Edit Resume Submission</h3>

            <form onSubmit={handleResumeUpdate} className="space-y-4">
              {["fullName", "email", "mobile", "description"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={resumeEditForm[field]}
                  onChange={handleResumeEditChange}
                  placeholder={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ))}

              <div>
                <label className="font-semibold text-sm">Roles Applied For</label>
                {resumeEditForm.roles.map((role, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <input
                      value={role}
                      onChange={(e) => handleRoleChange(i, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {resumeEditForm.roles.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeRole(i)}
                        className="p-2 hover:bg-gray-100 rounded"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRole}
                  className="text-indigo-600 text-sm mt-2 hover:text-indigo-700"
                >
                  + Add Role
                </button>
              </div>

              <div>
                <label className="font-semibold text-sm">Update Resume File (Optional)</label>
                <input
                  type="file"
                  name="resumeFile"
                  onChange={handleResumeEditChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to keep current resume file
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 font-semibold"
              >
                Update Resume
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= CONTACT EDIT MODAL ================= */}
      {contactEditModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setContactEditModal(false)}
        >
          <div
            className="bg-white max-w-xl w-full rounded-3xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setContactEditModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X />
            </button>

            <h3 className="text-xl font-bold mb-4">Edit Contact Form</h3>

            <form onSubmit={handleContactUpdate} className="space-y-4">
              {["fullName", "companyName", "mobile", "email", "country", "areaOfInterest", "heardAboutUs"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={contactEditForm[field]}
                  onChange={handleContactEditChange}
                  placeholder={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ))}

              <textarea
                name="description"
                value={contactEditForm.description}
                onChange={handleContactEditChange}
                rows="3"
                placeholder="Description"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 font-semibold"
              >
                Update Contact Form
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;