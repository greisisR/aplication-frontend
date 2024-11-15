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
  CModalHeader
} from '@coreui/react';

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [specialtyData, setSpecialtyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const navigate = useNavigate();

  // Cargar datos desde localStorage al cargar el componente
  useEffect(() => {
    const storedStaffData = localStorage.getItem('staff');
    const storedUsersData = localStorage.getItem('users');
    const storedSpecialtyData = localStorage.getItem('specialties');

    if (storedStaffData && storedUsersData && storedSpecialtyData) {
      setStaffData(JSON.parse(storedStaffData));
      setUsersData(JSON.parse(storedUsersData));
      setSpecialtyData(JSON.parse(storedSpecialtyData));
    } else {
      const fetchData = async () => {
        const response = await fetch('/data/db.json');
        const data = await response.json();
        setUsersData(data.user);
        setStaffData(data.staff);
        setSpecialtyData(data.specialty);

        // Guardar datos en localStorage para persistencia
        localStorage.setItem('staff', JSON.stringify(data.staff));
        localStorage.setItem('users', JSON.stringify(data.user));
        localStorage.setItem('specialties', JSON.stringify(data.specialty));
      };
      fetchData();
    }
  }, []);

  const combinedData = staffData.map((staff) => {
    const user = usersData.find((user) => user.user_id === staff.user_id);
    const specialty = specialtyData.find((spec) => spec.specialty_id === staff.specialty_id);
    return user ? {
      ...user,
      specialty_name: specialty ? specialty.name : 'Unknown',
      staff_id: staff.staff_id
    } : null;
  }).filter(item => item !== null);

  const filteredData = combinedData.filter(staff =>
    `${staff.firstname} ${staff.surname} ${staff.specialty_name} ${staff.address}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      // Eliminamos el miembro del personal localmente
      const updatedStaffData = staffData.filter(staff => staff.staff_id !== staffToDelete);
      setStaffData(updatedStaffData);
      
      // Guardamos los datos actualizados en localStorage
      localStorage.setItem('staff', JSON.stringify(updatedStaffData));
      setModalVisible(false);
    } catch (error) {
      console.error("Error deleting the staff member:", error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader><strong>Staff List</strong></CCardHeader>
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
                        <CButton color="info" size="sm">View More</CButton>
                        <CButton 
                          color="warning" 
                          size="sm" 
                          className="ms-2"
                          onClick={() => navigate(`/update/${staff.staff_id}`)}
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

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader><strong>Delete Confirmation</strong></CModalHeader>
        <CModalBody>Are you sure you want to delete this staff member?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>No</CButton>
          <CButton color="danger" onClick={handleDelete}>Yes</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default StaffList;
