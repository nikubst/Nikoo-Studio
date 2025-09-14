import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('gallery');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <div className="logo">
            <h1>Art Gallery</h1>
          </div>
          
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <button 
              className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
              onClick={() => scrollToSection('gallery')}
            >
              Gallery
            </button>
            <button 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
            <button 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section id="gallery">
          <Gallery />
        </section>
        
        <section id="about" className="section">
          <div className="container">
            <h2>About Our Gallery</h2>
            <p>Discover the world's most beautiful artworks in our curated collection. From classic masterpieces to contemporary works, we bring art to your screen.</p>
          </div>
        </section>
        
        <section id="contact" className="section bg-light">
          <div className="container">
            <h2>Contact Us</h2>
            <p>Have questions or suggestions? We'd love to hear from you!</p>
            <p>Email: info@artgallery.com</p>
          </div>
        </section>
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Art Gallery. All rights reserved.</p>
          <p>Created with React and ❤️</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
