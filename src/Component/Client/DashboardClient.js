import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import './DashboardClient.css'

const DashboardClient = () => {

   // State for form fields
   const [formData, setFormData] = useState({
    candidate_firstname: '',
    candidate_lastname: '',
    job_title: '',
    job_industry: '',
    candidate_experience_from: '',
    candidate_experience_to: '',
    candidate_compensation_from: '',
    candidate_compensation_to: '',
    location_preference: 'any',
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

   // Handle input change
   const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Validation function
  const validateForm = () => {
    const validationErrors = {};

    if (!formData.candidate_firstname.trim()) {
      validationErrors.candidate_firstname = 'First name is required';
    }
    if (!formData.candidate_lastname.trim()) {
      validationErrors.candidate_lastname = 'Last name is required';
    }
    if (!formData.job_title.trim()) {
      validationErrors.job_title = 'Job title is required';
    }
    if (!formData.job_industry.trim()) {
      validationErrors.job_industry = 'Job industry is required';
    }
    if (minValue === '' || maxValue === '') {
      validationErrors.experience = 'Desired experience range is required';
    }
    if (CompensationminValue === '' || CompensationmaxValue === '') {
      validationErrors.compensation = 'Compensation range is required';
    }

    setErrors(validationErrors);

    // Return true if no errors
    return Object.keys(validationErrors).length === 0;
  };

   {/******Desired Exp Range Slider ******* */ }
   const [minValue, setMinValue] = useState(0);
   const [maxValue, setMaxValue] = useState(5);
   const minPrice = 0;
   const maxPrice = 59;
 
   {/***********End code *********** */ }

    {/***************************Code for *Desired Exp  range slider******************************** */ }
  // Handle change for minimum value
  const handleMinChange = event => {
    const value = Math.min(Number(event.target.value), maxValue - 1); // Prevents min from exceeding max
    setMinValue(value);
  };

  // Handle change for maximum value
  const handleMaxChange = event => {
    const value = Math.max(Number(event.target.value), minValue + 1); // Prevents max from falling below min
    setMaxValue(value);
  };

  {/********************************************************************************** */ }



  {/******Compensation Range Slider ******* */ }
  const [CompensationminValue, setCompensationMinValue] = useState(0);
  const [CompensationmaxValue, setCompensationMaxValue] = useState(0);
  const CompensationminPrice = 0;
  const CompensationmaxPrice = 10000;

  {/***********End code *********** */ }

   {/***************************Code for *Compensation  range slider******************************** */ }
 // Handle change for minimum value
 const CompensationhandleMinChange = event => {
   const Compensationvalue = Math.min(Number(event.target.value), CompensationmaxValue - 1); // Prevents min from exceeding max
   setCompensationMinValue(Compensationvalue);
 };

 // Handle change for maximum value
 const CompensationhandleMaxChange = event => {
   const Compensationvalue = Math.max(Number(event.target.value), CompensationminValue + 1); // Prevents max from falling below min
   setCompensationMaxValue(Compensationvalue);
 };

 {/********************************************************************************** */ }

// Handle form submission
const handleFormSubmit = (e) => {
  e.preventDefault();

  if (validateForm()) {
    // Proceed with form submission
    console.log('Form data:', formData);
  }
};

  return (
    <div>
      <div className='cdashboard-container '>
        <div className='clientDash-container container-fluid border'>
          <nav className="cdash-navbar bg-body">
            <ul className="cnav-links">
              <li><Link to="/searchprofile"> <i className="fa-solid fa-user"></i> Search Profile</Link></li>
              <li><Link to="/shortlistedCandidate"><i className="fa-solid fa-list"></i>  Shortlisted Candidate</Link></li>
              <li><Link to="/ClientReports"><i className="fa-solid fa-chart-simple"></i> Reports</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="accordion candidateForm-container container-fluid mt-3 bg-body shadow" id="accordionPanelsStayOpenExample">
        
        {/* First Accordion Item */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Regular Filter
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
            <div className="accordion-body">
              <div className='nameDive row g-2'>
                <div className="col-6">
                  <input type='text' name='candidate_firstname' placeholder='First Name *' className="form-control" />
                </div>
                <div className="col-6">
                  <input type='text' name='candidate_lastname' placeholder='Last Name *' className="form-control" />
                </div>
              </div>

              <div className='nameDive row g-2 mt-2'>
                <div className="col-6">
                  <input type='text' name='job_title' placeholder='Job Title *' className="form-control" />
                </div>
                <div className="col-6">
                  <input type='text' name='job_industry' placeholder='Job Industry *' className="form-control" />
                </div>
              </div>

             
                
                <div className='mb-1'>
                <label className='personalText'>Desire Experience <span className='mandate'>*</span></label>
                  <div className='price-slider'>
                      
                      <div className='slider'>
                        <input
                          type='range'
                          min={minPrice}
                          max={maxPrice}
                          value={minValue}
                          onChange={handleMinChange}
                          className='slider-thumb min-thumb'
                        />
                        <input
                          type='range'
                          min={minPrice}
                          max={maxPrice}
                          value={maxValue}
                          onChange={handleMaxChange}
                          className='slider-thumb max-thumb'
                        />
                        <div className='slider-track'></div>
                        <div
                          className='slider-range'
                          style={{
                            left: `${(minValue / maxPrice) * 100}%`,
                            right: `${100 - (maxValue / maxPrice) * 100}%`,
                          }}
                        >

                        </div>
                      </div>

                      <div className='slider-values'>
                        <input type="text" 
                        value={minValue} 
                        placeholder='From' 
                        name='candidate_experiance_from'
                        // value={formData.business_revenue_from}
                       
                        />

                        <input type="text" 
                        value={maxValue} 
                        placeholder='From' 
                        name='candidate_experiance_to'
                        //value={formData.business_revenue_to}
                        
                        />
                       
                      </div>
                    </div>
                    </div>
           

             
              <div className='mt-2 '>
                <label htmlFor="location" className="labelText">Location Preference  <span className='mandate'>* </span></label>
                <div className='d-flex'>
                  <div className="form-check me-2">
                    <input className="form-check-input" type="radio" name="candidate_anylocation" id="flexRadioDefault1" defaultChecked />
                    <label >
                      Any Location
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="candidate_specifiedlocation" id="flexRadioDefault2" />
                    <label >
                      Specific Location
                    </label>
                  </div>
                </div>
              </div>

              <div className='mt-3'>
                <label className="labelText"> <span className='colorText'>Compensation Range</span> *</label> <br />
                <div className='mb-1'>
                <label className='personalText'>Desire Experience <span className='mandate'>*</span></label>
                  <div className='price-slider'>
                      
                      <div className='slider'>
                        <input
                          type='range'
                          min={CompensationminPrice}
                          max={CompensationmaxPrice}
                          value={CompensationminValue}
                          onChange={CompensationhandleMinChange}
                          className='slider-thumb min-thumb'
                        />
                        <input
                          type='range'
                          min={CompensationminPrice}
                          max={CompensationmaxPrice}
                          value={CompensationmaxValue}
                          onChange={CompensationhandleMaxChange}
                          className='slider-thumb max-thumb'
                         
                        />
                        <div className='slider-track'></div>
                        <div
                          className='slider-range'
                          style={{
                            left: `${(CompensationminValue / CompensationmaxPrice) * 100}%`,
                            right: `${100 - (CompensationmaxValue / CompensationmaxPrice) * 100}%`,
                          }}
                        >

                        </div>
                      </div>

                      <div className='slider-values'>
                        <input type="text" 
                        value={CompensationminValue} 
                        placeholder='From' 
                        name='candidate_compensation_from'
                      
                       
                        />

                        <input type="text" 
                        value={CompensationmaxValue} 
                        placeholder='From' 
                        name='candidate_compensation_to'
                        
                        
                        />
                       
                      </div>
                    </div>
                    </div>
           
              </div>

             
            </div>
          </div>
        </div>

        {/* Second Accordion Item */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
              Advance Filter(Optional)
            </button>
          </h2>
          <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionPanelsStayOpenExample">
            <div className="accordion-body">
              
            <div className='nameDive row g-2 mt-2'>
                <div className="col-6">
                  <input type='text' name='candidate_education' placeholder='Education' className="form-control" />
                </div>
                <div className="col-6">
                  <input type='text' name='candidate_tierno' placeholder='Level - 1' className="form-control" />
                </div>
            </div>

            <div className='employmentStatus mt-3'>
              <select class="form-select" aria-label="Default select example" name='candidate_skills'>
                <option selected>Select Skills...</option>
                <option value="verbal">Verbal Communication</option>
                <option value="written">Written Communication </option>
                <option value="coding">Coding / Programming</option>
              </select>
            </div>


            <div className='nameDive row g-2 mt-2'>
                <div className="col-6">
                  <input type='text' name='candidate_certifications' placeholder='Canidates Certificates' className="form-control" />
                </div>
                <div className="col-6">
                <select class="form-select" aria-label="Default select example" name='candidate_language_reference'>
                <option selected>Select Language Preferance...</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
              </select>
                </div>
            </div>

            <div className='text-center'>
              <button className='submitCandidate btn-primary mt-4'  >Start Search</button>
            </div>
            </div>
          </div>
        </div>
      </div>
       
     
    </div>
  )
}

export default DashboardClient
