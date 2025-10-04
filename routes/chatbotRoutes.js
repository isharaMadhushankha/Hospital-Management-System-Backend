import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// console.log(GEMINI_API_KEY);

// POST endpoint to handle chat messages
router.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!GEMINI_API_KEY) {
      return res
        .status(500)
        .json({ error: "Gemini API key is not configured." });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, // <-- CHANGE THIS LINE
      {
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      }
    );

    const botReply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply: botReply });
  } catch (error) {
    console.error(
      "Error with Gemini API:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: "Chatbot service is currently unavailable." });
  }
});

export default router;