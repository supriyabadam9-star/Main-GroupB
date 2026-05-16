import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/admin/AdminSideBar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSideBar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
