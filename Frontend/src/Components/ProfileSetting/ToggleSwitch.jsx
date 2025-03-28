import React, { useState } from 'react';

const SunMoonToggle = ({ scale = 0.5 }) => {
  const [isChecked, setIsChecked] = useState(false);
  
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="switch" style={{ transform: `scale(${scale})` }}>
      <input 
        type="checkbox" 
        className="switch__input" 
        id="Switch"
        checked={isChecked}
        onChange={handleChange}
      />
      <label className="switch__label" htmlFor="Switch">
        <span className="switch__indicator"></span>
        <span className="switch__decoration"></span>
      </label>
      
      <style jsx>{`
        .switch {
          display: inline-block;
          position: relative;
          width: fit-content;
          height: fit-content;
        }
        .switch__input {
          clip: rect(1px, 1px, 1px, 1px);
          clip-path: inset(50%);
          height: 1px;
          width: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
        }
        .switch__label {
          position: relative;
          display: inline-block;
          width: 8.5rem;
          height: 4.5rem;
          background-color: #2B2B2B;
          border: 5px solid #5B5B5B;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(.46,.03,.52,.96);
        }
        .switch__indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateX(-72%);
          display: block;
          width: 40px;
          height: 40px;
          background-color: #7B7B7B;
          border-radius: 9999px;
          box-shadow: 10px 0px 0 0 rgba(0, 0, 0, 0.2) inset;
          transition: all 0.4s cubic-bezier(.46,.03,.52,.96);
        }
        .switch__indicator::before,
        .switch__indicator::after {
          position: absolute;
          content: '';
          display: block;
          background-color: #FFFFFF;
          border-radius: 9999px;
          transition: all 0.4s cubic-bezier(.46,.03,.52,.96);
        }
        .switch__indicator::before {
          top: 7px;
          left: 7px;
          width: 9px;
          height: 9px;
          background-color: #FFFFFF;
          opacity: 0.6;
        }
        .switch__indicator::after {
          bottom: 8px;
          right: 6px;
          width: 14px;
          height: 14px;
          background-color: #FFFFFF;
          opacity: 0.8;
        }
        .switch__decoration {
          position: absolute;
          top: 65%;
          left: 50%;
          display: block;
          width: 5px;
          height: 5px;
          background-color: #FFFFFF;
          border-radius: 9999px;
          animation: twinkle 0.8s infinite -0.6s;
        }
        .switch__decoration::before,
        .switch__decoration::after {
          position: absolute;
          display: block;
          content: '';
          width: 5px;
          height: 5px;
          background-color: #FFFFFF;
          border-radius: 9999px;
        }
        .switch__decoration::before {
          top: -20px;
          left: 10px;
          opacity: 1;
          animation: twinkle 0.6s infinite;
        }
        .switch__decoration::after {
          top: -7px;
          left: 30px;
          animation: twinkle 0.6s infinite -0.2s;
        }
        @keyframes twinkle {
          50% { opacity: 0.2; }
        }
        
        .switch__input:checked + .switch__label {
          background-color: #8FB5F5;
          border-color: #347CF8;
        }
        .switch__input:checked + .switch__label .switch__indicator {
          background-color: #ECD21F;
          box-shadow: none;
          transform: translate(-50%, -50%) translateX(72%);
        }
        .switch__input:checked + .switch__label .switch__indicator::before,
        .switch__input:checked + .switch__label .switch__indicator::after {
          display: none;
        }
        .switch__input:checked + .switch__label .switch__decoration {
          top: 50%;
          transform: translate(0%, -50%);
          animation: cloud 8s linear infinite;
          width: 20px;
          height: 20px;
        }
        .switch__input:checked + .switch__label .switch__decoration::before {
          width: 10px;
          height: 10px;
          top: auto;
          bottom: 0;
          left: -8px;
          animation: none;
        }
        .switch__input:checked + .switch__label .switch__decoration::after {
          width: 15px;
          height: 15px;
          top: auto;
          bottom: 0;
          left: 16px;
          animation: none;
        }
        .switch__input:checked + .switch__label .switch__decoration,
        .switch__input:checked + .switch__label .switch__decoration::before,
        .switch__input:checked + .switch__label .switch__decoration::after {
          border-radius: 9999px 9999px 0 0;
        }
        .switch__input:checked + .switch__label .switch__decoration::after {
          border-bottom-right-radius: 9999px;
        }
        @keyframes cloud {
          0% {
            transform: translate(0%, -50%);
          }
          50% {
            transform: translate(-50%, -50%);
          }
          100% {
            transform: translate(0%, -50%);
          }
        }
      `}</style>
    </div>
  );
};

export default SunMoonToggle;