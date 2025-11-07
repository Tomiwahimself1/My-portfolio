import React, { useState, useEffect } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  const bgGradient = darkMode 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
  
  const textColor = darkMode ? '#f1f5f9' : '#1e293b';

  return (
    <div style={{ 
      background: bgGradient,
      color: textColor,
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          overflow-x: hidden;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slide-in { animation: slideIn 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.6s ease-out forwards; }

        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: ${darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
          backdrop-filter: blur(20px);
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }

        .navbar.scrolled {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          background: ${darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .logo:hover { transform: scale(1.05); }
        .logo-icon { font-size: 2rem; }

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
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-links button::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .nav-links button:hover::after,
        .nav-links button.active::after {
          width: 80%;
        }

        .nav-links button:hover,
        .nav-links button.active {
          color: #667eea;
          background: ${darkMode ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
        }

        .theme-toggle {
          background: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 0.75rem;
          border-radius: 50%;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle:hover {
          transform: rotate(180deg) scale(1.1);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
          flex-direction: column;
          background: ${darkMode ? '#1e293b' : '#ffffff'};
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .mobile-menu.open { display: flex; }

        .mobile-menu button {
          padding: 1rem 2rem;
          background: none;
          border: none;
          color: inherit;
          text-align: left;
          border-bottom: 1px solid ${darkMode ? '#334155' : '#e2e8f0'};
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .mobile-menu button:hover,
        .mobile-menu button.active {
          background: ${darkMode ? '#334155' : '#f1f5f9'};
          color: #667eea;
        }

        .page {
          min-height: 100vh;
          padding-top: 80px;
        }

        .page-header {
          text-align: center;
          padding: 4rem 2rem 3rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .page-header h1 {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-header p {
          font-size: 1.2rem;
          color: ${darkMode ? '#94a3b8' : '#64748b'};
        }

        .hero-section {
          min-height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          position: relative;
        }

        .hero-content { max-width: 900px; }

        .hero-icon {
          font-size: 5rem;
          margin-bottom: 2rem;
          animation: float 3s ease-in-out infinite;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 2rem;
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          margin-bottom: 2rem;
          min-height: 60px;
        }

        .rotating-word {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
          animation: slideIn 0.5s ease-out;
        }

        .hero-description {
          font-size: 1.2rem;
          color: ${darkMode ? '#94a3b8' : '#64748b'};
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .btn {
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid #667eea;
          color: #667eea;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }

        .social-icons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .social-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          border-radius: 50%;
          text-decoration: none;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-5px) scale(1.1);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          text-align: center;
          color: ${darkMode ? '#94a3b8' : '#64748b'};
        }

        .scroll-arrow {
          font-size: 2rem;
          animation: bounce 2s ease-in-out infinite;
        }

        .home-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .stat-card {
          background: ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: bold;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 1rem;
          color: ${darkMode ? '#94a3b8' : '#64748b'};
          margin-top: 0.5rem;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .about-image {
          display: flex;
          justify-content: center;
          align-items: start;
        }

        .profile-pic {
          font-size: 15rem;
          background: ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 30px;
          border: 2px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          transition: all 0.3s ease;
        }

        .profile-pic:hover { transform: scale(1.05); }

        .about-text h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #667eea;
        }

        .about-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          margin-bottom: 1.5rem;
        }

        .experience-timeline { margin-top: 3rem; }

        .timeline-item {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          position: relative;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: 10px;
          top: 30px;
          bottom: -30px;
          width: 2px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
        }

        .timeline-item:last-child::before { display: none; }

        .timeline-dot {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 5px;
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }

        .timeline-content h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .timeline-content p {
          color: ${darkMode ? '#94a3b8' : '#64748b'};
          font-size: 1rem;
        }

        .skills-category {
          max-width: 1200px;
          margin: 0 auto 4rem;
          padding: 0 2rem;
        }

        .category-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          color: #667eea;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .skill-card {
          background: ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          transition: all 0.3s ease;
          text-align: center;
        }

        .skill-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }

        .skill-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .skill-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .skill-bar {
          width: 100%;
          height: 12px;
          background: ${darkMode ? '#1e293b' : '#e2e8f0'};
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .skill-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          transition: width 1s ease;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.5rem;
        }

        .skill-percent {
          font-size: 0.75rem;
          color: white;
          font-weight: 600;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .project-card {
          background: ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
          backdrop-filter: blur(10px);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 25px 50px rgba(102, 126, 234, 0.3);
        }

        .project-image {
          font-size: 6rem;
          text-align: center;
          padding: 3rem;
          background: ${darkMode ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)'};
        }

        .project-content { padding: 2rem; }

        .project-content h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .project-content p {
          color: ${darkMode ? '#cbd5e1' : '#64748b'};
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tech-tag {
          padding: 0.4rem 1rem;
          background: ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.1)'};
          color: #667eea;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .project-link {
          color: #667eea;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 1rem;
        }

        .project-link:hover { gap: 1rem; }

        .testimonials-container {
          max-width: 900px;
          margin: 0 auto 4rem;
          padding: 2rem;
        }

        .testimonial-card {
          background: ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
          backdrop-filter: blur(10px);
          padding: 4rem;
          border-radius: 30px;
          text-align: center;
          border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .testimonial-avatar {
          font-size: 5rem;
          margin-bottom: 1rem;
        }

        .rating {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .testimonial-text {
          font-size: 1.3rem;
          font-style: italic;
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          margin-bottom: 2rem;
          line-height: 1.8;
        }

        .testimonial-name {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .testimonial-role {
          color: ${darkMode ? '#94a3b8' : '#64748b'};
          font-size: 1rem;
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${darkMode ? '#475569' : '#cbd5e1'};
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot:hover { transform: scale(1.2); }

        .dot.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          width: 40px;
          border-radius: 6px;
        }

        .all-testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .testimonial-mini {
          background: ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          transition: all 0.3s ease;
        }

        .testimonial-mini:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.2);
        }

        .testimonial-mini-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .testimonial-mini-header .avatar { font-size: 2.5rem; }

        .testimonial-mini-header h4 {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }

        .testimonial-mini-header p {
          font-size: 0.9rem;
          color: ${darkMode ? '#94a3b8' : '#64748b'};
        }

        .testimonial-mini-text {
          font-style: italic;
          color: ${darkMode ? '#cbd5e1' : '#64748b'};
          line-height: 1.6;
        }

        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-card {
          background: ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.2);
        }

        .contact-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .contact-card h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #667eea;
        }

        .contact-card p {
          color: ${darkMode ? '#cbd5e1' : '#64748b'};
        }

        .contact-form {
          background: ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
          backdrop-filter: blur(10px);
          padding: 3rem;
          border-radius: 30px;
          border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }

        .form-group { margin-bottom: 1.5rem; }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-radius: 12px;
          background: ${darkMode ? 'rgba(15, 23, 42, 0.5)' : 'rgba(248, 250, 252, 0.5)'};
          color: inherit;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea { resize: vertical; }
        .submit-btn { width: 100%; }

        .form-status {
          text-align: center;
          margin-top: 1rem;
          font-weight: 600;
          padding: 1rem;
          border-radius: 12px;
          background: rgba(16, 185, 129, 0.1);
        }

        .footer {
          background: ${darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
          backdrop-filter: blur(10px);
          border-top: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          margin-top: 4rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .footer-section h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-section h4 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: #667eea;
        }

        .footer-section p {
          color: ${darkMode ? '#94a3b8' : '#64748b'};
          line-height: 1.6;
        }

        .footer-section button {
          display: block;
          background: none;
          border: none;
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          text-align: left;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.25rem 0;
        }

        .footer-section button:hover {
          color: #667eea;
          transform: translateX(5px);
        }

        .footer-links a {
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          margin-right: 1rem;
        }

        .footer-links a:hover {
          color: #667eea;
          transform: translateY(-2px);
        }

        .footer-bottom {
          text-align: center;
          padding: 1.5rem;
          border-top: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }

        .footer-bottom p {
          color: ${darkMode ? '#94a3b8' : '#64748b'};
        }

        @media (max-width: 968px) {
          .nav-links { display: none; }
          .mobile-menu-btn { display: block; }
          .hero-title { font-size: 2.5rem; }
          .hero-subtitle { font-size: 1.5rem; }
          .page-header h1 { font-size: 2rem; }
          .about-content { grid-template-columns: 1fr; gap: 2rem; }
          .profile-pic { font-size: 8rem; }
          .contact-container { grid-template-columns: 1fr; }
          .projects-grid, .skills-grid, .all-testimonials { grid-template-columns: 1fr; }
          .hero-buttons { flex-direction: column; }
          .btn { width: 100%; }
        }
      `}</style>

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => navigateToPage('home')}>
            <span className="logo-icon">💻</span>
            <span>Tommy Dev</span>
          </div>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => navigateToPage(item.id)}
                  className={currentPage === item.id ? 'active' : ''}
                >
                  {item.label}
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
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateToPage(item.id)}
              className={currentPage === item.id ? 'active' : ''}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {currentPage === 'home' && <HomePage navigateToPage={navigateToPage} />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'skills' && <SkillsPage />}
      {currentPage === 'projects' && <ProjectsPage />}
      {currentPage === 'testimonials' && <TestimonialsPage />}
      {currentPage === 'contact' && <ContactPage />}

      <Footer navigateToPage={navigateToPage} />
    </div>
  );
}

function HomePage({ navigateToPage }) {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Developer', 'Designer', 'Creator', 'Innovator'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page home-page">
      <div className="hero-section">
        <div className="hero-content animate-fade-in">
          <div className="hero-icon">💻</div>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Tommy Dev</span>
          </h1>
          <div className="hero-subtitle">
            <span>Software </span>
            <span className="rotating-word">{words[currentWord]}</span>
          </div>
          <p className="hero-description">
            Crafting beautiful, functional web experiences that make a difference
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigateToPage('projects')}>
              View My Work
            </button>
            <button className="btn btn-secondary" onClick={() => navigateToPage('contact')}>
              Let's Talk
            </button>
          </div>

          <div className="social-icons">
            <a href="https://github.com/Tomiwahimself1" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>🔗</span>
            </a>
            <a href="https://x.com/Adedinsewo_" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>🐦</span>
            </a>
            <a href="#" className="social-icon">
              <span>💼</span>
            </a>
            <a href="mailto:contact@tommydev.com" className="social-icon">
              <span>📧</span>
            </a>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>

      <div className="home-stats">
        <div className="stat-card">
          <div className="stat-number">5+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <div className="stat-label">Projects Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">30+</div>
          <div className="stat-label">Happy Clients</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">15+</div>
          <div className="stat-label">Awards Won</div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page about-page">
      <div className="page-header animate-slide-in">
        <h1>About Me</h1>
        <p>Get to know the person behind the code</p>
      </div>

      <div className="about-content">
        <div className="about-image animate-fade-in">
          <div className="profile-pic">👨‍💻</div>
        </div>

        <div className="about-text animate-slide-in-right">
          <h2>Hello! I'm Tommy</h2>
          <p>
            I'm a passionate full-stack developer with over 5 years of experience building modern web applications.
            My journey in tech started with curiosity and has evolved into a career I truly love.
          </p>
          <p>
            I specialize in creating responsive, user-friendly interfaces and scalable backend systems that solve 
            real-world problems. I believe in writing clean, maintainable code and staying up-to-date with the 
            latest technologies and best practices.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
            or sharing my knowledge through technical writing and mentoring aspiring developers.
          </p>

          <div className="experience-timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Senior Developer</h3>
                <p>Tech Company | 2022 - Present</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Full Stack Developer</h3>
                <p>Startup Inc | 2020 - 2022</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Junior Developer</h3>
                <p>Web Agency | 2018 - 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsPage() {
  const skills = [
    { name: 'React', level: 90, icon: '⚛️', category: 'Frontend' },
    { name: 'JavaScript', level: 85, icon: '📜', category: 'Frontend' },
    { name: 'CSS/SCSS', level: 88, icon: '🎨', category: 'Frontend' },
    { name: 'TypeScript', level: 82, icon: '📘', category: 'Frontend' },
    { name: 'Node.js', level: 75, icon: '🟢', category: 'Backend' },
    { name: 'Python', level: 80, icon: '🐍', category: 'Backend' },
    { name: 'Express', level: 77, icon: '🚂', category: 'Backend' },
    { name: 'MongoDB', level: 78, icon: '🍃', category: 'Database' },
    { name: 'PostgreSQL', level: 76, icon: '🐘', category: 'Database' }
  ];

  const categories = ['Frontend', 'Backend', 'Database'];

  return (
    <div className="page skills-page">
      <div className="page-header animate-slide-in">
        <h1>Skills & Expertise</h1>
        <p>Technologies I work with</p>
      </div>

      {categories.map((category) => (
        <div key={category} className="skills-category">
          <h2 className="category-title">{category}</h2>
          <div className="skills-grid">
            {skills.filter(s => s.category === category).map((skill, idx) => (
              <div key={skill.name} className="skill-card animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: `${skill.level}%` }}>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsPage() {
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
      description: 'Full-stack e-commerce solution with payment integration.',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: '🛍️',
      link: '#'
    },
    {
      title: 'Social Media Analytics',
      description: 'Analytics platform for tracking social media metrics.',
      tech: ['React', 'D3.js', 'Express'],
      image: '📊',
      link: '#'
    },
    {
      title: 'Portfolio Builder',
      description: 'Tool for creating beautiful portfolio websites.',
      tech: ['React', 'CSS', 'Node.js'],
      image: '🎨',
      link: '#'
    },
    {
      title: 'Chat Application',
      description: 'Real-time messaging app with video call features.',
      tech: ['React', 'Socket.io', 'WebRTC'],
      image: '💬',
      link: '#'
    }
  ];

  return (
    <div className="page projects-page">
      <div className="page-header animate-slide-in">
        <h1>Featured Projects</h1>
        <p>Some of my recent work</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="project-image">{project.image}</div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <a href={project.link} className="project-link">View Project →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      text: 'Outstanding work! The project was delivered on time and exceeded our expectations.',
      avatar: '👩‍💼',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Product Manager, InnovateCo',
      text: 'Exceptional developer with great communication skills and attention to detail.',
      avatar: '👨‍💼',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'CTO, WebSolutions',
      text: 'Highly skilled and professional. Would definitely work together again!',
      avatar: '👩‍💻',
      rating: 5
    }
  ];

  return (
    <div className="page testimonials-page">
      <div className="page-header animate-slide-in">
        <h1>Client Testimonials</h1>
        <p>What people say about my work</p>
      </div>

      <div className="testimonials-container">
        <div className="testimonial-card">
          <div className="testimonial-avatar">{testimonials[currentTestimonial].avatar}</div>
          <div className="rating">
            {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          <p className="testimonial-text">{testimonials[currentTestimonial].text}</p>
          <h3 className="testimonial-name">{testimonials[currentTestimonial].name}</h3>
          <p className="testimonial-role">{testimonials[currentTestimonial].role}</p>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(idx)}
            />
          ))}
        </div>
      </div>

      <div className="all-testimonials">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="testimonial-mini animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="testimonial-mini-header">
              <span className="avatar">{testimonial.avatar}</span>
              <div>
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
            <p className="testimonial-mini-text">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/mqaydnbr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("✅ Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      setFormStatus("⚠️ Unable to send. Check your internet connection.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page contact-page">
      <div className="page-header animate-slide-in">
        <h1>Get In Touch</h1>
        <p>Let's work together on your next project</p>
      </div>

      <div className="contact-container">
        <div className="contact-info animate-slide-in">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>contact@tommydev.com</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📱</div>
            <h3>Phone</h3>
            <p>+234 123 456 7890</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>Location</h3>
            <p>Lagos, Nigeria</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">⏰</div>
            <h3>Availability</h3>
            <p>Mon - Fri, 9AM - 6PM</p>
          </div>
        </div>

        <form className="contact-form animate-slide-in-right" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary submit-btn">
            Send Message
          </button>

          {formStatus && <p className="form-status">{formStatus}</p>}
        </form>
      </div>
    </div>
  );
}

function Footer({ navigateToPage }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Tommy Dev</h3>
          <p>Building amazing digital experiences</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <button onClick={() => navigateToPage('home')}>Home</button>
          <button onClick={() => navigateToPage('about')}>About</button>
          <button onClick={() => navigateToPage('projects')}>Projects</button>
          <button onClick={() => navigateToPage('contact')}>Contact</button>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-links">
            <a href="https://github.com/Tomiwahimself1" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://x.com/Adedinsewo_" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Tommy Dev. All rights reserved. Made with ❤️</p>
      </div>
    </footer>
  );
}