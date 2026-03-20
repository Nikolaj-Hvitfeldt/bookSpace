import mongoose from "mongoose";
import connectDb from "../db/db.server";
import { beforeAll, afterAll } from "vitest";


beforeAll(async () => {
  await connectDb();

  if (mongoose.connection.readyState !== 1) {
    throw new Error(
      `Mongo not connected. readyState=${mongoose.connection.readyState}`,
    );
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});