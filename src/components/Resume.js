import React, { useState, useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Parallax effects for different elements
  const [titleRef, titleTransform] = useParallax(0.1, 0);
  const [buttonRef, buttonTransform] = useParallax(0.2, 0);
  const [experienceRef, experienceTransform] = useParallax(0.15, 0);
  const [educationRef, educationTransform] = useParallax(-0.1, 0);
  const [bgRef1, bgTransform1] = useParallax(0.3, 0);
  const [bgRef2, bgTransform2] = useParallax(-0.25, 0);
  const [bgImageRef, bgImageTransform] = useParallax(-0.15, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Present',
      period: 'Present',
      description: 'To build responsive web applications using React and TypeScript. Improved performance by 40% through code optimization and modern techniques.'
    },
    {
      title: 'Graphics Designer',
      company: 'Rengatechnologies',
      period: '2023',
      description: 'Designed user interfaces and graphics for web applications. Collaborated with developers to ensure design feasibility and consistency.'
    }
  ];

  const education = [
    {
      degree: 'MCA in Computer Science',
      institution: 'SNSCT',
      period: '2024 - 2026',
      description: 'Specialized in Artificial Intelligence and Web Technologies. Thesis on "Neural Networks for Web Accessibility".'
    },
    {
      degree: 'BSc in Computer Science',
      institution: 'SRNM',
      period: '2021 - 2024',
      description: 'Graduated with honors. President of the Computer Science Club. Developed campus event management system as capstone project.'
    }
  ];

  return (
    <section id="resume" className="py-20 bg-black relative overflow-hidden" ref={sectionRef}>
      {/* Parallax Background Image */}
      <div 
        ref={bgImageRef}
        className="absolute inset-0 z-0"
        style={{ transform: bgImageTransform }}
      >
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div 
          ref={bgRef1}
          className="absolute top-20 right-10 w-28 h-28 bg-purple-900 rounded-full opacity-40"
          style={{ transform: bgTransform1 }}
        />
        <div 
          ref={bgRef2}
          className="absolute bottom-24 left-8 w-20 h-20 bg-purple-700 rounded-full opacity-30"
          style={{ transform: bgTransform2 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} style={{ transform: titleTransform }}>
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="text-white">My Resume</span>
          </h2>
        </div>
        
        <div className="text-center mb-12" ref={buttonRef} style={{ transform: buttonTransform }}>
          <a 
            href="https://drive.google.com/uc?export=download&id=1fErE1u2hzZTreZjL-xzAH8RMMU7duMix" 
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg text-white ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <i className="fas fa-download mr-2"></i> Download Resume
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div ref={experienceRef} style={{ transform: experienceTransform }}>
            <h3 className={`text-2xl font-semibold mb-6 flex items-center text-white transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <i className="fas fa-briefcase mr-3 text-purple-400"></i> Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`relative pl-8 transition-all duration-1000 transform hover:scale-105 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                  }`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-purple-600 animate-pulse"></div>
                  {index < experiences.length - 1 && (
                    <div className="absolute left-2 top-4 w-0.5 h-full bg-purple-900"></div>
                  )}
                  <div className="bg-purple-950/30 p-6 rounded-lg shadow-lg border border-purple-900 hover:shadow-xl hover:bg-purple-900/30 transition-all duration-300">
                    <h4 className="text-xl font-medium mb-1 text-white">{exp.title}</h4>
                    <div className="text-purple-400 mb-2">{exp.company} • {exp.period}</div>
                    <p className="text-gray-400">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div ref={educationRef} style={{ transform: educationTransform }}>
            <h3 className={`text-2xl font-semibold mb-6 flex items-center text-white transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <i className="fas fa-graduation-cap mr-3 text-purple-400"></i> Education
            </h3>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className={`relative pl-8 transition-all duration-1000 transform hover:scale-105 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-purple-600 animate-pulse"></div>
                  {index < education.length - 1 && (
                    <div className="absolute left-2 top-4 w-0.5 h-full bg-purple-900"></div>
                  )}
                  <div className="bg-purple-950/30 p-6 rounded-lg shadow-lg border border-purple-900 hover:shadow-xl hover:bg-purple-900/30 transition-all duration-300">
                    <h4 className="text-xl font-medium mb-1 text-white">{edu.degree}</h4>
                    <div className="text-purple-400 mb-2">{edu.institution} • {edu.period}</div>
                    <p className="text-gray-400">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
