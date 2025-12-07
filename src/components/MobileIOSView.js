import React, { useState, useEffect } from 'react';

// iOS-style Status Bar with time and indicators
const IOSStatusBar = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formattedTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-6 pt-2">
      <span className="text-white text-sm font-semibold">{formattedTime}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <div className="flex items-end gap-0.5">
          <div className="w-1 h-1 bg-white rounded-sm"></div>
          <div className="w-1 h-1.5 bg-white rounded-sm"></div>
          <div className="w-1 h-2 bg-white rounded-sm"></div>
          <div className="w-1 h-2.5 bg-white rounded-sm"></div>
        </div>
        {/* WiFi */}
        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.1c1.2-1.2 2.9-2 4.9-2s3.7.8 4.9 2l1.4-1.4c-1.6-1.6-3.9-2.6-6.3-2.6s-4.7 1-6.3 2.6l1.4 1.4zm-2.8-2.8c2-2 4.8-3.2 7.7-3.2s5.7 1.2 7.7 3.2l1.4-1.4c-2.4-2.4-5.6-3.8-9.1-3.8S4.5 9.3 2.1 11.7l1.4 1.4z"/>
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-0.5 ml-0.5">
          <div className="w-6 h-3 border border-white rounded-sm flex items-center p-0.5">
            <div className="w-full h-1.5 bg-green-500 rounded-sm"></div>
          </div>
          <div className="w-0.5 h-1.5 bg-white rounded-r-sm"></div>
        </div>
      </div>
    </div>
  );
};

// iOS App Icon Component - Enhanced for mobile
const AppIcon = ({ icon, label, onClick, badge, isFolder }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform touch-manipulation"
  >
    <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-[22%] shadow-lg overflow-hidden ${isFolder ? 'bg-gray-200/30 backdrop-blur-xl p-1.5 grid grid-cols-2 gap-0.5' : ''}`}>
      {isFolder ? (
        icon.map((folderIcon, i) => (
          <div key={i} className="w-full h-full rounded-lg bg-white/20 flex items-center justify-center text-xs">
            {folderIcon}
          </div>
        ))
      ) : typeof icon === 'string' ? (
        icon.startsWith('/') || icon.startsWith('http') ? (
          <img src={icon} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl">
            {icon}
          </div>
        )
      ) : (
        icon
      )}
      {badge && (
        <div className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold px-1 shadow-md">
          {badge}
        </div>
      )}
    </div>
    <span className="text-white text-[11px] font-medium text-center max-w-14 sm:max-w-16 truncate drop-shadow-lg">
      {label}
    </span>
  </button>
);

// iOS Home Indicator
const HomeIndicator = () => (
  <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-36 h-1 bg-white rounded-full z-50 opacity-60"></div>
);

// About Me Modal (iOS Sheet Style)
const AboutSheet = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div 
        className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] rounded-t-3xl max-h-[85vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="sticky top-0 py-3 flex justify-center bg-[#1C1C1E] z-10">
          <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
        </div>
        
        <div className="px-6 pb-10">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 mb-3">
              <img 
                src="/assets/profile.jpeg" 
                alt="Gowtham" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-white text-2xl font-bold">Gowtham</h2>
            <p className="text-blue-400 text-sm">Web Solutions Engineer</p>
          </div>

          {/* Info Cards */}
          <div className="space-y-3">
            <div className="bg-[#2C2C2E] rounded-2xl p-4">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-2">About</h3>
              <p className="text-white text-sm leading-relaxed">
                Aspiring Web Solutions Engineer & Security Enthusiast with strong programming skills in Java, Python, and React.js.
              </p>
            </div>

            <div className="bg-[#2C2C2E] rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-gray-400 text-xs">Location</p>
                    <p className="text-white">Sivakasi, TN</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="text-white">graj200026@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🟢</span>
                  <div>
                    <p className="text-gray-400 text-xs">Status</p>
                    <p className="text-green-400">Available for opportunities</p>
                  </div>
                </div>
              </div>
            </div>

            <a 
              href="https://drive.google.com/uc?export=download&id=1fErE1u2hzZTreZjL-xzAH8RMMU7duMix"
              className="block w-full py-3.5 bg-blue-500 text-white text-center font-semibold rounded-2xl active:bg-blue-600"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skills Sheet
const SkillsSheet = ({ isOpen, onClose }) => {
  const skills = [
    { name: 'React.js', level: 90, color: '#61DAFB' },
    { name: 'JavaScript', level: 85, color: '#F7DF1E' },
    { name: 'Python', level: 80, color: '#3776AB' },
    { name: 'Node.js', level: 75, color: '#339933' },
    { name: 'HTML/CSS', level: 95, color: '#E34F26' },
    { name: 'MongoDB', level: 70, color: '#47A248' },
    { name: 'Git', level: 85, color: '#F05032' },
    { name: 'Docker', level: 65, color: '#2496ED' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div 
        className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] rounded-t-3xl max-h-[85vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 py-3 flex justify-center bg-[#1C1C1E] z-10">
          <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
        </div>
        
        <div className="px-6 pb-10">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">Skills</h2>
          
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-white text-sm">{skill.name}</span>
                  <span className="text-gray-400 text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-4">Tools I Use</h3>
            <div className="grid grid-cols-4 gap-4">
              {['VS Code', 'Figma', 'Git', 'AWS', 'Firebase', 'Docker', 'Linux', 'Postman'].map((tool) => (
                <div key={tool} className="bg-[#2C2C2E] rounded-xl py-3 px-2 text-center">
                  <span className="text-white text-xs">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects Sheet
const ProjectsSheet = ({ isOpen, onClose }) => {
  const projects = [
    {
      title: 'Food-Delivery',
      description: 'A full-featured online store with payment integration.',
      technologies: ['HTML-CSS-JS', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Gowtham-Darkseid/Food-delivery-site.git',
      live: 'https://eat-it-food.netlify.app/',
      color: '#FF6B6B'
    },
    {
      title: 'Blood Donation',
      description: 'Platform connecting blood donors with recipients.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Gowtham-Darkseid',
      color: '#E74C3C'
    },
    {
      title: 'Portfolio',
      description: 'Modern portfolio with macOS-style interface.',
      technologies: ['React', 'Tailwind', 'Framer Motion'],
      github: 'https://github.com/Gowtham-Darkseid/Profile',
      color: '#007AFF'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div 
        className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] rounded-t-3xl max-h-[85vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 py-3 flex justify-center bg-[#1C1C1E] z-10">
          <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
        </div>
        
        <div className="px-6 pb-10">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">Projects</h2>
          
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="bg-[#2C2C2E] rounded-2xl overflow-hidden">
                <div className="h-32 flex items-center justify-center" style={{ backgroundColor: project.color + '20' }}>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-4xl">
                    📁
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-gray-700 text-white text-center text-sm font-medium rounded-xl active:bg-gray-600"
                    >
                      GitHub
                    </a>
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-2 bg-blue-500 text-white text-center text-sm font-medium rounded-xl active:bg-blue-600"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Sheet
const ContactSheet = ({ isOpen, onClose }) => {
  const contactInfo = [
    { icon: '✉️', label: 'Email', value: 'graj200026@gmail.com', href: 'mailto:graj200026@gmail.com' },
    { icon: '📱', label: 'Phone', value: '+91 XXXXXXXXXX', href: 'tel:+91' },
    { icon: '📍', label: 'Location', value: 'Sivakasi, Tamil Nadu', href: '#' },
  ];

  const socials = [
    { name: 'GitHub', url: 'https://github.com/Gowtham-Darkseid', icon: '🐙', color: '#333' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', color: '#0077B5' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦', color: '#1DA1F2' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div 
        className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] rounded-t-3xl max-h-[85vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 py-3 flex justify-center bg-[#1C1C1E] z-10">
          <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
        </div>
        
        <div className="px-6 pb-10">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">Contact</h2>
          
          <div className="bg-[#2C2C2E] rounded-2xl overflow-hidden mb-6">
            {contactInfo.map((info, index) => (
              <a 
                key={index}
                href={info.href}
                className={`flex items-center gap-4 p-4 active:bg-gray-700 ${index < contactInfo.length - 1 ? 'border-b border-gray-700' : ''}`}
              >
                <span className="text-2xl">{info.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-400 text-xs">{info.label}</p>
                  <p className="text-white">{info.value}</p>
                </div>
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>

          <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-4">Social Links</h3>
          <div className="grid grid-cols-3 gap-3">
            {socials.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2C2C2E] rounded-2xl py-4 flex flex-col items-center gap-2 active:bg-gray-700"
              >
                <span className="text-3xl">{social.icon}</span>
                <span className="text-white text-xs">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Resume Sheet
const ResumeSheet = ({ isOpen, onClose }) => {
  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Present',
      period: 'Present',
      description: 'Building responsive web applications using React and TypeScript.',
    },
    {
      title: 'Graphics Designer',
      company: 'Rengatechnologies',
      period: '2023',
      description: 'Designed user interfaces and graphics for web applications.',
    }
  ];

  const education = [
    {
      degree: 'MCA in Computer Science',
      institution: 'SNSCT',
      period: '2024 - 2026',
    },
    {
      degree: 'BSc in Computer Science',
      institution: 'SRNM',
      period: '2021 - 2024',
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div 
        className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] rounded-t-3xl max-h-[85vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 py-3 flex justify-center bg-[#1C1C1E] z-10">
          <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
        </div>
        
        <div className="px-6 pb-10">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">Resume</h2>
          
          {/* Experience */}
          <div className="mb-6">
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-4">Experience</h3>
            <div className="space-y-3">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-[#2C2C2E] rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-semibold">{exp.title}</h4>
                    <span className="text-blue-400 text-xs px-2 py-1 bg-blue-500/20 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-blue-400 text-sm mb-1">{exp.company}</p>
                  <p className="text-gray-400 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-4">Education</h3>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="bg-[#2C2C2E] rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-semibold">{edu.degree}</h4>
                    <span className="text-blue-400 text-xs px-2 py-1 bg-blue-500/20 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

          <a 
            href="https://drive.google.com/uc?export=download&id=1fErE1u2hzZTreZjL-xzAH8RMMU7duMix"
            className="block w-full py-3.5 bg-blue-500 text-white text-center font-semibold rounded-2xl active:bg-blue-600"
          >
            Download Full Resume
          </a>
        </div>
      </div>
    </div>
  );
};


// Lockscreen Component - iOS 17 Style
const LockScreen = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const day = time.toLocaleDateString('en-US', { weekday: 'long' });
  const date = time.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  // Swipe up handler with visual feedback
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };
  
  const handleTouchMove = (e) => {
    if (touchStartY === null) return;
    const deltaY = touchStartY - e.touches[0].clientY;
    const progress = Math.min(Math.max(deltaY / 150, 0), 1);
    setSwipeProgress(progress);
  };
  
  const handleTouchEnd = (e) => {
    if (touchStartY === null) return;
    const deltaY = touchStartY - e.changedTouches[0].clientY;
    if (deltaY > 100) {
      setIsUnlocking(true);
      setTimeout(() => onUnlock(), 300);
    } else {
      setSwipeProgress(0);
    }
    setTouchStartY(null);
  };
  
  const handleUnlockClick = () => {
    setIsUnlocking(true);
    setTimeout(() => onUnlock(), 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-between overflow-hidden transition-all duration-300 ${isUnlocking ? 'scale-110 opacity-0' : ''}`}
      style={{ 
        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background with blur */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${1 + swipeProgress * 0.1})`,
          filter: `blur(${swipeProgress * 20}px)`,
          transition: touchStartY ? 'none' : 'all 0.3s ease-out'
        }}
      />
      
      {/* Status Bar Area */}
      <div className="w-full h-14 flex items-center justify-between px-6 pt-2">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 013 0v1A1.5 1.5 0 0112 21zm5.657-4.343a1.5 1.5 0 01-2.121 0l-.707-.707a1.5 1.5 0 012.121-2.121l.707.707a1.5 1.5 0 010 2.121zM21 12a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 010-3h1A1.5 1.5 0 0121 12zM4.5 13.5h-1a1.5 1.5 0 010-3h1a1.5 1.5 0 010 3zM6.343 17.657a1.5 1.5 0 010-2.121l.707-.707a1.5 1.5 0 012.121 2.121l-.707.707a1.5 1.5 0 01-2.121 0zM12 3a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-3 0v-1A1.5 1.5 0 0112 3z"/>
          </svg>
        </div>
        <div className="flex items-center gap-2">
          {/* Signal */}
          <div className="flex items-end gap-0.5">
            <div className="w-1 h-1.5 bg-white rounded-sm"></div>
            <div className="w-1 h-2 bg-white rounded-sm"></div>
            <div className="w-1 h-2.5 bg-white rounded-sm"></div>
            <div className="w-1 h-3 bg-white rounded-sm"></div>
          </div>
          {/* WiFi */}
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.1c1.2-1.2 2.9-2 4.9-2s3.7.8 4.9 2l1.4-1.4c-1.6-1.6-3.9-2.6-6.3-2.6s-4.7 1-6.3 2.6l1.4 1.4zm-2.8-2.8c2-2 4.8-3.2 7.7-3.2s5.7 1.2 7.7 3.2l1.4-1.4c-2.4-2.4-5.6-3.8-9.1-3.8S4.5 9.3 2.1 11.7l1.4 1.4z"/>
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-3 border border-white rounded-sm flex items-center p-0.5">
              <div className="w-4 h-1.5 bg-white rounded-sm"></div>
            </div>
            <div className="w-0.5 h-1.5 bg-white rounded-r-sm"></div>
          </div>
        </div>
      </div>

      {/* Time & Date - iOS 17 Bold Style */}
      <div 
        className="flex flex-col items-center mt-4 select-none"
        style={{
          transform: `translateY(${-swipeProgress * 50}px)`,
          opacity: 1 - swipeProgress * 0.5,
          transition: touchStartY ? 'none' : 'all 0.3s ease-out'
        }}
      >
        <div className="text-white/90 text-sm font-medium tracking-wide mb-2 drop-shadow-lg">
          {day}, {date}
        </div>
        <div className="text-white font-bold tracking-tight drop-shadow-2xl" style={{ fontSize: 'clamp(72px, 20vw, 96px)', lineHeight: 1 }}>
          {formattedHours}:{formattedMinutes}
        </div>
      </div>

      {/* Notifications Area */}
      <div 
        className="flex-1 w-full px-4 py-6 overflow-hidden"
        style={{
          opacity: 1 - swipeProgress,
          transition: touchStartY ? 'none' : 'all 0.3s ease-out'
        }}
      >
        {/* Sample Notification Cards */}
        <div className="space-y-2 max-w-sm mx-auto">
          {/* Welcome Notification */}
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-3.5 shadow-lg border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-lg shadow-md">
                👋
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-white/90 text-xs font-semibold">Welcome</span>
                  <span className="text-white/50 text-xs">now</span>
                </div>
                <p className="text-white/80 text-sm font-medium">Hi, I'm Gowtham!</p>
                <p className="text-white/60 text-xs mt-0.5 line-clamp-2">Web Solutions Engineer & Security Enthusiast. Swipe up to explore my portfolio.</p>
              </div>
            </div>
          </div>
          
          {/* Status Notification */}
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-3.5 shadow-lg border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-lg shadow-md">
                🟢
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-white/90 text-xs font-semibold">Status</span>
                  <span className="text-white/50 text-xs">1m ago</span>
                </div>
                <p className="text-white/80 text-sm font-medium">Available for Work</p>
                <p className="text-white/60 text-xs mt-0.5">Open to new opportunities and collaborations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area - Flashlight, Camera & Swipe Indicator */}
      <div className="w-full pb-8 px-6">
        {/* Quick Action Buttons */}
        <div className="flex justify-between items-center mb-6 px-2">
          <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center active:bg-white/30 transition-colors border border-white/10">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center active:bg-white/30 transition-colors border border-white/10">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        
        {/* Swipe Indicator */}
        <div className="flex flex-col items-center select-none">
          <div 
            className="mb-3"
            style={{
              animation: 'bounce 2s infinite',
              opacity: 1 - swipeProgress
            }}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="text-white/70 rotate-180">
              <path d="M12 5v14m0-14l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-white/70 text-sm font-medium tracking-wide">Swipe up to unlock</div>
          <button
            className="mt-4 px-8 py-2.5 bg-white/20 backdrop-blur-xl text-white rounded-full text-sm font-semibold shadow-lg active:bg-white/30 transition-all border border-white/20 active:scale-95"
            onClick={handleUnlockClick}
          >
            Tap to Unlock
          </button>
        </div>
        
        {/* Home Indicator */}
        <div className="flex justify-center mt-6">
          <div className="w-32 h-1 bg-white/50 rounded-full"></div>
        </div>
      </div>
      
      {/* CSS Animation */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

const MobileIOSView = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSheet, setActiveSheet] = useState(null);
  const [slide, setSlide] = useState(0); // 0: Widgets, 1: Apps
  const [touchStartX, setTouchStartX] = useState(null);
  const [showLock, setShowLock] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Format greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Apps array as before
  const apps = [
    { id: 'about', label: 'About Me', icon: '/assets/profile.jpeg', action: () => setActiveSheet('about') },
    { id: 'skills', label: 'Skills', icon: (
      <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      </div>
    ), action: () => setActiveSheet('skills') },
    { id: 'projects', label: 'Projects', icon: (
      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
        </svg>
      </div>
    ), action: () => setActiveSheet('projects') },
    { id: 'resume', label: 'Resume', icon: (
      <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      </div>
    ), action: () => setActiveSheet('resume') },
    { id: 'contact', label: 'Contact', icon: (
      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </div>
    ), action: () => setActiveSheet('contact') },
    { id: 'github', label: 'GitHub', icon: (
      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>
    ), action: () => window.open('https://github.com/Gowtham-Darkseid', '_blank') },
    { id: 'linkedin', label: 'LinkedIn', icon: (
      <div className="w-full h-full bg-[#0077B5] flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </div>
    ), action: () => window.open('https://linkedin.com', '_blank') },
    { id: 'twitter', label: 'Twitter', icon: (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>
    ), action: () => window.open('https://twitter.com', '_blank') },
  ];

  // iOS Dock Apps (unchanged)

  // iOS Dock Apps
  const dockApps = [
    { id: 'phone', label: 'Phone', icon: (
      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center rounded-[22%]">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </div>
    ) },
    { id: 'mail', label: 'Mail', icon: '/assets/icons/mail/mail_512x512x32.png', action: () => setActiveSheet('contact'), badge: 3 },
    { id: 'safari', label: 'Safari', icon: '/assets/icons/safari.png', action: () => window.open('https://gowtham-portfolio.dev', '_blank') },
    { id: 'music', label: 'Music', icon: (
      <div className="w-full h-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center rounded-[22%]">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
        </svg>
      </div>
    ) },
  ];

  // Touch/swipe handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX < -50 && slide === 0) setSlide(1); // swipe left
    if (deltaX > 50 && slide === 1) setSlide(0); // swipe right
    setTouchStartX(null);
  };

  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80) center/cover no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Lockscreen */}
      {showLock && <LockScreen onUnlock={() => setShowLock(false)} />}

      {/* iOS Status Bar */}
      {!showLock && <IOSStatusBar />}

      {/* Slides Container */}
      {!showLock && (
        <>
        <div 
          className={`relative h-full pt-14 pb-28 transition-all duration-500`}
          style={{ 
            transform: `translateX(-${slide * 100}vw)`, 
            width: '200vw', 
            display: 'flex',
            transition: 'transform 0.5s cubic-bezier(.32,1.2,.4,1)' 
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slide 1: Widgets & Profile */}
          <div className="w-screen h-full px-4 overflow-y-auto pb-8" style={{ minWidth: '100vw' }}>
            <div className={`space-y-3 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              
              {/* Greeting Widget */}
              <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-5 border border-white/20 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg">
                    <img src="/assets/profile.jpeg" alt="Gowtham" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-sm font-medium">{getGreeting()}</p>
                    <h2 className="text-white text-2xl font-bold">Gowtham</h2>
                    <p className="text-blue-400 text-sm font-medium">Web Solutions Engineer</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions Widget */}
              <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-4 border border-white/20 shadow-xl">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setActiveSheet('about')}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl active:bg-white/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                      <span className="text-lg">👤</span>
                    </div>
                    <span className="text-white text-sm font-medium">About Me</span>
                  </button>
                  <button 
                    onClick={() => setActiveSheet('projects')}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl active:bg-white/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
                      <span className="text-lg">📁</span>
                    </div>
                    <span className="text-white text-sm font-medium">Projects</span>
                  </button>
                  <button 
                    onClick={() => setActiveSheet('skills')}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl active:bg-white/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-md">
                      <span className="text-lg">⚡</span>
                    </div>
                    <span className="text-white text-sm font-medium">Skills</span>
                  </button>
                  <button 
                    onClick={() => setActiveSheet('contact')}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl active:bg-white/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
                      <span className="text-lg">✉️</span>
                    </div>
                    <span className="text-white text-sm font-medium">Contact</span>
                  </button>
                </div>
              </div>

              {/* Status Widget */}
              <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-4 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                    <div>
                      <p className="text-white font-semibold">Available for Work</p>
                      <p className="text-white/50 text-xs">Open to new opportunities</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveSheet('resume')}
                    className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-xl active:bg-blue-600 transition-colors shadow-lg"
                  >
                    Resume
                  </button>
                </div>
              </div>

              {/* Social Links Widget */}
              <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-4 border border-white/20 shadow-xl">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Connect</p>
                <div className="flex justify-around">
                  <button 
                    onClick={() => window.open('https://github.com/Gowtham-Darkseid', '_blank')}
                    className="flex flex-col items-center gap-2 p-3 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs">GitHub</span>
                  </button>
                  <button 
                    onClick={() => window.open('https://linkedin.com', '_blank')}
                    className="flex flex-col items-center gap-2 p-3 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#0077B5] flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs">LinkedIn</span>
                  </button>
                  <button 
                    onClick={() => window.open('https://twitter.com', '_blank')}
                    className="flex flex-col items-center gap-2 p-3 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow-lg border border-white/10">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs">Twitter</span>
                  </button>
                  <button 
                    onClick={() => setActiveSheet('contact')}
                    className="flex flex-col items-center gap-2 p-3 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs">Email</span>
                  </button>
                </div>
              </div>

              {/* Swipe hint */}
              <div className="flex items-center justify-center gap-2 py-4">
                <span className="text-white/40 text-xs">Swipe left for apps</span>
                <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Slide 2: Apps Grid */}
          <div className="w-screen h-full px-5 overflow-y-auto" style={{ minWidth: '100vw' }}>
            <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {/* Apps Grid */}
              <div className="grid grid-cols-4 gap-x-5 gap-y-6 pt-2">
                {apps.map((app, index) => (
                  <AppIcon
                    key={app.id}
                    icon={app.icon}
                    label={app.label}
                    onClick={app.action}
                    badge={app.badge}
                  />
                ))}
              </div>
              
              {/* Swipe hint */}
              <div className="flex items-center justify-center gap-2 py-6 mt-4">
                <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-white/40 text-xs">Swipe right for widgets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicator */}
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          <button
            className={`w-2 h-2 rounded-full transition-all duration-300 ${slide === 0 ? 'bg-white w-6' : 'bg-white/40'}`}
            onClick={() => setSlide(0)}
          />
          <button
            className={`w-2 h-2 rounded-full transition-all duration-300 ${slide === 1 ? 'bg-white w-6' : 'bg-white/40'}`}
            onClick={() => setSlide(1)}
          />
        </div>
        </>
      )}

      {/* iOS Dock */}
      {!showLock && (
        <div 
          className={`fixed bottom-6 left-4 right-4 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white/20 backdrop-blur-2xl rounded-3xl px-4 py-3">
            <div className="flex justify-around items-center">
              {dockApps.map((app) => (
                <button
                  key={app.id}
                  onClick={app.action}
                  className="relative w-14 h-14 rounded-[22%] overflow-hidden shadow-lg active:scale-90 transition-transform"
                >
                  {typeof app.icon === 'string' ? (
                    <img src={app.icon} alt={app.label} className="w-full h-full object-cover rounded-[22%]" />
                  ) : (
                    app.icon
                  )}
                  {app.badge && (
                    <div className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold px-1">
                      {app.badge}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Home Indicator */}
      {!showLock && <HomeIndicator />}

      {/* Sheet Modals */}
      <AboutSheet isOpen={activeSheet === 'about'} onClose={() => setActiveSheet(null)} />
      <SkillsSheet isOpen={activeSheet === 'skills'} onClose={() => setActiveSheet(null)} />
      <ProjectsSheet isOpen={activeSheet === 'projects'} onClose={() => setActiveSheet(null)} />
      <ContactSheet isOpen={activeSheet === 'contact'} onClose={() => setActiveSheet(null)} />
      <ResumeSheet isOpen={activeSheet === 'resume'} onClose={() => setActiveSheet(null)} />

      {/* Watermark */}
      <div className="fixed bottom-16 right-4 z-40 text-white/30 text-xs font-medium pointer-events-none select-none">
        Gowtham
      </div>
    </div>
  );
};

export default MobileIOSView;
