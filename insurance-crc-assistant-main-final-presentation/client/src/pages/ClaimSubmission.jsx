import React from "react";
import { useNavigate } from "react-router-dom";

const ClaimSubmission = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      <div className="bg-white rounded-xl shadow p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
            ✓
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">
          Claim Submitted Successfully
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Your claim has been submitted. Our team will review it and update you
          shortly.
        </p>

        {/* Info */}
        <div className="border rounded-lg p-4 mb-6 bg-gray-50">
          <p className="text-xs text-gray-400">STATUS</p>
          <p className="font-medium text-green-600">Under Review</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/claims/status")}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            View Claim Status
          </button>

          <button
            onClick={() => navigate("/claims")}
            className="px-6 py-2 border rounded hover:bg-gray-100"
          >
            Back to Dashboard
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          You will receive email updates about your claim.
        </p>
      </div>
    </div>
  );
};

export default ClaimSubmission;

