import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CFormSelect,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const AddStaff = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Staff</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/form-control">
              <CForm>
                {/* ID Card */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="idCard" className="col-sm-2 col-form-label">
                    ID Card
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="number" id="idCard" placeholder="Enter your ID card number" />
                  </div>
                </CRow>

                {/* First Name */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="firstName" className="col-sm-2 col-form-label">
                    First Name
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="text" id="firstName" placeholder="Enter your first name" />
                  </div>
                </CRow>

                {/* Second Name */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="secondName" className="col-sm-2 col-form-label">
                    Second Name
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="text" id="secondName" placeholder="Enter your second name" />
                  </div>
                </CRow>

                {/* First Surname */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="firstSurname" className="col-sm-2 col-form-label">
                    First Surname
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="text" id="firstSurname" placeholder="Enter your first surname" />
                  </div>
                </CRow>

                {/* Second Surname */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="secondSurname" className="col-sm-2 col-form-label">
                    Second Surname
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="text" id="secondSurname" placeholder="Enter your second surname" />
                  </div>
                </CRow>

                {/* Gender */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="gender" className="col-sm-2 col-form-label">
                    Gender
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormSelect id="gender">
                      <option value="">Select your gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </CFormSelect>
                  </div>
                </CRow>

                {/* Date of Birth */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="dateOfBirth" className="col-sm-2 col-form-label">
                    Date of Birth
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="date" id="dateOfBirth" />
                  </div>
                </CRow>

                {/* Specialty */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="specialty" className="col-sm-2 col-form-label">
                    Specialty
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="text" id="specialty" placeholder="Enter your specialty" />
                  </div>
                </CRow>

                {/* Phone Number */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="phone" className="col-sm-2 col-form-label">
                    Phone Number
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="tel" id="phone" placeholder="Enter your phone number" />
                  </div>
                </CRow>

                {/* Municipality */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="municipality" className="col-sm-2 col-form-label">
                    Municipality
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormSelect id="municipality">
                      <option value="">Select a municipality</option>
                      <option value="Municipality1">Municipality 1</option>
                      <option value="Municipality2">Municipality 2</option>
                      <option value="Municipality3">Municipality 3</option>
                    </CFormSelect>
                  </div>
                </CRow>

                {/* Parish */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="parish" className="col-sm-2 col-form-label">
                    Parish
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormSelect id="parish">
                      <option value="">Select a parish</option>
                      <option value="Parish1">Parish 1</option>
                      <option value="Parish2">Parish 2</option>
                      <option value="Parish3">Parish 3</option>
                    </CFormSelect>
                  </div>
                </CRow>

                {/* Address */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">
                    Address
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormTextarea id="address" rows="3" placeholder="Enter your address"></CFormTextarea>
                  </div>
                </CRow>

                {/* Email */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="email" id="email" placeholder="Enter your email" />
                  </div>
                </CRow>

                {/* Submit Button */}
                <CRow className="mb-3">
                  <div className="col-sm-10 offset-sm-2">
                    <CButton color="primary" type="submit">Submit</CButton>
                  </div>
                </CRow>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddStaff
