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
  CFormSelect,
} from '@coreui/react';

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [specialtyData, setSpecialtyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [staffDetails, setStaffDetails] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/db.json');
      const data = await response.json();
      setUsersData(data.user);
      setStaffData(data.staff);
      setSpecialtyData(data.specialty);
    };
    fetchData();
  }, []);

  const combinedData = staffData
    .map((staff) => {
      const user = usersData.find((user) => user.user_id === staff.user_id);
      const specialty = specialtyData.find((spec) => spec.specialty_id === staff.specialty_id);
      return user
        ? {
            ...user,
            specialty_name: specialty ? specialty.name : 'Unknown',
            staff_id: staff.staff_id,
          }
        : null;
    })
    .filter((item) => item !== null);

  const filteredData = combinedData.filter((staff) =>
    `${staff.firstname} ${staff.surname} ${staff.specialty_name} ${staff.address}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    setModalVisible(false);
  };

  const handleUpdateClick = (staff) => {
    setCurrentStaff(staff);
    setUpdateModalVisible(true);
  };

  const handleUpdateChange = (field, value) => {
    setCurrentStaff({ ...currentStaff, [field]: value });
  };

  const handleSave = () => {
    console.log('Updated staff:', currentStaff);
    setUpdateModalVisible(false);
  };

  const handleViewMore = (staff) => {
    setStaffDetails(staff);
    setViewMoreModalVisible(true);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Staff List</strong>
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
                  <CTableHeaderCell>Specialty</CTableHeaderCell>
                  <CTableHeaderCell>Address</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((staff) => (
                    <CTableRow key={staff.staff_id}>
                      <CTableDataCell>{staff.staff_id}</CTableDataCell>
                      <CTableDataCell>{staff.firstname}</CTableDataCell>
                      <CTableDataCell>{staff.surname}</CTableDataCell>
                      <CTableDataCell>{staff.specialty_name}</CTableDataCell>
                      <CTableDataCell>{staff.address}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          size="sm"
                          onClick={() => handleViewMore(staff)}
                        >
                          View More
                        </CButton>
                        <CButton
                          color="warning"
                          size="sm"
                          className="ms-2"
                          onClick={() => handleUpdateClick(staff)}
                        >
                          Update
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          className="ms-2"
                          onClick={() => {
                            setStaffToDelete(staff.staff_id);
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
          Are you sure you want to delete this staff member?
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
          <strong>Staff Details</strong>
        </CModalHeader>
        <CModalBody>
          {staffDetails && (
            <div>
              <p><strong>Staff ID:</strong> {staffDetails.staff_id}</p>
              <p><strong>First Name:</strong> {staffDetails.firstname}</p>
              <p><strong>Middle Name:</strong> {staffDetails.middlename}</p>
              <p><strong>First Surname:</strong> {staffDetails.surname}</p>
              <p><strong>Second Surname:</strong> {staffDetails.secondsurname}</p>
              <p><strong>Gender:</strong> {staffDetails.gender}</p>
              <p><strong>Date Birth:</strong> {staffDetails.date_birth}</p>
              <p><strong>Email:</strong> {staffDetails.email}</p>
              <p><strong>Phone:</strong> {staffDetails.phone }</p>
              <p><strong>Specialty:</strong> {staffDetails.specialty_name}</p>
              <p><strong>Municipality:</strong> {staffDetails.municipality }</p>
              <p><strong>Parish:</strong> {staffDetails.parish }</p>
              <p><strong>Address:</strong> {staffDetails.address}</p>
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
          <strong>Update Staff</strong>
        </CModalHeader>
        <CModalBody>
          {currentStaff && (
            <CForm>
              {['firstname', 'middlename', 'surname', 'secondsurname', 'gender','date_birth', 'municipality', 'parish', 'address', 'phone', 'email', 'specialty_name'].map((field) => (
                <div key={field} className="mb-3">
                  <CFormLabel>{field.replace('_', ' ')}</CFormLabel>
                  <CFormInput
                    value={currentStaff[field] || ''}
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

export default StaffList;
