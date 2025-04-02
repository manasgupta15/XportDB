// const mongoose = require("mongoose");

// const DataSchema = new mongoose.Schema(
//   {
//     data: { type: Array, required: true }, // Excel data
//   },
//   { timestamps: true }
// );

// const getDataModel = (connection) => {
//   return connection.model("ExcelData", DataSchema);
// };

// module.exports = getDataModel;

const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    data: { type: Array, required: true },
  },
  { timestamps: true }
);

// Instead of exporting only the schema, export a function to create a model dynamically
module.exports = (connection) => connection.model("File", FileSchema);
