import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { medications, shipments } from "@/services/mockData";
import { Badge } from "@/components/ui/badge";
import { Package, PackageCheck, PackageOpen, Truck, Clock } from "lucide-react";
import { format } from "date-fns";

const MedicationTracking = () => {
  const [activeMedication, setActiveMedication] = useState(null);
  const [upcomingShipments, setUpcomingShipments] = useState([]);
  const [pastShipments, setPastShipments] = useState([]);

  useEffect(() => {
    const active = medications.find((med) => med.active);
    setActiveMedication(active);

    const upcoming = [];
    const past = [];

    shipments.forEach((shipment) => {
      if (shipment.status === "delivered") {
        past.push({
          ...shipment,
          medication:
            medications.find((m) => m.id === shipment.medicationId)?.name ||
            "Unknown",
        });
      } else {
        upcoming.push({
          ...shipment,
          medication:
            medications.find((m) => m.id === shipment.medicationId)?.name ||
            "Unknown",
        });
      }
    });

    setUpcomingShipments(upcoming);
    setPastShipments(past);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-600 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "shipped":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-600 border-blue-200"
          >
            Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200"
          >
            Delivered
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Package className="h-8 w-8 text-yellow-500" />;
      case "shipped":
        return <Truck className="h-8 w-8 text-blue-500" />;
      case "delivered":
        return <PackageOpen className="h-8 w-8 text-green-500" />;
      default:
        return <Package className="h-8 w-8" />;
    }
  };

  const nextRefillDate = activeMedication
    ? new Date(
        new Date().setDate(new Date().getDate() + 14)
      ).toLocaleDateString()
    : "Not scheduled";

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight">
        Medication & Shipment Tracking
      </h1>

      {/* Current Medication */}
      <Card>
        <CardHeader>
          <CardTitle>Current Medication</CardTitle>
          <CardDescription>Your active prescription</CardDescription>
        </CardHeader>
        <CardContent>
          {activeMedication ? (
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="bg-wellness-50 p-3 rounded-lg">
                <PackageOpen className="h-6 w-6 text-wellness-600" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <h3 className="font-medium text-lg">
                    {activeMedication.name}
                  </h3>
                  <Badge className="bg-wellness-100 text-wellness-800 hover:bg-wellness-200 w-fit">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Dosage: {activeMedication.dosage}
                </p>
                <p className="text-sm mt-3">{activeMedication.description}</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Start Date</span>
                    </div>
                    <p className="mt-1 text-sm">
                      {format(
                        new Date(activeMedication.startDate),
                        "MMM d, yyyy"
                      )}
                    </p>
                  </div>

                  <div className="border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Next Refill</span>
                    </div>
                    <p className="mt-1 text-sm">{nextRefillDate}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No active medications found.</p>
          )}
        </CardContent>
      </Card>

      {/* Shipment Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Shipment Tracking</CardTitle>
          <CardDescription>Track your medication deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {upcomingShipments.length > 0 ? (
                <div className="space-y-6">
                  {upcomingShipments.map((shipment) => (
                    <div key={shipment.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex items-center justify-center min-w-[60px]">
                          {getStatusIcon(shipment.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                            <h3 className="font-medium">
                              {shipment.medication}
                            </h3>
                            {getStatusBadge(shipment.status)}
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground">Shipped</p>
                                <p>
                                  {new Date(
                                    shipment.shipmentDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  Expected Delivery
                                </p>
                                <p>
                                  {new Date(
                                    shipment.expectedDeliveryDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="col-span-2 md:col-span-1">
                                <p className="text-muted-foreground">
                                  Tracking
                                </p>
                                <p className="font-mono">
                                  {shipment.trackingNumber}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-right">
                        <Button variant="outline" size="sm">
                          Track Package
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <Package className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No upcoming shipments.
                  </p>
                  <Button className="mt-4" variant="outline" size="sm">
                    Request Refill
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history">
              {pastShipments.length > 0 ? (
                <div className="space-y-4">
                  {pastShipments.map((shipment) => (
                    <div key={shipment.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex items-center justify-center min-w-[60px]">
                          <PackageCheck className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                            <h3 className="font-medium">
                              {shipment.medication}
                            </h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600 border-green-200"
                            >
                              Delivered
                            </Badge>
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground">Shipped</p>
                                <p>
                                  {new Date(
                                    shipment.shipmentDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  Delivered
                                </p>
                                <p>
                                  {new Date(
                                    shipment.actualDeliveryDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="col-span-2 md:col-span-1">
                                <p className="text-muted-foreground">
                                  Tracking
                                </p>
                                <p className="font-mono">
                                  {shipment.trackingNumber}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No shipment history found.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationTracking;
