import React from 'react'
import signingUp from '../../images/signup.png' 

const Signup = () => {
  return (
    <>
 <div className='container-fluid d-flex signup-main-container'>
  
        <div className='textblock p-3'>
          <h2 className='fs-5'>Welcome To </h2>
          <h1 className='fs-3' >Recruiter Resources</h1>
          <p>"Partner in the placement of your top companies."</p>
          <p><i className="fa-regular fa-circle-check"></i> "At a glace" status dashboard</p>
          <p><i className="fa-regular fa-circle-check"></i> Candidate upload process</p>
          <p><i className="fa-regular fa-circle-check"></i> Recruiter earnings report</p>
          <p><i className="fa-regular fa-circle-check"></i> Individual candidate status</p>
          <div ><img src={signingUp} alt='signup' /></div>
          
        </div>
        
        <div className='textblockForSignup bg-body shadow p-4'>
          <h3>Signup to your account</h3>
          <p className='signupText mb-5'>Enter your details and start your journey with us</p>
          <hr/>
          <div className='primaryInfo'>Primary Contact Information</div>
        </div>

    </div>
    </>
  )
}

export default Signup