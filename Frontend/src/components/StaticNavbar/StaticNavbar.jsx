import logo from "@assets/petopia-logo.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PawButton from "../buttons/PawButton";
import StaggeredMenu from "./StaggeredMenu";
gsap.registerPlugin(ScrollTrigger);
const StaticNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthed = Boolean(localStorage.getItem("token"));

  const items = [
    { label: "Home", ariaLabel: "Go to Home", to: "/home" },
    { label: "Services", ariaLabel: "Go to Services", to: "/pet-services" },
    { label: "Guide", ariaLabel: "Go to Breed Guide", to: "/breed-info" },
    { label: "News", ariaLabel: "Go to News", to: "/news" },
    { label: "NGO", ariaLabel: "Go to NGO/Volunteer", to: "/ngo" },
    { label: "Contact", ariaLabel: "Go to Contact", to: "/contact" },
  ];
  useEffect(() => {
    
      // Initial setup
      gsap.set(".navbar", {
        display: "flex",
        position: "fixed",
        top: 0,
        width: "100%",
        opacity: 1,
        zIndex: 50,
        transition: "opacity 0.5s ease-in-out",
      });
    
      // First timeline - handles the navbar transformation
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".navbar",
          start: "+=100 top",
          end: "+=500 top",
          scrub: 1,
        },
      });
    
      t1.to(".navbar", {
        position: "fixed",
        top: "0%",
        left: "0%",
        width: "100%",
        // borderRadius: "1.25rem",
        // zIndex: 50,
        opacity: 1,
      });
    
      // For show/hide on scroll, use a separate approach
      let lastScrollY = window.scrollY;
    
      // Define the scroll handler function
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const scrollDiff = Math.abs(currentScrollY - lastScrollY);
    
        if (scrollDiff > 130) {
          if (currentScrollY > lastScrollY) {
            // Scrolling down by more than 150px: Hide navbar
            gsap.to(".navbar", { y: "-130%", duration: 0.8 });

          } else {
            // Scrolling up by more than 150px: Show navbar
            gsap.to(".navbar", { y: "0", duration: 0.8 });
          }
          lastScrollY = currentScrollY;
        }
      };
    
      // Add the scroll event listener
      window.addEventListener("scroll", handleScroll);
    
      // Cleanup function
      return () => {
        window.removeEventListener("scroll", handleScroll);
    
        // Kill the GSAP animations to prevent memory leaks
        if (t1.scrollTrigger) {
          t1.scrollTrigger.kill();
        }
      };
    }, []);
  const handleCTA = () => {
    navigate("/sign-in", { state: { from: location }, replace: false });
  };

  return (
    <section className="
        relative h-20
        
    ">
    <nav
      className="navbar 
        flex items-center justify-between
        bg-ink-secondary/30 h-20 px-2 sm:px-4 backdrop-blur-xl"
    >
      {/* Left: Petopia -> /welcome */}
      <button
        onClick={() => navigate("/welcome")}
        className="flex items-center gap-2 rounded-full transition"
        aria-label="Go to Welcome"
      >
        <div className="flex items-center gap-2">
          <div className="rounded-full flex items-center justify-center">
            <img src={logo} className="w-14 h-14" alt="Petopia Logo" />
          </div>
          <span className="text-ink-primary font-quicksandBold text-xl md:text-3xl">
            Petopia
          </span>
        </div>
      </button>

      {/* Right: Always show menu; show PawButton only if not logged in */}
      <div className="flex items-center gap-5">
        {!isAuthed && (
          <PawButton onClick={handleCTA} text="Create Your Pawfile" />
        )}
        <StaggeredMenu
          items={items}
          colors={["#B19EEF", "#5227FF"]}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen
        />
      </div>
    </nav>
    </section>
  );
};

export default StaticNavbar;
