// const mongoose = require("mongoose");

// const connections = {}; // Store multiple connections

// const connectDB = async (mongoURI) => {
//   if (!mongoURI) throw new Error("MongoDB URI is required.");

//   if (connections[mongoURI]) {
//     console.log("Reusing existing database connection.");
//     return connections[mongoURI];
//   }

//   try {
//     const connection = await mongoose.createConnection(mongoURI, {});

//     connections[mongoURI] = connection;
//     console.log(`Connected to database: ${mongoURI}`);
//     return connection;
//   } catch (error) {
//     console.error("Database connection error:", error);
//     throw new Error("Failed to connect to database.");
//   }
// };

// module.exports = connectDB;

const connectionPool = new Map();

const connectDB = async (mongoURI) => {
  if (!mongoURI) throw new Error("MongoDB URI required");

  // Return existing connection if available
  if (connectionPool.has(mongoURI)) {
    const conn = connectionPool.get(mongoURI);
    if (conn.readyState === 1) return conn; // Connected
    connectionPool.delete(mongoURI); // Remove dead connection
  }

  // Create new connection with aggressive timeouts
  const connection = await mongoose
    .createConnection(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 2000,
      socketTimeoutMS: 2000,
      serverSelectionTimeoutMS: 2000,
      maxPoolSize: 5,
      minPoolSize: 1,
    })
    .asPromise();

  // Store in pool
  connectionPool.set(mongoURI, connection);

  // Clean up dead connections
  connection.on("error", () => connectionPool.delete(mongoURI));
  connection.on("disconnected", () => connectionPool.delete(mongoURI));

  return connection;
};
