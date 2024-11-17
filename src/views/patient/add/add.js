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

const AddPatient = () => {
  const [formData, setFormData] = useState({
    idCard: '',
    firstName: '',
    secondName: '',
    firstSurname: '',
    secondSurname: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
    municipality: '',
    parish: '',
    address: '',
    email: ''
  });

  const [municipalities, setMunicipalities] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [filteredParishes, setFilteredParishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMunicipalities = await fetch('http://localhost:8000/municipality');
        const dataMunicipalities = await responseMunicipalities.json();
        setMunicipalities(dataMunicipalities);

        const responseParishes = await fetch('http://localhost:8000/parish');
        const dataParishes = await responseParishes.json();
        setParishes(dataParishes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = parishes.filter(parish => parish.municipality_id === Number(formData.municipality));
    setFilteredParishes(filtered);
  }, [formData.municipality, parishes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      user_id: formData.idCard,
      firstname: formData.firstName,
      middlename: formData.secondName,
      surname: formData.firstSurname,
      secondsurname: formData.secondSurname,
      date_birth: formData.dateOfBirth,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender,
      level_id: 2, 
      status_id: 1, 
      parish_id: formData.parish,
    };

    try {
     
      const responseUser = await fetch('http://localhost:8000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const createdUser = await responseUser.json();

      
      const newPatient = {
        patient_id: formData.idCard,
        user_id: createdUser.user_id,
      };

      const responsePatient = await fetch('http://localhost:8000/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });
      await responsePatient.json();

      alert('Patient data submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Patient</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Campos del formulario */}
              <CRow className="mb-3">
                <CFormLabel htmlFor="idCard" className="col-sm-2 col-form-label">ID Card</CFormLabel>
                <div className="col-sm-10">
                  <CFormInput
                    type="number"
                    id="idCard"
                    name="idCard"
                    value={formData.idCard}
                    onChange={handleChange}
                    placeholder="Enter your ID card number"
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="firstName" className="col-sm-2 col-form-label">First Name</CFormLabel>
                <div className="col-sm-10">
                  <CFormInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="secondName" className="col-sm-2 col-form-label">Second Name</CFormLabel>
                <div className="col-sm-10">
                  <CFormInput
                    type="text"
                    id="secondName"
                    name="secondName"
                    value={formData.secondName}
                    onChange={handleChange}
                    placeholder="Enter your second name (optional)"
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="firstSurname" className="col-sm-2 col-form-label">First Surname</CFormLabel>
                <div className="col-sm-10">
                  <CFormInput
                    type="text"
                    id="firstSurname"
                    name="firstSurname"
                    value={formData.firstSurname}
                    onChange={handleChange}
                    placeholder="Enter your first surname"
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="secondSurname" className="col-sm-2 col-form-label">Second Surname</CFormLabel>
                <div className="col-sm-10">
                  <CFormInput
                    type="text"
                    id="secondSurname"
                    name="secondSurname"
                    value={formData.secondSurname}
                    onChange={handleChange}
                    placeholder="Enter your second surname (optional)"
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="gender" className="col-sm-2 col-form-label">Gender</CFormLabel>
                <div className="col-sm-10">
                  <CFormSelect
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </CFormSelect>
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="dateOfBirth" className="col-sm-2 col-form-label">Date of Birth</CFormLabel>
                <div className="col-sm-10">
                  <CFormInput
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Enter your date of birth"
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="phone" className="col-sm-2 col-form-label">Phone Number</CFormLabel>
                <div className="col-sm-10">
                  <CFormInput
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="municipality" className="col-sm-2 col-form-label">Municipality</CFormLabel>
                <div className="col-sm-10">
                  <CFormSelect
                    id="municipality"
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleChange}
                  >
                     <option value="">Select Municipality</option>
                    {municipalities.map((municipality) => (
                      <option key={municipality.municipality_id} value={municipality.municipality_id}>
                        {municipality.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="parish" className="col-sm-2 col-form-label">Parish</CFormLabel>
                <div className="col-sm-10">
                  <CFormSelect
                    id="parish"
                    name="parish"
                    value={formData.parish}
                    onChange={handleChange}
                  >
                     <option value="">Select Parish</option>
                    {filteredParishes.map((parish) => (
                      <option key={parish.parish_id} value={parish.parish_id}>
                        {parish.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">Address</CFormLabel>
                <div className="col-sm-10">
                  <CFormInput
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email</CFormLabel>
                <div className="col-sm-10">
                  <CFormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
              </CRow>

              <CButton type="submit" color="primary">
                Save Patient
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddPatient;
