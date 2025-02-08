import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const contentSchema = z.object({
  heading: z
    .string()
    .min(5, "Heading must be at least 5 characters")
    .max(100, "Heading must not exceed 100 characters"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  status: z.enum(["organizational", "parent", "school"], {
    required_error: "Please select a status",
  }),
});

type ContentSchema = z.infer<typeof contentSchema>;

type EducationalResource = ContentSchema & {
  id: number;
};

const EducationContent = () => {
  const queryClient = useQueryClient();
  const url = import.meta.env.VITE_API_BASE_URL;

  // Fetch existing educational content
  const { data: resources = [], isLoading } = useQuery<EducationalResource[]>({
    queryKey: ["educationalContent"],
    queryFn: async () => {
      const res = await fetch(`${url}/education`);
      if (!res.ok) throw new Error("Failed to fetch content");
      return res.json();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContentSchema>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      heading: "",
      message: "",
      status: "organizational",
    },
  });

  // Mutation to create new content
  const mutation = useMutation({
    mutationFn: async (data: ContentSchema) => {
      const response = await fetch(`${url}/education`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add content");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educationalContent"] });
      reset();
    },
  });

  const onSubmit = (data: ContentSchema) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-bold mb-12">
          Education Content Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content List */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Content List</h2>
            {isLoading ? (
              <p className="text-gray-400 text-center">Loading...</p>
            ) : (
              <div className="space-y-4">
                {resources.length === 0 ? (
                  <p className="text-gray-400 text-center">
                    No content available
                  </p>
                ) : (
                  resources.map((resource) => (
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
                      <p className="text-gray-300 text-sm mb-2">
                        {resource.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Add New Content Form */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Content</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="heading"
                  className="block text-sm font-medium mb-2"
                >
                  Heading
                </label>
                <input
                  {...register("heading")}
                  type="text"
                  id="heading"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter heading..."
                />
                {errors.heading && (
                  <p className="mt-1 text-red-400 text-sm">
                    {errors.heading.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-2"
                >
                  Status
                </label>
                <select
                  {...register("status")}
                  id="status"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="organizational">Organizational</option>
                  <option value="parent">Parent</option>
                  <option value="school">School</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-red-400 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={6}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter message..."
                />
                {errors.message && (
                  <p className="mt-1 text-red-400 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || mutation.isPending}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-700 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition"
              >
                {mutation.isPending ? "Adding..." : "Add Content"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationContent;
