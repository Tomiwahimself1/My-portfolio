import React, { useState, useEffect } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  const bgGradient = darkMode 
    ? 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 50%, #0f1419 100%)' 
    : 'linear-gradient(135deg, #f0f4ff 0%, #e8f0ff 50%, #f5f8ff 100%)';
  
  const textColor = darkMode ? '#e8eef7' : '#1a2332';

  return (
    <div style={{ 
      background: bgGradient,
      color: textColor,
      minHeight: '100vh',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: `${mousePosition.y * 0.02}px`,
          left: `${mousePosition.x * 0.02}px`,
          width: '600px',
          height: '600px',
          background: darkMode 
            ? 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          transition: 'all 0.3s ease'
        }} />
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          overflow-x: hidden;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(102, 126, 234, 0.2), 0 0 20px rgba(102, 126, 234, 0.1); }
          50% { box-shadow: 0 0 15px rgba(102, 126, 234, 0.3), 0 0 30px rgba(102, 126, 234, 0.15); }
        }

        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-in { animation: slideIn 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }

        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: ${darkMode ? 'rgba(10, 14, 26, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
        }

        .navbar.scrolled {
          background: ${darkMode ? 'rgba(10, 14, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
          box-shadow: 0 8px 32px ${darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.2rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: -0.5px;
        }

        .logo:hover { transform: scale(1.05); }
        .logo-icon { 
          font-size: 2rem;
          filter: drop-shadow(0 0 4px rgba(102, 126, 234, 0.3));
        }

        .nav-links {
          display: flex;
          gap: 0.5rem;
          list-style: none;
        }

        .nav-links button {
          background: transparent;
          border: none;
          color: inherit;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.7rem 1.3rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .nav-links button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 12px;
        }

        .nav-links button:hover::before,
        .nav-links button.active::before {
          opacity: 1;
        }

        .nav-links button:hover,
        .nav-links button.active {
          color: #667eea;
          transform: translateY(-2px);
        }

        .theme-toggle {
          background: ${darkMode ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.08)'};
          border: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'};
          color: inherit;
          cursor: pointer;
          padding: 0.75rem;
          border-radius: 12px;
          font-size: 1.3rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle:hover {
          transform: scale(1.1) rotate(180deg);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: inherit;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          background: ${darkMode ? 'rgba(10, 14, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
          backdrop-filter: blur(30px);
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
        }

        .mobile-menu.open { display: flex; }

        .mobile-menu button {
          padding: 1.2rem 2rem;
          background: none;
          border: none;
          color: inherit;
          text-align: left;
          border-bottom: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mobile-menu button:hover,
        .mobile-menu button.active {
          background: ${darkMode ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.08)'};
          color: #667eea;
          padding-left: 2.5rem;
        }

        .page {
          min-height: 100vh;
          padding-top: 85px;
          position: relative;
          z-index: 1;
        }

        .page-header {
          text-align: center;
          padding: 5rem 2rem 4rem;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        .page-header h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -2px;
          line-height: 1.1;
        }

        .page-header p {
          font-size: 1.3rem;
          color: ${darkMode ? '#a8b3cf' : '#64748b'};
          font-weight: 400;
        }

        .hero-section {
          min-height: calc(100vh - 85px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          position: relative;
        }

        .hero-content {
          max-width: 950px;
          margin-bottom: 5rem;
          position: relative;
        }

        .hero-icon {
          font-size: 6rem;
          margin-bottom: 2rem;
          animation: float 4s ease-in-out infinite;
          filter: drop-shadow(0 5px 15px rgba(102, 126, 234, 0.2));
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          letter-spacing: -3px;
          line-height: 1.1;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
          background-size: 200% auto;
        }

        .hero-subtitle {
          font-size: 2.2rem;
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          margin-bottom: 2rem;
          min-height: 70px;
          font-weight: 500;
        }

        .rotating-word {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          animation: slideIn 0.6s ease-out;
        }

        .hero-description {
          font-size: 1.3rem;
          color: ${darkMode ? '#a8b3cf' : '#64748b'};
          margin-bottom: 2.5rem;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        .hero-buttons {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .btn {
          padding: 1.1rem 2.8rem;
          border: none;
          border-radius: 14px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.25);
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: ${darkMode ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.08)'};
          border: 2px solid #667eea;
          color: #667eea;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(102, 126, 234, 0.4);
        }

        .social-icons {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .social-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${darkMode ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.08)'};
          border: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'};
          border-radius: 14px;
          text-decoration: none;
          color: inherit;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .social-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-icon:hover::before {
          opacity: 1;
        }

        .social-icon svg {
          width: 24px;
          height: 24px;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-6px) scale(1.1);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.25);
          border-color: transparent;
        }

        .social-icon:hover svg {
          filter: brightness(0) invert(1);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: ${darkMode ? '#a8b3cf' : '#64748b'};
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          animation: pulse 2s ease-in-out infinite;
        }

        .scroll-arrow {
          font-size: 2rem;
          animation: float 2s ease-in-out infinite;
        }

        .home-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
          max-width: 1300px;
          margin: 0 auto;
          padding: 5rem 2rem;
        }

        .stat-card {
          background: ${darkMode ? 'rgba(20, 25, 45, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
          backdrop-filter: blur(20px);
          padding: 2.5rem;
          border-radius: 24px;
          text-align: center;
          border: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          border-radius: 24px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s ease;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 24px 48px rgba(102, 126, 234, 0.3);
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1.05rem;
          color: ${darkMode ? '#a8b3cf' : '#64748b'};
          font-weight: 500;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 5rem;
          max-width: 1300px;
          margin: 0 auto;
          padding: 2rem;
        }

        .about-image {
          display: flex;
          justify-content: center;
          align-items: start;
        }

        .profile-pic {
          font-size: 16rem;
          background: ${darkMode ? 'rgba(20, 25, 45, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
          backdrop-filter: blur(20px);
          padding: 3rem;
          border-radius: 32px;
          border: 2px solid ${darkMode ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'};
          transition: all 0.4s ease;
          position: relative;
        }

        .profile-pic::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          border-radius: 32px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s ease;
        }

        .profile-pic:hover::before {
          opacity: 1;
          animation: glow 2s ease-in-out infinite;
        }

        .profile-pic:hover { 
          transform: scale(1.05);
        }

        .about-text h2 {
          font-size: 3rem;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
        }

        .about-text p {
          font-size: 1.15rem;
          line-height: 1.9;
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          margin-bottom: 1.8rem;
        }

        .experience-timeline { margin-top: 3.5rem; }

        .timeline-item {
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
          position: relative;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: 12px;
          top: 35px;
          bottom: -35px;
          width: 2px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
        }

        .timeline-item:last-child::before { display: none; }

        .timeline-dot {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 6px;
          box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        .timeline-content h3 {
          font-size: 1.4rem;
          margin-bottom: 0.6rem;
          font-weight: 700;
        }

        .timeline-content p {
          color: ${darkMode ? '#a8b3cf' : '#64748b'};
          font-size: 1.05rem;
        }

        .skills-category {
          max-width: 1300px;
          margin: 0 auto 5rem;
          padding: 0 2rem;
        }

        .category-title {
          font-size: 2.5rem;
          margin-bottom: 2.5rem;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .skill-card {
          background: ${darkMode ? 'rgba(20, 25, 45, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
          backdrop-filter: blur(20px);
          padding: 2.5rem;
          border-radius: 24px;
          border: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 24px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s ease;
        }

        .skill-card:hover::before {
          opacity: 1;
        }

        .skill-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 24px 48px rgba(102, 126, 234, 0.3);
        }

        .skill-icon {
          font-size: 4.5rem;
          margin-bottom: 1.2rem;
          filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.2));
        }

        .skill-card h3 {
          font-size: 1.6rem;
          margin-bottom: 1.2rem;
          font-weight: 700;
        }

        .skill-bar {
          width: 100%;
          height: 14px;
          background: ${darkMode ? 'rgba(10, 14, 26, 0.6)' : '#e8eef7'};
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .skill-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          border-radius: 12px;
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.6rem;
          box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
        }

        .skill-percent {
          font-size: 0.8rem;
          color: white;
          font-weight: 700;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2.5rem;
          max-width: 1500px;
          margin: 0 auto;
          padding: 2rem;
        }

        .project-card {
          background: ${darkMode ? 'rgba(20, 25, 45, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          border-radius: 24px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s ease;
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .project-card:hover {
          transform: translateY(-16px);
          box-shadow: 0 28px 56px rgba(102, 126, 234, 0.35);
        }

        .project-image {
          font-size: 7rem;
          text-align: center;
          padding: 3.5rem;
          background: ${darkMode ? 'rgba(102, 126, 234, 0.08)' : 'rgba(102, 126, 234, 0.05)'};
          border-bottom: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
        }

        .project-content { padding: 2.5rem; }

        .project-content h3 {
          font-size: 1.7rem;
          margin-bottom: 1.2rem;
          font-weight: 700;
        }

        .project-content p {
          color: ${darkMode ? '#cbd5e1' : '#64748b'};
          margin-bottom: 1.8rem;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          margin-bottom: 1.8rem;
        }

        .tech-tag {
          padding: 0.5rem 1.2rem;
          background: ${darkMode ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.1)'};
          color: #667eea;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'};
        }

        .project-link {
          color: #667eea;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 1.05rem;
        }

        .project-link:hover { 
          gap: 1.2rem;
          transform: translateX(4px);
        }

        .testimonials-container {
          max-width: 1000px;
          margin: 0 auto 5rem;
          padding: 2rem;
        }

        .testimonial-card {
          background: ${darkMode ? 'rgba(20, 25, 45, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
          backdrop-filter: blur(20px);
          padding: 5rem 3rem;
          border-radius: 32px;
          text-align: center;
          border: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.15);
          position: relative;
        }

        .testimonial-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          border-radius: 32px;
          opacity: 0.3;
          z-index: -1;
        }

        .testimonial-avatar {
          font-size: 6rem;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.2));
        }

        .rating {
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }

        .testimonial-text {
          font-size: 1.4rem;
          font-style: italic;
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          margin-bottom: 2.5rem;
          line-height: 1.9;
          font-weight: 400;
        }

        .testimonial-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .testimonial-role {
          color: ${darkMode ? '#a8b3cf' : '#64748b'};
          font-size: 1.1rem;
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          margin-top: 2.5rem;
        }

        .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${darkMode ? '#475569' : '#cbd5e1'};
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot:hover { transform: scale(1.3); }

        .dot.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          width: 45px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .all-testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2.5rem;
          max-width: 1300px;
          margin: 0 auto;
          padding: 2rem;
        }

        .testimonial-mini {
          background: ${darkMode ? 'rgba(20, 25, 45, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
          backdrop-filter: blur(20px);
          padding: 2.5rem;
          border-radius: 24px;
          border: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
          transition: all 0.4s ease;
        }

        .testimonial-mini:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.25);
        }

        .testimonial-mini-header {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1.2rem;
        }

        .testimonial-mini-header .avatar { 
          font-size: 3rem;
          filter: drop-shadow(0 2px 6px rgba(102, 126, 234, 0.2));
        }

        .testimonial-mini-header h4 {
          font-size: 1.2rem;
          margin-bottom: 0.3rem;
          font-weight: 700;
        }

        .testimonial-mini-header p {
          font-size: 0.95rem;
          color: ${darkMode ? '#a8b3cf' : '#64748b'};
        }

        .testimonial-mini-text {
          font-style: italic;
          color: ${darkMode ? '#cbd5e1' : '#64748b'};
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3.5rem;
          max-width: 1300px;
          margin: 0 auto;
          padding: 2rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .contact-card {
          background: ${darkMode ? 'rgba(20, 25, 45, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
          backdrop-filter: blur(20px);
          padding: 2.5rem;
          border-radius: 24px;
          text-align: center;
          border: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
          transition: all 0.4s ease;
        }

        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.25);
        }

        .contact-icon {
          font-size: 3.5rem;
          margin-bottom: 1.2rem;
          filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.2));
        }

        .contact-card h3 {
          font-size: 1.3rem;
          margin-bottom: 0.7rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        .contact-card p {
          color: ${darkMode ? '#cbd5e1' : '#64748b'};
          font-size: 1.05rem;
        }

        .contact-form {
          background: ${darkMode ? 'rgba(20, 25, 45, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
          backdrop-filter: blur(20px);
          padding: 3.5rem;
          border-radius: 32px;
          border: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
        }

        .form-group { margin-bottom: 1.8rem; }

        .form-group label {
          display: block;
          margin-bottom: 0.7rem;
          font-weight: 600;
          font-size: 1.05rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1.2rem;
          border: 2px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
          border-radius: 14px;
          background: ${darkMode ? 'rgba(10, 14, 26, 0.6)' : 'rgba(248, 250, 252, 0.6)'};
          color: inherit;
          font-size: 1.05rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }

        .form-group textarea { resize: vertical; min-height: 150px; }
        .submit-btn { width: 100%; }

        .form-status {
          text-align: center;
          margin-top: 1.5rem;
          font-weight: 600;
          padding: 1.2rem;
          border-radius: 14px;
          background: rgba(16, 185, 129, 0.15);
          font-size: 1.05rem;
        }

        .footer {
          background: ${darkMode ? 'rgba(10, 14, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
          backdrop-filter: blur(30px);
          border-top: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
          margin-top: 6rem;
        }

        .footer-content {
          max-width: 1300px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 3rem;
        }

        .footer-section h3 {
          font-size: 1.7rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
        }

        .footer-section h4 {
          font-size: 1.2rem;
          margin-bottom: 1.2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        .footer-section p {
          color: ${darkMode ? '#a8b3cf' : '#64748b'};
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .footer-section button {
          display: block;
          background: none;
          border: none;
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          text-align: left;
          margin-bottom: 0.7rem;
          transition: all 0.3s ease;
          cursor: pointer;
          font-size: 1.05rem;
          padding: 0.3rem 0;
        }

        .footer-section button:hover {
          color: #667eea;
          transform: translateX(8px);
        }

        .footer-links a {
          color: ${darkMode ? '#cbd5e1' : '#475569'};
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          margin-right: 1.5rem;
          font-size: 1.05rem;
        }

        .footer-links a:hover {
          color: #667eea;
          transform: translateY(-3px);
        }

        .footer-bottom {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid ${darkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
        }

        .footer-bottom p {
          color: ${darkMode ? '#a8b3cf' : '#64748b'};
          font-size: 1.05rem;
        }

        @media (max-width: 968px) {
          .nav-links { display: none; }
          .mobile-menu-btn { display: block; }
          
          .hero-section { padding: 3rem 1.5rem; }
          .hero-title { font-size: 3rem; line-height: 1.15; }
          .hero-subtitle { font-size: 1.7rem; min-height: 75px; }
          .hero-description { font-size: 1.2rem; padding: 0 1rem; }
          .hero-icon { font-size: 4.5rem; }
          .hero-content { margin-bottom: 4rem; }
          .scroll-indicator { bottom: 2rem; }
          
          .hero-buttons { 
            flex-direction: column;
            width: 100%;
            max-width: 420px;
            margin: 0 auto 2.5rem;
          }
          .btn { 
            width: 100%;
            padding: 1.3rem 2rem;
            font-size: 1.05rem;
          }
          
          .social-icons { gap: 1.5rem; }
          .social-icon { width: 58px; height: 58px; }
          
          .home-stats { 
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            padding: 3rem 1.5rem;
          }
          .stat-card { padding: 2.2rem 1.8rem; }
          .stat-number { font-size: 2.8rem; }
          .stat-label { font-size: 1rem; }
          
          .page-header { padding: 3.5rem 1.5rem 2.5rem; }
          .page-header h1 { font-size: 2.8rem; }
          .page-header p { font-size: 1.2rem; }
          
          .about-content { 
            grid-template-columns: 1fr; 
            gap: 3rem;
            padding: 1.5rem;
          }
          .profile-pic { 
            font-size: 11rem; 
            padding: 3rem;
          }
          .about-text h2 { font-size: 2.5rem; }
          .about-text p { font-size: 1.1rem; }
          
          .timeline-content h3 { font-size: 1.3rem; }
          .timeline-content p { font-size: 1rem; }
          
          .skills-category { padding: 0 1.5rem; margin-bottom: 3.5rem; }
          .category-title { font-size: 2.2rem; }
          .skills-grid { 
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .skill-card { padding: 2.2rem 1.8rem; }
          .skill-icon { font-size: 3.5rem; }
          .skill-card h3 { font-size: 1.4rem; }
          
          .projects-grid { 
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 1.5rem;
          }
          .project-card { border-radius: 24px; }
          .project-image { 
            font-size: 5.5rem; 
            padding: 3rem;
          }
          .project-content { padding: 2.2rem 1.8rem; }
          .project-content h3 { font-size: 1.5rem; }
          .project-content p { font-size: 1.05rem; }
          
          .testimonials-container { padding: 1.5rem; }
          .testimonial-card { 
            padding: 3.5rem 2.5rem; 
            border-radius: 28px;
          }
          .testimonial-avatar { font-size: 4.5rem; }
          .testimonial-text { font-size: 1.25rem; }
          .testimonial-name { font-size: 1.3rem; }
          .all-testimonials { 
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.5rem;
          }
          .testimonial-mini { padding: 2.2rem 1.8rem; }
          
          .contact-container { 
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 1.5rem;
          }
          .contact-info { gap: 1.5rem; }
          .contact-card { padding: 2.5rem 2rem; }
          .contact-icon { font-size: 3.2rem; }
          .contact-form { padding: 3rem 2.5rem; }
          .form-group input,
          .form-group textarea { 
            padding: 1.2rem;
            font-size: 1.05rem;
          }
          
          .footer-content { 
            padding: 3rem 1.5rem;
            gap: 2.5rem;
          }
          .footer-section h3 { font-size: 1.5rem; }
          .footer-section h4 { font-size: 1.1rem; }
        }
        
        @media (max-width: 600px) {
          .home-stats { 
            grid-template-columns: 1fr;
            gap: 1.3rem;
            padding: 2.5rem 1.2rem;
          }
          .stat-card { padding: 2rem 1.5rem; }
          .stat-number { font-size: 2.5rem; }
          
          .skills-category { padding: 0 1.2rem; margin-bottom: 2.5rem; }
          .skills-grid { 
            grid-template-columns: 1fr;
            gap: 1.3rem;
          }
          .skill-card { padding: 2rem 1.5rem; }
        }
        
        @media (max-width: 480px) {
          .hero-title { font-size: 2.5rem; }
          .hero-subtitle { font-size: 1.5rem; }
          .profile-pic { font-size: 9rem; }
          .page-header h1 { font-size: 2.3rem; }
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
              <span>{item.icon}</span>
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
  const [stats, setStats] = useState([
    { target: 5, current: 0, label: 'Years Experience', suffix: '+' },
    { target: 30, current: 0, label: 'Projects Completed', suffix: '+' },
    { target: 25, current: 0, label: 'Happy Clients', suffix: '+' },
    { target: 15, current: 0, label: 'Awards Won', suffix: '+' }
  ]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = React.useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;

            stats.forEach((stat, index) => {
              let currentStep = 0;
              const increment = stat.target / steps;

              const timer = setInterval(() => {
                currentStep++;
                if (currentStep <= steps) {
                  setStats(prevStats => {
                    const newStats = [...prevStats];
                    newStats[index] = {
                      ...newStats[index],
                      current: Math.min(Math.round(increment * currentStep), stat.target)
                    };
                    return newStats;
                  });
                } else {
                  clearInterval(timer);
                }
              }, stepDuration);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

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
            <a href="https://github.com/Tomiwahimself1" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub" style={{ animation: 'slideInFromLeft 0.8s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://x.com/Adedinsewo_" target="_blank" rel="noopener noreferrer" className="social-icon" title="Twitter" style={{ animation: 'slideInFromLeft 0.8s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/Adetomiwa" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn" style={{ animation: 'slideInFromRight 0.8s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:adedinsewoadetomiwa7@gmail.com" className="social-icon" title="Email" style={{ animation: 'slideInFromRight 0.8s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>

      <div className="home-stats" ref={statsRef}>
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-number">{stat.current}{stat.suffix}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
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
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const skillsRef = React.useRef(null);
  
  const skills = [
    { name: 'HTML', level: 98, icon: '🔷', category: 'Frontend' },
    { name: 'CSS/SCSS', level: 88, icon: '🎨', category: 'Frontend' },
    { name: 'JavaScript', level: 85, icon: '📜', category: 'Frontend' },
    { name: 'React', level: 90, icon: '⚛️', category: 'Frontend' },
    { name: 'TypeScript', level: 82, icon: '📘', category: 'Frontend' },
    { name: 'Node.js', level: 75, icon: '🟢', category: 'Backend' },
    { name: 'Python', level: 80, icon: '🐍', category: 'Backend' },
    { name: 'Express', level: 77, icon: '🚂', category: 'Backend' },
    { name: 'MongoDB', level: 78, icon: '🍃', category: 'Database' },
    { name: 'PostgreSQL', level: 76, icon: '🐘', category: 'Database' }
  ];

  const categories = ['Frontend', 'Backend', 'Database'];

  useEffect(() => {
    const initialSkills = skills.map(skill => ({ ...skill, currentLevel: 0 }));
    setAnimatedSkills(initialSkills);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;

            skills.forEach((skill, index) => {
              let currentStep = 0;
              const increment = skill.level / steps;

              const timer = setInterval(() => {
                currentStep++;
                if (currentStep <= steps) {
                  setAnimatedSkills(prevSkills => {
                    const newSkills = [...prevSkills];
                    newSkills[index] = {
                      ...newSkills[index],
                      currentLevel: Math.min(Math.round(increment * currentStep), skill.level)
                    };
                    return newSkills;
                  });
                } else {
                  clearInterval(timer);
                }
              }, stepDuration);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className="page skills-page">
      <div className="page-header animate-slide-in">
        <h1>Skills & Expertise</h1>
        <p>Technologies I work with</p>
      </div>

      <div ref={skillsRef}>
        {categories.map((category) => (
          <div key={category} className="skills-category">
            <h2 className="category-title">{category}</h2>
            <div className="skills-grid">
              {animatedSkills.filter(s => s.category === category).map((skill, idx) => (
                <div key={skill.name} className="skill-card animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.name}</h3>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.currentLevel}%` }}>
                      <span className="skill-percent">{skill.currentLevel}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
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
      name: 'Mike Duch',
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
            <p>adedinsewoadetomiwa7@gmail.com</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📱</div>
            <h3>Phone</h3>
            <p>+234 814 4600 8685</p>
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
              placeholder="Name"
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
              placeholder="Tom@example.com"
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
            <a href="https://linkedin.com/in/Adetomiwa" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Tommy Dev. All rights reserved. Made with ❤️</p>
      </div>
    </footer>
  );
}