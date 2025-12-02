import React, { useState, useEffect } from "react";

const TECH_ICONS = [
  { name: "React", icon: "fab fa-react", color: "#61DAFB" },
  { name: "Node.js", icon: "fab fa-node-js", color: "#339933" },
  { name: "Python", icon: "fab fa-python", color: "#3776AB" },
  { name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E" },
  { name: "Git", icon: "fab fa-git-alt", color: "#F05032" },
  { name: "Docker", icon: "fab fa-docker", color: "#2496ED" },
  { name: "AWS", icon: "fab fa-aws", color: "#FF9900" },
  { name: "GitHub", icon: "fab fa-github", color: "#181717" },
  { name: "Linux", icon: "fab fa-linux", color: "#FCC624" },
  { name: "Figma", icon: "fab fa-figma", color: "#F24E1E" },
  { name: "npm", icon: "fab fa-npm", color: "#CB3837" },
  { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572B6" },
  { name: "HTML5", icon: "fab fa-html5", color: "#E34F26" },
  { name: "Database", icon: "fas fa-database", color: "#4479A1" },
];

function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize, startIndex }) {
  return (
    <>
      {/* Semi-circle glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className="w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)] blur-3xl -mt-40 pointer-events-none"
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Orbit icons */}
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        const tech = TECH_ICONS[(startIndex + index) % TECH_ICONS.length];
        const tooltipAbove = angle > 90;

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: 5,
            }}
          >
            {/* Icon Container */}
            <div
              className="flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:scale-125 hover:shadow-lg gap-2"
              style={{
                width: iconSize,
                height: iconSize,
                minWidth: iconSize,
                minHeight: iconSize,
                background: `linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)`,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `0 4px 12px rgba(139, 92, 246, 0.2)`,
              }}
            >
              <i
                className={tech.icon}
                style={{
                  fontSize: iconSize * 0.5,
                  color: tech.color,
                }}
              />
            </div>

            {/* Tooltip */}
            <div
              className={`absolute ${
                tooltipAbove ? "bottom-[calc(100%+12px)]" : "top-[calc(100%+12px)]"
              } hidden group-hover:block w-28 rounded-lg bg-black px-2 py-1 text-xs text-white shadow-lg text-center`}
            >
              {tech.name}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black ${
                  tooltipAbove ? "top-full" : "bottom-full"
                }`}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function MultiOrbitSemiCircle() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const baseWidth = Math.min(size.width * 0.9, 900);
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.5;

  const iconSize =
    size.width < 480
      ? Math.max(32, baseWidth * 0.05)
      : size.width < 768
      ? Math.max(40, baseWidth * 0.06)
      : Math.max(56, baseWidth * 0.08);

  return (
    <div className="relative flex flex-col items-center text-center">
      <div
        className="relative"
        style={{ width: baseWidth, height: baseWidth * 0.6 }}
      >
        <SemiCircleOrbit 
          radius={baseWidth * 0.22} 
          centerX={centerX} 
          centerY={centerY} 
          count={5} 
          iconSize={iconSize}
          startIndex={0}
        />
        <SemiCircleOrbit 
          radius={baseWidth * 0.36} 
          centerX={centerX} 
          centerY={centerY} 
          count={6} 
          iconSize={iconSize}
          startIndex={5}
        />
        <SemiCircleOrbit 
          radius={baseWidth * 0.5} 
          centerX={centerX} 
          centerY={centerY} 
          count={8} 
          iconSize={iconSize}
          startIndex={11}
        />
      </div>
    </div>
  );
}
