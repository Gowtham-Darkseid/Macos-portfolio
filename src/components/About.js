import React, { useState, useEffect, useRef } from 'react';
import { useAdvancedParallax } from '../hooks/useParallax';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);
  
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

  const personalInfo = [
    { label: "Name", value: "Gowtham", icon: "👤" },
    { label: "Email", value: "graj200026@gmail.com", icon: "📧" },
    { label: "Location", value: "Sivakasi, TN", icon: "📍" },
    { label: "Status", value: "Available", icon: "🟢" }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-32 bg-white relative overflow-hidden min-h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Elements with Advanced Parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          ref={bg1Ref}
          className="absolute w-64 h-64 bg-gray-100 rounded-full opacity-20"
          style={{
            left: `${mousePosition.x * 0.1}px`,
            top: `${mousePosition.y * 0.1}px`,
            ...getBg1Parallax(1, true),
            transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0}) ${getBg1Parallax(1, true).transform}`,
          }}
        />
        <div 
          ref={bg2Ref}
          className="absolute w-32 h-32 bg-black opacity-5 rounded-full"
          style={{
            right: `${300 - mousePosition.x * 0.05}px`,
            bottom: `${200 - mousePosition.y * 0.05}px`,
            ...getBg2Parallax(1, true),
            transform: `translate(50%, 50%) scale(${isVisible ? 1 : 0}) ${getBg2Parallax(1, true).transform}`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title with Animation and Advanced Parallax */}
        <div className="text-center mb-24" ref={titleRef} style={getTitleEntrance(0, 'top')}>
          <h2 className={`text-6xl md:text-8xl lg:text-9xl font-black text-black mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            About
          </h2>
          <div className={`w-32 h-2 bg-black mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`} />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Profile Section with Advanced Parallax */}
          <div className={`lg:w-2/5 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative group" ref={imageRef} style={getImageEntrance(200, 'left')}>
              {/* Floating Image Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />
                <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                  <img 
                    src="/assets/profile.jpeg" 
                    alt="Gowtham" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl animate-bounce">
                👋
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl animate-pulse">
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
              <h3 className="text-4xl lg:text-5xl font-bold text-black mb-6">
                Hello! I'm <span className="text-gray-600">Gowtham</span>
              </h3>
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                Aspiring <span className="font-semibold text-black">Web Solutions Engineer</span> & 
                <span className="font-semibold text-black"> Security Enthusiast</span> with strong programming skills in Java, Python, and 
                React.js. Experienced in building scalable web applications, API integrations, and automation workflows. 
                Passionate about delivering secure, user-focused solutions for real-world challenges.
              </p>
            </div>

            {/* Personal Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {personalInfo.map((info, index) => (
                <div
                  key={index}
                  className={`p-6 bg-gray-50 rounded-xl border-2 border-transparent hover:border-black transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    activeCard === index ? 'border-black bg-black text-yellow-400' : ''
                  }`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      activeCard === index ? 'bg-yellow-400 text-black' : 'bg-gray-200'
                    }`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className={`text-lg font-medium ${activeCard === index ? 'text-yellow-400' : 'text-gray-600'}`}>
                        {info.label}
                      </p>
                      <p className={`text-xl font-semibold ${activeCard === index ? 'text-yellow-400' : 'text-black'}`}>
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
                className="group px-10 py-4 bg-black text-white rounded-full text-lg font-medium transition-all duration-300 hover:bg-gray-800 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <span>Let's Connect</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a 
                href="https://drive.google.com/uc?export=download&id=1fErE1u2hzZTreZjL-xzAH8RMMU7duMix" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 border-2 border-black text-black rounded-full text-lg font-medium transition-all duration-300 hover:bg-black hover:text-white transform hover:scale-105 flex items-center justify-center"
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
