import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Simulated function to fetch user data by email
const fetchUserByEmail = async (email: string) => {
  const response = await fetch(`/api/users?email=${email}`);
  if (!response.ok) throw new Error("Failed to fetch user data");
  return response.json();
};

// Simulated function to fetch educational content
const fetchEducationalContent = async () => {
  const response = await fetch(`/api/education`);
  if (!response.ok) throw new Error("Failed to fetch educational content");
  return response.json();
};

const Education = () => {
  const [profile, setProfile] = useState<{ role: string } | null>(null);

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { email } = JSON.parse(storedUser);
      if (email) {
        fetchUserByEmail(email)
          .then((response) => setProfile(response.user))
          .catch((error) => console.error("Error fetching user data:", error));
      }
    }
  }, []);

  // Fetch educational content
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["educationalContent"],
    queryFn: fetchEducationalContent,
  });

  // Filter content based on user role
  const filteredResources = resources.filter((resource: any) =>
    profile?.role === "manager" ? true : resource.status === profile?.role,
  );

  console.log(filteredResources);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Content List</h2>
      {isLoading ? (
        <p className="text-gray-400 text-center">Loading...</p>
      ) : (
        <div className="space-y-4">
          {filteredResources.length === 0 ? (
            <p className="text-gray-400 text-center">No content available</p>
          ) : (
            filteredResources.map((resource: any) => (
              <div
                key={resource.id}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{resource.heading}</h3>
                  <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                    {resource.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{resource.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Education;
