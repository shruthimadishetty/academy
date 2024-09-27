import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStudent, updateStudent } from '../../../../features/students/studentsSlice';
import './StudentForm.css';

const StudentForm = ({ studentToEdit, onCloseForm }) => {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    password: '', // Automatically generated password
    gender: '',
    address: '',
    contactNumber: '',
    parentName: '',
    classGrade: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (studentToEdit) {
      setStudentData(studentToEdit);
    } else {
      setStudentData((prevData) => ({
        ...prevData,
        password: generatePassword(), // Generate password on form load for new student
      }));
    }
  }, [studentToEdit]);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (studentData.id) {
      dispatch(updateStudent(studentData));
    } else {
      dispatch(createStudent(studentData));
    }
    onCloseForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  return (
    <form onSubmit={handleFormSubmit} className="student-form">
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="name"
          value={studentData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Gmail:</label>
        <input
          type="email"
          name="email"
          value={studentData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password (Auto-Generated):</label>
        <input
          type="text"
          name="password"
          value={studentData.password}
          readOnly
          required
        />
      </div>
      <div>
        <label>Gender:</label>
        <select
          name="gender"
          value={studentData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={studentData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={studentData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Parent/Guardian Name:</label>
        <input
          type="text"
          name="parentName"
          value={studentData.parentName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Class/Grade:</label>
        <input
          type="text"
          name="classGrade"
          value={studentData.classGrade}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit">Submit</button>
        <button type="button" onClick={onCloseForm} className="cancel-button">Cancel</button>
      </div>
    </form>
  );
};

export default StudentForm;
