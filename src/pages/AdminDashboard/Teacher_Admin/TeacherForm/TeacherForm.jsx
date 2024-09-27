import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNewTeacher, modifyTeacher } from '../../../../features/teachers/TeachersSlice';
import './TeacherForm.css';

const TeacherForm = ({ currentTeacher, onCloseForm }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    address: '',
    contactNumber: '',
    dateOfJoining: '',
    department: ''
  });

  useEffect(() => {
    if (currentTeacher) {
      setFormData(currentTeacher);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        password: generatePassword(), // Generate password on form load for new teacher
      }));
    }
  }, [currentTeacher]);

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
    if (formData.id) {
      dispatch(modifyTeacher(formData));
    } else {
      dispatch(createNewTeacher(formData));
    }
    onCloseForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleFormSubmit} className="teacher-form">
      <div className="form-group">
        <label className="form-label">Full Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Gmail:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password (Auto-Generated):</label>
        <input
          type="text"
          name="password"
          value={formData.password}
          className="form-input"
          readOnly
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Date of Joining:</label>
        <input
          type="date"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="submit-button">Submit</button>
        <button type="button" onClick={onCloseForm} className="cancel-button">Cancel</button>
      </div>
    </form>
  );
};

export default TeacherForm;
