import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  generateWeightData,
  userProfile,
  calculateBMI,
  getBMICategory,
  calculateWeightLoss,
  calculateProgressPercentage,
} from "@/services/mockData";
import { Progress } from "@/components/ui/progress";
import { Activity, Package, Pill, CalendarDays, BarChart } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const DashboardOverview = () => {
  const [weightData, setWeightData] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const data = generateWeightData(userProfile.initialWeight);
    const latestWeight = data[data.length - 1].weight;

    setWeightData(data.slice(-7));
    setProfile({
      ...userProfile,
      currentWeight: latestWeight,
    });
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const bmi = calculateBMI(profile.currentWeight, profile.height);
  const bmiCategory = getBMICategory(bmi);
  const weightLoss = calculateWeightLoss(
    profile.initialWeight,
    profile.currentWeight
  );
  const progressPercentage = calculateProgressPercentage(
    profile.initialWeight,
    profile.currentWeight,
    profile.goalWeight
  );

  const chartData = weightData.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    weight: item.weight,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-wellness-800">
          Dashboard
        </h1>
        <div className="flex items-center space-x-2 text-wellness-600 bg-wellness-50 px-4 py-2 rounded-full mt-2 md:mt-0">
          <CalendarDays className="h-5 w-5" />
          <span className="text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border-wellness-100 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-wellness-50 to-wellness-100">
            <CardTitle className="text-lg font-semibold text-wellness-800">
              Weight Summary
            </CardTitle>
            <BarChart className="h-5 w-5 text-wellness-600" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-3 bg-wellness-50 rounded-lg">
                  <span className="text-xs font-medium text-wellness-600">
                    Current
                  </span>
                  <span className="text-xl font-bold text-wellness-800">
                    {profile.currentWeight}
                  </span>
                  <span className="text-xs text-wellness-600">lbs</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-wellness-50 rounded-lg">
                  <span className="text-xs font-medium text-wellness-600">
                    Initial
                  </span>
                  <span className="text-xl font-bold text-wellness-800">
                    {profile.initialWeight}
                  </span>
                  <span className="text-xs text-wellness-600">lbs</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-wellness-50 rounded-lg">
                  <span className="text-xs font-medium text-wellness-600">
                    Goal
                  </span>
                  <span className="text-xl font-bold text-wellness-800">
                    {profile.goalWeight}
                  </span>
                  <span className="text-xs text-wellness-600">lbs</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 text-green-800 rounded-lg">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  <span className="text-sm font-medium">Weight Loss</span>
                </div>
                <span className="text-xl font-bold">{weightLoss} lbs</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 text-blue-800 rounded-lg">
                <div className="flex items-center">
                  <span className="text-sm font-medium">BMI</span>
                </div>
                <span className="text-xl font-bold">
                  {bmi} <span className="text-sm">({bmiCategory})</span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Goal Progress</span>
                  <span className="text-sm font-medium">
                    {progressPercentage}%
                  </span>
                </div>
                <Progress
                  value={progressPercentage}
                  className="h-2.5 bg-wellness-100"
                  indicatorClassName="bg-wellness-600"
                />
              </div>

              <div className="h-40 pt-4 chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis
                      domain={["dataMin - 2", "dataMax + 2"]}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "white",
                        border: "1px solid #e0f2fe",
                        borderRadius: "0.5rem",
                      }}
                      labelStyle={{ fontWeight: "bold", color: "#0ea5e9" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      dot={{ fill: "#0ea5e9", r: 4 }}
                      activeDot={{ r: 6, fill: "#0284c7" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medication Summary Card */}
        <Card className="overflow-hidden border-wellness-100 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-wellness-50 to-wellness-100">
            <CardTitle className="text-lg font-semibold text-wellness-800">
              Medication
            </CardTitle>
            <Pill className="h-5 w-5 text-wellness-600" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border border-wellness-100 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-wellness-600">
                    Current Medication
                  </span>
                  <span className="text-sm font-medium px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex items-center">
                  <Pill className="h-6 w-6 text-wellness-600 mr-2" />
                  <div>
                    <p className="text-xl font-bold text-wellness-800">
                      Ozempic
                    </p>
                    <p className="text-sm text-wellness-600">0.5mg weekly</p>
                  </div>
                </div>
              </div>

              <div className="border border-wellness-100 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-wellness-600">
                    Next Refill
                  </span>
                  <span className="text-sm font-medium px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                    Upcoming
                  </span>
                </div>
                <p className="text-xl font-bold text-wellness-800">
                  May 1, 2025
                </p>
                <div className="flex items-center mt-2">
                  <Package className="h-4 w-4 text-wellness-600 mr-2" />
                  <p className="text-sm text-wellness-600">
                    Tracking:{" "}
                    <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">
                      ACME123456789
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-md bg-wellness-50">
                <div className="flex items-center text-wellness-800">
                  <CalendarDays className="h-5 w-5 mr-3 text-wellness-600" />
                  <div>
                    <h4 className="font-medium">Treatment Summary</h4>
                    <p className="text-sm text-wellness-600">
                      Started:{" "}
                      {new Date(profile.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-wellness-600">
                      Duration:{" "}
                      {Math.floor(
                        (new Date() - new Date(profile.startDate)) /
                          (1000 * 60 * 60 * 24 * 7)
                      )}{" "}
                      weeks
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
