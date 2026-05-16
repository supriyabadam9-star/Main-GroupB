import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function PageContainer() {
  return (
    <div className="min-h-screen flex
                    bg-gray-100 dark:bg-gray-950
                    text-gray-900 dark:text-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
