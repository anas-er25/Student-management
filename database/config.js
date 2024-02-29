require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.set('strictQuery', false);
const connection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connection;
