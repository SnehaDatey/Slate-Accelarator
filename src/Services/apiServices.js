import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: 'https://app-slate-accelerator-dqfqe5h6f8bkeyd3.eastus-01.azurewebsites.net/api',
    
    headers: {
        'Content-Type': 'application/json',
    },
});

// Login Method
export const login = (email, password, userType) => {
    const payload = {
        user_email: email,
        user_password: password,
        user_type: userType,
    };

    // Log the type of login attempt
    if (userType === 'recruiter') {
        console.log("Attempting Recruiter Login...");
    } else if (userType === 'client') {
        console.log("Attempting Client Login...");
    }

    return api.post('/auth/userlogin', payload);

    
};

// Save Candidate Method
export const saveCandidate = (candidateData) => {
    // When using FormData, Axios automatically sets the correct 'Content-Type' (multipart/form-data)
    return api.post('/recruiter/addupdatecandidateinfo', candidateData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};