// components/Footer.jsx
import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const solutions = [
    { name: "Cloud Solutions", link: "/solutions/cloud" },
    { name: "Cyber Security", link: "/solutions/cyber-security" },
    { name: "Data Engineering", link: "/solutions/data-engineering" },
    { name: "Networking", link: "/solutions/networking" },
  ];

  const companyLinks = [
    { name: "About Us", link: "/aboutus" },
    { name: "Services", link: "/services" },
    { name: "Careers", link: "/careers" },
    { name: "Contact Us", link: "/contact" },
  ];

  return (
    <footer
      className="text-white pt-16 pb-8"
      style={{ backgroundColor: "#000" }}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center justify-start space-x-3 mb-6 h-20 w-48">
              <img
                src="/logo.png"
                alt="Nectar Solutions"
                className="w-full h-full object-contain"
              />
            </div>

            <p style={{ color: "#bfeeee" }} className="mb-6">
              Leading global provider of digital transformation services,
              helping enterprises navigate complex technological landscapes
              with innovative solutions.
            </p>

            <div className="flex space-x-4">
              {[Linkedin, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                  }}
                  onMouseOver={(e)=>e.currentTarget.style.backgroundColor="#4dd6d5"}
                  onMouseOut={(e)=>e.currentTarget.style.backgroundColor="rgba(255,255,255,0.12)"}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Solutions</h3>
            <ul className="space-y-3">
              {solutions.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="transition-colors"
                    style={{ color: "#bfeeee" }}
                    onMouseOver={(e)=>e.currentTarget.style.color="#4dd6d5"}
                    onMouseOut={(e)=>e.currentTarget.style.color="#bfeeee"}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="transition-colors"
                    style={{ color: "#bfeeee" }}
                    onMouseOver={(e)=>e.currentTarget.style.color="#4dd6d5"}
                    onMouseOut={(e)=>e.currentTarget.style.color="#bfeeee"}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1" style={{ color: "#4dd6d5" }} />
                <span style={{ color: "#bfeeee" }}>
                  8700 stacy rd
                  <br />
                  Mckinney texas 75070
                  <br />
                  United States
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3" style={{ color: "#4dd6d5" }} />
                <span style={{ color: "#bfeeee" }}>+1 (972) 654-2856</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3" style={{ color: "#4dd6d5" }} />
                <span style={{ color: "#bfeeee" }}>
                  contact@nectar.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p style={{ color: "#bfeeee" }} className="text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} NectarSolutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
