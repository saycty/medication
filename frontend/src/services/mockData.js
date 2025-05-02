export const generateWeightData = (startWeight = 180, userId = "1") => {
  const data = [];
  const today = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const randomFactor = (Math.random() - 0.3) * 0.5;
    // const weightReduction = (i / 30) * 15;
    const weight = parseFloat(
      (startWeight - (30 - i) * 0.4 + randomFactor).toFixed(1)
    ); // Consistent weight loss

    data.push({
      id: `weight-${i}`,
      userId,
      weight,
      date: date.toISOString().split("T")[0],
    });
  }

  return data;
};

export const medications = [
  {
    id: "med-1",
    userId: "1",
    name: "paracitamol",
    dosage: "600mg weekly",
    startDate: "2023-12-01",
    endDate: null,
    active: true,
    description:
      "Paracetamol is a common painkiller used to treat mild to moderate pain and fever.",
  },
];

// Shipment data
export const shipments = [
  {
    id: "ship-1",
    userId: "1",
    medicationId: "med-1",
    shipmentDate: "2024-04-15",
    expectedDeliveryDate: "2024-05-01",
    status: "shipped",
    trackingNumber: "abcdefghijklmnop",
    carrier: "Ekart",
  },
  {
    id: "ship-2",
    userId: "1",
    medicationId: "med-1",
    shipmentDate: "2024-03-15",
    expectedDeliveryDate: "2024-03-22",
    status: "delivered",
    trackingNumber: "abcdefghijklmnop",
    carrier: "Ekart",
    actualDeliveryDate: "2024-03-21",
  },
  {
    id: "ship-3",
    userId: "1",
    medicationId: "med-1",
    shipmentDate: "2024-02-15",
    expectedDeliveryDate: "2024-02-22",
    status: "delivered",
    trackingNumber: "ACME567891234",
    carrier: "Delhivary",
    actualDeliveryDate: "2024-02-23",
  },
];

// User profile data
export const userProfile = {
  id: "1",
  name: "Mr John Doe",
  email: "abc@gmail.com",
  initialWeight: 190,
  currentWeight: 175,
  goalWeight: 150,
  height: 65,
  birthDate: "1985-06-15",
  startDate: "2023-12-01",
};

export const weightHistory = [
  { id: "w1", userId: "1", weight: 180, date: "2024-03-01" },
  { id: "w2", userId: "1", weight: 177, date: "2024-03-08" },
  { id: "w3", userId: "1", weight: 174, date: "2024-03-15" },
  { id: "w4", userId: "1", weight: 172, date: "2024-03-22" },
  { id: "w5", userId: "1", weight: 170, date: "2024-03-29" },
  { id: "w6", userId: "1", weight: 168, date: "2024-04-05" },
  { id: "w7", userId: "1", weight: 167, date: "2024-04-12" },
  { id: "w8", userId: "1", weight: 165, date: "2024-04-19" },
  { id: "w9", userId: "1", weight: 164, date: "2024-04-26" },
  { id: "w10", userId: "1", weight: 162, date: "2024-05-03" },
  { id: "w11", userId: "1", weight: 160, date: "2024-05-10" },
  { id: "w12", userId: "1", weight: 158, date: "2024-05-17" },
  { id: "w13", userId: "1", weight: 157, date: "2024-05-24" },
  { id: "w14", userId: "1", weight: 156, date: "2024-05-31" },
  { id: "w15", userId: "1", weight: 154, date: "2024-06-07" },
  { id: "w16", userId: "1", weight: 153, date: "2024-06-14" },
  { id: "w17", userId: "1", weight: 152, date: "2024-06-21" },
  { id: "w18", userId: "1", weight: 151, date: "2024-06-28" },
  { id: "w19", userId: "1", weight: 150, date: "2024-07-05" },
  { id: "w20", userId: "1", weight: 149, date: "2024-07-12" },
  { id: "w21", userId: "1", weight: 148, date: "2024-07-19" },
  { id: "w22", userId: "1", weight: 147, date: "2024-07-26" },
  { id: "w23", userId: "1", weight: 146, date: "2024-08-02" },
  { id: "w24", userId: "1", weight: 145, date: "2024-08-09" },
  { id: "w25", userId: "1", weight: 144, date: "2024-08-16" },
  { id: "w26", userId: "1", weight: 143, date: "2024-08-23" },
  { id: "w27", userId: "1", weight: 142, date: "2024-08-30" },
  { id: "w28", userId: "1", weight: 141, date: "2024-09-06" },
  { id: "w29", userId: "1", weight: 140, date: "2024-09-13" },
  { id: "w30", userId: "1", weight: 139, date: "2024-09-20" },
];

// Calculate BMI
export const calculateBMI = (weightLbs, heightInches) => {
  if (!weightLbs || !heightInches) return null;
  // BMI = (weight in kg) / (height in meters)^2
  // 1 lb = 0.453592 kg
  // 1 inch = 0.0254 meters
  const weightKg = weightLbs * 0.453592;
  const heightMeters = heightInches * 0.0254;
  return (weightKg / (heightMeters * heightMeters)).toFixed(1);
};

export const getBMICategory = (bmi) => {
  if (!bmi) return "";
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
};

export const calculateWeightLoss = (startWeight, currentWeight) => {
  return (startWeight - currentWeight).toFixed(1);
};

export const calculateProgressPercentage = (
  startWeight,
  currentWeight,
  goalWeight
) => {
  if (startWeight <= goalWeight) return 0;
  const totalToLose = startWeight - goalWeight;
  const lostSoFar = startWeight - currentWeight;
  const percentage = (lostSoFar / totalToLose) * 100;
  return Math.min(Math.max(percentage, 0), 100).toFixed(1);
};
