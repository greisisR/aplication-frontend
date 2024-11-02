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
  CFormSelect,
} from '@coreui/react';
import { format, isThisWeek, isThisMonth } from 'date-fns';

const Assigntreatment= () => {
  const initialAppointmentData = [
    {
      appointmentId: 1,
      doctorId: 101,
      doctorName: 'Dr. Carlos',
      patientId: 201,
      patientName: 'Luis Martínez',
      appointmentDate: '2024-10-15',
    },
    {
      appointmentId: 2,
      doctorId: 102,
      doctorName: 'Dr. Juan',
      patientId: 202,
      patientName: 'María González',
      appointmentDate: '2024-10-29',
    },
    {
      appointmentId: 3,
      doctorId: 103,
      doctorName: 'Dr. Marcos',
      patientId: 205,
      patientName: 'José Rodríguez',
      appointmentDate: '2024-10-31',
    },
    {
      appointmentId: 4,
      doctorId: 104,
      doctorName: 'Dr. Marcos',
      patientId: 205,
      patientName: 'José Rodríguez',
      appointmentDate: '2024-09-25',
    },
    
    
  ];

  const [appointmentData, setAppointmentData] = useState(initialAppointmentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const todayDate = format(new Date(), 'yyyy-MM-dd'); 

  const filteredData = appointmentData.filter((appointment) => {
    const matchesSearchTerm = `${appointment.doctorId} ${appointment.doctorName} ${appointment.patientId} ${appointment.patientName} ${appointment.appointmentDate}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  

    const appointmentDateFormatted = format(new Date(appointment.appointmentDate + 'T00:00:00'), 'yyyy-MM-dd'); 

    const matchesDateFilter =
      dateFilter === 'week'
        ? isThisWeek(new Date(appointment.appointmentDate + 'T00:00:00'))
        : dateFilter === 'month'
        ? isThisMonth(new Date(appointment.appointmentDate + 'T00:00:00'))
        : dateFilter === 'day'
        ? appointmentDateFormatted === todayDate // Compara directamente con la fecha de hoy
        : true;

    return matchesSearchTerm && matchesDateFilter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Assign Treatment</strong>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            <CFormSelect
              className="mb-3"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </CFormSelect>

            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Doctor ID</CTableHeaderCell>
                  <CTableHeaderCell>Doctor</CTableHeaderCell>
                  <CTableHeaderCell>Patient ID</CTableHeaderCell>
                  <CTableHeaderCell>Patient</CTableHeaderCell>
                  <CTableHeaderCell>Appointment Date</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentData.length > 0 ? (
                  currentData.map((appointment) => (
                    <CTableRow key={appointment.appointmentId}>
                      <CTableDataCell>{appointment.doctorId}</CTableDataCell>
                      <CTableDataCell>{appointment.doctorName}</CTableDataCell>
                      <CTableDataCell>{appointment.patientId}</CTableDataCell>
                      <CTableDataCell>{appointment.patientName}</CTableDataCell>
                      <CTableDataCell>{format(new Date(appointment.appointmentDate + 'T00:00:00'), 'yyyy-MM-dd')}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="warning" size="sm" className="me-2">
                          Update
                        </CButton>
                        <CButton color="info" size="sm" className="me-2">
                          Assign Treatment
                        </CButton>
                        <CButton color="danger" size="sm">
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

export default Assigntreatment;
