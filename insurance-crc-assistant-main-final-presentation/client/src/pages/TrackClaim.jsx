import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../config";

const TrackClaim = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const res = await fetch(`${baseURL}/claims/${id}`);
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
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading claim details...</div>;
  }

  if (!claim) {
    return <div className="p-6 text-red-600">Claim not found</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <button
        onClick={() => navigate("/claims")}
        className="text-purple-600 mb-4"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">
          Claim #{claim.id}
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          {claim.policy} · {claim.claim_type}
        </p>

        {/* Claim Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-xs text-gray-400">INCIDENT DATE</p>
            <p className="font-medium">{claim.incident_date}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">AMOUNT CLAIMED</p>
            <p className="font-medium">₹{claim.amount_claimed}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">STATUS</p>
            <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
              {claim.status}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="font-medium mb-4">Claim Timeline</h3>

          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-3 h-3 mt-1 bg-purple-600 rounded-full"></span>
              <div>
                <p className="font-medium">Claim Submitted</p>
                <p className="text-gray-500">
                  Your claim has been submitted successfully.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="w-3 h-3 mt-1 bg-gray-300 rounded-full"></span>
              <div>
                <p className="font-medium">Under Review</p>
                <p className="text-gray-500">
                  Our team is reviewing your claim documents.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="w-3 h-3 mt-1 bg-gray-300 rounded-full"></span>
              <div>
                <p className="font-medium">Final Decision</p>
                <p className="text-gray-500">
                  You will be notified once a decision is made.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/claims")}
            className="px-6 py-2 border rounded"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackClaim;
