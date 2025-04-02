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

const mongoose = require("mongoose");

const connections = {}; // Store multiple connections

const connectDB = async (mongoURI) => {
  if (!mongoURI) throw new Error("MongoDB URI is required.");

  if (connections[mongoURI]) {
    console.log("Reusing existing database connection.");
    return connections[mongoURI];
  }

  try {
    const connection = await mongoose.createConnection(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Prevents infinite waiting
    });

    connections[mongoURI] = connection;
    console.log(`Connected to database: ${mongoURI}`);
    return connection;
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw new Error("Failed to connect to database.");
  }
};

module.exports = connectDB;
