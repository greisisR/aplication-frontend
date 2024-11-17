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

const AddStaff = () => {
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
    email: '',
    specialty: ''
  });

  const [municipalities, setMunicipalities] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [filteredParishes, setFilteredParishes] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMunicipalities = await fetch('http://localhost:8000/municipality');
        const dataMunicipalities = await responseMunicipalities.json();
        setMunicipalities(dataMunicipalities);

        const responseParishes = await fetch('http://localhost:8000/parish');
        const dataParishes = await responseParishes.json();
        setParishes(dataParishes);

        const responseSpecialties = await fetch('http://localhost:8000/specialty');
        const dataSpecialties = await responseSpecialties.json();
        setSpecialties(dataSpecialties);
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


    let specialtyId = formData.specialty;

    const existingSpecialty = specialties.find(specialty => specialty.name === formData.specialty);
    if (!existingSpecialty) {
     
      const newSpecialty = {
        name: formData.specialty
      };

      try {
        const response = await fetch('http://localhost:8000/specialty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSpecialty),
        });
        const createdSpecialty = await response.json();
        specialtyId = createdSpecialty.specialty_id;  
      } catch (error) {
        console.error('Error creating specialty:', error);
        alert('Error creating specialty');
        return;
      }
    } else {
      specialtyId = existingSpecialty.specialty_id;
    }

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
      level_id: 1,
      status_id: 1,
      parish_id: formData.parish,
    };

    const newStaff = {
      staff_id: formData.idCard,
      specialty_id: specialtyId,
      user_id: formData.idCard,
    };

    try {
      // Guardar el nuevo usuario
      await fetch('http://localhost:8000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      // Guardar el nuevo staff con specialty_id
      await fetch('http://localhost:8000/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStaff),
      });

      alert('Data submitted successfully!');
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
            <strong>Add Staff</strong>
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
                <CFormLabel htmlFor="specialty" className="col-sm-2 col-form-label">Specialty</CFormLabel>
                <div className="col-sm-10">
                  <CFormSelect
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                  >
                    <option value="">Select Specialty</option>
                    {specialties.map((specialty) => (
                      <option key={specialty.specialty_id} value={specialty.name}>
                        {specialty.name}
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

              <CButton color="primary" type="submit">Submit</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddStaff;
