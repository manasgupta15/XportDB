// const express = require("express");
// const multer = require("multer");
// const XLSX = require("xlsx");
// const connectDB = require("../config/connectDB");
// const getDataModel = require("../models/DataModel");

// const router = express.Router();

// // Multer Setup for File Upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post("/upload", async (req, res) => {
//   try {
//     const { fileName, mongoURI } = req.body;
//     const file = req.file;

//     if (!fileName) {
//       return res.status(400).json({ error: "File name is required" });
//     }

//     const workbook = XLSX.read(file.buffer, { type: "buffer" });
//     const sheetName = workbook.SheetNames[0];
//     const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

//     const customDB = mongoose.createConnection(mongoURI);
//     const FileModel = customDB.model("File", FileSchema);

//     const newFile = new FileModel({ fileName, data: sheetData });
//     await newFile.save();

//     res.status(200).json({ message: "File uploaded successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// router.get("/fetch", async (req, res) => {
//   try {
//     const { mongoURI } = req.query;

//     if (!mongoURI) {
//       return res.status(400).json({ error: "MongoDB URI is required" });
//     }

//     const customDB = mongoose.createConnection(mongoURI);
//     const FileModel = customDB.model("File", FileSchema);

//     const files = await FileModel.find({}, "_id fileName createdAt"); // Fetch only required fields
//     res.status(200).json(files);
//   } catch (error) {
//     res.status(500).json({ error: "Fetch failed" });
//   }
// });

// module.exports = router;

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const createFileModel = require("../models/DataModel"); // Import as a function

const router = express.Router();

// Multer Setup for File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { fileName, mongoURI } = req.body;
    const file = req.file;

    if (!file || !fileName || !mongoURI) {
      return res
        .status(400)
        .json({ error: "File, file name, and MongoDB URI are required" });
    }

    // Read Excel File
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Establish a dynamic connection
    const customDB = await mongoose
      .createConnection(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .asPromise();

    // Create the model dynamically
    const FileModel = createFileModel(customDB);

    // Save File Data
    const newFile = new FileModel({ fileName, data: sheetData });
    await newFile.save();

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// router.get("/fetch", async (req, res) => {
//   try {
//     const { mongoURI } = req.query;

//     if (!mongoURI) {
//       return res.status(400).json({ error: "MongoDB URI is required" });
//     }

//     // Establish a dynamic connection
//     const customDB = await mongoose
//       .createConnection(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .asPromise();

//     // Create the model dynamically
//     const FileModel = createFileModel(customDB);

//     // Fetch only required fields
//     const files = await FileModel.find({}, "_id fileName createdAt");

//     res.status(200).json(files);
//   } catch (error) {
//     console.error("Fetch Error:", error);
//     res.status(500).json({ error: "Fetch failed" });
//   }
// });

router.get("/fetch", async (req, res) => {
  try {
    const { mongoURI } = req.query;

    if (!mongoURI) {
      return res.status(400).json({ error: "MongoDB URI is required" });
    }

    // Set timeout headers for Vercel
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

    // Fast connection setup with aggressive timeouts
    const customDB = await mongoose
      .createConnection(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 3000, // 3 seconds
        socketTimeoutMS: 3000, // 3 seconds
        serverSelectionTimeoutMS: 3000,
      })
      .asPromise();

    const FileModel = createFileModel(customDB);
    // const files = await FileModel.find({}, "_id fileName createdAt").maxTimeMS(
    //   3000
    // );
    const files = await FileModel.find({}, "_id fileName createdAt")
      .maxTimeMS(2000) // Fail fast if query takes too long
      .lean();

    // Close connection after use
    setTimeout(() => customDB.close(), 5000); // Close after 5 sec

    res.status(200).json(files);
  } catch (error) {
    console.error("Fetch Error:", error);
    if (error.message.includes("timeout")) {
      return res.status(504).json({ error: "Database operation timed out" });
    }
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;
