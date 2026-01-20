// components/Hero.jsx
import React, { useEffect, useState } from "react";
import { ArrowRight, Play, Award, Users, TrendingUp } from "lucide-react";

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
        badge: "Trusted by Fortune 500 Companies",
        title: "Accelerating ",
        highlight: "Digital Transformation",
        description:
            "Drive innovation with AI, Cloud, Automation and Integration solutions. We help enterprises scale with confidence.",
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
        background:
            "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1600&q=80",
        title: "Build Faster. Scale Smarter.",
        description:
            "Next-generation cloud, automation and AI platforms engineered for modern enterprises.",
        ctaPrimary: "Explore Services",
        ctaSecondary: "Talk to Experts",
    },
    {
        id: 3,
        type: "video",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "See Our Capabilities in Action",
        description:
            "Watch how we transform enterprises using AI, Cloud and Data Engineering.",
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
                    className={`${HERO_HEIGHT} flex items-center pt-10 transition-all duration-700 ease-in-out ${index === current
                            ? "opacity-100 relative"
                            : "opacity-0 absolute inset-0 pointer-events-none"
                        }`}
                >
                    {/* ================= CONTENT SLIDE ================= */}
                    {slide.type === "content" && (
                        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
                            {/* LEFT */}
                            <div>
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 mb-6">
                                    <span className="text-sm font-medium text-indigo-700">
                                        {slide.badge}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                    {slide.title}
                                    <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                        {slide.highlight}
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                                    {slide.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                    <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-full hover:scale-105 transition flex items-center justify-center">
                                        Get Consultation
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                                    </button>

                                    <button className="px-8 py-4 border-2 border-gray-300 rounded-full font-semibold hover:bg-indigo-50 transition flex items-center justify-center">
                                        <Play className="mr-2" /> Our Capabilities
                                    </button>
                                </div>

                                {/* ===== STATS CARDS (ENHANCED) ===== */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {slide.stats.map((s, i) => {
                                        const Icon = s.icon;
                                        return (
                                            <div
                                                key={i}
                                                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition"
                                            >
                                                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                                                    <Icon className="w-6 h-6 text-indigo-600" />
                                                </div>

                                                <div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {s.value}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {s.label}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="relative h-[420px] hidden lg:block">
                                {/* Card 1 */}
                                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-2xl shadow-xl p-6 rotate-3">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                                        {/* AI Icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-indigo-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.75 3v1.5m4.5-1.5v1.5M4.5 9.75H3m18 0h-1.5M9.75 21v-1.5m4.5 1.5v-1.5M7.5 7.5h9v9h-9v-9z"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="font-bold mb-2 text-gray-900">AI Solutions</h3>
                                    <p className="text-sm text-gray-600">
                                        Enterprise-grade artificial intelligence solutions designed to automate
                                        workflows, enhance decision-making, and deliver predictive insights that
                                        drive smarter business outcomes.
                                    </p>
                                </div>

                                {/* Card 2 */}
                                <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-2xl shadow-xl p-6 -rotate-3">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                                        {/* Cloud Icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 15a4 4 0 014-4h1a5 5 0 019.9 1H19a3 3 0 010 6H7a4 4 0 01-4-4z"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="font-bold mb-2 text-gray-900">Cloud Migration</h3>
                                    <p className="text-sm text-gray-600">
                                        Secure, scalable cloud migration services that modernize infrastructure,
                                        reduce operational costs, and ensure high availability with enterprise-
                                        grade security and performance.
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
                                backgroundPosition: "center",
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
                                        <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold transition">
                                            {slide.ctaPrimary}
                                        </button>
                                        <button className="px-8 py-4 border border-white/40 hover:bg-white/10 rounded-full font-semibold transition">
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
                        className={`w-3 h-3 rounded-full transition ${i === current ? "bg-indigo-600 scale-125" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
