import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://apisocial.atozkeysolution.com/api";
const PAGE_SIZE = 10;

const AdminCampaigns = ({ darkMode }) => {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [actionType, setActionType] = useState(null); // approved | rejected
  const [notes, setNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`${API}/admin/campaigns?isAdmin=true`);
      setCampaigns(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch campaigns", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return campaigns.filter((c) => {
      const text =
        `${c.userId?.fullName} ${c.userId?.email}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        c.adminApprovalStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [campaigns, search, statusFilter]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  useEffect(() => setPage(1), [search, statusFilter]);

  /* ================= OPEN MODAL ================= */
  const openModal = (campaign, type) => {
    setSelectedCampaign(campaign);
    setActionType(type);
    setNotes("");
    setModalOpen(true);
  };

  /* ================= SUBMIT REVIEW ================= */
  const submitReview = async () => {
    if (!notes.trim()) {
      alert("Please enter a reason");
      return;
    }

    try {
      setActionLoading(true);
      await axios.put(
        `${API}/admin/campaigns/${selectedCampaign._id}/review`,
        {
          status: actionType,
          notes,
          isAdmin: "true"
        }
      );

      setModalOpen(false);
      setSelectedCampaign(null);
      fetchCampaigns();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading campaigns…
      </div>
    );
  }

  return (
    <div className={`p-4 md:p-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div
        className={`max-w-7xl mx-auto rounded-2xl shadow p-6
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
      >
        <h1 className="text-2xl font-bold mb-6">📢 Campaign Management</h1>

        {/* FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            placeholder="Search by user / email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className={darkMode ? "bg-gray-700" : "bg-gray-100"}>
              <tr>
                <th className="p-3 text-left">S.NO</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3">Package</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((c, index) => (
                <tr key={c._id} className="border-t">
                  <td className="p-3">
                    {(page - 1) * PAGE_SIZE + index + 1}
                  </td>

                  <td className="p-3">
                    <div className="font-medium">
                      {c.userId?.fullName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {c.userId?.email}
                    </div>
                  </td>

                  <td className="p-3">
                    {c.purchasedPackage?.packageName}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs
                        ${
                          c.adminApprovalStatus === "approved"
                            ? "bg-green-100 text-green-700"
                            : c.adminApprovalStatus === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {c.adminApprovalStatus}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2 flex-wrap">
                      <button
                        onClick={() =>
                          navigate(`/admin/campaigns/${c._id}`)
                        }
                        className="px-3 py-1 text-xs rounded bg-indigo-600 text-white"
                      >
                        View
                      </button>

                      {c.adminApprovalStatus === "pending" && (
                        <>
                          <button
                            onClick={() => openModal(c, "approved")}
                            className="px-3 py-1 text-xs rounded bg-green-600 text-white"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => openModal(c, "rejected")}
                            className="px-3 py-1 text-xs rounded bg-red-600 text-white"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No campaigns found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded
                  ${
                    page === i + 1
                      ? "bg-indigo-600 text-white"
                      : "border"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ===== MODAL ===== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div
            className={`w-full max-w-md rounded-xl p-6
            ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
          >
            <h2 className="text-lg font-bold mb-4">
              {actionType === "approved"
                ? "Approve Campaign"
                : "Reject Campaign"}
            </h2>

            <textarea
              placeholder="Enter reason..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-lg border mb-4"
              rows={4}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>

              <button
                onClick={submitReview}
                disabled={actionLoading}
                className={`px-4 py-2 rounded text-white
                  ${
                    actionType === "approved"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
              >
                {actionLoading ? "Processing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCampaigns;
