import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const ClaimsDashboard = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}/claims`)
      .then((res) => res.json())
      .then((data) => setClaims(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      {/* PAGE HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-800">
          Claims Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          File, manage, and track your insurance claims
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-slate-700 mb-3">
            File New Claim
          </h3>
          <button
            onClick={() => navigate("/claims/file/step1")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg transition"
          >
            Start Claim
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-slate-700 mb-3">
            Upload Documents
          </h3>
          <button
            onClick={() => navigate("/claims/file/step2")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition"
          >
            Upload Files
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-slate-700 mb-3">
            Review & Submit
          </h3>
          <button
            onClick={() => navigate("/claims/review")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg transition"
          >
            Review Claim
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-slate-700 mb-3">
            Track Claim
          </h3>
          <button
            onClick={() => navigate("/claims/status")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg transition"
          >
            Track Status
          </button>
        </div>
      </div>

      {/* CLAIMS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Recent Claims
          </h2>
          <p className="text-sm text-slate-500">
            Overview of your recently filed claims
          </p>
        </div>

        {claims.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            No claims found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-700">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="py-3">ID</th>
                  <th className="py-3">Policy</th>
                  <th className="py-3">Type</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="border-b last:border-none hover:bg-slate-50 transition"
                  >
                    <td className="py-4 font-medium">#{claim.id}</td>
                    <td className="py-4">{claim.policy}</td>
                    <td className="py-4">{claim.claim_type}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-slate-100">
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        to={`/claims/track/${claim.id}`}
                        className="text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Track →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimsDashboard;
