import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import DashboardSidebar from "@/components/DashboardSidebar.jsx";
import DashboardOverview from "@/components/DashboardOverview.jsx";
import MedicationTracking from "@/components/MedicationTracking.jsx";
import WeightProgress from "@/components/WeightProgress.jsx";
import { useAuth } from "@/contexts/AuthContext";

const DashboardLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  // If still loading auth status, show a loading indicator
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wellness-600 mx-auto mb-4"></div>
          <p className="text-xl text-wellness-800">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="weight" element={<WeightProgress />} />
        <Route path="medications" element={<MedicationTracking />} />
        <Route
          path="settings"
          element={
            <div className="p-6 bg-white rounded-lg shadow-sm border border-wellness-100">
              <h2 className="text-2xl font-bold text-wellness-800 mb-6">
                Settings
              </h2>
              <p className="text-wellness-600">
                Account settings and preferences coming soon.
              </p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default Dashboard;
