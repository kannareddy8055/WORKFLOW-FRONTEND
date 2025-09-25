import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import Header from "../Header/header";
import "./approverdashboard.css";
const ApproverDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [comments, setComments] = useState("") ;
  const user = JSON.parse(localStorage.getItem("user")); // logged-in approver

  // ✅ move fetchRequests here
  const fetchRequests = async () => {
    try {
      const res = await fetch("https://workflow-backend-5.onrender.com/requests/manager/pending", {
        method:"GET",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get('jwtToken')}`
          }
      });
      if (res.ok){
        const data = await res.json();
      setRequests(data.requests || []);} // <- backend sends { status, results, requests }
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onChangeComments = (e) => {
    setComments(e.target.value);
  }

  const handleAction = async (requestId, action) => {
    try {
      await axios.post(`https://workflow-backend-5.onrender.com/requests/manager/${requestId}/action`, {
        approverId: user._id,
        action,
        comments
      });
      
      alert(`Request ${action}`);
      setComments("");
      fetchRequests(); // ✅ now this works
    } catch (err) {
      console.error("Error updating request", err);
    }
  };


 
  return (
    <div className="approver-dashboard-container">
      <div className="header-container"><Header /></div>
      <h2 className="approver-dashboard-title">Employee Dashboard</h2>
      {requests.length === 0 ? (
        <p className="no-requests-message">No pending requests</p>
      ) : (
        <ul className="request-list">
      {requests.map((req) => (
        <li key={req._id} className="request-card">
          <div className="request-details">

            <div className="request-header">
              <strong className="request-title">{req.title}</strong>
              <p className="request-desc"><span className="desc-label">Description : </span>{req.title}</p>
            </div>

            <div className="request-meta">
              <span className="request-type">( <span className="">{req.type}</span> )</span>
              {req.type === "BUDGET" && <span>Amount : <span>{req.amount}</span></span>}
            </div>
            
            <span className={`request-status ${req.status.toLowerCase()}`}>
              {req.status}
            </span>
           
          <div className="request-actions">
            <button
              className="approve-btn"
              onClick={() => handleAction(req._id, "Approved")}
            >
              Approve
            </button>
            <button
              className="reject-btn"
              onClick={() => handleAction(req._id, "Rejected")}
            >
              Reject
            </button>
          </div>
          </div>
          <div>
            <input type="text" className="comments-input" placeholder="Add comments..." value={comments} onChange={onChangeComments} />
          </div>
        </li>
      ))}
    </ul>
      )}
    </div>
  );
};

export default ApproverDashboard;
