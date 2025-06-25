import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideBar.css'
function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Expense Tracker</h2>
      <ul>
         <li><Link to="/Dashboard">Dashboard</Link></li>
        <li><Link to="/add">New Transaction</Link></li>
        <li><Link to="/rep">Reports</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
