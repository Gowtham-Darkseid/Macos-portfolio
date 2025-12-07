import React, { useState, useEffect } from 'react';
import PageLoader from './components/PageLoader';
import MacOSMenuBar from './components/MacOSMenuBar';
import Hero from './components/Hero';
import MobileIOSView from './components/MobileIOSView';
import './index.css';

// Custom hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check for mobile user agent or screen width
      const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const mobileWidth = window.innerWidth < 768;
      setIsMobile(mobileUserAgent || mobileWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const isMobile = useIsMobile();

  const handleLoadComplete = () => {
    // Show content first (underneath the loader)
    setShowContent(true);
    // Then hide the loader after a brief moment
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  };

  return (
    <div className="App bg-black min-h-screen">
      {/* Content renders underneath the loader */}
      {showContent && (
        <>
          {isMobile ? (
            <MobileIOSView />
          ) : (
            <>
              <MacOSMenuBar appName="GOWTHAM" />
              <Hero />
            </>
          )}
        </>
      )}
      {/* Loader on top with fade out */}
      {isLoading && <PageLoader onLoadComplete={handleLoadComplete} />}
    </div>
  );
}

export default App;
