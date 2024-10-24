import React from 'react'
import './DashboardNav.css'
import { Link } from 'react-router-dom'
import dashboardPng from '../../images/dashboard.png'

const DashboardNav = () => {
  return (
    <div className='dashboard-container container-fluid border bg-body'>
         <nav className="dash-navbar bg-body">
         <ul className="nav-links">
            <li><Link to="/dashboard"> <img src={dashboardPng} className='dashImg' alt="" /> Dashboard</Link></li>
            <li><Link to="/submitcandidate"> <i class="fa-solid fa-user-plus"></i> Submit Candidate</Link></li>
            <li><Link to="/reports"><i class="fa-solid fa-chart-simple"></i> Reports</Link></li>
        </ul>
        </nav>
    </div>
  )
}

export default DashboardNav