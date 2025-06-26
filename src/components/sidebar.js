import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div
      className="bg-dark text-white vh-100 position-fixed"
      style={{ width: '220px', top: 0, left: 0 }}
    >
      <div className="p-4">
        <h4>Dashboard</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <Link className={`nav-link text-white ${isActive('/')}`} to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-white ${isActive('/login')}`} to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-white ${isActive('/register')}`} to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-white ${isActive('/about')}`} to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-white ${isActive('/contact')}`} to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
