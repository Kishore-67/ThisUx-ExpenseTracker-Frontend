import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <header className="navbar">
        <div className="logo">💰 ExisyFi</div>
        <nav>
          {/* <a href="#services">Services</a>
          <a href="#features">Features</a>
          <a href="#payments">Payments</a>
          <a href="#pricing">Pricing</a> */}
        </nav>
        <a href="/signin" className="login-btn">Log In →</a>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Manage Your Expenses Easily With <span>ExisyFi</span></h1>
          <p>We provide the easiest way to manage expenses. Get a full view so you know where to save. Track spending, detect fraud, and keep tabs on subscription costs.</p>
          <button className="cta">Get Started</button>
        </div>
        <div className="hero-visuals">
          <div className="box large">🧾 Keep Expense</div>
          <div className="box medium">-1200$ <br /> Expense</div>
          <div className="box medium">Crystal Clear</div>
          <div className="box small">📊</div>
          <div className="box small">📉</div>
          <div className="box logo-box">⭐ <em>Budget Planner</em></div>
          <div className="box logo-box">⭐ <em>Finance Management</em></div>
        </div>
      </section>

      <section className="trusted">
        <p>Trusted by</p>
        <div className="logo-row">
          <span>Citibank</span>
          <span>DBS</span>
          <span>Bank of America</span>
          <span>HSBC</span>
          <span>Axion</span>
          <span>Chase</span>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
