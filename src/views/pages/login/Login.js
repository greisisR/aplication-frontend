import React from 'react'
import '../../../scss/login.scss'
import { Link, useHref } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

const Login = () => {
  return (
    <div className="bg-body-secondary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Iniciar sesión</h1>
                    <p className="text-body-secondary">Inicia sesión en tu cuenta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Cédula" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={8}>
                        <CButton color="primary" className="px-4">
                          Ingresar
                        </CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody >
                  <div>
                    <h2 className="text-center">Registrate</h2>
                    <p  className='text-justify'>
                    Crea una cuenta para acceder a todas nuestras funciones y mantenerte al día con nuestras últimas actualizaciones. Disfruta de una experiencia personalizada y gestiona tus preferencias fácilmente.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-8" active tabIndex={-1}>
                        Registrarme ahora
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
