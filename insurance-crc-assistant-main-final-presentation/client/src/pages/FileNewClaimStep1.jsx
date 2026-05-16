import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const FileNewClaimStep1 = () => {
  const navigate = useNavigate();

  // =========================
  // STATE
  // =========================
  const [policies, setPolicies] = useState([]);
  const [claimTypes, setClaimTypes] = useState([]);

  const [loadingPolicies, setLoadingPolicies] = useState(true);
  const [loadingClaimTypes, setLoadingClaimTypes] = useState(true);

  const [formData, setFormData] = useState({
    policy: "",
    claim_type: "",
    incident_date: "",
    description: "",
    amount_claimed: "",
  });

  // =========================
  // FETCH POLICIES
  // =========================
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await fetch(`${baseURL}/claims/policies`);
        if (!res.ok) throw new Error("Failed to fetch policies");

        const data = await res.json();
        setPolicies(data);
      } catch (error) {
        console.error(error);
        alert("Unable to load policy options");
      } finally {
        setLoadingPolicies(false);
      }
    };

    fetchPolicies();
  }, []);

  // =========================
  // FETCH CLAIM TYPES
  // =========================
  useEffect(() => {
    const fetchClaimTypes = async () => {
      try {
        const res = await fetch(`${baseURL}/claims/claim-types`);
        if (!res.ok) throw new Error("Failed to fetch claim types");

        const data = await res.json();
        setClaimTypes(data);
      } catch (error) {
        console.error(error);
        alert("Unable to load claim types");
      } finally {
        setLoadingClaimTypes(false);
      }
    };

    fetchClaimTypes();
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SUBMIT CLAIM (STEP 1)
  // =========================
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${baseURL}/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          policy: formData.policy,
          claim_type: formData.claim_type,
          incident_date: formData.incident_date,
          description: formData.description,
          amount_claimed: Number(formData.amount_claimed),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create claim");
      }

      const data = await res.json();
      localStorage.setItem("claim_id", data.id);
      navigate("/claims/file/step2");
    } catch (error) {
      console.error(error);
      alert("Error creating claim. Please try again.");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">
          File New Claim
        </h1>
        <p className="text-slate-500 mt-1">
          Step 1 of 3 · Claim details
        </p>
      </div>

      {/* FORM CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 space-y-6">
        {/* POLICY */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Policy
          </label>
          <select
            name="policy"
            value={formData.policy}
            onChange={handleChange}
            disabled={loadingPolicies}
            className="w-full mt-2 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option value="">
              {loadingPolicies ? "Loading policies..." : "Select Policy"}
            </option>
            {policies.map((policy) => (
              <option key={policy} value={policy}>
                {policy}
              </option>
            ))}
          </select>
        </div>

        {/* CLAIM TYPE */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Claim Type
          </label>
          <select
            name="claim_type"
            value={formData.claim_type}
            onChange={handleChange}
            disabled={loadingClaimTypes}
            className="w-full mt-2 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option value="">
              {loadingClaimTypes
                ? "Loading claim types..."
                : "Select Claim Type"}
            </option>
            {claimTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* INCIDENT DATE */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Incident Date
          </label>
          <input
            type="date"
            name="incident_date"
            value={formData.incident_date}
            onChange={handleChange}
            className="w-full mt-2 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full mt-2 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none"
          />
        </div>

        {/* AMOUNT */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Amount Claimed
          </label>
          <input
            type="number"
            name="amount_claimed"
            value={formData.amount_claimed}
            onChange={handleChange}
            className="w-full mt-2 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between pt-6">
          <button
            onClick={() => navigate("/claims")}
            className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition"
          >
            ← Back
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Next: Upload Documents →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileNewClaimStep1;
