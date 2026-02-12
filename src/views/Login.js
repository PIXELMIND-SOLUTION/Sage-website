import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/Images/Hero/logo.png"; // update path if needed

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);

    const ADMIN_EMAIL = "admin@nectarsolutions.com";
    const ADMIN_PASSWORD = "adminnectar@1";

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            sessionStorage.setItem("isAdminAuth", "true");
            navigate("/dashboard");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#071414] px-4">

            {/* PREMIUM GLOW BACKGROUND */}
            <div className="absolute w-[500px] h-[500px] bg-teal-500/20 blur-[140px] rounded-full top-[-100px] left-[-100px]" />
            <div className="absolute w-[400px] h-[400px] bg-emerald-400/10 blur-[120px] rounded-full bottom-[-120px] right-[-120px]" />

            {/* LOGIN CARD */}
            <div className="relative w-full max-w-md backdrop-blur-3xl bg-white/5 border border-teal-400/20 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] p-8 sm:p-10">

                {/* LOGO + TITLE */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-32 mb-4 drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]"
                    />

                    <h1 className="text-3xl font-bold text-white tracking-wide">
                        Admin Portal
                    </h1>

                    <p className="text-teal-300/60 text-sm mt-2">
                        Secure access to Nectar Solutions
                    </p>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="mb-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* FORM */}
                <form onSubmit={handleLogin} className="space-y-5">

                    {/* EMAIL */}
                    <div>
                        <label className="text-xs uppercase tracking-widest text-teal-300/70">
                            Corporate Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="
              mt-2 w-full h-12 px-4 rounded-xl
              bg-[#031111]
              border border-teal-900/60
              text-white
              placeholder-teal-900
              focus:outline-none
              focus:border-teal-400
              focus:ring-1 focus:ring-teal-400
              transition
              "
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="text-xs uppercase tracking-widest text-teal-300/70">
                            Password
                        </label>

                        <div className="relative mt-2">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="
                w-full h-12 px-4 rounded-xl
                bg-[#031111]
                border border-teal-900/60
                text-white
                placeholder-teal-900
                focus:outline-none
                focus:border-teal-400
                focus:ring-1 focus:ring-teal-400
                transition
                "
                            />

                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 top-3 text-teal-400 text-sm hover:text-teal-200"
                            >
                                {showPass ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button className="relative w-full mt-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500 blur-lg opacity-40 rounded-xl"></div>

                        <div
                            className="
              relative h-12 rounded-xl
              bg-gradient-to-r from-teal-400 to-emerald-500
              font-semibold
              text-[#042222]
              hover:scale-[1.02]
              active:scale-[0.98]
              transition
              "
                        >
                            Login to Dashboard
                        </div>
                    </button>
                </form>

                {/* FOOTER */}
                <p className="text-center text-xs text-teal-300/40 mt-8">
                    © 2026 Nectar Solutions. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
