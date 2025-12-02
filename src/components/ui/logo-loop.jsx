import React from 'react';

export const LogoLoop = ({ logos, speed = 30 }) => {
  return (
    <div className="relative w-full overflow-hidden bg-transparent py-12">
      <div className="flex animate-logo-loop">
        {/* First set of logos */}
        <div className="flex space-x-8 md:space-x-16 pr-8 md:pr-16">
          {logos.map((logo, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex items-center justify-center min-w-[80px] md:min-w-[120px] h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              {logo.icon ? (
                <i className={`${logo.icon} text-4xl md:text-5xl text-gray-300 hover:text-white transition-colors duration-300`}></i>
              ) : logo.image ? (
                <img src={logo.image} alt={logo.name} className="h-10 md:h-12 w-auto object-contain" />
              ) : (
                <span className="text-xl md:text-2xl font-bold text-gray-300 hover:text-white">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex space-x-8 md:space-x-16 pr-8 md:pr-16">
          {logos.map((logo, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex items-center justify-center min-w-[80px] md:min-w-[120px] h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              {logo.icon ? (
                <i className={`${logo.icon} text-4xl md:text-5xl text-gray-300 hover:text-white transition-colors duration-300`}></i>
              ) : logo.image ? (
                <img src={logo.image} alt={logo.name} className="h-10 md:h-12 w-auto object-contain" />
              ) : (
                <span className="text-xl md:text-2xl font-bold text-gray-300 hover:text-white">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes logo-loop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-logo-loop {
          animation: logo-loop ${speed}s linear infinite;
        }
        .animate-logo-loop:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
