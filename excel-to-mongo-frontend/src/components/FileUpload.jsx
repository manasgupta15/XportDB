// import { useState } from "react";
// import { uploadFile, fetchUserFiles } from "../services/api";
// import { toast } from "react-toastify";
// import * as XLSX from "xlsx";
// import Header from "./Header";

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [mongoURI, setMongoURI] = useState("");
//   const [fileName, setFileName] = useState(""); // Store file name
//   const [userFiles, setUserFiles] = useState([]);
//   const [excelData, setExcelData] = useState([]); // Store preview data
//   const [columns, setColumns] = useState([]); // Store column headers

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.readAsArrayBuffer(selectedFile);

//       reader.onload = (event) => {
//         const bufferArray = event.target.result;
//         const workbook = XLSX.read(bufferArray, { type: "buffer" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];

//         // Convert sheet to JSON properly
//         const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

//         if (jsonData.length > 0) {
//           setColumns(Object.keys(jsonData[0])); // Extract column names
//           setExcelData(jsonData); // Store actual data
//         }
//       };
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return toast.error("Please select a file!");
//     if (!fileName.trim()) return toast.error("File name is required!");
//     if (!mongoURI.trim()) return toast.error("MongoDB URI is required!");

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("fileName", fileName); // Send file name

//     try {
//       await uploadFile(formData, mongoURI);
//       toast.success("File uploaded successfully!");
//     } catch (error) {
//       toast.error("Upload failed!");
//     }
//   };

//   const fetchUserFilesData = async () => {
//     if (!mongoURI.trim())
//       return toast.error("Enter MongoDB URI to fetch files!");

//     try {
//       const data = await fetchUserFiles(mongoURI);
//       setUserFiles(data);
//       // ✅ Add success toast message here
//       toast.success("Files fetched successfully!");
//     } catch (error) {
//       toast.error("Failed to fetch files.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
//         <input
//           type="text"
//           placeholder="Enter your MongoDB URI"
//           value={mongoURI}
//           onChange={(e) => setMongoURI(e.target.value)}
//           className="border p-2 rounded w-full mb-4"
//         />

//         <input
//           type="text"
//           placeholder="Enter File Name"
//           value={fileName}
//           onChange={(e) => setFileName(e.target.value)}
//           className="border p-2 rounded w-full mb-4"
//         />

//         <input
//           type="file"
//           accept=".xls, .xlsx"
//           onChange={handleFileChange}
//           className="border p-2 rounded w-full mb-4"
//         />

//         <button
//           onClick={handleUpload}
//           className="bg-blue-500 text-white px-6 py-2 rounded"
//         >
//           Upload
//         </button>

//         <button
//           onClick={fetchUserFilesData}
//           className="ml-4 bg-green-500 text-white px-6 py-2 rounded"
//         >
//           Fetch My Data
//         </button>

//         {/* Excel Preview Table */}
//         {excelData.length > 0 && (
//           <div className="mt-6">
//             <h2 className="font-bold text-xl mb-2">Excel File Preview</h2>
//             <div className="overflow-x-auto border rounded-lg">
//               <div className="max-h-64 overflow-y-auto">
//                 <table className="w-full border-collapse">
//                   <thead className="bg-gray-200">
//                     <tr>
//                       {columns.map((col, index) => (
//                         <th
//                           key={index}
//                           className="border p-2 text-left text-sm font-semibold"
//                         >
//                           {col}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {excelData.map((row, rowIndex) => (
//                       <tr key={rowIndex} className="border">
//                         {columns.map((col, colIndex) => (
//                           <td
//                             key={colIndex}
//                             className="border p-2 text-sm whitespace-nowrap"
//                           >
//                             {row[col] || ""}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Display fetched data in cards */}
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {userFiles.map((file) => (
//             <div key={file._id} className="bg-white p-4 shadow-md rounded-md">
//               <h3 className="font-bold text-lg">{file.fileName}</h3>
//               <p>ID: {file._id}</p>
//               <p>Uploaded: {new Date(file.createdAt).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUpload;

import { useState } from "react";
import { uploadFile, fetchUserFiles } from "../services/api";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import Header from "./Header";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [mongoURI, setMongoURI] = useState("");
  const [fileName, setFileName] = useState(""); // Store file name
  const [userFiles, setUserFiles] = useState([]);
  const [excelData, setExcelData] = useState([]); // Store preview data
  const [columns, setColumns] = useState([]); // Store column headers

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);

      reader.onload = (event) => {
        const bufferArray = event.target.result;
        const workbook = XLSX.read(bufferArray, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON properly
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        if (jsonData.length > 0) {
          setColumns(Object.keys(jsonData[0])); // Extract column names
          setExcelData(jsonData); // Store actual data
        }
      };
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file!");
    if (!fileName.trim()) return toast.error("File name is required!");
    if (!mongoURI.trim()) return toast.error("MongoDB URI is required!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName); // Send file name

    try {
      await uploadFile(formData, mongoURI);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Upload failed!");
    }
  };

  const fetchUserFilesData = async () => {
    if (!mongoURI.trim())
      return toast.error("Enter MongoDB URI to fetch files!");

    try {
      const data = await fetchUserFiles(mongoURI);
      setUserFiles(data);
      toast.success("Files fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch files.");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="p-6 max-w-4xl w-full bg-white shadow-xl rounded-lg transform transition duration-300 hover:shadow-2xl">
        <input
          type="text"
          placeholder="Enter your MongoDB URI"
          value={mongoURI}
          onChange={(e) => setMongoURI(e.target.value)}
          className="border p-3 rounded w-full mb-4 focus:ring-2 focus:ring-blue-400 transition duration-300"
        />

        <input
          type="text"
          placeholder="Enter File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="border p-3 rounded w-full mb-4 focus:ring-2 focus:ring-blue-400 transition duration-300"
        />

        <input
          type="file"
          accept=".xls, .xlsx"
          onChange={handleFileChange}
          className="border p-3 rounded w-full mb-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300"
        />

        {/* Buttons Centered */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transform transition duration-300 hover:bg-blue-700 hover:scale-105 shadow-md"
          >
            Upload
          </button>

          <button
            onClick={fetchUserFilesData}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transform transition duration-300 hover:bg-green-700 hover:scale-105 shadow-md"
          >
            Fetch My Data
          </button>
        </div>

        {/* Excel Preview Table with Animation */}
        {excelData.length > 0 && (
          <div className="mt-6 animate-fadeIn">
            <h2 className="font-bold text-xl mb-3 text-gray-800">
              Excel File Preview
            </h2>
            <div className="overflow-x-auto border rounded-lg">
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      {columns.map((col, index) => (
                        <th
                          key={index}
                          className="border p-3 text-left text-sm font-semibold text-gray-700"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border transition duration-300 hover:bg-gray-100"
                      >
                        {columns.map((col, colIndex) => (
                          <td
                            key={colIndex}
                            className="border p-3 text-sm whitespace-nowrap"
                          >
                            {row[col] || ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Display fetched data in animated cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userFiles.map((file) => (
            <div
              key={file._id}
              className="bg-white p-4 shadow-md rounded-lg transform transition duration-300 hover:shadow-xl hover:scale-105"
            >
              <h3 className="font-bold text-lg text-gray-800">
                {file.fileName}
              </h3>
              <p className="text-sm text-gray-600">ID: {file._id}</p>
              <p className="text-sm text-gray-600">
                Uploaded: {new Date(file.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
