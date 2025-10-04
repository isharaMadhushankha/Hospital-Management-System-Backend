import express from "express";
import { scheduleMeeting } from "../controllers/zoomController.js";

const router = express.Router();

router.post("/create-meeting", scheduleMeeting);

export default router;
