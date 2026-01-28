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
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold">Nectar Solutions</span>
            </div>

            <p className="text-gray-400 mb-6">
              Leading global provider of digital transformation services,
              helping enterprises navigate complex technological landscapes
              with innovative solutions.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
              >
                <Youtube size={20} />
              </a>
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
                    className="text-gray-400 hover:text-white transition-colors"
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
                    className="text-gray-400 hover:text-white transition-colors"
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
                <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                <span className="text-gray-400">
                  8700 stacy rd 
                  <br />
                  Mckinney texas 75070
                  <br />
                  United States
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-400">+1 (972) 654-2856</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-400">
                  contact@sagetech.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} SageTech. All rights reserved.
            </p>

            {/* <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Security
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Compliance
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
