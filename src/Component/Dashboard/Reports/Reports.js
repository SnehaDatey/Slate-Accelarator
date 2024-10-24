import React from 'react'
import DashboardNav from '../DashboardNav'
import './Reports.css'
import DatePicker from 'react-datepicker';


const Reports = () => {
  return (
    <div>
      <DashboardNav />

      <div class="container-fluid mt-1 ">
 
  <ul class="nav nav-tabs border" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" 
      id="home-tab" data-bs-toggle="tab" 
      data-bs-target="#home" type="button" 
      role="tab" aria-controls="home" aria-selected="true">
        Candidate's Status Report
        </button>
    </li>

    <li class="nav-item" role="presentation">
      <button class="nav-link" id="profile-tab" 
      data-bs-toggle="tab" data-bs-target="#profile" 
      type="button" role="tab" aria-controls="profile" aria-selected="false">
        Recruiter Earning
        </button>
    </li>
  
  </ul>

 
  <div class="tab-content border" id="myTabContent">


    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
     
        <div className="datePicker p-3 d-flex gap-2">
        <DatePicker
                           dateFormat='dd/MM/yyyy'
                            
                            placeholderText="From year"
                            className="form-control"
                          />


                          <DatePicker
                            dateFormat='dd/MM/yyyy'
                                                   
                            placeholderText="To year"
                            className="form-control"
                          />


                        <select class="form-select form-select-sm w-25 candidateIndustry" >
                          <option selected>Industry/Sector</option>
                          <option value="Accounting">Accounting</option>
                          <option value="Airline">Airline</option>
                          <option value="Banking">Banking</option>
                          <option value="Software">Software</option>
                          <option value="ArtsCrafts">Arts / Crafts</option>
                        </select>

                        <button className='applyBtn btn-primary'>Apply</button>
                        <button className='dangerBtn btn-danger'><i class="fa-solid fa-clock-rotate-left"></i></button>

                        <input class="form-control me-2 w-25" type="search" placeholder="Search" aria-label="Search" />

                        <button className='exportBtn btn-success'>Export</button>
            </div>
    </div>



    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
     
      <p>This is the Recruiters Earning tab content.</p>
    </div>
   
  </div>
</div>

    </div>
  )
}

export default Reports