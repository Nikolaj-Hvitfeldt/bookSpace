import mongoose from "mongoose";

export default async function connectDb() {
  if (process.env.NODE_ENV === "development") {
    mongoose.set("overwriteModels", true);
  }

  const readyState = mongoose.connection.readyState;
  if (readyState > 0) {
    console.log(
      "Mongoose: Re-using existing connection (readyState: %d)",
      readyState,
    );
    return;
  }

  mongoose.connection.on("error", (error: unknown) => {
    console.error("Mongoose: error %o", error);
  });

  for (const event of ["connected", "reconnected", "disconnected", "close"]) {
    mongoose.connection.on(event, () => console.log("Mongoose: %s", event));
  }

  const url = process.env.MONGODB_URL;
  if (!url) {
    throw new Error("MONGODB_URL environment variable is not defined");
  }

  await mongoose.connect(url, { serverSelectionTimeoutMS: 10000 }).catch((error: any) => {
    console.error("Mongoose connection error:", error);
  });
}