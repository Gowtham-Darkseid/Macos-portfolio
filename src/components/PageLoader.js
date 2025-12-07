import React, { useState, useEffect } from 'react';

const PageLoader = ({ onLoadComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar smoothly like Mac boot
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Simulate realistic loading with variable speed
        const increment = Math.random() * 3 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    // Start exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3200);

    const completeTimer = setTimeout(() => {
      onLoadComplete();
    }, 3700);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Pure black background like Mac boot */}
      <div className="absolute inset-0 bg-black" />

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Apple Logo */}
        <div 
          className={`transition-all duration-1000 ${
            isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
          style={{
            animation: 'fadeInScale 0.8s ease-out forwards'
          }}
        >
          <svg 
            viewBox="0 0 170 170" 
            className="w-20 h-20 md:w-24 md:h-24 text-white mb-16"
            fill="currentColor"
          >
            {/* Apple logo path */}
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z"/>
          </svg>
        </div>

        {/* Progress Bar Container */}
        <div 
          className={`transition-all duration-700 ${
            isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.3s forwards',
            opacity: 0
          }}
        >
          {/* Progress bar background */}
          <div className="w-48 md:w-56 h-1 bg-white/20 rounded-full overflow-hidden">
            {/* Progress bar fill */}
            <div 
              className="h-full bg-white rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Name below progress bar */}
          <div className="mt-6 text-center">
            <span className="text-white/60 text-sm font-light tracking-widest uppercase">
              Gowtham
            </span>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
