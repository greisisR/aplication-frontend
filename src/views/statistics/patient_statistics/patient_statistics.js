import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartScatter } from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'
import { Tooltip, Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables, Tooltip);

const AppointmentStats = () => {
  return (
    <CRow>
      <CCol xs={12}>
        
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Count of Appointments by Patients</CCardHeader>
          <CCardBody>
            <CChartScatter
              data={{
                datasets: [
                  {
                    label: 'Appointments',
                    backgroundColor: '#42A5F5',
                    borderColor: '#42A5F5',
                    data: [
                      { x: 1, y: 5, label: 'Patient Carlos' },
                      { x: 2, y: 10, label: 'Patient María' },
                      { x: 3, y: 3, label: 'Patient Juan' },
                      { x: 4, y: 8, label: 'Patient Camilo' },
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(tooltipItem) {
                        return tooltipItem.raw.label + ': ' + tooltipItem.raw.y;
                      }
                    }
                  },
                  datalabels: {
                    display: true,
                    formatter: (value) => value.label,
                    anchor: 'end',
                    align: 'start',
                  }
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Patients',
                    },
                    ticks: {
                      callback: function(value) {
                       
                        const patients = ['Patient Carlos', 'Patient María', 'Patient Juan', 'Patient Camilo'];
                        return patients[value - 1]; 
                      },
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Appointments',
                    },
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

export default AppointmentStats
