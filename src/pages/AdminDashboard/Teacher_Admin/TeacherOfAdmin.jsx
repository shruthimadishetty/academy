import React, { useState } from 'react';
import TeachersTable from './TeachersTable/TeachersTable';
import TeacherForm from './TeacherForm/TeacherForm';
import './TeacherOFAdmin.css';

const TeachersOfAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState(null);

  const handleEditTeacher = (teacher) => {
    setTeacherToEdit(teacher);
    setIsEditing(true);
  };

  const handleNewTeacher = () => {
    setTeacherToEdit(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTeacherToEdit(null);
  };

  return (
    <div className="teachers-page">
      <div className="header-teacher-table">
        <h1>Teachers List</h1>
        <button onClick={handleNewTeacher} className="new-teacher-btn">New Teacher</button>
      </div>
      {isEditing ? (
        <TeacherForm teacherToEdit={teacherToEdit} onCloseForm={handleCancel} />
      ) : (
        <TeachersTable onEditTeacher={handleEditTeacher} />
      )}
    </div>
  );
};

export default TeachersOfAdmin;
