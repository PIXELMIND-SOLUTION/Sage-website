import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  FiEdit,
  FiTrash2,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
  FiMapPin,
  FiX
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const USERS_PER_PAGE = 8;

const UserList = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  /* Location Modal */
  const [openLocation, setOpenLocation] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://31.97.206.144:9174/api/auth/users"
      );
      setUsers(res.data?.users || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= SEARCH ================= */
  const filteredUsers = useMemo(() => {
    const value = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(value) ||
        u.email?.toLowerCase().includes(value) ||
        u.mobile?.includes(value)
    );
  }, [search, users]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(start, start + USERS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ================= DELETE USER ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `https://apisocial.atozkeysolution.com/api/user/${id}`
      );
      fetchUsers();
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  /* ================= OPEN LOCATION MODAL ================= */
  const openLocationModal = (user) => {
    setSelectedUser(user);
    setLatitude(user.location?.coordinates?.[1] || "");
    setLongitude(user.location?.coordinates?.[0] || "");
    setOpenLocation(true);
  };

  /* ================= UPDATE LOCATION ================= */
  const updateLocation = async () => {
    if (!latitude || !longitude) {
      alert("Latitude & Longitude required");
      return;
    }

    try {
      setSaving(true);
      await axios.put(
        `http://31.97.206.144:9174/api/auth/update-location/${selectedUser._id}`,
        {
          latitude: Number(latitude),
          longitude: Number(longitude)
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      setOpenLocation(false);
      fetchUsers();
    } catch (err) {
      alert("Failed to update location");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`p-4 md:p-6 min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl shadow-lg p-5 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-600">
            Users Management
          </h1>

          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border
              focus:ring-2 focus:ring-blue-500 outline-none
              dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    Loading users...
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-t dark:border-gray-700
                    hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-3">
                      {(currentPage - 1) * USERS_PER_PAGE + index + 1}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {user.name || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {user.email || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {user.mobile || "-"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => navigate(`/admin/users/${user._id}`)}
                          className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                        >
                          <FiInfo />
                        </button>

                        <button
                          onClick={() => navigate(`/admin/users/update/${user._id}`)}
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                        >
                          <FiEdit />
                        </button>

                        <button
                          onClick={() => openLocationModal(user)}
                          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                        >
                          <FiMapPin />
                        </button>

                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2 rounded-lg border disabled:opacity-40"
              >
                <FiChevronLeft />
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 rounded-lg border disabled:opacity-40"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= LOCATION MODAL ================= */}
      {openLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className={`w-full max-w-md rounded-2xl shadow-xl p-6
            ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Update Location</h3>
              <button onClick={() => setOpenLocation(false)}>
                <FiX />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="number"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full rounded-xl px-4 py-2 border outline-none
                dark:bg-gray-700 dark:border-gray-600"
              />

              <input
                type="number"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full rounded-xl px-4 py-2 border outline-none
                dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenLocation(false)}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={updateLocation}
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
