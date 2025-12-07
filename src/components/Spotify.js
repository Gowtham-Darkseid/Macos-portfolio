import React, { useState, useEffect, useRef } from 'react';

const Spotify = ({ isOpen, onClose }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [size, setSize] = useState({ width: 1000, height: 650 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(70);
  // eslint-disable-next-line no-unused-vars
  const [activeView, setActiveView] = useState('home');
  const [currentSong] = useState({
    title: 'Mild Music',
    artist: 'Lofi Beats',
    album: 'Chill Vibes',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80',
  });
  const windowRef = useRef(null);
  const audioRef = useRef(null);
  
  const minSize = { width: 700, height: 500 };
  const maxSize = { width: typeof window !== 'undefined' ? window.innerWidth - 50 : 1400, height: typeof window !== 'undefined' ? window.innerHeight - 50 : 900 };

  const playlists = [
    { id: 1, name: 'Liked Songs', count: 127, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80', color: 'from-purple-500 to-blue-500' },
    { id: 2, name: 'Chill Vibes', count: 43, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80', color: 'from-green-500 to-teal-500' },
    { id: 3, name: 'Coding Flow', count: 89, image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&q=80', color: 'from-orange-500 to-red-500' },
    { id: 4, name: 'Focus', count: 56, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80', color: 'from-pink-500 to-purple-500' },
    { id: 5, name: 'Workout', count: 78, image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&q=80', color: 'from-red-500 to-orange-500' },
    { id: 6, name: 'Evening Relax', count: 34, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80', color: 'from-blue-500 to-indigo-500' },
  ];

  const recentlyPlayed = [
    { title: 'Midnight Dreams', artist: 'Lofi Beats', album: 'Night Sessions', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&q=80' },
    { title: 'Ocean Waves', artist: 'Nature Sounds', album: 'Relaxation', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200&q=80' },
    { title: 'Coffee Shop', artist: 'Jazz Cafe', album: 'Morning Vibes', image: 'https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=200&q=80' },
    { title: 'Study Mode', artist: 'Focus Music', album: 'Deep Work', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80' },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
      setPosition({ x: 0, y: 0 });
      setIsMaximized(false);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Initialize audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/music.mp3');
      audioRef.current.loop = true;
    }
    
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(Math.floor(audio.duration));
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(Math.floor(audio.currentTime));
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Playback error:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Stop audio when Spotify closes
  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Seek to position
  const handleSeek = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(Math.floor(newTime));
    }
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, dragOffset]);

  // Resize handlers
  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const handleResizeMove = (e) => {
    if (!isResizing || !resizeDirection || !windowRef.current) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    let newWidth = size.width;
    let newHeight = size.height;
    let newX = position.x;
    let newY = position.y;

    if (resizeDirection.includes('e')) {
      newWidth = Math.max(minSize.width, Math.min(maxSize.width, e.clientX - rect.left + position.x));
    }
    if (resizeDirection.includes('w')) {
      const deltaX = rect.left - e.clientX;
      newWidth = Math.max(minSize.width, Math.min(maxSize.width, size.width + deltaX));
      if (newWidth !== size.width) {
        newX = position.x - (newWidth - size.width);
      }
    }
    if (resizeDirection.includes('s')) {
      newHeight = Math.max(minSize.height, Math.min(maxSize.height, e.clientY - rect.top + position.y));
    }
    if (resizeDirection.includes('n')) {
      const deltaY = rect.top - e.clientY;
      newHeight = Math.max(minSize.height, Math.min(maxSize.height, size.height + deltaY));
      if (newHeight !== size.height) {
        newY = position.y - (newHeight - size.height);
      }
    }

    setSize({ width: newWidth, height: newHeight });
    setPosition({ x: newX, y: newY });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeDirection(null);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResizing, resizeDirection, size, position]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed z-[100] transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Spotify Window */}
      <div
        ref={windowRef}
        className={`relative overflow-hidden transition-all duration-300 ease-out rounded-2xl ${
          isMaximized ? '!fixed !inset-0 !rounded-none' : ''
        } ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{
          width: isMaximized ? '100vw' : `${size.width}px`,
          height: isMaximized ? '100vh' : `${size.height}px`,
          transform: !isMaximized ? `translate(${position.x}px, ${position.y}px)` : undefined,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
          background: 'rgba(18, 18, 18, 0.75)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
        }}
      >
        {/* Gradient overlay for depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 215, 96, 0.1) 0%, transparent 50%, rgba(29, 185, 84, 0.05) 100%)',
          }}
        />
        
        {/* Glass shine effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 40%)',
          }}
        />

        {/* Resize Handles */}
        {!isMaximized && (
          <>
            <div className="absolute top-0 left-2 right-2 h-1 cursor-ns-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'n')} />
            <div className="absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize z-20" onMouseDown={(e) => handleResizeStart(e, 's')} />
            <div className="absolute left-0 top-2 bottom-2 w-1 cursor-ew-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'w')} />
            <div className="absolute right-0 top-2 bottom-2 w-1 cursor-ew-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'e')} />
            <div className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
            <div className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
            <div className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
            <div className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'se')} />
          </>
        )}

        {/* Header */}
        <div 
          className="h-14 flex items-center px-4 cursor-move relative z-10"
          onMouseDown={handleMouseDown}
          style={{ 
            background: 'rgba(0, 0, 0, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          {/* Traffic Lights */}
          <div className="flex items-center gap-2 mr-4">
            <button
              onClick={(e) => { e.stopPropagation(); handleClose(); }}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors shadow-inner"
            />
            <button className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 transition-colors shadow-inner" />
            <button
              onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
              className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors shadow-inner"
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 flex-1">
            <button className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
              <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
              <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Spotify Logo & User */}
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1DB954] to-[#1ed760] flex items-center justify-center text-black text-xs font-bold shadow-lg">
              G
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100%-8.5rem)] relative z-10">
          {/* Sidebar */}
          <div 
            className="w-60 p-4 overflow-y-auto"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRight: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <div className="space-y-4">
              {/* Navigation */}
              <div className="space-y-1">
                <button 
                  onClick={() => setActiveView('home')}
                  className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all ${
                    activeView === 'home' 
                      ? 'bg-white/10 backdrop-blur-sm border border-white/10' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                  <span className="text-white font-medium">Home</span>
                </button>
                <button className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
                  <svg className="w-6 h-6 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <span className="text-white/60 font-medium">Search</span>
                </button>
                <button className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
                  <svg className="w-6 h-6 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-white/60 font-medium">Your Library</span>
                </button>
              </div>

              <div className="h-px bg-white/10 my-2" />

              <div className="space-y-1">
                <button className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  <span className="text-white/60 font-medium">Create Playlist</span>
                </button>
                <button className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500/80 to-blue-500/80 backdrop-blur-sm rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <span className="text-white/60 font-medium">Liked Songs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <h1 className="text-white text-3xl font-bold mb-6 drop-shadow-lg">Good evening</h1>
            
            {/* Playlists Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {playlists.map(playlist => (
                <button
                  key={playlist.id}
                  className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden transition-all border border-white/5 hover:border-white/10"
                >
                  <img src={playlist.image} alt={playlist.name} className="w-14 h-14 object-cover" />
                  <span className="text-white font-semibold text-sm">{playlist.name}</span>
                </button>
              ))}
            </div>

            {/* Recently Played */}
            <h2 className="text-white text-2xl font-bold mb-4 drop-shadow-lg">Recently played</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentlyPlayed.map((track, index) => (
                <div
                  key={index}
                  className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all cursor-pointer border border-white/5 hover:border-white/10"
                >
                  <div className="relative mb-4">
                    <img src={track.image} alt={track.title} className="w-full aspect-square object-cover rounded-lg shadow-lg" />
                    <button className="absolute bottom-2 right-2 w-11 h-11 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#1ed760]">
                      <svg className="w-5 h-5 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1 truncate">{track.title}</h3>
                  <p className="text-white/50 text-xs truncate">{track.artist}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Now Playing Bar */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[5.5rem] px-4 py-3 z-10"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="flex items-center justify-between h-full">
            {/* Current Track */}
            <div className="flex items-center gap-3 flex-1">
              <img src={currentSong.image} alt={currentSong.title} className="w-14 h-14 rounded-lg shadow-lg" />
              <div className="min-w-0">
                <div className="text-white text-sm font-medium truncate">{currentSong.title}</div>
                <div className="text-white/50 text-xs truncate">{currentSong.artist}</div>
              </div>
              <button className="ml-2 text-[#1DB954] hover:text-[#1ed760] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
              <div className="flex items-center gap-4">
                <button className="text-white/50 hover:text-white transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>
                <button className="text-white/50 hover:text-white transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
                  </svg>
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
                <button className="text-white/50 hover:text-white transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                  </svg>
                </button>
                <button className="text-white/50 hover:text-white transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="text-xs text-white/40 w-10 text-right">{formatTime(currentTime)}</span>
                <div 
                  className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer group"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-white rounded-full relative group-hover:bg-[#1DB954] transition-colors"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
                  </div>
                </div>
                <span className="text-xs text-white/40 w-10">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume & More */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              <button className="text-white/50 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </button>
              <button className="text-white/50 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
                </svg>
              </button>
              <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgba(255,255,255,0.9) ${volume}%, rgba(255,255,255,0.2) ${volume}%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spotify;
