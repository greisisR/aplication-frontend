import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'

const ConsultingRoomUsageLineChart = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout
          name="Consulting Room Usage Line Chart"
          href="components/chart"
          content="This line chart displays the number of times a consulting room has been used per month."
        />
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
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light color for the area under the line
                    borderColor: '#4BC0C0', // Color for the line
                    borderWidth: 2, // Width of the line
                    pointBackgroundColor: '#fff', // Point color
                    pointBorderColor: '#4BC0C0', // Point border color
                    data: [10, 15, 8, 12, 20, 18, 22, 25, 30, 27, 15, 10], // Sample data for usage per month
                    fill: true, // Fill the area under the line
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Months', // Label for the x-axis
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Uses', // Label for the y-axis
                    },
                    beginAtZero: true, // Ensure y-axis starts from zero
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
