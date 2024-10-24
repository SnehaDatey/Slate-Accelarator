import React from 'react'
import './Dashboard.css'
import DashboardNav from '../DashboardNav'

const Dashboard = () => {
  return (
    <div>
      <DashboardNav />

      <div className='dashboard-container container bg-body mt-2'>
        <h2 className='text-center'> Welcome to Dashboard</h2>
      </div>
         
    </div>
  )
}

export default Dashboard