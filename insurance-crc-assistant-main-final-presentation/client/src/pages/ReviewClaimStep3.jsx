import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const ReviewClaimStep3 = () => {
  const navigate = useNavigate();
  const claimId = localStorage.getItem("claim_id");

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!claimId) {
      alert("Claim ID missing. Please start again.");
      navigate("/claims/file/step1");
      return;
    }

    const fetchClaim = async () => {
      try {
        const res = await fetch(`${baseURL}/claims/${claimId}`);
        if (!res.ok) throw new Error("Failed to fetch claim");

        const data = await res.json();
        setClaim(data);
      } catch (err) {
        console.error(err);
        alert("Error loading claim details");
      } finally {
        setLoading(false);
      }
    };

    fetchClaim();
  }, [claimId, navigate]);

  const handleSubmit = () => {
    localStorage.removeItem("claim_id");
    navigate("/claims/submitted");
  };

  if (loading) {
    return (
      <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

        Loading claim details...
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

        Claim not found
      </div>
    );
  }

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">
          Review & Submit
        </h1>
        <p className="text-slate-500 mt-1">
          Step 3 of 3 · Confirm claim details
        </p>
      </div>

      {/* REVIEW CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-slate-500">Policy</p>
            <p className="font-medium text-slate-800">{claim.policy}</p>
          </div>

          <div>
            <p className="text-slate-500">Claim Type</p>
            <p className="font-medium text-slate-800">
              {claim.claim_type}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Incident Date</p>
            <p className="font-medium text-slate-800">
              {claim.incident_date}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Amount Claimed</p>
            <p className="font-medium text-slate-800">
              ₹{claim.amount_claimed}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-slate-500">Description</p>
            <p className="font-medium text-slate-800">
              {claim.description}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-slate-500">Current Status</p>
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs">
              {claim.status}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between pt-6">
          <button
            onClick={() => navigate("/claims/file/step2")}
            className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition"
          >
            ← Back
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Submit Claim →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewClaimStep3;
