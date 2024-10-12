import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon } from "leaflet";

// Fixing the default icon issue in React Leaflet
// Importing marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Creating a default icon
const defaultIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationData {
  id: string;
  userName: string;
  latitude: number;
  longitude: number;
  recordedAt: string;
}

interface User {
  organizationId: string;
}

const DashboardLocation = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) {
          throw new Error("User not found in localStorage");
        }

        const parsedUser: User = JSON.parse(user);
        console.log(parsedUser);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/locations`,
          {
            params: { organizationId: parsedUser.organizationId },
          },
        );

        const fetchedLocations: LocationData[] = response.data.data;
        setLocations(fetchedLocations);

        // Optionally set the first location as selected
        if (fetchedLocations.length > 0) {
          setSelectedLocation(fetchedLocations[0]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch locations",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationClick = (location: LocationData) => {
    setSelectedLocation(location);

    // Center the map on the selected location
    if (mapRef.current) {
      mapRef.current.setView([location.latitude, location.longitude], 13, {
        animate: true,
      });
    }
  };

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center mt-10 text-red-500">Error: {error}</h1>;
  }

  return (
    <div className="flex flex-col md:flex-row h-full w-[60vw]">
      {/* Sidebar for List of Locations */}
      <div className="md:w-1/3 bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Locations</h2>
        {locations.length === 0 ? (
          <p>No locations available.</p>
        ) : (
          <ul className="space-y-2">
            {locations.map((location) => (
              <li
                key={location.id}
                className={`p-3  rounded-lg hover:bg-blue-600 cursor-pointer ${
                  selectedLocation?.id === location.id
                    ? "bg-blue-500"
                    : "bg-blue-900"
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <p className="font-semibold text-white">{location.userName}</p>
                <p className="text-xs text-gray-300">
                  {new Date(location.recordedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map Container */}
      <div className="w-full h-full">
        <MapContainer
          center={
            selectedLocation
              ? [selectedLocation.latitude, selectedLocation.longitude]
              : [0, 0] // Default center if no location is selected
          }
          zoom={selectedLocation ? 13 : 2}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={defaultIcon}
              eventHandlers={{
                click: () => {
                  setSelectedLocation(location);
                },
              }}
            >
              <Popup>
                <strong>{location.userName}</strong>
                <br />
                Recorded at: {new Date(location.recordedAt).toLocaleString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DashboardLocation;
