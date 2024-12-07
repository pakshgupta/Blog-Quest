import dotenv from "dotenv";
import { connectDB } from "./utils/database.js";
import { app } from "./app.js";

dotenv.config();

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`App is running at port no." ${port}`));
  })
  .catch((error) => {
    console.error(error);
  });
