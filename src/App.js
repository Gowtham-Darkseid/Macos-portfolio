import React, { useState } from 'react';
import PageLoader from './components/PageLoader';
import MacOSMenuBar from './components/MacOSMenuBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
    // Delay showing content to allow Hero animations to trigger
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <div className="App">
      {isLoading && <PageLoader onLoadComplete={handleLoadComplete} />}
      {showContent && (
        <>
          <MacOSMenuBar appName="GOWTHAM" />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
          <Footer />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}

export default App;
