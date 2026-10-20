import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.use(protect);

router.post("/", createAppointment);
router.get("/", getMyAppointments);
router.patch("/:id/cancel", cancelAppointment);

export default router;
