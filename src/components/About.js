import React, { useState, useEffect, useRef } from 'react';
import { useAdvancedParallax } from '../hooks/useParallax';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const sectionRef = useRef(null);
  const imageCardRef = useRef(null);
  
  // Advanced parallax effects for bidirectional animations
  const [titleRef, , , , getTitleEntrance] = useAdvancedParallax(0.1);
  const [imageRef, , , , getImageEntrance] = useAdvancedParallax(0.15);
  const [contentRef, , , , getContentEntrance] = useAdvancedParallax(0.05);
  const [bg1Ref, , , getBg1Parallax] = useAdvancedParallax(0.3);
  const [bg2Ref, , , getBg2Parallax] = useAdvancedParallax(-0.2);

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

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleImageMouseMove = (e) => {
    if (!imageCardRef.current) return;
    
    const rect = imageCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setTilt({ rotateX, rotateY });
  };

  const handleImageMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const personalInfo = [
    { label: "Name", value: "Gowtham", icon: "👤" },
    { label: "Email", value: "graj200026@gmail.com", icon: "✉️" },
    { label: "Location", value: "Sivakasi, TN", icon: "📍" },
    { label: "Status", value: "Available", icon: "🟢" }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden min-h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Elements with Advanced Parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          ref={bg1Ref}
          className="absolute w-64 h-64 rounded-full opacity-30 blur-3xl"
          style={{
            left: `${mousePosition.x * 0.1}px`,
            top: `${mousePosition.y * 0.1}px`,
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)',
            ...getBg1Parallax(1, true),
            transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0}) ${getBg1Parallax(1, true).transform}`,
          }}
        />
        <div 
          ref={bg2Ref}
          className="absolute w-32 h-32 rounded-full opacity-25 blur-2xl"
          style={{
            right: `${300 - mousePosition.x * 0.05}px`,
            bottom: `${200 - mousePosition.y * 0.05}px`,
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 100%)',
            ...getBg2Parallax(1, true),
            transform: `translate(50%, 50%) scale(${isVisible ? 1 : 0}) ${getBg2Parallax(1, true).transform}`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title with Animation and Advanced Parallax */}
        <div className="text-center mb-24" ref={titleRef} style={getTitleEntrance(0, 'top')}>
          <h2 className={`text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            About
          </h2>
          <div className={`w-32 h-2 bg-purple-600 mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`} />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Profile Section with Advanced Parallax */}
          <div className={`lg:w-2/5 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div 
              className="relative group" 
              ref={imageRef} 
              style={getImageEntrance(200, 'left')}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
            >
              {/* Floating Image Container */}
              <div 
                ref={imageCardRef}
                className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto"
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                  transition: 'transform 0.1s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-700 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" style={{ transform: 'translateZ(20px)' }} />
                <div className="absolute inset-0 bg-purple-600 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500" style={{ transform: 'translateZ(40px)' }} />
                <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 shadow-2xl" style={{ transform: 'translateZ(60px)' }}>
                  <img 
                    src="/assets/profile.jpeg" 
                    alt="Gowtham" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl animate-bounce shadow-lg shadow-purple-500/50" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)', transform: 'translateZ(80px)' }}>
                👋
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full flex items-center justify-center text-3xl animate-pulse shadow-lg shadow-purple-500/50" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', transform: 'translateZ(80px)' }}>
                💻
              </div>
            </div>
          </div>

          {/* Content Section with Advanced Parallax */}
          <div className={`lg:w-3/5 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`} ref={contentRef} style={getContentEntrance(400, 'right')}>
            {/* Introduction */}
            <div className="mb-12">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Hello! I'm <span className="text-purple-400">Gowtham</span>
              </h3>
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8">
                Aspiring <span className="font-semibold text-purple-400">Web Solutions Engineer</span> & 
                <span className="font-semibold text-purple-400"> Security Enthusiast</span> with strong programming skills in Java, Python, and 
                React.js. Experienced in building scalable web applications, API integrations, and automation workflows. 
                Passionate about delivering secure, user-focused solutions for real-world challenges.
              </p>
            </div>

            {/* Personal Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
              {personalInfo.map((info, index) => (
                <div
                  key={index}
                  className={`p-4 md:p-6 bg-purple-950/30 rounded-lg md:rounded-xl border-2 border-transparent hover:border-purple-600 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    activeCard === index ? 'border-purple-600 bg-purple-900 text-white' : ''
                  }`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div 
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl transform transition-all duration-300 flex-shrink-0 ${
                        activeCard === index ? 'scale-110 shadow-lg shadow-purple-500/50' : ''
                      }`}
                      style={{
                        background: activeCard === index 
                          ? 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)'
                          : 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(124, 58, 237, 0.3) 100%)',
                        border: activeCard === index ? '2px solid rgba(168, 85, 247, 0.5)' : '2px solid rgba(139, 92, 246, 0.2)',
                        aspectRatio: '1/1'
                      }}
                    >
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm md:text-lg font-medium ${activeCard === index ? 'text-purple-200' : 'text-gray-400'}`}>
                        {info.label}
                      </p>
                      <p className={`text-base md:text-xl font-semibold truncate ${activeCard === index ? 'text-white' : 'text-white'}`}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <a 
                href="#contact" 
                className="group px-10 py-4 bg-purple-600 text-white rounded-full text-lg font-medium transition-all duration-300 hover:bg-purple-700 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <span>Let's Connect</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a 
                href="https://drive.google.com/uc?export=download&id=1fErE1u2hzZTreZjL-xzAH8RMMU7duMix" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 border-2 border-purple-600 text-white rounded-full text-lg font-medium transition-all duration-300 hover:bg-purple-600 hover:text-white transform hover:scale-105 flex items-center justify-center"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default About;
