import React, { useRef, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

const UserList = () => {
  const initialUserData = [
    {
      userId: '30609563',
      firstName: 'Camilo',
      lastName: 'Rodriguez',
      role: 0, //Administrator
    },
    {
      userId: '1589042',
      firstName: 'Ana',
      lastName: 'Gomez',
      role: 1, //Docctor
    },
    {
      userId: '16409178',
      firstName: 'Luis',
      lastName: 'Martinez',
      role: 2, //Paciente
    },
    {
      userId: '19528446',
      firstName: 'Jose',
      lastName: 'Camacho',
      // sin rol
    },
    // Puede agregar más usuarios aquí
  ];

  const [userData, setUserData] = useState(initialUserData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrar usuarios
  const filteredData = userData.filter((user) => {
    return (
      user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User List</strong>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="Search by User ID, Name, or Role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>User ID</CTableHeaderCell>
                  <CTableHeaderCell>First Name</CTableHeaderCell>
                  <CTableHeaderCell>Last Name</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentData.length > 0 ? (
                  currentData.map((user, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{user.userId}</CTableDataCell>
                      <CTableDataCell>{user.firstName}</CTableDataCell>
                      <CTableDataCell>{user.lastName}</CTableDataCell>
                      <CTableDataCell>
                       {user.role === 0
                        ? 'Administrador'
                        : user.role === 1
                        ? 'Doctor'
                        : user.role === 2
                        ? 'Paciente'
                        : 'Desconocido'}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="info" className="me-2">View More</CButton>
                        <CButton color="warning" className="me-2">Modify Role</CButton>
                        <CButton color="danger">Delete</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="5" className="text-center">
                      No users found
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>Page {currentPage} of {totalPages}</span>
              <div>
                <CButton
                  color="primary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="me-2"
                >
                  Previous
                </CButton>
                <CButton
                  color="primary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </CButton>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UserList;
