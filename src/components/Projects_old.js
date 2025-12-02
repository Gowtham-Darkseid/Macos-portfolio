import React, { useState, useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);
  const projectsContainerRef = useRef(null);
  
  // Parallax effects for different elements
  const [titleRef, titleTransform] = useParallax(0.1, 0);
  const [buttonRef, buttonTransform] = useParallax(0.15, 0);
  const [bgRef1, bgTransform1] = useParallax(0.25, 0);
  const [bgRef2, bgTransform2] = useParallax(-0.15, 0);
  const [bgRef3, bgTransform3] = useParallax(0.35, 0);

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

  useEffect(() => {
    // Only apply horizontal scroll on desktop
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    const setupHorizontalScroll = () => {
      if (mediaQuery.matches && horizontalRef.current && projectsContainerRef.current) {
        const container = projectsContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        const scrollTween = gsap.to(container, {
          x: -(scrollWidth - viewportWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: 'top top',
            end: () => `+=${scrollWidth - viewportWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        return scrollTween;
      }
    };

    const scrollTween = setupHorizontalScroll();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollTween) {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
      }
    };
  }, []);

  const projects = [
    {
      title: 'Food-Delivery',
      description: 'A full-featured online store with payment integration and admin dashboard.',
      image: '/assets/image.png',
      technologies: ['HTML-CSS-JS', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Gowtham-Darkseid/Food-delivery-site.git',
      live: 'https://eat-it-food.netlify.app/',
      category: 'Full Stack',
      year: '2024'
    },
    {
      title: 'Blood Donation',
      description: 'A life-saving web platform connecting blood donors with recipients through a seamless request and donation system.',
      image: '/assets/blood.png',
      technologies: ['Vue.js', 'Firebase', 'Tailwind'],
      github: 'https://github.com/Gowtham-Darkseid/Blood-Donation-webpage.git',
      live: 'https://blood-donar-life.netlify.app/',
      category: 'Social Impact',
      year: '2024'
    },
    {
      title: 'AR-food Menu',
      description: 'An interactive AR-based food menu app that enhances dining experiences by displaying 3D food models and nutritional information.',
      image: '/assets/armenu.png',
      technologies: ['Flutter', 'Firebase', 'Mysql'],
      github: 'https://github.com/Gowtham-Darkseid/Menumagic.git',
      live: 'https://app.flutterflow.io/share/menumagic-r6qfzh?page=Home',
      category: 'Mobile AR',
      year: '2023'
    },
    {
      title: 'SQL Injection Practice Site',
      description: 'A cybersecurity learning platform designed to teach SQL injection vulnerabilities and defense techniques in a controlled environment.',
      image: '/assets/image.png',
      technologies: ['PHP', 'MySQL', 'Security'],
      github: 'https://github.com/Gowtham-Darkseid',
      live: '#',
      category: 'Security',
      year: '2024'
    },
    {
      title: 'Mail Composer',
      description: 'A modern email composition tool with rich text editing, template management, and advanced formatting capabilities.',
      image: '/assets/image.png',
      technologies: ['React', 'Node.js', 'EmailJS'],
      github: 'https://github.com/Gowtham-Darkseid',
      live: '#',
      category: 'Productivity',
      year: '2024'
    },
    {
      title: 'EV Motors',
      description: 'An electric vehicle showcase platform featuring modern designs, specifications, and interactive configurator for eco-friendly transportation.',
      image: '/assets/image.png',
      technologies: ['Next.js', 'TypeScript', 'Framer Motion'],
      github: 'https://github.com/Gowtham-Darkseid',
      live: '#',
      category: 'Automotive',
      year: '2024'
    },
    {
      title: 'Live Weather Site',
      description: 'A real-time weather application providing detailed forecasts, interactive maps, and location-based weather alerts.',
      image: '/assets/image.png',
      technologies: ['React', 'Weather API', 'Charts.js'],
      github: 'https://github.com/Gowtham-Darkseid',
      live: '#',
      category: 'Web App',
      year: '2024'
    }
  ];

  return (
    <section id="projects" className="bg-white relative overflow-hidden" ref={sectionRef}>
      {/* White & Black Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          ref={bgRef1}
          className="absolute top-20 left-5 w-24 md:w-32 h-24 md:h-32 bg-black/5 rounded-full blur-xl opacity-60"
          style={{ transform: bgTransform1 }}
        />
        <div 
          ref={bgRef2}
          className="absolute top-1/2 right-10 w-32 md:w-48 h-32 md:h-48 bg-black/3 rounded-full blur-2xl opacity-40"
          style={{ transform: bgTransform2 }}
        />
        <div 
          ref={bgRef3}
          className="absolute bottom-20 left-1/4 w-16 md:w-24 h-16 md:h-24 bg-black/8 rounded-full blur-lg opacity-50"
          style={{ transform: bgTransform3 }}
        />
        {/* Geometric patterns - hidden on mobile for cleaner look */}
        <div className="hidden md:block absolute top-1/4 left-1/2 w-1 h-32 bg-black/10 transform rotate-45" />
        <div className="hidden md:block absolute bottom-1/3 right-1/4 w-1 h-24 bg-black/5 transform rotate-12" />
        <div className="hidden md:block absolute top-2/3 left-10 w-16 h-1 bg-black/8 transform rotate-45" />
      </div>

      {/* Title Section */}
      <div className="py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 max-w-7xl">
          <div ref={titleRef} style={{ transform: titleTransform }}>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span className="text-black font-light tracking-wider">
                FEATURED
              </span>
              <br />
              <span className="text-black font-black tracking-tighter">
                PROJECTS
              </span>
            </h2>
            <p className={`text-gray-600 text-center text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto px-4 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              A curated collection of innovative solutions and creative implementations
            </p>
            {/* Desktop Scroll Hint */}
            <p className="hidden lg:block text-center text-sm text-gray-400 mb-8">
              <i className="fas fa-arrow-right mr-2 animate-pulse"></i>
              Scroll to explore projects horizontally
              <i className="fas fa-arrow-left ml-2 animate-pulse"></i>
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container - Desktop Only */}
      <div ref={horizontalRef} className="hidden lg:block">
        <div ref={projectsContainerRef} className="flex gap-12 px-6" style={{ width: 'fit-content' }}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[800px] group relative"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="h-screen flex items-center">
                <div className="w-full">
                  
                  {/* Image Container */}
                  <div className="relative mb-6">
                    <div className={`relative overflow-hidden transition-all duration-700 group-hover:scale-105 
                      ${index % 3 === 0 ? 'rounded-3xl' : 
                        index % 3 === 1 ? 'rounded-tl-[3rem] rounded-br-[3rem]' : 
                        'rounded-tr-[3rem] rounded-bl-[3rem]'
                      } 
                      h-96`}>
                      
                      {/* Border frame */}
                      <div className="absolute inset-0 border-2 border-black/20 rounded-inherit z-10" />
                      
                      {/* Image */}
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      
                      {/* Overlay effects */}
                      <div className="absolute inset-0 bg-white/60 group-hover:bg-white/30 transition-all duration-500" />
                      
                      {/* Project number */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="text-6xl font-black text-black/20 leading-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      {/* Category badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm">
                          {project.category}
                        </span>
                      </div>
                      
                      {/* Year indicator */}
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="text-black/60 text-sm font-mono">
                          {project.year}
                        </span>
                      </div>
                      
                      {/* Hover reveal element */}
                      <div className="absolute inset-0 border-4 border-black opacity-0 group-hover:opacity-20 transition-all duration-500 rounded-inherit transform scale-95 group-hover:scale-100" />
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="flex flex-col justify-center space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <h3 className="text-4xl font-black text-black uppercase tracking-tight group-hover:tracking-wide transition-all duration-300 leading-tight">
                        {project.title.includes('-') ? 
                          project.title.split('-').map((word, wordIndex) => (
                            <span key={wordIndex} className={`${wordIndex % 2 === 0 ? 'block' : 'block text-gray-600'}`}>
                              {word}
                            </span>
                          )) :
                          project.title.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex} className={`${wordIndex % 2 === 0 ? 'inline' : 'inline text-gray-600'} mr-2`}>
                              {word}
                            </span>
                          ))
                        }
                      </h3>
                      
                      {/* Decorative line */}
                      <div className="w-16 h-1 bg-black group-hover:w-24 transition-all duration-500" />
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-700 text-lg leading-relaxed group-hover:text-black transition-colors duration-300">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 border border-gray-400 text-gray-600 text-sm font-medium uppercase tracking-wide hover:border-black hover:text-black transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Links */}
                    <div className="flex items-center gap-8 pt-4">
                      <a 
                        href={project.github} 
                        className="group/link flex items-center gap-3 text-black hover:text-gray-700 transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-10 h-10 border border-black rounded-full flex items-center justify-center group-hover/link:bg-black group-hover/link:text-white transition-all duration-300">
                          <i className="fab fa-github text-sm"></i>
                        </div>
                        <span className="font-medium uppercase tracking-wide text-sm">Code</span>
                      </a>
                      
                      {project.live !== '#' && (
                        <a 
                          href={project.live} 
                          className="group/link flex items-center gap-3 text-black hover:text-gray-700 transition-all duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="w-10 h-10 border border-black rounded-full flex items-center justify-center group-hover/link:bg-black group-hover/link:text-white transition-all duration-300">
                            <i className="fas fa-external-link-alt text-sm"></i>
                          </div>
                          <span className="font-medium uppercase tracking-wide text-sm">Live</span>
                        </a>
                      )}
                    </div>
                    
                    {/* Bottom decorative element */}
                    <div className="flex items-center gap-2 pt-4">
                      <div className="w-2 h-2 bg-black"></div>
                      <div className="flex-1 h-px bg-gradient-to-r from-black/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout - Vertical Scroll */}
      <div className="lg:hidden py-8">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {projects.map((project, index) => (
              <div 
                key={`mobile-${index}`}
                className={`group relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${hoveredProject === index ? 'scale-[1.01]' : ''}`}
                style={{ 
                  transitionDelay: `${200 + index * 150}ms`
                }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Mobile Card */}
                <div className="flex flex-col gap-4 sm:gap-6">
                  {/* Image Container */}
                  <div className="w-full relative">
                    <div className={`relative overflow-hidden transition-all duration-700 group-hover:scale-105 
                      ${index % 3 === 0 ? 'rounded-xl' : 
                        index % 3 === 1 ? 'rounded-tl-[3rem] rounded-br-[3rem]' : 
                        'rounded-tr-[3rem] rounded-bl-[3rem]'
                      } 
                      h-48 sm:h-56 md:h-64`}>
                      
                      <div className="absolute inset-0 border-2 border-black/20 rounded-inherit z-10" />
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-white/60 group-hover:bg-white/30 transition-all duration-500" />
                      
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                        <span className="text-3xl sm:text-4xl font-black text-black/20 leading-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                        <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm">
                          {project.category}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
                        <span className="text-black/60 text-xs sm:text-sm font-mono">
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="w-full flex flex-col space-y-3 sm:space-y-4 px-1 sm:px-2">
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase tracking-tight group-hover:tracking-wide transition-all duration-300 leading-tight">
                        {project.title.includes('-') ? 
                          project.title.split('-').map((word, wordIndex) => (
                            <span key={wordIndex} className={`${wordIndex % 2 === 0 ? 'block' : 'block text-gray-600'}`}>
                              {word}
                            </span>
                          )) :
                          project.title.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex} className={`${wordIndex % 2 === 0 ? 'inline' : 'inline text-gray-600'} mr-2`}>
                              {word}
                            </span>
                          ))
                        }
                      </h3>
                      <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-black group-hover:w-12 sm:group-hover:w-16 transition-all duration-500" />
                    </div>
                    
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed group-hover:text-black transition-colors duration-300">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-0.5 sm:px-2 sm:py-1 border border-gray-400 text-gray-600 text-xs sm:text-sm font-medium uppercase tracking-wide hover:border-black hover:text-black transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 pt-2">
                      <a 
                        href={project.github} 
                        className="group/link flex items-center gap-2 sm:gap-3 text-black hover:text-gray-700 transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 border border-black rounded-full flex items-center justify-center group-hover/link:bg-black group-hover/link:text-white transition-all duration-300">
                          <i className="fab fa-github text-xs sm:text-sm"></i>
                        </div>
                        <span className="font-medium uppercase tracking-wide text-xs sm:text-sm">Code</span>
                      </a>
                      
                      {project.live !== '#' && (
                        <a 
                          href={project.live} 
                          className="group/link flex items-center gap-2 sm:gap-3 text-black hover:text-gray-700 transition-all duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="w-7 h-7 sm:w-8 sm:h-8 border border-black rounded-full flex items-center justify-center group-hover/link:bg-black group-hover/link:text-white transition-all duration-300">
                            <i className="fas fa-external-link-alt text-xs sm:text-sm"></i>
                          </div>
                          <span className="font-medium uppercase tracking-wide text-xs sm:text-sm">Live</span>
                        </a>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black"></div>
                      <div className="flex-1 h-px bg-gradient-to-r from-black/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {/* CTA Section */}
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center" ref={buttonRef} style={{ transform: buttonTransform }}>
            <div className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} style={{ transitionDelay: '800ms' }}>
              <div className="inline-flex flex-col items-center gap-4 md:gap-6 px-4">
                <button 
                  className="group relative px-8 py-3 sm:px-12 sm:py-4 border-2 border-black text-black font-bold uppercase tracking-wider transition-all duration-500 transform hover:scale-105 hover:bg-black hover:text-white overflow-hidden text-sm sm:text-base"
                  onClick={() => window.open('https://github.com/Gowtham-Darkseid', '_blank')}
                >
                  <span className="relative flex items-center gap-2 sm:gap-4">
                    <i className="fab fa-github text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300"></i>
                    <span className="hidden sm:inline">Explore All Projects</span>
                    <span className="sm:hidden">All Projects</span>
                    <i className="fas fa-arrow-right text-xs sm:text-sm group-hover:translate-x-2 transition-transform duration-300"></i>
                  </span>
                  
                  <div className="absolute inset-0 border-2 border-black opacity-0 group-hover:opacity-100 transform scale-110 group-hover:scale-100 transition-all duration-500"></div>
                </button>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-gray-500 text-xs sm:text-sm uppercase tracking-wider">
                  <span className="border-b border-gray-300 pb-1">{projects.length} Projects</span>
                  <span className="border-b border-gray-300 pb-1 hidden sm:inline">Multiple Technologies</span>
                  <span className="border-b border-gray-300 pb-1">Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
