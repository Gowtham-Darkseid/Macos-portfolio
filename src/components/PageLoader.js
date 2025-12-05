import React, { useState, useEffect } from 'react';

const PageLoader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Start exit animation at 2.5s, complete at 3s
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    const completeTimer = setTimeout(() => {
      onLoadComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-purple-950/30" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-12">
        {/* Developer code style animation */}
        <div className="relative flex flex-col items-center">
          {/* Code-like display */}
          <div className="font-mono text-lg text-purple-400 mb-4 animate-fade-in">
            <span className="text-purple-600">{'{'}</span> developer <span className="text-purple-600">{'}'}</span>
          </div>
          
          {/* Main animated logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
            <div className="relative text-7xl font-bold">
              <span className="text-purple-500">&lt;</span>
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text animate-pulse-scale">G</span>
              <span className="text-purple-500">/&gt;</span>
            </div>
          </div>
          
          {/* Cursor blink */}
          <div className="mt-2 flex items-center font-mono text-purple-400">
            <span>portfolio</span>
            <span className="ml-1 animate-ping">_</span>
          </div>
        </div>

        {/* Simple progress indicator */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-purple-400 font-mono text-2xl font-bold animate-fade-in">
            {progress}%
          </div>
          
          {/* Minimal progress bar */}
          <div className="w-48 h-1 bg-purple-950/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-purple-600/30 animate-fade-in" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-purple-600/30 animate-fade-in" />
    </div>
  );
};

export default PageLoader;
