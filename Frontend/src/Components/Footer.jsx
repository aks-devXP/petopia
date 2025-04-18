import React from 'react';
import { Twitter, Linkedin, Github, Facebook, Instagram } from 'lucide-react';
import logo from "../assets/petopia-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#1A120B] text-[#E5E5CB] py-6 px-10">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo and Tagline */}
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2 gap-2">
              <img src={logo} className="min-w-12 h-12" alt="Petopia Logo" />
              <span className="text-md font-light">
                Petopia — Because every pet deserves love, care, and a better life.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-6 text-sm mb-4 md:mb-0">
            <a href="#ecosystem" className="hover:text-[#E5E5CB]">Ecosystem</a>
            <a href="#token" className="hover:text-[#E5E5CB]">Token</a>
            <a href="#docs" className="hover:text-[#E5E5CB]">Docs</a>
            <a href="#contact" className="hover:text-[#E5E5CB]">Contact Us</a>
            <a href="#terms" className="hover:text-[#E5E5CB]">Terms of Service</a>
          </nav>
        </div>


        <div className="flex flex-col md:flex-row justify-between items-start 
        md:items-center mt-6 pt-4 border-t border-[#E5E5CB]/20">
          <div className="text-sm text-[#E5E5CB]/50 mb-4 md:mb-0">
            © 2025 Petopia. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
          <a href="#github" className="text-[#E5E5CB]/50 hover:text-[#E5E5CB]">
              <Instagram size={20} />
            </a>
            <a href="#twitter" className="text-[#E5E5CB]/50 hover:text-[#E5E5CB]">
              <Twitter size={20} />
            </a>
            <a href="#linkedin" className="text-[#E5E5CB]/50 hover:text-[#E5E5CB]">
              <Linkedin size={20} />
            </a>
            <a href="#facebook" className="text-[#E5E5CB]/50 hover:text-[#E5E5CB]">
              <Facebook size={20} />
            </a>
            <a href="#github" className="text-[#E5E5CB]/50 hover:text-[#E5E5CB]">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;