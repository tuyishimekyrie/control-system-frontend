import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

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

const MapCenterHandler = ({
  selectedLocation,
}: {
  selectedLocation: LocationData | null;
}) => {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.latitude, selectedLocation.longitude], 13);
    }
  }, [selectedLocation, map]);

  return null;
};

const DashboardLocation = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/location`,
        );
        const fetchedLocations: LocationData[] = response.data.data;
        setLocations(fetchedLocations);

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

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center mt-10 text-red-500">Error: {error}</h1>;
  }

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="md:w-1/3 bg-gray-800 p-4 overflow-y-auto">
        {locations.length === 0 ? (
          <p className="text-[14px]">No locations available.</p>
        ) : (
          <ul className="space-y-2">
            {locations.map((location) => (
              <li
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`p-3 rounded-lg hover:bg-green-700 cursor-pointer ${
                  selectedLocation?.id === location.id
                    ? "bg-green-700"
                    : "bg-green-600"
                }`}
              >
                <p className="font-semibold text-white text-[14px]">
                  {location.userName}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full h-full">
        <MapContainer
          center={
            selectedLocation
              ? [selectedLocation.latitude, selectedLocation.longitude]
              : [0, 0]
          }
          zoom={selectedLocation ? 13 : 2}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapCenterHandler selectedLocation={selectedLocation} />

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
