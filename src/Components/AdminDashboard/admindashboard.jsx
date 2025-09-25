// src/pages/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [chains, setChains] = useState([]);
  const [newChain, setNewChain] = useState({
    name: "",
    requestType: "LEAVE",
  });

  // Fetch all chains
  useEffect(() => {
    fetchChains();
  }, []);

  const fetchChains = async () => {
    try {
      const res = await axios.get("https://workflow-backend-3.onrender.com/api/chains");
      setChains(res.data);
    } catch (err) {
      console.error("Error fetching chains", err);
    }
  };

  const createChain = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://workflow-backend-3.onrender.com/api/chains", {
        ...newChain,
        createdBy: JSON.parse(localStorage.getItem("user"))._id,
      });
      alert("Approval Chain created!");
      fetchChains();
      setNewChain({ name: "", requestType: "LEAVE" });
    } catch (err) {
      console.error("Error creating chain", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>

      <form onSubmit={createChain} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Chain Name"
          value={newChain.name}
          onChange={(e) => setNewChain({ ...newChain, name: e.target.value })}
          required
        />
        <select
          value={newChain.requestType}
          onChange={(e) => setNewChain({ ...newChain, requestType: e.target.value })}
        >
          <option value="LEAVE">Leave</option>
          <option value="BUDGET">Budget</option>
          <option value="PROJECT">Project</option>
        </select>
        <button type="submit">Create Chain</button>
      </form>

      <h3>Existing Approval Chains</h3>
      <ul>
        {chains.map((chain) => (
          <li key={chain._id}>
            {chain.name} ({chain.requestType})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
