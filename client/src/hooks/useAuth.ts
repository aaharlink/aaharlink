import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    queryFn: async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (response.status === 401) {
          return null; // User is not authenticated
        }
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        return response.json();
      } catch (error) {
        return null; // Return null on any error to prevent loading loop
      }
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
