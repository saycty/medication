import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  // generateWeightData,
  userProfile,
  calculateBMI,
  getBMICategory,
  weightHistory,
} from "@/services/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { useToast } from "../hooks/use-toast";
const WeightProgress = () => {
  const [weightData, setWeightData] = useState([]);
  const [newWeight, setNewWeight] = useState("");
  const [profile, setProfile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    // const data = generateWeightData(userProfile.initialWeight);
    // const data = [
    //   { id: "w1", userId: "1", weight: 180, date: "2024-03-01" },
    //   { id: "w2", userId: "1", weight: 177, date: "2024-03-08" },
    //   { id: "w3", userId: "1", weight: 174, date: "2024-03-15" },
    //   { id: "w4", userId: "1", weight: 172, date: "2024-03-22" },
    //   { id: "w5", userId: "1", weight: 170, date: "2024-03-29" },
    // ];
    setWeightData(weightHistory);
    setProfile(userProfile);
  }, []);

  const handleAddWeight = () => {
    if (!newWeight || isNaN(parseFloat(newWeight))) {
      toast({
        title: "Invalid weight",
        description: "Please enter a valid weight value",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const updatedData = [
      ...weightData,
      {
        id: `weight-${weightData.length + 1}`,
        userId: "1",
        weight: parseFloat(newWeight),
        date: today,
      },
    ];

    setWeightData(updatedData);
    setProfile({
      ...profile,
      currentWeight: parseFloat(newWeight),
    });

    toast({
      title: "Weight Updated",
      description: `Your weight has been updated to ${newWeight} lbs.`,
    });
    setNewWeight("");
    setIsDialogOpen(false);
  };

  if (!profile) {
    return <div className="text-center p-12">Loading weight data...</div>;
  }

  // Prepare chart data
  const chartData = weightData.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    weight: entry.weight,
    fullDate: entry.date,
  }));

  // Calculate analytics
  const initialWeight = profile.initialWeight;
  const currentWeight = profile.currentWeight;
  const startDate = new Date(profile.startDate);
  const today = new Date();
  const daysActive = Math.round((today - startDate) / (1000 * 60 * 60 * 24));
  const weightLoss = initialWeight - currentWeight;
  const weightLossPercentage = ((weightLoss / initialWeight) * 100).toFixed(1);
  const weightPerDay = (weightLoss / daysActive).toFixed(2);
  const bmi = calculateBMI(currentWeight, profile.height);
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Weight Progress</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Record Weight</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Record Today's Weight</DialogTitle>
              <DialogDescription>
                Track your progress by recording your current weight.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Weight (lbs)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddWeight}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Weight Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weightLoss.toFixed(1)} lbs
            </div>
            <p className="text-xs text-muted-foreground">
              ({weightLossPercentage}% of starting weight)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current BMI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bmi}</div>
            <p className="text-xs text-muted-foreground">{bmiCategory}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Days Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysActive}</div>
            <p className="text-xs text-muted-foreground">
              Since {format(startDate, "MMM d, yyyy")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Loss Per Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weightPerDay} lbs</div>
            <p className="text-xs text-muted-foreground">
              {(parseFloat(weightPerDay) * 7).toFixed(2)} lbs per week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weight Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weight History</CardTitle>
          <CardDescription>
            Track your weight loss journey over time
          </CardDescription>
        </CardHeader>
        <CardContent className="chart-container">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  domain={["dataMin - 5", "dataMax + 5"]}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value) => [`${value} lbs`, "Weight"]} />
                <Legend />
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  fill="url(#colorWeight)"
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weight Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Weight Log</CardTitle>
          <CardDescription>
            Detailed history of your weight entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Weight (lbs)</th>
                  <th className="py-2 px-4 text-left">Change</th>
                </tr>
              </thead>
              <tbody>
                {weightData
                  .slice()
                  .reverse()
                  .slice(0, 10)
                  .map((entry, index, arr) => {
                    const prevEntry =
                      index < arr.length - 1 ? arr[index + 1] : null;
                    const change = prevEntry
                      ? (entry.weight - prevEntry.weight).toFixed(1)
                      : "-";
                    const changeClass =
                      change > 0
                        ? "text-red-500"
                        : change < 0
                        ? "text-green-500"
                        : "";

                    return (
                      <tr key={entry.id} className="border-b">
                        <td className="py-2 px-4">
                          {format(new Date(entry.date), "MMM d, yyyy")}
                        </td>
                        <td className="py-2 px-4">{entry.weight}</td>
                        <td className={`py-2 px-4 ${changeClass}`}>
                          {change !== "-"
                            ? change > 0
                              ? `+${change}`
                              : change
                            : "-"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightProgress;
