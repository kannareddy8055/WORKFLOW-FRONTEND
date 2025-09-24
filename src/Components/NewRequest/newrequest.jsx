// pages/Employee/NewRequest.jsx
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./NewRequest.css";
import Header from "../Header/header";

const NewRequest = () => {
  const [requestType, setRequestType] = useState("LEAVE");
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://localhost:5000/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
        body: JSON.stringify({
          requestorId: user.id,
          requestType,
          details,
        }),
      });

      if (response.ok) {
        await response.json();
        setDetails({});
        setRequestType("LEAVE");
        navigate("/employee");
        alert("Request submitted ✅");

      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit request ❌");
    }
  };

  return (
    <div className="new-request-container">
        <div className="header-container-1"><Header /></div>
      <Link className="link" to="/employee"><p className="form-closer">X</p></Link>
      <h2 className="new-request-title">Create New Request</h2>

      <form className="new-request-form" onSubmit={handleSubmit}>
        <div className="form-group">
        <label className="form-label">Request Type</label>
        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="form-select"
        >
          <option value="LEAVE">Leave</option>
          <option value="BUDGET">Budget</option>
          <option value="PROJECT">Project</option>
        </select>
        </div>
        {/* Simple fields (extendable for different request types) */}
        
        <div className="form-group">
           <label className="form-label">Title</label>
           <input type="text" className="form-input" name="title" placeholder="Request Title" onChange={handleChange} />
        </div>
        
        
        {requestType === "BUDGET" && <div className="form-group">
            <label className="form-label">Amount (for Budget requests):</label>
            <input type="number" className="form-input" name="amount" placeholder="₹ 0.00 " onChange={handleChange} />
        </div>}
        
        <div className="form-group">
          <label className="form-label">Description</label>
           <textarea
          name="description"
          placeholder="Describe your request..."
          value={details.description || ""}
          onChange={handleChange}
          className="form-input"
        />
        </div>
        


        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewRequest;
