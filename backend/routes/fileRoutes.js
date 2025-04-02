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

router.get("/fetch", async (req, res) => {
  try {
    const { mongoURI } = req.query;

    if (!mongoURI) {
      return res.status(400).json({ error: "MongoDB URI is required" });
    }

    // Establish a dynamic connection
    const customDB = await mongoose
      .createConnection(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .asPromise();

    // Create the model dynamically
    const FileModel = createFileModel(customDB);

    // Fetch only required fields
    const files = await FileModel.find({}, "_id fileName createdAt");

    res.status(200).json(files);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;
