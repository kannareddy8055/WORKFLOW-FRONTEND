import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Header = () => {
     const navigate = useNavigate() ;
     const user = JSON.parse(localStorage.getItem("user")) ;
     let homeRoute = "";
     let dashboardRoute = "";

     if (user){
        if (user.role[0] === "Manager") {
          homeRoute = "/manager"
          dashboardRoute = "/manager/dashboard"
     } else if (user.role[0] === "Dept Head") {
          homeRoute = "/depthead"
          dashboardRoute = "/depthead/dashboard"
     } else if (user.role[0] === "Director") {
          homeRoute = "/director"
          dashboardRoute = "/director/dashboard"
     } else if (user.role[0] === "Employee") {
          homeRoute = "/employee"
          dashboardRoute = "/employee/my-requests"
     } else if (user.role[0] === "Admin") {
          homeRoute = "/admin"
          dashboardRoute = "/admin"
     }}

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">✦</span>
        <span className="logo-text">Workflow</span>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink 
            to={homeRoute} 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={dashboardRoute} 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Requests
          </NavLink>
        </li>
        <li>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("user");  
              localStorage.removeItem("jwtToken");
              Cookies.remove("jwtToken");
              navigate("/") ;
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
