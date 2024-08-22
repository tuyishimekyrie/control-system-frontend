import { QueryClient } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Number of times to retry failed queries
      refetchOnWindowFocus: true, // Refetch data when the window gains focus
      staleTime: 1000 * 60 * 5, // Time in milliseconds for how long the data is considered fresh
      //   cacheTime: 1000 * 60 * 10, // Time in milliseconds for how long unused data is cached
    },
    mutations: {
      retry: 1, // Number of times to retry failed mutations
    },
  },
});

export default queryClient;
