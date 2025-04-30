// Weight Entry Data - Simulates 30 days of weight entries with a focus on weight loss
export const generateWeightData = (startWeight = 180, userId = "1") => {
  const data = [];
  const today = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Create a consistent downward trend with small fluctuations
    const randomFactor = (Math.random() - 0.3) * 0.5; // Smaller fluctuations, biased towards weight loss
    const weightReduction = (i / 30) * 15; // Lose up to 15 pounds over 30 days, steeper decline
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

// Medication data
export const medications = [
  {
    id: "med-1",
    userId: "1",
    name: "Ozempic",
    dosage: "0.5mg weekly",
    startDate: "2023-12-01",
    endDate: null,
    active: true,
    description:
      "Injectable prescription medicine used for adults with type 2 diabetes and for chronic weight management.",
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
    trackingNumber: "ACME123456789",
    carrier: "FedEx",
  },
  {
    id: "ship-2",
    userId: "1",
    medicationId: "med-1",
    shipmentDate: "2024-03-15",
    expectedDeliveryDate: "2024-03-22",
    status: "delivered",
    trackingNumber: "ACME987654321",
    carrier: "UPS",
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
    carrier: "USPS",
    actualDeliveryDate: "2024-02-23",
  },
];

// User profile data
export const userProfile = {
  id: "1",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  initialWeight: 190, // Starting with a higher weight
  currentWeight: 175, // More significant weight loss
  goalWeight: 150,
  height: 65, // in inches
  birthDate: "1985-06-15",
  startDate: "2023-12-01",
};

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

// Get BMI Category
export const getBMICategory = (bmi) => {
  if (!bmi) return "";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

// Calculate weight loss
export const calculateWeightLoss = (startWeight, currentWeight) => {
  return (startWeight - currentWeight).toFixed(1);
};

// Calculate progress percentage towards goal
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
