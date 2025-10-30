import { Request, Response } from "express";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Chat from "../models/Chat";
import User from "../models/user";

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Gemini API with fallback to demo key
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDJm7QfKLVnzGNgnVN_NNRQwXudQ2-0tYA";
let genAI;

try {
  genAI = new GoogleGenerativeAI(apiKey);
  console.log("✅ Gemini API initialized successfully");
} catch (error) {
  console.error("❌ Failed to initialize Gemini API:", error);
  // Create a mock genAI object that won't throw errors
  genAI = {
    getGenerativeModel: () => ({
      startChat: () => ({
        sendMessage: async () => ({ text: () => "I'm sorry, the AI service is currently unavailable. Please try again later." })
      })
    })
  };
}

/**
 * Creates a new, empty chat session for a user.
 */
export const createChatSession = async (req: Request, res: Response) => {
  try {
    // Get userId from authenticated request (set by authMiddleware)
    const userId = req.userId || req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newSession = new Chat({
      userId,
      sessionId: uuidv4(),
      messages: [],
    });

    await newSession.save();

    res.status(201).json({
      message: "New chat session created.",
      sessionId: newSession.sessionId,
    });
  } catch (error) {
    console.error("Error creating chat session:", error);
    res.status(500).json({
      message: "Server error while creating chat session.",
      error: error.message,
    });
  }
};

/**
 * Handles sending a message to the Gemini AI and getting a response.
 */
export const sendMessage = async (req: Request, res: Response) => {
  try {
    if (!genAI) {
      return res.status(503).json({
        message: "AI service not configured. Please contact administrator.",
      });
    }

    const { sessionId } = req.params;
    const { message } = req.body;
    const userId = req.userId || req.body.userId;

    if (!message || !userId) {
      return res
        .status(400)
        .json({ message: "User ID and message are required." });
    }

    // Find the existing chat session
    const chatSession = await Chat.findOne({ sessionId, userId });
    if (!chatSession) {
      return res
        .status(404)
        .json({ message: "Chat session not found or not authorized." });
    }

    // Prepare previous chat history
    const history = chatSession.messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Initialize AI model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction:
        "You are Aura, a supportive and empathetic AI therapist. Your goal is to listen, understand, and provide gentle, helpful guidance. Do not give medical advice. Focus on active listening, validation, and suggesting mindfulness techniques. Keep your responses concise and caring.",
    });

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 500,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    // Send message to Gemini
    const result = await chat.sendMessage(message);
    const aiResponse = await result.response;
    const aiResponseText = aiResponse.text();

    // Save both user and AI messages
    chatSession.messages.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    chatSession.messages.push({
      role: "assistant",
      content: aiResponseText,
      timestamp: new Date(),
    });

    await chatSession.save();

    res.status(200).json({ response: aiResponseText });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      message: "Server error while sending message.",
      error: error.message,
    });
  }
};
