import { useState } from "react";
import {
  BellIcon,
  QuestionMarkCircleIcon,
  MoonIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Topbar({ darkMode, setDarkMode }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between shadow px-6 py-3 bg-white dark:bg-gray-900 dark:text-white">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search claims by ID, rule name, or investigator..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-6 ml-6 relative">
        {/* Notifications */}
        <button
          className="relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-1">
            •
          </span>
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-10 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 z-50">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              No new notifications
            </p>
          </div>
        )}

        {/* Help */}
        <button onClick={() => navigate("/help")}>
          <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
        </button>

        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)}>
          <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
        </button>
      </div>
    </div>
  );
}