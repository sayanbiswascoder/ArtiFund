import mongoose from "mongoose";

/**
 * Asynchronously connects to the MongoDB database using Mongoose.
 * 
 * This function attempts to establish a connection to the MongoDB database
 * using the credentials and connection string provided in the environment variables.
 * If the connection is successful, it logs the host of the connected database.
 * If there is an error during the connection attempt, it logs the error message.
 * 
 * @returns {Promise<Object>} The connection object if successful, or the error object if failed.
 */
const connectAdminDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@artifund.bg8boua.mongodb.net/admin?retryWrites=true&w=majority&appName=ArtiFund`, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}

export default connectAdminDB;