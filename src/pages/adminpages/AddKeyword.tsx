import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddKeyword: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddKeyword = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/keywords`, {
        keyword,
      });
      setSuccess("Keyword added successfully.");
      toast.success("keyword added successfully");
      setKeyword(""); // Clear input
    } catch (err) {
      setError("Failed to add keyword.");
    }
  };

  return (
    <div
      className="min-h-screen text-white p-6"
      style={{ backgroundColor: "#161b2d" }}
    >
      <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-md p-4">
        <Toaster />
        <h2 className="text-xl font-semibold mb-4">Add Keyword</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full px-4 py-2 rounded mb-4 text-black"
          placeholder="Enter keyword"
        />
        <button
          onClick={handleAddKeyword}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Add Keyword
        </button>
      </div>
    </div>
  );
};

export default AddKeyword;
