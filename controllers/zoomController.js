import { createZoomMeeting } from "../Services/zoomService.js";

export const scheduleMeeting = async (req, res) => {
  try {
    const { topic, startTime, duration } = req.body;

    const meeting = await createZoomMeeting(topic, startTime, duration);

    res.status(200).json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.stack,
    });
  }
};
