import React, { useState, useEffect } from 'react';
import { VisitorTracker } from '../utils/visitorTracker';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visitorCount, setVisitorCount] = useState(247);
  const [isLoading, setIsLoading] = useState(true);
  const [countAnimation, setCountAnimation] = useState(false);

  useEffect(() => {
    // Initialize visitor tracking
    const tracker = new VisitorTracker({
      siteName: 'portfolio',
      enableLocalStorage: true,
      enableSessionTracking: true
    });

    // Load visitor count
    const loadVisitorCount = async () => {
      try {
        setIsLoading(true);
        
        // Check if this is a new visitor
        if (!tracker.hasVisited()) {
          await tracker.trackNewVisitor();
          setCountAnimation(true);
          setTimeout(() => setCountAnimation(false), 1000);
        }
        
        // Get current count using local tracking
        const count = await tracker.getLocalVisitorCount();
        setVisitorCount(count);
        
      } catch (error) {
        console.warn('Failed to load visitor count:', error);
        setVisitorCount(247); // Fallback count
      } finally {
        setIsLoading(false);
      }
    };

    loadVisitorCount();

    // Handle scroll visibility
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-2">
          {/* Visitor Counter */}
          <div className="bg-purple-950/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg border border-purple-600/20 transition-all duration-300 hover:bg-purple-900/80 group">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">
                {isLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <span className={`transition-all duration-500 ${countAnimation ? 'scale-110 text-green-400' : ''}`}>
                    {formatCount(visitorCount)} visitors
                  </span>
                )}
              </span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-purple-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Total site visitors
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-purple-700 border-2 border-purple-500/30"
            aria-label="Scroll to top"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;