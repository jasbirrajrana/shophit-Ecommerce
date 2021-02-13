import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`mongodb connected :${conn.connection.host}`.green.underline);
  } catch (e) {
    console.error(`Error:${e.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDb;
