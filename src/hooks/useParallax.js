import { useState, useEffect, useRef } from 'react';

export const useParallax = (intensity = 0.5, offset = 0) => {
  const [transform, setTransform] = useState('translateY(0px)');
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Calculate if element is in viewport
      const isInViewport = elementTop < windowHeight && elementTop + elementHeight > 0;

      if (isInViewport) {
        // Calculate scroll progress for the element
        const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
        const parallaxValue = (scrollProgress - 0.5) * intensity * 100 + offset;
        setTransform(`translateY(${parallaxValue}px)`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity, offset]);

  return [elementRef, transform];
};

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      const speed = Math.abs(scrollY - lastScrollY);
      
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }
      
      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      setScrollSpeed(speed);
      setLastScrollY(scrollY > 0 ? scrollY : 0);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    const onScroll = () => requestTick();

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return { scrollDirection, scrollSpeed };
};

export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [visibilityRatio, setVisibilityRatio] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        setVisibilityRatio(ratio);
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-50px',
        ...options
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isVisible, hasBeenVisible, visibilityRatio];
};

export const useAdvancedParallax = (intensity = 0.3, options = {}) => {
  const [scrollY, setScrollY] = useState(0);
  const [elementRef, isVisible, hasBeenVisible, visibilityRatio] = useIntersectionObserver();
  const { scrollDirection, scrollSpeed } = useScrollDirection();
  const [isFirstView, setIsFirstView] = useState(true);

  useEffect(() => {
    if (hasBeenVisible && isFirstView) {
      setIsFirstView(false);
    }
  }, [hasBeenVisible, isFirstView]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getParallaxStyle = (multiplier = 1, reverseOnUp = false) => {
    if (!isVisible && !hasBeenVisible) {
      return {
        transform: 'translateY(0px)',
        opacity: 0,
        transition: 'all 0.6s ease-out'
      };
    }

    const baseTransform = scrollY * intensity * multiplier;
    const directionMultiplier = reverseOnUp && scrollDirection === 'up' ? -0.5 : 1;
    const speedFactor = Math.min(scrollSpeed / 20, 2); // Cap speed factor
    
    const finalTransform = baseTransform * directionMultiplier * (1 + speedFactor * 0.1);
    
    return {
      transform: `translateY(${finalTransform}px) scale(${0.95 + visibilityRatio * 0.05})`,
      opacity: isVisible ? Math.max(0.3, visibilityRatio) : hasBeenVisible ? 0.8 : 0,
      transition: scrollDirection === 'up' ? 'all 0.3s ease-out' : 'opacity 0.6s ease-out',
      filter: `blur(${Math.max(0, (1 - visibilityRatio) * 2)}px)`
    };
  };

  const getEntranceStyle = (delay = 0, fromDirection = 'bottom') => {
    const directions = {
      bottom: { transform: 'translateY(60px)', opacity: 0 },
      top: { transform: 'translateY(-60px)', opacity: 0 },
      left: { transform: 'translateX(-60px)', opacity: 0 },
      right: { transform: 'translateX(60px)', opacity: 0 },
      scale: { transform: 'scale(0.8)', opacity: 0 }
    };

    if (!hasBeenVisible) {
      return {
        ...directions[fromDirection],
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`
      };
    }

    const exitDirection = scrollDirection === 'up' ? 'top' : 'bottom';
    
    return {
      transform: isVisible ? 'translateY(0px) translateX(0px) scale(1)' : 
                 scrollDirection === 'up' ? directions[exitDirection].transform : directions[fromDirection].transform,
      opacity: isVisible ? 1 : 0.3,
      transition: scrollDirection === 'up' ? 
                 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 
                 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };
  };

  return [elementRef, isVisible, hasBeenVisible, getParallaxStyle, getEntranceStyle, scrollDirection, visibilityRatio];
};
