import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, ArrowRight, Award, Users, Globe, Zap } from "lucide-react";
import logo from "../Assets/Images/WhatWeDo/whatwedo.png";
import { useNavigate } from "react-router-dom";
import network from "../Assets/Images/Service/network.png";
import cloud from "../Assets/Images/Service/cloud.png";
import dataImg from "../Assets/Images/Service/data.png";
import cyber from "../Assets/Images/Service/cyber.png";
import { motion } from "framer-motion";

const PRIMARY = "#1e5a8e";
const SECONDARY = "#4dd6d5";

const WhatWeDo = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const [heroInView, setHeroInView] = useState(false);
    const [visibleSteps, setVisibleSteps] = useState([]);
    const impactRef = useRef(null);
    const cardRefs = useRef([]);

    /* ---------------- Intersection Observer ---------------- */
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setHeroInView(entry.isIntersecting),
            { threshold: 0.25 }
        );

        if (heroRef.current) observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    /* ---------------- Steps Observer ---------------- */
    useEffect(() => {
        const observers = [];

        cardRefs.current.forEach((ref, index) => {
            if (!ref) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                setVisibleSteps(prev => {
                                    if (!prev.includes(index)) return [...prev, index];
                                    return prev;
                                });
                            }, index * 300);
                        } else {
                            setVisibleSteps(prev => prev.filter(i => i !== index));
                        }
                    });
                },
                { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
            );

            observer.observe(ref);
            observers.push(observer);
        });

        return () => observers.forEach(observer => observer.disconnect());
    }, []);

    /* ---------------- DATA ---------------- */

    const stats = [
        { icon: Users, number: "250+", label: "Enterprise Clients" },
        { icon: Globe, number: "40+", label: "Countries Served" },
        { icon: Zap, number: "99.99%", label: "Uptime Delivered" },
        { icon: Award, number: "15+", label: "Years Expertise" },
    ];

    const process = [
        "Discover & Analyze",
        "Architect Solutions",
        "Build & Integrate",
        "Secure & Optimize",
        "Scale & Innovate",
    ];

    const capabilities = [
        { title: "Networking", img: network, desc: "Design resilient enterprise networks with high availability and optimized performance." },
        { title: "Cyber Security", img: cyber, desc: "Protect your infrastructure with zero-trust architecture and AI-driven threat detection." },
        { title: "Data Engineering", img: dataImg, desc: "Transform raw data into business intelligence with scalable pipelines." },
        { title: "Cloud Solutions", img: cloud, desc: "Secure, scalable cloud ecosystems enabling rapid innovation." },
        { title: "AI & Automation", img: dataImg, desc: "Leverage AI to automate workflows and unlock predictive insights." },
        { title: "DevOps Transformation", img: network, desc: "Accelerate releases with CI/CD pipelines and cloud-native engineering." },
    ];

    const impacts = [
        "Accelerate time-to-market",
        "Improve operational efficiency",
        "Modernize legacy systems",
        "Enhance customer experience",
        "Ensure security & compliance",
        "Enable data-driven decisions",
        "Reduce infrastructure costs",
        "Increase business agility",
    ];

    return (
        <main className="bg-white text-gray-800 overflow-hidden">

            {/* ================= HERO ================= */}
            <section
                ref={heroRef}
                className="relative min-h-[85vh] flex items-center bg-cover bg-center"
                style={{ backgroundImage: `url(${logo})` }}
            >
                <div
                    className="absolute inset-0 backdrop-blur-sm"
                    style={{
                        background: `linear-gradient(to bottom right, rgba(0,0,0,.8), rgba(0,0,0,.7), ${PRIMARY}CC)`
                    }}
                />

                <div
                    className={`relative max-w-5xl mx-auto px-6 text-center text-white transition-all duration-1000 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        What We Do
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
                        We empower enterprises to innovate, modernize, and scale with secure,
                        intelligent digital transformation solutions.
                    </p>

                    <button
                        onClick={() => navigate("/contact")}
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-2xl transition"
                        style={{
                            background: `linear-gradient(to right, ${PRIMARY}, ${SECONDARY})`
                        }}
                    >
                        Contact Us <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* ================= TRUST / STATS ================= */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition"
                            >
                                <Icon className="mx-auto mb-4 w-10 h-10" style={{ color: PRIMARY }} />
                                <h3 className="text-3xl font-extrabold">{stat.number}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ================= PROCESS ================= */}
            <section className="py-28">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Our Proven Execution Framework
                    </h2>

                    <p className="text-gray-600 mb-16 text-lg">
                        A refined methodology engineered to deliver predictable,
                        scalable business outcomes.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        {process.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="px-8 py-4 rounded-full text-white font-semibold shadow-lg"
                                style={{
                                    background: `linear-gradient(to right, ${PRIMARY}, ${SECONDARY})`
                                }}
                            >
                                {step}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= IMPACT TIMELINE ================= */}
            <section ref={impactRef} className="relative py-32 bg-gray-50 overflow-hidden">
                {/* Glow Background */}
                <div
                    className="absolute left-[-200px] top-0 w-[400px] h-[400px] blur-[140px] opacity-40"
                    style={{ background: "#4dd6d5" }}
                />
                <div
                    className="absolute right-[-200px] bottom-0 w-[400px] h-[400px] blur-[140px] opacity-40"
                    style={{ background: "#1e5a8e" }}
                />

                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl font-bold mb-4">
                            How We Create Impact
                        </h2>
                        <p className="text-gray-600 text-lg">
                            A proven approach delivering measurable business outcomes step by step.
                        </p>
                    </div>

                    {/* Timeline Wrapper */}
                    <div className="relative">
                        {/* Center Line */}
                        <div
                            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 rounded-full"
                            style={{
                                background: "linear-gradient(to bottom, #4dd6d5, #1e5a8e)"
                            }}
                        />

                        <div className="space-y-28">
                            {impacts.map((item, i) => {
                                const isLeft = i % 2 === 0;
                                const isVisible = visibleSteps.includes(i);

                                return (
                                    <div
                                        key={i}
                                        ref={el => cardRefs.current[i] = el}
                                        className={`relative flex items-center min-h-[140px] ${isLeft ? "md:justify-start" : "md:justify-end"
                                            }`}
                                    >
                                        {/* Card */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            whileHover={{ scale: 1.04 }}
                                            className="relative w-full md:w-[42%] bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition z-10"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                                                    style={{
                                                        background: "linear-gradient(to bottom right, #1e5a8e, #4dd6d5)"
                                                    }}
                                                >
                                                    <CheckCircle size={20} />
                                                </div>
                                                <p className="text-lg font-semibold text-gray-800">
                                                    {item}
                                                </p>
                                            </div>
                                        </motion.div>

                                        {/* FOOT STEP - Desktop */}
                                        {isVisible && (
                                            <motion.div
                                                initial={{ scale: 0, rotate: isLeft ? -15 : 15, opacity: 0 }}
                                                animate={{ scale: 1, rotate: isLeft ? -15 : 15, opacity: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 150,
                                                    damping: 15,
                                                    delay: 0.2
                                                }}
                                                className={`hidden md:block absolute top-1/2 -translate-y-1/2 z-20 ${isLeft ? "left-1/2 ml-10" : "right-1/2 mr-10"
                                                    }`}
                                            >
                                                <div className="relative w-24 h-40 group">
                                                    {/* Heel */}
                                                    <div
                                                        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-16 rounded-[50%_50%_45%_45%] blur-[1px]"
                                                        style={{
                                                            background: "linear-gradient(to bottom right, #1e5a8ecc, #4dd6d5cc)"
                                                        }}
                                                    />

                                                    {/* Arch */}
                                                    <div
                                                        className={`absolute bottom-14 w-8 h-16 blur-[1px] ${isLeft
                                                            ? "left-8 rounded-[100%_20%_20%_100%]"
                                                            : "right-8 rounded-[20%_100%_100%_20%]"
                                                            }`}
                                                        style={{
                                                            background: "linear-gradient(to bottom right, #1e5a8ecc, #4dd6d5cc)"
                                                        }}
                                                    />

                                                    {/* Ball */}
                                                    <div
                                                        className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-[45%_45%_40%_40%] blur-[0.5px]"
                                                        style={{
                                                            background: "linear-gradient(to bottom right, #1e5a8e, #4dd6d5)"
                                                        }}
                                                    />

                                                    {/* Toes */}
                                                    <div className={`absolute top-0 w-full h-12 flex items-end justify-center ${isLeft ? "-scale-x-100" : ""}`}>
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}
                                                            className="w-7 h-9 rounded-[50%_50%_45%_45%] mb-2 mr-1"
                                                            style={{ background: "#1e5a8e" }}
                                                        />
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.45 }}
                                                            className="w-4 h-6 rounded-full mb-5 mr-1"
                                                            style={{ background: "#256b9e" }}
                                                        />
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
                                                            className="w-4 h-5 rounded-full mb-4 mr-1"
                                                            style={{ background: "#256b9e" }}
                                                        />
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.55 }}
                                                            className="w-3.5 h-4.5 rounded-full mb-3 mr-1"
                                                            style={{ background: "#4dd6d5" }}
                                                        />
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}
                                                            className="w-3 h-4 rounded-full mb-1"
                                                            style={{ background: "#4dd6d5" }}
                                                        />
                                                    </div>

                                                    {/* Glow */}
                                                    <div
                                                        className="absolute inset-0 blur-xl rounded-full -z-10 animate-pulse"
                                                        style={{ background: "rgba(77,214,213,0.25)" }}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Connecting line */}
                                        <div
                                            className={`hidden md:block absolute top-1/2 h-0.5 z-0 ${isLeft
                                                ? "left-1/2 right-[calc(50%-42%)]"
                                                : "left-[calc(50%-42%)] right-1/2"
                                                }`}
                                            style={{
                                                background: isLeft
                                                    ? "linear-gradient(to right, rgba(77,214,213,0.4), transparent)"
                                                    : "linear-gradient(to right, rgba(30,90,142,0.4), transparent)"
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>


            {/* ================= CAPABILITIES ================= */}
            <section className="py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            Our Core Capabilities
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Enterprise-grade services built for scale and resilience
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {capabilities.map((cap, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="group rounded-3xl border bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all"
                            >
                                <img src={cap.img} alt="" className="w-full h-52 object-cover" />

                                <div className="p-7">
                                    <h3
                                        className="text-xl font-bold mb-3 transition"
                                        onMouseEnter={(e) => e.currentTarget.style.color = PRIMARY}
                                        onMouseLeave={(e) => e.currentTarget.style.color = ""}
                                    >
                                        {cap.title}
                                    </h3>
                                    <p className="text-gray-600">{cap.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section
                className="py-24 text-white text-center"
                style={{
                    background: `linear-gradient(to right, ${PRIMARY}, ${SECONDARY})`
                }}
            >
                <Award className="mx-auto mb-6 w-12 h-12 opacity-90" />

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Transform Your Business?
                </h2>

                <p style={{ color: "#d2f3f3" }} className="mb-8 max-w-xl mx-auto">
                    Partner with us to build secure, scalable, future-ready solutions.
                </p>

                <button
                    onClick={() => navigate("/contact")}
                    className="px-10 py-4 bg-white rounded-full font-semibold hover:shadow-2xl transition"
                    style={{ color: PRIMARY }}
                >
                    Contact Us
                </button>
            </section>

        </main>
    );
};

export default WhatWeDo;
