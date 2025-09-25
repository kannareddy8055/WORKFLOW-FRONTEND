import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./MyRequests.css";
import Header from "../Header/header";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(
          `https://workflow-backend-3.onrender.com/requests/${user.id}`,
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
      <div className="header-container1"><Header /></div>
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
                    <p className="request-desc1"><span className="desc-label1">Description : </span>{req.description}</p>
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
              
                  { req.comments && req.comments.length !== 0 && <div className="comments-section1">{req.comments.map((comment, index) => <p className="request-comments1"><span className="approver-comments1">{index===0 ? "Manager Comment :" : index===1 ? "Dept Head Comment :" : "Director Comment :"}</span> {comment==="" ? "No comment" : comment}</p>)}</div>}
                  { req.comments && req.comments.length === 0 && <div className="comments-section12 ">No Comments</div>}

                  { req.comments.length === 0 && <div className="status-checking-section1">
                      <p><span>Manager : </span><span className="pending1">Pending</span></p>
                      <p><span>Dept Head : </span><span className="pending1">Pending</span></p>
                      <p><span>Director : </span><span className="pending1">Pending</span></p>
                    </div>}

                  { req.comments.length === 1 && req.status === "Rejected" && <div className="status-checking-section1">
                      <p><span>Manager : </span><span className="rejected1">Rejected</span></p>
                    </div>  }

                  { req.comments.length === 1 && req.status === "Pending" && <div className="status-checking-section1">
                      <p><span>Manager : </span><span className="approved1">Approved</span></p>
                      <p><span>Dept Head : </span><span className="pending1">Pending</span></p>
                      <p><span>Director : </span><span className="pending1">Pending</span></p>
                    </div>}

                  { req.comments.length === 2 && req.status === "Rejected" && <div className="status-checking-section1">
                      <p><span>Manager : </span><span className="approved1">Approved</span></p>
                      <p><span>Dept Head : </span><span className="rejected1">Rejected</span></p>
                    </div>  }

                  { req.comments.length === 2 && req.status === "Pending" && <div className="status-checking-section1">
                      <p><span>Manager : </span><span className="approved1">Approved</span></p>
                      <p><span>Dept Head : </span><span className="approved1">Approved</span></p>
                      <p><span>Director : </span><span className="pending1">Pending</span></p>
                    </div>}

                  { req.comments.length === 3 && req.status === "Rejected" && <div className="status-checking-section1">
                      <p><span>Manager : </span><span className="approved1">Approved</span></p>
                      <p><span>Dept Head : </span><span className="approved1">Approved</span></p>
                      <p><span>Director : </span><span className="rejected1">Rejected</span></p>
                    </div>  }

                  { req.comments.length === 3 && req.status === "Approved" && <div className="status-checking-section1">
                      <p><span>Manager : </span><span className="approved1">Approved</span></p>
                      <p><span>Dept Head : </span><span className="approved1">Approved</span></p>
                      <p><span>Director : </span><span className="approved1">Approved</span></p>
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
