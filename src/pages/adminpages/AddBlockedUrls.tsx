import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddBlockedURL: React.FC = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddURL = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blocked-urls`, {
        url,
      });
      setSuccess("URL added successfully.");
      toast.success("url added successfully");
      setUrl(""); // Clear input
    } catch (err) {
      setError("Failed to add URL.");
    }
  };

  return (
    <div
      className="min-h-screen text-white p-6"
      style={{ backgroundColor: "#161b2d" }}
    >
      <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-md p-4">
        <Toaster />
        <h2 className="text-xl font-semibold mb-4">Add Blocked URL</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 rounded mb-4 text-black"
          placeholder="Enter URL to block"
        />
        <button
          onClick={handleAddURL}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add URL
        </button>
      </div>
    </div>
  );
};

export default AddBlockedURL;
