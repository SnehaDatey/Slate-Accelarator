import {useState} from 'react'
import './App.css';
import Dashboard from './Component/Dashboard/DashboardPages/Dashboard';
import Reports from './Component/Dashboard/Reports/Reports';
import SubmitCandidate from './Component/Dashboard/SubmitCandidate/SubmitCandidate';
import Login from './Component/LoginSignup/Login';
import Signup from './Component/LoginSignup/Signup';
import Navbar from './Component/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Client from './Component/Client/Client';
import DashboardClient from './Component/Client/DashboardClient';

function App() {
  const [selectedRole, setSelectedRole] = useState('');


  return (
    <>
    
    <BrowserRouter>
    <Navbar setSelectedRole={setSelectedRole}/>
    <Routes>
      <Route path ="/" element={ <Login selectedRole={selectedRole}  />} />
      <Route path ="/signup" element={<Signup />} />
      <Route path ="/dashboard" element={<Dashboard />} />
      <Route path ="/submitcandidate" element={<SubmitCandidate />} />
      <Route path ="/reports" element={<Reports />} />
      <Route path ="/recruiter" element={ <Login selectedRole={selectedRole}  />} />
      <Route path ="/client" element={<Client selectedRole={selectedRole}/>} />
      <Route path ="/clientdashboard" element={<DashboardClient />} />

    </Routes>
    </BrowserRouter>
      
     
    </>
  );
}

export default App;
