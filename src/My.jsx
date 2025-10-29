import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


export default function Myportfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);


  const skills = [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'JavaScript', level: 85, icon: '📜' },
    { name: 'CSS', level: 88, icon: '🎨' },
    { name: 'Node.js', level: 75, icon: '🟢' },
    { name: 'Python', level: 80, icon: '🐍' },
    { name: 'TypeScript', level: 82, icon: '📘' }
  ];

  const projects = [
    {
      title: 'Task Management App',
      description: 'Real-time collaborative task manager with drag-and-drop functionality.',
      tech: ['React', 'Firebase', 'CSS'],
      image: '📋',
      link: '/task'
    },

     {
      title: 'Weather Dashboard',
      description: 'Interactive weather application with forecasts and location-based data.',
      tech: ['React', 'API', 'Charts'],
      image: '🌤️',
      link: '/weather'
    },

    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: '🛍️',
      link: '/ecommerce'
    },
    
   
    {
      title: 'Social Media Analytics',
      description: 'Analytics platform for tracking social media metrics and engagement.',
      tech: ['React', 'D3.js', 'Express'],
      image: '📊'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      text: 'Outstanding work! The project was delivered on time and exceeded our expectations.',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      role: 'Product Manager, InnovateCo',
      text: 'Exceptional developer with great communication skills and attention to detail.',
      avatar: '👨‍💼'
    },
    {
      name: 'Emily Davis',
      role: 'CTO, WebSolutions',
      text: 'Highly skilled and professional. Would definitely work together again!',
      avatar: '👩‍💻'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

 const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch("https://formspree.io/f/mqaydnbr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormStatus("✅ Message sent successfully! I’ll get back to you soon.");
      setFormData({ name: "", email: "", message: "" }); // reset form
    } else {
      setFormStatus("❌ Something went wrong. Please try again.");
    }
  } catch (error) {
    setFormStatus("⚠️ Unable to send. Check your internet connection.");
  }
};


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
        }

        .dark-mode {
          background-color: #0f172a;
          color: #f1f5f9;
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        .light-mode {
          background-color: #f8fafc;
          color: #1e293b;
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        /* Navigation */
        nav {
          position: fixed;
          top: 0;
          width: 100%;
          background: ${darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .nav-links button {
          background: none;
          border: none;
          color: inherit;
          font-size: 1rem;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-transform: capitalize;
        }

        .nav-links button:hover,
        .nav-links button.active {
          background: ${darkMode ? '#1e293b' : '#e2e8f0'};
          color: #667eea;
        }

        .theme-toggle {
          background: none;
          border: 2px solid ${darkMode ? '#475569' : '#cbd5e1'};
          color: inherit;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          transform: scale(1.1);
          border-color: #667eea;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: inherit;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
          background: ${darkMode ? '#1e293b' : '#ffffff'};
          padding: 1rem;
          border-top: 1px solid ${darkMode ? '#334155' : '#e2e8f0'};
        }

        .mobile-menu.open {
          display: block;
        }

        .mobile-menu button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 1rem;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-transform: capitalize;
        }

        .mobile-menu button:hover {
          background: ${darkMode ? '#334155' : '#f1f5f9'};
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 6rem 2rem 2rem;
        }

        .hero-content {
          max-width: 800px;
        }

        .hero-icon {
          font-size: 4rem;
          margin-bottom: 2rem;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .hero h1 {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero p {
          font-size: 1.5rem;
          color: ${darkMode ? '#94a3b8' : '#64748b'};
          margin-bottom: 2rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .social-links a {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }

        .cta-button {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }

        .scroll-indicator {
          margin-top: 3rem;
          font-size: 2rem;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        /* Sections */
        section {
          padding: 5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .section-icon {
          font-size: 2.5rem;
        }

        /* About Section */
        .about-card {
          background: ${darkMode ? '#1e293b' : '#ffffff'};
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid ${darkMode ? '#334155' : '#e2e8f0'};
        }

        .about-card p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          margin-bottom: 1.5rem;
        }

        /* Skills Section */
        .skills-alternate {
          background: ${darkMode ? '#1e293b' : '#f1f5f9'};
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skill-card {
          background: ${darkMode ? '#0f172a' : '#ffffff'};
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid ${darkMode ? '#334155' : '#e2e8f0'};
          transition: all 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .skill-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .skill-icon {
          font-size: 1.5rem;
        }

        .skill-level {
          color: ${darkMode ? '#94a3b8' : '#64748b'};
          font-weight: 500;
        }

        .progress-bar {
          width: 100%;
          height: 10px;
          background: ${darkMode ? '#334155' : '#e2e8f0'};
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          transition: width 1s ease;
        }

        /* Projects Section */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: ${darkMode ? '#1e293b' : '#ffffff'};
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid ${darkMode ? '#334155' : '#e2e8f0'};
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);
        }

        .project-image {
          font-size: 4rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .project-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .project-card p {
          color: ${darkMode ? '#cbd5e1' : '#64748b'};
          margin-bottom: 1rem;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tech-tag {
          padding: 0.25rem 0.75rem;
          background: ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.1)'};
          color: #667eea;
          border-radius: 20px;
          font-size: 0.875rem;
        }

        .project-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .project-link:hover {
          text-decoration: underline;
        }

        /* Testimonials Section */
        .testimonials-alternate {
          background: ${darkMode ? '#1e293b' : '#f1f5f9'};
        }

        .testimonial-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .testimonial-card {
          background: ${darkMode ? '#0f172a' : '#ffffff'};
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          border: 1px solid ${darkMode ? '#334155' : '#e2e8f0'};
        }

        .testimonial-avatar {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .testimonial-text {
          font-size: 1.2rem;
          font-style: italic;
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .testimonial-author {
          font-weight: 600;
          font-size: 1.1rem;
        }

        .testimonial-role {
          color: ${darkMode ? '#94a3b8' : '#64748b'};
          font-size: 0.9rem;
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${darkMode ? '#475569' : '#cbd5e1'};
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          width: 30px;
          border-radius: 6px;
        }

        /* Contact Section */
        .contact-card {
          max-width: 600px;
          margin: 0 auto;
          background: ${darkMode ? '#1e293b' : '#ffffff'};
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid ${darkMode ? '#334155' : '#e2e8f0'};
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid ${darkMode ? '#475569' : '#cbd5e1'};
          border-radius: 8px;
          background: ${darkMode ? '#0f172a' : '#f8fafc'};
          color: inherit;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 150px;
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }

        .form-status {
          text-align: center;
          margin-top: 1rem;
          color: #10b981;
          font-weight: 600;
        }

        /* Footer */
        footer {
          background: ${darkMode ? '#1e293b' : '#ffffff'};
          padding: 2rem;
          text-align: center;
          border-top: 1px solid ${darkMode ? '#334155' : '#e2e8f0'};
        }

        footer p {
          color: ${darkMode ? '#94a3b8' : '#64748b'};
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .hero p {
            font-size: 1.2rem;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .skills-grid,
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
          
        /* 📱 Contact section responsiveness */
@media (max-width: 768px) {
  .contact-card {
    padding: 1.5rem;
    width: 90%;
  }

  .form-group label {
    font-size: 0.95rem;
  }

  .form-group input,
  .form-group textarea {
    font-size: 0.95rem;
    padding: 0.65rem;
  }

  .submit-button {
    padding: 0.9rem;
    font-size: 1rem;
  }

  section {
    padding: 3rem 1rem;
  }
}

/* Ensure proper width and alignment */
.contact-card {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.contact-card input,
.contact-card textarea {
  width: 100%;
  box-sizing: border-box;
}

.form-status {
  margin-top: 1rem;
  font-weight: 500;
  text-align: center;
}

.form-status:has(> .success) {
  color: green;
}

.form-status:has(> .error) {
  color: red;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.social-links a {
  color: #333;
  transition: color 0.3s ease, transform 0.2s ease;
}

.social-links a:hover {
  transform: translateY(-3px);
}

/* 🎯 Specific hover colors for each icon */
.social-links a.github:hover {
  color: #000;
}

.social-links a.linkedin:hover {
  color: #0077b5;
}

.social-links a.email:hover {
  color: white;
}

.social-links a.twitter:hover {
  color: #1da1f2;
}

      `}</style>

      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <div className="logo">Portfolio</div>

          <ul className="nav-links">
            {['home', 'about', 'skills', 'projects', 'testimonials', 'contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className={activeSection === item ? 'active' : ''}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </button>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          {['home', 'about', 'skills', 'projects', 'testimonials', 'contact'].map((item) => (
            <button key={item} onClick={() => scrollToSection(item)}>
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-icon">💻</div>
          <h1>Tommy Dev</h1>
          <p>Software Engineer | Full Stack Developer | UI/UX Enthusiast | Problem Solver</p>

          <div className="social-links">
            <a href="https://github.com/Tomiwahimself1" target='_blank' title="GitHub" className="github"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
      3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
      0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 
      1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 
      1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.334-5.466-5.932 
      0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 
      0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405 
      11.52 11.52 0 0 1 3 .405c2.29-1.552 3.297-1.23 
      3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 
      1.233 1.91 1.233 3.22 0 4.61-2.803 5.63-5.475 
      5.922.43.372.823 1.102.823 2.222 
      0 1.606-.014 2.898-.014 3.293 
      0 .319.218.694.825.576C20.565 22.092 24 17.592 
      24 12.297c0-6.627-5.373-12-12-12"/>
    </svg></a>

    <a href="https://x.com/Adedinsewo_" target='_blank' title="Twitter" className="twitter"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 
      4.932 0 0 0 2.165-2.724 9.864 
      9.864 0 0 1-3.127 1.195 4.916 
      4.916 0 0 0-8.384 4.482A13.945 
      13.945 0 0 1 1.671 3.149 4.916 
      4.916 0 0 0 3.195 9.723a4.903 
      4.903 0 0 1-2.229-.616v.061a4.918 
      4.918 0 0 0 3.946 4.827 4.996 
      4.996 0 0 1-2.224.084 4.928 
      4.928 0 0 0 4.6 3.417A9.867 
      9.867 0 0 1 0 19.54a13.945 
      13.945 0 0 0 7.548 2.212c9.057 
      0 14.01-7.496 14.01-13.986 
      0-.213-.005-.425-.014-.636A9.936 
      9.936 0 0 0 24 4.557z"/>
    </svg></a>

            <a href="#" title="LinkedIn" className="linkedin"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.024-3.037-1.849-3.037-1.851 
      0-2.135 1.445-2.135 2.939v5.667H9.356V9h3.414v1.561h.049c.477-.9 
      1.637-1.849 3.37-1.849 3.601 0 4.267 2.37 4.267 
      5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.069 
      0-1.144.925-2.069 2.069-2.069s2.069.925 
      2.069 2.069c0 1.143-.925 2.069-2.069 2.069zm1.777 
      13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 
      0 0 .771 0 1.723v20.554C0 23.229.792 24 1.771 
      24h20.451C23.2 24 24 23.229 24 22.277V1.723C24 
      .771 23.2 0 22.222 0h.003z"/>
    </svg></a>

            <a href="#" title="Email" className="email"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12.713l11.985-7.713v13.997H0V5l12 7.713zM12 
      10L0 3h24l-12 7z"/>
    </svg></a>

            
          </div>

          <button className="cta-button" onClick={() => scrollToSection('contact')}>
            Get In Touch
          </button>

          <div className="scroll-indicator">⬇️</div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="section-header">
          <h2>
            <span className="section-icon">👨‍💻</span>
            About Me
          </h2>
        </div>
        <div className="about-card">
          <p>
            I'm a passionate full-stack developer with over 5 years of experience building modern web applications.
            I specialize in creating responsive, user-friendly interfaces and scalable backend systems that solve real-world problems.
          </p>
          <p>
            My journey in tech started with curiosity and has evolved into a career I truly love. I'm constantly learning
            new technologies and best practices to deliver exceptional results for every project I work on.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
            or sharing my knowledge through technical writing and mentoring aspiring developers.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-alternate">
        <div className="section-header">
          <h2>
            <span className="section-icon">🛠️</span>
            Skills & Expertise
          </h2>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-header">
                <div className="skill-name">
                  <span className="skill-icon">{skill.icon}</span>
                  {skill.name}
                </div>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="section-header">
          <h2>
            <span className="section-icon">🚀</span>
            Featured Projects
          </h2>
        </div>
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={idx} className="project-card">
              <div className="project-image">{project.image}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <Link to={project.link || "#"} className="project-link">
  View Project →
</Link>

            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-alternate">
        <div className="section-header">
          <h2>
            <span className="section-icon">💬</span>
            What Clients Say
          </h2>
        </div>
        <div className="testimonial-container">
          <div className="testimonial-card">
            <div className="testimonial-avatar">{testimonials[currentTestimonial].avatar}</div>
            <p className="testimonial-text">"{testimonials[currentTestimonial].text}"</p>
            <p className="testimonial-author">{testimonials[currentTestimonial].name}</p>
            <p className="testimonial-role">{testimonials[currentTestimonial].role}</p>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, idx) => (
              <div
                key={idx}
                className={`dot ${idx === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(idx)}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
<section id="contact">
  <div className="section-header">
    <h2>
      <span className="section-icon">📧</span>
      Get In Touch
    </h2>
  </div>

  <div className="contact-card">
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your name"
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your.email@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Write your message here..."
          required
        ></textarea>
      </div>

      <button className="submit-button" type="submit">
        Send Message
      </button>
    </form>

    {formStatus && <p className="form-status">{formStatus}</p>}
  </div>
</section>


      {/* Footer */}
      <footer>
        <p>© 2025 Tom Dev ❤️</p>
      </footer>
    </div>
  );
}