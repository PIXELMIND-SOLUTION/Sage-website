import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://31.97.206.144:9174/api/Admin/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.success) {
        // Store token & admin flag
        sessionStorage.setItem("adminToken", res.data.token);
        sessionStorage.setItem("AdminData", JSON.stringify(res.data.admin));
        sessionStorage.setItem("isAdmin", "true");

        navigate("/admin");
      } else {
        setError(res.data?.message || "Login failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-orange-600">
            Admin Login
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to access admin panel
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-600
            bg-red-100 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative mt-1">
              <FiMail className="absolute left-3 top-3 text-orange-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin123@gmail.com"
                className="w-full pl-10 pr-4 py-2.5
                  border border-gray-300 rounded-xl
                  focus:ring-2 focus:ring-orange-400
                  focus:outline-none transition"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-3 text-orange-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5
                  border border-gray-300 rounded-xl
                  focus:ring-2 focus:ring-orange-400
                  focus:outline-none transition"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2
              bg-gradient-to-r from-orange-500 to-orange-600
              text-white py-3 rounded-xl font-semibold
              hover:opacity-90 transition-all
              active:scale-95 disabled:opacity-50"
          >
            <FiLogIn size={18} />
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Login;
