import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'

const StaffCharts = () => {
  return (
    <CRow>
      
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Total Appointments by Staff</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'],
                datasets: [
                  {
                    label: 'Total Appointments',
                    backgroundColor: '#4BC0C0',
                    data: [45, 30, 60, 20], 
                  },
                ],
              }}
              labels="staff members"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default StaffCharts
