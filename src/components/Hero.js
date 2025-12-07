import React, { useState, useEffect } from 'react';
import FloatingLines from '../component/FloatingLines.tsx';
import MacWindow from './MacWindow';
import Terminal from './Terminal';
import Launchpad from './Launchpad';
import Safari from './Safari';
import Spotify from './Spotify';
import MacOSMenuBar from './MacOSMenuBar';

// Window Content Components - Light macOS Style
const AboutContent = () => {
  const personalInfo = [
    { label: "Name", value: "Gowtham", icon: "👤" },
    { label: "Email", value: "graj200026@gmail.com", icon: "✉️" },
    { label: "Location", value: "Sivakasi, TN", icon: "📍" },
    { label: "Status", value: "Available", icon: "🟢" }
  ];

  return (
    <div className="p-6 md:p-8 bg-white min-h-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Image */}
        <div className="lg:w-1/3 flex justify-center">
          <div className="relative group">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
              <img 
                src="/assets/profile.jpeg" 
                alt="Gowtham" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-lg shadow-lg transform rotate-3">
              👋
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Hello! I'm <span className="text-blue-600">Gowtham</span>
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
            Aspiring <span className="text-blue-600 font-medium">Web Solutions Engineer</span> & 
            <span className="text-blue-600 font-medium"> Security Enthusiast</span> with strong programming skills in Java, Python, and 
            React.js. Experienced in building scalable web applications, API integrations, and automation workflows. 
            Passionate about delivering secure, user-focused solutions for real-world challenges.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {personalInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300">
                <span className="text-xl">{info.icon}</span>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{info.label}</p>
                  <p className="text-gray-900 font-medium text-sm">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <a 
            href="https://drive.google.com/uc?export=download&id=1fErE1u2hzZTreZjL-xzAH8RMMU7duMix"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all shadow-md"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
};

const SkillsContent = () => {
  const skills = [
    { name: 'React.js', level: 90, color: '#61DAFB', icon: '⚛️' },
    { name: 'JavaScript', level: 85, color: '#F7DF1E', icon: '🟨' },
    { name: 'Python', level: 80, color: '#3776AB', icon: '🐍' },
    { name: 'Node.js', level: 75, color: '#339933', icon: '🟢' },
    { name: 'HTML/CSS', level: 95, color: '#E34F26', icon: '🎨' },
    { name: 'MongoDB', level: 70, color: '#47A248', icon: '🍃' },
    { name: 'Git', level: 85, color: '#F05032', icon: '📦' },
    { name: 'Docker', level: 65, color: '#2496ED', icon: '🐳' },
  ];

  const tools = [
    { name: 'VS Code', icon: '💻' },
    { name: 'Figma', icon: '🎨' },
    { name: 'Postman', icon: '📮' },
    { name: 'Linux', icon: '🐧' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'Vercel', icon: '▲' }
  ];

  return (
    <div className="p-6 md:p-8 bg-white min-h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills Bars */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Technical Skills
          </h3>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between mb-1.5 items-center">
                  <span className="text-gray-700 text-sm flex items-center gap-2">
                    <span className="text-base">{skill.icon}</span>
                    {skill.name}
                  </span>
                  <span className="text-gray-400 text-xs font-medium">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: skill.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Tools & Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tools.map((tool, index) => (
              <div key={index} className="group p-4 bg-gray-50 rounded-xl border border-gray-200 text-center hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 cursor-default">
                <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">{tool.icon}</span>
                <span className="text-gray-600 text-sm">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsContent = () => {
  const projects = [
    {
      title: 'Food-Delivery',
      description: 'A full-featured online store with payment integration.',
      technologies: ['HTML-CSS-JS', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Gowtham-Darkseid/Food-delivery-site.git',
      live: 'https://eat-it-food.netlify.app/',
      image: '/assets/image.png',
      color: '#FF6B6B'
    },
    {
      title: 'Blood Donation',
      description: 'Platform connecting blood donors with recipients.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Gowtham-Darkseid',
      live: '#',
      image: '/assets/blood.png',
      color: '#E74C3C'
    },
    {
      title: 'Portfolio',
      description: 'Modern portfolio with macOS-style interface.',
      technologies: ['React', 'Tailwind', 'Framer Motion'],
      github: 'https://github.com/Gowtham-Darkseid/Profile',
      live: '#',
      image: '/assets/portfolio.png',
      color: '#007AFF'
    }
  ];

  return (
    <div className="p-6 md:p-8 bg-white min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <div key={index} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300">
            <div className="h-36 relative overflow-hidden bg-gray-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  📁
                </div>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <a href={project.github} target="_blank" rel="noopener noreferrer" 
                   className="w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer" 
                   className="w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">{project.title}</h4>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResumeContent = () => {
  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Present',
      period: 'Present',
      description: 'Building responsive web applications using React and TypeScript.',
      icon: '💼'
    },
    {
      title: 'Graphics Designer',
      company: 'Rengatechnologies',
      period: '2023',
      description: 'Designed user interfaces and graphics for web applications.',
      icon: '🎨'
    }
  ];

  const education = [
    {
      degree: 'MCA in Computer Science',
      institution: 'SNSCT',
      period: '2024 - 2026',
      icon: '🎓'
    },
    {
      degree: 'BSc in Computer Science',
      institution: 'SRNM',
      period: '2021 - 2024',
      icon: '📚'
    }
  ];

  return (
    <div className="p-6 md:p-8 bg-white min-h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Experience */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Experience
          </h3>
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="relative p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="absolute -left-px top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 to-blue-200 rounded-full"></div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">{exp.icon}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                      <h4 className="text-gray-900 font-medium">{exp.title}</h4>
                      <span className="text-blue-600 text-xs px-2 py-0.5 bg-blue-50 rounded-full border border-blue-100">{exp.period}</span>
                    </div>
                    <p className="text-blue-600 text-sm mb-1.5">{exp.company}</p>
                    <p className="text-gray-500 text-sm">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="relative p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="absolute -left-px top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 to-blue-200 rounded-full"></div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">{edu.icon}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                      <h4 className="text-gray-900 font-medium">{edu.degree}</h4>
                      <span className="text-blue-600 text-xs px-2 py-0.5 bg-blue-50 rounded-full border border-blue-100">{edu.period}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{edu.institution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a 
          href="https://drive.google.com/uc?export=download&id=1fErE1u2hzZTreZjL-xzAH8RMMU7duMix"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all shadow-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Full Resume
        </a>
      </div>
    </div>
  );
};

const ContactContent = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    { icon: '✉️', label: 'Email', value: 'graj200026@gmail.com', href: 'mailto:graj200026@gmail.com' },
    { icon: '📱', label: 'Phone', value: '+91 XXXXXXXXXX', href: 'tel:+91' },
    { icon: '📍', label: 'Location', value: 'Sivakasi, Tamil Nadu', href: '#' },
  ];

  const socials = [
    { name: 'GitHub', url: 'https://github.com/Gowtham-Darkseid', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
  ];

  return (
    <div className="p-6 md:p-8 bg-white min-h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
          <p className="text-gray-500 mb-6 text-sm">
            Feel free to reach out for collaborations, opportunities, or just to say hello!
          </p>
          
          <div className="space-y-3 mb-6">
            {contactInfo.map((info, index) => (
              <a key={index} href={info.href} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-lg">
                  {info.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{info.label}</p>
                  <p className="text-gray-900 text-sm">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          <h4 className="text-gray-900 font-medium mb-3 text-sm">Follow Me</h4>
          <div className="flex gap-2">
            {socials.map((social, index) => (
              <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" 
                 className="w-11 h-11 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all text-sm"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all text-sm"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all resize-none text-sm"
              />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all shadow-md text-sm">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [activeWindow, setActiveWindow] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const [safariOpen, setSafariOpen] = useState(false);
  const [safariInitialUrl, setSafariInitialUrl] = useState('');
  const [spotifyOpen, setSpotifyOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, type: 'desktop', item: null });
  const [wallpaper, setWallpaper] = useState(null);
  const [isLoadingWallpaper, setIsLoadingWallpaper] = useState(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);
  const [fullscreenCountdown, setFullscreenCountdown] = useState(30);
  const [rememberFullscreen, setRememberFullscreen] = useState(true);

  // Beautiful nature scene wallpapers
  const wallpaperList = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Snowy mountains
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80', // Foggy forest
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80', // Sunlit forest
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80', // Mountain lake
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&q=80', // Valley landscape
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=80', // Green hills
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80', // Waterfall
    'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1920&q=80', // Sunset beach
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&q=80', // Waterfall bridge
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&q=80', // Forest path
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&q=80', // Orange flowers
    'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1920&q=80', // Sunrise field
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80', // Green mountains
    'https://images.unsplash.com/photo-1518173946687-a4c036bc3c95?w=1920&q=80', // Autumn forest
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&q=80', // Pine trees
  ];

  // Change wallpaper function
  const changeWallpaper = () => {
    setIsLoadingWallpaper(true);
    
    // Get random wallpaper from the list
    const randomIndex = Math.floor(Math.random() * wallpaperList.length);
    const wallpaperUrl = wallpaperList[randomIndex];
    
    // Preload image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setWallpaper(wallpaperUrl);
      setIsLoadingWallpaper(false);
    };
    img.onerror = () => {
      // Try picsum as fallback
      const fallbackUrl = `https://picsum.photos/1920/1080?random=${Date.now()}`;
      setWallpaper(fallbackUrl);
      setIsLoadingWallpaper(false);
    };
    img.src = wallpaperUrl;
  };

  const handleEnterFullscreen = () => {
    setShowFullscreenPrompt(false);
    setFullscreenCountdown(30);
    if (rememberFullscreen) {
      localStorage.setItem('fullscreenPromptDismissed', 'true');
    }
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    }
  };

  const handleDismissFullscreen = () => {
    setShowFullscreenPrompt(false);
    setFullscreenCountdown(30);
    if (rememberFullscreen) {
      localStorage.setItem('fullscreenPromptDismissed', 'true');
    }
  };

  useEffect(() => {
    setMounted(true);
    
    // Show fullscreen prompt after a short delay (only if not dismissed before in localStorage)
    const hasSeenPrompt = localStorage.getItem('fullscreenPromptDismissed');
    if (!hasSeenPrompt) {
      const timer = setTimeout(() => {
        // Check if not already in fullscreen
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          setShowFullscreenPrompt(true);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Fullscreen countdown timer
  useEffect(() => {
    let timer;
    if (showFullscreenPrompt && fullscreenCountdown > 0) {
      timer = setInterval(() => {
        setFullscreenCountdown(prev => {
          if (prev <= 1) {
            handleEnterFullscreen();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFullscreenPrompt, fullscreenCountdown]);

  useEffect(() => {
    // Close context menu on click anywhere
    const handleClick = () => setContextMenu(prev => ({ ...prev, show: false }));
    // Close context menu on escape
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setContextMenu(prev => ({ ...prev, show: false }));
    };
    
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle right-click context menu
  const handleContextMenu = (e, type = 'desktop', item = null) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      type,
      item
    });
  };

  // Context menu actions
  const handleMenuAction = (action) => {
    switch (action) {
      case 'open':
        if (contextMenu.item?.action) contextMenu.item.action();
        break;
      case 'get-info':
        if (contextMenu.item) openWindow(contextMenu.item.id.replace('-folder', '').replace('-file', '').replace('-me', ''));
        break;
      case 'new-folder':
        // Visual feedback only
        break;
      case 'change-wallpaper':
        changeWallpaper();
        break;
      case 'refresh':
        window.location.reload();
        break;
      default:
        break;
    }
    setContextMenu(prev => ({ ...prev, show: false }));
  };

  const openWindow = (windowId) => {
    setActiveWindow(windowId);
  };

  const closeWindow = () => {
    setActiveWindow(null);
  };

  // macOS-style Dock items with realistic icons
  const dockItems = [
    {
      id: 'skills',
      label: 'System Preferences',
      icon: (
        <img 
          src="/assets/icons/setting/setting_512x512x32.png" 
          alt="System Preferences" 
          className="w-full h-full object-contain rounded-[22%] shadow-lg"
          draggable="false"
        />
      ),
      content: <SkillsContent />
    },
    {
      id: 'projects',
      label: 'Finder',
      icon: (
        <img 
          src="/assets/icons/finder.png" 
          alt="Finder" 
          className="w-full h-full object-contain rounded-[22%] shadow-lg"
          draggable="false"
        />
      ),
      content: <ProjectsContent />
    },
    {
      id: 'resume',
      label: 'Notes',
      icon: (
        <img 
          src="/assets/icons/notes/c328394a608fdd90d6ad4a357aa4f114_Notes__MacOS_Tahoe__512x512x32.png" 
          alt="Notes" 
          className="w-full h-full object-contain rounded-[22%] shadow-lg"
          draggable="false"
        />
      ),
      content: <ResumeContent />
    },
    {
      id: 'contact',
      label: 'Mail',
      icon: (
        <img 
          src="/assets/icons/mail/mail_512x512x32.png" 
          alt="Mail" 
          className="w-full h-full object-contain rounded-[22%] shadow-lg"
          draggable="false"
        />
      ),
      content: <ContactContent />
    }
  ];

  // Calculate icon scale based on distance from hovered icon
  const getIconScale = (index) => {
    if (hoveredIcon === null) return 1;
    const hoveredIndex = dockItems.findIndex(item => item.id === hoveredIcon);
    // If hovered icon is not in dockItems (e.g., terminal, safari, trash), don't affect dock items
    if (hoveredIndex === -1) return 1;
    const distance = Math.abs(hoveredIndex - index);
    
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.25;
    if (distance === 2) return 1.1;
    return 1;
  };

  const getIconTranslateY = (index) => {
    if (hoveredIcon === null) return 0;
    const hoveredIndex = dockItems.findIndex(item => item.id === hoveredIcon);
    // If hovered icon is not in dockItems (e.g., terminal, safari, trash), don't affect dock items
    if (hoveredIndex === -1) return 0;
    const distance = Math.abs(hoveredIndex - index);
    
    if (distance === 0) return -20;
    if (distance === 1) return -10;
    if (distance === 2) return -4;
    return 0;
  };

  // Desktop icons data (right side like real macOS)
  const desktopIcons = [
    { 
      id: 'macintosh', 
      label: 'Macintosh HD', 
      icon: (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-12 h-10 md:w-14 md:h-12 bg-gradient-to-b from-gray-200 to-gray-400 rounded-sm border border-gray-300 relative">
            <div className="absolute inset-x-2 top-1 h-6 md:h-7 bg-gradient-to-b from-blue-400 to-blue-600 rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 md:w-5 md:h-5">
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0.5 inset-x-0 flex justify-center">
              <div className="w-6 h-1 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      ),
      type: 'system'
    },
    { 
      id: 'about-me', 
      label: 'About Me', 
      icon: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-14 h-12 md:w-16 md:h-14 relative">
            {/* Folder back */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 to-cyan-500 rounded-sm" style={{ clipPath: 'polygon(0 15%, 35% 15%, 40% 0, 100% 0, 100% 100%, 0 100%)' }}></div>
            {/* Folder front */}
            <div className="absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-b from-cyan-300 to-cyan-400 rounded-sm shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-cyan-700" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            {/* Folder tab */}
            <div className="absolute top-0 left-0 w-[38%] h-[18%] bg-gradient-to-b from-cyan-400 to-cyan-500 rounded-t-sm"></div>
          </div>
        </div>
      ),
      type: 'folder',
      action: () => openWindow('about')
    },
    { 
      id: 'projects-folder', 
      label: 'Projects', 
      icon: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-14 h-12 md:w-16 md:h-14 relative">
            {/* Folder back */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-500 rounded-sm" style={{ clipPath: 'polygon(0 15%, 35% 15%, 40% 0, 100% 0, 100% 100%, 0 100%)' }}></div>
            {/* Folder front */}
            <div className="absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-b from-blue-300 to-blue-400 rounded-sm shadow-inner"></div>
            {/* Folder tab */}
            <div className="absolute top-0 left-0 w-[38%] h-[18%] bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-sm"></div>
          </div>
        </div>
      ),
      type: 'folder',
      action: () => openWindow('projects')
    },
    { 
      id: 'resume-file', 
      label: 'Resume.pdf', 
      icon: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-11 h-14 md:w-12 md:h-16 bg-white rounded-sm shadow-md relative border border-gray-200">
            {/* Folded corner */}
            <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4">
              <div className="absolute top-0 right-0 w-full h-full bg-gray-200" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
              <div className="absolute top-0 right-0 w-full h-full bg-gray-100" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}></div>
            </div>
            {/* PDF icon */}
            <div className="absolute bottom-2 inset-x-0 flex justify-center">
              <div className="px-1.5 py-0.5 bg-red-500 rounded text-[8px] text-white font-bold">PDF</div>
            </div>
            {/* Lines */}
            <div className="absolute top-3 left-2 right-4 space-y-1">
              <div className="h-0.5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-0.5 bg-gray-300 rounded w-full"></div>
              <div className="h-0.5 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ),
      type: 'file',
      action: () => {
        setSafariInitialUrl('/assets/Gowtham-S.pdf');
        setSafariOpen(true);
      }
    },
    { 
      id: 'terminal-desktop', 
      label: 'Terminal', 
      icon: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-14 h-12 md:w-16 md:h-14 bg-gradient-to-b from-[#000000] to-[#1a1a1a] rounded-lg relative border border-gray-700 shadow-lg overflow-hidden">
            {/* Terminal window bar */}
            <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-b from-[#3a3a3c] to-[#2a2a2c] flex items-center px-1 gap-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]"></div>
            </div>
            {/* Terminal content */}
            <div className="absolute top-4 left-1 right-1 bottom-1 text-green-400 text-[6px] font-mono leading-tight">
              <div className="flex">
                <span className="text-green-500">➜</span>
                <span className="text-cyan-400 ml-0.5">~</span>
                <span className="text-white ml-0.5 animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      ),
      type: 'app',
      action: () => setTerminalOpen(true)
    },
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen overflow-hidden"
      onContextMenu={(e) => handleContextMenu(e, 'desktop')}
      style={{
        background: wallpaper 
          ? `url(${wallpaper}) center/cover no-repeat`
          : 'linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460)'
      }}
    >
      {/* Wallpaper overlay for better text readability */}
      {wallpaper && (
        <div className="absolute inset-0 bg-black/20 z-0" />
      )}
      
      {/* Loading indicator for wallpaper */}
      {isLoadingWallpaper && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 bg-black/70 backdrop-blur-md rounded-full flex items-center gap-2 text-white text-sm">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading wallpaper...
        </div>
      )}

      <div className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
        {!wallpaper && <FloatingLines />}
      </div>

      {/* macOS Context Menu */}
      {contextMenu.show && (
        <div 
          className="fixed z-[100] min-w-[220px] py-1 bg-[#2D2D2D]/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 overflow-hidden"
          style={{ 
            left: Math.min(contextMenu.x, window.innerWidth - 240),
            top: Math.min(contextMenu.y, window.innerHeight - 300),
            boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.1) inset'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.type === 'desktop' ? (
            <>
              <button onClick={() => handleMenuAction('new-folder')} className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                </svg>
                New Folder
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button onClick={() => handleMenuAction('get-info')} className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Get Info
              </button>
              <button onClick={() => handleMenuAction('change-wallpaper')} className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Change Desktop Background...
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button onClick={() => handleMenuAction('refresh')} className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Desktop
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Sort By
                <svg className="w-3 h-3 ml-auto text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                Clean Up
              </button>
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Use Stacks
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Show View Options
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleMenuAction('open')} className="w-full px-3 py-1.5 text-left text-[13px] text-white font-medium hover:bg-blue-500 flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
                Open
              </button>
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in New Window
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button onClick={() => handleMenuAction('get-info')} className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Get Info
                <span className="ml-auto text-[11px] text-gray-500">⌘I</span>
              </button>
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Rename
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Duplicate
                <span className="ml-auto text-[11px] text-gray-500">⌘D</span>
              </button>
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Make Alias
              </button>
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Quick Look
                <span className="ml-auto text-[11px] text-gray-500">Space</span>
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-gray-200 hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
                <span className="ml-auto text-[11px] text-gray-500">⌘C</span>
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button className="w-full px-3 py-1.5 text-left text-[13px] text-red-400 hover:bg-red-500 hover:text-white flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Move to Trash
                <span className="ml-auto text-[11px] text-gray-500">⌘⌫</span>
              </button>
            </>
          )}
        </div>
      )}
      
      {/* Desktop Icons - Right side like macOS */}
      <div 
        className={`absolute top-12 right-4 md:right-8 z-10 transition-all duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="flex flex-col items-end gap-6">
          {desktopIcons.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col items-center cursor-pointer group transition-all duration-500 w-20 md:w-24 ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
              onClick={item.action}
              onContextMenu={(e) => handleContextMenu(e, 'icon', item)}
            >
              <div className="w-16 h-16 md:w-18 md:h-18 mb-1 transition-transform duration-200 group-hover:scale-105 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-white text-[10px] md:text-xs text-center font-normal leading-tight px-1 py-0.5 rounded max-w-full break-words"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* macOS-style Dock */}
      <div 
        className={`fixed bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 transition-all duration-1000 z-50 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "1200ms" }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20" 
               style={{ 
                 boxShadow: '0 0 0 0.5px rgba(255,255,255,0.1) inset, 0 8px 32px rgba(0,0,0,0.4)',
               }} 
          />
          
          <div className="relative flex items-end gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3">
            {/* App Dock Items */}
            {dockItems.map((item, index) => (
              <div
                key={item.id}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredIcon(item.id)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <div 
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1C1C1E] text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 z-50 ${
                    hoveredIcon === item.id ? 'opacity-100 -translate-y-1 visible' : 'opacity-0 translate-y-0 invisible'
                  }`}
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                >
                  {item.label}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1C1E]" />
                </div>

                <button
                  onClick={() => openWindow(item.id)}
                  className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ease-out cursor-pointer"
                  style={{
                    transform: `scale(${getIconScale(index)}) translateY(${getIconTranslateY(index)}px)`,
                  }}
                >
                  {item.icon}
                </button>
                {/* Active indicator dot */}
                <div className="w-1 h-1 rounded-full bg-white/60 mt-0.5" />
              </div>
            ))}
            
            <div className="w-px h-8 bg-white/20 mx-1 self-center hidden md:block" />
            
            {/* Terminal Dock Icon */}
            <div
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIcon('terminal')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div 
                className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1C1C1E] text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 z-50 ${
                  hoveredIcon === 'terminal' ? 'opacity-100 -translate-y-1 visible' : 'opacity-0 translate-y-0 invisible'
                }`}
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                Terminal
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1C1E]" />
              </div>
              <button
                onClick={() => setTerminalOpen(true)}
                className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ease-out cursor-pointer"
                style={{
                  transform: `scale(${hoveredIcon === 'terminal' ? 1.4 : 1}) translateY(${hoveredIcon === 'terminal' ? -16 : 0}px)`,
                }}
              >
                <img 
                  src="/assets/icons/terminal.avif" 
                  alt="Terminal" 
                  className="w-full h-full object-contain rounded-[22%] shadow-lg"
                  draggable="false"
                />
              </button>
              {/* Active indicator dot */}
              {terminalOpen && <div className="w-1 h-1 rounded-full bg-white/60 mt-0.5" />}
            </div>

            {/* VS Code Icon */}
            <div
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIcon('vscode')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div 
                className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1C1C1E] text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 z-50 ${
                  hoveredIcon === 'vscode' ? 'opacity-100 -translate-y-1 visible' : 'opacity-0 translate-y-0 invisible'
                }`}
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                Visual Studio Code
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1C1E]" />
              </div>
              <button
                className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ease-out cursor-pointer"
                style={{
                  transform: `scale(${hoveredIcon === 'vscode' ? 1.4 : 1}) translateY(${hoveredIcon === 'vscode' ? -16 : 0}px)`,
                }}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png" 
                  alt="VS Code" 
                  className="w-full h-full object-contain shadow-lg"
                  draggable="false"
                />
              </button>
            </div>

            {/* Spotify Icon */}
            <div
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIcon('spotify')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div 
                className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1C1C1E] text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 z-50 ${
                  hoveredIcon === 'spotify' ? 'opacity-100 -translate-y-1 visible' : 'opacity-0 translate-y-0 invisible'
                }`}
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                Spotify
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1C1E]" />
              </div>
              <button
                onClick={() => setSpotifyOpen(true)}
                className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ease-out cursor-pointer"
                style={{
                  transform: `scale(${hoveredIcon === 'spotify' ? 1.4 : 1}) translateY(${hoveredIcon === 'spotify' ? -16 : 0}px)`,
                }}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/512px-Spotify_icon.svg.png" 
                  alt="Spotify" 
                  className="w-full h-full object-contain shadow-lg"
                  draggable="false"
                />
              </button>
              {spotifyOpen && <div className="w-1 h-1 rounded-full bg-white/60 mt-0.5" />}
            </div>

            {/* Photos Icon */}
            <div
              className="relative flex flex-col items-center hidden md:flex"
              onMouseEnter={() => setHoveredIcon('photos')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div 
                className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1C1C1E] text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 z-50 ${
                  hoveredIcon === 'photos' ? 'opacity-100 -translate-y-1 visible' : 'opacity-0 translate-y-0 invisible'
                }`}
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                Photos
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1C1E]" />
              </div>
              <button
                className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ease-out cursor-pointer"
                style={{
                  transform: `scale(${hoveredIcon === 'photos' ? 1.4 : 1}) translateY(${hoveredIcon === 'photos' ? -16 : 0}px)`,
                }}
              >
                <img 
                  src="/assets/icons/photos.avif" 
                  alt="Photos" 
                  className="w-full h-full object-contain rounded-[22%] shadow-lg"
                  draggable="false"
                />
              </button>
            </div>

            {/* GitHub Icon */}
            <div
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIcon('github')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div 
                className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1C1C1E] text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 z-50 ${
                  hoveredIcon === 'github' ? 'opacity-100 -translate-y-1 visible' : 'opacity-0 translate-y-0 invisible'
                }`}
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                GitHub
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1C1E]" />
              </div>
              <a
                href="https://github.com/Gowtham-Darkseid"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ease-out cursor-pointer"
                style={{
                  transform: `scale(${hoveredIcon === 'github' ? 1.4 : 1}) translateY(${hoveredIcon === 'github' ? -16 : 0}px)`,
                }}
              >
                <img 
                  src="/assets/icons/github.png" 
                  alt="GitHub" 
                  className="w-full h-full object-contain rounded-[22%] shadow-lg"
                  draggable="false"
                />
              </a>
            </div>

            {/* Safari Icon */}
            <div
              className="relative flex flex-col items-center hidden md:flex"
              onMouseEnter={() => setHoveredIcon('safari')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div 
                className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1C1C1E] text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 z-50 ${
                  hoveredIcon === 'safari' ? 'opacity-100 -translate-y-1 visible' : 'opacity-0 translate-y-0 invisible'
                }`}
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                Safari
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1C1E]" />
              </div>
              <button
                onClick={() => setSafariOpen(true)}
                className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ease-out cursor-pointer"
                style={{
                  transform: `scale(${hoveredIcon === 'safari' ? 1.4 : 1}) translateY(${hoveredIcon === 'safari' ? -16 : 0}px)`,
                }}
              >
                <img 
                  src="/assets/icons/safari.png" 
                  alt="Safari" 
                  className="w-full h-full object-contain rounded-[22%] shadow-lg"
                  draggable="false"
                />
              </button>
            </div>

            {/* Trash Icon */}
            <div
              className="relative flex flex-col items-center hidden md:flex"
              onMouseEnter={() => setHoveredIcon('trash')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div 
                className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1C1C1E] text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 z-50 ${
                  hoveredIcon === 'trash' ? 'opacity-100 -translate-y-1 visible' : 'opacity-0 translate-y-0 invisible'
                }`}
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                Trash
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1C1E]" />
              </div>
              <button
                className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ease-out cursor-pointer"
                style={{
                  transform: `scale(${hoveredIcon === 'trash' ? 1.4 : 1}) translateY(${hoveredIcon === 'trash' ? -16 : 0}px)`,
                }}
              >
                {/* Realistic macOS Trash Can */}
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="w-[70%] h-[85%] relative">
                    {/* Trash body */}
                    <div className="absolute bottom-0 w-full h-[80%] bg-gradient-to-b from-[#8E8E93] to-[#636366] rounded-b-md">
                      {/* Ridges */}
                      <div className="absolute inset-x-0 top-1 bottom-1 flex justify-around px-0.5">
                        <div className="w-[2px] bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
                        <div className="w-[2px] bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
                        <div className="w-[2px] bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
                      </div>
                    </div>
                    {/* Trash lid */}
                    <div className="absolute top-0 w-full h-[25%] bg-gradient-to-b from-[#AEAEB2] to-[#8E8E93] rounded-t-sm">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[40%] bg-gradient-to-b from-[#C7C7CC] to-[#AEAEB2] rounded-t-sm -mt-0.5"></div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="w-px h-8 bg-white/20 mx-1 self-center hidden md:flex" />

            {/* Launchpad Icon */}
            <div
              className="relative flex flex-col items-center hidden md:flex"
              onMouseEnter={() => setHoveredIcon('launchpad')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div 
                className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1C1C1E] text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 z-50 ${
                  hoveredIcon === 'launchpad' ? 'opacity-100 -translate-y-1 visible' : 'opacity-0 translate-y-0 invisible'
                }`}
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                Launchpad
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1C1E]" />
              </div>
              <button
                onClick={() => setLaunchpadOpen(true)}
                className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ease-out cursor-pointer"
                style={{
                  transform: `scale(${hoveredIcon === 'launchpad' ? 1.4 : 1}) translateY(${hoveredIcon === 'launchpad' ? -16 : 0}px)`,
                }}
              >
                <img 
                  src="/assets/icons/launchpad.png" 
                  alt="Launchpad" 
                  className="w-full h-full object-contain rounded-[22%] shadow-lg"
                  draggable="false"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* macOS Windows */}
      {/* About Window - separate since it's a desktop icon */}
      <MacWindow
        isOpen={activeWindow === 'about'}
        onClose={closeWindow}
        title="About Me"
        icon="👤"
      >
        <AboutContent />
      </MacWindow>

      {dockItems.map((item) => (
        <MacWindow
          key={item.id}
          isOpen={activeWindow === item.id}
          onClose={closeWindow}
          title={item.label}
          icon={item.id === 'skills' ? '⚙️' : item.id === 'projects' ? '📁' : item.id === 'resume' ? '📄' : '✉️'}
        >
          {item.content}
        </MacWindow>
      ))}

      {/* Terminal Window */}
      <Terminal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
      />

      {/* Safari Browser */}
      <Safari 
        isOpen={safariOpen} 
        onClose={() => {
          setSafariOpen(false);
          setSafariInitialUrl('');
        }}
        initialUrl={safariInitialUrl}
      />

      {/* Launchpad */}
      <Launchpad 
        isOpen={launchpadOpen}
        onClose={() => setLaunchpadOpen(false)}
        onOpenApp={(appId) => {
          if (appId === 'terminal') {
            setTerminalOpen(true);
          } else if (appId === 'safari') {
            setSafariOpen(true);
          } else {
            setActiveWindow(appId);
          }
        }}
      />

      {/* Fullscreen Prompt Dialog */}
      {showFullscreenPrompt && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Dialog */}
          <div 
            className="relative bg-[#2D2D2D]/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 max-w-md mx-4"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            <div className="flex gap-5">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-b from-[#5A5A5A] to-[#3A3A3A] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-[#A0A0A0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-white text-lg font-semibold mb-2">
                  Enable fullscreen for better experience?
                </h3>
                <p className="text-[#A0A0A0] text-sm mb-4">
                  If you do nothing, fullscreen will be enabled automatically in {fullscreenCountdown} seconds.
                </p>
                
                {/* Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer mb-5">
                  <div 
                    onClick={() => setRememberFullscreen(!rememberFullscreen)}
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                      rememberFullscreen 
                        ? 'bg-blue-500' 
                        : 'bg-[#4A4A4A] border border-[#5A5A5A]'
                    }`}
                  >
                    {rememberFullscreen && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-sm">Remember my preference</span>
                </label>
                
                {/* Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleDismissFullscreen}
                    className="px-5 py-2 bg-[#4A4A4A] hover:bg-[#5A5A5A] text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEnterFullscreen}
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Enter Fullscreen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* macOS Menu Bar */}
      <MacOSMenuBar onSoundClick={() => setSpotifyOpen(true)} />

      {/* Spotify App */}
      <Spotify isOpen={spotifyOpen} onClose={() => setSpotifyOpen(false)} />

      {/* Watermark */}
      <div className="fixed bottom-2 right-3 z-[50] text-white/30 text-xs font-medium pointer-events-none select-none">
        Gowtham
      </div>

      <style jsx>{`
        @keyframes spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-very-slow {
          animation: spin-very-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
