import { element } from 'prop-types'
import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

//staff
const AddStaff = React.lazy(() => import('./views/staff/add/add'))
const ListStaff = React.lazy(() => import('./views/staff/list/list'))
const UpdateStaff = React.lazy(() => import('./views/staff/update/update'))

//patient
const AddPatient = React.lazy(() => import('./views/patient/add/add'))
const ListPatient = React.lazy(() => import('./views/patient/list/list'))
const UpdatePatient = React.lazy(() => import('./views/patient/update/update'))

//Appointment
const AddAppointment = React.lazy(() => import('./views/appointment/add/add'))
const TotalList = React.lazy(() => import('./views/appointment/list/list'))
const Assign = React.lazy(() => import('./views/appointment/assigntreatment/assigntreatment'))

//Office
const ListOffice = React.lazy(() => import('./views/office/list/list'))



//User management
const ListUsermang = React.lazy(() => import('./views/user_management/list/list'))

//Statistics
const StatisticsStaff = React.lazy(() => import('./views/statistics/staff_statistics/staff_statistics'))
const StatisticsPatient = React.lazy(() => import('./views/statistics/patient_statistics/patient_statistics'))
const StatisticsOffice = React.lazy(() => import('./views/statistics/office_statistics/office_statistics'))
const StatisticsAppointment= React.lazy(() => import('./views/statistics/appointment_statistics/appointment_statistics'))
const StatisticsTrearment = React.lazy(() => import('./views/statistics/treatment_statistics/treatment_statistics'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard},

  //Staff
  { path: '/staff/add', name: "staff / Add", element: AddStaff},
  { path: '/staff/list', name: "staff / List", element: ListStaff},
  { path: '/staff/update', name: "staff / Update", element: UpdateStaff},

  //patient
  { path: '/patient/add', name: "Patient / Add ", element: AddPatient},
  { path: '/patient/list', name: "Patient / List", element: ListPatient},
  { path: '/patient/update', name: "Patient / Update", element: UpdatePatient},
  //appointment 
  
  { path: '/appointment/add', name: "Appointment / Add", element: AddAppointment},
  { path: '/appointment/list', name: "Appointment / List", element: TotalList},
  { path: '/appointment/assigntreatment', name: "Appointment / Assigntreatment", element: Assign},

  //office 
  
  { path: '/office/list', name: "Office / List", element: ListOffice},


//User management
  
  { path: '/user_management/list', name: "User Management / List ", element: ListUsermang},  

//Statistics
  { path: '/statistics/staff_statistics', name: "Statistics / Staff Statistics", element: StatisticsStaff},
  { path: '/statistics/patient_statistics', name: "Statistics / Patient Statistics", element: StatisticsPatient},
  { path: '/statistics/office_statistics', name: "Statistics / Office Statistics ", element: StatisticsOffice},
  { path: '/statistics/appointment_statistics', name: "Statistics / Appointment Statistics", element: StatisticsAppointment},
  { path: '/statistics/treatment_statistics', name: "Statistics / Treatment Statistics ", element: StatisticsTrearment}, 

]

export default routes
