import React from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom' // Importa useNavigate

const Register = () => {
  const navigate = useNavigate() 

  const handleRegister = (event) => {
    event.preventDefault() 

  
    const registrationSuccessful = true;

    if (registrationSuccessful) {
      navigate('./../dashboard/Dashboard.js') 
    }
  }



  return (
    <div style={{ backgroundColor: '#f0f0f0' }} className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}> {/* Agrega onSubmit al formulario */}
                  <h1>Registro</h1>
                  <p className="text-body-secondary">Crea tu cuenta</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type="number" placeholder="Cédula" autoComplete="username" required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type="email" placeholder="Correo electrónico" autoComplete="email" required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      autoComplete="new-password"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repita contraseña"
                      autoComplete="new-password"
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">Crear una cuenta</CButton> {}
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
