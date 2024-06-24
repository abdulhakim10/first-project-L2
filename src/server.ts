import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`server app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// Handled Unhandled Rejection
process.on("unhandledRejection", () => {
  console.log(`👺 unhandledRejection is detected, shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Handle Uncaught Exception
process.on("uncaughtException", () => {
  console.log(`👹 uncaughtException is detected, shutting down...`);
  process.exit(1);
});
