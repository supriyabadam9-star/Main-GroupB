import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  // ✅ HOOKS (must be first, always)
  const [open, setOpen] = useState(false);
  const [notifications] = useState([]); // empty initially
  const bellRef = useRef(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasUnread = notifications.some((n) => n.unread);
  // ✅ SHOW NAVBAR ONLY ON DASHBOARD ROUTES
  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/dashboard";
  if (!showNavbar) {
    return null;
  }

  return (
    <header className="h-20 bg-white flex items-center justify-between px-8 border-b">
      {/* LEFT */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back! Here's your insurance portfolio status.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search policies, claims..."
            className="pl-9 pr-4 py-2 w-64 text-sm rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {hasUnread && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border z-50">
              <div className="px-4 py-3 font-semibold text-gray-800 border-b">
                Notifications
              </div>

              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500 text-center">
                    No notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      <p className="font-medium">{n.title}</p>
                      <p className="text-xs text-gray-500">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={() => navigate("/notifications")}
                className="w-full text-sm py-2 text-indigo-600 hover:bg-gray-50"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* Get Quote */}
        <button
          onClick={() => navigate("/quote")}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:opacity-90 transition"
        >
          + Get a Quote
        </button>
      </div>
    </header>
  );
}
