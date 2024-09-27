import React from 'react';
import LogoutButton from '../../components/LogoutButton/LogoutButton';

const TeacherDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="dashboard-container">
            <h2>Teacher Dashboard</h2>
            {user && (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <LogoutButton />
        </div>
    );
};

export default TeacherDashboard;
