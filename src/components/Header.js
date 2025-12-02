import React, { useState, useEffect } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll effect and progress
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 transition-all duration-100 ease-out shadow-lg shadow-purple-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-gradient-to-b from-black/60 via-black/40 to-transparent shadow-lg shadow-purple-500/10' 
            : 'bg-transparent'
        }`}
        style={{
          backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(8px)',
          WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(8px)'
        }}
      >
        <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4 transition-all duration-300">
          
          {/* Logo with Animation */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="relative group"
          >
            <span className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
              GOWTHAM
            </span>
            
            {/* Underline Animation */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></div>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 bg-purple-950/50 rounded-full p-2">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group relative px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'text-white hover:bg-purple-900/50 hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-medium text-sm">{item.label}</span>
                
                {/* Active Indicator */}
                {activeSection === item.href.slice(1) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                )}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 bg-purple-600 rounded-lg flex flex-col justify-center items-center group focus:outline-none hover:scale-110 transition-transform duration-300"
          >
            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-1' : ''
            }`}></div>
            <div className={`w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}></div>
            <div className={`w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
            }`}></div>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}>
          <div className="bg-black rounded-2xl shadow-xl border border-purple-900 mt-4 p-4">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 hover:bg-purple-900/50 hover:translate-x-2 ${
                  activeSection === item.href.slice(1) ? 'bg-purple-600 text-white' : 'text-white'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="font-medium">{item.label}</span>
                
                {/* Arrow indicator */}
                <div className={`ml-auto transform transition-transform duration-300 ${
                  activeSection === item.href.slice(1) ? 'translate-x-0' : 'translate-x-4 opacity-0'
                }`}>
                  →
                </div>
              </a>
            ))}
          </div>
        </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
