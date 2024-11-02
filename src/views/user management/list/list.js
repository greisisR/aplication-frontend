import React from 'react'
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
} from '@coreui/react'

const UserList = () => {

  const userData = [
    {
      userId: '30609563',
      firstName: 'Camilo',
      lastName: 'Rodriguez',
      role: 'Administrator',
    },
    {
      userId: '1589042',
      firstName: 'Ana',
      lastName: 'Gomez',
      role: 'Doctor',
    },
    {
      userId: '16409178',
      firstName: 'Luis',
      lastName: 'Martinez',
      role: 'Patient',
    },
  ]

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User List</strong>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable hover>
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
                  {userData.map((user, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{user.userId}</CTableDataCell>
                      <CTableDataCell>{user.firstName}</CTableDataCell>
                      <CTableDataCell>{user.lastName}</CTableDataCell>
                      <CTableDataCell>{user.role}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="danger" className="me-2">Delete</CButton>
                        <CButton color="warning" className="me-2">Update</CButton>
                        <CButton color="info">View More</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserList
