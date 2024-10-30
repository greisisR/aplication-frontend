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

const AddAppointment= () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Appointment</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/form-control">
              <CForm>
                {/* ID Card Staff */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="idCard" className="col-sm-2 col-form-label">
                    Staff ID Number
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="number" id="idCard" placeholder="Enter ID card number" />
                  </div>
                </CRow>

                {/* ID Card Patient */}
                 <CRow className="mb-3">
                  <CFormLabel htmlFor="idCard" className="col-sm-2 col-form-label">
                     Patient ID Number
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="number" id="idCard" placeholder="Enter ID card number" />
                  </div>
                </CRow>


                {/* Office name */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="Office name" className="col-sm-2 col-form-label">
                    Office name
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormSelect type="select" id="Office name" placeholder="Enter office name" />
                  </div>
                </CRow>

               {/* Appointment date */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="dateOfBirth" className="col-sm-2 col-form-label">
                    Appointment date
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="date" id="dateOfBirth" />
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

export default AddAppointment
