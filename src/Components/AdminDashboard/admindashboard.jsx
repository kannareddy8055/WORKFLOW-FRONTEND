import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import Header from "../Header/header";
import "./admindashboard.css";
import AdminRequestCard from "../AdminRequestCard/adminrequestcard.jsx";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const status = ["Approved", "Rejected", "Pending"];
  const user = JSON.parse(localStorage.getItem("user")); // logged-in approver

  // ✅ move fetchRequests here
  
  const fetchRequests = async () => {
    try {
      const res = await fetch(`https://workflow-backend-3.onrender.com/requests/admin/${selectedStatus.toLowerCase()}`, {
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
  }, [selectedStatus]);

  // const onChangeComments = (e) => {
  //   setComments(e.target.value);
  // }

  // const handleAction = async (requestId, action) => {
  //   try {
  //     await axios.post(`http://localhost:5000/requests/manager/${requestId}/action`, {
  //       approverId: user._id,
  //       action,
  //       comments
  //     });
      
  //     alert(`Request ${action}`);
  //     setComments("");
  //     fetchRequests(); // ✅ now this works
  //   } catch (err) {
  //     console.error("Error updating request", err);
  //   }
  // };



  return (
    <div className="approver-dashboard-container">
      <div className="header-container"><Header /></div>
      <div className="status-filter-container">
        <h2 className="approver-dashboard-title">Admin Dashboard</h2>
        
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
        <p className="no-requests-message">No {selectedStatus.toLowerCase()} requests</p>
      ) : (
        <ul className="request-list">
      {requests.map((req) => (
            <AdminRequestCard
              key={req._id}
              request={req}
              fetchRequests={fetchRequests}/>
          ))}
    </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
