import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "./requests.css"; 

const RequestCard = ({ request, fetchRequests }) => {
  const [userDetails, setUserDetails] = useState({name: "Loading..."});
  const [comments, setComments] = useState("") ;
  const user = JSON.parse(localStorage.getItem("user"));

  if ( user.role[0] === "Manager") { 
    var roleId = 1;
    var role = "manager";
  } else if (user.role[0]==="Dept Head") {
    var roleId = 2;
    var role = "depthead";
  } else if (user.role[0]==="Director") {
    var roleId = 3;
    var role = "director";
  }
    // logged-in DeptHead
  const onChangeComments = (e) => {
    setComments(e.target.value);
  }

  const handleAction = async (requestId, action) => {
    try {
      await axios.post(`https://workflow-backend-3.onrender.com/requests/${role}/${requestId}/action`, {
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

 useEffect(() => {   
  const fetchRequestUser = async (createdBy) => {
    try {
      const RequestByUser = await axios.get(`https://workflow-backend-3.onrender.com/request/user/${createdBy}`);
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
                   <h1 className="request-title">Requested By : {userDetails.name}</h1>
                   <strong className="request-title">{request.title}</strong>
                   <p className="request-desc"><span className="desc-label">Description : </span>{request.description}</p>
                </div>

                 <div className="request-meta">
                   <span className="request-type">( <span className="">{request.type}</span> )</span>
                   {request.type === "BUDGET" && <span>Amount : <span>{request.amount}</span></span>}
                 </div>
                 {
                   ((request.currentStep > roleId || request.status.toLowerCase() === "approved") &&
                    <span className="request-status approved">Approved</span>) ||
                   ((request.currentStep === roleId && request.status.toLowerCase() === "rejected") &&
                    <span className="request-status rejected">Rejected</span>) ||
                   (request.status.toLowerCase() === "pending" && request.currentStep === roleId &&
                    <span className="request-status pending">Pending</span>)
                 }

{ (request.status.toLowerCase() === "pending" && request.currentStep === roleId) && 
                <div className="action-buttons">
                 <button
                  className="approve-btn"
                  onClick={() => handleAction(request._id, "Approved")}
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
              <div >
                <input type="text" className="comments-input" placeholder="Add comments..." value={comments} onChange={onChangeComments} />
              </div>

            </li>

  );
};

export default RequestCard;

