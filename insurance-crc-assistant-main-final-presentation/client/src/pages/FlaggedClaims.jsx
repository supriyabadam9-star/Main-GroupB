import { useEffect, useState } from "react";
import {
  getFlaggedClaims,
  approveFlaggedClaim,
  denyFlaggedClaim,
} from "../utils/fraudApi";
import { useNavigate } from "react-router-dom";

export default function FlaggedClaims() {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [severity, setSeverity] = useState("ALL");
  const [minScore, setMinScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [denyConfirmOpen, setDenyConfirmOpen] = useState(false);

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    try {
      const res = await getFlaggedClaims();
      setClaims(res.results || []);
      setSelectedClaim(res.results?.[0] || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredClaims = claims.filter((c) => {
    const severityMatch =
      severity === "ALL" ? true : c.severity === severity;
    const scoreMatch = c.fraud_score >= minScore;
    return severityMatch && scoreMatch;
  });

  const handleApprove = async () => {
    try {
      await approveFlaggedClaim(selectedClaim.claim_id);
      setClaims((prev) =>
        prev.filter((c) => c.claim_id !== selectedClaim.claim_id)
      );
      setSelectedClaim(null);
      setSuccessMessage(
        `Claim #${selectedClaim.claim_id} approved successfully`
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectConfirm = async () => {
    try {
      await denyFlaggedClaim(selectedClaim.claim_id);
      setClaims((prev) =>
        prev.filter((c) => c.claim_id !== selectedClaim.claim_id)
      );
      setSelectedClaim(null);
      setDenyConfirmOpen(false);
      setSuccessMessage(
        `Claim #${selectedClaim.claim_id} rejected successfully`
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleInvestigateLater = () => {
    setDenyConfirmOpen(false);
    navigate(`/admin/flagged-claims/${selectedClaim.claim_id}/investigate`);
    };


  if (loading) return <div className="p-6">Loading flagged claims...</div>;

  const badge = (level) => {
    const map = {
      HIGH: "bg-red-100 text-red-700",
      MEDIUM: "bg-yellow-100 text-yellow-700",
      LOW: "bg-green-100 text-green-700",
    };
    return (
      <span
        className={`text-xs px-3 py-1 rounded-full font-semibold ${map[level]}`}
      >
        {level}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-violet-50">
      <main className="px-6 py-6 max-w-[1400px] mx-auto space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Flagged Claims
          </h1>
          <p className="text-sm text-gray-600">
            {claims.length} Total · High{" "}
            {claims.filter((c) => c.severity === "HIGH").length} · Medium{" "}
            {claims.filter((c) => c.severity === "MEDIUM").length} · Low{" "}
            {claims.filter((c) => c.severity === "LOW").length}
          </p>
        </div>

        {/* FILTER */}
        <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <label className="font-semibold text-gray-700 mb-2 block">
              Severity
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="ALL">All</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <div className="col-span-9">
            <label className="font-semibold text-gray-700 mb-2 block">
              Minimum Fraud Score: {minScore}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LIST */}
          <div className="col-span-7 bg-white rounded-2xl shadow divide-y">
            {filteredClaims.map((c) => (
              <div
                key={c.claim_id}
                onClick={() => setSelectedClaim(c)}
                className={`p-4 cursor-pointer flex justify-between transition
                  ${
                    selectedClaim?.claim_id === c.claim_id
                      ? "bg-violet-50 border-l-4 border-violet-600"
                      : "hover:bg-gray-50"
                  }`}
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    #{c.claim_id} · {c.policy}
                  </p>
                  <p className="text-xs text-gray-500">
                    {c.claim_type}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <p className="font-semibold">₹{c.amount}</p>
                  {badge(c.severity)}
                </div>
              </div>
            ))}
          </div>

          {/* DETAIL CARD */}
          {selectedClaim && (
            <div className="col-span-5">
              <div className="bg-white rounded-2xl shadow p-6 space-y-5 sticky top-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    Claim #{selectedClaim.claim_id}
                  </h2>
                  <span className="text-3xl font-extrabold text-red-600">
                    {selectedClaim.fraud_score}%
                  </span>
                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-2 text-sm gap-y-2">
                  <span className="text-gray-500">Policy</span>
                  <span>{selectedClaim.policy}</span>

                  <span className="text-gray-500">Type</span>
                  <span>{selectedClaim.claim_type}</span>

                  <span className="text-gray-500">Status</span>
                  <span>{selectedClaim.status}</span>

                  <span className="text-gray-500">Amount</span>
                  <span>₹{selectedClaim.amount}</span>

                  {/* ✅ SEPARATE ROWS AS REQUESTED */}
                  <span className="text-gray-500">Policyholder ID</span>
                  <span>{selectedClaim.policyholder_id}</span>

                  <span className="text-gray-500">Policyholder Email</span>
                  <span>{selectedClaim.policyholder_name}</span>
                </div>

                {/* RULES */}
                <div>
                  <p className="text-xs font-semibold uppercase mb-2">
                    Rules Triggered
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedClaim.rules.map((r, i) => (
                      <span
                        key={i}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleApprove}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setDenyConfirmOpen(true)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
                  >
                    Deny
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* DENY MODAL */}
      {denyConfirmOpen && selectedClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-[380px] p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
              What do you want to do?
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              Claim #{selectedClaim.claim_id} has been flagged for fraud.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleRejectConfirm}
                className="w-full bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700"
              >
                Reject Claim
              </button>

              <button
                onClick={handleInvestigateLater}
                className="w-full bg-yellow-500 text-white py-2.5 rounded-xl font-semibold hover:bg-yellow-600"
              >
                Investigate Later
              </button>

              <button
                onClick={() => setDenyConfirmOpen(false)}
                className="w-full text-gray-600 text-sm py-2 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-2xl p-6 w-[320px] text-center shadow-xl">
            <p className="font-semibold text-green-700 mb-4">
              {successMessage}
            </p>
            <button
              onClick={() => setSuccessMessage("")}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
