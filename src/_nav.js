import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilPeople,
  cilHeart,
  cilCalendar,
  cilHome,
  cilUser,
  cilGraph
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const getUserRoleFromLocalStorage = () => {
  const userData = JSON.parse(localStorage.getItem('user')); 
  const levelId = userData ? userData.level_id : 2; 
  console.log("Level ID del usuario:", levelId);
  return levelId;
}


const userRole = getUserRoleFromLocalStorage();

//0 = Admin, 1 = Doctor, 2 = Patient 
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    roles: [0, 1],  
  },
  {
    component: CNavGroup,
    name: 'Staff',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    roles: [0],
    items: [
      {
        component: CNavItem,
        name: 'Add',
        to: '/staff/add',
        roles: [0],
      },
      {
        component: CNavItem,
        name: 'List',
        to: '/staff/list',
        roles: [0],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Patient',
    icon: <CIcon icon={cilHeart} customClassName="nav-icon" />,
    roles: [0, 1], 
    items: [
      {
        component: CNavItem,
        name: 'Add',
        to: '/patient/add',
        roles: [0, 1],
      },
      {
        component: CNavItem,
        name: 'List',
        to: '/patient/list',
        roles: [0, 1], 
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Appointment',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    roles: [0, 1], 
    items: [
      {
        component: CNavItem,
        name: 'Add',
        to: '/appointment/add',
        roles: [0, 1],
      },
      {
        component: CNavItem,
        name: 'List',
        to: '/appointment/list',
        roles: [0, 1], 
      },
      {
        component: CNavItem,
        name: 'Assign Treatment',
        to: '/appointment/assigntreatment',
        roles: [0, 1], 
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Appointment',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    roles: [2], 
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/appointment/list',
        roles: [2], 
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Medical Office',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    roles: [0],
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/office/list',
        roles: [0], 
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'User Management',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    roles: [0], 
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/user_management/list',
        roles: [0], 
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Statistics',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    roles: [0], 
    items: [
      {
        component: CNavItem,
        name: 'Staff',
        to: '/statistics/staff_statistics',
        roles: [0], 
      },
      {
        component: CNavItem,
        name: 'Patient',
        to: '/statistics/patient_statistics',
        roles: [0], 
      },
      {
        component: CNavItem,
        name: 'Appointment',
        to: '/statistics/appointment_statistics',
        roles: [0], 
      },
      {
        component: CNavItem,
        name: 'Medical Office',
        to: '/statistics/office_statistics',
        roles: [0], 
      },
      {
        component: CNavItem,
        name: 'Treatment',
        to: '/statistics/treatment_statistics',
        roles: [0], 
      },
    ],
  },
]


const filteredNav = _nav.filter(item => {
  
  if (item.component === CNavGroup) {
   
    const hasAccessibleItem = item.items.some(subItem => subItem.roles?.includes(userRole));
    return item.roles.includes(userRole) || hasAccessibleItem;
  }
  
  return item.roles.includes(userRole);
});

export default filteredNav;
