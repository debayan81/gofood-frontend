import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// ==========================================
// 1. COMPONENTS
// ==========================================

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav 
      className="navbar navbar-expand-lg fixed-top shadow-sm"
      style={{
        background: "rgba(18, 18, 18, 0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "1rem 2rem",
        transition: "all 0.3s ease"
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-3 text-white" to="/">
          Go<span className="text-success">Food</span>
        </Link>
        
        <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated && (
              <li className="nav-item ms-4">
                <Link className="nav-link text-light fs-5 hover-success" to="/myorders">My Orders</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-light text-decoration-none fw-semibold">Log In</Link>
                <Link to="/signup" className="btn btn-success rounded-pill px-4 fw-bold shadow">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/cart" className="btn btn-outline-light rounded-pill px-4 fw-bold">
                  Cart <span className="badge bg-success ms-1">0</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-danger rounded-pill px-4 fw-bold shadow">
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function FoodCard({ foodName, price, imgSrc }) {
  // Using React state to handle standard CSS hover effects without external libraries
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="card bg-dark text-white border-0 rounded-4 m-3 transition-all" 
      style={{ 
        width: "20rem", 
        boxShadow: isHovered ? "0 15px 35px rgba(25, 135, 84, 0.2)" : "0 10px 30px rgba(0,0,0,0.5)",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.3s ease"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="position-relative overflow-hidden rounded-top-4">
        <img 
          src={imgSrc} 
          className="card-img-top w-100" 
          alt={foodName} 
          style={{ 
            height: "200px", 
            objectFit: "cover",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s ease"
          }} 
        />
        <div className="position-absolute top-0 end-0 m-3 bg-dark bg-opacity-75 rounded-pill px-3 py-1 fw-bold text-success border border-success">
          ₹{price}
        </div>
      </div>
      
      <div className="card-body p-4" style={{ backgroundColor: "#1a1a1a" }}>
        <h4 className="card-title fw-bold mb-3">{foodName}</h4>
        <div className="d-flex justify-content-between align-items-center mb-4 gap-2">
          <select className="form-select bg-black text-white border-secondary rounded-3">
            {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num}>Qty: {num}</option>)}
          </select>
          <select className="form-select bg-black text-white border-secondary rounded-3">
            <option value="half">Half</option>
            <option value="full">Full</option>
          </select>
        </div>
        <button className="btn btn-success w-100 rounded-pill fw-bold py-2 shadow-sm hover-lift">
          Add to Order
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. SCREENS
// ==========================================

function Home() {
  return (
    <div className="pt-5 mt-5 fade-in">
      <div className="container mt-5">
        <div className="mb-5">
          <h1 className="display-4 fw-bolder text-white">Fuel your <br/><span className="text-success">coding sessions.</span></h1>
          <p className="lead text-secondary">Premium meals delivered hot, fast, and exactly how you want them.</p>
        </div>
        
        <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
          <FoodCard foodName="Chicken Tikka" price="300" imgSrc="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" />
          <FoodCard foodName="Paneer Butter Masala" price="250" imgSrc="https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <FoodCard foodName="Mutton Biryani" price="400" imgSrc="https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" />
        </div>
      </div>
    </div>
  );
}

function AuthScreen({ isLogin }) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "loginuser" : "createuser";
    const bodyData = isLogin 
      ? { email: credentials.email, password: credentials.password }
      : { name: credentials.name, email: credentials.email, password: credentials.password };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/${endpoint}`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('authToken', json.authToken);
        navigate("/");
      } else {
        alert(isLogin ? "Invalid Credentials" : "Error creating account.");
      }
    } catch (err) {
      alert("Server is not running. Start your Express backend on port 5000!");
    }
  };

  const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 mt-5 fade-in">
      <div 
        className="card bg-dark text-white p-5 rounded-4 shadow-lg" 
        style={{ width: "100%", maxWidth: "450px", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <h2 className="fw-bolder mb-4 text-center">{isLogin ? "Welcome Back" : "Join GoFood"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <input type="text" className="form-control bg-black text-white border-secondary py-3" placeholder="Full Name" name="name" value={credentials.name} onChange={onChange} required />
            </div>
          )}
          <div className="mb-4">
            <input type="email" className="form-control bg-black text-white border-secondary py-3" placeholder="Email Address" name="email" value={credentials.email} onChange={onChange} required />
          </div>
          <div className="mb-4">
            <input type="password" className="form-control bg-black text-white border-secondary py-3" placeholder="Password" name="password" value={credentials.password} onChange={onChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100 py-3 fw-bold rounded-3 shadow">
            {isLogin ? "Log In" : "Create Account"}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to={isLogin ? "/signup" : "/login"} className="text-secondary text-decoration-none transition-all" style={{ hover: "color: #198754" }}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN ROUTER WRAPPER
// ==========================================

export default function App() {
  return (
    <Router>
      <div 
        className="min-vh-100" 
        style={{ backgroundColor: "#0a0a0a", color: "#ffffff", overflowX: "hidden" }}
      >
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<AuthScreen isLogin={true} />} />
          <Route exact path="/signup" element={<AuthScreen isLogin={false} />} />
        </Routes>
      </div>
      
      {/* Adding a tiny bit of global CSS for standard animations without libraries */}
      <style>{`
        .fade-in { animation: fadeIn 0.6s ease-in-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Router>
  );
}
