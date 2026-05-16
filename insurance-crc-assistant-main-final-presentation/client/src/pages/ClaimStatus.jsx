import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const ClaimStatus = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await fetch(`${baseURL}/claims`);
        if (!res.ok) throw new Error("Failed to fetch claims");
        const data = await res.json();
        setClaims(data);
      } catch (err) {
        console.error(err);
        alert("Error loading claims");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

        Loading claims...
      </div>
    );
  }

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">
            Claim Status
          </h1>
          <p className="text-slate-500 mt-1">
            Track and manage your submitted claims
          </p>
        </div>

        <button
          onClick={() => navigate("/claims/file/step1")}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          + File New Claim
        </button>
      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-indigo-50 border-b text-slate-600">
            <tr>
              <th className="text-left px-6 py-4">Claim ID</th>
              <th className="text-left px-6 py-4">Policy</th>
              <th className="text-left px-6 py-4">Type</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {claims.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-slate-500"
                >
                  No claims found
                </td>
              </tr>
            )}

            {claims.map((claim) => (
              <tr
                key={claim.id}
                className="border-b last:border-none hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  #{claim.id}
                </td>
                <td className="px-6 py-4">{claim.policy}</td>
                <td className="px-6 py-4">
                  {claim.claim_type}
                </td>
                <td className="px-6 py-4">
                  {claim.incident_date}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs">
                    {claim.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      navigate(`/claims/track/${claim.id}`)
                    }
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View / Track →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BACK */}
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/claims")}
          className="mt-8 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ClaimStatus;
