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

const AddTreatment = () => {
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
                {/* Treatment description */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="idCard" className="col-sm-2 col-form-label">
                  Description
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormTextarea id="idCard" placeholder="Enter the treatment description " />
                  </div>
                </CRow>

                {/* Observation */}
                 <CRow className="mb-3">
                  <CFormLabel htmlFor="idCard" className="col-sm-2 col-form-label">
                  Observation
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="tex" id="idCard" placeholder="Enter the observation" />
                  </div>
                </CRow>


               {/* Start date */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="Start date" className="col-sm-2 col-form-label">
                  Start date 
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="date" id="Start date" />
                  </div>
                </CRow>

                      {/* End date */}
                      <CRow className="mb-3">
                  <CFormLabel htmlFor="End date" className="col-sm-2 col-form-label">
                  End date
                  </CFormLabel>
                  <div className="col-sm-10">
                    <CFormInput type="date" id="End date" />
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

export default AddTreatment
