import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
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
  CModalHeader,
  CForm,
  CFormLabel,
} from '@coreui/react';

const PatientList = () => {
  const [patientData, setPatientData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const navigate = useNavigate();

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
    `${patient.firstname} ${patient.surname} ${patient.address} ${patient.gender} ${patient.patient_id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    setModalVisible(false);
  };

  const handleUpdateClick = (patient) => {
    setCurrentPatient(patient);
    setUpdateModalVisible(true);
  };

  const handleUpdateChange = (field, value) => {
    setCurrentPatient({ ...currentPatient, [field]: value });
  };

  const handleSave = () => {
    console.log('Updated patient:', currentPatient);
    setUpdateModalVisible(false);
  };

  const handleViewMore = (patient) => {
    setPatientDetails(patient);
    setViewMoreModalVisible(true);
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
                        <CButton color="info" size="sm" onClick={() => handleViewMore(patient)}>
                          View More
                        </CButton>
                        <CButton
                          color="warning"
                          size="sm"
                          className="ms-2"
                          onClick={() => handleUpdateClick(patient)}
                        >
                          Update
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          className="ms-2"
                          onClick={() => {
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

      <CModal
        visible={viewMoreModalVisible}
        onClose={() => setViewMoreModalVisible(false)}
      >
        <CModalHeader>
          <strong>Patient Details</strong>
        </CModalHeader>
        <CModalBody>
          {patientDetails && (
            <div>
              <p><strong>Patient ID:</strong> {patientDetails.patient_id}</p>
              <p><strong>First Name:</strong> {patientDetails.firstname}</p>
              <p><strong>Middle Name:</strong> {patientDetails.middlename}</p>
              <p><strong>first Surname:</strong> {patientDetails.surname}</p>
              <p><strong>Second Surname:</strong> {patientDetails.secondsurname}</p>
              <p><strong>Gender:</strong> {patientDetails.gender}</p>
              <p><strong>Date Birth:</strong> {patientDetails.date_birth}</p>
              <p><strong>Email:</strong> {patientDetails.email}</p>
              <p><strong>Phone:</strong> {patientDetails.phone}</p>
              <p><strong>Municipality:</strong> {patientDetails.municipality}</p>
              <p><strong>Parish:</strong> {patientDetails.parish}</p>
              <p><strong>Address:</strong> {patientDetails.address}</p>
              <p><strong>Date Birth:</strong> {patientDetails.date_birth}</p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setViewMoreModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
      >
        <CModalHeader>
          <strong>Update Patient</strong>
        </CModalHeader>
        <CModalBody>
          {currentPatient && (
            <CForm>
              {['firstname', 'middlename', 'surname', 'secondsurname', 'gender', 'date_birth', 'phone', 'municipality', 'parish', 'address', 'email'].map((field) => (
                <div key={field} className="mb-3">
                  <CFormLabel>{field.replace('_', ' ')}</CFormLabel>
                  <CFormInput
                    value={currentPatient[field] || ''}
                    onChange={(e) => handleUpdateChange(field, e.target.value)}
                  />
                </div>
              ))}
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setUpdateModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default PatientList;
