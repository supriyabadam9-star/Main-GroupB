export default function ProfileSummary({ profile }) {
  if (!profile) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-gray-500 text-sm">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col items-center">
      <div className="relative mb-4">
        <img
          src={profile.photo || "/default-avatar.png"}
          alt={profile.username || "User"}
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
        />
        <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
          Verified
        </span>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {profile.username || "John Doe"}
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 w-full text-sm text-gray-700">
        <div className="bg-gray-100 rounded p-3">
          <p className="font-medium text-gray-600">Policyholder ID</p>
          <p>
            {profile.id
              ? `893-221-${String(profile.id).padStart(2, "0")}`
              : "—"}
          </p>
        </div>
        <div className="bg-gray-100 rounded p-3">
          <p className="font-medium text-gray-600">Tenure</p>
          <p>{profile.tenure || "3 Years"}</p>
        </div>
        <div className="bg-gray-100 rounded p-3">
          <p className="font-medium text-gray-600">Risk Score</p>
          <p>{profile.risk || "Low"}</p>
        </div>
        <div className="bg-gray-100 rounded p-3">
          <p className="font-medium text-gray-600">Role</p>
          <p>{profile.role || "Policyholder"}</p>
        </div>
      </div>
    </div>
  );
}