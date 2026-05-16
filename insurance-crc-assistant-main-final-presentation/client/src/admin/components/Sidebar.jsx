import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  FlagIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col justify-between min-h-screen">
      {/* Logo / Title */}
      <div className="p-6">
        <h1 className="text-xl font-bold text-purple-600">Insure Assist</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-6">
        {/* Dashboard & Monitoring */}
        <div>
          <h2 className="text-gray-500 text-xs uppercase mb-2">Dashboard & Monitoring</h2>
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/flagged" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">
                <FlagIcon className="h-5 w-5 mr-2" />
                Flagged Claims
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/investigations" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Investigations
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Fraud Rules & Intelligence */}
        <div>
          <h2 className="text-gray-500 text-xs uppercase mb-2">Fraud Rules & Intelligence</h2>
          <ul className="space-y-1">
            <li>
              <NavLink to="/admin/rules" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                Fraud Rules Engine
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/rule-performance" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">
                <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                Rule Performance
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Analytics */}
        <div>
          <h2 className="text-gray-500 text-xs uppercase mb-2">Analytics</h2>
          <ul className="space-y-1">
            <li>
              <NavLink to="/admin/analytics" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Fraud Analytics
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/reports" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">
                <DocumentChartBarIcon className="h-5 w-5 mr-2" />
                Reports
              </NavLink>
            </li>
          </ul>
        </div>

        {/* System & Admin */}
        <div>
          <h2 className="text-gray-500 text-xs uppercase mb-2">System & Admin</h2>
          <ul className="space-y-1">
            <li>
              <NavLink to="/admin/users" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">
                <UsersIcon className="h-5 w-5 mr-2" />
                Users & Roles
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/settings" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                System Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/audit-logs" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">
                <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                Audit Logs
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User avatar"
            className="h-10 w-10 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">Alexandra M.</p>
            <p className="text-xs text-green-600">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}