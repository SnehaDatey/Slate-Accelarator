import React, { useState } from 'react';
import './LoginSignup.css';
import loginImg from '../../images/Profile-data.webp';
import { Link, useNavigate} from 'react-router-dom';
import { login } from '../../Services/apiServices'; // Import the login API function

const Login = ({ selectedRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', apiError: '' });
  const [showPassword, setShowPassword] = useState(false); // State for show/hide password
  const navigate = useNavigate();

  // Email and Password validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleLogin = async () => {
    let valid = true;
    let errorMessages = { email: '', password: '' };

    // Validate email and password
    if (!validateEmail(email)) {
      errorMessages.email = 'Invalid email address';
      valid = false;
    }
    if (!validatePassword(password)) {
      errorMessages.password = 'Password must be at least 8 characters long, contain upper lowercase letters, number and special character';
      valid = false;
    }

    setErrors(errorMessages);

    if (valid) {
      try {
        const response = await login(email, password, selectedRole); // Call login API

        if (response.status === 200) {
          // Extract the token and user data from the response (assuming response.data.token contains the token)
          console.log(response)
          const token = response.data.data.user_loginauth;
          const userData = response.data.data; // Assuming there's user data
         
          // Store token and user data in localStorage
          localStorage.setItem('token', token);   // Save the token in localStorage
          localStorage.setItem('user', JSON.stringify(userData)); // Save user data in localStorage

          alert('Login successful!');
          navigate('/dashboard');  // Redirect to dashboard after login
        }
      } catch (error) {
        alert('Login failed:', error.response?.data || error.message); // Handle login failure
        setErrors({ ...errors, apiError: 'Login failed. Please check your credentials and try again.' });
      }
    }
  };

  return (
    <div className="container d-flex position-relative">
      <div className="textblock bg-body p-5 rounded w-75 shadow-lg p-3 mb-5 bg-body rounded">
        <h2 className="fs-5">Welcome To</h2>
        <h1 className="fs-3 recruiterText">Recruiter Resources</h1>
        <p>"Partner in the placement of your top companies."</p>
        <p><i className="fa-regular fa-circle-check"></i> "At a glance" status dashboard</p>
          <p><i className="fa-regular fa-circle-check"></i> Candidate upload process</p>
          <p><i className="fa-regular fa-circle-check"></i> Recruiter earnings report</p>
          <p><i className="fa-regular fa-circle-check"></i> Individual candidate status</p>
        <div><img src={loginImg} alt="Login" /></div>
      </div>

      <div className="login-container position-absolute bg-body shadow-lg p-3 mb-5 bg-body rounded">
        <div className="login-inner-container text-center mt-3">
          <h4>Login to Your Account</h4>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="text-danger errClass">{errors.email}</p>

          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="input-group-text"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
            </span>
          </div>
          <p className="text-danger errClass">{errors.password}</p>

          <div className="forgotPass">
            <a href="/forgotPass">Forgot Password?</a>
          </div>

          <div className="loginBtn">
            <button className="btn-primary" onClick={handleLogin}>Login</button>
            <div className="mt-2 signupText">
              <span className="credentialText">Don't have an account?
                <Link to="/signup" className="text-decoration-none">Sign Up Here</Link>
              </span>
            </div>
          </div>

          {/* Display API error */}
          {errors.apiError && <p className="text-danger">{errors.apiError}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
