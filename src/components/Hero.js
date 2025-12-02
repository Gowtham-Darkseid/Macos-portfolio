import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const mobileTexts = ['Web Designer', 'Developer', 'Freelancer'];

  useEffect(() => {
    setIsLoaded(true);
    
    // Text rotation for mobile
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % mobileTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [mobileTexts.length]);

  return (
    <section id="home" className="relative min-h-screen bg-white overflow-hidden pt-13">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 relative z-10">
        {/* Mobile View - Optimized Text-Focused Design */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] md:hidden px-6">
          {/* Simplified Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className={`absolute top-20 left-10 w-4 h-4 bg-black rounded-full transition-opacity duration-1000 ${isLoaded ? 'opacity-30' : 'opacity-0'}`}
            ></div>
            <div 
              className={`absolute top-32 right-16 w-3 h-3 bg-gray-400 rounded-full transition-opacity duration-1000 delay-100 ${isLoaded ? 'opacity-20' : 'opacity-0'}`}
            ></div>
            <div 
              className={`absolute bottom-40 left-8 w-5 h-5 bg-gray-600 rounded-full transition-opacity duration-1000 delay-200 ${isLoaded ? 'opacity-25' : 'opacity-0'}`}
            ></div>
          </div>

          {/* Mobile Text Content */}
          <div 
            className={`text-center transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            {/* Greeting */}
            <div className="mb-6">
              <p className="text-2xl mb-2">👋</p>
              <p className="text-base text-gray-600">
                Hi, I'm
              </p>
            </div>

            {/* Name */}
            <h1 className={`text-5xl sm:text-6xl font-black text-black mb-8 leading-tight tracking-tight transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              GOWTHAM
            </h1>

            {/* Animated Role Text */}
            <div className="mb-10 h-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 transition-opacity duration-300">
                {mobileTexts[textIndex]}
              </h2>
            </div>

            {/* Decorative Line */}
            <div className={`flex items-center justify-center mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <div className="h-px w-12 bg-gray-400"></div>
              <div className="h-1.5 w-1.5 bg-black rounded-full mx-3"></div>
              <div className="h-px w-12 bg-gray-400"></div>
            </div>

            {/* CTA Button */}
            <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <a 
                href="#about" 
                className="inline-block px-8 py-3 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors duration-300"
              >
                Discover More
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-2">Scroll</span>
              <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-0.5 h-2 bg-gray-600 rounded-full mt-1.5 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View - Original Design */}
        <div className="hidden md:flex flex-col items-center text-center relative justify-center min-h-[calc(100vh-5rem)]">
          {/* Intro Text */}
          <div className="mb-8 sm:mb-12 lg:mb-16 px-2">
            <p className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-gray-700 flex flex-wrap items-center justify-center gap-1 sm:gap-2 hover:text-black transition-colors duration-500">
              <span className="text-2xl sm:text-3xl md:text-4xl animate-wave cursor-pointer hover:scale-125 transition-transform duration-300">👋</span>, my name is Gowtham and I am a freelance
            </p>
          </div>

          {/* Main Heading with Photo */}
          <div className="relative flex flex-col items-center justify-center w-full">
            {/* Large Text and Image Container */}
            <div className="relative w-full flex justify-center items-center">
              {/* Webdesigner Text */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] font-black text-black leading-none tracking-tight relative z-5 cursor-pointer hover:scale-105 transition-all duration-700 hover:text-gray-800">
                Webdesigner
              </h1>
              
              {/* Profile Image positioned over the text */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-10">
                <img 
                  src="/assets/gowtham.png" 
                  alt="Gowtham" 
                  className="w-[24rem] h-[32rem] sm:w-[28rem] sm:h-[36rem] md:w-[32rem] md:h-[42rem] lg:w-[38rem] lg:h-[50rem] xl:w-[46rem] xl:h-[60rem] 2xl:w-[52rem] 2xl:h-[68rem] object-cover object-center cursor-pointer hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>

            {/* Outlined Text */}
            <div className="relative mt-4 sm:mt-6 lg:mt-8">
              <h2 
                className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] font-black text-transparent leading-none tracking-tight relative z-20 stroke-text cursor-pointer hover:scale-105 transition-all duration-700 hover:tracking-wider"
              >
                Cybersecurity
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
