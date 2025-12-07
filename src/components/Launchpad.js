import React, { useState, useEffect } from 'react';

const Launchpad = ({ isOpen, onClose, onOpenApp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const apps = [
    // Row 1
    { id: 'about', name: 'About Me', icon: '/assets/icons/finder.png', color: 'bg-blue-500' },
    { id: 'skills', name: 'Skills', icon: '/assets/icons/setting/icons8-settings-512.png', color: 'bg-gray-500' },
    { id: 'projects', name: 'Projects', icon: '/assets/icons/projects.png', color: 'bg-purple-500' },
    { id: 'resume', name: 'Resume', icon: '/assets/icons/notes/icons8-notes-app-512.png', color: 'bg-yellow-500' },
    { id: 'contact', name: 'Contact', icon: '/assets/icons/mail/icons8-mail-512.png', color: 'bg-blue-400' },
    { id: 'terminal', name: 'Terminal', icon: '/assets/icons/terminal.avif', color: 'bg-black' },
    { id: 'github', name: 'GitHub', icon: '/assets/icons/github.png', color: 'bg-gray-800', external: 'https://github.com/Gowtham-Darkseid' },
    
    // Row 2
    { id: 'linkedin', name: 'LinkedIn', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', color: 'bg-blue-600', external: 'https://linkedin.com/in/gowtham' },
    { id: 'safari', name: 'Safari', icon: '/assets/icons/safari.png', color: 'bg-blue-500' },
    { id: 'photos', name: 'Photos', icon: '/assets/icons/photos.avif', color: 'bg-gradient-to-br from-pink-500 to-orange-400' },
    { id: 'vscode', name: 'VS Code', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png', color: 'bg-blue-600', external: 'https://github.com/Gowtham-Darkseid' },
    { id: 'spotify', name: 'Spotify', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/512px-Spotify_icon.svg.png', color: 'bg-green-500', external: 'https://open.spotify.com' },
    { id: 'twitter', name: 'Twitter', icon: 'https://abs.twimg.com/icons/apple-touch-icon-192x192.png', color: 'bg-black', external: 'https://twitter.com' },
    { id: 'discord', name: 'Discord', icon: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png', color: 'bg-indigo-500', external: 'https://discord.com' },
    
    // Row 3
    { id: 'notion', name: 'Notion', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png', color: 'bg-white', external: 'https://notion.so' },
    { id: 'figma', name: 'Figma', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg', color: 'bg-purple-600', external: 'https://figma.com' },
    { id: 'blog', name: 'Blog', icon: '/assets/icons/blog.png', color: 'bg-orange-500' },
    { id: 'email', name: 'Email', icon: '/assets/icons/mail/icons8-mail-512.png', color: 'bg-blue-500', external: 'mailto:graj200026@gmail.com' },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
      setSearchQuery('');
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleAppClick = (app) => {
    if (app.external) {
      window.open(app.external, '_blank');
    } else {
      onOpenApp(app.id);
      handleClose();
    }
  };

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[200] transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Blurred Background */}
      <div 
        className={`absolute inset-0 backdrop-blur-2xl bg-black/40 transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Content Container */}
      <div 
        className={`relative h-full flex flex-col items-center pt-8 md:pt-16 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="mb-8 md:mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-64 md:w-80 pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Apps Grid */}
        <div 
          className={`grid grid-cols-4 md:grid-cols-7 gap-6 md:gap-8 px-8 max-w-5xl transition-all duration-500 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {filteredApps.map((app, index) => (
            <button
              key={app.id}
              onClick={(e) => {
                e.stopPropagation();
                handleAppClick(app);
              }}
              className="group flex flex-col items-center gap-2 transition-all duration-200"
              style={{
                animationDelay: `${index * 30}ms`,
              }}
            >
              {/* App Icon */}
              <div 
                className="relative w-16 h-16 md:w-20 md:h-20 transition-all duration-200 group-hover:scale-110 group-active:scale-95"
              >
                <img 
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-contain rounded-[22%] shadow-lg"
                  draggable="false"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback icon */}
                <div 
                  className={`absolute inset-0 ${app.color} rounded-[22%] shadow-lg hidden items-center justify-center text-white text-2xl font-bold`}
                >
                  {app.name.charAt(0)}
                </div>
              </div>
              
              {/* App Name */}
              <span className="text-white text-xs md:text-sm font-medium text-center truncate w-full opacity-90 group-hover:opacity-100 transition-opacity">
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredApps.length === 0 && (
          <div className="text-white/60 text-center mt-12">
            <p className="text-lg">No apps found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}

        {/* Page Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white/30" />
        </div>

        {/* Close hint */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-xs">
          Click anywhere or press ESC to close
        </div>
      </div>
    </div>
  );
};

export default Launchpad;
