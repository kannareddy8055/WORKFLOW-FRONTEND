
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Plus } from 'lucide-react';
import './managerhomepage.css'; // Import the CSS file
import Header from '../Header/header';

const ManagerHomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  

  const handleViewRequests = () => {
    console.log('Viewing my requests...');
    // Add your navigation logic here
  };

  return (
    <div className="workflow-container">
      {/* Background with overlay */}
      <div className="home-header"><Header /></div>
      <div className="background-overlay"></div>
      
      {/* Animated background elements */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Main content */}
      <div className={`main-content ${isVisible ? 'animate-in' : ''}`}>
        <div className="hero-section">
          <h1 className="hero-title">
            Welcome to Workflow
          </h1>
          <p className="hero-subtitle">
            Streamline your approval processes with ease. Submit requests, track their
            <br />
            status, and get approvals efficiently.
          </p>
          
          <div className="cta-buttons">
            
            
            <Link className="link" to="/manager/dashboard"><button 
              className={`secondary-btn ${hoveredButton === 'secondary' ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredButton('secondary')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={handleViewRequests}
            >
              View Employees Requests
            </button></Link>

          </div>
        </div>
      </div>

      {/* Illustration elements */}
      <div className="illustration">
        <div className="person person-1">
          <div className="person-body"></div>
          <div className="person-head"></div>
          <div className="person-hair"></div>
        </div>
        
        <div className="person person-2">
          <div className="person-body person-body-2"></div>
          <div className="person-head person-head-2"></div>
        </div>
        
        <div className="plant">
          <div className="pot"></div>
          <div className="stem"></div>
          <div className="leaf leaf-1"></div>
          <div className="leaf leaf-2"></div>
          <div className="leaf leaf-3"></div>
        </div>

        <div className="desk-items">
          <div className="laptop"></div>
          <div className="notebook"></div>
          <div className="coffee-cup"></div>
        </div>
      </div>
    </div>
  );
};


export default ManagerHomePage;

