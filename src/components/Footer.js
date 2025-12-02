import React, { useState, useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Parallax effects for footer elements
  const [logoRef, logoTransform] = useParallax(0.1, 0);
  const [socialRef, socialTransform] = useParallax(0.15, 0);
  const [textRef, textTransform] = useParallax(0.05, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="py-8 bg-gray-100 border-t border-gray-200 relative overflow-hidden" ref={sectionRef}>
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-50"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div 
          ref={logoRef}
          className={`flex justify-center mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transform: logoTransform }}
        >
          <span className="text-2xl font-bold text-black hover:scale-110 transition-transform duration-300 cursor-default">
            GOWTHAM
          </span>
        </div>
        
        <div 
          ref={socialRef}
          className={`flex justify-center space-x-6 mb-6 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transform: socialTransform }}
        >
          {[
            { href: 'https://github.com/Gowtham-Darkseid', icon: 'fab fa-github' },
            { href: 'https://www.linkedin.com/in/gowtham-darkseid/', icon: 'fab fa-linkedin-in' },
            { href: 'https://twitter.com', icon: 'fab fa-twitter' },
            { href: 'https://www.instagram.com/for__darkseid/', icon: 'fab fa-instagram' }
          ].map((social, index) => (
            <a 
              key={index}
              href={social.href} 
              className="social-icon text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
        
        <div 
          ref={textRef}
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transform: textTransform }}
        >
          <p className="text-gray-600 text-sm hover:text-gray-800 transition-colors duration-300">
            &copy; 2025 Gowtham. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
