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

const AddPatient = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Treatment</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/form-control">
              <CForm>

                 {/* User ID */}
                 <CRow className="mb-3">
                  <CFormLabel htmlFor="User ID" className="col-sm-2 col-form-label">
                    User ID
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="number" id=" User ID" placeholder= "Enter ID card number" />
                  </div>
                </CRow>
                {/* User Type */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="User Type" className="col-sm-2 col-form-label">
                   User Type
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormSelect id="select" placeholder="User Type " />
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

export default AddPatient
