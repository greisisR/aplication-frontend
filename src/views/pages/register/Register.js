import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'confirmPassword') {
      setPasswordMatch(value === formData.password);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!passwordMatch) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      user_id: parseInt(formData.user_id),
      email: formData.email,
      password: formData.password,
      level_id: 2,
    };

    try {
      const response = await axios.post('http://localhost:8000/user', newUser);

      if (response.status === 201) {
        const user = response.data;

        localStorage.setItem('user', JSON.stringify(user));

        navigate('/dashboard');
      }
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0' }} className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Sign-up</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="number"
                      name="user_id"
                      placeholder="ID"
                      autoComplete="username"
                      value={formData.user_id}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="confirmPassword"
                      placeholder="Repeat Password"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  {!passwordMatch && (
                    <p style={{ color: 'red', marginTop: '-10px', marginBottom: '10px' }}>
                      Passwords do not match
                    </p>
                  )}
                  <div className="d-grid">
                    <CButton color="success" type="submit" disabled={!passwordMatch}>
                      Create an Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
