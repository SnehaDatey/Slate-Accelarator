import React, { useState } from 'react';
import logo from '../../images/logo.png';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setSelectedRole }) => {
  const [selectedOption, setSelectedOption] = useState('');
 // const [selectError, setSelectError] = useState(''); // Error state for select box
  const navigate = useNavigate();


  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value); // Update the local state
    setSelectedRole(value); // Pass the selected value to the parent component (App)

    const selectedValue = event.target.value;
    setSelectedRole(selectedValue);


     // Navigate based on selected role
     if (value === 'recruiter') {
      navigate('/recruiter');
    } else if (value === 'client') {
      navigate('/client');
    } else if (value === 'logout') {
      // Clear local storage and session storage
      localStorage.clear();
      localStorage.removeItem("token");
      sessionStorage.clear();
      
      // Optionally, navigate to login or homepage
      navigate('/');
    }
  };

  return (
    <>
      <nav className="navbar navbar-light bg-body text-primary p-3 mb-5 bg-body rounded">
        <div className="container-fluid nav-container">
          <div className="logoImg">
            <img src={logo} alt="logo" />
          </div>
          <form className="d-flex">
            <select
              className="form-select fw-bold border-0 bg-body select-box"
              id="role"
              name="role"
              value={selectedOption} // Controlled component
              onChange={handleSelectChange}
            >
              <option value="0">Login</option>
              <option value="recruiter">Recruiter</option>
              <option value="client">Client</option>
              <option value="logout">LogOut</option>
            </select>
          </form>
          {/* Error message for select box */}
          {/* {selectError && <p className="text-danger errClass">{selectError}</p>} */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
