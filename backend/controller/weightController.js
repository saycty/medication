import Weight from "../models/weight.js";
import User from "../models/user.js";

export const saveWeightData = async (req, res) => {
  const { height, weight, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let weightRecord = await Weight.findOne({ userId });

    if (!weightRecord) {
      weightRecord = new Weight({
        userId,
        height,
        weightData: [{ weight, date: Date.now() }],
        createdAt: Date.now(),
      });
    } else {
      if (!weightRecord.height) {
        weightRecord.height = height;
        weightRecord.createdAt = Date.now();
      }

      weightRecord.weightData.push({ weight, date: Date.now() });
    }

    await weightRecord.save();
    res.status(200).json({
      message: "Weight and height data saved successfully",
      weightRecord,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error saving weight and height data", error });
  }
};
export const getWeightData = async (req, res) => {
  const { userId } = req.query;

  try {
    const weightRecord = await Weight.findOne({ userId });

    if (!weightRecord) {
      return res
        .status(404)
        .json({ message: "Weight data not found for this user" });
    }

    res.status(200).json(weightRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving weight data", error });
  }
};
