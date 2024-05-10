import mongoose from "mongoose";

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@artifund.bg8boua.mongodb.net/ArtiFund?retryWrites=true&w=majority&appName=ArtiFund`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
      return conn
    } catch (error) {
      console.error(error.message);
      process.exit(1);
      return error
    }
  }

export default connectDB;