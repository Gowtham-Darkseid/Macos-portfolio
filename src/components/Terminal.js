import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ isOpen, onClose }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const windowRef = useRef(null);
  
  const minSize = { width: 400, height: 300 };
  const maxSize = { width: typeof window !== 'undefined' ? window.innerWidth - 100 : 1200, height: typeof window !== 'undefined' ? window.innerHeight - 100 : 800 };

  const username = 'gowtham';
  const hostname = 'macbook';

  // File system simulation
  const fileSystem = {
    '~': {
      type: 'dir',
      children: {
        'about.txt': { type: 'file', content: `
╔══════════════════════════════════════════════════════════════╗
║                      ABOUT ME                                 ║
╠══════════════════════════════════════════════════════════════╣
║  Name: Gowtham                                                ║
║  Role: Full Stack Developer                                   ║
║  Location: India                                              ║
║                                                               ║
║  I'm a passionate developer who loves building                ║
║  beautiful and functional web applications.                   ║
║                                                               ║
║  Skills: React, Node.js, Python, TypeScript, AWS              ║
║  Interests: Open Source, UI/UX, System Design                 ║
╚══════════════════════════════════════════════════════════════╝
` },
        'skills.json': { type: 'file', content: `{
  "frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  "backend": ["Node.js", "Python", "Express", "FastAPI"],
  "database": ["MongoDB", "PostgreSQL", "Redis"],
  "cloud": ["AWS", "Docker", "Kubernetes"],
  "tools": ["Git", "VS Code", "Figma", "Postman"]
}` },
        'contact.md': { type: 'file', content: `# Contact Information

📧 Email: gowtham@example.com
🔗 LinkedIn: linkedin.com/in/gowtham
🐙 GitHub: github.com/Gowtham-Darkseid
🌐 Website: gowtham.dev

Feel free to reach out for collaborations or opportunities!
` },
        'projects': {
          type: 'dir',
          children: {
            'portfolio.txt': { type: 'file', content: 'macOS-style Portfolio Website - React, Tailwind CSS' },
            'chatbot.txt': { type: 'file', content: 'AI Chatbot - Python, OpenAI API, FastAPI' },
            'ecommerce.txt': { type: 'file', content: 'E-commerce Platform - Next.js, Stripe, MongoDB' },
          }
        },
        'resume.pdf': { type: 'file', content: '[Binary file - use "open resume.pdf" to download]' },
      }
    }
  };

  const [currentPath, setCurrentPath] = useState('~');

  const getDirectory = (path) => {
    const parts = path.split('/').filter(Boolean);
    let current = fileSystem['~'];
    
    if (path === '~') return current;
    
    for (const part of parts) {
      if (part === '~') continue;
      if (current.children && current.children[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    return current;
  };

  const commands = {
    help: () => `
Available commands:
  help          - Show this help message
  clear         - Clear the terminal
  ls            - List directory contents
  cd <dir>      - Change directory
  cat <file>    - Display file contents
  pwd           - Print working directory
  whoami        - Display current user
  date          - Display current date and time
  echo <text>   - Print text to terminal
  open <file>   - Open file (downloads resume.pdf)
  neofetch      - Display system information
  history       - Show command history
  github        - Open GitHub profile
  linkedin      - Open LinkedIn profile
  email         - Send an email
  
Press ↑/↓ to navigate command history
`,
    clear: () => {
      setCommandHistory([]);
      return null;
    },
    ls: (args) => {
      const dir = getDirectory(currentPath);
      if (!dir || !dir.children) return 'Not a directory';
      
      const items = Object.entries(dir.children).map(([name, item]) => {
        if (item.type === 'dir') {
          return `\x1b[34m${name}/\x1b[0m`;
        }
        return name;
      });
      return items.join('  ');
    },
    cd: (args) => {
      if (!args[0] || args[0] === '~') {
        setCurrentPath('~');
        return '';
      }
      if (args[0] === '..') {
        const parts = currentPath.split('/');
        if (parts.length > 1) {
          parts.pop();
          setCurrentPath(parts.join('/') || '~');
        }
        return '';
      }
      const newPath = currentPath === '~' ? `~/${args[0]}` : `${currentPath}/${args[0]}`;
      const dir = getDirectory(newPath);
      if (dir && dir.type === 'dir') {
        setCurrentPath(newPath);
        return '';
      }
      return `cd: ${args[0]}: No such directory`;
    },
    cat: (args) => {
      if (!args[0]) return 'cat: missing file operand';
      const dir = getDirectory(currentPath);
      if (dir && dir.children && dir.children[args[0]]) {
        const file = dir.children[args[0]];
        if (file.type === 'file') {
          return file.content;
        }
        return `cat: ${args[0]}: Is a directory`;
      }
      return `cat: ${args[0]}: No such file or directory`;
    },
    pwd: () => currentPath.replace('~', `/Users/${username}`),
    whoami: () => username,
    date: () => new Date().toString(),
    echo: (args) => args.join(' '),
    open: (args) => {
      if (args[0] === 'resume.pdf') {
        window.open('/assets/Gowtham-S.pdf', '_blank');
        return 'Opening resume.pdf...';
      }
      return `open: ${args[0] || 'missing file'}: No such file`;
    },
    neofetch: () => `
\x1b[32m                    'c.          \x1b[0m ${username}@${hostname}
\x1b[32m                 ,xNMM.          \x1b[0m ──────────────────
\x1b[32m               .OMMMMo           \x1b[0m OS: macOS Sonoma 14.0
\x1b[32m               OMMM0,            \x1b[0m Host: MacBook Pro
\x1b[32m     .;loddo:' loolloddol;.      \x1b[0m Kernel: Darwin 23.0.0
\x1b[32m   cKMMMMMMMMMMNWMMMMMMMMMM0:    \x1b[0m Uptime: ${Math.floor(Math.random() * 30)} days
\x1b[33m .KMMMMMMMMMMMMMMMMMMMMMMMWd.    \x1b[0m Shell: zsh 5.9
\x1b[33m XMMMMMMMMMMMMMMMMMMMMMMMX.      \x1b[0m Terminal: Portfolio Terminal
\x1b[31m;MMMMMMMMMMMMMMMMMMMMMMMM:       \x1b[0m CPU: Apple M2 Pro
\x1b[31m:MMMMMMMMMMMMMMMMMMMMMMMM:       \x1b[0m Memory: 16GB
\x1b[31m.MMMMMMMMMMMMMMMMMMMMMMMMX.      \x1b[0m
\x1b[35m kMMMMMMMMMMMMMMMMMMMMMMMMWd.    \x1b[0m Skills: React, Node.js, Python
\x1b[35m .XMMMMMMMMMMMMMMMMMMMMMMMMMMk   \x1b[0m Projects: ${Object.keys(fileSystem['~'].children.projects.children).length}
\x1b[34m  .XMMMMMMMMMMMMMMMMMMMMMMMMK.   \x1b[0m 
\x1b[34m    kMMMMMMMMMMMMMMMMMMMMMMd     \x1b[0m ████████████████████████
\x1b[36m     ;KMMMMMMMWXXWMMMMMMMk.      \x1b[0m
\x1b[36m       .cooc,.    .,coo:.        \x1b[0m
`,
    history: () => commandHistory.map((h, i) => `${i + 1}  ${h.command}`).join('\n'),
    github: () => {
      window.open('https://github.com/Gowtham-Darkseid', '_blank');
      return 'Opening GitHub...';
    },
    linkedin: () => {
      window.open('https://linkedin.com/in/gowtham', '_blank');
      return 'Opening LinkedIn...';
    },
    email: () => {
      window.open('mailto:gowtham@example.com', '_blank');
      return 'Opening email client...';
    },
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
      setPosition({ x: 0, y: 0 });
      setIsMaximized(false);
      // Add welcome message
      if (commandHistory.length === 0) {
        setCommandHistory([
          { command: '', output: `Last login: ${new Date().toLocaleString()} on ttys000` },
          { command: '', output: 'Welcome to Portfolio Terminal! Type "help" for available commands.' },
        ]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandHistory.length]);

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

  const handleCommand = (e) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      const [cmd, ...args] = currentCommand.trim().split(' ');
      const commandFn = commands[cmd.toLowerCase()];
      
      let output;
      if (commandFn) {
        output = commandFn(args);
      } else {
        output = `zsh: command not found: ${cmd}`;
      }

      if (output !== null) {
        setCommandHistory(prev => [...prev, { 
          command: currentCommand, 
          output,
          path: currentPath 
        }]);
      }
      
      setCurrentCommand('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commandsOnly = commandHistory.filter(h => h.command);
      if (historyIndex < commandsOnly.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandsOnly[commandsOnly.length - 1 - newIndex]?.command || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const commandsOnly = commandHistory.filter(h => h.command);
        setCurrentCommand(commandsOnly[commandsOnly.length - 1 - newIndex]?.command || '');
      } else {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for files
      const dir = getDirectory(currentPath);
      if (dir && dir.children) {
        const files = Object.keys(dir.children);
        const parts = currentCommand.split(' ');
        const partial = parts[parts.length - 1];
        const matches = files.filter(f => f.startsWith(partial));
        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          setCurrentCommand(parts.join(' '));
        }
      }
    }
  };

  const renderOutput = (text) => {
    if (!text) return null;
    // Simple ANSI color parsing
    // eslint-disable-next-line no-control-regex
    const ansiRegex = /\u001b\[(\d+)m/g;
    return text.split('\n').map((line, i) => {
      let coloredLine = line
        .replace(ansiRegex, (match, code) => {
          const colorMap = {
            '32': '<span class="text-green-400">',
            '33': '<span class="text-yellow-400">',
            '31': '<span class="text-red-400">',
            '34': '<span class="text-blue-400">',
            '35': '<span class="text-purple-400">',
            '36': '<span class="text-cyan-400">',
            '0': '</span>'
          };
          return colorMap[code] || '';
        });
      return <div key={i} dangerouslySetInnerHTML={{ __html: coloredLine }} />;
    });
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
      {/* Terminal Window */}
      <div
        ref={windowRef}
        className={`relative overflow-hidden transition-all duration-300 ease-out rounded-xl ${
          isMaximized ? '!fixed !inset-0 !rounded-none !translate-x-0 !translate-y-0' : ''
        } ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{
          width: isMaximized ? '100vw' : `${size.width}px`,
          height: isMaximized ? '100vh' : `${size.height}px`,
          transform: !isMaximized ? `translate(${position.x}px, ${position.y}px)` : undefined,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Resize Handles */}
        {!isMaximized && (
          <>
            {/* Edge handles */}
            <div 
              className="absolute top-0 left-2 right-2 h-1 cursor-ns-resize z-20"
              onMouseDown={(e) => handleResizeStart(e, 'n')}
            />
            <div 
              className="absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize z-20"
              onMouseDown={(e) => handleResizeStart(e, 's')}
            />
            <div 
              className="absolute left-0 top-2 bottom-2 w-1 cursor-ew-resize z-20"
              onMouseDown={(e) => handleResizeStart(e, 'w')}
            />
            <div 
              className="absolute right-0 top-2 bottom-2 w-1 cursor-ew-resize z-20"
              onMouseDown={(e) => handleResizeStart(e, 'e')}
            />
            {/* Corner handles */}
            <div 
              className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-20"
              onMouseDown={(e) => handleResizeStart(e, 'nw')}
            />
            <div 
              className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-20"
              onMouseDown={(e) => handleResizeStart(e, 'ne')}
            />
            <div 
              className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-20"
              onMouseDown={(e) => handleResizeStart(e, 'sw')}
            />
            <div 
              className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-20"
              onMouseDown={(e) => handleResizeStart(e, 'se')}
            />
          </>
        )}
        {/* Terminal Header */}
        <div 
          className="h-8 bg-[#1C1C1E] flex items-center px-3 cursor-move border-b border-[#3A3A3C]"
          onMouseDown={handleMouseDown}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
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
          
          {/* Title */}
          <div className="flex-1 text-center">
            <span className="text-[#EBEBF5]/60 text-sm font-medium">
              {username}@{hostname} — zsh — {isMaximized ? '100x50' : `${Math.floor(size.width / 10)}x${Math.floor(size.height / 20)}`}
            </span>
          </div>
          
          <div className="w-14" />
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="h-[calc(100%-2rem)] bg-[#1C1C1E]/95 backdrop-blur-xl overflow-y-auto p-4 font-mono text-sm"
          style={{ 
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          }}
        >
          {/* Command History */}
          {commandHistory.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.command && (
                <div className="flex items-center text-white">
                  <span className="text-[#28C840]">{username}@{hostname}</span>
                  <span className="text-white mx-1">:</span>
                  <span className="text-[#5AC8FA]">{entry.path || '~'}</span>
                  <span className="text-white mx-1">$</span>
                  <span className="ml-2">{entry.command}</span>
                </div>
              )}
              {entry.output && (
                <div className="text-[#EBEBF5]/80 whitespace-pre-wrap mt-1">
                  {renderOutput(entry.output)}
                </div>
              )}
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center text-white">
            <span className="text-[#28C840]">{username}@{hostname}</span>
            <span className="text-white mx-1">:</span>
            <span className="text-[#5AC8FA]">{currentPath}</span>
            <span className="text-white mx-1">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 ml-2 bg-transparent outline-none text-white caret-white"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
