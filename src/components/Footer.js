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
    <footer className="py-8 bg-black border-t border-purple-900 relative overflow-hidden" ref={sectionRef}>
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950 to-black opacity-50"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div 
          ref={logoRef}
          className={`flex justify-center mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transform: logoTransform }}
        >
          <span className="text-2xl font-bold text-white hover:scale-110 transition-transform duration-300 cursor-default">
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
            { href: 'https://wa.me/916369838278', icon: 'fab fa-whatsapp' },
            { href: 'https://www.instagram.com/for__darkseid/', icon: 'fab fa-instagram' }
          ].map((social, index) => (
            <a 
              key={index}
              href={social.href} 
              className="social-icon text-purple-400 hover:text-purple-300 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
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
          <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300">
            &copy; 2025 Gowtham. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
