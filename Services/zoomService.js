import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;

// Get Access Token
const getAccessToken = async () => {
  const tokenResponse = await axios.post(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
    {},
    {
      auth: {
        username: ZOOM_CLIENT_ID,
        password: ZOOM_CLIENT_SECRET,
      },
    }
  );

  return tokenResponse.data.access_token;
};

// Create a Meeting
export const createZoomMeeting = async (topic, startTime, duration) => {
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2, // scheduled meeting
        start_time: startTime,
        duration,
        timezone: "Asia/Colombo",
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.stack);
    console.error("Zoom API Error:", error.response?.data || error.message);
    throw new Error("Failed to create Zoom meeting");
  }
};
