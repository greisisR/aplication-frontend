import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CFormSelect,
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
import { format, isThisWeek, isThisMonth } from 'date-fns';

const AppointmentList = () => {
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

  const [appointmentData, setAppointmentData] = useState(
    JSON.parse(localStorage.getItem('appointments')) || initialAppointmentData
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);  
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
        ? appointmentDateFormatted === todayDate
        : true;

    return matchesSearchTerm && matchesDateFilter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleEdit = (appointment) => {
    setAppointmentToEdit(appointment);
    setModalVisible(true); 
  };

  const handleSave = () => {
    
    setAppointmentData((prevData) =>
      prevData.map((appointment) =>
        appointment.appointmentId === appointmentToEdit.appointmentId ? appointmentToEdit : appointment
      )
    );
    setModalVisible(false); 
  };

  const handleDelete = () => {
    setAppointmentData((prevData) =>
      prevData.filter((appointment) => appointment.appointmentId !== appointmentToDelete)
    );
    setModalVisible(false);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Appointment List</strong>
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
                        <CButton color="info" size="sm" className="me-2">
                          View More
                        </CButton>
                        <CButton
                          color="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(appointment)} 
                        >
                          Update
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => {
                            setAppointmentToDelete(appointment.appointmentId);
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
          <strong>{appointmentToEdit ? 'Edit Appointment' : 'Delete Confirmation'}</strong>
        </CModalHeader>
        <CModalBody>
          {appointmentToEdit ? (
            <div>
              <CFormInput
                label="Doctor Name"
                value={appointmentToEdit.doctorName}
                onChange={(e) => setAppointmentToEdit({ ...appointmentToEdit, doctorName: e.target.value })}
                className="mb-3"
              />
              <CFormInput
                label="Patient Name"
                value={appointmentToEdit.patientName}
                onChange={(e) => setAppointmentToEdit({ ...appointmentToEdit, patientName: e.target.value })}
                className="mb-3"
              />
              <CFormInput
                label="Appointment Date"
                type="date"
                value={appointmentToEdit.appointmentDate}
                onChange={(e) => setAppointmentToEdit({ ...appointmentToEdit, appointmentDate: e.target.value })}
                className="mb-3"
              />
            </div>
          ) : (
            <p>Are you sure you want to delete this appointment?</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            No
          </CButton>
          {appointmentToEdit ? (
            <CButton color="primary" onClick={handleSave}>
              Save
            </CButton>
          ) : (
            <CButton color="danger" onClick={handleDelete}>
              Yes
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default AppointmentList;
