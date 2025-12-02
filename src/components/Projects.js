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
            end: () => `+=${scrollWidth - viewportWidth + viewportWidth / 2}`,
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

  const renderProjectCard = (project, index, isDesktop = false) => (
    <>
      {/* Image Container */}
      <div className={`relative ${isDesktop ? 'mb-6' : 'w-full'}`}>
        <div className={`relative overflow-hidden transition-all duration-700 group-hover:scale-105 
          ${index % 3 === 0 ? (isDesktop ? 'rounded-3xl' : 'rounded-xl') : 
            index % 3 === 1 ? (isDesktop ? 'rounded-tl-[3rem] rounded-br-[3rem]' : 'rounded-tl-[3rem] rounded-br-[3rem]') : 
            (isDesktop ? 'rounded-tr-[3rem] rounded-bl-[3rem]' : 'rounded-tr-[3rem] rounded-bl-[3rem]')
          } 
          ${isDesktop ? 'h-96' : 'h-48 sm:h-56 md:h-64'}`}>
          
          <div className="absolute inset-0 border-2 border-black/20 rounded-inherit z-10" />
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-white/60 group-hover:bg-white/30 transition-all duration-500" />
          
          <div className={`absolute z-20 ${isDesktop ? 'top-4 left-4' : 'top-3 left-3 sm:top-4 sm:left-4'}`}>
            <span className={`font-black text-black/20 leading-none ${isDesktop ? 'text-6xl' : 'text-3xl sm:text-4xl'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          <div className={`absolute z-20 ${isDesktop ? 'top-4 right-4' : 'top-3 right-3 sm:top-4 sm:right-4'}`}>
            <span className={`bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm ${isDesktop ? 'px-3 py-1.5' : 'px-2 py-1 sm:px-3 sm:py-1.5'}`}>
              {project.category}
            </span>
          </div>
          
          <div className={`absolute z-20 ${isDesktop ? 'bottom-4 left-4' : 'bottom-3 left-3 sm:bottom-4 sm:left-4'}`}>
            <span className={`text-black/60 font-mono ${isDesktop ? 'text-sm' : 'text-xs sm:text-sm'}`}>
              {project.year}
            </span>
          </div>
          
          <div className="absolute inset-0 border-4 border-black opacity-0 group-hover:opacity-20 transition-all duration-500 rounded-inherit transform scale-95 group-hover:scale-100" />
        </div>
      </div>
      
      {/* Content Container */}
      <div className={`flex flex-col justify-center ${isDesktop ? 'space-y-4' : 'space-y-3 sm:space-y-4 px-1 sm:px-2 w-full'}`}>
        <div className={isDesktop ? 'space-y-2' : 'space-y-1 sm:space-y-2'}>
          <h3 className={`font-black text-black uppercase tracking-tight group-hover:tracking-wide transition-all duration-300 leading-tight ${isDesktop ? 'text-4xl' : 'text-xl sm:text-2xl md:text-3xl'}`}>
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
          
          <div className={`bg-black group-hover:w-24 transition-all duration-500 ${isDesktop ? 'w-16 h-1' : 'w-8 sm:w-12 h-0.5 sm:h-1 sm:group-hover:w-16'}`} />
        </div>
        
        <p className={`text-gray-700 leading-relaxed group-hover:text-black transition-colors duration-300 ${isDesktop ? 'text-lg' : 'text-sm sm:text-base'}`}>
          {project.description}
        </p>
        
        <div className={`flex flex-wrap ${isDesktop ? 'gap-2' : 'gap-1 sm:gap-1.5'}`}>
          {project.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className={`border border-gray-400 text-gray-600 font-medium uppercase tracking-wide hover:border-black hover:text-black transition-all duration-300 ${isDesktop ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm'}`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className={`flex items-center ${isDesktop ? 'gap-8 pt-4' : 'flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 pt-2'}`}>
          <a 
            href={project.github} 
            className={`group/link flex items-center text-black hover:text-gray-700 transition-all duration-300 ${isDesktop ? 'gap-3' : 'gap-2 sm:gap-3'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`border border-black rounded-full flex items-center justify-center group-hover/link:bg-black group-hover/link:text-white transition-all duration-300 ${isDesktop ? 'w-10 h-10' : 'w-7 h-7 sm:w-8 sm:h-8'}`}>
              <i className={`fab fa-github ${isDesktop ? 'text-sm' : 'text-xs sm:text-sm'}`}></i>
            </div>
            <span className={`font-medium uppercase tracking-wide ${isDesktop ? 'text-sm' : 'text-xs sm:text-sm'}`}>Code</span>
          </a>
          
          {project.live !== '#' && (
            <a 
              href={project.live} 
              className={`group/link flex items-center text-black hover:text-gray-700 transition-all duration-300 ${isDesktop ? 'gap-3' : 'gap-2 sm:gap-3'}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`border border-black rounded-full flex items-center justify-center group-hover/link:bg-black group-hover/link:text-white transition-all duration-300 ${isDesktop ? 'w-10 h-10' : 'w-7 h-7 sm:w-8 sm:h-8'}`}>
                <i className={`fas fa-external-link-alt ${isDesktop ? 'text-sm' : 'text-xs sm:text-sm'}`}></i>
              </div>
              <span className={`font-medium uppercase tracking-wide ${isDesktop ? 'text-sm' : 'text-xs sm:text-sm'}`}>Live</span>
            </a>
          )}
        </div>
        
        <div className={`flex items-center gap-2 ${isDesktop ? 'pt-4' : 'pt-2'}`}>
          <div className={`bg-black ${isDesktop ? 'w-2 h-2' : 'w-1.5 h-1.5 sm:w-2 sm:h-2'}`}></div>
          <div className="flex-1 h-px bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>
      </div>
    </>
  );

  return (
    <section id="projects" className="bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
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
        <div className="hidden md:block absolute top-1/4 left-1/2 w-1 h-32 bg-black/10 transform rotate-45" />
        <div className="hidden md:block absolute bottom-1/3 right-1/4 w-1 h-24 bg-black/5 transform rotate-12" />
        <div className="hidden md:block absolute top-2/3 left-10 w-16 h-1 bg-black/8 transform rotate-45" />
      </div>

      {/* Mobile Title Section */}
      <div className="lg:hidden py-8 sm:py-12 md:py-20">
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
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container - Desktop Only */}
      <div ref={horizontalRef} className="hidden lg:block">
        {/* Desktop Title - Fixed at top */}
        <div className="absolute top-0 left-0 right-0 z-50 py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
              <span className="text-black font-light tracking-wider">
                FEATURED
              </span>
              <br />
              <span className="text-black font-black tracking-tighter">
                PROJECTS
              </span>
            </h2>
            <p className="text-gray-600 text-center text-lg mb-6 max-w-2xl mx-auto">
              A curated collection of innovative solutions and creative implementations
            </p>
            <p className="text-center text-sm text-gray-400">
              <i className="fas fa-arrow-right mr-2 animate-pulse"></i>
              Scroll to explore projects horizontally
              <i className="fas fa-arrow-left ml-2 animate-pulse"></i>
            </p>
          </div>
        </div>
        
        <div ref={projectsContainerRef} className="flex gap-12 pt-48" style={{ width: 'fit-content', paddingLeft: 'calc(50vw - 400px)', paddingRight: 'calc(50vw - 400px)' }}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[800px] group relative"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="h-screen flex items-center">
                <div className="w-full">
                  {renderProjectCard(project, index, true)}
                </div>
              </div>
            </div>
          ))}
          
          {/* Desktop CTA - Inside horizontal scroll */}
          <div className="flex-shrink-0 w-[800px] h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex flex-col items-center gap-6">
                <button 
                  className="group relative px-12 py-4 border-2 border-black text-black font-bold uppercase tracking-wider transition-all duration-500 transform hover:scale-105 hover:bg-black hover:text-white overflow-hidden"
                  onClick={() => window.open('https://github.com/Gowtham-Darkseid', '_blank')}
                >
                  <span className="relative flex items-center gap-4">
                    <i className="fab fa-github text-xl group-hover:rotate-12 transition-transform duration-300"></i>
                    <span>Explore All Projects</span>
                    <i className="fas fa-arrow-right text-sm group-hover:translate-x-2 transition-transform duration-300"></i>
                  </span>
                  
                  <div className="absolute inset-0 border-2 border-black opacity-0 group-hover:opacity-100 transform scale-110 group-hover:scale-100 transition-all duration-500"></div>
                </button>
                
                <div className="flex items-center gap-8 text-gray-500 text-sm uppercase tracking-wider">
                  <span className="border-b border-gray-300 pb-1">{projects.length} Projects</span>
                  <span className="border-b border-gray-300 pb-1">Multiple Technologies</span>
                  <span className="border-b border-gray-300 pb-1">Innovation</span>
                </div>
              </div>
            </div>
          </div>
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
                <div className="flex flex-col gap-4 sm:gap-6">
                  {renderProjectCard(project, index, false)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-4 px-4">
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
    </section>
  );
};

export default Projects;
