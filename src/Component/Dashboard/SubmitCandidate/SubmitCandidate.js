import React, { useState } from 'react';
import { saveCandidate } from '../../../Services/apiServices'; // Import the saveCandidate function
import DashboardNav from '../DashboardNav';
import fileLogo from '../../../images/upload.png';
import './Style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const SubmitCandidate = () => {

  const [formData, setFormData] = useState({
    candidate_firstname: "",
    candidate_lastname: "",
    candidate_email: "",
    candidate_contactno: "",
    candidate_status: "inactive",
    candidate_education: "",
    candidate_university: "",
    candidate_anylocation: "any" ?? false,
    candidate_specifiedlocation: [],
    candidate_expertise: [],
    candidate_skills: [],
    candidate_language_reference: '',
    candidate_notes: "",
    candidate_compensation_from: 100,
    candidate_compensation_to: 1000,
    total_cash_compensation: 0,
    business_revenue_from: 100,
    business_revenue_to: 1000,
    candidate_certifications: [],
    candidate_company: [],
    user_id: "1",
    user_type: "recruiter",
    isdownloaded: false,
    candidate_experiance: "",
    candidate_emplymentstatus: "",
    candidate_currentcompensation: 0,
    candidate_tierno: 1, // for admin 2
    candidate_clientid: "",
    candidate_acceptdate: "",
    candidate_statusinfo: '',
    candidate_clientcommission: 0,
    invoice_no: "",
    candidate_cleintcomm_payment: "",
    candidate_hiredate: "",
    candidate_baseamount: 0,
    candidate_bonusamount: 0,

  });

  const [resumeFile, setResumeFile] = useState(null);
  const [showCompanyForm, setShowCompanyForm] = useState(false); // Toggle for company form
  const [isEditing, setIsEditing] = useState(false); // Track if editing a company
  const [editIndex, setEditIndex] = useState(null);  // Store the index of the company being edited
  // Code for Range Bar
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const minPrice = 0;
  const maxPrice = 1000;

  //Code For Compensation range bar
  const [CompensationMinValue, setCompensationMinValue] = useState(0);
  const [CompensationMaxValue, setCompensationMaxValue] = useState(100);
  const CompensationMinPrice = 0;
  const CompensationMaxPrice = 1000;

  //code for validation errors
  const [errors, setErrors] = useState({});

   const validateForm = () => {
    const errors = {};
    
    if (!formData.candidate_firstname) {
        errors.candidate_firstname = "First Name is required.";
    }
    if (!formData.candidate_lastname) {
        errors.candidate_lastname = "Last Name is required.";
    }
    if (!formData.candidate_email) {
      errors.candidate_email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.candidate_email)) {
      errors.candidate_email = "Email is not valid.";
  }
  if (!formData.candidate_contactno) {
    errors.candidate_contactno = "Mobile number is required.";
} else if (!/^\d{10}$/.test(formData.candidate_contactno)) {
    errors.candidate_contactno = "Mobile number must be exactly 10 digits.";
}

    if (!formData.candidate_education) {
        errors.candidate_education = "Educational details are required.";
    }
    if (!formData.candidate_university) {
        errors.candidate_university = "University name is required.";
    }
    // if (!formData.employment_status) {
    //   errors.employment_status = 'Employment status is required.';
    // }
    if (!formData.candidate_language_reference) {
    errors.candidate_language_reference = 'Select Language preference.';
    }
    if (!formData.total_cash_compensation) {
      errors.total_cash_compensation = 'Cash Compensation is required.';
      }
      if (!formData.candidate_notes) {
        errors.candidate_notes = 'Notes required.';
        }

    return errors;
};

  const [companyDetails, setCompanyDetails] = useState({
    company_name: '',
    isPresent: false,
    from_year: null, // Date object for start year
    to_year: null,   // Date object for end year
    job_title: '',
    job_industry: '',
    achievements: ''
  });

  const [companyList, setCompanyList] = useState([]); // Store added companies

  // Handle changes in the main form
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure that the value is a number and restrict it to 10 digits
    if (name === 'candidate_contactno' && value.length > 10) {
        return; // Prevent further input
    }


    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date, field) => {
    setCompanyDetails({
      ...companyDetails,
      [field]: date
    });
  };

  // Handle company information form changes
  const handleCompanyChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCompanyDetails({
      ...companyDetails,
      [name]: type === 'checkbox' ? checked : value,
  });

    // setCompanyDetails({
    //   ...companyDetails,
    //   [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    // });
  };

  // Add or update company information
  const handleAddOrUpdateCompany = () => {

    if (companyDetails.company_name && companyDetails.job_title) {
      // Format the dates for display (use 'en-GB' for dd/MM/yyyy format)
      const formattedCompany = {
        ...companyDetails,
        from_year: companyDetails.from_year ? companyDetails.from_year.toLocaleDateString('en-GB') : null,
        to_year: companyDetails.to_year ? companyDetails.to_year.toLocaleDateString('en-GB') : null
      };

      setFormData(prevState => ({
        ...prevState,
        candidate_company: [...prevState.candidate_company, companyDetails],
    }));

      if (isEditing) {
        // Update the company at the specified index
        const updatedCompanyList = [...companyList];
        updatedCompanyList[editIndex] = formattedCompany;
        setCompanyList(updatedCompanyList);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        // Add new company to the list
        setCompanyList([...companyList, formattedCompany]);
      }

      // Clear the form after adding/updating
      setCompanyDetails({
        company_name: '',
        isPresent: false,
        from_year: null,
        to_year: null,
        job_title: '',
        job_industry: '',
        achievements: ''
      });
    }
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    setResumeFile(file.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // Prevent submission if there are validation errors
    }


    const formDataToSend = new FormData();

    formDataToSend.append('jsonData', JSON.stringify(formData));
    if (resumeFile) {
      formDataToSend.append('resumeDocument', resumeFile);
    }
    console.log(formData.candidate_company); 
     // Log the contents of formDataToSend
     for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
  }

    try {
      const response = await saveCandidate(formDataToSend);
      console.log(response.data)
      alert('Candidate information submitted successfully!');
    } catch (error) {
      alert('Error submitting candidate information');
    }
  };

  // Handle edit
  const handleEditCompany = (index) => {
    const companyToEdit = companyList[index];
    setCompanyDetails({
      ...companyToEdit,
      from_year: companyToEdit.from_year ? new Date(companyToEdit.from_year.split('/').reverse().join('-')) : null,
      to_year: companyToEdit.to_year ? new Date(companyToEdit.to_year.split('/').reverse().join('-')) : null
    });
    setIsEditing(true);
    setEditIndex(index);
    setShowCompanyForm(true);
  };

  // Handle delete
  const handleDeleteCompany = (index) => {
    const updatedList = companyList.filter((_, i) => i !== index);
    setCompanyList(updatedList);
  };


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

 
  // Handle change for minimum value
  const handleMinChangeCompensation = event => {
    const value = Math.min(Number(event.target.value), maxValue - 1); // Prevents min from exceeding max
    setCompensationMinValue(value);
  };

  // Handle change for maximum value
  const handleMaxChangeCompensation = event => {
    const value = Math.max(Number(event.target.value), minValue + 1); // Prevents max from falling below min
    setCompensationMaxValue(value);
  };

 

  return (
    <div>
      <DashboardNav />

      <div className='sc-container container mt-3'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='uploadResume col-4 border'>
              <p className='boldHeading'> Upload Candidate's Resume</p>
              <div className="mb-3 bg-body fileUpload ">
                <img src={fileLogo} alt="filelogo" />
                <input type="file" accept=".pdf, .png, .jpg" onChange={handleFileUpload} />
                <p className='uploadFileText'>(Select file up to 10MB in PDF, PNG, and JPG format only)</p>
              </div>
            </div>

            <div className='candidateInfo col-8 border'>
              <p>
                <div className='candidateInfoInactiveTab'>
                  <p className='boldHeading'>Candidate's Information</p>
                  <span className='inactiveClass'>Inactive</span>
                </div>
              </p>

              <div className='row  bg-body candidateInfoForm'>
                <p className='personalText '>Personal Information</p>

                <div className='nameDive row g-2 mb-2'>
                  <div className="col-6">
                    <input
                      type='text'
                      name='candidate_firstname'
                      placeholder='First Name *'
                      className="form-control"
                      value={formData.candidate_firstname}
                      onChange={handleChange}
                    />

                    <div>
                    {errors.candidate_firstname && <span className="text-danger">{errors.candidate_firstname}</span>}
                    </div>
                  </div>
                  

                  <div className="col-6">
                    <input
                      type='text'
                      name='candidate_lastname'
                      placeholder='Last Name *'
                      className="form-control"
                      value={formData.candidate_lastname}
                      onChange={handleChange}
                      maxLength={10} // Restrict input length to 10
                    />
                     <div>
                    {errors.candidate_lastname && <span className="text-danger">{errors.candidate_lastname}</span>}
                    </div>

                  </div>
                </div>

                <div className='emailMobDiv row g-2'>
                  <div className="col-6">
                    <input
                      type='email'
                      name='candidate_email'
                      placeholder='Email *'
                      className="form-control"
                      value={formData.candidate_email}
                      onChange={handleChange}
                    />
                    <div>
                    {errors.candidate_email && <span className="text-danger">{errors.candidate_email}</span>}
                    </div>
                  </div>

                  <div className="col-6">
                    <input
                      type='number'
                      name='candidate_contactno'
                      placeholder='Mobile *'
                      className="form-control"
                      value={formData.candidate_contactno}
                      onChange={handleChange}
                    />

                    <div> {errors.candidate_contactno && <span className="text-danger">{errors.candidate_contactno}</span>}</div>
                  </div>
                </div>

                {/* Company Info Section */}
                <div className='companyInfo mt-3 mb-3'>
                  <div className='companyNameDiv'>
                    <p className='personalText'>Company Information</p>
                    <button type="button" onClick={() => setShowCompanyForm(!showCompanyForm)} className="btn btn-link">
                      {showCompanyForm ? <i class="fa-solid fa-circle-minus"></i> : <i class="fa-solid fa-circle-plus"></i>}
                    </button>
                  </div>

                  {showCompanyForm && (
                    <div className='companyForm'>
                      <input
                        type='text'
                        name='company_name'
                        placeholder='Current Company Name *'
                        className="form-control mb-2"
                        value={companyDetails.company_name}
                        onChange={handleCompanyChange}
                      />

                      <div className='dateRow'>
                        <div className="mb-2 d-flex gap-3">

                          <input
                            type='checkbox'
                            name='isPresent'
                            checked={companyDetails.isPresent}
                            onChange={handleCompanyChange}
                          />
                          <label className='ms-2'>I currently work here</label>



                          <DatePicker
                            selected={companyDetails.from_year}
                            onChange={(date) => handleDateChange(date, 'from_year')}
                            dateFormat='dd/MM/yyyy'
                            isClearable
                            placeholderText="From year"
                            className="form-control"
                          />


                          <DatePicker
                            selected={companyDetails.to_year}
                            onChange={(date) => handleDateChange(date, 'to_year')}
                            dateFormat='dd/MM/yyyy'
                            isClearable
                            disabled={companyDetails.isPresent}
                            placeholderText="To year"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className='jobTileIndustryDiv d-flex gap-2'>
                        <input
                          type='text'
                          name='job_title'
                          placeholder='Job Title *'
                          className="form-control mb-2"
                          value={companyDetails.job_title}
                          onChange={handleCompanyChange}
                        />

                        {/* <input
                        type='text'
                        name='job_industry'
                        placeholder='Job Industry'
                        className="form-control mb-2"
                        value={companyDetails.job_industry}
                        onChange={handleCompanyChange}
                      /> */}

                        <select class="form-select form-select-sm w-50 candidateIndustry"
                          name='job_industry'
                          value={companyDetails.job_industry}
                          onChange={handleCompanyChange}
                        >
                          <option selected>Industry/Sector</option>
                          <option value="Accounting">Accounting</option>
                          <option value="Airline">Airline</option>
                          <option value="Banking">Banking</option>
                          <option value="Software">Software</option>
                          <option value="ArtsCrafts">Arts / Crafts</option>
                        </select>

                      </div>
                      <input
                        name='achievements'
                        placeholder='Achievements'
                        className="form-control mb-2"
                        value={companyDetails.achievements}
                        onChange={handleCompanyChange}
                      />




                      <button type='button' onClick={handleAddOrUpdateCompany} className='btn btn-primary'>
                        {isEditing ? 'Update Company' : 'Add Company'}
                      </button>
                    </div>
                  )}

                  {/* List of Companies */}
                  {companyList.length > 0 && (
                    <div className='companyList mt-3'>
                      <ul className='list-group'>
                        {companyList.map((company, index) => (
                          <li className='list-group-item d-flex justify-content-between align-items-center' key={index}>
                            <span>
                              {company.company_name} - {company.job_title} ({company.from_year} - {company.isPresent ? 'Present' : company.to_year})
                            </span>
                            <span>
                              <button className='btn btn-link' onClick={() => handleEditCompany(index)}><i class="fa-solid fa-pen"></i></button>
                              <button className='btn btn-link text-danger' onClick={() => handleDeleteCompany(index)}> <i className="fa-solid fa-trash"></i></button>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className='mb-3'>
                  <label className='personalText'>Eductional Details <span className='mandate'>*</span></label>
                  <input type='text'
                    name='candidate_education'
                    placeholder='Highest Degree Achieved'
                    class="form-control"
                    value={formData.candidate_education}
                    onChange={handleChange}
                  />
                    <div>
                    {errors.candidate_education && <span className="text-danger">{errors.candidate_education}</span>}
                    </div>
                </div>



                <div className=''>
                  <label className='personalText'>University Name <span className='mandate'>*</span></label>
                  <input type='text'
                    name='candidate_university'
                    placeholder='University Name'
                    class="form-control"
                    value={formData.candidate_university}
                    onChange={handleChange}
                  />
                    <div>
                    {errors.candidate_university && <span className="text-danger">{errors.candidate_university}</span>}
                    </div>

                </div>



                {/*************Range bar********************/}

                <div className='mb-3'>
                <label className='personalText'>Business Revenue Experience </label>
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
                        name='business_revenue_from'
                        // value={formData.business_revenue_from}
                        onChange={handleChange}
                        />

                        <input type="text" 
                        value={maxValue} 
                        placeholder='From' 
                        name='business_revenue_to'
                        //value={formData.business_revenue_to}
                        onChange={handleChange}
                        />
                       
                      </div>
                    </div>
                    </div>
                   {/*************Range bar code ends here********************/}

                   <div className='employmentStatus mt-3'>
            
                      <label className='personalText'>Employment Status <span className='mandate'>*</span>:</label>
                        <select class="form-select" 
                        name='candidate_emplymentstatus'
                        value={formData.candidate_emplymentstatus}
                        onChange={handleChange}
                        >
                        <option selected>Select Employment Status</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="temporary">Temporary</option>
                        <option value="internship">Internship</option>
                      </select>
                      <div>
                     
                      {errors.employment_status && <span className="text-danger">{errors.employment_status}</span>}
                      </div>
                    </div>



            <div className='employmentStatus mt-3'>
            <label className="personalText">Language Preferance <span className='mandate'>*</span>:</label>
              <select class="form-select"
               name='candidate_language_reference'
               value={formData.candidate_language_reference}
              onChange={handleChange}
               >
                <option selected>Select Language Preferance...</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
              </select>

              <div>
              {errors.candidate_language_reference && <span className="text-danger">{errors.candidate_language_reference}</span>}
              </div>

            </div>


                          {/*************Compensation Range bar********************/}

                <div className='mb-3'>
                <label className='personalText'>Expected Candidate's Compensation</label>
                  <div className='price-slider'>
                      
                      <div className='slider'>
                        <input
                          type='range'
                          min={CompensationMinPrice}
                          max={CompensationMaxPrice}
                          value={CompensationMinValue}
                          onChange={handleMinChangeCompensation}
                          className='slider-thumb min-thumb'
                        />
                        <input
                          type='range'
                          min={CompensationMinPrice}
                          max={CompensationMaxPrice}
                          value={CompensationMaxValue}
                          onChange={handleMaxChangeCompensation}
                          className='slider-thumb max-thumb'
                        />
                        <div className='slider-track'></div>
                        <div
                          className='slider-range'
                          style={{
                            left: `${(CompensationMinValue / CompensationMaxPrice) * 100}%`,
                            right: `${100 - (CompensationMaxValue / CompensationMaxPrice) * 100}%`,
                          }}
                        >

                        </div>
                      </div>

                      <div className='slider-values'>
                        <input type="text" 
                        value={CompensationMinValue} 
                        placeholder='From' 
                        name='candidate_compensation_from'
                        // value={formData.business_revenue_from}
                        onChange={handleChange}
                        />

                        <input type="text" 
                        value={CompensationMaxValue} 
                        placeholder='From' 
                        name='candidate_compensation_from'
                        //value={formData.business_revenue_to}
                        onChange={handleChange}
                        />
                       
                      </div>
                    </div>
                    </div>
                   {/*************Range bar code ends here********************/}


                   <div className='mt-2'>
                    <label className="personalText">Total Cash Compensation <span className='mandate'>*</span>:</label>
                      <input type='text' name='total_cash_compensation' 
                      placeholder='0' class="form-control" 
                      value={formData.total_cash_compensation}
                      onChange={handleChange}
                      />
                      <div>
              {errors.total_cash_compensation && <span className="text-danger">{errors.total_cash_compensation}</span>}
              </div>
                    </div>



                    <div className="form-group mt-3">
                      <label className="personalText ">Notes <span className='mandate'>*</span> </label>
                      <textarea class="form-control" name="candidate_notes" rows="3"
                      value={formData.candidate_notes}
                      onChange={handleChange}
                      ></textarea>
                      <div>
              {errors.candidate_notes && <span className="text-danger">{errors.candidate_notes}</span>}
              </div>
                  </div>



                <div className='btnDiv d-flex justify-content-center'>
                  <button type='submit' className='btn btn-primary mt-3 w-25'>Submit</button>
                </div>
              </div>

            </div>

          </div>


        </form>
      </div>
    </div>
  );
};



export default SubmitCandidate;
