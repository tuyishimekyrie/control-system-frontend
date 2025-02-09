import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { url } from "../utils/urlResource";

interface ResourceProp {
  id: string;
  heading: string;
  message: string;
  status: string;
}

const fetchEducationalContent = async (): Promise<ResourceProp[]> => {
  try {
    const response = await fetch(`${url}/education`);
    if (!response.ok) throw new Error("Failed to fetch educational content");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Education = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { role } = JSON.parse(storedUser);
      setUserRole(role);
    }
  }, []);

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["educationalContent"],
    queryFn: fetchEducationalContent,
  });

  const filteredResources = userRole
    ? resources.filter((resource) => resource.status === userRole)
    : [];

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl p-8 mt-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white text-center">
        📚 Educational Content
      </h2>

      {isLoading ? (
        <p className="text-gray-400 text-center animate-pulse">Loading...</p>
      ) : (
        <div className="space-y-6">
          {filteredResources.length === 0 ? (
            <p className="text-gray-400 text-center">No content available</p>
          ) : (
            filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition duration-300 shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {resource.heading}
                  </h3>
                  <span className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-full shadow-sm">
                    {resource.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {resource.message}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Education;
