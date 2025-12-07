import React, { useState, useEffect, useRef } from 'react';

const Safari = ({ isOpen, onClose, initialUrl = '' }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [size, setSize] = useState({ width: 1000, height: 700 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([{ id: 0, title: 'Start Page', url: '', favicon: '🏠' }]);
  const windowRef = useRef(null);
  const iframeRef = useRef(null);
  
  const minSize = { width: 500, height: 400 };
  const maxSize = { width: typeof window !== 'undefined' ? window.innerWidth - 50 : 1400, height: typeof window !== 'undefined' ? window.innerHeight - 50 : 900 };

  // Bookmarks
  const bookmarks = [
    { name: 'GitHub', url: 'https://github.com/Gowtham-Darkseid', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/gowtham', icon: '💼' },
    { name: 'Portfolio', url: 'https://gowtham.dev', icon: '🏠' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
    { name: 'YouTube', url: 'https://youtube.com', icon: '📺' },
    { name: 'Google', url: 'https://google.com', icon: '🔍' },
  ];

  // Quick links for start page
  const quickLinks = [
    { name: 'GitHub', url: 'https://github.com/Gowtham-Darkseid', icon: 'https://github.githubassets.com/favicons/favicon.svg', color: 'bg-gray-800' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/gowtham', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', color: 'bg-blue-600' },
    { name: 'Google', url: 'https://google.com', icon: 'https://www.google.com/favicon.ico', color: 'bg-white' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'https://www.youtube.com/favicon.ico', color: 'bg-red-600' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'https://abs.twimg.com/favicons/twitter.3.ico', color: 'bg-black' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico', color: 'bg-orange-500' },
    { name: 'Dev.to', url: 'https://dev.to', icon: 'https://dev.to/favicon.ico', color: 'bg-black' },
    { name: 'Medium', url: 'https://medium.com', icon: 'https://medium.com/favicon.ico', color: 'bg-black' },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
      setPosition({ x: 0, y: 0 });
      setIsMaximized(false);
      
      // Handle initialUrl if provided
      if (initialUrl) {
        setCurrentUrl(initialUrl);
        setInputUrl(initialUrl);
        setHistory([initialUrl]);
        setHistoryIndex(0);
        // Determine title based on URL
        const isPdf = initialUrl.toLowerCase().endsWith('.pdf');
        const title = isPdf ? 'Resume.pdf' : new URL(initialUrl, window.location.origin).hostname;
        const favicon = isPdf ? '📄' : '🌐';
        setTabs([{ id: 0, title, url: initialUrl, favicon }]);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen, initialUrl]);

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

  const navigateTo = (url) => {
    setIsLoading(true);
    setCurrentUrl(url);
    setInputUrl(url);
    
    // Update tabs
    const newTabs = [...tabs];
    newTabs[activeTab] = { ...newTabs[activeTab], url, title: 'Loading...' };
    setTabs(newTabs);

    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(url);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCanGoBack(true);
    setCanGoForward(false);

    setTimeout(() => {
      setIsLoading(false);
      // Update tab title
      const updatedTabs = [...tabs];
      const domain = new URL(url).hostname.replace('www.', '');
      updatedTabs[activeTab] = { ...updatedTabs[activeTab], title: domain };
      setTabs(updatedTabs);
    }, 800);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    let url = inputUrl;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    navigateTo(url);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
      setCanGoForward(true);
      setCanGoBack(newIndex > 0);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
      setCanGoBack(true);
      setCanGoForward(newIndex < history.length - 1);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const addTab = () => {
    const newTab = { id: tabs.length, title: 'Start Page', url: '', favicon: '🏠' };
    setTabs([...tabs, newTab]);
    setActiveTab(tabs.length);
    setCurrentUrl('');
    setInputUrl('');
  };

  const closeTab = (index, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    if (activeTab >= newTabs.length) {
      setActiveTab(newTabs.length - 1);
    }
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
      {/* Safari Window */}
      <div
        ref={windowRef}
        className={`relative overflow-hidden transition-all duration-300 ease-out rounded-xl ${
          isMaximized ? '!fixed !inset-0 !rounded-none' : ''
        } ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{
          width: isMaximized ? '100vw' : `${size.width}px`,
          height: isMaximized ? '100vh' : `${size.height}px`,
          transform: !isMaximized ? `translate(${position.x}px, ${position.y}px)` : undefined,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
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

        {/* Safari Header - Tab Bar */}
        <div 
          className="h-10 bg-gradient-to-b from-[#E8E8E8] to-[#D4D4D4] flex items-center px-2 border-b border-[#B8B8B8] cursor-move"
          onMouseDown={handleMouseDown}
        >
          {/* Traffic Lights */}
          <div className="flex items-center gap-2 mr-4">
            <button
              onClick={(e) => { e.stopPropagation(); handleClose(); }}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors flex items-center justify-center group"
            >
              <svg className="w-2 h-2 text-[#4A0002] opacity-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <button
              className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 transition-colors flex items-center justify-center group"
            >
              <svg className="w-2 h-2 text-[#995700] opacity-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
              className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors flex items-center justify-center group"
            >
              <svg className="w-2 h-2 text-[#006500] opacity-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex-1 flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                onClick={() => {
                  setActiveTab(index);
                  setCurrentUrl(tab.url);
                  setInputUrl(tab.url);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg min-w-[120px] max-w-[200px] cursor-pointer transition-all ${
                  activeTab === index 
                    ? 'bg-white shadow-sm' 
                    : 'bg-[#C8C8C8] hover:bg-[#D0D0D0]'
                }`}
              >
                <span className="text-sm">{tab.favicon}</span>
                <span className="text-xs text-gray-700 truncate flex-1">{tab.title}</span>
                {tabs.length > 1 && (
                  <button 
                    onClick={(e) => closeTab(index, e)}
                    className="w-4 h-4 rounded-full hover:bg-gray-300 flex items-center justify-center"
                  >
                    <svg className="w-2.5 h-2.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button 
              onClick={addTab}
              className="w-6 h-6 rounded-lg hover:bg-[#C8C8C8] flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="h-12 bg-gradient-to-b from-[#F6F6F6] to-[#E8E8E8] flex items-center px-3 gap-3 border-b border-[#C8C8C8]">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-1">
            <button 
              onClick={goBack}
              disabled={!canGoBack}
              className={`p-1.5 rounded-md transition-colors ${canGoBack ? 'hover:bg-gray-200 text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={goForward}
              disabled={!canGoForward}
              className={`p-1.5 rounded-md transition-colors ${canGoForward ? 'hover:bg-gray-200 text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* URL Bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center">
                {isLoading ? (
                  <svg className="w-4 h-4 text-gray-400 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                )}
              </div>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Search or enter website name"
                className="w-full pl-10 pr-10 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={refresh}
                className="absolute right-3 p-0.5 hover:bg-gray-100 rounded"
              >
                <svg className={`w-4 h-4 text-gray-400 ${isLoading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6M1 20v-6h6" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
              </svg>
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bookmarks Bar */}
        <div className="h-8 bg-[#F6F6F6] flex items-center px-3 gap-4 border-b border-[#E0E0E0] overflow-x-auto">
          {bookmarks.map((bookmark, index) => (
            <button
              key={index}
              onClick={() => navigateTo(bookmark.url)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 whitespace-nowrap transition-colors"
            >
              <span>{bookmark.icon}</span>
              <span>{bookmark.name}</span>
            </button>
          ))}
        </div>

        {/* Browser Content */}
        <div className="h-[calc(100%-7.5rem)] bg-white overflow-hidden">
          {currentUrl ? (
            currentUrl.toLowerCase().endsWith('.pdf') ? (
              /* PDF Viewer */
              <object
                data={currentUrl}
                type="application/pdf"
                className="w-full h-full"
              >
                <embed src={currentUrl} type="application/pdf" className="w-full h-full" />
                <p className="p-8 text-center text-gray-600">
                  Unable to display PDF. <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Download instead</a>
                </p>
              </object>
            ) : (
              <iframe
                ref={iframeRef}
                src={currentUrl}
                className="w-full h-full border-0"
                title="Safari Browser"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            )
          ) : (
            /* Start Page */
            <div className="w-full h-full bg-gradient-to-b from-[#F5F5F7] to-[#E8E8ED] p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                {/* Search */}
                <div className="mb-12">
                  <form onSubmit={handleUrlSubmit} className="relative max-w-xl mx-auto">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="Search or enter website name"
                      className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </form>
                </div>

                {/* Favorites */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-500 mb-4 px-2">Favorites</h3>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {quickLinks.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => navigateTo(link.url)}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/50 transition-colors group"
                      >
                        <div className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                          <img 
                            src={link.icon} 
                            alt={link.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <span className="text-white text-lg font-bold hidden">{link.name.charAt(0)}</span>
                        </div>
                        <span className="text-xs text-gray-600 truncate w-full text-center">{link.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reading List */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-500 mb-4 px-2">Privacy Report</h3>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Safari blocked 12 trackers</p>
                        <p className="text-xs text-gray-500">In the last 7 days, Safari has prevented trackers from profiling you.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Siri Suggestions */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-4 px-2">Siri Suggestions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => navigateTo('https://github.com/Gowtham-Darkseid')}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
                    >
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-white">🐙</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Check GitHub</p>
                        <p className="text-xs text-gray-500">View latest commits</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => navigateTo('https://linkedin.com/in/gowtham')}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white">💼</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">View LinkedIn</p>
                        <p className="text-xs text-gray-500">Professional profile</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Safari;
