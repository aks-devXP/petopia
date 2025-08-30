import { ArrowRight, BookOpen, Heart, PawPrint, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GuideCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const iconInterval = setInterval(() => {
      setActiveIcon(prev => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(iconInterval);
  }, []);

  const icons = [
    { Icon: Heart, color: 'text-pink-500', bgColor: 'bg-pink-100' },
    { Icon: BookOpen, color: 'text-blue-500', bgColor: 'bg-blue-100' },
    { Icon: Sparkles, color: 'text-yellow-500', bgColor: 'bg-yellow-100' }
  ];
  const Navigate = useNavigate();59
  const handleDictionaryClick = () => {
    Navigate("/guide-list")
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <PawPrint 
              className="text-yellow-300 opacity-20" 
              size={24 + Math.random() * 16} 
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Animated Icons Row */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          {icons.map(({ Icon, color, bgColor }, index) => (
            <div
              key={index}
              className={`relative transition-all duration-500 transform ${
                activeIcon === index 
                  ? 'scale-125 -translate-y-2' 
                  : 'scale-100 opacity-70'
              }`}
            >
              <div className={`${bgColor} p-4 rounded-full shadow-lg backdrop-blur-sm ${
                activeIcon === index ? 'animate-pulse' : ''
              }`}>
                <Icon className={`${color} w-8 h-8`} />
              </div>
              
              {/* Ripple effect for active icon */}
              {activeIcon === index && (
                <div className="absolute inset-0 rounded-full border-2 border-white opacity-30 animate-ping"></div>
              )}
            </div>
          ))}
        </div>

        {/* Main Heading */}
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Get to know{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              more
            </span>{' '}
            about your pet
          </h2>
          <p className="text-2xl sm:text-3xl text-blue-200 mb-8 font-medium">
            to care{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
                more
              </span>
              <Heart 
                className="absolute -top-1 -right-6 text-red-400 animate-bounce" 
                size={20}
                fill="currentColor"
              />
            </span>
          </p>
        </div>

        {/* Description */}
        <div className={`transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover comprehensive information about every dog and cat breed. 
            From personality traits to care requirements, unlock the secrets to 
            giving your furry friend the best life possible.
          </p>
        </div>

        {/* CTA Button */}
        <div className={`transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <button
            onClick={handleDictionaryClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Explore Pet Dictionary
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </div>

        {/* Feature badges */}
        <div className={`transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {['200+ Breeds', 'Care Tips', 'Health Info', 'Training Guides'].map((badge, index) => (
              <span
                key={badge}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors duration-300"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-3deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GuideCTA;