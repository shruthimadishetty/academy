import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, deleteStudent, createStudent } from '../../../../features/students/studentsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import emailjs from 'emailjs-com';
import './StudentsTable.css';

const StudentsTable = ({ onEditStudent }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDeleteStudent = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const lastIndex = currentPage * studentsPerPage;
  const firstIndex = lastIndex - studentsPerPage;
  const displayedStudents = filteredStudents.slice(firstIndex, lastIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const csvData = students.map(student => ({
    name: student.name,
    email: student.email,
    password: student.password,
    gender: student.gender,
    address: student.address,
    contactNumber: student.contactNumber,
    parentName: student.parentName,
    classGrade: student.classGrade
  }));

  // Function to send the password via email
  const sendPasswordEmail = (student) => {
    const templateParams = {
      to_email: student.email,
      student_name: student.name,
      student_password: student.password
    };
    console.log("Sending email with params:", templateParams);

    // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
    emailjs.send('service_jvgzhsm', 'template_zn6ns7u', templateParams, '0IuAjZ5U-_bo971y2')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(`Password sent to ${student.email}`);
      }, (err) => {
        console.error('FAILED...', err);
        alert('Failed to send password. Please try again.');
      });
  };

  // Function to handle student creation
  const handleCreateStudent = (newStudent) => {
    dispatch(createStudent(newStudent)).then(() => {
      sendPasswordEmail(newStudent);
    });
  };

  return (
    <div>
      <div className="header-student-table">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <CSVLink data={csvData} filename={"students.csv"} className="btn btn-download">
          <FontAwesomeIcon icon={faDownload} /> Download CSV
        </CSVLink>
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Parent/Guardian Name</th>
            <th>Class/Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedStudents.map((student, index) => (
            <tr key={`${student.id}-${index}`}>
              <td>{firstIndex + index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.password}</td>
              <td>{student.gender}</td>
              <td>{student.address}</td>
              <td>{student.contactNumber}</td>
              <td>{student.parentName}</td>
              <td>{student.classGrade}</td>
              <td>
                <button onClick={() => onEditStudent(student)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeleteStudent(student.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button onClick={() => sendPasswordEmail(student)}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
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

export default StudentsTable;
