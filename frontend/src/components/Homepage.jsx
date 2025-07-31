import React, { useState } from "react";
import "./Homepage.css";
import { Link, useNavigate } from "react-router-dom";

function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate(); 
  const goalSet = () => {
    navigate('/fitness-goal'); 
  };


  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">FitTrack-AI</span>
          </div>

          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#how-it-works" className="nav-link">
              How It Works
            </a>

            <Link to="/login" className="nav-btn-secondary">
              Login
            </Link>
            <Link to="/signup" className="nav-btn-primary">
              Sign Up
            </Link>
          </div>

          <div className="nav-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Your Fitness Journey with AI-Powered Workout Tracking
            </h1>
            <p className="hero-subtitle">
              Get personalized workout plans, track your progress with
              intelligent insights, and achieve your fitness goals faster with
              our AI-driven platform.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary"  onClick={goalSet}>Get Started</button>
            </div>
            {/* <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>

              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">AI Support</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose FitTrack-AI?</h2>
            <p>
              Everything you need to achieve your fitness goals in one
              intelligent platform
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Workout Plans</h3>
              <p>
                Get personalized workout routines based on your goals, fitness
                level, and preferences. Our AI adapts to your progress.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Smart Progress Tracking</h3>
              <p>
                Visualize your fitness journey with detailed charts, progress
                reports, and performance analytics.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Goal-Based Training</h3>
              <p>
                Choose from various fitness objectives: lose weight, build
                muscle, improve endurance, or get leaner.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Flexible Workout Logging</h3>
              <p>
                Log your workouts with custom exercises, sets, reps, and
                weights. Modify AI suggestions to fit your needs.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Calendar Integration</h3>
              <p>
                Track your workout frequency with our calendar view and never
                miss a training session.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Filtering</h3>
              <p>
                Filter your workout history by type, date range, or specific
                exercises for better insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get started in just 3 simple steps</p>
          </div>

          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Set Your Goals</h3>
                <p>
                  Choose your fitness objective and workout frequency. Tell us
                  what you want to achieve.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Get AI Workout Plan</h3>
                <p>
                  Our AI generates a personalized workout plan tailored to your
                  goals and current fitness level.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Track & Progress</h3>
                <p>
                  Log your workouts, track your progress, and watch your fitness
                  journey unfold with beautiful visualizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Fitness Journey?</h2>
            <p>
              Join thousands of users who have already achieved their fitness
              goals with FitTrack-AI
            </p>
            <button className="btn-primary-large" onClick={goalSet}>Get Started Now</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-text">FitTrack-AI</span>
              </div>
              <p>
                Empowering your fitness journey with AI-powered insights and
                personalized workout plans.
              </p>
            </div>

            <div className="footer-section">
              <h4>Product</h4>
              <a href="#features">Features</a>

              <a href="#how-it-works">How It Works</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 FitTrack-AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
