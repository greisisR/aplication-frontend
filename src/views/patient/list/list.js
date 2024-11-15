import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader
} from '@coreui/react';

const PatientList = () => {
  const [patientData, setPatientData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const navigate = useNavigate(); 

  // Cargar datos desde localStorage al cargar el componente
  useEffect(() => {
    const storedPatientData = localStorage.getItem('patients');
    const storedUsersData = localStorage.getItem('users');
    
    if (storedPatientData && storedUsersData) {
      setPatientData(JSON.parse(storedPatientData));
      setUsersData(JSON.parse(storedUsersData));
    } else {
      const fetchData = async () => {
        const response = await fetch('/data/db.json');
        const data = await response.json();
        setUsersData(data.user);
        setPatientData(data.patient);

        // Guardar datos en localStorage para persistencia
        localStorage.setItem('patients', JSON.stringify(data.patient));
        localStorage.setItem('users', JSON.stringify(data.user));
      };

      fetchData();
    }
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
    `${patient.firstname} ${patient.surname} ${patient.address} ${patient.gender} ${patient.patient_id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    const updatedPatientData = patientData.filter(patient => patient.patient_id !== patientToDelete);
    
    // Actualizar el estado y localStorage
    setPatientData(updatedPatientData);
    localStorage.setItem('patients', JSON.stringify(updatedPatientData));

    setModalVisible(false);
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
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <CTableHeaderCell>Address</CTableHeaderCell>
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
                        <CButton
                          color="warning"
                          size="sm"
                          className="ms-2"
                          onClick={() => navigate(`../update/${patient.patient_id}`)} 
                        >
                          Update
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          className="ms-2"
                          onClick={() => {
                            setPatientToDelete(patient.patient_id);
                            setModalVisible(true);
                          }}
                        >
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
          </CCardBody>
        </CCard>
      </CCol>

      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <CModalHeader>
          <strong>Delete Confirmation</strong>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this patient?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            No
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Yes
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default PatientList;
