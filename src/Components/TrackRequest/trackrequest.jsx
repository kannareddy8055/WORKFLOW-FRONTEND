// pages/Employee/TrackRequest.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackRequest = () => {
  const { id } = useParams();
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    axios.get(`/requests/${id}/timeline`)
      .then(res => setTimeline(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div>
      <h2>Request Timeline</h2>
      <ul>
        {timeline.map((step, idx) => (
          <li key={idx}>
            Step {step.step_order}: {step.approverRole} → {step.status}
            {step.approverName && <span> (by {step.approverName})</span>}
            {step.comments && <p>💬 {step.comments}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackRequest;
