import TelegramBot from "node-telegram-bot-api";
import crypto from "crypto";

const token = process.env.TELEGRAM_BOT_TOKEN;

// Initialize the bot
const bot = new TelegramBot(token, { polling: true });

// In-memory storage for OTPs
const otpStore = {};

// Function to generate an OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
};

// Handle /otp command to generate OTP
bot.onText(/\/otp/, (msg) => {
  const chatId = msg.chat.id;

  // Generate an OTP and store it
  const otp = generateOTP();
  otpStore[chatId] = { otp, timestamp: Date.now() };

  // Send the OTP to the user
  bot.sendMessage(chatId, `Your OTP is: ${otp}. Please reply with the OTP to verify.`);
});

// Handle user response for OTP validation
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  // Check if the user sent an OTP
  if (/^\d{6}$/.test(userMessage)) { // Match 6-digit numbers
    if (otpStore[chatId] && otpStore[chatId].otp == userMessage) {
      const otpAge = (Date.now() - otpStore[chatId].timestamp) / 1000;
      if (otpAge > 300) { // Check if OTP is older than 5 minutes
        bot.sendMessage(chatId, "OTP expired. Please request a new one using /otp.");
        delete otpStore[chatId];
      } else {
        bot.sendMessage(chatId, "OTP verified successfully!");
        delete otpStore[chatId]; // Clear OTP after successful verification
      }
    } else {
      bot.sendMessage(chatId, "Invalid OTP. Please try again.");
    }
  } else if (!userMessage.startsWith('/')) {
    bot.sendMessage(chatId, "Please use the /otp command to request an OTP.");
  }
});


// API handler for Next.js (Optional for extensions)
export default function handler(req, res) {
  res.status(200).json({ message: "Telegram bot is running!" });
}
