import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'

const TreatmentStats = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout
          name="Treatment Stats Chart"
          href="components/chart"
          content="This doughnut chart illustrates the count of treatments assigned to each staff member."
        />
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Count of Treatments Assigned by Staff</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={{
                labels: ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'],
                datasets: [
                  {
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                    data: [25, 40, 35, 15], // Sample data for treatments
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TreatmentStats
