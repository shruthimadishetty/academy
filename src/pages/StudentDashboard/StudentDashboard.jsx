import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaRegCalendarCheck } from 'react-icons/fa'; // Import icons from react-icons
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import { MdDashboard } from "react-icons/md";

import './StudentDashboard.css';

const StudentDashboard = () => {
  const student = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <div className="student-sidebar">
        <h2>Student Dashboard</h2>
        <ul>
          <li>
            <MdDashboard className="icon" /> {/* Dashboard icon */}
            <Link to="/student-dashboard">Dashboard</Link>
          </li>
          <li>
            <FaClipboardList className="icon" /> {/* Marks icon */}
            <Link to="/student-marks">Marks</Link>
          </li>
          <li>
            <FaRegCalendarCheck className="icon" /> {/* Attendance icon */}
            <Link to="/student-attendance">Attendance</Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <header className='student-header'>
          {student && (
            <div className="student-info">
              <span>Welcome, {student.name}!</span> {/* Added student's name */}
              <span>Email: {student.email}</span>
            </div>
          )}
          <LogoutButton />
        </header>

        {/* Pages */}
        <div className="student-content">
          <h1>Welcome to the Student Dashboard</h1>
          {/* Add routes here for student dashboard, marks, attendance */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
