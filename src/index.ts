import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./utils/logger.js";
import authRouter from "./routes/auth.js";
import chatRouter from "./routes/chat.js";
import moodRouter from "./routes/mood.js";
import activityRouter from "./routes/activity.js";
import { connectDB } from "./utils/db.js";
import { inngest } from "./inngest/client.js";
import { functions as inngestFunctions } from "./inngest/functions.js";

dotenv.config();
const app = express();

// ✅ Secure & proper CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  // "https://your-frontend-domain.com" // Replace this
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.options("*", cors());

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Inngest
app.use("/api/inngest", serve({ client: inngest, functions: inngestFunctions }));

// Routes
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/api/mood", moodRouter);
app.use("/api/activity", activityRouter);

// Error handler
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => logger.info(`✅ Server running on port ${PORT}`));
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
