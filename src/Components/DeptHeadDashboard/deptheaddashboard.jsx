// src/pages/Approver/DeptHeadDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/header.jsx";
import "./deptheaddashboard.css";

const DeptHeadDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [comments, setComments] = useState("") ;
  const user = JSON.parse(localStorage.getItem("user")); // logged-in DeptHead

  const fetchRequests = async () => {
    try {
      const res = await axios.get("https://workflow-backend-3.onrender.com/requests/depthead/pending");
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error("Error fetching DeptHead requests", err);
    }
  };

  const onChangeComments = (e) => {
    setComments(e.target.value);
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (requestId, action) => {
    try {
      await axios.post(`https://workflow-backend-3.onrender.com/requests/depthead/${requestId}/action`, {
        approverId: user._id,
        role: user.role,
        action,
        comments
      });
      alert(`Request ${action}`);
      setComments("");
      fetchRequests();
    } catch (err) {
      console.error("Error updating request", err);
    }
  };

  return (
    <div className="depthead-dashboard">
      <div className="header-container">
        <Header />
      </div>
      <h2 className="dashboard-title">Dept Head Dashboard</h2>
      {requests.length === 0 ? (
        <p className="no-requests">No pending requests for DeptHead</p>
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
                <span className={`request-status ${req.status.toLowerCase()}`}>{req.status}</span>

                <div className="action-buttons">
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

export default DeptHeadDashboard;
