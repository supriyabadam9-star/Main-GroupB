import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  ShieldAlert,
  Headphones,
  AlertTriangle,
  SlidersHorizontal, // ✅ NEW ICON
} from "lucide-react";
import { useProfile } from "../../context/ProfileContext";

export default function AdminSideBar() {
  const location = useLocation();
  const { profile, loading } = useProfile();

  const isActive = (path) => location.pathname.startsWith(path);

  const linkBase =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition";

  const activeLink = "bg-indigo-50 text-indigo-600 font-semibold";
  const inactiveLink = "text-gray-600 hover:bg-gray-100";

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col justify-between">
      {/* ================= TOP ================= */}
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
            I
          </div>
          <span className="font-semibold text-lg">
            Insure Assist <span className="text-indigo-600">Admin</span>
          </span>
        </div>

        {/* ===== DASHBOARD ===== */}
        <p className="px-6 text-xs text-gray-400 uppercase tracking-wide mb-2">
          Dashboard
        </p>
        <nav className="px-3 mb-6">
          <NavLink
            to="/admin/dashboard"
            className={() =>
              `${linkBase} ${
                isActive("/admin/dashboard") ? activeLink : inactiveLink
              }`
            }
          >
            <LayoutDashboard size={18} />
            Overview
          </NavLink>
        </nav>

        {/* ===== POLICY MANAGEMENT ===== */}
        <p className="px-6 text-xs text-gray-400 uppercase tracking-wide mb-2">
          Policy Management
        </p>
        <nav className="px-3 mb-6">
          <NavLink
            to="/admin/policies"
            className={() =>
              `${linkBase} ${
                isActive("/admin/policies") ? activeLink : inactiveLink
              }`
            }
          >
            <Settings size={18} />
            Policies
          </NavLink>
        </nav>

        {/* ===== FRAUD ===== */}
        <p className="px-6 text-xs text-gray-400 uppercase tracking-wide mb-2">
          Fraud
        </p>
        <nav className="px-3 space-y-1">
          <NavLink
            to="/admin/flagged-claims"
            className={() =>
              `${linkBase} ${
                isActive("/admin/flagged-claims")
                  ? activeLink
                  : inactiveLink
              }`
            }
          >
            <AlertTriangle size={18} />
            Flagged Claims
          </NavLink>

          <NavLink
            to="/admin/investigations"
            className={() =>
              `${linkBase} ${
                isActive("/admin/investigations")
                  ? activeLink
                  : inactiveLink
              }`
            }
          >
            <ShieldAlert size={18} />
            Investigations
          </NavLink>

          {/* ✅ NEW: FRAUD RULES ENGINE */}
          <NavLink
            to="/admin/fraud-rules"
            className={() =>
              `${linkBase} ${
                isActive("/admin/fraud-rules")
                  ? activeLink
                  : inactiveLink
              }`
            }
          >
            <SlidersHorizontal size={18} />
            Fraud Rules Engine
          </NavLink>
        </nav>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="px-4 pb-5 space-y-4">
        {/* Help Card */}
        <div className="bg-indigo-900 text-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Headphones size={18} />
            <p className="font-semibold text-sm">Need Help?</p>
          </div>

          <p className="text-xs text-indigo-200 mb-3">
            Admin support team is available 24/7.
          </p>

          <button className="w-full bg-white text-indigo-600 text-xs font-semibold py-2 rounded-lg hover:bg-indigo-50 transition">
            Contact Support
          </button>
        </div>

        {/* ===== ADMIN PROFILE ===== */}
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "hover:bg-gray-100"
            }`
          }
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
            {loading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            ) : profile?.avatar ? (
              <img
                src={profile.avatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold">
                {profile?.name?.[0] || "A"}
              </span>
            )}
          </div>

          <div>
            {loading ? (
              <>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
              </>
            ) : (
              <>
                <p className="text-sm font-semibold">
                  {profile?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500">Admin Profile</p>
              </>
            )}
          </div>
        </NavLink>
      </div>
    </aside>
  );
}
