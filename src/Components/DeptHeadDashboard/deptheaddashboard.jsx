// src/pages/Approver/DeptHeadDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/header.jsx";
import "./deptheaddashboard.css";
import { use } from "react";
import RequestCard from "../Requests/requests.jsx";


const DeptHeadDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const status = ["Approved", "Rejected", "Pending"];
  const user = JSON.parse(localStorage.getItem("user")); // logged-in DeptHead

   useEffect(() => {
        const fetchRequests1 = async () => {
          try {
            const res = await fetch(`http://localhost:5000/requests/depthead/deptheadapproval`, {
              method:"PUT",
              headers: { "Content-Type": "application/json",
                          "Authorization": `Bearer ${Cookies.get('jwtToken')}`
              }
            })
        } catch (err) {
          console.error("Error fetching requests", err);
        }
      };
      
      fetchRequests1();
    }, [])

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/requests/depthead/${selectedStatus.toLowerCase()}`);
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error("Error fetching DeptHead requests", err);
    }
  };
  

  // const onChangeComments = (e) => {
  //   setComments(e.target.value);
  // }

  useEffect(() => {
    fetchRequests();
  }, [selectedStatus]);

  // const handleAction = async (requestId, action) => {
  //   try {
  //     await axios.post(`http://localhost:5000/requests/depthead/${requestId}/action`, {
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
        <h2 className="dashboard-title">Dept Head Dashboard</h2>
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
              fetchRequests={fetchRequests}/>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeptHeadDashboard;
