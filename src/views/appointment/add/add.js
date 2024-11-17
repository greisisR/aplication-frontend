import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react';

const AddAppointment = () => {
  const [formData, setFormData] = useState({
    patient: '',
    office: '',
    appointmentDate: '',
  });

  const [patients, setPatients] = useState([]);
  const [offices, setOffices] = useState([]);

 
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:8000/user');
        const data = await response.json();
        
        const patientList = data.filter((user) => user.level_id === 2);
        setPatients(patientList);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    
    const fetchOffices = async () => {
      try {
        const response = await fetch('http://localhost:8000/office');
        const data = await response.json();
        setOffices(data);
      } catch (error) {
        console.error('Error fetching offices:', error);
      }
    };

    fetchPatients();
    fetchOffices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const appointmentData = {
      patient_id: formData.patient,  
      office_id: formData.office,    
      date: formData.appointmentDate, 
      staff_id: 30609563,            
    };

    try {
     
      const response = await fetch('http://localhost:8000/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to save the appointment');
      }

      const result = await response.json();
      console.log('Appointment saved:', result);
      
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Appointment</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Patient Select */}
              <CRow className="mb-3">
                <CFormLabel htmlFor="patient" className="col-sm-2 col-form-label">
                  Patient
                </CFormLabel>
                <div className="col-sm-10">
                  <CFormSelect
                    id="patient"
                    name="patient"
                    value={formData.patient}
                    onChange={handleChange}
                  >
                    <option value="">Select the patient</option>
                    {patients.map((patient) => (
                      <option key={patient.user_id} value={patient.user_id}>
                        ({patient.user_id}) {`${patient.firstname} ${patient.surname}`}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="office" className="col-sm-2 col-form-label">
                  Office name
                </CFormLabel>
                <div className="col-sm-10">
                  <CFormSelect
                    id="office"
                    name="office"
                    value={formData.office}
                    onChange={handleChange}
                  >
                    <option value="">Select office name</option>
                    {offices.map((office) => (
                      <option key={office.office_id} value={office.office_id}>
                        {office.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="appointmentDate" className="col-sm-2 col-form-label">
                  Appointment date
                </CFormLabel>
                <div className="col-sm-10">
                  <CFormInput
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <div className="col-sm-10 offset-sm-2">
                  <CButton color="primary" type="submit">
                    Submit
                  </CButton>
                </div>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddAppointment;
