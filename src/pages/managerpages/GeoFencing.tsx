import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
} from "react-leaflet";
import { toast } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet marker icon fix for React-Leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41], // Adjust to the center of the marker
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Geofence {
  latitude: number;
  longitude: number;
  radius: number;
}

const GeoFencing = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [radius, setRadius] = useState<number>(100); // Default radius in meters
  const [geofences, setGeofences] = useState<Geofence[]>([]); // State to store fetched geofences
  const [organizationId, setOrganizationId] = useState<string | null>(null); // State to store organization ID

  // Fetch organizationId from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setOrganizationId(user.organizationId); // Retrieve organizationId from stored user
    }
  }, []);

  // Fetch stored geofences when the component mounts
  useEffect(() => {
    const fetchGeofences = async () => {
      if (!organizationId) return; // Do not fetch if organizationId is not set
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/geofence?organizationId=${organizationId}`,
        );
        if (response.ok) {
          const data = await response.json();
          setGeofences(data);
        } else {
          throw new Error("Failed to fetch geofences");
        }
      } catch (error) {
        toast.error("Error fetching geofences");
      }
    };

    fetchGeofences();
  }, [organizationId]); // Run effect whenever organizationId changes

  // Custom hook to handle map clicks
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      },
    });

    return latitude && longitude ? (
      <>
        <Marker position={[latitude, longitude]} />
        <Circle center={[latitude, longitude]} radius={radius} />
      </>
    ) : null;
  };

  const handleSubmit = async () => {
    if (latitude && longitude && radius && organizationId) {
      const geoFenceData = {
        latitude,
        longitude,
        radius,
        organizationId, // Include organizationId in the data sent to the backend
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/geofence`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(geoFenceData),
          },
        );

        if (response.ok) {
          toast.success("Geofence created successfully!");
          // Update geofences after successful creation
          setGeofences((prev) => [...prev, geoFenceData]); // Use functional update for state
        } else {
          throw new Error("Failed to create geofence");
        }
      } catch (error) {
        toast.error("Error creating geofence");
      }
    } else {
      toast.error("Please select a location and set a radius");
    }
  };

  return (
    <div className="geofencing-container flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Setup Geofencing
      </h2>

      <div className="map-container w-full lg:w-3/4 h-96 mb-6">
        {/* Leaflet Map centered on Rwanda */}
        <MapContainer
          center={[-1.9403, 29.8739]} // Set default location to Rwanda
          zoom={7} // Set zoom level to focus on Rwanda
          className="h-full w-full rounded-md shadow-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />

          {/* Render fetched geofences */}
          {geofences.map((fence, index) => (
            <Circle
              key={index}
              center={[fence.latitude, fence.longitude]}
              radius={fence.radius}
              pathOptions={{ color: "blue" }} // Optional styling for the circles
            />
          ))}
        </MapContainer>
      </div>

      <div className="form w-full lg:w-3/4 bg-white p-4 rounded-md shadow-md">
        <label className="block text-gray-700 font-medium mb-2">
          Radius (meters):
        </label>
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(parseFloat(e.target.value))} // Convert to number
          placeholder="Enter radius"
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Create Geofence
        </button>
      </div>
    </div>
  );
};

export default GeoFencing;
