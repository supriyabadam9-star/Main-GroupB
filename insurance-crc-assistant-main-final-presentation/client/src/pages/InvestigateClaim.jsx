import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { getFlaggedClaims, startInvestigation } from "../utils/fraudApi";

export default function InvestigateClaim() {
  const { claimId } = useParams();
  const navigate = useNavigate();

  const [claim, setClaim] = useState(null);
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ ONLY ADDITION
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadClaim();
  }, []);

  const loadClaim = async () => {
    const res = await getFlaggedClaims();
    const found = res.results.find(
      (c) => String(c.claim_id) === String(claimId)
    );
    setClaim(found);
  };

  const handleStartInvestigation = async () => {
    try {
      setLoading(true);

      await startInvestigation({
        claim_id: Number(claimId),
        priority,
        notes,
      });

      // ✅ ONLY CHANGE: show success popup (no redirect here)
      setSuccessMessage("Investigation started successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!claim) return <div className="p-6">Loading investigation...</div>;

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      <div className="max-w-3xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-6"
        >
          <ArrowLeft size={16} />
          Back to Flagged Claims
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">

          {/* HEADER */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Start Investigation
              </h1>
              <p className="text-sm text-gray-500">
                Claim #{claim.claim_id}
              </p>
            </div>
          </div>

          {/* CLAIM SUMMARY */}
          <section>
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">
              Claim Summary
            </h3>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Policy</span>
              <span>{claim.policy}</span>

              <span className="text-gray-500">Type</span>
              <span>{claim.claim_type}</span>

              <span className="text-gray-500">Amount</span>
              <span>₹{claim.amount}</span>

              <span className="text-gray-500">Fraud Score</span>
              <span className="font-bold text-red-600">
                {claim.fraud_score}%
              </span>
            </div>
          </section>

          {/* POLICYHOLDER */}
          <section>
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">
              Policyholder
            </h3>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">User ID</span>
              <span>{claim.policyholder_id}</span>

              <span className="text-gray-500">Email</span>
              <span>{claim.policyholder_name}</span>
            </div>
          </section>

          {/* RULES */}
          <section>
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">
              Rules Triggered
            </h3>

            <div className="flex flex-wrap gap-2">
              {claim.rules.map((r, i) => (
                <span
                  key={i}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {r}
                </span>
              ))}
            </div>
          </section>

          {/* INVESTIGATION INPUT */}
          <section>
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">
              Investigation Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border focus:ring-2 focus:ring-violet-500"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Investigation Notes
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe why this claim requires investigation..."
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="flex justify-between pt-6">
            <button
              onClick={() => navigate(-1)}
              className="text-sm font-semibold text-gray-500 hover:text-gray-800"
            >
              Cancel
            </button>

            <button
              onClick={handleStartInvestigation}
              disabled={loading}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Starting..." : "Start Investigation"}
            </button>
          </div>

        </div>
      </div>

      {/* ================= SUCCESS MODAL (ONLY ADDITION) ================= */}
      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-6 w-[320px] text-center shadow-xl">
            <p className="font-semibold text-green-700 mb-4">
              {successMessage}
            </p>
            <button
              onClick={() => {
                setSuccessMessage("");
                navigate("/admin/flagged-claims");
              }}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
