// components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { solutionsData } from "../Data/SolutionsData";
import technology from "../Data/TechnologiesData";
import Service from "../Data/ServiceData";

const services = Service;
const technologies = technology;

export const industries = Object.entries(solutionsData).map(
  ([key, value]) => ({
    slug: key,
    name: value.name.replace(" Solutions", ""),
    color: value.color,
  })
);

const Header = ({ isScrolled }) => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const leaveTimer = useRef(null);
  const isHoveringMegaMenu = useRef(false);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? "hidden" : "unset";
  };

  const handleTriggerMouseEnter = (menu) => {
    clearTimeout(leaveTimer.current);
    isHoveringMegaMenu.current = true;
    setActiveMegaMenu(menu);
  };

  const handleTriggerMouseLeave = () => {
    leaveTimer.current = setTimeout(() => {
      if (!isHoveringMegaMenu.current) setActiveMegaMenu(null);
    }, 200);
  };

  const handleMegaMenuMouseEnter = () => {
    clearTimeout(leaveTimer.current);
    isHoveringMegaMenu.current = true;
  };

  const handleMegaMenuMouseLeave = () => {
    isHoveringMegaMenu.current = false;
    leaveTimer.current = setTimeout(() => setActiveMegaMenu(null), 200);
  };

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setActiveMegaMenu(null);
        document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-50 transition-all ${isScrolled ? "bg-white shadow-md" : "bg-white"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              S
            </div>
            <span className="text-xl font-bold text-indigo-600">SageTech</span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-8 items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 font-medium"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/services")}
              onMouseEnter={handleMegaMenuMouseLeave}
              className="flex items-center gap-1 font-medium"
            >
              Services
            </button>

            <button
              onMouseEnter={() => handleTriggerMouseEnter("solutions")}
              onMouseLeave={handleTriggerMouseLeave}
              className="flex items-center gap-1 font-medium"
            >
              Solutions <ChevronDown size={16} />
            </button>

            <button onClick={() => navigate("/aboutus")} onMouseEnter={handleMegaMenuMouseLeave} className="font-medium">
              About Us
            </button>

            <button onClick={() => navigate("/careers")} onMouseEnter={handleMegaMenuMouseLeave} className="font-medium">
              Careers
            </button>
          </nav>

          <button
            onClick={() => navigate("/contact")}
            onMouseEnter={handleMegaMenuMouseLeave}
            className="hidden lg:block px-6 py-2 bg-indigo-600 text-white rounded-full"
          >
            Contact Us
          </button>

          <button className="lg:hidden" onClick={toggleMobileMenu}>
            <Menu />
          </button>
        </div>

        {/* MEGA MENUS */}
        {activeMegaMenu && (
          <div
            onMouseEnter={handleMegaMenuMouseEnter}
            onMouseLeave={handleMegaMenuMouseLeave}
            className="absolute top-full left-0 w-full bg-blue-50 shadow-xl"
          >

            {/* SOLUTIONS */}
            {activeMegaMenu === "solutions" && (
              <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 p-8">
                {industries.map((ind, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      navigate(`/solutions/${ind.slug}`);
                      handleMegaMenuMouseLeave();
                    }}
                    className="cursor-pointer bg-white p-6 rounded-xl hover:shadow-lg transition-all group"
                  >
                    {/* Logo */}
                    <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-gray-50 group-hover:scale-105 transition-transform">
                      <img
                        src={solutionsData[ind.slug]?.logo}
                        alt={ind.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">
                      {ind.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Industry specific digital solutions
                    </p>
                  </div>
                ))}

              </div>
            )}
          </div>
        )}
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/30">
          <div className="absolute right-0 w-full max-w-md bg-white h-full p-6">
            <button onClick={toggleMobileMenu} className="mb-6">
              <X />
            </button>

            <div className="space-y-4">

              <button className="w-full text-left font-semibold" onClick={() => { navigate("/"); toggleMobileMenu(); }}>
                Home
              </button>

              <button
                className="w-full text-left font-semibold"
                onClick={() => { { navigate("/services") }; toggleMobileMenu(); }}
              >
                Services
              </button>


              <button
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                className="w-full flex items-center justify-between font-semibold text-left py-3 px-2
             transition-colors hover:text-indigo-600"
              >
                <span>Solutions</span>

                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${mobileIndustriesOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {mobileIndustriesOpen &&
                industries.map((ind, i) => (
                  <div
                    key={i}
                    className="pl-4 py-2 cursor-pointer"
                    onClick={() => {
                      navigate(`/solutions/${ind.slug}`);
                      toggleMobileMenu();
                    }}
                  >
                    {ind.name}
                  </div>
                ))
              }

              <button className="w-full text-left font-semibold" onClick={() => { navigate("/aboutus"); toggleMobileMenu(); }}>
                About Us
              </button>

              <button className="w-full text-left font-semibold" onClick={() => { navigate("/careers"); toggleMobileMenu(); }}>
                Careers
              </button>
            </div>

            <button
              className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
