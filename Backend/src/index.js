import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./main.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
  });
