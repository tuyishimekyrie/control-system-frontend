import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Toaster } from "react-hot-toast";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LocationData {
  id: string;
  userName: string;
  latitude: number;
  longitude: number;
  recordedAt: string;
}

// interface User {
//   organizationId: string;
// }

export const Location: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null,
  );

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) {
          throw new Error("User not found in localStorage");
        }

        // const parsedUser: User = JSON.parse(user);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/location`,
        );

        setLocations(response.data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch locations",
        );
      }
    };

    fetchLocations();
  }, []);

  const paginatedLocations = locations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(locations.length / itemsPerPage);

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "dd-MMM-yyyy");
  };

  const openMapModal = (location: LocationData) => {
    setSelectedLocation(location);
    setShowModal(true);
  };

  return (
    <div className="p-5 pt-0">
      <Toaster />
      <div className="flex justify-between items-center mb-10 mt-8">
        <div>
          <h1 className="text-[25px] font-bold text-gray-400">LOCATIONS</h1>
          <p className="text-green-600 text-[14px]">
            Monitor and review user locations.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto max-w-full">
        {error && <p className="text-red-500">Error: {error}</p>}
        {locations.length === 0 ? (
          <p className="text-green-600 text-center">No locations...</p>
        ) : (
          <table className="min-w-[800px] w-full border-collapse table-fixed">
            <thead className="text-[15px] font-bold">
              <tr
                style={{ backgroundColor: "#1F2A45" }}
                className="text-gray-300"
              >
                <th className="border border-gray-700 p-3 text-left whitespace-nowrap">
                  Date
                </th>
                <th className="border border-gray-700 p-3 text-left whitespace-nowrap">
                  User Name
                </th>
                <th className="border border-gray-700 p-3 text-left whitespace-nowrap">
                  Latitude
                </th>
                <th className="border border-gray-700 p-3 text-left whitespace-nowrap">
                  Longitude
                </th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {paginatedLocations.map((location) => (
                <tr
                  key={location.id}
                  className="border border-gray-700 text-gray-400 hover:bg-green-600 bg-opacity-90 hover:text-white hover:cursor-pointer hover:transition-all bg-[#1F2A40]"
                  onClick={() => openMapModal(location)}
                >
                  <td className="border border-gray-700 p-3 whitespace-nowrap">
                    {formatDate(location.recordedAt)}
                  </td>
                  <td className="border border-gray-700 p-3 whitespace-nowrap">
                    {location.userName}
                  </td>
                  <td className="border border-gray-700 p-3 whitespace-nowrap">
                    {location.latitude}
                  </td>
                  <td className="border border-gray-700 p-3 whitespace-nowrap">
                    {location.longitude}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-between items-center mt-3">
        <div>
          <p className="text-gray-400 text-[14px]">
            Page <span className="text-green-600">{currentPage}</span> /{" "}
            <span className="text-green-600">{totalPages}</span> of{" "}
            <span className="text-green-600">{locations.length}</span> records
          </p>
        </div>
        <div className="flex space-x-2 text-[14px]">
          <button
            className={`p-2 rounded ${
              currentPage === 1
                ? "bg-[#1F2A40] text-gray-500"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className={`p-2 rounded ${
              currentPage === totalPages
                ? "bg-[#1F2A40] text-gray-500"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Location Map</h2>
            <MapContainer
              center={[selectedLocation.latitude, selectedLocation.longitude]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "500px", width: "800px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  selectedLocation.latitude,
                  selectedLocation.longitude,
                ]}
              />
            </MapContainer>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
