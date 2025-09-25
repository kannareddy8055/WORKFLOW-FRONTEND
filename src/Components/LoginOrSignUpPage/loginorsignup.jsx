import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginOrSignUp = () => {
  const [selectedRole, setSelectedRole] = useState('Employee');
  const [activeTab, setActiveTab] = useState('Login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const roles = ['Employee', 'Manager', 'Dept Head', 'Director'];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

const redirectByRole = (role) => {
    switch (role) {
      case 'Employee':
        navigate('/employee');
        break;
      case 'Manager':
        navigate('/manager');
        break;
      case 'DeptHead':
        navigate('/depthead');
        break;
      case 'Director':
        navigate('/director');
        break;
      case 'Admin':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
  };





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Login handler triggered ✅");  // <- will now show
  const { email, password } = formData;
  const role = selectedRole;
  console.log("Sending login request with:", { email, password, role });
  
  const response = await fetch("https://workflow-backend-3.onrender.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });

  console.log("Response status:", response.status);
  if (response.ok) {
    const data = await response.json();
    console.log("Response data:", data);  // ✅ debug
    // alert("Login successful!");
    console.log("hiiii")
    Cookies.set('jwtToken', data.jwtToken, { expires: 300000000})
    localStorage.setItem("user", JSON.stringify(data.user));
    redirectByRole(data.user.role[0]);
  } else {
    console.error("Login failed");
    alert("Login failed. Please check your credentials and try again.");
  }
};


  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword} = formData;
    const role = selectedRole;
    const response = await fetch('https://workflow-backend-3.onrender.com/signup', {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name, email, password, confirmPassword, role })
    })
    if(response.ok){
      const data = await response.json();
      alert("Sign Up successful!");
      setFormData({
       name: '',
       email: '',
       password: '',
       confirmPassword: ''
      })
    }else {
      alert('Sign Up failed. Please check your details and try again.');
    }
    };

  const token = Cookies.get("jwtToken");
const user = JSON.parse(localStorage.getItem("user"));  // <-- FIX
console.log("Token from cookies:", token);
console.log("User from localStorage:", user);

useEffect(() => {
    if (token && user) {
      if (user.role[0] === 'Employee') {
        navigate("/employee", { replace: true });
      } else if (user.role[0] === 'Manager') {
        navigate("/manager", { replace: true });
      } else if (user.role[0] === 'Admin') {
        navigate("/admin", { replace: true });
      } else if (user.role[0] === 'Dept Head') {
        navigate("/depthead", { replace: true });
      } else if (user.role[0] === 'Director') {
        navigate("/director", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      console.log("No valid token or user found, staying on login/signup page.");
      // Do not navigate here, just stay on the page
    }
  }, [token, user, navigate]);



  return (
    <div className="workflow-app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🔷</span>
          <span className="logo-text">WorkflowApp</span>
        </div>
      </header>

            <div className="role-selection">
              {roles.map(role => (
                <button
                  key={role}
                  className={`role-button ${selectedRole === role ? 'active' : ''}`}
                  onClick={() => handleRoleSelect(role)}
                >
                  {role}
                </button>
              ))}
            </div>
            
        <div className="auth-container">
          <div className={`${activeTab === 'Login' ? 'login-card' : 'signup-card'}`}>
            
            <div className="auth-tabs">
              <button
                className={`tab-button ${activeTab === 'Login' ? 'active' : ''}`}
                onClick={() => handleTabChange('Login')}
              >
                Login
              </button>
              <button
                className={`tab-button ${activeTab === 'Sign Up' ? 'active' : ''}`}
                onClick={() => handleTabChange('Sign Up')}
              >
                Sign Up
              </button>
            </div>

           
            <form onSubmit={activeTab === 'Login' ? handleLogin : handleSignUp}>
             <div className="auth-form">
                {activeTab === 'Sign Up' &&<div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="name"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder='Your Name'
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>}

            
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder='Your Email'
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete={activeTab === 'Login' ? "current-password" : "new-password"} // <-- Add this line

                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {activeTab === 'Sign Up' && <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                      autoComplete={"new-password"} // <-- Add this line

                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>}

              <button 
  type="submit"
  className="submit-button"
>
  {activeTab === 'Login' 
    ? `Log in as ${selectedRole}` 
    : `Sign up as ${selectedRole}`}
</button>

            </div>
            </form>

          </div>
   </div>
    </div>
  );
};

export default LoginOrSignUp;