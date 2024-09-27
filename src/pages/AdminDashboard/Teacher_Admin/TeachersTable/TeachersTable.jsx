import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTeachers, deleteTeacher } from '../../../../features/teachers/TeachersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import './TeachersTable.css';

const TeachersTable = ({ onEditTeacher }) => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.allTeachers || []); // Ensure teachers is an array

  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAllTeachers());
  }, [dispatch]);

  const handleDeleteTeacher = (id) => {
    dispatch(deleteTeacher(id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    Object.values(teacher).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const lastIndex = currentPage * teachersPerPage;
  const firstIndex = lastIndex - teachersPerPage;
  const displayedTeachers = filteredTeachers.slice(firstIndex, lastIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  const csvData = teachers.map(teacher => ({
    name: teacher.name,
    email: teacher.email,
    password: teacher.password,
    gender: teacher.gender,
    address: teacher.address,
    contactNumber: teacher.contactNumber,
    dateOfJoining: teacher.dateOfJoining,
    department: teacher.department
  }));

  return (
    <div className="teachers-table-container">
      <div className="header-teacher-table">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <CSVLink data={csvData} filename={"teachers.csv"} className="btn-download">
          <FontAwesomeIcon icon={faDownload} /> Download CSV
        </CSVLink>
      </div>

      <table className="teachers-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Full Name</th>
            <th>G-mail</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Date of Joining</th>
            <th>Department/Subject(s) Taught</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedTeachers.map((teacher, index) => (
            <tr key={`${teacher.id}-${index}`}>
              <td>{firstIndex + index + 1}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.password}</td>
              <td>{teacher.gender}</td>
              <td>{teacher.address}</td>
              <td>{teacher.contactNumber}</td>
              <td>{teacher.dateOfJoining}</td>
              <td>{teacher.department}</td>
              <td>
                <FontAwesomeIcon icon={faEdit} onClick={() => onEditTeacher(teacher)} className="icon edit-icon" />
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteTeacher(teacher.id)} className="icon delete-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeachersTable;
