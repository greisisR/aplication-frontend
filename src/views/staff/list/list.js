import React, { useEffect, useState } from 'react';
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

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [specialtyData, setSpecialtyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
                      <CTableDataCell>{staff.specialty_name}</CTableDataCell> {/* Usamos el nombre de la especialidad */}
                      <CTableDataCell>{staff.address}</CTableDataCell>
                      <CTableDataCell>
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

export default StaffList;
