import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiImage,
  FiSave
} from "react-icons/fi";

const EditUser = ({ darkMode }) => {
  const { id } = useParams(); // ✅ userId from URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH USER BY ID ================= */
  const fetchUser = async () => {
    try {
      setFetching(true);
      const res = await axios.get(
        `http://31.97.206.144:9174/api/auth/profile/${id}`
      );

      const user = res.data.user;
      setName(user?.name || "");
      setEmail(user?.email || "");
      setPreview(user?.profileImage || "");
    } catch (err) {
      setError("Failed to fetch user profile");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  /* ================= UPDATE USER ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("Name and Email are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token missing");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await axios.put(
        "http://31.97.206.144:9174/api/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      navigate(-1);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING STATE ================= */
  if (fetching) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <p className="text-lg font-medium text-gray-500">
          Loading user data...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 md:p-6 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto rounded-2xl shadow-xl overflow-hidden
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
          <h1 className="text-xl font-bold text-blue-600">
            Edit User
          </h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleUpdate} className="p-6 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-100 text-red-700">
              {error}
            </div>
          )}

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={profileImage || preview || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />

            <label className="cursor-pointer flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <FiImage />
              Change Profile Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfileImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl border outline-none
                  ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white"
                  }`}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl border outline-none
                  ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white"
                  }`}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl
                bg-blue-600 text-white hover:bg-blue-700
                disabled:opacity-50"
            >
              <FiSave />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
