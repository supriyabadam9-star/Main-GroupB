import { FiHeadphones, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
function SidebarSupport({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored auth/session data
    localStorage.removeItem("token");   // adjust key if different
    sessionStorage.clear();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="mt-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg p-4 space-y-4">
      {/* Support Section */}
      <div className="flex items-center space-x-3">
        <FiHeadphones className="text-xl" />
        <div>
          <p className="text-sm font-semibold">Need Help?</p>
          <p className="text-xs text-white/80">
            Our support team is available 24/7 to assist with your claims.
          </p>
        </div>
      </div>

      <button className="bg-white text-indigo-600 text-xs font-medium px-3 py-1 rounded hover:bg-gray-100">
        Contact Support
      </button>

      {/* Divider */}
      <div className="border-t border-white/30 pt-3 flex items-center justify-between">
        {/* Profile Info */}
        <div className="flex items-center space-x-2">
          <img
            src={user?.photo || "https://via.placeholder.com/40"}
            alt="User"
            className="w-8 h-8 rounded-full object-cover border border-white"
          />
          <div>
            <p className="text-xs font-semibold">{user?.name || "John Doe"}</p>
            <p className="text-[11px] text-white/70">{user?.plan || "Premium Plan"}</p>
          </div>
        </div>

        {/* Logout Icon */}
        <FiLogOut
          className="text-lg cursor-pointer hover:text-white"
          title="Logout"
          onClick={handleLogout}  // functionality for logout button
        />
      </div>
    </div>
  );
}

export default SidebarSupport;