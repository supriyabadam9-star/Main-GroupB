import { useNavigate } from "react-router-dom";

export default function RecommendedPolicies() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-500 text-lg">⭐</span>
          <h3 className="text-lg font-semibold">Recommended</h3>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          Personalized insurance suggestions based on your profile.
        </p>

        {/* ✅ BULLETED POINTS (compact, low height) */}
        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
          <li>Coverage gaps identified</li>
          <li>Cost-saving options available</li>
          <li>Policies matched to your profile</li>
        </ul>
      </div>

      {/* CTA BUTTON */}
      <button
        onClick={() => navigate("/recommendedPolicies")}
        className="mt-5 w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
      >
        View Recommended Policies →
      </button>
    </div>
  );
}
