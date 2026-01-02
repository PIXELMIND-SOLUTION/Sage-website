import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "https://apisocial.atozkeysolution.com/api";
const PAGE_SIZE = 5;

const RejectedCampaigns = ({ darkMode }) => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [actionLoading, setActionLoading] = useState(null);

    /* ================= FETCH PENDING CAMPAIGNS ================= */
    const fetchCampaigns = async () => {
        try {
            const res = await axios.get(`${API}/admin/campaigns?isAdmin=true`);
            const pending = (res.data.data || []).filter(
                (c) => c.adminApprovalStatus === "rejected"
            );
            setCampaigns(pending);
        } catch (err) {
            console.error("Failed to fetch campaign requests", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    /* ================= APPROVE / REJECT ================= */
    const reviewCampaign = async (id, status) => {
        if (
            !window.confirm(
                `Are you sure you want to ${status} this campaign?`
            )
        )
            return;

        try {
            setActionLoading(id);

            await axios.put(`${API}/admin/campaigns/${id}/review`, {
                status,
                isAdmin: "true"
            });

            await fetchCampaigns(); // refresh list
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Failed to update campaign status"
            );
        } finally {
            setActionLoading(null);
        }
    };

    /* ================= FILTER ================= */
    const filtered = useMemo(() => {
        return campaigns.filter((c) => {
            const text = `${c.userId?.fullName} ${c.userId?.email}`.toLowerCase();
            return text.includes(search.toLowerCase());
        });
    }, [campaigns, search]);

    /* ================= PAGINATION ================= */
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );

    useEffect(() => setPage(1), [search]);

    if (loading) {
        return (
            <div className="p-10 text-center text-gray-500">
                Loading campaign requests…
            </div>
        );
    }

    return (
        <div className={`p-4 md:p-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <div
                className={`max-w-7xl mx-auto rounded-2xl shadow p-6
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
            >
                <h1 className="text-2xl font-bold mb-6">
                    📝 Campaign Requests (Rejected)
                </h1>

                {/* SEARCH */}
                <div className="mb-6">
                    <input
                        placeholder="Search by user name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/2 px-4 py-2 rounded-lg border"
                    />
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className={darkMode ? "bg-gray-700" : "bg-gray-100"}>
                            <tr>
                                <th className="p-3 text-left">S NO</th>
                                <th className="p-3 text-left">User</th>
                                <th className="p-3 text-left">Package</th>
                                <th className="p-3 text-left">Payment</th>
                                <th className="p-3 text-left">Created</th>
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
                        ${c.purchasedPackage?.paymentStatus === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {c.purchasedPackage?.paymentStatus}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        {new Date(c.createdAt).toLocaleDateString()}
                                    </td>


                                </tr>
                            ))}

                            {paginated.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-6 text-center text-gray-500"
                                    >
                                        No pending campaign requests
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
                  ${page === i + 1
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

export default RejectedCampaigns;
