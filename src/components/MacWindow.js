import React, { useState, useEffect, useRef } from 'react';

const MacWindow = ({ 
  isOpen, 
  onClose, 
  title, 
  icon,
  children,
  accentColor = '#007AFF'
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const windowRef = useRef(null);

  const minWidth = 400;
  const minHeight = 300;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
      setPosition({ x: 0, y: 0 });
      setSize({ width: Math.min(window.innerWidth * 0.8, 1024), height: Math.min(window.innerHeight * 0.8, 700) });
      setIsMaximized(false);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleMouseDown = (e) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeStart = (e, direction) => {
    e.stopPropagation();
    if (isMaximized) return;
    setIsResizing(true);
    setResizeDirection(direction);
    setDragOffset({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    } else if (isResizing) {
      const deltaX = e.clientX - dragOffset.x;
      const deltaY = e.clientY - dragOffset.y;

      let newWidth = dragOffset.width;
      let newHeight = dragOffset.height;
      let newX = dragOffset.posX;
      let newY = dragOffset.posY;

      if (resizeDirection.includes('e')) {
        newWidth = Math.max(minWidth, dragOffset.width + deltaX);
      }
      if (resizeDirection.includes('w')) {
        newWidth = Math.max(minWidth, dragOffset.width - deltaX);
        if (newWidth > minWidth) {
          newX = dragOffset.posX + deltaX;
        }
      }
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(minHeight, dragOffset.height + deltaY);
      }
      if (resizeDirection.includes('n')) {
        newHeight = Math.max(minHeight, dragOffset.height - deltaY);
        if (newHeight > minHeight) {
          newY = dragOffset.posY + deltaY;
        }
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, isResizing, dragOffset, resizeDirection]);

  const handleClose = () => {
    setIsMinimizing(true);
    setIsVisible(false);
    setTimeout(() => {
      setIsMinimizing(false);
      onClose();
    }, 300);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setPosition({ x: 0, y: 0 });
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
      {/* Window - Light macOS Style */}
      <div
        ref={windowRef}
        className={`relative overflow-hidden transition-all duration-300 ease-out bg-white ${
          isMaximized 
            ? '!fixed !inset-0 rounded-none' 
            : 'rounded-xl'
        } ${isVisible && !isMinimizing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{
          width: isMaximized ? '100vw' : size.width,
          height: isMaximized ? '100vh' : size.height,
          transform: isMaximized ? 'none' : `translate(${position.x}px, ${position.y}px) ${isVisible && !isMinimizing ? 'scale(1)' : 'scale(0.95)'}`,
          boxShadow: '0 22px 70px 4px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
        }}
      >
        {/* Resize Handles */}
        {!isMaximized && (
          <>
            {/* Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
            <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
            <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
            <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'se')} />
            {/* Edges */}
            <div className="absolute top-0 left-4 right-4 h-1 cursor-n-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'n')} />
            <div className="absolute bottom-0 left-4 right-4 h-1 cursor-s-resize z-20" onMouseDown={(e) => handleResizeStart(e, 's')} />
            <div className="absolute left-0 top-4 bottom-4 w-1 cursor-w-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'w')} />
            <div className="absolute right-0 top-4 bottom-4 w-1 cursor-e-resize z-20" onMouseDown={(e) => handleResizeStart(e, 'e')} />
          </>
        )}
        {/* Window Title Bar - Light macOS Style */}
        <div 
          className="relative h-12 flex items-center px-4 select-none bg-gray-100 border-b border-gray-200"
          onMouseDown={handleMouseDown}
          style={{ cursor: isMaximized ? 'default' : 'grab' }}
        >
          {/* Traffic Lights */}
          <div className="flex items-center gap-2 z-10">
            <button
              onClick={handleClose}
              className="group w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-90 transition-all flex items-center justify-center"
            >
              <svg className="w-1.5 h-1.5 text-[#4D0000] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button
              onClick={() => setIsMinimizing(true)}
              className="group w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-90 transition-all flex items-center justify-center"
            >
              <svg className="w-1.5 h-1.5 text-[#995700] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button
              onClick={handleMaximize}
              className="group w-3 h-3 rounded-full bg-[#28C840] hover:brightness-90 transition-all flex items-center justify-center"
            >
              <svg className="w-1.5 h-1.5 text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                <path d="M3 9V6.5C3 4.5 4.5 3 6.5 3H9M9 3L7 5M9 3L7 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Window Title - Center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2">
              {icon && <span className="text-base">{icon}</span>}
              <span className="text-sm font-medium text-gray-700">{title}</span>
            </div>
          </div>
        </div>

        {/* Window Content Container */}
        <div className="flex h-[calc(100%-48px)] bg-white">
          
          {/* Sidebar - Light Finder Style */}
          <div className="hidden md:flex w-48 flex-shrink-0 flex-col bg-[#F5F5F7] border-r border-gray-200">
            {/* Sidebar Header */}
            <div className="px-4 py-2 pt-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              Favorites
            </div>
            
            {/* Sidebar Items */}
            <div className="flex-1 px-2 space-y-0.5">
              <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md bg-blue-500 text-white">
                <span className="text-sm">{icon}</span>
                <span className="text-[13px] font-medium">{title}</span>
              </div>
              <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-gray-600 hover:bg-gray-200/60 transition-colors cursor-pointer">
                <span className="text-sm">🏠</span>
                <span className="text-[13px]">Home</span>
              </div>
              <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-gray-600 hover:bg-gray-200/60 transition-colors cursor-pointer">
                <span className="text-sm">📁</span>
                <span className="text-[13px]">Documents</span>
              </div>
              <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-gray-600 hover:bg-gray-200/60 transition-colors cursor-pointer">
                <span className="text-sm">⬇️</span>
                <span className="text-[13px]">Downloads</span>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Portfolio v2.0</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-white">
            {/* Toolbar */}
            <div className="h-10 flex items-center px-3 gap-2 border-b border-gray-200 bg-gray-50">
              {/* Navigation Arrows */}
              <div className="flex items-center gap-0.5">
                <button className="w-7 h-7 rounded-md hover:bg-gray-200/80 flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-7 h-7 rounded-md hover:bg-gray-200/80 flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-sm min-w-0 ml-2">
                <span className="text-gray-500">Portfolio</span>
                <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-800 font-medium truncate">{title}</span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                {/* Search */}
                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-white rounded-md border border-gray-300">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-xs text-gray-400">Search</span>
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-white rounded-md border border-gray-300 p-0.5">
                  <button className="w-6 h-6 rounded flex items-center justify-center bg-gray-200">
                    <svg className="w-3.5 h-3.5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </button>
                  <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div 
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#c1c1c1 transparent' }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacWindow;
