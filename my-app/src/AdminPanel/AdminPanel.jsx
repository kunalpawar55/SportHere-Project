import React, { useEffect, useState } from "react";
import Topbar from "./components/Topbar";
import AdminSidebar from "./components/AdminSidebar";
import StatsCard from "./components/StatsCard";
import RecentUsers from "./components/RecentUsers";
import RecentMatches from "./components/RecentMatches";
import QuickActions from "./components/QuickActions";
import MatchesTable from "./components/MatchesTable";
import ImageAdminPanel from "./ImageAdminPanel";
import useAdminData from "./Hooks/useAdminData";

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const { loading, error, users, matches, images, deleteMatch } = useAdminData();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || userData.role !== "admin") {
      window.location.href = "/login";
    }
  }, []);
  const totalUsers = users.length;
  const totalMatches = matches.length + images.length;
  const totalDownloads = 678;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      <Topbar setSidebarOpen={setSidebarOpen} />

      <div className="flex">

        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <main className="flex-1 md:ml-64 p-6">

          {loading && <div className="text-center py-20">Loading...</div>}
          {error && <div className="text-center py-20 text-red-500">{error}</div>}

          {!loading && !error && (
            <>
              {activeSection === "dashboard" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <StatsCard title="Total Users" value={totalUsers} color="#10B981" trend="+2.6%" />
                    <StatsCard title="Total Matches" value={totalMatches} color="#0EA5E9" trend="+0.2%" />
                    <StatsCard title="Downloads" value={totalDownloads} color="#EF4444" trend="-0.1%" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <RecentUsers users={users} />
                    <RecentMatches matches={matches} />
                    <QuickActions setActiveSection={setActiveSection} />
                  </div>

                  <MatchesTable matches={matches} deleteMatch={deleteMatch} />
                </>
              )}

              {activeSection === "images" && <ImageAdminPanel />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
