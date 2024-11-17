import React, { useState } from 'react'
import '../../../scss/login.scss'
import { Link, useNavigate } from 'react-router-dom'
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
  const [credentials, setCredentials] = useState({ id: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault()

    
    try {
      const response = await fetch('http://localhost:8000/user')
      if (!response.ok) {
        throw new Error('Unable to fetch user data')
      }
      const data = await response.json()

     
      const user = data.find(
        (user) => user.user_id === parseInt(credentials.id) && user.password === credentials.password
      )

      if (user) {
        
        localStorage.setItem('user', JSON.stringify(user))

      
        navigate('/dashboard')
      } else {
       
        setError('Incorrect ID or password')
      }
    } catch (err) {
      
      console.error('Error while verifying credentials', err)
      setError('Error processing the request')
    }
  }

  return (
    <div className="bg-body-secondary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Log in</h1>
                    <p className="text-body-secondary">Log in to your account</p>

                    {error && <p className="text-danger">{error}</p>}

                    {/* Input for ID (cedula) */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="ID"
                        autoComplete="username"
                        value={credentials.id}
                        onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                      />
                    </CInputGroup>
                    {/* Input for password */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={8}>
                        <CButton color="primary" className="px-4" type="submit">
                          Enter
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody>
                  <div>
                    <h2 className="text-center">Sign up</h2>
                    <p className="text-justify">
                      Create an account to access all our features and stay up-to-date with our latest updates. Enjoy a personalized experience and easily manage your preferences.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-8" active tabIndex={-1}>
                        Sign up now
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
