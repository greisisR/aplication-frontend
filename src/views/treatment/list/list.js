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

const TreatmentList = () => {

  const treatmentData = [
    {
      doctorId: '1589042',
      doctorName: 'Dr. Camilo Rodriguez',
      patientId: '29056463',
      patientName: 'Greisis Ramirez',
      startDate: '2024-10-05',
      endDate: '2025-01-05',
    },
    {
      doctorId: '1589043',
      doctorName: 'Dr. Ana Gomez',
      patientId: '29056464',
      patientName: 'Luis Martinez',
      startDate: '2024-11-12',
      endDate: '2025-02-12',
    },
    {
      doctorId: '1589044',
      doctorName: 'Dr. Juan Rojas',
      patientId: '29056465',
      patientName: 'Maria Perez',
      startDate: '2024-12-01',
      endDate: '2025-03-01',
    },
  ]

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Treatment List</strong>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Doctor ID</CTableHeaderCell>
                    <CTableHeaderCell>Doctor Name</CTableHeaderCell>
                    <CTableHeaderCell>Patient ID</CTableHeaderCell>
                    <CTableHeaderCell>Patient Name</CTableHeaderCell>
                    <CTableHeaderCell>Start Date</CTableHeaderCell>
                    <CTableHeaderCell>End Date</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {treatmentData.map((treatment, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{treatment.doctorId}</CTableDataCell>
                      <CTableDataCell>{treatment.doctorName}</CTableDataCell>
                      <CTableDataCell>{treatment.patientId}</CTableDataCell>
                      <CTableDataCell>{treatment.patientName}</CTableDataCell>
                      <CTableDataCell>{treatment.startDate}</CTableDataCell>
                      <CTableDataCell>{treatment.endDate}</CTableDataCell>
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

export default TreatmentList
