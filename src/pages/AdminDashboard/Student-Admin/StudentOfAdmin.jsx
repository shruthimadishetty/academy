import React, { useState } from 'react';
import StudentsTable from './StudentsTable/StudentsTable';
import StudentForm from './StudentForm/StudentForm';
import './StudentOfAdmin.css';

const StudentOfAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const handleEditStudent = (student) => {
    setStudentToEdit(student);
    setIsEditing(true);
  };

  const handleNewStudent = () => {
    setStudentToEdit(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setStudentToEdit(null);
  };

  return (
    <div className="students-page">
      <div className="header-student-table">
        <h1>Students List</h1>
        <button onClick={handleNewStudent} className="new-student-btn">New Student</button>
      </div>
      {isEditing ? (
        <StudentForm studentToEdit={studentToEdit} onCloseForm={handleCancel} />
      ) : (
        <StudentsTable onEditStudent={handleEditStudent} />
      )}
    </div>
  );
};

export default StudentOfAdmin;
