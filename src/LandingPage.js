import React from 'react';

// Import your image at the top
import hero from './landimg.jpg';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <header className="navbar">
        <div className="logo">💰 Exettra</div>
        <a href="/signin" className="login-btn">Log In →</a>
      </header>

      <section className="hero">
        <div className="hero-text">
          <div className="hero-image-container">
            <img src={hero} alt="Expense Management Illustration" className="hero-img" />
          </div>
          <h1>Manage Your Expenses Easily With <span>Exettra</span></h1>
          <p>We provide the easiest way to manage expenses. Get a full view so you know where to save. Track spending, detect fraud, and keep tabs on subscription costs.</p>
          <Link to='/signin'><div><button className="cta">Get Started</button></div></Link>
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

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', sans-serif;
          background-color: #f8f9fb;
          color: #222;
          overflow-x: hidden;
        }

        .landing-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
        }

        /* Header */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 60px;
          background-color: white;
          box-shadow: 0 1px 6px rgba(152, 60, 188, 0.1);
          position: sticky;
          top: 0;
          z-index: 10;
          width: 100%;
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
        }

        .navbar nav {
          display: flex;
          gap: 30px;
        }

        .navbar nav a {
          text-decoration: none;
          color: #444;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .navbar nav a:hover {
          color: #f72585;
        }

        .login-btn {
          text-decoration: none;
          font-weight: bold;
          color: #0a58ca;
          transition: color 0.3s ease;
        }

        .login-btn:hover {
          color: #f72585;
        }

        /* Hero Section */
        .hero {
          display: flex;
          padding: 60px;
          gap: 60px;
          background: #ffffff;
          flex: 1;
          align-items: center;
          min-height: calc(100vh - 100px);
          width: 100%;
          max-width: 100%;
        }

        .hero-text {
          flex: 1 1 50%;
          max-width: 600px;
        }

        .hero-image-container {
          margin-bottom: 30px;
        }

        .hero-img {
          width: 100%;
          max-width: 420px;
          height: auto;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .hero-visuals {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 110px;
          gap: 18px;
          flex: 1 1 50%;
          align-content: center;
          max-width: 400px;
          width: 100%;
        }

        .hero-text h1 {
          font-size: 48px;
          line-height: 1.3;
          font-weight: 700;
          margin: 0;
        }

        .hero-text h1 span {
          color: #f72585;
        }

        .hero-text p {
          font-size: 17px;
          margin: 20px 0 30px;
          max-width: 500px;
          color: #555;
          line-height: 1.6;
        }

        .cta {
          padding: 12px 28px;
          background: linear-gradient(to right, #4facfe, #f093fb);
          border: none;
          color: white;
          font-weight: bold;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
        }

        .box {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(179, 44, 209, 0.42);
          text-align: center;
          font-size: 16px;
          font-weight: 500;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .box:hover {
          transform: translateY(-3px);
        }

        .large {
          box-shadow: 0 2px 12px rgba(46, 132, 237, 0.42);
          grid-column: span 2;
          font-size: 18px;
        }

        .medium {
          font-size: 15px;
        }

        .small {
          box-shadow: 0 2px 12px rgba(80, 35, 214, 0.42);
          font-size: 14px;
        }

        .logo-box {
          font-size: 13px;
          font-style: italic;
          color: #777;
          background: #f9f9f9;
        }

        /* Trusted Section */
        .trusted {
          text-align: center;
          padding: 60px 20px;
          background: #eef1f4;
          width: 100%;
        }

        .trusted p {
          font-weight: bold;
          margin-bottom: 30px;
          font-size: 17px;
        }

        .logo-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          font-size: 16px;
          color: #555;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero {
            padding: 40px;
            gap: 40px;
          }
          
          .navbar {
            padding: 20px 40px;
          }
          
          .hero-text h1 {
            font-size: 42px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            padding: 40px 20px;
            text-align: center;
          }
          
          .navbar {
            padding: 15px 20px;
            flex-wrap: wrap;
            gap: 15px;
          }
          
          .navbar nav {
            order: 3;
            width: 100%;
            justify-content: center;
            margin-top: 10px;
          }
          
          .hero-text h1 {
            font-size: 36px;
          }
          
          .hero-visuals {
            max-width: 100%;
            grid-template-columns: 1fr 1fr;
          }
          
          .hero-img {
            width: 100%;
            max-width: 350px;
            margin: 0 auto 20px;
            display: block;
          }
          
          .logo-row {
            gap: 20px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .hero-text h1 {
            font-size: 28px;
          }
          
          .hero-text p {
            font-size: 16px;
          }
          
          .hero-visuals {
            grid-template-columns: 1fr;
            max-width: 280px;
            margin: 0 auto;
          }
          
          .box {
            padding: 15px;
            font-size: 14px;
          }
          
          .large {
            font-size: 16px;
          }
          
          .navbar nav {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;