import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGOBD_URL}${DB_NAME}`
    );
    console.log(
      `MongoDB is Hosted !! on : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoODB connection faild : ", error);
    process.exit(1);
  }
};

export{connectDB}
