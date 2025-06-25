import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideBar.css'
import { RxAvatar } from "react-icons/rx";

function Sidebar() {
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
          <Link to='/'> <div className="sidebar-icon"><RxAvatar size={50} />Logout</div></Link>
      </div>
    </div>
  );
}

export default Sidebar;
