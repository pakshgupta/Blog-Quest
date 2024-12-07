import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URL}`, {
      dbName: `${process.env.DATABASE}`,
    })
    .then((c) => console.log(`Mongodb connect ${c.connection.host}`))
    .catch((error) => console.error("Something went wrong!", error));
};
