import React, { useState, useEffect, useRef } from 'react';
import MultiOrbitSemiCircle from './ui/MultiOrbitSemiCircle.js';
import { LogoLoop } from './ui/logo-loop.jsx';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Delay skills animation slightly for better effect
          setTimeout(() => setSkillsAnimated(true), 300);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const frontendSkills = [
    { name: 'HTML/CSS', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 }
  ];

  const backendSkills = [
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 80 },
    { name: 'Database', level: 85 }
  ];

  const technologies = [
    { name: 'Git', icon: 'fab fa-git-alt' },
    { name: 'Docker', icon: 'fab fa-docker' },
    { name: 'AWS', icon: 'fab fa-aws' },
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'Linux', icon: 'fab fa-linux' },
    { name: 'Figma', icon: 'fab fa-figma' },
    { name: 'GitHub', icon: 'fab fa-github' },
    { name: 'npm', icon: 'fab fa-npm' }
  ];

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden" ref={sectionRef}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={`absolute top-20 left-8 w-24 h-24 bg-purple-900 rounded-full opacity-30 transition-all duration-1000 ${
            isVisible ? 'animate-bounce' : 'scale-0'
          }`}
          style={{ animationDelay: '0ms' }}
        />
        <div 
          className={`absolute bottom-32 right-16 w-16 h-16 bg-purple-700 rounded-full opacity-40 transition-all duration-1000 ${
            isVisible ? 'animate-pulse' : 'scale-0'
          }`}
          style={{ animationDelay: '200ms' }}
        />
        <div 
          className={`absolute top-1/2 right-8 w-12 h-12 bg-purple-500 rounded-full opacity-25 transition-all duration-1000 ${
            isVisible ? 'animate-bounce' : 'scale-0'
          }`}
          style={{ animationDelay: '400ms' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            My Skills
          </h2>
          <div className={`w-24 h-1 bg-purple-600 mx-auto mt-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`} />
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Frontend Skills */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
              <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
              Frontend Development
            </h3>
            
            <div className="space-y-6">
              {frontendSkills.map((skill, index) => (
                <div key={index} className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`} style={{ transitionDelay: `${400 + index * 150}ms` }}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-purple-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-purple-950/30 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r from-purple-600 to-purple-400 h-3 rounded-full transition-all duration-2000 ease-out ${
                        skillsAnimated ? '' : 'w-0'
                      }`}
                      style={{ 
                        width: skillsAnimated ? `${skill.level}%` : '0%',
                        transitionDelay: `${600 + index * 200}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Backend Skills */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
              <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
              Backend Development
            </h3>
            
            <div className="space-y-6">
              {backendSkills.map((skill, index) => (
                <div key={index} className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`} style={{ transitionDelay: `${600 + index * 150}ms` }}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-purple-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-purple-950/30 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r from-purple-600 to-purple-400 h-3 rounded-full transition-all duration-2000 ease-out ${
                        skillsAnimated ? '' : 'w-0'
                      }`}
                      style={{ 
                        width: skillsAnimated ? `${skill.level}%` : '0%',
                        transitionDelay: `${800 + index * 200}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tools & Technologies */}
        <div className={`transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-semibold mb-16 text-center text-white">
            Tools & Technologies
          </h3>
          
          {/* Desktop: Multi-Orbit Semi-Circle */}
          <div className="hidden md:block">
            <MultiOrbitSemiCircle />
          </div>
          
          {/* Mobile: Logo Loop */}
          <div className="block md:hidden">
            <LogoLoop logos={technologies} speed={25} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
