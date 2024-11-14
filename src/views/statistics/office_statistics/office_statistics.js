import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'

const ConsultingRoomUsageLineChart = () => {
  return (
    <CRow>
      <CCol xs={12}>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Consulting Room Usage by Month</CCardHeader>
          <CCardBody>
            <CChartLine
              data={{
                labels: [
                  'January', 
                  'February', 
                  'March', 
                  'April', 
                  'May', 
                  'June', 
                  'July', 
                  'August', 
                  'September', 
                  'October', 
                  'November', 
                  'December'
                ],
                datasets: [
                  {
                    label: 'Consulting Room Usage',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: '#4BC0C0',
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#4BC0C0',
                    data: [10, 15, 8, 12, 20, 18, 22, 25, 30, 27, 15, 10],
                    fill: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Months',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Uses',
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ConsultingRoomUsageLineChart
