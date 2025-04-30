import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BarChart, Weight, Pill, Settings } from "lucide-react";

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: BarChart,
    description: "Dashboard summary",
  },
  {
    title: "Weight Progress",
    href: "/dashboard/weight",
    icon: Weight,
    description: "Track your weight journey",
  },
  {
    title: "Medications",
    href: "/dashboard/medications",
    icon: Pill,
    description: "Manage your medications",
  },
];

const DashboardSidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="hidden md:flex flex-col border-r border-wellness-100 bg-white w-64 p-4 h-[calc(100vh-4rem)]">
      <div className="mb-6 px-3 pt-3">
        <h2 className="font-semibold text-lg text-wellness-800">
          Acme Wellness
        </h2>
        <p className="text-xs text-wellness-600">Your wellness journey</p>
      </div>

      <div className="flex-1 mt-2">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-normal h-auto p-3",
                    isActive
                      ? "bg-wellness-50 text-wellness-800 hover:bg-wellness-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-wellness-800"
                  )}
                >
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "mr-3 p-1.5 rounded-md",
                        isActive ? "bg-wellness-200" : "bg-gray-100"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4",
                          isActive ? "text-wellness-700" : "text-gray-500"
                        )}
                      />
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="bg-wellness-50 rounded-lg p-3 text-sm">
          <h4 className="font-medium text-wellness-800">Need assistance?</h4>
          <p className="text-xs text-wellness-600 mt-1">
            Contact your healthcare provider for any questions about your
            treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
