import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'

const MonthlyAppointments = () => {
  return (
    <CRow>
      
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Count of Appointments by Month</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                  {
                    label: 'Appointments',
                    backgroundColor: '#42A5F5',
                    data: [12, 19, 7, 15, 10, 20, 13, 18, 25, 22, 30, 10], // Sample data for each month
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MonthlyAppointments
