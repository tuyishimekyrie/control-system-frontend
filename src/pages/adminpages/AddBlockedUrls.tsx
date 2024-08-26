import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Category {
  id: string;
  name: string;
}

const AddBlockedURL: React.FC = () => {
  const [url, setUrl] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/categories`,
        );
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleAddURL = async () => {
    try {
      if (!categoryId) {
        setError("Please select a category.");
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blocked-urls`, {
        url,
        categoryId,
      });

      setSuccess("URL added successfully.");
      toast.success("URL added successfully");
      setUrl(""); // Clear input
      setCategoryId(null); // Clear selected category
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
        <select
          value={categoryId || ""}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-4 py-2 rounded mb-4 text-black"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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
