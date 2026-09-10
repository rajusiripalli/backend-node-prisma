import express from "express";
import {config} from "dotenv";    
import {connectDB, disconnectDB} from "./config/db.js";

import router from "./routes/index.js";

config();
connectDB();

const app = express();


app.use(express.json());

app.use("/", router);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

//Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received. Closing server...");
    await disconnectDB();
    process.exit(0);
}); 