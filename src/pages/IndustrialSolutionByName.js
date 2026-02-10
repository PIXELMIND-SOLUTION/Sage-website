import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { solutionsData } from "../Data/SolutionsData";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Star,
  Quote,
  Users,
  Shield,
  Database,
  Cloud,
  Cpu,
  Zap,
  Target,
  TrendingUp,
  Globe,
  Lock,
  Clock,
  Award,
  ArrowLeft,
  ArrowRight as ArrowRightIcon
} from "lucide-react";

const IndustrySolutions = () => {
  const { name } = useParams();
  const key = name?.toLowerCase().trim().replace(/\s+/g, "-");
  const data = solutionsData[key];
  const sectionRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  /* ===== VIEWPORT OBSERVER ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* ===== TESTIMONIAL AUTOPLAY ===== */
  useEffect(() => {
    if (!data?.testimonials) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === data.testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [data?.testimonials]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
            <Users className="w-12 h-12 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Solution Not Found</h2>
          <p className="text-gray-600 mb-6">The requested solution page doesn't exist.</p>
          <button
            onClick={() => navigate('/solutions')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all duration-300"
          >
            Browse Solutions
          </button>
        </div>
      </div>
    );
  }

  const getIconForService = (title) => {
    if (title.includes("LAN") || title.includes("WLAN")) return <Cpu size={24} />;
    if (title.includes("Security") || title.includes("SOC")) return <Shield size={24} />;
    if (title.includes("Data") || title.includes("Analytics")) return <Database size={24} />;
    if (title.includes("Cloud")) return <Cloud size={24} />;
    return <Zap size={24} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">

      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${data.color} opacity-90`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-pulse"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left Content */}
              <div className="flex-1">
                <div
                  className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                  {/* Logo and Title */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center p-4">
                      <img src={data.logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-2">
                        Enterprise Solution
                      </span>
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                        {data.name}
                      </h1>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                    {data.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate('/contact')}
                      className="group px-8 py-4 rounded-full bg-white text-gray-900 font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
                    >
                      Start Your Project
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button
                      onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                    >
                      Explore Services
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Stats */}
              <div className="lg:w-96">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-white text-lg font-semibold mb-6">Why Choose Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-white/80">Client Satisfaction</span>
                      <span className="font-bold">98%</span>
                    </div>
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full w-11/12" />
                    </div>

                    <div className="flex items-center justify-between text-white">
                      <span className="text-white/80">Project Success Rate</span>
                      <span className="font-bold">99%</span>
                    </div>
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full w-full" />
                    </div>

                    <div className="flex items-center justify-between text-white">
                      <span className="text-white/80">Response Time</span>
                      <span className="font-bold">&lt; 2h</span>
                    </div>
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-10/12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronRight className="w-6 h-6 text-white rotate-90" />
          </div>
        </div>
      </div>

      {/* ================= CONTENT SECTIONS ================= */}
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-20">

        {/* Long Description */}
        {data.longDescription && (
          <div
            className={`mb-24 transition-all duration-1000 delay-300 ${inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
              }`}
          >
            <div className="max-w-4xl mx-auto">

              <div
                className="
        relative
        rounded-3xl
        border border-emerald-400/40
        bg-emerald-500/10
        backdrop-blur-md
        shadow-lg
        p-10
        overflow-hidden
        "
              >

                {/* Glow Effect */}
                <div className="
        absolute inset-0
        bg-gradient-to-br
        from-emerald-200/40
        via-transparent
        to-transparent
        opacity-40
        pointer-events-none
        " />

                {/* Left Accent Bar */}
                <div className="
        absolute left-0 top-0 bottom-0 w-2
        bg-gradient-to-b
        from-emerald-500
        to-teal-500
        rounded-l-3xl
        " />

                {/* Content */}
                <p className="relative text-xl text-gray-800 leading-relaxed pl-6 font-medium">
                  {data.longDescription}
                </p>

              </div>
            </div>
          </div>
        )}


        {/* ================= SERVICES SECTION ================= */}
        <section id="services" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Premium Services
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive solutions tailored to your specific business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {data.services.map((service, index) => (
              <div
                key={index}
                className={`group relative h-[320px] rounded-2xl overflow-hidden transition-all duration-700 hover:scale-105
                  ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Service Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 p-8 flex flex-col transition-all duration-500 group-hover:opacity-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center mb-6">
                    {getIconForService(service.title)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="mt-auto pt-6">
                    <div className="flex items-center text-blue-600 font-medium">
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/90 to-transparent" />
                  <div className="relative h-full p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-6">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BENEFITS SECTION ================= */}
        {data.benefits && (
  <section className="mb-32 px-6">

    <div className="max-w-7xl mx-auto">

      <div className="grid lg:grid-cols-2 gap-20 items-start">

        {/* LEFT */}
        <div className="lg:sticky lg:top-28">

          {/* Tag */}
          <span className="
            inline-block
            px-4 py-2
            rounded-full
            bg-emerald-500/10
            border border-emerald-400/40
            text-emerald-700
            text-sm
            font-semibold
            mb-6
          ">
            KEY BENEFITS
          </span>

          {/* Title */}
          <h2 className="
            text-3xl
            md:text-4xl
            font-bold
            text-gray-900
            leading-tight
            mb-6
          ">
            {data.benefits.title}
          </h2>

          {/* Description */}
          <p className="
            text-gray-600
            text-lg
            leading-relaxed
            mb-10
          ">
            {data.benefits.description}
          </p>

          {/* Trust Block */}
          <div className="
            flex items-center gap-4
            p-5
            rounded-2xl
            bg-white
            border
            shadow-sm
          ">
            <div className="
              w-12 h-12
              rounded-xl
              bg-gradient-to-r from-blue-600 to-indigo-600
              flex items-center justify-center
              shadow-md
            ">
              <Award className="w-6 h-6 text-white" />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Enterprise Grade
              </p>
              <p className="text-gray-500 text-sm">
                Certified & Trusted Solutions
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>

          {/* FEATURES */}
          <div className="grid sm:grid-cols-2 gap-6">

            {data.benefits.keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="
                  group
                  rounded-2xl
                  border
                  bg-white
                  p-6
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-400
                "
              >
                <div className="flex gap-4">

                  {/* ICON */}
                  <div className="
                    w-11 h-11
                    rounded-xl
                    bg-emerald-500/10
                    flex items-center justify-center
                    flex-shrink-0
                  ">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>

                  {/* TEXT */}
                  <p className="font-semibold text-gray-800 leading-relaxed">
                    {feature}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-5 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="
                      h-full
                      bg-gradient-to-r
                      from-emerald-500
                      to-teal-500
                      rounded-full
                    "
                    style={{
                      width: `${75 + index * 5}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* STATS */}
          <div className="
            mt-10
            rounded-3xl
            p-10
            bg-gradient-to-r
            from-indigo-600
            to-blue-600
            shadow-xl
          ">
            <div className="grid grid-cols-3 gap-6 text-center">

              {[
                { value: "24/7", label: "Support" },
                { value: "99.9%", label: "Uptime" },
                { value: "100+", label: "Projects" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-blue-100 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
)}


        {/* ================= STEPS SECTION ================= */}
        {data.stepsProvided && (
          <section className="mb-28">

            {/* HEADER */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Process
                </span>
              </h2>

              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                A structured approach to ensure success at every stage
              </p>
            </div>

            {/* TIMELINE */}
            <div className="relative max-w-6xl mx-auto">

              {/* Center Line */}
              <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-blue-200 via-indigo-300 to-purple-200 -translate-x-1/2" />

              <div className="space-y-16">

                {data.stepsProvided.map((step, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    <div
                      key={step.step}
                      className="relative flex items-center justify-between"
                    >

                      {/* LEFT CARD */}
                      <div
                        className={`
                w-full lg:w-[45%]
                ${isLeft ? "lg:order-1" : "lg:order-2"}
                `}
                      >
                        <div
                          className="
                  bg-white
                  p-8
                  rounded-3xl
                  shadow-xl
                  border
                  hover:shadow-2xl
                  transition
                  "
                        >
                          <div className="flex items-center gap-4 mb-4">

                            {/* STEP NUMBER */}
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                              {step.step}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900">
                              {step.title}
                            </h3>
                          </div>

                          <p className="text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* CENTER DOT */}
                      <div className="hidden lg:flex items-center justify-center w-[10%] relative">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg border-4 border-white z-10" />
                      </div>

                      {/* RIGHT EMPTY SPACE */}
                      <div
                        className={`
                hidden lg:block w-[45%]
                ${isLeft ? "lg:order-2" : "lg:order-1"}
                `}
                      />

                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}


        {/* ================= TESTIMONIALS CAROUSEL ================= */}
        {data.testimonials && (
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Client <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Testimonials
                </span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                What our valued clients say about our solutions
              </p>
            </div>

            <div className="relative">
              {/* Testimonial Cards */}
              <div className="overflow-hidden">
                <div
                  ref={testimonialsRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {data.testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 border border-gray-200/50 shadow-xl">
                          <Quote className="w-12 h-12 text-blue-600/20 mb-8" />

                          <div className="flex flex-col lg:flex-row gap-12 items-center">
                            {/* Client Info */}
                            <div className="lg:w-1/3 text-center lg:text-left">
                              <div className="mb-6">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto lg:mx-0"
                                />
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                                <p className="text-gray-600 mb-2">{testimonial.position}</p>
                                <p className="text-gray-500 text-sm">{testimonial.company}</p>
                              </div>
                              {/* Rating */}
                              <div className="flex items-center justify-center lg:justify-start gap-1 mt-4">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(testimonial.rating)
                                      ? "text-amber-500 fill-amber-500"
                                      : testimonial.rating % 1 !== 0 && i === Math.floor(testimonial.rating)
                                        ? "text-amber-500 fill-amber-500"
                                        : "text-gray-300"
                                      }`}
                                  />
                                ))}
                                <span className="text-gray-600 ml-2">{testimonial.rating.toFixed(1)}</span>
                              </div>
                            </div>

                            {/* Quote */}
                            <div className="lg:w-2/3">
                              <p className="text-2xl text-gray-800 leading-relaxed italic">
                                "{testimonial.quote}"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setActiveTestimonial(prev =>
                  prev === 0 ? data.testimonials.length - 1 : prev - 1
                )}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={() => setActiveTestimonial(prev =>
                  prev === data.testimonials.length - 1 ? 0 : prev + 1
                )}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
              >
                <ArrowRightIcon className="w-6 h-6 text-gray-700" />
              </button>

              {/* Indicators */}
              <div className="flex justify-center gap-3 mt-12">
                {data.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                      }`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= FINAL CTA ================= */}
        <div
          className={`text-center transition-all duration-1000 delay-500
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how our {data.name} can drive your success forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="px-10 py-4 rounded-full bg-white text-blue-600 font-bold hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Free Consultation
              </button>
              <button
                onClick={() => navigate('/solutions')}
                className="px-10 py-4 rounded-full border-2 border-white text-white font-bold hover:bg-white/10 transition-all duration-300"
              >
                Explore Other Solutions
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-8">
              Schedule a call with our experts • Get a custom proposal • 30-day pilot available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrySolutions;