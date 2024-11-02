import React, { useState } from 'react';
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

const PatientList = () => {
  const initialPatientData = [
    { id: 1, firstName: 'Luis', lastName: 'Martínez', gender: 'M', address: 'Calle 123' },
    { id: 2, firstName: 'María', lastName: 'González', gender: 'F', address: 'Avenida Siempre Viva' },
    { id: 3, firstName: 'José', lastName: 'Rodríguez', gender: 'M', address: 'Calle Los Almendros' },
    { id: 4, firstName: 'Ana', lastName: 'Pérez', gender: 'F', address: 'Boulevard El Sol' },
    { id: 5, firstName: 'Carlos', lastName: 'Hernández', gender: 'M', address: 'Calle Luna' },
  ];

  const [patientData, setPatientData] = useState(initialPatientData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = patientData.filter((patient) =>
    `${patient.firstName} ${patient.lastName} ${patient.address} ${patient.gender}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDelete = (id) => {
    setPatientData(patientData.filter((patient) => patient.id !== id));
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Patient List</strong>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>First Name</CTableHeaderCell>
                  <CTableHeaderCell>Last Name</CTableHeaderCell>
                  <CTableHeaderCell>Address</CTableHeaderCell>
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentData.length > 0 ? (
                  currentData.map((patient) => (
                    <CTableRow key={patient.id}>
                      <CTableDataCell>{patient.id}</CTableDataCell>
                      <CTableDataCell>{patient.firstName}</CTableDataCell>
                      <CTableDataCell>{patient.lastName}</CTableDataCell>
                      <CTableDataCell>{patient.address}</CTableDataCell>
                      <CTableDataCell>{patient.gender}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="warning" size="sm" className="me-2">Update</CButton>
                        <CButton color="info" size="sm" className="me-2">View More</CButton>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(patient.id)}>
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="6" className="text-center">
                      No results found
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

export default PatientList;
