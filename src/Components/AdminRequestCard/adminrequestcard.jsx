import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "./adminrequestcard.css"; 


const AdminRequestCard = ({ request, fetchRequests }) => {
  const [userDetails, setUserDetails] = useState({name: "Loading..."});
  const [stepValue, setStepValue] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

    if ( user.role[0] === "Admin") {
      var roleId = 0;
      var role = "admin";
  }
  

  const handleSetCurrentStep = async (stepValue) => {
    try {
      await axios.post(
        `http://localhost:5000/requests/admin/${request._id}/set-step`,
        { setCurrentStep: stepValue }
      );
      fetchRequests(); // Refresh the list
    } catch (err) {
      console.error("Error updating step", err);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      await axios.post(`http://localhost:5000/requests/${role}/${requestId}/action`, {
        approverId: user._id,
        role: user.role,
        action,
      });
      alert(`Request ${action}`);
      fetchRequests();
    } catch (err) {
      console.error("Error updating request", err);
    }
  };

 useEffect(() => {   
  const fetchRequestUser = async (createdBy) => {
    try {
      const RequestByUser = await axios.get(`http://localhost:5000/request/user/${createdBy}`);
      setUserDetails(RequestByUser.data.user);
    } catch (err) {
      console.error("Error fetching user details", err);
      return null;
    }
  }
fetchRequestUser(request.createdBy);
}, [request.createdBy]);

  return (
    <li key={request._id} className="request-card">
              <div className="request-details">
                <div className="request-header">
                   <h1 className="request-title">Requested By : {userDetails.name} <span className="request-role">({request.role})</span></h1>
                   <strong className="request-title">{request.title}</strong>
                   <p className="request-desc"><span className="desc-label">Description : </span>{request.description}</p>
                </div>

                 <div className="request-meta helloo">
                   <span className="request-type">( <span className="">{request.type}</span> )</span>
                   {request.type === "BUDGET" && <span>Amount : <span>{request.amount}</span></span>}
                 </div>

                 {
                   ((request.currentStep > roleId || request.status.toLowerCase() === "approved") &&
                    <span className="request-status approved helloo1">Approved</span>) ||
                   ((request.currentStep === roleId && request.status.toLowerCase() === "rejected") &&
                    <span className="request-status rejected helloo1">Rejected</span>) ||
                   (request.status.toLowerCase() === "pending" && request.currentStep === roleId &&
                    <span className="request-status pending helloo1">Pending</span>)
                 }

        


{ (request.status.toLowerCase() === "pending" && request.currentStep === roleId && request.role === "Employee") && 
        <select
          value={stepValue || ""}
          onChange={(e) => setStepValue(e.target.value) }
          className="approval-filter"
        >
          <option value="">Select Step</option>
          <option value={1}>Manager only</option>
          <option value={4}>Dept Head only</option>
          <option value={5}>Director only</option>
          <option value={2}>Manager and Dept Head</option>
          <option value={6}>Manager and Director</option>
          <option value={7}>Dept Head and Director</option>
          <option value={3}>Manager, Dept Head and Director</option>
        </select>
}

{ (request.status.toLowerCase() === "pending" && request.currentStep === roleId && request.role === "Manager") && 
        <select
          value={stepValue || ""}
          onChange={(e) => setStepValue(e.target.value) }
          className="approval-filter"
        >
          <option value="">Select Step</option>
          <option value={4}>Dept Head only</option>
          <option value={5}>Director only</option>
          <option value={7}>Dept Head and Director</option>
        </select>
}

{ (request.status.toLowerCase() === "pending" && request.currentStep === roleId && request.role === "Dept Head") && 
        <select
          value={stepValue || ""}
          onChange={(e) => setStepValue(e.target.value) }
          className="approval-filter"
        >
          <option value="">Select Step</option>
          <option value={5}>Director only</option>
        </select>
}

{ (request.status.toLowerCase() === "pending" && request.currentStep === roleId) && 
                <div className="action-buttons helloo">
                 <button
                  className="approve-btn"
                  onClick={() => { handleSetCurrentStep(stepValue); handleAction(request._id, "Approved")} }
                 >
                  Approve
                 </button>
                 <button
                  className="reject-btn"
                  onClick={() => handleAction(request._id, "Rejected")}
                 >
                  Reject
                 </button>
              </div>
}
              </div>
              
              
            </li>
  );
};

export default AdminRequestCard; 