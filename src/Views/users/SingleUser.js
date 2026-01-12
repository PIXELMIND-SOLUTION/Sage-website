import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiUser,
  FiMapPin,
  FiHeart
} from "react-icons/fi";

const SingleUser = ({ darkMode }) => {
  const { id } = useParams(); // userId from route
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH USER ================= */
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://31.97.206.144:9174/api/auth/profile/${id}`
      );
      setUser(res.data.user);
    } catch (err) {
      setError("Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <p className="text-lg font-medium text-gray-500">Loading user...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 md:p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div
        className={`max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden
          ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 px-6 py-4 border-b dark:border-gray-700">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiArrowLeft />
          </button>
          <h1 className="text-xl font-bold text-blue-600">User Profile</h1>
        </div>

        {/* PROFILE */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

            {/* PROFILE IMAGE */}
            <div className="flex-shrink-0">
              <img
                src={user.profileImage || "https://via.placeholder.com/150"}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
            </div>

            {/* USER INFO */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <InfoCard icon={<FiUser />} label="Name" value={user.name || "-"} />
              <InfoCard icon={<FiMail />} label="Email" value={user.email || "-"} />
              <InfoCard icon={<FiPhone />} label="Mobile" value={user.mobile || "-"} />
              <InfoCard
                icon={<FiUser />}
                label="Role"
                value={user.role || "-"}
              />
              <InfoCard
                icon={<FiHeart />}
                label="Wishlist Items"
                value={user.wishlist?.length || 0}
              />
              <InfoCard
                icon={<FiMapPin />}
                label="Location"
                value={
                  user.location?.coordinates
                    ? `${user.location.coordinates[1]}, ${user.location.coordinates[0]}`
                    : "N/A"
                }
              />
            </div>
          </div>

          {/* STATUS */}
          <div className="mt-6 flex items-center gap-3">
            <span className="font-medium">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold
                ${user.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"}`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* TIMESTAMPS */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div>
              <span className="font-medium">Created At:</span>{" "}
              {new Date(user.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Updated At:</span>{" "}
              {new Date(user.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;

/* ================= SMALL UI COMPONENT ================= */

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl border dark:border-gray-700">
    <div className="text-blue-600 text-lg">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);
