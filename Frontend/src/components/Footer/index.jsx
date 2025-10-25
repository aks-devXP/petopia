import React from "react";
import { Twitter, Linkedin, Github, Facebook, Instagram } from "lucide-react";
import logo from "@assets/petopia-logo.svg";

const Footer = () => {
  return (
    <footer className="flex justify-center text-ink-primary pt-5 px-2 sm:px-4 lg:px-12">
      <div className="bg-app-surface w-full px-2 sm:px-4 lg:px-10 py-6 sm:py-8 rounded-t-3xl">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                className="w-10 h-10 sm:w-12 sm:h-12 border border-black rounded-full"
                alt="Petopia Logo"
              />
              <span className="text-sm sm:text-base lg:text-lg font-light max-w-xs sm:max-w-sm leading-snug text-ink-primary/80">
                Petopia — Because every pet deserves love, care, and a better life.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm lg:text-base text-ink-primary/80">
            <a href="#ecosystem" className="hover:text-brand transition">
              Ecosystem
            </a>
            <a href="#token" className="hover:text-brand transition">
              Token
            </a>
            <a href="#docs" className="hover:text-brand transition">
              Docs
            </a>
            <a href="#contact" className="hover:text-brand transition">
              Contact Us
            </a>
            <a href="#terms" className="hover:text-brand transition">
              Terms of Service
            </a>
          </nav>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 pt-4 border-t border-ink-primary/20 gap-4">
          <div className="text-xs sm:text-sm text-ink-primary/60">
            © 2025 Petopia. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex space-x-3 sm:space-x-4 text-ink-primary/80">
            <a
              href="#instagram"
              className="hover:text-brand transition"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </a>
            <a
              href="#twitter"
              className="hover:text-brand transition"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </a>
            <a
              href="#linkedin"
              className="hover:text-brand transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </a>
            <a
              href="#facebook"
              className="hover:text-brand transition"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </a>
            <a
              href="#github"
              className="hover:text-brand transition"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
