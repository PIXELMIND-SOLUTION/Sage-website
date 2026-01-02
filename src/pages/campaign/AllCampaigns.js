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

  /* ================= FETCH ================= */
  useEffect(() => {
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

    fetchCampaigns();
  }, []);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return campaigns.filter((c) => {
      const text =
        `${c.fullName} ${c.email} ${c.userId?.fullName}`.toLowerCase();

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

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading campaigns…</div>
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
                <th className="p-3 text-left">S NO</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3">Package</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr key={c._id} className="border-t">
                    <td className="p-3">
                    {(page - 1) * PAGE_SIZE + paginated.indexOf(c) + 1}
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
                    <button
                      onClick={() =>
                        navigate(`/admin/campaigns/${c._id}`)
                      }
                      className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
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
    </div>
  );
};

export default AdminCampaigns;
