
import express from "express";
import { config } from "dotenv";

import { connectDB, disconnectDB } from "./config/db.js";
import router from "./routes/index.js";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const PORT = 5001;

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", async (err) => {
  console.error("Unhandled Rejection:", err);

  if (server) {
    server.close(async () => {
      await disconnectDB();
      process.exit(1);
    });
  } else {
    await disconnectDB();
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);

  if (server) {
    server.close(async () => {
      await disconnectDB();
      process.exit(1);
    });
  } else {
    await disconnectDB();
    process.exit(1);
  }
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received. Closing server...");

  if (server) {
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  } else {
    await disconnectDB();
    process.exit(0);
  }
});

startServer();

