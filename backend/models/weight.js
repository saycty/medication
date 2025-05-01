import mongoose from "mongoose";

const weightSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    height: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    weightData: [
      {
        weight: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Weight = mongoose.model("Weight", weightSchema);

export default Weight;
