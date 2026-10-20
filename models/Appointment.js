import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorName: { type: String, required: true },
    specialty: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, default: "In-person" },
    reason: { type: String },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Appointment", appointmentSchema);
