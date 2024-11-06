import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

const PatientList = () => {
  const [patientData, setPatientData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/db.json');
      const data = await response.json();
      setUsersData(data.user);
      setPatientData(data.patient);
    };

    fetchData();
  }, []);

  const combinedData = patientData.map((patient) => {
    const user = usersData.find((user) => user.user_id === patient.user_id);
    return user
      ? {
          ...user,
          patient_id: patient.patient_id,
          gender: user.gender === 1 ? 'M' : 'F', 
        }
      : null;
  }).filter(item => item !== null);

  const filteredData = combinedData.filter(patient =>
    `${patient.firstname} ${patient.surname} ${patient.address}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <>Address</>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((patient) => (
                    <CTableRow key={patient.patient_id}>
                      <CTableDataCell>{patient.patient_id}</CTableDataCell>
                      <CTableDataCell>{patient.firstname}</CTableDataCell>
                      <CTableDataCell>{patient.surname}</CTableDataCell>
                      <CTableDataCell>{patient.gender}</CTableDataCell> 
                      <CTableDataCell>{patient.address}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="info" size="sm">View More</CButton>
                        <CButton color="warning" size="sm" className="ms-2">Update</CButton>
                        <CButton color="danger" size="sm" className="ms-2">Delete</CButton>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default PatientList;
