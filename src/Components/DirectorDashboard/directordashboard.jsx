// src/pages/Approver/DeptHeadDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/header.jsx";
import "./directordashboard.css";
import RequestCard from "../Requests/requests.jsx";

const DirectorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const status = ["Approved", "Rejected", "Pending"];
  const user = JSON.parse(localStorage.getItem("user")); // logged-in DeptHead

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`https://workflow-backend-3.onrender.com/requests/director/${selectedStatus.toLowerCase()}`);
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error("Error fetching DeptHead requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [selectedStatus]);

  // const onChangeComments = (e) => {
  //   setComments(e.target.value);
  // }

  // const handleAction = async (requestId, action) => {
  //   try {
  //     await axios.post(`http://localhost:5000/requests/director/${requestId}/action`, {
  //       approverId: user._id,
  //       role: user.role,
  //       action,
  //       comments
  //     });
  //     alert(`Request ${action}`);
  //     setComments("");
  //     fetchRequests();
  //   } catch (err) {
  //     console.error("Error updating request", err);
  //   }
  // };

  return (
    <div className="depthead-dashboard">
      <div className="header-container">
        <Header />
      </div>
      <div className="status-filter-container">
        <h2 className="dashboard-title">Director Dashboard</h2>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-filter"
        >
          {status.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
      </div>
      {requests.length === 0 ? (
        <p className="no-requests">No pending requests for DeptHead</p>
      ) : (
        <ul className="request-list">
          {requests.map((req) => (
            <RequestCard
              key={req._id}
              request={req}
              fetchRequests={fetchRequests}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DirectorDashboard;


{/* <ul className="request-list">
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
              <div >
                <input type="text" className="comments-input" placeholder="Add comments..." value={comments} onChange={onChangeComments} />
              </div>
              
            </li>
          ))}
        </ul> */}