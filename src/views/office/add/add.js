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

const AddOffice = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Office</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/form-control">
              <CForm>
                
                <CRow className="mb-3">
                  <CFormLabel htmlFor="idCard" className="col-sm-2 col-form-label">
                    ID Number
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="number" id="idCard" placeholder="Enter ID card number" />
                  </div>
                </CRow>

                 <CRow className="mb-3">
                  <CFormLabel htmlFor="idCard" className="col-sm-2 col-form-label">
                     Office name
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="tex" id="idCard" placeholder="Office name" />
                  </div>
                </CRow>

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

export default AddOffice
