import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddCategory: React.FC = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddCategory = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/categories`, {
        name: category,
      });
      setSuccess("Category added successfully.");
      toast.success("category added successfully");
      setCategory(""); // Clear input
    } catch (err) {
      setError("Failed to add category.");
    }
  };

  return (
    <div
      className="min-h-screen text-white p-6"
      style={{ backgroundColor: "#161b2d" }}
    >
      <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-md p-4">
        <Toaster />
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded mb-4 text-black"
          placeholder="Enter category name"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
