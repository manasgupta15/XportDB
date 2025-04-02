import axios from "axios";

// Dynamically set API URL based on environment
const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/files";

export const uploadFile = async (formData, mongoURI) => {
  try {
    formData.append("mongoURI", mongoURI);
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error.message);
    throw error;
  }
};

// export const fetchUserFiles = async (mongoURI) => {
//   try {
//     const response = await axios.get(`${API_URL}/fetch`, {
//       params: { mongoURI },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch user files:", error);
//     throw error;
//   }
// };

export const fetchUserFiles = async (mongoURI) => {
  try {
    const encodedURI = encodeURIComponent(mongoURI); // Ensure safe URI encoding
    const response = await axios.get(`${API_URL}/fetch?mongoURI=${encodedURI}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user files:", error);
    throw error;
  }
};
