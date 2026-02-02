// components/WhatWeDo.jsx
import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import logo from '../Assets/Images/WhatWeDo/whatwedo.png';
import { useNavigate } from "react-router-dom";
import network from '../Assets/Images/Service/network.png';
import cloud from '../Assets/Images/Service/cloud.png';
import data from '../Assets/Images/Service/data.png';
import cyber from '../Assets/Images/Service/cyber.png';

const WhatWeDo = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const impactRef = useRef(null);
    const capabilityRef = useRef(null);

    const [heroInView, setHeroInView] = useState(false);
    const [impactInView, setImpactInView] = useState(false);
    const [capInView, setCapInView] = useState(false);

    const useObserver = (ref, setter) => {
        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => setter(entry.isIntersecting),
                { threshold: 0.25 }
            );
            if (ref.current) observer.observe(ref.current);
            return () => observer.disconnect();
        }, []);
    };

    useObserver(heroRef, setHeroInView);
    useObserver(impactRef, setImpactInView);
    useObserver(capabilityRef, setCapInView);

    const capabilities = [
        {
            title: "Networking",
            img: network,
            desc: "Design, deploy, and manage secure, high-performance enterprise and data center networking solutions.",
        },
        {
            title: "Cyber Security",
            img: cyber,
            desc: "Protect digital assets with advanced threat detection, monitoring, and enterprise-grade security frameworks.",
        },
        {
            title: "Data Engineering",
            img: data,
            desc: "Build scalable data pipelines and platforms that transform raw data into actionable business insights.",
        },
        {
            title: "Cloud Solutions",
            img: cloud,
            desc: "Accelerate innovation with secure, scalable, and cost-optimized cloud and hybrid cloud solutions.",
        },
    ];


    return (
        <main className="bg-white text-gray-800 overflow-hidden">
            {/* HERO */}
            <section
                ref={heroRef}
                className="relative min-h-[85vh] flex items-center bg-cover bg-center"
                style={{
                    backgroundImage:
                        `url(${logo})`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-indigo-900/70" />

                <div
                    className={`relative max-w-5xl mx-auto px-6 text-center text-white transition-all duration-1000 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        What We Do
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
                        We help enterprises innovate, modernize, and scale through secure,
                        intelligent, and future-ready digital transformation solutions.
                    </p>

                    <button
                        onClick={() => navigate("/contact")}
                        className="inline-flex items-center gap-3 px-10 py-4 bg-indigo-600 rounded-full text-lg font-semibold
                       hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-2xl transition-all"
                    >
                        Contact Us <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* IMPACT STEPS */}
            <section
                ref={impactRef}
                className="relative py-28 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1600&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-white/95" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <div
                        className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${impactInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                            }`}
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                            How We Create Impact
                        </h2>
                        <p className="text-gray-600 text-lg">
                            A proven, structured approach delivering measurable business outcomes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            "Accelerate time-to-market",
                            "Improve operational efficiency",
                            "Modernize legacy systems",
                            "Enhance customer experience",
                            "Ensure security & compliance",
                            "Enable data-driven decisions",
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-700
                  ${impactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  hover:-translate-y-2 hover:shadow-2xl`}
                            >
                                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full
                                bg-gradient-to-br from-indigo-600 to-violet-600
                                text-white flex items-center justify-center font-bold shadow-lg">
                                    {String(i + 1).padStart(2, "0")}
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                                    <CheckCircle className="w-6 h-6 text-indigo-600" />
                                </div>

                                <p className="text-gray-700 font-medium">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CORE CAPABILITIES */}
            <section ref={capabilityRef} className="py-28 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div
                        className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${capInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Our Core Capabilities
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Enterprise-grade digital services built for scale and resilience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {capabilities.map((cap, i) => (
                            <div
                                key={i}
                                className={`group bg-white rounded-2xl overflow-hidden transition-all duration-700
                  ${capInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  hover:-translate-y-2 hover:shadow-2xl`}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={cap.img}
                                        alt={cap.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                                        {cap.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">{cap.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-indigo-600 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready to transform your business?
                </h2>
                <p className="text-gray-200 mb-6">
                    Partner with us to build secure, scalable, future-ready solutions.
                </p>
                <button
                    onClick={() => navigate("/contact")}
                    className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold
                     hover:bg-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                    Contact Us
                </button>
            </section>
        </main>
    );
};

export default WhatWeDo;
