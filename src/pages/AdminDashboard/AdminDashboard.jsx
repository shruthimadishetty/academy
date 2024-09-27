import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import { MdDashboard } from "react-icons/md";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>
            <Link to="/admin-dashboard/dashboard">
              <MdDashboard className="icon" /> {/* Dashboard icon */}
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/teachers">
              <FaChalkboardTeacher className="icon" /> {/* Teachers icon */}
              Teachers
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/students">
              <FaUsers className="icon" /> {/* Students icon */}
              Students
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <header>
          {user && (
            <div className="user-info">
              <span>Welcome, {user.name}!</span>
              <span>Email: {user.email}</span>
            </div>
          )}
          <LogoutButton />
        </header>

        <div className="content">
          <Outlet /> {/* This is where the nested routes will render */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
