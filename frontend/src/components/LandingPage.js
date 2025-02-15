import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCheck, FaChartLine, FaMobile, FaRobot } from 'react-icons/fa';
import SmartAttendance from './SmartAttendance';
import './LandingPage.css';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription for:', email);
    setEmail('');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/" className="logo">UniSmart</Link>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <a onClick={() => scrollToSection('features')}>Features</a>
          <Link to="/courses">Courses</Link>
          <Link to="/timetable">Timetable</Link>
          <Link to="/students">Students</Link>
          <Link to="/faculty">Faculty</Link>
          <Link to="/smart-attendance">Smart Attendance</Link>
          <Link to="/notifications">Notifications</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-title-container">
            <h1>UniSmart</h1>
            <div className="hero-badge">AI Powered</div>
          </div>
          <p className="tagline">Your Smart Gateway to Smarter Campus</p>
          <p className="sub-tagline">
            Transform your educational experience with AI-powered campus management
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-primary">
              Get Started
              <span className="arrow">→</span>
            </Link>
            <button onClick={() => scrollToSection('features')} className="cta-secondary">
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="gradient-circle"></div>
          <img 
            src="/images/smartCampus.png"
            alt="AI-Powered Smart Campus Management"
            className="floating"
          />
          <div className="tech-overlay">
            <div className="ai-elements">
              <div className="ai-badge">AI</div>
              <div className="smart-campus-badge">SMART CAMPUS</div>
              <div className="management-badge">MANAGEMENT</div>
            </div>
            <div className="data-grid">
              {Array(8).fill().map((_, i) => (
                <div 
                  key={i} 
                  className="grid-point" 
                  style={{ 
                    '--delay': `${i * 0.2}s`,
                    '--x': `${15 + (i % 4) * 25}%`,
                    '--y': `${25 + Math.floor(i / 4) * 30}%`
                  }}
                />
              ))}
            </div>
            <div className="circuit-lines">
              {Array(4).fill().map((_, i) => (
                <div 
                  key={i} 
                  className="circuit-line" 
                  style={{ 
                    '--delay': `${i * 0.5}s`,
                    '--rotation': `${45 + i * 45}deg`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="features-section">
        <h2>Smart Features for Smart Education</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-content">
              <div className="feature-icon">
                <FaUserCheck />
              </div>
              <h3>Smart Attendance</h3>
              <p>AI-powered face recognition for seamless attendance tracking</p>
            </div>
            <div className="feature-hover"></div>
          </div>
          <div className="feature-card">
            <div className="feature-content">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3>Real-time Analytics</h3>
              <p>Comprehensive insights into academic performance</p>
            </div>
            <div className="feature-hover"></div>
          </div>
          <div className="feature-card">
            <div className="feature-content">
              <div className="feature-icon">
                <FaMobile />
              </div>
              <h3>Mobile Access</h3>
              <p>Access your campus anywhere, anytime</p>
            </div>
            <div className="feature-hover"></div>
          </div>
          <div className="feature-card">
            <div className="feature-content">
              <div className="feature-icon">
                <FaRobot />
              </div>
              <h3>AI Assistant</h3>
              <p>24/7 support for students and faculty</p>
            </div>
            <div className="feature-hover"></div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">10K+</div>
            <p>Students</p>
          </div>
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <p>Faculty</p>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <p>Satisfaction</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section brand">
            <h4>UniSmart</h4>
            <p>Your Smart Gateway to Smarter Campus</p>
          </div>
          <div className="footer-section links">
            <h4>Quick Links</h4>
            <div className="links-grid">
              <Link to="/about">About Us</Link>
              <Link to="/courses">Courses</Link>
              <Link to="/faculty">Faculty</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="footer-section contact">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <p>+1 234 567 890</p>
              <p>info@unismart.edu</p>
              <p>123 Campus Drive, Education City</p>
            </div>
          </div>
          <div className="footer-section newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe to our newsletter for updates</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} UniSmart. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 