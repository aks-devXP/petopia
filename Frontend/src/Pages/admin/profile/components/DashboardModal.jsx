import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import ProfileOptions from "./ProfileOptions";
import HistoryOptions from "./HistoryOptions";
import { useNavigate } from "react-router-dom";
const DashboardModal = ({ isOpen, onClose , option }) => {

  const navigate = useNavigate();

  // Stop scrolling when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.width = "100vw";
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      // Restore scrolling
      const scrollY = parseInt(document.body.style.top || "0") * -1;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    }

    return () => {
      const scrollY = parseInt(document.body.style.top || "0") * -1;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)]"
      onClick={onClose}
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div
        className="flex w-[90%] h-[90%] bg-[#1A120B] p-5 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowLeft
          size={35}
          color="#E5E5CB"
          className="fixed left-[80px] top-[45px] hover:cursor-pointer hover:bg-[#3C2A21] p-1 rounded-[50%]"
          onClick={onClose}
        />
        
        {option === "profile" ? (
          <ProfileOptions />
        ) : option === "history" ? (
          <HistoryOptions />
        ) : null}
      </div>
    </div>
  );
};

export default DashboardModal;
