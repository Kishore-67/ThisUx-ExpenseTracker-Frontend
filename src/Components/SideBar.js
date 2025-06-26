import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SideBar.css';
import { RxAvatar } from "react-icons/rx";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear token or any stored session data
    localStorage.removeItem('token');
    sessionStorage.clear(); // in case you use sessionStorage

    // ✅ Navigate to landing or login page
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h2>Expense Tracker</h2>
      <ul>
        <li><Link to="/Dashboard">Dashboard</Link></li>
        <li><Link to="/add">New Transaction</Link></li>
        <li><Link to="/rep">Reports</Link></li>
      </ul>
      <hr className="divider" />
      <div className="sidebar-bottom">
        <button onClick={handleLogout} className="sidebar-icon logout-button">
          <RxAvatar size={50} /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
