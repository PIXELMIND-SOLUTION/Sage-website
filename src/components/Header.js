// components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronDown,
  Brain, Cloud, Cpu, GitMerge, Database, Shield,
  Server, Code, Globe, Lock, Terminal, MessageSquare,
  ShieldCheck, Database as DbIcon, CloudLightning, Cpu as CpuIcon,
  Phone, Mail, MapPin, Award, Users, CheckCircle, Coffee
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { solutionsData } from "../Data/SolutionsData";
import technology from '../Data/TechnologiesData';
import Service from '../Data/ServiceData';

const services = Service;

const technologies = technology;



export const industries = Object.entries(solutionsData).map(
  ([key, value]) => ({
    slug: key,                 // "networking", "cyber-security"
    name: value.name.replace(" Solutions", ""), // Networking, Cyber Security
    color: value.color,
  })
);



const Header = ({ isScrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const megaMenuRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const techButtonRef = useRef(null);
  const industriesButtonRef = useRef(null);

  // Create a shared hover state for mega menu and its triggers
  const isHoveringMegaMenu = useRef(false);
  const leaveTimer = useRef(null);

  const navigate = useNavigate();

  // Handle mouse enter for mega menu triggers
  const handleTriggerMouseEnter = (menuType) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    isHoveringMegaMenu.current = true;
    setActiveMegaMenu(menuType);
  };

  // Handle mouse leave for mega menu triggers
  const handleTriggerMouseLeave = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
    }

    leaveTimer.current = setTimeout(() => {
      if (!isHoveringMegaMenu.current) {
        setActiveMegaMenu(null);
      }
    }, 200); // Increased delay for better UX
  };

  // Handle mouse enter for mega menu itself
  const handleMegaMenuMouseEnter = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    isHoveringMegaMenu.current = true;
  };

  // Handle mouse leave for mega menu
  const handleMegaMenuMouseLeave = () => {
    isHoveringMegaMenu.current = false;

    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
    }

    leaveTimer.current = setTimeout(() => {
      if (!isHoveringMegaMenu.current) {
        setActiveMegaMenu(null);
      }
    }, 200);
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
    if (!mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileOpen && !event.target.closest('[data-mobile-menu]')) {
        toggleMobileMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setActiveMegaMenu(null);
        document.body.style.overflow = 'unset';
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
      }
    };
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between relative">
            {/* LOGO */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base lg:text-lg">S</span>
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                SageTech
              </span>
            </a>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* SERVICES DROPDOWN */}
              <div className="relative">
                <button
                  ref={servicesButtonRef}
                  onMouseEnter={() => handleTriggerMouseEnter('services')}
                  onMouseLeave={handleTriggerMouseLeave}
                  className="flex items-center gap-1 font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                >

                  professional services <ChevronDown size={16} className={`transition-transform duration-200 ${activeMegaMenu === 'services' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* TECHNOLOGIES DROPDOWN */}
              <div className="relative">
                <button
                  ref={techButtonRef}
                  onMouseEnter={() => handleTriggerMouseEnter('technologies')}
                  onMouseLeave={handleTriggerMouseLeave}
                  className="flex items-center gap-1 font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                >
                  Technologies <ChevronDown size={16} className={`transition-transform duration-200 ${activeMegaMenu === 'technologies' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* INDUSTRIES DROPDOWN */}
              <div className="relative">
                <button
                  ref={industriesButtonRef}
                  onMouseEnter={() => handleTriggerMouseEnter('industries')}
                  onMouseLeave={handleTriggerMouseLeave}
                  className="flex items-center gap-1 font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                >
                  Solutions <ChevronDown size={16} className={`transition-transform duration-200 ${activeMegaMenu === 'industries' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* OTHER NAV ITEMS */}
              <a onMouseEnter={() => handleTriggerMouseEnter('about us')} href="/aboutus" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                About Us
              </a>
              <a onMouseEnter={() => handleTriggerMouseEnter('careers')} href="/careers" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                Careers
              </a>
              <a onMouseEnter={() => handleTriggerMouseEnter('contact')} href="/contact" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                Contact
              </a>
            </nav>

            {/* DESKTOP CTA */}
            <button onClick={() => navigate('/talktoexperts')} className="hidden lg:block px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-200 hover:scale-105 transition-all duration-300 whitespace-nowrap">
              Talk to Experts
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* MEGA MENU - Positioned as separate element */}
        {activeMegaMenu && (
          <div
            ref={megaMenuRef}
            onMouseEnter={handleMegaMenuMouseEnter}
            onMouseLeave={handleMegaMenuMouseLeave}
            className="fixed inset-x-0 top-16 z-40"
          >
            {/* Services Mega Menu */}
            {activeMegaMenu === 'services' && (
              <div className="bg-blue-50 border-t border-gray-100 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="max-w-7xl mx-auto px-8 py-10">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Our <span className="text-indigo-600">Expert services</span>
                      </h2>
                      <p className="text-gray-600">
                        End-to-end digital transformation solutions for enterprise success
                      </p>
                    </div>
                    <a href="/services" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                      View All Services →
                    </a>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {services.map((item, idx) => (
                      <a
                        key={idx}
                        href={`/services/${item.title}`}
                        className="group p-6 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="text-white">
                            {item.icon}
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-indigo-600">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.features.map((feature, fIdx) => (
                            <span key={fIdx} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Technologies Mega Menu */}
            {activeMegaMenu === 'technologies' && (
              <div className="bg-blue-50 border-t border-gray-100 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="max-w-7xl mx-auto px-8 py-10">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Our <span className="text-indigo-600">Technology Stack</span>
                      </h2>
                      <p className="text-gray-600">
                        Cutting-edge technologies powering enterprise digital transformation
                      </p>
                    </div>
                    <a href="#" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                      View Tech Partnerships →
                    </a>
                  </div>

                  <div className="grid grid-cols-3 gap-8">
                    {technologies.map((category, idx) => (
                      <div key={idx} className="space-y-4">
                        <h3 className="font-bold text-gray-900 text-lg border-b pb-2">
                          {category.category}
                        </h3>
                        <div className="space-y-3">
                          {category.items.map((tech, tIdx) => (
                            <a
                              key={tIdx}
                              href="#"
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform ${tech.color}`}>
                                {tech.icon}
                              </div>
                              <span className="font-medium text-gray-800 group-hover:text-indigo-600">
                                {tech.name}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-100 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Certified Technology Partners</h3>
                        <p className="text-gray-600">Official partnerships with leading technology providers</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-indigo-600">50+</div>
                          <div className="text-sm text-gray-600">Technology Partners</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-indigo-600">200+</div>
                          <div className="text-sm text-gray-600">Certified Engineers</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Industries Mega Menu */}
            {activeMegaMenu === 'industries' && (
              <div className="bg-blue-50 border-t border-gray-100 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="max-w-7xl mx-auto px-8 py-10">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Industry <span className="text-indigo-600">Solutions</span>
                      </h2>
                      <p className="text-gray-600">
                        Tailored digital transformation solutions for every sector
                      </p>
                    </div>
                    <a href="/solutions" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                      View All Solutions →
                    </a>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {industries.map((industry, idx) => (
                      <a
                        key={idx}
                        href={`/solutions/${industry.name}`}
                        className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br via-white to-white border border-gray-100 hover:shadow-2xl transition-all duration-500"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${industry.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="text-white">
                            <Globe size={24} />
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-900 text-xl mb-3">
                          {industry.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Custom solutions addressing industry-specific challenges and regulations
                        </p>
                        <div className="flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Explore solutions
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* MOBILE MENU OVERLAY */}
      {mobileOpen && (
        <div
          data-mobile-menu
          className="fixed inset-0 z-[60] lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-slideInRight">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    SageTech
                  </span>
                  <p className="text-xs text-gray-500">Digital Transformation Experts</p>
                </div>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="h-[calc(100vh-73px)] overflow-y-auto">
              <div className="p-4 space-y-2">
                {/* Services Accordion */}
                <div className="border-b border-gray-100 pb-3">
                  <button
                    className="w-full flex justify-between items-center py-4 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  >
                    <span className="font-semibold text-gray-900 text-lg">Services</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {mobileServicesOpen && (
                    <div className="mt-2 pl-2 space-y-2">
                      {services.map((service, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-indigo-50 transition-colors group"
                          onClick={toggleMobileMenu}
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.gradient} p-2 flex items-center justify-center`}>
                            <div className="text-white">
                              {service.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-indigo-600">
                              {service.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">{service.desc}</p>
                          </div>
                          <ChevronDown size={16} className="text-gray-400 group-hover:text-indigo-600" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Technologies Accordion */}
                <div className="border-b border-gray-100 pb-3">
                  <button
                    className="w-full flex justify-between items-center py-4 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileTechOpen(!mobileTechOpen)}
                  >
                    <span className="font-semibold text-gray-900 text-lg">Technologies</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${mobileTechOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {mobileTechOpen && (
                    <div className="mt-2 pl-2">
                      <div className="grid grid-cols-2 gap-3">
                        {technologies.slice(0, 4).map((category, idx) => (
                          <div key={idx} className="space-y-2">
                            <h5 className="font-medium text-gray-700 text-sm">{category.category}</h5>
                            <div className="space-y-1">
                              {category.items.slice(0, 3).map((tech, tIdx) => (
                                <div key={tIdx} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50">
                                  <div className={`w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center ${tech.color}`}>
                                    {tech.icon}
                                  </div>
                                  <span className="text-sm text-gray-600">{tech.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Industries Accordion */}
                <div className="border-b border-gray-100 pb-3">
                  <button
                    className="w-full flex justify-between items-center py-4 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                  >
                    <span className="font-semibold text-gray-900 text-lg">Industries</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${mobileIndustriesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {mobileIndustriesOpen && (
                    <div className="mt-2 pl-2 space-y-2">
                      {industries.map((industry, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-indigo-50 transition-colors group"
                          onClick={toggleMobileMenu}
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${industry.color} p-2 flex items-center justify-center`}>
                            <div className="text-white">
                              <Globe size={18} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-indigo-600">
                              {industry.name}
                            </h4>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Other Links */}
                <a
                  href="#"
                  className="block py-4 px-4 rounded-lg hover:bg-gray-50 font-semibold text-gray-900 hover:text-indigo-600 transition-colors text-lg"
                  onClick={toggleMobileMenu}
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block py-4 px-4 rounded-lg hover:bg-gray-50 font-semibold text-gray-900 hover:text-indigo-600 transition-colors text-lg"
                  onClick={toggleMobileMenu}
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block py-4 px-4 rounded-lg hover:bg-gray-50 font-semibold text-gray-900 hover:text-indigo-600 transition-colors text-lg"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </a>

                {/* Stats Section */}
                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Our Impact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">500+</div>
                      <div className="text-xs text-gray-600">Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">20+</div>
                      <div className="text-xs text-gray-600">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">99%</div>
                      <div className="text-xs text-gray-600">Retention</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">40+</div>
                      <div className="text-xs text-gray-600">Countries</div>
                    </div>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:shadow-lg transition-shadow text-lg">
                    Talk to Experts
                  </button>
                  <p className="text-center text-gray-500 text-sm mt-3 px-4">
                    Available 24/7 for enterprise inquiries
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Phone size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Phone</p>
                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <Mail size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <p className="text-sm text-gray-600">contact@sagetech.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <MapPin size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Location</p>
                        <p className="text-sm text-gray-600">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Add slide-in animation to Tailwind config
// tailwind.config.js
/*
module.exports = {
  theme: {
    extend: {
      animation: {
        'slideInRight': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        slideInRight: {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' },
        },
      },
    },
  },
}
*/

export default Header;