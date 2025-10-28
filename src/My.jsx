import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // ← added

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
      image: '🛍️'
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
        setFormData({ name: "", email: "", message: "" });
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
        /* Your existing CSS is unchanged */
        /* ... (omitted for brevity) ... */
        .education-card {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 2rem;
          margin-top: 3rem;
        }
        .education-card img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
        }
        @media (max-width: 768px) {
          .education-card {
            flex-direction: column;
            text-align: center;
          }
          .education-card img {
            width: 100%;
            max-width: 400px;
          }
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
            {/* social icons */}
            <a href="https://github.com/Tomiwahimself1" target='_blank' rel="noreferrer" title="GitHub" className="github">
              {/* GitHub SVG */}
            </a>
            <a href="https://x.com/Adedinsewo_" target='_blank' rel="noreferrer" title="Twitter" className="twitter">
              {/* Twitter SVG */}
            </a>
            <a href="#" title="LinkedIn" className="linkedin">
              {/* LinkedIn SVG */}
            </a>
            <a href="#" title="Email" className="email">
              {/* Email SVG */}
            </a>
          </div>

          <button className="cta-button" onClick={() => scrollToSection('contact')}>
            Get In Touch
          </button>

          <div className="scroll-indicator">⬇️</div>
        </div>
      </section>

      {/* About Section with Education Subsection */}
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

          {/* Education Card */}
          <motion.div
            className="education-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Federal_University_of_Technology_Akure_gate.jpg/640px-Federal_University_of_Technology_Akure_gate.jpg"
              alt="FUTA Akure campus"
            />
            <div style={{ flex: 1, minWidth: "250px" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🎓 Education</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
                <strong>Federal University of Technology, Akure (FUTA)</strong><br />
                B.Sc. Computer Science (Information Technology)
              </p>
              <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
                Built a strong foundation in Information Technology and Software Development, which fuels my work and passion today.
              </p>
            </div>
          </motion.div>
          {/* End Education Card */}

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
