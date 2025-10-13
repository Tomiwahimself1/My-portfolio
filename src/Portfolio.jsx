import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Briefcase, User, MessageSquare, ChevronDown, Moon, Sun } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'Tailwind CSS', level: 88 },
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 80 },
    { name: 'TypeScript', level: 82 }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaborative task manager with drag-and-drop functionality.',
      tech: ['React', 'Firebase', 'Tailwind'],
      link: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather application with forecasts and location-based data.',
      tech: ['React', 'API Integration', 'Charts'],
      link: '#'
    },
    {
      title: 'Social Media Analytics',
      description: 'Analytics platform for tracking social media metrics and engagement.',
      tech: ['React', 'D3.js', 'Express'],
      link: '#'
    }
  ];

  const experiences = [
    {
      role: 'Senior Frontend Developer',
      company: 'Tech Corp',
      period: '2022 - Present',
      description: 'Leading frontend development team, architecting scalable React applications.'
    },
    {
      role: 'Full Stack Developer',
      company: 'StartUp Inc',
      period: '2020 - 2022',
      description: 'Built and maintained multiple client projects using modern web technologies.'
    },
    {
      role: 'Junior Developer',
      company: 'Digital Agency',
      period: '2019 - 2020',
      description: 'Developed responsive websites and collaborated with design teams.'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const secondaryText = darkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${cardBg} shadow-lg z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-blue-500 transition-colors ${
                    activeSection === item ? 'text-blue-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hidden md:block p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${cardBg} border-t ${borderColor}`}>
            <div className="px-4 py-4 space-y-3">
              
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left capitalize hover:text-blue-500 transition-colors"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>Toggle Theme</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse">
            <Code size={48} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Tom Developer
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${secondaryText}`}>
            Full Stack Developer | UI/UX Enthusiast | Problem Solver
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <a href="#" className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
              <Github size={24} className="text-white" />
            </a>
            <a href="#" className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
              <Linkedin size={24} className="text-white" />
            </a>
            <a href="#" className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
              <Mail size={24} className="text-white" />
            </a>
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Get In Touch
          </button>
          <div className="mt-12 animate-bounce">
            <ChevronDown size={32} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <User className="mr-3 text-blue-500" size={32} />
            <h2 className="text-4xl font-bold">About Me</h2>
          </div>
          <div className={`${cardBg} rounded-xl p-8 shadow-xl border ${borderColor}`}>
            <p className={`text-lg mb-6 ${secondaryText} leading-relaxed`}>
              I'm a passionate full-stack developer with over 5 years of experience building modern web applications. 
              I specialize in creating responsive, user-friendly interfaces and scalable backend systems.
            </p>
            <p className={`text-lg ${secondaryText} leading-relaxed`}>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing my knowledge through technical writing and mentoring.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Code className="mr-3 text-blue-500" size={32} />
            <h2 className="text-4xl font-bold">Skills</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className={`${cardBg} rounded-lg p-6 shadow-lg border ${borderColor}`}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{skill.name}</span>
                  <span className={secondaryText}>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Briefcase className="mr-3 text-blue-500" size={32} />
            <h2 className="text-4xl font-bold">Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`${cardBg} rounded-xl p-6 shadow-xl border ${borderColor} hover:shadow-2xl transform hover:-translate-y-2 transition-all`}
              >
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className={`${secondaryText} mb-4`}>{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-500 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                >
                  View Project <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Briefcase className="mr-3 text-blue-500" size={32} />
            <h2 className="text-4xl font-bold">Experience</h2>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`${cardBg} rounded-xl p-6 shadow-xl border-l-4 border-blue-500 ${borderColor}`}
              >
                <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                <p className="text-blue-500 mb-2">{exp.company}</p>
                <p className={`${secondaryText} text-sm mb-4`}>{exp.period}</p>
                <p className={secondaryText}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <MessageSquare className="mr-3 text-blue-500" size={32} />
            <h2 className="text-4xl font-bold">Get In Touch</h2>
          </div>
          <div className={`${cardBg} rounded-xl p-8 shadow-xl border ${borderColor}`}>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <button
                onClick={handleFormSubmit}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Send Message
              </button>
              {formStatus && (
                <p className="text-center text-green-500 font-semibold">{formStatus}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${cardBg} py-8 border-t ${borderColor}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className={secondaryText}>© 2025 Tom Developer. All rights reserved.</p>
          {/* mylink */}
            <p><Link to="/">Back to Home</Link></p>
        </div>
      </footer>
    </div>
  );
}