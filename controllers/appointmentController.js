import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
  try {
    const { doctorName, specialty, date, time, type, reason } = req.body;

    if (!doctorName || !date || !time) {
      return res
        .status(400)
        .json({ message: "Doctor, date and time are required" });
    }

    const appointment = await Appointment.create({
      user: req.userId,
      doctorName,
      specialty,
      date,
      time,
      type,
      reason,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.userId }).sort({
      date: 1,
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
