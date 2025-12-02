import React, { useState, useEffect, useRef, useCallback } from 'react';

// Default menus
const DEFAULT_MENUS = [
  {
    label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    items: [
      { label: 'About', action: 'about' },
      { label: 'Skills', action: 'skills' },
      { type: 'separator' },
      { label: 'Download Resume', action: 'resume', shortcut: '⌘R' },
    ],
  },
  {
    label: 'Projects',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    items: [
      { label: 'View All Projects', action: 'projects' },
      { label: 'GitHub Profile', action: 'github' },
      { type: 'separator' },
      { label: 'Contributions', action: 'contributions' },
    ],
  },
  {
    label: 'Contact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    items: [
      { label: 'Email Me', action: 'email' },
      { label: 'LinkedIn', action: 'linkedin' },
      { label: 'GitHub', action: 'github-profile' },
    ],
  },
];

// Apple menu items
const APPLE_MENU_ITEMS = [
  { label: 'About This Portfolio', action: 'about' },
  { type: 'separator' },
  { label: 'View Resume', action: 'resume' },
  { label: 'Contact', action: 'contact' },
  { type: 'separator' },
  { label: 'GitHub', action: 'github' },
];

// MenuDropdown Component
const MenuDropdown = ({ isOpen, onClose, items, position, onAction }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute backdrop-blur-md z-[60]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'rgba(40, 40, 40, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '8px',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.4),
          0 2px 8px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.12)
        `,
        minWidth: '220px',
        animation: 'menuFadeIn 0.15s cubic-bezier(0.23, 1, 0.32, 1) forwards'
      }}
    >
      <div className="py-1">
        {items.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div
                key={index}
                className="h-px bg-white/15 mx-2 my-1"
              />
            );
          }

          return (
            <div
              key={index}
              className="px-4 py-1 text-white text-sm cursor-pointer hover:bg-white/10 transition-colors duration-100 flex justify-between items-center"
              onClick={() => {
                if (item.action) {
                  onAction?.(item.action);
                }
                onClose();
              }}
            >
              <span className="flex items-center">
                {item.label}
                {item.hasSubmenu && (
                  <span className="ml-2 text-xs opacity-70">▶</span>
                )}
              </span>
              {item.shortcut && (
                <span className="text-xs text-white/60 ml-4">
                  {item.shortcut}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes menuFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const MacOSMenuBar = ({
  appName = 'Portfolio',
  menus = DEFAULT_MENUS,
  onMenuAction,
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [speedTestOpen, setSpeedTestOpen] = useState(false);
  const [internetSpeed, setInternetSpeed] = useState({ download: 0, upload: 0, ping: 0 });
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);
  const [isHeroSection, setIsHeroSection] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong] = useState('Mild Music');
  const [showNotification, setShowNotification] = useState(false);
  const audioRef = useRef(null);

  const appleLogoRef = useRef(null);
  const menuRefs = useRef({});

  // Detect if we're in hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroBottom = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        const inHero = scrollPosition < heroBottom - 50;
        setIsHeroSection(inHero);
        
        // Hide notification when leaving hero section
        if (!inHero) {
          setShowNotification(false);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show notification after 3 seconds in hero section (desktop only)
  useEffect(() => {
    if (!isMobile && isHeroSection && !isPlaying && !showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 8000);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isMobile, isHeroSection, isPlaying, showNotification]);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update clock every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleAppleMenuClick = useCallback(() => {
    if (activeMenu === 'apple') {
      setActiveMenu(null);
    } else {
      setDropdownPosition({
        x: 0,
        y: 34
      });
      setActiveMenu('apple');
    }
  }, [activeMenu]);

  const handleMenuItemClick = useCallback((menuLabel) => {
    if (activeMenu === menuLabel) {
      setActiveMenu(null);
    } else {
      const menuRef = menuRefs.current[menuLabel];
      if (menuRef) {
        const rect = menuRef.getBoundingClientRect();
        const parentRect = menuRef.offsetParent?.getBoundingClientRect() || { left: 0, top: 0 };
        setDropdownPosition({
          x: rect.left - parentRect.left,
          y: 34
        });
        setActiveMenu(menuLabel);
      }
    }
  }, [activeMenu]);

  const closeDropdown = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const handleMenuAction = useCallback((action) => {
    // Default navigation actions
    const element = document.getElementById(action);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'github') {
      window.open('https://github.com/Gowtham-Darkseid', '_blank');
    } else if (action === 'linkedin') {
      window.open('https://www.linkedin.com/in/gowtham-darkseid/', '_blank');
    } else if (action === 'email') {
      window.location.href = 'mailto:gowtham@example.com';
    } else if (action === 'github-profile') {
      window.open('https://github.com/Gowtham-Darkseid', '_blank');
    } else if (action === 'whatsapp') {
      window.open('https://wa.me/916369838278', '_blank');
    } else if (action === 'instagram') {
      window.open('https://www.instagram.com/for__darkseid/', '_blank');
    }
    onMenuAction?.(action);
  }, [onMenuAction]);

  const handleSoundClick = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/music.mp3');
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setShowNotification(false);
    }
  }, [isPlaying]);

  const simulateSpeedTest = useCallback(() => {
    setIsTestingSpeed(true);
    setInternetSpeed({ download: 0, upload: 0, ping: 0 });
    
    // Simulate ping
    setTimeout(() => {
      setInternetSpeed(prev => ({ ...prev, ping: Math.floor(Math.random() * 30) + 10 }));
    }, 500);
    
    // Simulate download speed
    const downloadInterval = setInterval(() => {
      setInternetSpeed(prev => {
        const newDownload = Math.min(prev.download + Math.random() * 20, 95 + Math.random() * 10);
        if (newDownload >= 95) {
          clearInterval(downloadInterval);
          return { ...prev, download: Math.floor(newDownload) };
        }
        return { ...prev, download: Math.floor(newDownload) };
      });
    }, 100);
    
    // Simulate upload speed
    setTimeout(() => {
      const uploadInterval = setInterval(() => {
        setInternetSpeed(prev => {
          const newUpload = Math.min(prev.upload + Math.random() * 15, 45 + Math.random() * 10);
          if (newUpload >= 45) {
            clearInterval(uploadInterval);
            setIsTestingSpeed(false);
            return { ...prev, upload: Math.floor(newUpload) };
          }
          return { ...prev, upload: Math.floor(newUpload) };
        });
      }, 100);
    }, 1500);
  }, []);

  const handleWifiClick = useCallback(() => {
    if (!isMobile) {
      setSpeedTestOpen(true);
      simulateSpeedTest();
    }
  }, [isMobile, simulateSpeedTest]);

  return (
    <div 
      className={`fixed z-[100] transition-all duration-500 ease-out ${
        isHeroSection && !isMobile 
          ? 'top-4 left-4 right-4' 
          : 'top-0 left-0 right-0'
      }`}
    >
      {/* Mobile Menu Button */}
      {isMobile && (
        <div 
          className="backdrop-blur-xl cursor-pointer"
          style={{
            height: '48px',
            background: 'linear-gradient(180deg, rgba(40, 40, 40, 0.6) 0%, rgba(40, 40, 40, 0.3) 70%, rgba(40, 40, 40, 0) 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          onClick={() => setControlCenterOpen(!controlCenterOpen)}
        >
          <div className="flex justify-between items-center h-full px-4">
            <span className="text-white text-sm font-semibold">{appName}</span>
            <div className="flex items-center space-x-3">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
          </div>
        </div>
      )}

      <div
        className={`backdrop-blur-md ${className} ${isMobile ? 'hidden' : ''} transition-all duration-500 ease-out`}
        style={{
          height: '32px',
          background: 'rgba(40, 40, 40, 0.75)',
          borderBottom: isHeroSection ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
          border: isHeroSection ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
          borderRadius: isHeroSection ? '16px' : '0',
          boxShadow: isHeroSection 
            ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
            : '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
        }}
      >
        <div className="flex justify-between items-center h-full px-3">
          {/* Left section - Apple logo and app menus */}
          <div className="flex items-center space-x-6">
            {/* Apple Logo */}
            <div
              ref={appleLogoRef}
              onClick={handleAppleMenuClick}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-150"
            >
              <svg
                width="15"
                height="19"
                viewBox="0 0 110 140"
                fill="white"
                style={{ display: 'block' }}
              >
                <path d="M0 0 C5.58236403 2.09904125 9.60467483 0.88914551 14.97265625 -1.09375 C24.52115711 -4.439908 34.11309717 -4.54862597 43.35546875 -0.23046875 C48.12396107 2.4076135 50.86575425 5.08527779 53.41015625 9.90625 C52.35828125 10.69 51.30640625 11.47375 50.22265625 12.28125 C44.71078889 17.03285979 41.56508326 23.28635633 40.47265625 30.46875 C40.03168138 38.29605399 41.87292643 44.10920342 46.82421875 50.18359375 C49.69950343 53.3067478 52.89615914 55.56358526 56.41015625 57.90625 C53.62981681 69.36905295 47.16852412 82.51930379 37.16015625 89.40625 C32.57853571 91.90531575 28.55304343 92.53884155 23.41015625 91.90625 C21.37403354 91.28785199 19.35323208 90.61750058 17.34765625 89.90625 C8.57237805 86.84256185 3.23794872 88.20952158 -5.43359375 91.00390625 C-10.61364364 92.48483636 -14.47478385 92.64004629 -19.65234375 90.84375 C-33.68747534 81.58653555 -41.78781841 64.33028781 -45.19067383 48.33569336 C-47.46721739 34.48010623 -46.65131557 19.75938694 -38.46484375 8.03125 C-28.23499655 -4.14713952 -14.17528672 -5.71090688 0 0 Z" transform="translate(45.58984375,33.09375)" />
                <path d="M0 0 C0.57231958 7.72631433 -0.96546021 14.10973315 -5.80078125 20.30859375 C-10.93255592 25.73930675 -15.29387058 28.82351765 -22.9375 29.1875 C-23.948125 29.125625 -24.95875 29.06375 -26 29 C-26.59493662 20.81962143 -24.35167303 14.76774508 -19.375 8.25 C-14.46051828 2.89895264 -7.38077314 -0.97115436 0 0 Z" transform="translate(76,0)" />
              </svg>
            </div>

            {/* Current App Name */}
            <span className="text-white text-sm font-normal">
              {appName}
            </span>

            {/* Menu Items */}
            <div className="flex items-center space-x-8">
              {menus.map((menu) => (
                <span
                  key={menu.label}
                  ref={(el) => { menuRefs.current[menu.label] = el; }}
                  className="text-white text-sm cursor-pointer hover:opacity-80 transition-opacity duration-150 select-none"
                  onClick={() => handleMenuItemClick(menu.label)}
                >
                  {menu.label}
                </span>
              ))}
            </div>
          </div>

          {/* Center section - Now Playing */}
          {isPlaying && (
            <div 
              className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-3 px-4 py-1 rounded-full backdrop-blur-md animate-fade-in"
              style={{
                background: 'rgba(60, 60, 60, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Music Icon */}
              <div className="flex items-center space-x-2">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
                  <path d="M13 2L6 3.5V11.5C5.5 11 4.75 10.5 3.5 10.5C1.5 10.5 1 11.5 1 12.5C1 13.5 1.5 14.5 3.5 14.5C5.5 14.5 6 13.5 6 12.5V7L13 5.5V9.5C12.5 9 11.75 8.5 10.5 8.5C8.5 8.5 8 9.5 8 10.5C8 11.5 8.5 12.5 10.5 12.5C12.5 12.5 13 11.5 13 10.5V2Z" fill="#a78bfa"/>
                </svg>
                
                {/* Equalizer Animation */}
                <div className="flex items-center space-x-0.5">
                  <div className="w-0.5 bg-purple-400 rounded-full animate-equalizer-1" style={{ height: '8px' }}></div>
                  <div className="w-0.5 bg-purple-400 rounded-full animate-equalizer-2" style={{ height: '12px' }}></div>
                  <div className="w-0.5 bg-purple-400 rounded-full animate-equalizer-3" style={{ height: '10px' }}></div>
                  <div className="w-0.5 bg-purple-400 rounded-full animate-equalizer-1" style={{ height: '14px' }}></div>
                </div>
              </div>
              
              {/* Song Name */}
              <span className="text-white text-xs font-medium">{currentSong}</span>
            </div>
          )}

          {/* Right section - status icons and clock */}
          <div className="flex items-center space-x-4">
            {/* WiFi Icon */}
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity duration-150"
              onClick={handleWifiClick}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 13.5C8.828 13.5 9.5 12.828 9.5 12C9.5 11.172 8.828 10.5 8 10.5C7.172 10.5 6.5 11.172 6.5 12C6.5 12.828 7.172 13.5 8 13.5Z" fill="white"/>
                <path d="M3.757 7.757C5.219 6.295 7.109 5.5 9 5.5C10.891 5.5 12.781 6.295 14.243 7.757L15 7C13.328 5.328 11.164 4.5 9 4.5C6.836 4.5 4.672 5.328 3 7L3.757 7.757Z" fill="white"/>
                <path d="M5.172 9.172C6.047 8.297 7.023 7.859 8 7.859C8.977 7.859 9.953 8.297 10.828 9.172L11.586 8.414C10.5 7.328 9.25 6.859 8 6.859C6.75 6.859 5.5 7.328 4.414 8.414L5.172 9.172Z" fill="white"/>
                <path d="M1.929 5.929C4.117 3.741 6.559 2.5 9 2.5C11.441 2.5 13.883 3.741 16.071 5.929L16.828 5.172C14.437 2.781 11.719 1.5 9 1.5C6.281 1.5 3.563 2.781 1.172 5.172L1.929 5.929Z" fill="white"/>
              </svg>
            </div>

            {/* Sound Icon */}
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity duration-150"
              onClick={handleSoundClick}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2.5C8.138 2.5 8.25 2.612 8.25 2.75V13.25C8.25 13.388 8.138 13.5 8 13.5C7.937 13.5 7.875 13.475 7.825 13.425L4.175 9.775H1.75C1.062 9.775 0.5 9.213 0.5 8.525V7.475C0.5 6.787 1.062 6.225 1.75 6.225H4.175L7.825 2.575C7.875 2.525 7.937 2.5 8 2.5Z" fill="#a78bfa"/>
                  <path d="M11.854 4.146C12.049 3.951 12.366 3.951 12.561 4.146C13.585 5.17 14.146 6.585 14.146 8C14.146 9.415 13.585 10.83 12.561 11.854C12.366 12.049 12.049 12.049 11.854 11.854C11.659 11.659 11.659 11.342 11.854 11.147C12.683 10.318 13.146 9.159 13.146 8C13.146 6.841 12.683 5.682 11.854 4.853C11.659 4.658 11.659 4.341 11.854 4.146Z" fill="#a78bfa"/>
                  <path d="M10.147 5.854C10.342 5.659 10.659 5.659 10.854 5.854C11.438 6.438 11.75 7.219 11.75 8C11.75 8.781 11.438 9.562 10.854 10.146C10.659 10.341 10.342 10.341 10.147 10.146C9.952 9.951 9.952 9.634 10.147 9.439C10.536 9.05 10.75 8.525 10.75 8C10.75 7.475 10.536 6.95 10.147 6.561C9.952 6.366 9.952 6.049 10.147 5.854Z" fill="#a78bfa"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2.5C8.138 2.5 8.25 2.612 8.25 2.75V13.25C8.25 13.388 8.138 13.5 8 13.5C7.937 13.5 7.875 13.475 7.825 13.425L4.175 9.775H1.75C1.062 9.775 0.5 9.213 0.5 8.525V7.475C0.5 6.787 1.062 6.225 1.75 6.225H4.175L7.825 2.575C7.875 2.525 7.937 2.5 8 2.5Z" fill="white"/>
                  <path d="M11.854 4.146C12.049 3.951 12.366 3.951 12.561 4.146C13.585 5.17 14.146 6.585 14.146 8C14.146 9.415 13.585 10.83 12.561 11.854C12.366 12.049 12.049 12.049 11.854 11.854C11.659 11.659 11.659 11.342 11.854 11.147C12.683 10.318 13.146 9.159 13.146 8C13.146 6.841 12.683 5.682 11.854 4.853C11.659 4.658 11.659 4.341 11.854 4.146Z" fill="white"/>
                  <path d="M10.147 5.854C10.342 5.659 10.659 5.659 10.854 5.854C11.438 6.438 11.75 7.219 11.75 8C11.75 8.781 11.438 9.562 10.854 10.146C10.659 10.341 10.342 10.341 10.147 10.146C9.952 9.951 9.952 9.634 10.147 9.439C10.536 9.05 10.75 8.525 10.75 8C10.75 7.475 10.536 6.95 10.147 6.561C9.952 6.366 9.952 6.049 10.147 5.854Z" fill="white"/>
                </svg>
              )}
            </div>

            {/* Clock */}
            <span
              className="text-white text-sm font-medium select-none cursor-pointer hover:opacity-80 transition-opacity duration-150"
            >
              {currentTime}
            </span>
          </div>
        </div>
      </div>

      {/* Apple Menu Dropdown */}
      <MenuDropdown
        isOpen={activeMenu === 'apple'}
        onClose={closeDropdown}
        items={APPLE_MENU_ITEMS}
        position={dropdownPosition}
        onAction={handleMenuAction}
      />

      {/* Menu Dropdowns */}
      {menus.map((menu) => (
        <MenuDropdown
          key={menu.label}
          isOpen={activeMenu === menu.label}
          onClose={closeDropdown}
          items={menu.items}
          position={dropdownPosition}
          onAction={handleMenuAction}
        />
      ))}

      {/* Control Center (Mobile Only) */}
      {isMobile && (
        <>
          {/* Overlay */}
          {controlCenterOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99]"
              onClick={() => setControlCenterOpen(false)}
              style={{ animation: 'fadeIn 0.3s ease-out' }}
            />
          )}
          
          {/* Control Center Panel */}
          <div
            className={`fixed left-0 right-0 backdrop-blur-3xl transition-transform duration-500 ease-out z-[100] [&::-webkit-scrollbar]:hidden ${
              controlCenterOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
            style={{
              top: 0,
              background: 'linear-gradient(180deg, rgba(25, 25, 35, 0.85) 0%, rgba(30, 30, 40, 0.80) 50%, rgba(35, 35, 45, 0.75) 100%)',
              borderBottomLeftRadius: '32px',
              borderBottomRightRadius: '32px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              padding: '24px',
              maxHeight: '85vh',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Handle bar */}
            <div className="flex justify-center mb-6">
              <div 
                className="w-16 h-1.5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.2) 100%)',
                  boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1)'
                }}
              />
            </div>

            {/* Time Display */}
            <div className="text-center mb-8">
              <h2 
                className="text-white text-5xl font-light mb-2"
                style={{
                  textShadow: '0 2px 20px rgba(139, 92, 246, 0.3)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                {currentTime}
              </h2>
              <p className="text-white/50 text-sm tracking-wide">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Quick Control Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* WiFi Card */}
              <div 
                className="backdrop-blur-xl rounded-3xl p-6 cursor-pointer active:scale-95 transition-all duration-200 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(100, 100, 255, 0.15) 0%, rgba(80, 80, 200, 0.1) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="relative z-10">
                  <div className="mb-3">
                    <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 13.5C8.828 13.5 9.5 12.828 9.5 12C9.5 11.172 8.828 10.5 8 10.5C7.172 10.5 6.5 11.172 6.5 12C6.5 12.828 7.172 13.5 8 13.5Z" fill="white"/>
                      <path d="M3.757 7.757C5.219 6.295 7.109 5.5 9 5.5C10.891 5.5 12.781 6.295 14.243 7.757L15 7C13.328 5.328 11.164 4.5 9 4.5C6.836 4.5 4.672 5.328 3 7L3.757 7.757Z" fill="white"/>
                      <path d="M5.172 9.172C6.047 8.297 7.023 7.859 8 7.859C8.977 7.859 9.953 8.297 10.828 9.172L11.586 8.414C10.5 7.328 9.25 6.859 8 6.859C6.75 6.859 5.5 7.328 4.414 8.414L5.172 9.172Z" fill="white"/>
                    </svg>
                  </div>
                  <p className="text-white text-base font-semibold mb-1">Wi-Fi</p>
                  <p className="text-white/60 text-xs">Network</p>
                </div>
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.3), transparent 70%)'
                  }}
                />
              </div>

              {/* Volume Card */}
              <div 
                className="backdrop-blur-xl rounded-3xl p-6 cursor-pointer active:scale-95 transition-all duration-200 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(100, 100, 255, 0.15) 0%, rgba(80, 80, 200, 0.1) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="relative z-10">
                  <div className="mb-3">
                    <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2.5C8.138 2.5 8.25 2.612 8.25 2.75V13.25C8.25 13.388 8.138 13.5 8 13.5C7.937 13.5 7.875 13.475 7.825 13.425L4.175 9.775H1.75C1.062 9.775 0.5 9.213 0.5 8.525V7.475C0.5 6.787 1.062 6.225 1.75 6.225H4.175L7.825 2.575C7.875 2.525 7.937 2.5 8 2.5Z" fill="white"/>
                      <path d="M11.854 4.146C12.049 3.951 12.366 3.951 12.561 4.146C13.585 5.17 14.146 6.585 14.146 8C14.146 9.415 13.585 10.83 12.561 11.854C12.366 12.049 12.049 12.049 11.854 11.854C11.659 11.659 11.659 11.342 11.854 11.147C12.683 10.318 13.146 9.159 13.146 8C13.146 6.841 12.683 5.682 11.854 4.853C11.659 4.658 11.659 4.341 11.854 4.146Z" fill="white"/>
                    </svg>
                  </div>
                  <p className="text-white text-base font-semibold mb-1">Sound</p>
                  <p className="text-white/60 text-xs">75%</p>
                </div>
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.3), transparent 70%)'
                  }}
                />
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="space-y-3">
              <h3 className="text-white/50 text-xs uppercase tracking-widest px-3 mb-3 font-semibold">Navigation</h3>
              {menus.map((menu) => (
                <div key={menu.label} className="space-y-2">
                  <div 
                    className="backdrop-blur-xl rounded-3xl p-5 cursor-pointer active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(70, 70, 90, 0.3) 0%, rgba(50, 50, 70, 0.2) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="mr-3 opacity-80">
                        {menu.icon}
                      </div>
                      <p className="text-white font-semibold text-base">{menu.label}</p>
                    </div>
                    <div className="space-y-1">
                      {menu.items.map((item, idx) => {
                        if (item.type === 'separator') return null;
                        return (
                          <div 
                            key={idx}
                            className="text-white/80 text-sm py-2.5 px-3 rounded-xl hover:bg-white/10 active:bg-white/15 cursor-pointer transition-all duration-150 flex items-center"
                            onClick={() => {
                              handleMenuAction(item.action);
                              setControlCenterOpen(false);
                            }}
                          >
                            <span className="mr-2 opacity-60">→</span>
                            {item.label}
                          </div>
                        );
                      })}
                    </div>
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.2), transparent 60%)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setControlCenterOpen(false)}
              className="w-full mt-6 py-4 rounded-3xl text-white font-semibold active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(99, 102, 241, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              Done
            </button>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes equalizer-1 {
              0%, 100% { height: 8px; }
              50% { height: 4px; }
            }
            
            @keyframes equalizer-2 {
              0%, 100% { height: 12px; }
              50% { height: 6px; }
            }
            
            @keyframes equalizer-3 {
              0%, 100% { height: 10px; }
              50% { height: 14px; }
            }
            
            .animate-fade-in {
              animation: fadeIn 0.3s ease-out;
            }
            
            .animate-equalizer-1 {
              animation: equalizer-1 0.8s ease-in-out infinite;
            }
            
            .animate-equalizer-2 {
              animation: equalizer-2 0.9s ease-in-out infinite;
            }
            
            .animate-equalizer-3 {
              animation: equalizer-3 0.7s ease-in-out infinite;
            }
          `}</style>
        </>
      )}

      {/* Speed Test Popup (Desktop Only) */}
      {!isMobile && speedTestOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            onClick={() => setSpeedTestOpen(false)}
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          />
          
          {/* Speed Test Modal */}
          <div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[120] backdrop-blur-2xl"
            style={{
              width: '420px',
              background: 'linear-gradient(135deg, rgba(30, 30, 45, 0.95) 0%, rgba(20, 20, 35, 0.98) 100%)',
              borderRadius: '32px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              padding: '32px',
              animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(100, 100, 255, 0.3) 0%, rgba(80, 80, 200, 0.2) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 13.5C8.828 13.5 9.5 12.828 9.5 12C9.5 11.172 8.828 10.5 8 10.5C7.172 10.5 6.5 11.172 6.5 12C6.5 12.828 7.172 13.5 8 13.5Z" fill="white"/>
                    <path d="M3.757 7.757C5.219 6.295 7.109 5.5 9 5.5C10.891 5.5 12.781 6.295 14.243 7.757L15 7C13.328 5.328 11.164 4.5 9 4.5C6.836 4.5 4.672 5.328 3 7L3.757 7.757Z" fill="white"/>
                    <path d="M5.172 9.172C6.047 8.297 7.023 7.859 8 7.859C8.977 7.859 9.953 8.297 10.828 9.172L11.586 8.414C10.5 7.328 9.25 6.859 8 6.859C6.75 6.859 5.5 7.328 4.414 8.414L5.172 9.172Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold">Speed Test</h3>
                  <p className="text-white/50 text-sm">Network Analysis</p>
                </div>
              </div>
              <button
                onClick={() => setSpeedTestOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 active:bg-white/20 transition-all duration-150 flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Speed Metrics */}
            <div className="space-y-6 mb-6">
              {/* Speedometer for Download */}
              <div className="relative">
                <div className="text-center mb-4">
                  <p className="text-white/70 text-sm mb-2">Download Speed</p>
                  <p className="text-white text-4xl font-bold">
                    {internetSpeed.download > 0 ? internetSpeed.download : '0'}
                    <span className="text-lg text-white/60 ml-2">Mbps</span>
                  </p>
                </div>
                
                {/* Speedometer Circle */}
                <div className="relative w-64 h-64 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    {/* Background Arc */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="12"
                      strokeDasharray="377"
                      strokeDashoffset="94.25"
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                    />
                    {/* Progress Arc */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#downloadGradient)"
                      strokeWidth="12"
                      strokeDasharray="377"
                      strokeDashoffset={94.25 + (282.75 - (282.75 * Math.min(internetSpeed.download / 100, 1)))}
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                      style={{
                        transition: 'stroke-dashoffset 0.5s ease-out',
                        filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))'
                      }}
                    />
                    <defs>
                      <linearGradient id="downloadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(139, 92, 246, 0.3)"/>
                        <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {isTestingSpeed && internetSpeed.download < 95 && (
                        <p className="text-white/60 text-xs animate-pulse">Testing...</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Speed Indicator Needle */}
                  <div 
                    className="absolute top-1/2 left-1/2 origin-bottom transition-transform duration-500 ease-out"
                    style={{
                      width: '2px',
                      height: '70px',
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(139, 92, 246, 0.5))',
                      transform: `translate(-50%, -100%) rotate(${-135 + (270 * Math.min(internetSpeed.download / 100, 1))}deg)`,
                      transformOrigin: 'bottom center',
                      boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
                    }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(139, 92, 246, 0.6) 100%)',
                      boxShadow: '0 0 15px rgba(139, 92, 246, 0.8)'
                    }}
                  />
                </div>
              </div>

              {/* Ping & Upload Stats */}
              <div className="grid grid-cols-2 gap-4">
                {/* Ping */}
                <div 
                  className="backdrop-blur-xl rounded-2xl p-4 text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(60, 60, 80, 0.4) 0%, rgba(40, 40, 60, 0.3) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <p className="text-white/60 text-xs mb-1">Ping</p>
                  <p className="text-white text-2xl font-bold">
                    {internetSpeed.ping > 0 ? `${internetSpeed.ping}` : '---'}
                    {internetSpeed.ping > 0 && <span className="text-sm text-white/60 ml-1">ms</span>}
                  </p>
                </div>

                {/* Upload */}
                <div 
                  className="backdrop-blur-xl rounded-2xl p-4 text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(79, 70, 229, 0.2) 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.3)'
                  }}
                >
                  <p className="text-white/60 text-xs mb-1">Upload</p>
                  <p className="text-white text-2xl font-bold">
                    {internetSpeed.upload > 0 ? `${internetSpeed.upload}` : '---'}
                    {internetSpeed.upload > 0 && <span className="text-sm text-white/60 ml-1">Mbps</span>}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                simulateSpeedTest();
              }}
              disabled={isTestingSpeed}
              className="w-full py-4 rounded-2xl text-white font-semibold transition-all duration-200 relative overflow-hidden disabled:opacity-50"
              style={{
                background: isTestingSpeed 
                  ? 'linear-gradient(135deg, rgba(100, 100, 120, 0.5) 0%, rgba(80, 80, 100, 0.4) 100%)'
                  : 'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(99, 102, 241, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)'
              }}
            >
              {isTestingSpeed ? 'Testing...' : 'Test Again'}
            </button>

            {!isTestingSpeed && internetSpeed.download > 0 && (
              <div className="mt-4 text-center">
                <p className="text-white/50 text-xs">
                  Connection: <span className="text-green-400 font-medium">Excellent</span>
                </p>
              </div>
            )}
          </div>

          <style jsx>{`
            @keyframes modalSlideIn {
              from {
                opacity: 0;
                transform: translate(-50%, -48%) scale(0.9);
              }
              to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
              }
            }
          `}</style>
        </>
      )}

      {/* Music & Scroll Notification (Desktop only, Hero section only) */}
      {!isMobile && showNotification && isHeroSection && (
        <div 
          className="fixed top-20 right-6 backdrop-blur-xl animate-slide-in-corner z-[90]"
          style={{
            width: '320px',
            background: 'rgba(30, 30, 40, 0.95)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            padding: '16px',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-3 right-3 w-6 h-6 rounded-full hover:bg-white/10 transition-all duration-150 flex items-center justify-center"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Content */}
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L6 3.5V11.5C5.5 11 4.75 10.5 3.5 10.5C1.5 10.5 1 11.5 1 12.5C1 13.5 1.5 14.5 3.5 14.5C5.5 14.5 6 13.5 6 12.5V7L13 5.5V9.5C12.5 9 11.75 8.5 10.5 8.5C8.5 8.5 8 9.5 8 10.5C8 11.5 8.5 12.5 10.5 12.5C12.5 12.5 13 11.5 13 10.5V2Z" fill="#a78bfa"/>
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 pt-1">
              <h4 className="text-white font-medium text-sm mb-1">Enhance Your Experience</h4>
              <p className="text-white/70 text-xs leading-relaxed mb-3">
                <span 
                  className="text-purple-400 hover:text-purple-300 cursor-pointer font-medium underline decoration-dotted"
                  onClick={handleSoundClick}
                >
                  Play music
                </span>
                {' '}while exploring the portfolio
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-corner {
          from {
            opacity: 0;
            transform: translateX(30px) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slide-in-corner {
          animation: slide-in-corner 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default MacOSMenuBar;
