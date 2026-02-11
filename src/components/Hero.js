// components/Hero.jsx
import React, { useEffect, useState } from "react";
import { ArrowRight, Play, Award, Users, TrendingUp } from "lucide-react";
import hero from "../Assets/Images/Hero/banner2.png";
import banner from "../Assets/videos/banner.mp4";

/**
 * Assumption:
 * Header height ≈ 96px
 * We add SMALL top padding inside slides (pt-10)
 */
const HERO_HEIGHT = "min-h-[calc(100vh-96px)]";

const slides = [
    {
        id: 1,
        type: "content",
        badge: "Enterprise Technology Experts",
        title: "Powering Secure & Scalable ",
        highlight: "Digital Enterprises",
        description:
            "We deliver enterprise-grade Networking, Cyber Security, Data Engineering, and Cloud solutions that help organizations modernize infrastructure, secure digital assets, and scale with confidence.",
        stats: [
            {
                value: "20+",
                label: "Years Experience",
                icon: Award,
            },
            {
                value: "500+",
                label: "Enterprise Clients",
                icon: Users,
            },
            {
                value: "99%",
                label: "Client Retention",
                icon: TrendingUp,
            },
        ],
    },
    {
        id: 2,
        type: "banner",
        background: hero,
        title: "Secure. Connect. Scale.",
        description:
            "End-to-end Networking, Cloud, Cyber Security, and Data Engineering solutions designed for modern, high-performing enterprises.",
        ctaPrimary: "Explore Solutions",
        ctaSecondary: "Talk to Experts",
    },
    {
        id: 3,
        type: "video",
        video: banner,
        title: "Enterprise Capabilities in Action",
        description:
            "Discover how we help organizations strengthen security, unlock data value, modernize networks, and accelerate cloud adoption.",
    },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${HERO_HEIGHT} flex items-center pt-10 transition-all duration-700 ease-in-out ${
                        index === current
                            ? "opacity-100 relative"
                            : "opacity-0 absolute inset-0 pointer-events-none"
                    }`}
                >
                    {/* ================= CONTENT SLIDE ================= */}
                    {slide.type === "content" && (
                        <div className="max-w-7xl mx-auto px-6 mt-16 w-full grid lg:grid-cols-2 gap-12 items-center">
                            {/* LEFT */}
                            <div>
                                <div
                                    className="inline-flex items-center px-4 py-2 rounded-full mb-6"
                                    style={{ backgroundColor: "#e6f2f8" }}
                                >
                                    <span
                                        className="text-sm font-medium"
                                        style={{ color: "#1e5a8e" }}
                                    >
                                        {slide.badge}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                    {slide.title}
                                    <span
                                        className="bg-clip-text text-transparent"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(to right, #1e5a8e, #4dd6d5)",
                                        }}
                                    >
                                        {slide.highlight}
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                                    {slide.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                    <button
                                        className="group px-8 py-4 text-white font-semibold rounded-full hover:scale-105 transition flex items-center justify-center"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(to right, #1e5a8e, #4dd6d5)",
                                        }}
                                    >
                                        Get Consultation
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                                    </button>

                                    <button
                                        className="px-8 py-4 border-2 rounded-full font-semibold transition flex items-center justify-center"
                                        style={{
                                            borderColor: "#1e5a8e",
                                            color: "#1e5a8e",
                                        }}
                                    >
                                        <Play className="mr-2" /> Our Capabilities
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="relative h-[420px] hidden lg:block">
                                {/* Card 1 */}
                                <div className="absolute top-10 left-10 w-64 h-72 bg-white rounded-2xl shadow-xl p-6 rotate-3">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                        style={{ backgroundColor: "#e6f2f8" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="#1e5a8e"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 3l7 4v5c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V7l7-4z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="font-bold mb-2 text-gray-900">
                                        Cyber Security
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Comprehensive cyber security solutions that protect enterprise systems,
                                        data, and applications through advanced threat detection, continuous
                                        monitoring, compliance management, and zero-trust security frameworks.
                                    </p>
                                </div>

                                {/* Card 2 */}
                                <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-2xl shadow-xl p-6 -rotate-3">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                        style={{ backgroundColor: "#e6f7f7" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="#1e5a8e"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 12c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 18c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2z"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="font-bold mb-2 text-gray-900">
                                        Data Engineering
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Robust data engineering services that design scalable data pipelines,
                                        modern data platforms, and analytics-ready architectures to enable
                                        real-time insights, AI-driven decisions, and business intelligence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= BANNER SLIDE ================= */}
                    {slide.type === "banner" && (
                        <div
                            className={`${HERO_HEIGHT} relative w-full h-full flex items-center`}
                            style={{
                                backgroundImage: `url(${slide.background})`,
                                backgroundSize: "cover",
                                backgroundPosition: "cover",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                            <div className="relative max-w-7xl mx-auto px-6 w-full">
                                <div className="max-w-xl text-white">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-gray-200 mb-8">
                                        {slide.description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            className="px-8 py-4 rounded-full font-semibold transition text-white"
                                            style={{ backgroundColor: "#1e5a8e" }}
                                        >
                                            {slide.ctaPrimary}
                                        </button>
                                        <button
                                            className="px-8 py-4 border rounded-full font-semibold transition"
                                            style={{ borderColor: "#4dd6d5" }}
                                        >
                                            {slide.ctaSecondary}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= VIDEO SLIDE ================= */}
                    {slide.type === "video" && (
                        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-600 mb-8">
                                    {slide.description}
                                </p>
                            </div>

                            <div className="rounded-3xl overflow-hidden shadow-2xl h-[320px] md:h-[420px]">
                                <video
                                    src={slide.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* DOT NAVIGATION */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className="w-3 h-3 rounded-full transition"
                        style={{
                            backgroundColor:
                                i === current ? "#1e5a8e" : "#d1d5db",
                            transform: i === current ? "scale(1.25)" : "scale(1)",
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
