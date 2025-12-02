import React, { useState, useEffect } from 'react';
import FloatingLines from '../component/FloatingLines.tsx';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        <FloatingLines />
      </div>
      
      {/* Center text */}
      <div className="relative z-10 text-center text-white transition-colors duration-500 px-4 max-w-6xl mx-auto -mt-16 md:mt-0">
        <h1 
          className={`text-5xl md:text-[8rem] lg:text-[10rem] font-extralight tracking-[0.2em] mb-6 transition-all duration-1000 ease-out ${
            mounted 
              ? "opacity-100 translate-y-0 blur-0" 
              : "opacity-0 translate-y-8 blur-sm"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          {"GOWTHAM".split("").map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-500 md:hover:animate-wave ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ 
                transitionDelay: `${800 + i * 50}ms`,
                animationDelay: `${i * 0.1}s`
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p 
          className={`text-xs md:text-lg text-gray-300 tracking-[0.3em] transition-all duration-1000 ease-out ${
            mounted 
              ? "opacity-100 translate-y-0 blur-0" 
              : "opacity-0 translate-y-8 blur-sm"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          WEB SOLUTIONS ENGINEER & SECURITY ENTHUSIAST
        </p>
      </div>

      {/* Unique Scroll Down Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "1600ms" }}
        onClick={scrollToAbout}
      >
        {/* Animated Text */}
        <div className="mb-4 overflow-hidden">
          <p className="text-purple-400 text-xs tracking-[0.3em] font-light animate-pulse">
            SCROLL
          </p>
        </div>

        {/* Circular Progress Indicator */}
        <div className="relative w-12 h-12">
          {/* Outer Ring */}
          <svg className="w-12 h-12 -rotate-90 animate-spin-slow" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="125.6"
              strokeDashoffset="31.4"
              strokeLinecap="round"
              className="transition-all duration-300 group-hover:stroke-dashoffset-0"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Arrow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-4 h-4 text-purple-400 animate-bounce-slow"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>

        {/* Bottom Dot */}
        <div className="mt-2 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(-90deg);
          }
          to {
            transform: rotate(270deg);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          25% {
            transform: translateY(-15px) scale(1.1);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
          }
          75% {
            transform: translateY(-12px) scale(1.08);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        @media (min-width: 768px) {
          .md\\:hover\\:animate-wave:hover {
            animation: wave 0.6s ease-in-out;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
