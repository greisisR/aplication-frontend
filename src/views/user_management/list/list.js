import React, { useState, useEffect } from 'react';
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
  CFormSelect,
} from '@coreui/react';

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [userToView, setUserToView] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:8000/user')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredData = userData.filter(user => {
    return (
      user.user_id.toString().includes(searchTerm.toLowerCase()) ||
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.level_id !== undefined && user.level_id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDelete = () => {
    setUserData(userData.filter(user => user.user_id !== userToDelete));
    setModalVisible(false);
  };

  const handleUpdateRole = () => {
    if (userToUpdate) {
      const updatedUserData = userData.map(user =>
        user.user_id === userToUpdate.user_id ? { ...user, level_id: userToUpdate.level_id } : user
      );
      setUserData(updatedUserData);
      setUpdateModalVisible(false);
    }
  };

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
                      <CTableDataCell>{user.user_id}</CTableDataCell>
                      <CTableDataCell>{user.firstname}</CTableDataCell>
                      <CTableDataCell>{user.surname}</CTableDataCell>
                      <CTableDataCell>
                        {user.level_id === 0 ? 'Admin' : user.level_id === 1 ? 'Doctor' : user.level_id === 2 ? 'Patient' : 'Unknown'}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          className="me-2"
                          onClick={() => {
                            setUserToView(user);
                            setViewModalVisible(true);
                          }}
                        >
                          View More
                        </CButton>
                        <CButton
                          color="warning"
                          className="me-2"
                          onClick={() => {
                            setUserToUpdate(user);
                            setUpdateModalVisible(true);
                          }}
                        >
                          Modify Role
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => {
                            setUserToDelete(user.user_id);
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

      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <CModalHeader>
          <strong>Delete Confirmation</strong>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this user?
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
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
      >
        <CModalHeader>
          <strong>Update User Role</strong>
        </CModalHeader>
        <CModalBody>
          {userToUpdate && (
            <div>
              <div className="mb-3">
                <label>Role</label>
                <CFormSelect
                  value={userToUpdate.level_id}
                  onChange={(e) => setUserToUpdate({ ...userToUpdate, level_id: parseInt(e.target.value) })}
                >
                  <option value={0}>Admin</option>
                  <option value={1}>Doctor</option>
                  <option value={2}>Patient</option>
                </CFormSelect>
              </div>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setUpdateModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleUpdateRole}>
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={viewModalVisible}
        onClose={() => setViewModalVisible(false)}
      >
        <CModalHeader>
          <strong>User Details</strong>
        </CModalHeader>
        <CModalBody>
          {userToView && (
            <div>
              <p><strong>User ID:</strong> {userToView.user_id}</p>
              <p><strong>First Name:</strong> {userToView.firstname}</p>
              <p><strong>Middle Name:</strong> {userToView.middlename}</p>
              <p><strong>Surname:</strong> {userToView.surname}</p>
              <p><strong>Second Surname:</strong> {userToView.secondsurname}</p>
              <p><strong>Email:</strong> {userToView.email}</p>
              <p><strong>Gender:</strong> {userToView.gender}</p>
              <p><strong>Phone:</strong> {userToView.phone}</p>
              <p><strong>Role:</strong> {userToView.level_id === 0 ? 'Admin' : userToView.level_id === 1 ? 'Doctor' : userToView.level_id === 2 ? 'Patient' : 'Unknown'}</p>
              <p><strong>Municipality:</strong> {userToView.municipality}</p>          
              <p><strong>Parish:</strong> {userToView.parish}</p>          
              <p><strong>Address:</strong> {userToView.address}</p>
              <p><strong>Date Birth:</strong> {userToView.birthdate}</p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setViewModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default UserList;
