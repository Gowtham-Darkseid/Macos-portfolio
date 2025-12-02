import React, { useState, useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Parallax effects for different elements
  const [titleRef, titleTransform] = useParallax(0.1, 0);
  const [infoRef, infoTransform] = useParallax(0.15, 0);
  const [formRef, formTransform] = useParallax(-0.1, 0);
  const [bgRef1, bgTransform1] = useParallax(0.3, 0);
  const [bgRef2, bgTransform2] = useParallax(-0.2, 0);
  const [bgRef3, bgTransform3] = useParallax(0.25, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          ref={bgRef1}
          className="absolute top-16 left-8 w-24 h-24 bg-gray-100 rounded-full opacity-40"
          style={{ transform: bgTransform1 }}
        />
        <div 
          ref={bgRef2}
          className="absolute top-1/3 right-12 w-16 h-16 bg-gray-200 rounded-full opacity-30"
          style={{ transform: bgTransform2 }}
        />
        <div 
          ref={bgRef3}
          className="absolute bottom-20 left-1/3 w-20 h-20 bg-gray-300 rounded-full opacity-35"
          style={{ transform: bgTransform3 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} style={{ transform: titleTransform }}>
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="text-black">Get In Touch</span>
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div 
            className="md:w-1/2"
            ref={infoRef}
            style={{ transform: infoTransform }}
          >
            <h3 className={`text-2xl font-semibold mb-6 text-black transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>Contact Information</h3>
            <p className={`text-gray-700 mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: 'fas fa-envelope', title: 'Email', content: 'graj200026@gmail.com' },
                { icon: 'fas fa-phone-alt', title: 'Phone', content: '+91 6369838278' },
                { icon: 'fas fa-map-marker-alt', title: 'Location', content: 'Sivakasi, TN' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-start transition-all duration-1000 transform hover:scale-105 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="mr-4 mt-1 text-gray-700">
                    <i className={`${item.icon} text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-black">{item.title}</h4>
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`mt-10 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <h4 className="font-medium mb-4 text-black">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { href: 'https://github.com/Gowtham-Darkseid', icon: 'fab fa-github' },
                  { href: 'https://www.linkedin.com/in/gowtham-darkseid/', icon: 'fab fa-linkedin-in' },
                  { href: 'https://twitter.com', icon: 'fab fa-twitter' },
                  { href: 'https://www.instagram.com/for__darkseid/', icon: 'fab fa-instagram' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="social-icon text-2xl text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div 
            className="md:w-1/2"
            ref={formRef}
            style={{ transform: formTransform }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'name', label: 'Your Name', type: 'text' },
                  { name: 'email', label: 'Your Email', type: 'email' }
                ].map((field, index) => (
                  <div 
                    key={index}
                    className={`transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <label htmlFor={field.name} className="block mb-2 font-medium text-black">{field.label}</label>
                    <input 
                      type={field.type} 
                      id={field.name} 
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="form-input w-full px-4 py-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:border-black transition-all duration-300 hover:bg-gray-50 focus:scale-105"
                      required
                    />
                  </div>
                ))}
              </div>
              
              <div className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '400ms' }}>
                <label htmlFor="subject" className="block mb-2 font-medium text-black">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:border-black transition-all duration-300 hover:bg-gray-50 focus:scale-105"
                  required
                />
              </div>
              
              <div className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '500ms' }}>
                <label htmlFor="message" className="block mb-2 font-medium text-black">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:border-black transition-all duration-300 hover:bg-gray-50 focus:scale-105"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`w-full px-6 py-3 bg-black hover:bg-gray-800 rounded-lg font-medium transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg text-white ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
