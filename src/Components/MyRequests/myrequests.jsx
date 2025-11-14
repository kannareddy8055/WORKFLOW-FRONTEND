import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./myrequests.css";
import Userheader from '../Userheader/UserHeader';
import Header from "../Header/header.jsx"

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        
        const response = await fetch(
          `https://workflow-backend-5.onrender.com/requests/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwtToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRequests(data.request || []); // ensure array
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="my-requests-container1">
      <div className="header-container1">{user.role[0] === "Employee" ? <Userheader /> : <Header/>}</div>
      <h2 className="my-requests-title1">📋 My Requests</h2>
      {requests.length === 0 ? (
        <p className="empty-message1">No requests found.</p>
      ) : (
        <ul className="requests-list1">
          {requests.map((req) => (
            <>
            <li key={req._id} className="request-card1">
              <div className="request-card-content1">
                <div className="request-header-content1">
                  <div>
                    <h3 className="request-title1">{req.title}</h3>
                    <p className="desc-label1"><span className="request-desc1">DESCRIPTION : </span>{req.description}</p>
                  </div>
                  <span
                  className={`request-status1 ${
                    req.status.toLowerCase() === "approved"
                      ? "approved1"
                      : req.status.toLowerCase() === "pending"
                      ? "pending1"
                      : "rejected1"
                  }`}
                >
                  {req.status}
                </span>
                </div>
              <div className="request-details1">

                <span className="request-type1">Request Type : <span>{req.type}</span></span>
                { req.type === "BUDGET" &&  <span className="request-amount1">Amount : <span>{req.amount}</span></span>}
                { req.type !== "BUDGET" &&  <span className="request-duration1">------</span>}
                
              </div>
               
                <div className="comments-section1">{
                  req.comments.map((comment, index) => {
                    if (comment && comment.trim() !== "") {
                      const role = index === 0 ? "Manager" : index === 1 ? "Dept Head" : "Director";
                      return (
                        <p className="request-comments1"><span className="approver-comments1">{role} Comment : </span> {comment}</p>
                      );
                    }
                  })}
                  { (req.comments.every(c => c.trim() === "")) && <p className="no-comments">No comments available.</p>}
                </div>

                { <div className="status-checking-section1">
                  {user.role[0] === "Employee" && <>
                    {(req.currentStep > 1 && req.managerApproval === true) ? <p><span>Manager : </span><span className="approved1">Approved</span></p> : (!(req.currentStep > 1) && req.managerApproval === true) ? <p><span>Manager : </span><span className="pending1">Pending</span></p> : (req.status === "Rejected" && req.managerApproval === true ) ?<p><span>Manager : </span><span className="rejected1">Rejected</span></p> : null}
                    {(req.currentStep > 2 && req.deptHeadApproval === true) ? <p><span>Dept Head : </span><span className="approved1">Approved</span></p> : (!(req.currentStep > 2) && req.deptHeadApproval === true) ? <p><span>Dept Head : </span><span className="pending1">Pending</span></p> : (req.status === "Rejected" && req.deptHeadApproval === true ) ?<p><span>Dept Head : </span><span className="rejected1">Rejected</span></p> : null}
                    {(req.currentStep === 3 && req.directorApproval === true && req.status === "Approved") ? <p><span>Director : </span><span className="approved1">Approved</span></p> : (req.directorApproval === true && req.status === "Pending" ) ? <p><span>Director : </span><span className="pending1">Pending</span></p> : (req.status === "Rejected" && req.directorApproval === true) ?<p><span>Dept Head : </span><span className="rejected1">Rejected</span></p> : null}
                    {req.currentStep === 0 && <h1 className="waiting1">Admin yet to configure approvers</h1>}
                  </>}
                  
                  </div> }

                
                 
              </div>
            </li>
              </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRequests;